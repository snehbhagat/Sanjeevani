# 🩸 Sanjeevani Blood Warriors

A modern blood donation management platform with AI-powered donor prediction, gamification, and multilingual support designed with a professional medical theme inspired by blood donation hero stories.

## 🚀 Features

- **Smart Donor Prediction**: AI-powered availability forecasting
- **Blood Inventory Management**: Real-time blood bank tracking  
- **Gamification System**: Points, badges, and leaderboards
- **Multilingual Chatbot**: AI assistant for donation queries
- **Blood Warriors Theme**: Professional medical red design
- **Firebase Authentication**: Secure user management

## 🛠️ Tech Stack

### Backend
- Node.js 20+ with TypeScript
- Fastify (high-performance web framework)
- Prisma ORM + SQLite (development)
- Firebase Admin SDK for authentication
- AES-256-GCM encryption for sensitive data
- Zod validation and comprehensive error handling

### Frontend
- React 18 + TypeScript
- Vite (lightning-fast build tool)
- Tailwind CSS v4 with medical theme
- React Router v7 for navigation
- React Query for state management
- Firebase Web SDK for authentication

## 🧪 Sample API Calls

Test the API endpoints with these examples:

### Donor Prediction
```bash
curl -X POST http://localhost:5000/api/predict \
  -H 'Content-Type: application/json' \
  -d '{"donor_id":"D0001","model_type":"logistic"}'
```

### List Donors
```bash  
curl http://localhost:5000/api/donors
```

### Blood Inventory
```bash
curl http://localhost:5000/api/blood-inventory
```

### Chatbot Interaction
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"What is Thalassemia?"}'
```

### Gamification (requires authentication)
```bash
# Register user
curl -X POST http://localhost:5000/api/gamification/users \
  -H "Authorization: Bearer <FIREBASE_ID_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"user_id":"U2001","name":"Alice","email":"alice@example.com"}'

# Record donation
curl -X POST http://localhost:5000/api/gamification/users/U1001/donations \
  -H "Authorization: Bearer <FIREBASE_ID_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 🔧 Development Notes

### Authentication Flow
- Protected endpoints require `Authorization: Bearer <Firebase ID Token>`
- Public endpoints: donors, blood inventory, prediction, chatbot
- User registration and donation recording require authentication

### Data Encryption
- User emails are encrypted using AES-256-GCM
- Encryption keys are managed through `SANJEEVANI_ENC_KEYS` environment variable
- Support for key rotation for enhanced security

### Database Management
- SQLite for development (easy setup)
- PostgreSQL recommended for production
- Prisma migrations for schema changes
- Seed script provides sample data

## 🚀 Deployment

### Production Considerations
1. **Database**: Migrate to PostgreSQL for production scale
2. **Environment**: Use secure environment variable management
3. **HTTPS**: Enable SSL/TLS termination
4. **Monitoring**: Add logging and error tracking
5. **Security**: Implement rate limiting and advanced validation

### Environment Migration
```bash
# Development
DATABASE_URL="file:./dev.db"

# Production  
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Set up your development environment
4. Make your changes with proper testing
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed
- Ensure environment variables are properly configured

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check that all environment variables are set in `.env`
- Verify Firebase service account key is correctly configured
- Ensure database is properly initialized with `npx prisma db push`

**Frontend build errors:**
- Verify all environment variables are set in `frontend-sanjeevani/.env`
- Check that the backend is running on the correct port
- Clear node_modules and reinstall dependencies

**Authentication errors:**
- Verify Firebase project configuration
- Check that Authentication is enabled in Firebase Console
- Ensure API keys match between frontend and Firebase project

### Database Reset
```bash
# Reset database and reseed
rm backend/dev.db
cd backend
npx prisma db push
npm run seed
```

## 📄 License

This project is developed for educational and humanitarian purposes. Please ensure compliance with medical data regulations for production use.

## 💝 Acknowledgments

Built with ❤️ for humanity. This platform aims to save lives through technology and community engagement.

**Special thanks to:**
- Blood donation organizations worldwide
- Healthcare professionals on the frontlines
- Open source community for the amazing tools
- Firebase for authentication infrastructure
- Prisma for database management

---

## ⚠️ Important Disclaimers

- **Medical Compliance**: This is a demo platform for educational purposes
- **Data Privacy**: Implement proper medical data protection for production
- **Testing**: Thoroughly test all features before medical use
- **Regulations**: Ensure compliance with local healthcare regulations

**Remember**: Every line of code here has the potential to save lives. Code responsibly! 🩸

---

*"Be the hero in someone's story. Donate blood, save lives."* - Sanjeevani Blood Warriors

## 📋 Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn package manager
- Firebase project with Authentication enabled
- Git for version control

## 🔧 Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sanjeevani-blood-warriors
```

### 2. Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication → Sign-in method → Email/Password
3. Create a test user (e.g., demo@example.com / password123)
4. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key" 
   - Save the JSON file securely (DO NOT commit to repository)

### 3. Backend Environment Setup

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Server Configuration
PORT=5000

# Database Configuration  
DATABASE_URL="file:./dev.db"

# Encryption Keys (generate with: openssl rand -base64 32)
SANJEEVANI_ENC_KEYS=your_encryption_key_here

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_SERVICE_ACCOUNT_PATH=./path/to/firebase-service-account.json
```

### 4. Frontend Environment Setup

```bash
cd ../frontend-sanjeevani  
cp .env.example .env
```

Edit `frontend-sanjeevani/.env` with your configuration:

```env
# API Configuration
VITE_API_BASE=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 5. Generate Encryption Keys

Generate secure encryption keys for sensitive data:

```bash
# Generate primary encryption key
openssl rand -base64 32
```

Use this output as your `SANJEEVANI_ENC_KEYS` value.

## 🚀 Installation & Running

### Backend Installation

```bash
cd backend
npm install

# Set up database
npx prisma generate
npx prisma db push

# Seed with sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Installation

```bash
cd frontend-sanjeevani
npm install

# Start development server  
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: Refer to `openapi.yml`

## 📁 Project Structure

```
sanjeevani-blood-warriors/
├── backend/                 # Node.js API server
│   ├── prisma/             # Database schema & migrations
│   │   ├── schema.prisma   # Database models
│   │   ├── seed.ts         # Sample data
│   │   └── dev.db          # SQLite database
│   ├── src/                # Source code
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, validation, errors
│   │   └── utils/          # Helpers and utilities
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
├── frontend-sanjeevani/    # React frontend  
│   ├── src/                # Source code
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── auth/           # Authentication
│   │   └── api/            # API client
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
├── openapi.yml             # API specification
└── README.md              # This file
```

## 🎨 Blood Warriors Theme

The application features a professional medical theme inspired by blood donation heroes:

- **Color Palette**: Medical red (#dc2626) with sophisticated gradients
- **Typography**: Clean, readable fonts for healthcare professionals  
- **Icons**: Medical and heroic iconography throughout
- **Components**: Emergency-style call-to-actions and hero messaging
- **Responsive**: Mobile-first design for accessibility

## 🔐 Security Features

- **Authentication**: Firebase-based secure user management
- **Data Encryption**: AES-256-GCM for sensitive user information
- **Input Validation**: Zod schema validation on all endpoints
- **CORS Protection**: Configured for cross-origin security
- **Environment Variables**: All secrets managed through .env files

## 📚 API Endpoints

The backend provides comprehensive REST APIs:

### Core Features
- `GET /api/donors` - List all blood donors
- `POST /api/predict` - AI-powered donor prediction
- `GET /api/blood-inventory` - Blood bank inventory management  
- `POST /api/chatbot/chat` - Multilingual chat support

### Gamification System
- `POST /api/gamification/users` - Register gamification user
- `GET /api/gamification/users/:id` - Get user profile
- `POST /api/gamification/users/:id/donations` - Record donation
- `GET /api/gamification/badges` - List available badges
- `GET /api/gamification/leaderboard` - Community leaderboard

## 🎯 Key Features Explained

### AI Donor Prediction
- Machine learning models for availability forecasting
- Historical donation pattern analysis
- Smart recommendation system for blood bank staff

### Gamification System  
- **Points System**: Earn points for donations and community activities
- **Badge Achievements**: Unlock badges for milestones and special actions
- **Leaderboards**: Community rankings to encourage participation
- **User Profiles**: Track personal donation history and achievements

### Multilingual Chatbot
- AI-powered assistance for donation-related queries
- Multi-language support for diverse communities  
- Educational content about blood donation
- Emergency guidance and information

### Blood Inventory Management
- Real-time tracking of blood bank inventory
- Blood type availability monitoring
- Expiration date tracking and alerts
- Donation campaign management