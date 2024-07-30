document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const employeeDashboard = document.getElementById('employee-dashboard');

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Perform user authentication logic here
        // This is just a placeholder for demo purposes.
        if (username === 'admin' && password === 'adminpassword') {
            adminDashboard.style.display = 'block';
            employeeDashboard.style.display = 'none';
            loginForm.style.display = 'none';
        } else if (username === 'employee' && password === 'employeepassword') { // Replace with actual employee check
            employeeDashboard.style.display = 'block';
            adminDashboard.style.display = 'none';
            loginForm.style.display = 'none';
        } else {
            // Display error message for invalid credentials
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
        }
    });

    // Admin Dashboard UI
    const addUserButton = document.getElementById('add-user-button');
    const viewActivitiesButton = document.getElementById('view-activities-button');

    addUserButton.addEventListener('click', () => {
        const addUserForm = document.getElementById('add-user-form');
        addUserForm.style.display = 'block';
    });

    viewActivitiesButton.addEventListener('click', () => {
        const viewActivitiesForm = document.getElementById('view-activities-form');
        const activitiesList = document.getElementById('activities-list');

        // Send message to background script to retrieve activities
        chrome.runtime.sendMessage({ type: 'get-all-activities' }, response => {
            if (response && response.activities) {
                // Display activities in the popup
                const activitiesHTML = response.activities.map(activity => {
                    return `<div>${activity.userId} - ${activity.type} - ${activity.timestamp}</div>`;
                }).join('');
                activitiesList.innerHTML = activitiesHTML;
                viewActivitiesForm.style.display = 'block';
            } else {
                // Handle error
                activitiesList.textContent = 'Error retrieving activities';
            }
        });
    });

    // Add new user form
    const newUsernameInput = document.getElementById('new-username');
    const newPasswordInput = document.getElementById('new-password');
    const submitUserButton = document.getElementById('submit-user-button');
    const userErrorMessage = document.getElementById('user-error-message');

    submitUserButton.addEventListener('click', () => {
        const username = newUsernameInput.value.trim();
        const password = newPasswordInput.value.trim();

        // Perform validation here if needed

        // Send user data to background script to add user
        chrome.runtime.sendMessage({ type: 'add-user', username, password }, response => {
            if (response && response.status === 'success') {
                // Clear input fields and hide form
                newUsernameInput.value = '';
                newPasswordInput.value = '';
                addUserForm.style.display = 'none';
                // Optionally, display a success message
            } else {
                // Display error message
                userErrorMessage.textContent = response.message || 'Error adding user';
                userErrorMessage.style.display = 'block';
            }
        });
    });

    // Employee Dashboard UI
    const clockInButton = document.getElementById('clock-in-button');
    const clockOutButton = document.getElementById('clock-out-button');
    const viewMyActivitiesButton = document.getElementById('view-my-activities-button');

    clockInButton.addEventListener('click', () => {
        // Send message to background script to record clock in
        chrome.runtime.sendMessage({ type: 'clock-in' }, response => {
            if (response && response.status === 'success') {
                // Optionally, display a success message
            } else {
                // Handle error
                console.error('Error clocking in');
            }
        });
    });

    clockOutButton.addEventListener('click', () => {
        // Send message to background script to record clock out
        chrome.runtime.sendMessage({ type: 'clock-out' }, response => {
            if (response && response.status === 'success') {
                // Optionally, display a success message
            } else {
                // Handle error
                console.error('Error clocking out');
            }
        });
    });

    viewMyActivitiesButton.addEventListener('click', () => {
        const viewMyActivitiesForm = document.getElementById('view-my-activities-form');
        const myActivitiesList = document.getElementById('my-activities-list');

        // Send message to background script to retrieve own activities
        chrome.runtime.sendMessage({ type: 'get-my-activities' }, response => {
            if (response && response.activities) {
                // Display activities in the popup
                const activitiesHTML = response.activities.map(activity => {
                    return `<div>${activity.type} - ${activity.timestamp}</div>`;
                }).join('');
                myActivitiesList.innerHTML = activitiesHTML;
                viewMyActivitiesForm.style.display = 'block';
            } else {
                // Handle error
                myActivitiesList.textContent = 'Error retrieving activities';
            }
        });
    });
});
