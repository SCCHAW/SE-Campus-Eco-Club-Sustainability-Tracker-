const API_URL = 'http://localhost:5001/api';


const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};


export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login user
  login: async (payload) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getHeaders(true),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch profile');
    }
    
    return data;
  },

  // Get leaderboard
  getLeaderboard: async (limit = 10) => {
    const response = await fetch(`${API_URL}/users/leaderboard?limit=${limit}`, {
      headers: getHeaders(),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch leaderboard');
    }
    
    return data;
  },

  // Get achievements
  getAchievements: async () => {
    const response = await fetch(`${API_URL}/users/achievements`, {
      headers: getHeaders(true),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch achievements');
    }
    
    return data;
  },
};

// Recycling API calls
export const recyclingAPI = {
  // Submit recycling log with image
  submitLog: async (formData) => {
    const token = getAuthToken();
    
    const response = await fetch(`${API_URL}/recycling/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it automatically
      },
      body: formData, // FormData object
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit log');
    }
    
    return data;
  },

  // Get user's recycling logs
  getMyLogs: async () => {
    const response = await fetch(`${API_URL}/recycling/my-logs`, {
      headers: getHeaders(true),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch logs');
    }
    
    return data;
  },

  // Get recycling statistics
  getStats: async () => {
    const response = await fetch(`${API_URL}/recycling/stats`, {
      headers: getHeaders(true),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch stats');
    }
    
    return data;
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  recycling: recyclingAPI,
};