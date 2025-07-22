const fakeAuthApi = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@example.com' && password === 'password') {
                resolve({ email: 'admin@example.com', role: 'staff' }); // Changed from 'admin' to 'staff'
            } else if (email === 'user@example.com' && password === 'password') {
                resolve({ email: 'user@example.com', role: 'student' }); // Changed from 'user' to 'student'
            } else if (email === 'student@example.com' && password === 'password') {
                resolve({ email: 'student@example.com', role: 'student' });
            } else if (email === 'staff@example.com' && password === 'password') {
                resolve({ email: 'staff@example.com', role: 'staff' });
            } else {
                reject('Invalid email or password.');
            }
        }, 1000);
    });
};

export default fakeAuthApi;
