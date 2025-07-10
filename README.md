
# 📝 Full Stack Guestbook Application

A modern, production-ready guestbook application built with React, Express.js, and Supabase. Visitors can leave messages and search for messages by name.

## ✨ Features

- **📄 Add Messages**: Simple form to submit name and message
- **🔍 Search Functionality**: Search messages by name
- **💅 Modern UI**: Beautiful, responsive design with TailwindCSS
- **⚡ Real-time Validation**: Form validation with helpful error messages
- **🎯 Production Ready**: Proper error handling, loading states, and security

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **Supabase** PostgreSQL database
- **CORS** and security middleware
- **RESTful API** design

### Database
- **Supabase PostgreSQL** with the following schema:

```sql
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Git

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd guestbook-app
```

### 2. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(message) >= 5 AND char_length(message) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster name searches
CREATE INDEX idx_messages_name_lower ON messages (LOWER(name));

-- Enable Row Level Security (optional, for production)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (adjust as needed)
CREATE POLICY "Enable read access for all users" ON messages FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON messages FOR INSERT WITH CHECK (true);
```

### 3. Environment Setup

#### Backend (.env)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### Frontend (.env)
```bash
cd client
cp ../.env.example .env
```

Edit `client/.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3001
```

### 4. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 5. Start Development Servers

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

### 6. Open Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Health Check: [http://localhost:3001/health](http://localhost:3001/health)

## 📁 Project Structure

```
guestbook-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript definitions
│   │   └── hooks/          # Custom hooks
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── supabaseClient.js  # Database client
│   ├── package.json
│   └── .env.example
├── supabaseClient.ts      # Shared Supabase config
├── .env.example          # Environment template
└── README.md
```

## 🔗 API Endpoints

### POST /api/messages
Create a new message

**Request Body:**
```json
{
  "name": "John Doe",
  "message": "Hello, world!"
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": "uuid",
    "name": "John Doe",
    "message": "Hello, world!",
    "created_at": "2025-01-10T12:00:00Z"
  }
}
```

### GET /api/messages?name=NAME
Search for a message by name

**Response (Found):**
```json
{
  "found": true,
  "message": {
    "id": "uuid",
    "name": "John Doe",
    "message": "Hello, world!",
    "created_at": "2025-01-10T12:00:00Z"
  }
}
```

**Response (Not Found):**
```json
{
  "found": false
}
```

## 🔧 Development

### Adding New Features

1. **Frontend Components**: Add to `client/src/components/`
2. **API Routes**: Add to `server/index.js`
3. **Types**: Update `client/src/types/index.ts`

### Database Migrations

Add new SQL commands to your Supabase project via the SQL Editor.

### Styling

Uses TailwindCSS utility classes. Custom styles go in `client/src/index.css`.

## 📦 Production Deployment

### Frontend (Vercel/Netlify)

1. Build the client:
```bash
cd client
npm run build
```

2. Deploy the `dist/` folder to your hosting service

### Backend (Railway/Heroku/DigitalOcean)

1. Set environment variables on your hosting platform
2. Deploy the `server/` folder
3. Ensure the database schema is applied to your production Supabase instance

### Environment Variables

Make sure all environment variables are set in your production environment:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `PORT` (for backend)
- `CLIENT_URL` (for CORS)

## 🛡️ Security Features

- Input validation and sanitization
- SQL injection protection via Supabase
- CORS configuration
- Helmet.js security headers
- Rate limiting ready (add express-rate-limit if needed)
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 💬 Support

For issues and questions:
1. Check the GitHub issues
2. Review Supabase documentation
3. Check React and Express.js documentation

---

**Happy coding! 🚀**
