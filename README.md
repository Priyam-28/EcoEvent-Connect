# EcoEvent Connect

![EcoEvent Connect](public/Screenshot%202024-07-28%20153635.png)


## Overview
EcoEvent Connect is a web application designed to facilitate the creation and management of eco-friendly events. It provides a platform for users to create events, search for events, receive notifications, and manage their profiles. The app is built with modern web technologies to ensure a smooth and responsive user experience.

## Features
- **User Authentication**: Secure login and registration with Firebase Authentication.
- **Event Management**: Users can create, update, and delete events.
- **Search and Notifications**: Search for events and receive real-time notifications.
- **User Profiles**: Manage personal profiles and view other users' profiles.

## Tech Stack
- **React**: JavaScript library for building user interfaces.
- **Firebase**: Backend-as-a-Service, used for authentication and Firestore database.
- **Firestore**: NoSQL database from Firebase for storing event and user data.
- **Chakra UI**: A simple, modular, and accessible component library for React.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/eco-event-connect.git
    cd eco-event-connect
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Setup Firebase**:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore and Authentication in the Firebase console.
    - Add your Firebase configuration to a `.env` file in the root directory of your project:
        ```
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        ```

4. **Run the application**:
    ```bash
    npm start
    ```

## Usage
- **Home**: View a feed of eco-friendly events.
- **Search**: Find events by name or category.
- **Notifications**: Get updates about events and user interactions.
- **Create Event**: Organize and manage your own events.
- **Profile**: Update your personal information and view others' profiles.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
