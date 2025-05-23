import {create} from "zustand"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/api"
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    //install states
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    //functions
    signup: async(username, password) => {
        set({isLoading:true, message: null})

        try{
            const response = await axios.post(`${API_URL}/signup`, {
                username, 
                password,
            })
            set({
                user: response.data.user, 
                isLoading: false,
            })
        }catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error signing up",
            })

            throw error
        }

        
    },

    login: async(username, password) => {

        set({isLoading: true, message: null, error: null})

        try{
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            })

            const {user, message} = response.data

            set ({user, isLoading: false, message})
            return {user, message}

        } catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error Logging in"
            })
            throw error
        }
    },
    
    fetchUser: async() => {
        set({fetchingUser: true, error: null})
        
        try{
            const response = await axios.get(`${API_URL}/fetch-user`)

            set({user: response.data.user, fetchingUser: false})
            
        }catch(error){
            set({
                fetchingUser: false,
                error: null,
                user: null,
            })
            throw error;
        }
    
    
    },

    logout: async () => {
        set({isLoading: true, error: null, message: null})


        try{
            const response = await axios.post(`${API_URL}/logout`)
            const {message} = response.data
            set({message, isLoading: false, user: null, error: null})

            return {message}
        }catch (error){
            set({
                isLoading: false,
                error: error.response.data.message || "Error loggin out",
            })

            throw error
        }

    }
    

}))