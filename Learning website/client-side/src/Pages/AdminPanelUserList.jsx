import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import "../App.css";
import Loading from "../components/Loading.jsx"; 
import SearchBar from '../components/SearchBar.jsx';

function AdminPanelUserList() {
    const APP_URI = "http://localhost:8000";
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(""); // Store search query
    const navigate = useNavigate();

    // Function to fetch users based on search query
    const FetchAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${APP_URI}/api/admin/userlists?search=${searchQuery}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("User List" + data)
            if (response.ok) {
                setUsers(data.msg);
            } else {
                setUsers([]);
            }
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [token, searchQuery]); // Runs when searchQuery changes

    // Debounce search to prevent excessive API calls
    useEffect(() => {
    FetchAllUsers();
    }, [FetchAllUsers]);

    return (
        <>
            <AdminNavbar />
            <center><h2 className="text-xl font-bold mb-4 my-4">User List</h2></center>
            
            {/* Search Bar */}
            <SearchBar onSearch={setSearchQuery} />

         {loading ? ( <Loading/> ) : (
            <div className="container-fluid mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="table-auto w-100 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-center">
                                <th className="border border-gray-300 px-6 py-4 w-1/3">Name</th>
                                <th className="border border-gray-300 px-6 py-4 w-1/3">Email</th>
                                <th className="border border-gray-300 px-6 py-4 w-1/3">Total Courses Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr 
                                    key={user._id} 
                                    className={`cursor-pointer text-center transition-all transform ${
                                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    } hover:bg-gray-200 hover:scale-105 active:scale-105`}
                                    onClick={() => navigate(`/admin/user/${user._id}`)}
                                >
                                    <td className="border border-gray-300 px-6 py-4">{user.username}</td>
                                    <td className="border border-gray-300 px-6 py-4">{user.email}</td>
                                    <td className="border border-gray-300 px-6 py-4">{Array.isArray(user.purchaseCourse) ? user.purchaseCourse.length : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
         )}
        </>
    );
}

export default AdminPanelUserList;
