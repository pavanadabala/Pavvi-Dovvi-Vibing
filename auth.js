// Authentication Helper Functions

// Check if user is logged in
function checkAuth(redirectTo = 'login.html') {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = redirectTo;
                reject('Not authenticated');
            }
        });
    });
}

// Login function
async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Signup function
async function signupUser(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Create user document in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // Initialize Project 1
        await db.collection('users').doc(userCredential.user.uid)
            .collection('projects').doc('project1').set({
                name: 'Daily Working Task Countdown',
                targetDate: new Date('2025/12/31 23:59:59').getTime(),
                lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
                lapCount: 0,
                laps: []
            });

        // Initialize placeholder projects 2-6
        const batch = db.batch();
        for (let i = 2; i <= 6; i++) {
            const projectRef = db.collection('users').doc(userCredential.user.uid)
                .collection('projects').doc(`project${i}`);
            batch.set(projectRef, {
                name: 'Coming Soon',
                status: 'placeholder'
            });
        }
        await batch.commit();

        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Logout function
async function logoutUser() {
    try {
        await auth.signOut();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Get current user
function getCurrentUser() {
    return auth.currentUser;
}

// Password reset
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
