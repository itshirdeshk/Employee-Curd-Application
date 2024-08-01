const API_BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api';

export const fetchEmployees = async () => {
    const response = await fetch(`${API_BASE_URL}/employee?limit=20&offset=0`, {
        headers: {
            'environmentId': import.meta.env.VITE_ENVIRONMENT_ID,
            'projectId': import.meta.env.VITE_PROJECT_ID
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
};

export const fetchEmployeeById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
        headers: {
            'environmentId': import.meta.env.VITE_ENVIRONMENT_ID,
            'projectId': import.meta.env.VITE_PROJECT_ID
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch employee');
    }
    return response.json();
};

export const createEmployee = async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'environmentId': import.meta.env.VITE_ENVIRONMENT_ID,
            'projectId': import.meta.env.VITE_PROJECT_ID
        },
        body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
        throw new Error('Failed to create employee');
    }
    return response.json();
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
        method: 'DELETE',
        headers: {
            'environmentId': import.meta.env.VITE_ENVIRONMENT_ID,
            'projectId': import.meta.env.VITE_PROJECT_ID
        }, body: JSON.stringify({})
    });
    if (!response.ok) {
        throw new Error('Failed to delete employee');
    }
    return response.json();
};