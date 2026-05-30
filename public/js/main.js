let currentTab = 'user';

function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update overlay
    const overlay = document.getElementById('loginOverlay');
    const logoIcon = document.getElementById('logoIcon');
    const submitBtn = document.getElementById('submitBtn');
    
    if (tab === 'admin') {
        overlay.classList.add('admin');
        logoIcon.classList.add('admin');
        submitBtn.textContent = 'Sign In as Admin';
    } else {
        overlay.classList.remove('admin');
        logoIcon.classList.remove('admin');
        submitBtn.textContent = 'Sign In as User';
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const result = await loginAPI(email, password, currentTab);
    
    if (result.success) {
        setCurrentUser(result.user);
        
        if (currentTab === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'home.html';
        }
    } else {
        showToast(result.message || 'Invalid credentials', 'error');
    }
}