// Dashboard functionality
document.addEventListener('DOMContentLoaded', async function () {
    // Check authentication
    try {
        const user = await checkAuth();

        // Display user email
        document.getElementById('user-email').textContent = user.email;

        // Load Project 1 data
        await loadProjectData(user.uid);

        // Set up logout button
        document.getElementById('logout-btn').addEventListener('click', logoutUser);

        // Set up project navigation
        setupProjectNavigation();

    } catch (error) {
        console.error('Authentication error:', error);
    }
});

// Load Project 1 data from Firestore
async function loadProjectData(userId) {
    try {
        const projectDoc = await db.collection('users').doc(userId)
            .collection('projects').doc('project1').get();

        if (projectDoc.exists) {
            const data = projectDoc.data();

            // Update lap count
            const lapCount = data.lapCount || data.laps?.length || 0;
            document.getElementById('lap-count').textContent = lapCount;

            // Update last activity
            if (data.lastActivity) {
                const lastActivity = data.lastActivity.toDate();
                document.getElementById('last-activity').textContent = formatRelativeTime(lastActivity);
            } else {
                document.getElementById('last-activity').textContent = 'Never';
            }
        }
    } catch (error) {
        console.error('Error loading project data:', error);
        document.getElementById('lap-count').textContent = '0';
        document.getElementById('last-activity').textContent = 'Never';
    }
}

// Format relative time (e.g., "2 hours ago")
function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
}

// Set up project navigation
function setupProjectNavigation() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const projectNum = card.dataset.project;
        const openBtn = card.querySelector('.btn-open-project');

        if (projectNum === '1') {
            // Project 1 - Navigate to timer
            openBtn.addEventListener('click', () => {
                window.location.href = 'timer.html';
            });

            // Also make card clickable
            card.addEventListener('click', (e) => {
                if (e.target !== openBtn) {
                    window.location.href = 'timer.html';
                }
            });
        } else {
            // Projects 2-6 - Show coming soon message
            openBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showComingSoonMessage();
            });
        }
    });
}

// Show coming soon modal/alert
function showComingSoonMessage() {
    alert('🚀 Coming Soon!\n\nThis project is not yet available. Stay tuned for future updates!');
}
