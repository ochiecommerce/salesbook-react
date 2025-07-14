import axios from "axios";

const api = axios.create({ baseURL: '/api' });
//api.defaults.headers['ngrok-skip-browser-warning']='true';
export default api;

export const getOrders = async () => {
  try {
    const response = await api.get("/orders/");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export const getPhonebooks = async () => {
  try {
    const response = await api.get("/phonebooks_ro/");
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

export const getInquiries = async () => {
  try {
    const response = await api.get("/inquiries/");
    return response.data;
  } catch (error) {
    console.error("Error fetching inquiries:", error);
  }
}

export const getFeedback = async () => {
  try {
    const response = await api.get("/feedback/");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
  }
}

export const getFavorites = async () => {
  try {
    const response = await api.get("/favorites/");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
}

export const getMessages = async () => {
  try {
    const response = await api.get("/messages/");
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications/");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

export const getSettings = async () => {
  try {
    const response = await api.get("/settings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
}

export const createOrder = async (order) => {
  try {
    const response = await api.post("/orders/", order);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

export const createProperty = async (property) => {
  try {
    const response = await api.post("/properties/", property);
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
  }
}

export const createInquiry = async (inquiry) => {
  try {
    const response = await api.post("/inquiries/", inquiry);
    return response.data;
  } catch (error) {
    console.error("Error creating inquiry:", error);
  }
}

export const createFeedback = async (feedback) => {
  try {
    const response = await api.post("/feedback/", feedback);
    return response.data;
  } catch (error) {
    console.error("Error creating feedback:", error);
  }
}

export const createFavorite = async (favorite) => {
  try {
    const response = await api.post("/favorites/", favorite);
    return response.data;
  } catch (error) {
    console.error("Error creating favorite:", error);
  }
}

export const createMessage = async (message) => {
  try {
    const response = await api.post("/messages/", message);
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
  }
}

