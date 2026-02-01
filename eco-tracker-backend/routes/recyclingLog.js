import express from 'express';
import { dbGet, dbAll, dbRun } from '../database/db.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Submit a recycling log (student/volunteer only)
router.post('/submit', authenticateToken, authorizeRoles('student', 'volunteer'), async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, weight, description, image_url } = req.body;

    // Validate required fields
    if (!category || !weight) {
      return res.status(400).json({ error: 'Category and weight are required' });
    }

    // Validate category
    const validCategories = ['plastic', 'paper', 'metal', 'glass', 'electronics', 'organic', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Validate weight
    if (weight <= 0) {
      return res.status(400).json({ error: 'Weight must be greater than 0' });
    }

    // Insert recycling log
    const result = await dbRun(
      `INSERT INTO recycling_logs (user_id, category, weight, description, image_url, verified) 
       VALUES (?, ?, ?, ?, ?, 0)`,
      [userId, category, weight, description || null, image_url || null]
    );

    // Get the created log
    const log = await dbGet(
      `SELECT rl.*, u.name as user_name, u.email as user_email
       FROM recycling_logs rl
       JOIN users u ON rl.user_id = u.id
       WHERE rl.id = ?`,
      [result.lastID]
    );

    res.status(201).json({
      message: 'Recycling log submitted successfully. Waiting for admin approval.',
      log
    });
  } catch (error) {
    console.error('Submit recycling log error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get my recycling logs
router.get('/my-logs', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await dbAll(
      `SELECT rl.*, u.name as user_name, v.name as verified_by_name
       FROM recycling_logs rl
       JOIN users u ON rl.user_id = u.id
       LEFT JOIN users v ON rl.verified_by = v.id
       WHERE rl.user_id = ?
       ORDER BY rl.created_at DESC`,
      [userId]
    );

    const stats = await dbGet(
      `SELECT 
        COUNT(*) as total_logs,
        SUM(weight) as total_weight,
        SUM(eco_points_earned) as total_points,
        SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as approved_count,
        SUM(CASE WHEN verified = 0 THEN 1 ELSE 0 END) as pending_count
       FROM recycling_logs
       WHERE user_id = ?`,
      [userId]
    );

    res.json({
      logs,
      stats: {
        total_logs: stats.total_logs || 0,
        total_weight: stats.total_weight || 0,
        total_points: stats.total_points || 0,
        approved_count: stats.approved_count || 0,
        pending_count: stats.pending_count || 0
      }
    });
  } catch (error) {
    console.error('Get my logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all recycling logs (admin only)
router.get('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status, category, user_id } = req.query;

    let query = `
      SELECT rl.*, 
             u.name as user_name, 
             u.email as user_email,
             u.role as user_role,
             v.name as verified_by_name
      FROM recycling_logs rl
      JOIN users u ON rl.user_id = u.id
      LEFT JOIN users v ON rl.verified_by = v.id
      WHERE 1=1
    `;
    const params = [];

    if (status === 'pending') {
      query += ' AND rl.verified = 0';
    } else if (status === 'approved') {
      query += ' AND rl.verified = 1';
    }

    if (category) {
      query += ' AND rl.category = ?';
      params.push(category);
    }

    if (user_id) {
      query += ' AND rl.user_id = ?';
      params.push(user_id);
    }

    query += ' ORDER BY rl.created_at DESC';

    const logs = await dbAll(query, params);

    res.json({ logs });
  } catch (error) {
    console.error('Get all logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get pending recycling logs (admin only)
router.get('/pending', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const logs = await dbAll(
      `SELECT rl.*, 
             u.name as user_name, 
             u.email as user_email,
             u.role as user_role
       FROM recycling_logs rl
       JOIN users u ON rl.user_id = u.id
       WHERE rl.verified = 0
       ORDER BY rl.created_at DESC`
    );

    res.json({ logs });
  } catch (error) {
    console.error('Get pending logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve a recycling log (admin only)
router.patch('/:id/approve', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const logId = req.params.id;
    const adminId = req.user.id;
    const { eco_points } = req.body;

    // Validate eco_points
    if (!eco_points || eco_points <= 0) {
      return res.status(400).json({ error: 'Valid eco_points amount is required' });
    }

    // Get the recycling log
    const log = await dbGet('SELECT * FROM recycling_logs WHERE id = ?', [logId]);
    
    if (!log) {
      return res.status(404).json({ error: 'Recycling log not found' });
    }

    if (log.verified) {
      return res.status(400).json({ error: 'This log has already been verified' });
    }

    // Update the log as approved
    await dbRun(
      `UPDATE recycling_logs 
       SET verified = 1, 
           verified_by = ?, 
           verified_at = CURRENT_TIMESTAMP,
           eco_points_earned = ?
       WHERE id = ?`,
      [adminId, eco_points, logId]
    );

    // Award eco-points to the user
    await dbRun(
      'UPDATE users SET eco_points = eco_points + ? WHERE id = ?',
      [eco_points, log.user_id]
    );

    // Create notification for the user
    await dbRun(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES (?, ?, ?, ?)`,
      [
        log.user_id,
        'Recycling Log Approved',
        `Your recycling log (${log.category}, ${log.weight}kg) has been approved! You earned ${eco_points} eco-points.`,
        'system'
      ]
    );

    // Get updated log
    const updatedLog = await dbGet(
      `SELECT rl.*, u.name as user_name, v.name as verified_by_name
       FROM recycling_logs rl
       JOIN users u ON rl.user_id = u.id
       LEFT JOIN users v ON rl.verified_by = v.id
       WHERE rl.id = ?`,
      [logId]
    );

    res.json({
      message: 'Recycling log approved successfully',
      log: updatedLog
    });
  } catch (error) {
    console.error('Approve log error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject a recycling log (admin only)
router.patch('/:id/reject', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const logId = req.params.id;
    const { reason } = req.body;

    // Get the recycling log
    const log = await dbGet('SELECT * FROM recycling_logs WHERE id = ?', [logId]);
    
    if (!log) {
      return res.status(404).json({ error: 'Recycling log not found' });
    }

    if (log.verified) {
      return res.status(400).json({ error: 'This log has already been verified' });
    }

    // Delete the rejected log
    await dbRun('DELETE FROM recycling_logs WHERE id = ?', [logId]);

    // Create notification for the user
    await dbRun(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES (?, ?, ?, ?)`,
      [
        log.user_id,
        'Recycling Log Rejected',
        reason || `Your recycling log (${log.category}, ${log.weight}kg) has been rejected.`,
        'system'
      ]
    );

    res.json({
      message: 'Recycling log rejected and deleted',
      reason: reason || 'No reason provided'
    });
  } catch (error) {
    console.error('Reject log error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recycling statistics (authenticated users)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's stats
    const userStats = await dbGet(
      `SELECT 
        COUNT(*) as total_logs,
        SUM(weight) as total_weight,
        SUM(eco_points_earned) as total_points,
        SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as approved_count
       FROM recycling_logs
       WHERE user_id = ? AND verified = 1`,
      [userId]
    );

    // Get category breakdown
    const categoryStats = await dbAll(
      `SELECT 
        category,
        COUNT(*) as count,
        SUM(weight) as total_weight,
        SUM(eco_points_earned) as total_points
       FROM recycling_logs
       WHERE user_id = ? AND verified = 1
       GROUP BY category
       ORDER BY total_weight DESC`,
      [userId]
    );

    res.json({
      total_logs: userStats.total_logs || 0,
      total_weight: userStats.total_weight || 0,
      total_points: userStats.total_points || 0,
      approved_count: userStats.approved_count || 0,
      by_category: categoryStats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a recycling log (own log only, if not yet verified)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const logId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    // Get the log
    const log = await dbGet('SELECT * FROM recycling_logs WHERE id = ?', [logId]);
    
    if (!log) {
      return res.status(404).json({ error: 'Recycling log not found' });
    }

    // Check permissions
    if (!isAdmin && log.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Prevent deletion if already verified (only admin can delete verified logs)
    if (log.verified && !isAdmin) {
      return res.status(400).json({ error: 'Cannot delete verified logs' });
    }

    // Delete the log
    await dbRun('DELETE FROM recycling_logs WHERE id = ?', [logId]);

    res.json({ message: 'Recycling log deleted successfully' });
  } catch (error) {
    console.error('Delete log error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
