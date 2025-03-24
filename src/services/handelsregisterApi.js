import axios from 'axios';

// API-Konfiguration
const API_BASE_URL = 'https://handelsregister.ai/api/v1';
const API_KEY = process.env.REACT_APP_API_KEY;

// Konfiguration für axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Sucht nach Unternehmen basierend auf einem Suchbegriff
 * @param {string} query - Der Suchbegriff (Firmenname)
 * @returns {Promise<Object>} - Die Unternehmensdaten
 */
export const searchCompany = async (query) => {
  try {
    const response = await api.get('/fetch-organization', {
      params: { 
        api_key: API_KEY,
        q: query 
      }
    });
    return response.data || null;
  } catch (error) {
    console.error('Error searching for company:', error);
    throw error;
  }
};

// Anstatt direkt ein Objekt zu exportieren, erstellen Sie zuerst eine Konstante
const handelsregisterApi = {
  searchCompany
};

export default handelsregisterApi;