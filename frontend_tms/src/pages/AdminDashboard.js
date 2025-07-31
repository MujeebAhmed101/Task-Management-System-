import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem("admin_logged_in");

        if (!isAdminLoggedIn) {
            navigate("/admin"); // Redirect to login if admin is not logged in
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/users");
                setUsers(response.data.users);
                setTotalUsers(response.data.users.length);
            } catch (err) {
                setError("Failed to fetch users.");
            }
        };

        fetchUsers();
    }, [navigate]);

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome Admin!</h1>
            <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

            {error && <p className="text-red-500">{error}</p>}

            <p className="mb-4 font-semibold text-2xl text-cyan-600 text-center">Total Users: {totalUsers}</p>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-cyan-600 text-white">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
