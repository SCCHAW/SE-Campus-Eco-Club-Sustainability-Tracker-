import express from 'express';
import { dbGet, dbAll } from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet(
      'SELECT id, name, email, role, eco_points, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaderboard (top users by eco points)
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const leaderboard = await dbAll(
      `SELECT id, name, role, eco_points, 
       (SELECT COUNT(*) FROM event_participants WHERE user_id = users.id AND attended = 1) as events_attended,
       (SELECT COUNT(*) FROM recycling_logs WHERE user_id = users.id AND verified = 1) as recycling_logs
       FROM users 
       ORDER BY eco_points DESC 
       LIMIT ?`,
      [limit]
    );

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user achievements
router.get('/achievements', authenticateToken, async (req, res) => {
  try {
    const achievements = await dbAll(
      `SELECT a.*, ua.earned_at
       FROM achievements a
       LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
       ORDER BY a.id`,
      [req.user.id]
    );

    res.json({ achievements });
  } catch (error) {
    console.error('Achievements fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;