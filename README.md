📚 Recipe App

A modern web application to explore, manage, and save recipes. Built with React, Firebase, Vite, and Bootstrap for a fast and responsive user experience.
🚀 Features

    🔐 Firebase Authentication – Secure login/signup

    📦 Firestore Database – Store and fetch recipes in real-time

    🧭 React Router – Seamless navigation

    🎨 Bootstrap UI – Responsive and clean design

    ⚡ Vite – Lightning-fast development and build setup

🛠️ Tech Stack

    Frontend: React 18, React Bootstrap, React Router DOM

    Backend: Firebase (Firestore + Auth)

    Tooling: Vite, ESLint

📦 Installation

    Clone the repo

git clone git@github.com:David-Malobani/Anyfood-Project-SemesterA.git
cd recipes

    Install dependencies

npm install

    Set up Firebase Environment

Create a .env file in the recipes folder with:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

    Run the development server

npm run dev

📁 Folder Structure

recipes/
├── firebase.js # Firebase setup
├── index.html # Entry HTML file
├── package.json # Project config and dependencies
├── .env # Environment variables (not committed)
├── vite.config.js # Vite configuration
└── ...

🧪 Scripts

    npm run dev – Start development server

    npm run build – Build for production

    npm run preview – Preview production build

    npm run lint – Lint code with ESLint

✅ To Do

Add recipe search/filter

User profile and saved recipes

    Image uploads via Firebase Storage

👨‍💻 Author

David Malobani – [GitHub Profile](https://github.com/David-Malobani)
