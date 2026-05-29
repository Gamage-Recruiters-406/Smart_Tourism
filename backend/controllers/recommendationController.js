import { searchHotels, getHotelDetails, searchRestaurants, searchAttractions } from '../services/travelApiService.js';

// @desc    Search hotels by location (uses Travel Data API)
// @route   GET /api/recommendations/hotels?location=Kandy&limit=10
// @access  Public
export const recommendHotelsByLocation = async (req, res) => {
  try {
    const { location, limit = 10 } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location parameter is required',
      });
    }

    const searchResults = await searchHotels(location);
    
    if (!searchResults.results || searchResults.results.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        searchLocation: location,
        message: `No hotels found in ${location}. Try searching for a nearby major city.`,
        data: [],
      });
    }

    // Filter out the city name
    const hotels = searchResults.results.filter(item => {
      const name = item.name || '';
      if (name.toLowerCase() === location.toLowerCase()) return false;
      return true;
    });

    // If no hotels found after filtering
    if (hotels.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        searchLocation: location,
        message: `No hotels available in ${location}. Try nearby cities like Kandy or Colombo.`,
        suggestions: [
          { name: "Kandy", distance: "~40 km" },
          { name: "Dambulla", distance: "~50 km" },
          { name: "Negombo", distance: "~70 km" }
        ],
        data: [],
      });
    }

    const formattedHotels = hotels.slice(0, limit).map(hotel => ({
      id: hotel.entity_id,
      name: hotel.name,
      link: hotel.link,
      image: hotel.featuredImage,
      coordinates: hotel.coordinates,
      location: hotel.parent_location?.name || location,
    }));

    res.status(200).json({
      success: true,
      count: formattedHotels.length,
      searchLocation: location,
      data: formattedHotels,
    });

  } catch (error) {
    console.error('Hotel recommendation error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Get detailed hotel information by entity ID
// @route   GET /api/recommendations/hotels/:entityId
// @access  Public
export const getHotelRecommendationDetails = async (req, res) => {
  try {
    const { entityId } = req.params;

    if (!entityId) {
      return res.status(400).json({
        success: false,
        message: 'Entity ID is required',
      });
    }

    const hotelDetails = await getHotelDetails(entityId);

    res.status(200).json({
      success: true,
      data: hotelDetails,
    });

  } catch (error) {
    console.error('Hotel details error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get recommendations based on user preferences (combined)
// @route   GET /api/recommendations/all?location=Kandy&type=hotels
// @access  Public
export const getLocationRecommendations = async (req, res) => {
  try {
    const { location, type = 'all' } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location parameter is required',
      });
    }

    let hotels = [];
    let restaurants = [];
    let attractions = [];

    // Fetch based on type parameter
    if (type === 'hotels' || type === 'all') {
      const hotelResults = await searchHotels(location);
      hotels = (hotelResults.results || []).slice(0, 5);
    }

    if (type === 'restaurants' || type === 'all') {
      const restaurantResults = await searchRestaurants(location);
      restaurants = (restaurantResults.results || []).slice(0, 5);
    }

    if (type === 'attractions' || type === 'all') {
      const attractionResults = await searchAttractions(location);
      attractions = (attractionResults.results || []).slice(0, 5);
    }

    res.status(200).json({
      success: true,
      searchLocation: location,
      data: {
        hotels,
        restaurants,
        attractions,
      },
    });

  } catch (error) {
    console.error('Location recommendations error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Filter hotels by budget
// @route   GET /api/recommendations/hotels/budget?location=Kandy&maxPrice=100
// @access  Public
export const recommendHotelsByBudget = async (req, res) => {
  try {
    const { location, maxPrice, minRating = 0 } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location parameter is required',
      });
    }

    const searchResults = await searchHotels(location);
    let hotels = searchResults.results || [];

    // Note: Price filtering depends on what data the API returns
    // The Travel Data API may need a separate call for pricing details
    
    // For now, return all hotels with basic info
    // In production, you could call getHotelDetails for each to get pricing
    const formattedHotels = hotels.slice(0, 10).map(hotel => ({
      id: hotel.entity_id,
      name: hotel.name,
      link: hotel.link,
      image: hotel.featured_image,
      location: `${hotel.parent_location?.name || ''}, ${hotel.name}`,
    }));

    res.status(200).json({
      success: true,
      count: formattedHotels.length,
      searchParams: { location, maxPrice: maxPrice || 'No limit', minRating },
      data: formattedHotels,
    });

  } catch (error) {
    console.error('Budget recommendation error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};