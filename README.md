# AI Assistant - ChatGPT Clone

A modern, full-stack AI chatbot application built with React, Node.js, and Google's Gemini API. Features a stunning liquid glass UI theme with animated backgrounds and secure user authentication.

![AI Assistant](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)

## ✨ Features

- 🤖 **AI-Powered Chat** - Powered by Google Gemini 2.5 Flash
- 🔐 **User Authentication** - Secure signup/login with JWT
- 🎨 **Liquid Glass Theme** - Modern glassmorphism design with animated video backgrounds
- 💬 **Real-time Conversations** - Instant AI responses with chat history
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎭 **Rich UI Components** - File uploads, emoji picker, and speech-to-text support
- 🌙 **Dark Mode** - Beautiful dark theme throughout

## 🚀 Tech Stack

### Frontend
- **React** (Vite) - Fast, modern frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **Emoji Mart** - Emoji picker component

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### AI Integration
- **Google Gemini 2.5 Flash** - Advanced AI language model

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd chatbot
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/chatbot_db
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
EOF

# Start the server
node index.js
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
EOF

# Start the development server
npm run dev
```

### 4. Add Your Video Background (Optional)

Place your `animation.mp4` file in the `client/public/` directory for the animated background effect.

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
MONGO_URI=mongodb://localhost:27017/chatbot_db
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

### Frontend (`client/.env`)
```env
VITE_API_KEY=your_gemini_api_key_here
```

## 🎯 Usage

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Start the Backend Server**:
   ```bash
   cd server
   node index.js
   ```
   Server will run on `http://localhost:5000`

3. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   App will run on `http://localhost:5173`

4. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`
   - Sign up for a new account or log in
   - Start chatting with the AI assistant!

## 📁 Project Structure

```
chatbot/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   │   └── animation.mp4  # Background video
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ChatInput.jsx
│   │   │   └── ChatMessage.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Chat.jsx
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   └── .env               # Frontend environment variables
│
├── server/                # Backend Node.js application
│   ├── models/           # Database models
│   │   └── User.js
│   ├── routes/           # API routes
│   │   └── auth.js
│   ├── index.js          # Server entry point
│   └── .env              # Backend environment variables
│
└── README.md             # This file
```

## 🎨 Design Features

- **Liquid Glass Theme** - Translucent glassmorphism effects with backdrop blur
- **Animated Backgrounds** - Looping video backgrounds on all pages
- **Gradient Accents** - Beautiful violet/purple gradient color scheme
- **Smooth Transitions** - Framer Motion animations throughout
- **Responsive Layout** - Mobile-first design with collapsible sidebar

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Secure HTTP-only cookies (recommended for production)
- Input validation and sanitization

## 🚧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with existing credentials

### Chat (Frontend only)
- Chat functionality uses direct Gemini API calls from the frontend

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Make sure MongoDB is running
mongod

# Or update MONGO_URI in server/.env to use MongoDB Atlas
```

**2. API Key Quota Exceeded**
- Check your Gemini API quota at https://ai.dev/rate-limit
- Wait for quota reset or upgrade your plan
- Consider switching models if one has available quota

**3. Port Already in Use**
```bash
# Kill the process using the port
# For backend (port 5000)
lsof -ti:5000 | xargs kill -9

# For frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

**4. Environment Variables Not Loading**
- Ensure `.env` files are in the correct directories
- Restart the dev servers after changing `.env` files
- Check that variable names match exactly (case-sensitive)

## 📝 Future Enhancements

- [ ] Chat history persistence in MongoDB
- [ ] Multiple chat sessions
- [ ] Message editing and deletion
- [ ] Code syntax highlighting in responses
- [ ] Image generation support
- [ ] Voice input/output
- [ ] Export chat conversations
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- React and Vite for the amazing developer experience
- MongoDB for flexible data storage
- The open-source community for inspiration

---

**Note**: This is a development setup. For production deployment, ensure you:
- Use environment-specific configurations
- Enable HTTPS
- Implement rate limiting
- Add proper error logging
- Use production-ready MongoDB instance
- Secure your API keys and secrets
