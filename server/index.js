
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// POST /api/messages - Create a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({
        error: 'Name and message are required',
        details: 'Both name and message fields must be provided and cannot be empty'
      });
    }

    if (typeof name !== 'string' || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid data types',
        details: 'Name and message must be strings'
      });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        error: 'Invalid name length',
        details: 'Name must be between 2 and 100 characters'
      });
    }

    if (message.trim().length < 5 || message.trim().length > 1000) {
      return res.status(400).json({
        error: 'Invalid message length',
        details: 'Message must be between 5 and 1000 characters'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert({
        name: name.trim(),
        message: message.trim()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Failed to save message',
        details: 'Database error occurred while saving your message'
      });
    }

    res.status(201).json({
      success: true,
      message: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: 'An unexpected error occurred'
    });
  }
});

// GET /api/messages?name=NAME - Search messages by name
app.get('/api/messages', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: 'Name parameter is required',
        details: 'Please provide a name to search for'
      });
    }

    if (typeof name !== 'string') {
      return res.status(400).json({
        error: 'Invalid name parameter',
        details: 'Name must be a string'
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        error: 'Name too short',
        details: 'Search name must be at least 2 characters'
      });
    }

    // Search for exact match (case-insensitive)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .ilike('name', name.trim())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Failed to search messages',
        details: 'Database error occurred while searching'
      });
    }

    if (data && data.length > 0) {
      res.json({
        found: true,
        message: data[0]
      });
    } else {
      res.json({
        found: false
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: 'An unexpected error occurred'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    details: `The route ${req.method} ${req.originalUrl} does not exist`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    details: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/messages`);
  console.log(`   GET  http://localhost:${PORT}/api/messages?name=NAME`);
});

module.exports = app;
