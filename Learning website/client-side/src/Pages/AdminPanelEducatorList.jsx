import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import "../App.css";
import Loading from "../components/Loading.jsx"; 
import SearchBar from '../components/SearchBar.jsx';

function AdminPanelEducatorList() {
    const APP_URI = "http://localhost:8000";
    const token = localStorage.getItem("token");
    const [educator, setEducator] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(""); // Store search query
    const navigate = useNavigate();

    // Function to fetch educator based on search query
    const FetchAllProvider = useCallback(async () => {
        setLoading(true);
        try {
          const response = await fetch(`${APP_URI}/api/admin/providerlists?search=${searchQuery}`, {
            method: "GET",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          console.log("Educator list")
          console.log(data)
          if (response.ok) {
            setEducator(data.msg); 
          } else {
            setEducator([]);
          }
        } catch (error) {
            setEducator([]);
        } finally {
            setLoading(false);
        }
    }, [token, searchQuery]); // Runs when searchQuery changes

    // Debounce search to prevent excessive API calls
    useEffect(() => {
      FetchAllProvider();
    }, [FetchAllProvider]);

    return (
        <>
            <AdminNavbar />
            <center><h2 className="text-xl font-bold mb-4 my-4">Educator List</h2></center>
            
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
                                <th className="border border-gray-300 px-6 py-4 w-1/3">Total Courses Launched</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educator.map((educator, index) => (
                                <tr 
                                    key={educator._id} 
                                    className={`cursor-pointer text-center transition-all transform ${
                                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    } hover:bg-gray-200 hover:scale-105 active:scale-105`}
                                    onClick={() => navigate(`/admin/educator/${educator._id}`)}
                                >
                                    <td className="border border-gray-300 px-6 py-4">{educator.username}</td>
                                    <td className="border border-gray-300 px-6 py-4">{educator.email}</td>
                                    <td className="border border-gray-300 px-6 py-4">{Array.isArray(educator.courses) ? educator.courses.length : 0}</td>
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

export default AdminPanelEducatorList;
