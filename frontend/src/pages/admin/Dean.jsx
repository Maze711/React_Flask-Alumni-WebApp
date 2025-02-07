import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const Dean = () => {
    const [ids, setIds] = useState(null);

    const getUserData = async () => {
        // GET the user data from the server/backend
        try {
            const { data } = await axios.get('/');
            const alumni_ids = await data.alumni_ids;

            return alumni_ids;
        } catch (error) {
            console.log(error);
            // navigate('/login'); // Navigates them back to login
            setId(null);
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
                    <li>{id}</li>
                ))}
            </ul>
        </>
        
    );
};