import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import ProviderNavbar from '../components/ProviderNavbar';

function ProviderProfile() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { Provider, loading } = useAuth();

    useEffect(() => {
        if (loading) return; 
        if (Provider) {
            setUsername(Provider.username);
            console.log("This is the info of provider: " + JSON.stringify(Provider));
        } else {
            // Navigate to the previous page if not authorized
             navigate(-1); 
        }
    }, [Provider, loading, navigate]);

    if (loading) {
        return <>
        <ProviderNavbar />
        <p>Loading...</p>
        </>

    }

    return (
        <>
        <ProviderNavbar />
        <div>
            <h1>Provider Profile</h1>
            <p>Username: {username}</p>
        </div>
        </>
    );
}

export default ProviderProfile;

