import fetch from 'node-fetch';

const API_KEY = process.env.TRAVEL_API_KEY;
const BASE_URL = process.env.TRAVEL_API_BASE_URL || 'https://travel-data-api.omkar.cloud/travel';

// Headers for all requests
const headers = {
  'API-Key': API_KEY,
  'Content-Type': 'application/json',
};

/**
 * Search for hotels by location name or hotel name
 * @param {string} query - Location name (e.g., "Kandy", "Colombo") or hotel name
 * @param {string} locale - Language/locale (default: "en-US")
 * @returns {Promise<Array>} List of hotels/places
 */
export const searchHotels = async (query, locale = 'en-US') => {
  try {
    const response = await fetch(
      `${BASE_URL}/hotels/search?query=${encodeURIComponent(query)}&locale=${locale}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Travel API search error:', error);
    throw error;
  }
};

/**
 * Get hotel details by entity ID
 * @param {number} entityId - The entity ID from search results
 * @returns {Promise<Object>} Hotel details including reviews, ratings, pricing
 */
export const getHotelDetails = async (entityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/hotels/details?entity_id=${entityId}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hotel details error:', error);
    throw error;
  }
};

/**
 * Search for restaurants by location
 * @param {string} query - Location name
 * @returns {Promise<Array>} List of restaurants
 */
export const searchRestaurants = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/restaurants/search?query=${encodeURIComponent(query)}`,
      { headers }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Restaurant search error:', error);
    throw error;
  }
};

/**
 * Search for attractions by location
 * @param {string} query - Location name
 * @returns {Promise<Array>} List of attractions
 */
export const searchAttractions = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/attractions/search?query=${encodeURIComponent(query)}`,
      { headers }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Attractions search error:', error);
    throw error;
  }
};