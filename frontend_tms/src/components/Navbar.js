import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');  // Check if user is logged in
    const isAdminLoggedIn = localStorage.getItem("admin_logged_in"); // For admin

    const handleLogout = () => {
        if (isAdminLoggedIn) {
            localStorage.removeItem("admin_logged_in"); // Remove admin session
            navigate("/admin");
        } else {
            localStorage.removeItem("token"); // Remove user token
            navigate("/");
        }
    };

    return (
        <nav className="bg-cyan-600 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Left: System Name */}
                <Link to="/" className="text-white font-bold text-xl sm:text-2xl">Secure Task Management System(TMS)</Link>
                {/* Right: Buttons */}
                <div className="flex items-center space-x-3">
                    <Link
                        to="/admin"
                        className="bg-blue-600 text-white px-5 py-2 rounded-[20px] text-sm font-semibold hover:bg-blue-800 transition"
                    >
                        Admin
                    </Link>
                    {(token || isAdminLoggedIn) ? (
                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 text-white px-5 py-2 rounded-[20px] text-sm font-semibold hover:bg-blue-800 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-5 py-2 rounded-[20px] text-sm font-semibold hover:bg-blue-800 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-5 py-2 rounded-[20px] text-sm font-semibold hover:bg-blue-800 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar