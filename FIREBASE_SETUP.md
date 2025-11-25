# Firebase Setup Guide

Follow these steps to configure Firebase for your Countdown Timer application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "CouTimerntdown ")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project, click the **web icon** (\</\>) to add a web app
2. Enter an app nickname (e.g., "Countdown Timer Web")
3. **Do NOT** check "Set up Firebase Hosting" (we'll use GitHub Pages)
4. Click **"Register app"**

## Step 3: Get Your Configuration

You'll see a code snippet with your Firebase configuration. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Copy these values** - you'll need them in the next step.

## Step 4: Update firebase-config.js

1. Open the file `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: Enable Authentication

1. In Firebase Console, go to **"Authentication"** from the left sidebar
2. Click **"Get started"**
3. Click on **"Sign-in method"** tab
4. Click **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

## Step 6: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"** from the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - Note: For production, you should update security rules
4. Choose a location (select the one closest to your users)
5. Click **"Enable"**

## Step 7: Set Up Firestore Security Rules (Optional but Recommended)

For better security, update your Firestore rules:

1. In Firestore Database, click on **"Rules"** tab
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Step 8: Test Your Application

1. Open `index.html` in your browser
2. Click **"Create Account"**
3. Sign up with an email and password
4. You should be redirected to the dashboard
5. Click on **"Project 1"** to test the countdown timer

## Deployment to GitHub Pages

Once Firebase is configured and tested:

1. Commit all your changes to git
2. Push to your GitHub repository
3. Follow your existing deployment workflow

**Important:** Make sure `firebase-config.js` with your actual credentials is committed (the Firebase config is safe to make public as it's protected by Firestore security rules).

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've replaced ALL placeholder values in `firebase-config.js`

### "Missing or insufficient permissions"
- Check that Firestore rules are set up correctly
- Make sure the user is authenticated

### Page keeps redirecting to login
- Clear browser cache and cookies
- Check browser console for errors

## Need Help?

If you encounter any issues, check:
- Firebase Console for error logs
- Browser Console (F12) for JavaScript errors
- Network tab to see if Firebase requests are being made
