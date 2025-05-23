import {create} from "zustand"
import axios from "axios"

const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/dpdwrco4f/image/upload/v1743582179/defolt/axjjfhgfwbb6oqec9h6d.jpg"
const API_URL = import.meta.env.VITE_API_URL + "/api"
axios.defaults.withCredentials = true;

export const useBiografStore = create((set) => ({
    //initial states
    biograf: null,
    biografs: [],
    music: null,
    musics: [],
    isLoading: false,
    error: null,
    message: null,
    

    //functions
    fetchMusics: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.get(`${API_URL}/musics`);
            set({ musics: response.data, isLoading: false });
        } catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error Fetching music",
            })

            throw error
        }
    },
    fetchMusic: async (musicIds) => {
        set({ isLoading: true, error: null });
    
        try {
            const response = await axios.post(`${API_URL}/get-music`, { musicIds });
            set({ musics: response.data, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error fetching music",
            });
            console.error("Error fetching music:", error);
        }
    },
    addMusic: async (title, file) => {
        set({ isLoading: true, error: null, message: null })
    
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("music", file)
    
            const response = await axios.post(`${API_URL}/add-music`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (!response || !response.data) {
                throw new Error("Server response is invalid")
            }
    
            const { message, music } = response.data
            set({ music, message, isLoading: false })
            return { message, music }
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error adding music",
            })
    
            throw error
        }
    },
    deleteMusic: async(id) => {
        set({isLoading: true, error: null, message: null})

        try{
            const response = await axios.delete(`${API_URL}/delete-music/${id}`)
            const {message} = response.data

            set({message, isLoading: false})
            return {message}
        }catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error deleting music",
            })

            throw error
        }
    },
    
    

    fetchBiografs: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.get(`${API_URL}/fetch-biografs`);
            set({ biografs: response.data, isLoading: false });
        } catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error Fetching biograf",
            })

            throw error
        }
    },

    fetchBiograf: async (id) => {
        set({ isLoading: true, error: null });
    
        try {
          const response = await axios.get(`${API_URL}/fetch-biograf/${id}`);
          set({ biograf: response.data.biograf, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response.data.message || "Error fetching biograf.",
          });
          throw error;
        }
      },
    



    addBiograf: async (image, title, music, description) => {
        set({isLoading: true, error: null, message: null})

        try{ 
            const response = await axios.post(`${API_URL}/add-biograf`, {
                image: image || DEFAULT_IMAGE_URL,
                title,
                music,
                description
            })

            if (!response || !response.data) {
                throw new Error("Server response is invalid");
            }
            const {message, biograf} = response.data

            set({biograf, message, isLoading: false})
            return {message, biograf}
        }catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error loggin out",
            })

            throw error
        }

    },

    deleteBiograf: async(id) => {
        set({isLoading: true, error: null, message: null})

        try{
            const response = await axios.delete(`${API_URL}/delete-biograf/${id}`)
            const {message} = response.data

            set({message, isLoading: false})
            return {message}
        }catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error deleting biograf",
            })

            throw error
        }
    }


    
}))