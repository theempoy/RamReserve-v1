const API_BASE = 'http://localhost:8000/api';

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

async function loginAPI(email, password, role) {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, user: data.user };
        } else {
            showToast(data.detail || 'Invalid credentials', 'error');
            return { success: false, message: data.detail };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Connection error' };
    }
}

async function getTickets() {
    try {
        const response = await fetch(`${API_BASE}/tickets`);
        const data = await response.json();
        return data.tickets || [];
    } catch (error) {
        console.error('Get tickets error:', error);
        return [];
    }
}

async function createTicket(ticketData) {
    try {
        const response = await fetch(`${API_BASE}/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to create ticket');
        }
        return data.ticket;
    } catch (error) {
        console.error('Create ticket error:', error);
        throw error;
    }
}

async function updateTicketStatus(ticketId, status) {
    try {
        const response = await fetch(`${API_BASE}/tickets/${ticketId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to update ticket status');
        }
        return data.ticket;
    } catch (error) {
        console.error('Update ticket error:', error);
        throw error;
    }
}