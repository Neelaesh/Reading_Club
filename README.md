# Reading_Club

A responsive Single-Page Application (SPA) built to manage and showcase a virtual book club. The app includes a member gallery (main page), an admin management panel, and a simulated login system for protected access. It demonstrates CRUD operations, client-side routing, and component reusability in a clean and modular architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Neelaesh/Reading_Club.git
   cd Reading_Club
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**

   ```bash
   npm start
   ```

   This command will:

   - Start the JSON server (backend API) on port 5000
   - Start the webpack development server on port 8080
   - Automatically open your browser to `http://localhost:8080`

2. **Alternative: Run components separately**

   If you need to run the backend and frontend separately:

   **Backend (JSON Server):**

   ```bash
   npm run server
   ```

   **Frontend (Webpack Dev Server):**

   ```bash
   npx webpack serve --config webpack.dev.js
   ```

### Available Scripts

- `npm start` - Start both backend and frontend servers concurrently
- `npm run server` - Start only the JSON server (port 5000)
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm test` - Run Jest tests with coverage

### 🌐 Accessing the Application

Once the application is running, you can access:

- **Main Application**: http://localhost:3000
- **API/Backend**: http://localhost:5000
- **Member Gallery**: http://localhost:3000/members (public)
- **Admin Panel**: http://localhost:3000/admin (requires login simulation)

### 📱 Features

- Responsive design for mobile and desktop
- Member management system
- CRUD operations for book club members
- Client-side routing with React Router
- Simulated authentication system
- Material-UI components for modern UI/UX
- TypeScript for type safety
- Jest testing framework

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Material-UI
- **Build Tool**: Webpack 5
- **Backend**: JSON Server (mock API)
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint with TypeScript support
- **Styling**: Emotion (CSS-in-JS)
