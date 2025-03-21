

export const fetchServices = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const fetchIncidents = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/incidents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching incidents: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

// Fetch services without Authorization
export const fetchServicesWithoutAuth = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Fetch incidents without Authorization
export const fetchIncidentsWithoutAuth = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/incidents/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching incidents: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

