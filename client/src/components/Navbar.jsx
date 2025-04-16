import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        const { message } = await logout();
        toast.success(message);
    };

    return (
        <nav className="bg-[#252422] text-[#FFFCF2] px-4 py-4 md:px-12 md:py-6">
            <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/icon-site.svg" alt="MusicUa Icon" className="w-6 h-6" />
                    <span className="font-semibold tracking-wider text-lg md:text-xl">MusicUa</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden focus:outline-none"
                >
                    <img src="/menu.svg" alt="Menu" className="w-6 h-6" />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-5 text-lg">
                    <Link to="/"><p className="px-3 py-2 hover:underline">Home</p></Link>
                    <Link to="/musics"><p className="px-3 py-2 hover:underline">Music</p></Link>
                    <Link to="/biofrafs"><p className="px-3 py-2 hover:underline">Biograf</p></Link>
                    <Link to="/search"><p className="px-3 py-2 hover:underline">Search</p></Link>
                </div>

                {/* User Auth Buttons or Menu */}
                <div className="hidden md:flex items-center space-x-5 text-lg">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="bg-[#412f2f] px-3 py-2 text-white flex items-center"
                            >
                                <span className="mr-2">{user.username}</span>
                                <img src="/arrow-down.svg" alt="arrow down" className="w-6 h-6" />
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-[#4d5049] shadow-lg rounded-md z-50">
                                    <Link to="/add-biograf">
                                        <p className="px-4 py-2 border-b border-gray-500 hover:bg-[#5e6456]">Add Biograf</p>
                                    </Link>
                                    <Link to="/add-music">
                                        <p className="px-4 py-2 border-b border-gray-500 hover:bg-[#5e6456]">Add Music</p>
                                    </Link>
                                    <p onClick={handleLogout} className="px-4 py-2 bg-[#363232] hover:bg-[#4d4444] cursor-pointer">Logout</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login"><p className="bg-[#3a413d] px-3 py-2 rounded">Log in</p></Link>
                            <Link to="/signup"><p className="bg-[#3a413d] px-3 py-2 rounded">Sign up</p></Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    <Link to="/"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Home</p></Link>
                    <Link to="/musics"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Music</p></Link>
                    <Link to="/biofrafs"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Biograf</p></Link>
                    <Link to="/search"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Search</p></Link>

                    {user ? (
                        <>
                            <Link to="/add-biograf"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Add Biograf</p></Link>
                            <Link to="/add-music"><p className="block px-4 py-2 hover:bg-[#3b3a36] rounded">Add Music</p></Link>
                            <p onClick={handleLogout} className="block px-4 py-2 bg-[#363232] hover:bg-[#4d4444] rounded cursor-pointer">Logout</p>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><p className="block px-4 py-2 bg-[#3a413d] rounded">Log in</p></Link>
                            <Link to="/signup"><p className="block px-4 py-2 bg-[#3a413d] rounded">Sign up</p></Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
