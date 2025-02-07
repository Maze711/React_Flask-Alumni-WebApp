import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const Dean = () => {
    const [ids, setIds] = useState([]);

    const getUserData = async () => {
        // GET the user data from the server/backend
        try {
            const response = await axios.get('/api/ids', {
                withCredentials: true,
            });
            const alumni_ids = response.data.alumni_ids;
            toast.success('Alumni IDs fetched successfully');
            return alumni_ids;
        } catch (error) {
            console.log(error);
            // navigate('/login'); // Navigates them back to login
            setIds([]);
            toast.dismiss();
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.message);
            }
            throw error;
        }
    };

    useEffect(() => {
        getUserData()
            .then((alumni_ids) => {
                setIds(alumni_ids);
            })
            .catch((error) => {
                console.log( error);
            });
    }, []);


    return (
        <>
            <h1>ALUMNI IDs:</h1>
            <ul>
                {ids.map((id) => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </>
        
    );
};