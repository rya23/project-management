# Task Management System

## Project Description

The Task Management System is a platform designed to help organizations manage projects, assign tasks to candidates, and track their progress. It consists of two main modules:

### 1. **Project Assignment Module**

This module allows candidates to:

-   View projects that are assigned to them.
-   Accept or decline assigned projects.
-   Track the status of tasks within the projects.

The module allows users to:

-   View details of each project assigned to them.
-   Accept tasks, and the system records their progress.
-   The front-end interface displays these details effectively.

### 2. **Progress Tracking and Scoring System**

The second module tracks the progress of each user on assigned tasks. It also calculates scores based on how many tasks the user completes, with real-time updates on their progress.

This module:

-   Tracks completed tasks and updates them in real-time.
-   Calculates scores based on task completion.
-   Displays the progress dynamically on the front-end.

## Features

### 1. Project Management

-   Admin can assign projects to candidates.
-   Candidates can view, accept, and track projects.
-   Projects are tied to user accounts, ensuring that each user only sees their own assigned tasks.

### 2. Progress Tracking

-   Each user's progress is tracked based on tasks they complete.
-   Scoring mechanism that assigns points for completed tasks.
-   A leaderboard to rank candidates based on their progress and completed tasks.

### 3. Leaderboard

-   Displays the ranking of users based on their completed tasks.
-   Current user is highlighted for easy identification.
-   Data is dynamically updated and shows the most recent changes.

### 4. Authentication and Authorization

-   Users sign in with Google authentication.
-   Firebase is used to handle authentication, database management, and data storage.

## Technologies Used

-   **Frontend:**
    -   React.js (React Hooks)
    -   TailwindCSS for styling
    -   React Router for page navigation
    -   Firebase Authentication (Google Sign-In)
    -   Firebase Firestore (for real-time database management)
-   **Backend:**
    -   Firebase Firestore as the backend database
    -   Firebase Authentication for managing users and their access

## Setup and Installation

### Prerequisites

-   Node.js (v14.x or above)
-   A Firebase account with a configured Firestore database
-   A Google Cloud project with Firebase Authentication enabled

### Steps to Run the Application Locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repository-name
    cd your-repository-name
    ```

2. **Install dependencies**:
   Run the following command to install required dependencies:

    ```bash
    npm install
    ```

3. **Setup Firebase Configuration**:

    - Create a `.env` file in the root of your project.
    - Add your Firebase credentials to the `.env` file:

    ```env
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```

4. **Run the application**:
   After setting up the `.env` file, you can run the development server:

    ```bash
    npm run dev
    ```

    Visit `http://localhost:5173` in your browser to view the application.

## Key Features Walkthrough

### 1. **User Authentication**

-   Users sign in using Google OAuth, facilitated by Firebase Authentication.
-   After logging in, users are directed to the home page where they can view their assigned projects.

### 2. **Project Assignment**

-   Projects are displayed in the form of a list for users, showing details like title, description, and status.
-   Users can accept projects, and the system updates their status accordingly.

### 3. **Progress Tracking**

-   Completed tasks are tracked in real-time using Firebase Firestore.
-   Users can view their progress and completed tasks dynamically.

### 4. **Leaderboard**

-   The leaderboard page displays rankings based on completed tasks.
-   The currently logged-in user is highlighted for easy recognition.
-   The leaderboard is dynamically updated as users complete tasks.

## Folder Structure

```
src/
├── components/           # Reusable components such as Header, Footer, ProjectList, etc.
├── pages/                # Pages like Home, Leaderboard, Login, etc.
├── services/             # Services to interact with Firebase (e.g., fetchProgress, assignProject, etc.)
├── App.jsx               # Main React component that handles routing and structure
├── firebase.js           # Firebase configuration and initialization
└── index.css             # Global CSS (TailwindCSS integration)
```

## Firebase Configuration

-   **Authentication:** Firebase Authentication is used for user sign-ins using Google OAuth.
-   **Database:** Firebase Firestore is used to store project data, user progress, and leaderboard details. Each project and progress record is tied to the user ID to ensure proper assignment and tracking.

## Deployment

### To deploy this project, you can use Firebase Hosting or any other cloud platform:

1. **Firebase Hosting:**

    - Install Firebase CLI:

    ```bash
    npm install -g firebase-tools
    ```

    - Log in to Firebase:

    ```bash
    firebase login
    ```

    - Initialize Firebase in your project directory:

    ```bash
    firebase init
    ```

    - Select **Hosting** from the list of services.
    - Deploy the app:

    ```bash
    firebase deploy
    ```

2. **Other Hosting Services:**
    - You can also deploy the application on services like Vercel, Netlify, or DigitalOcean.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Note:

This README provides a high-level overview of the Task Management System project. It is designed to guide developers through the setup process, features, and how to contribute. If you run into any issues or have questions, feel free to open an issue or pull request on the GitHub repository.
