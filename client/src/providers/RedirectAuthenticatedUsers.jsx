import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router"

const RedirectAuthenticatedUsers = ({children}) => {

    const {user} = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user, navigate])

    if(user) return null
    return <>{children}</>
}

export default RedirectAuthenticatedUsers