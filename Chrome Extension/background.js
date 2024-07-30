chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage if not already set
    chrome.storage.sync.get(['users', 'activities'], (result) => {
        if (!result.users) {
            chrome.storage.sync.set({ users: [] });
        }
        if (!result.activities) {
            chrome.storage.sync.set({ activities: [] });
        }
    });
});

// Function to authenticate user
function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('users', ({ users }) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Invalid username or password'));
            }
        });
    });
}

// Function to add user (admin or employee)
function addUser(user) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('users', ({ users }) => {
            users.push(user);
            chrome.storage.sync.set({ users }, () => {
                resolve(user);
            });
        });
    });
}

// Function to clock in
function clockIn(userId) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString();
        chrome.storage.sync.get('activities', ({ activities }) => {
            activities.push({ userId, type: 'clock-in', timestamp });
            chrome.storage.sync.set({ activities }, () => {
                resolve({ status: 'clocked-in', timestamp });
            });
        });
    });
}

// Function to clock out
function clockOut(userId) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString();
        chrome.storage.sync.get('activities', ({ activities }) => {
            activities.push({ userId, type: 'clock-out', timestamp });
            chrome.storage.sync.set({ activities }, () => {
                resolve({ status: 'clocked-out', timestamp });
            });
        });
    });
}

// Function to get user activities
function getUserActivities(userId) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('activities', ({ activities }) => {
            const userActivities = activities.filter(activity => activity.userId === userId);
            resolve(userActivities);
        });
    });
}

// Function to get all user activities
function getAllUserActivities() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('activities', ({ activities }) => {
            resolve(activities);
        });
    });
}

// Combined message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const userId = request.userId; // Ensure userId is sent with the request

    switch (request.type) {
        case 'add-user':
            const { username, password } = request;
            addUser({ username, password, role: 'employee' })
                .then(user => sendResponse({ status: 'success' }))
                .catch(error => sendResponse({ status: 'error', message: error.message }));
            break;

        case 'get-all-activities':
            getAllUserActivities()
                .then(activities => sendResponse({ activities }))
                .catch(error => sendResponse({ error: error.message }));
            break;

        case 'clock-in':
            clockIn(userId)
                .then(response => sendResponse({ status: 'success', ...response }))
                .catch(error => sendResponse({ status: 'error', message: error.message }));
            break;

        case 'clock-out':
            clockOut(userId)
                .then(response => sendResponse({ status: 'success', ...response }))
                .catch(error => sendResponse({ status: 'error', message: error.message }));
            break;

        case 'get-my-activities':
            getUserActivities(userId)
                .then(activities => sendResponse({ activities }))
                .catch(error => sendResponse({ error: error.message }));
            break;

        default:
            sendResponse({ status: 'error', message: 'Unknown request type' });
    }
    return true; // Indicates that sendResponse will be called asynchronously
});
