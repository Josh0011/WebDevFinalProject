import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REMOTE_SERVER; 

const profileClient = {
  
  fetchProfile: async () => {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  },
  
  updateProfile: async (profileData: { email?: string; brawlStarsId?: string }) => {
    const response = await axios.put(`${API_BASE_URL}/profile`, profileData);
    return response.data;
  },
  
  createPost: async (post: { title: string; body: string; image?: string }) => {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  },
  
  updatePost: async (postId: string, updatedPost: { title?: string; body?: string; image?: string }) => {
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, updatedPost);
    return response.data;
  },

  deletePost: async (postId: string) => {
    await axios.delete(`${API_BASE_URL}/posts/${postId}`);
  },
};

export default profileClient;
