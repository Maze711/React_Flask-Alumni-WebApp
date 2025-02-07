import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export const Dean = () => {
    const location = useLocation();
    const full_name = location.state?.full_name || 'Dean';
    const [ids, setIds] = useState([]);

    const getUserData = async () => {
        // GET the user data from the server/backend
        try {
            const { data } = await axios.get('/api/ids', {
                withCredentials: true,
            });
            const alumni_ids = data.alumni_ids;
            toast.success('Alumni IDs fetched successfully');
            return alumni_ids;
        } catch (error) {
            setIds([]);
            console.log(error);
            // navigate('/login'); // Navigates them back to login
            toast.dismiss();
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.message);
            }
            throw error.message;
        }
    };

    useEffect(() => {
        getUserData()
            .then((alumni_ids) => {
                setIds(alumni_ids);
            })
            .catch((error) => {
                toast.error(error);
                console.log(error);
            });
    }, []);


    return (
        <>
            <h1>Welcome, {full_name}</h1>
            <h2>ALUMNI IDs:</h2>
            <ul>
                {ids.length > 0 ? (
                    ids.map((id) => (
                        <li key={id}>{id}</li>
                    ))
                ) : (
                    <p>No current User</p>
                )}
            </ul>
        </>
        
    );
};