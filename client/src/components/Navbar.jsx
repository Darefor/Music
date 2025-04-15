import { Link } from "react-router"
import { useAuthStore } from "../store/authStore"
import { useState } from "react";
import toast from "react-hot-toast";


const Navbar = () => {
    const {user, logout} = useAuthStore()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = async () => {
        const {message} = await logout()
        toast.success(message)
    }
    
    // console.log("User: ", user)
    return (
        <nav className="bg-[#252422] flex justify-between items-center text-[#FFFCF2] px-4 md:px-12 py-4 md:py-6">

            <Link to="/">
                <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer flex items-center space-x-2">
                    <img src="/icon-site.svg" alt="MusicUa Icon" className="w-6 h-6" />
                    <span>MusicUa</span>
                </label> 
            </Link>
                         
            <div className="flex items-center space-x-5 md:text-lg">
                <Link to={"/"}><p className="px-3 py-2">Home</p></Link>
                <Link to={"/musics"}><p className="px-3 py-2">Music</p></Link>
                <Link to={"/biofrafs"}><p className="px-3 py-2">Biograf</p></Link>
                <Link to={"/search"}><p className="px-3 py-2">Search</p></Link>
            </div>


            {user ? (

                <div className="relative">
                    <button
                    onClick={toggleUserMenu}
                    className="bg-[#412f2f] px-3 py-2 text-white flex md:text-lg "
                    >
                        <span className="mr-2">{user.username}</span>
                        <img src="/arrow-down.svg" alt="arrow down" className="w-6 h-6 bord" />
                    </button>
                    {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-35  bg-[#4d5049] shadow-lg rounded-t-md">
                        <Link to="/add-biograf">
                        <p className="px-4 py-2 border-b rounded-t-md border-b-gray-500 hover:bg-[#5e6456]">Add Biograf</p>
                        </Link>
                        <Link to="/add-music">
                        <p className="px-4 py-2 border-b-1 border-b-gray-500 hover:bg-[#5e6456]">Add Music</p>
                        </Link>
                        <Link to="/logout">
                        <p onClick={handleLogout} className="px-4 py-2 bg-[#363232] hover:bg-[#4d4444]">Logout</p>
                        </Link>
                    </div>
                    )}
                </div>
            ) : (
          
                <div className="flex items-center space-x-5 md:text-lg">
                    <Link to={"/login"}><p className="bg-[#3a413d] px-3 py-2">Log in</p></Link>
                    <Link to={"/signup"}><p className="bg-[#3a413d] px-3 py-2">Sign up</p></Link>
                </div>
           
            )}
        </nav>

    )
}

export default Navbar