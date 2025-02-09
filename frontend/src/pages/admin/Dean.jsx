import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../contexts/authContext';
import { Logout } from '../../components/LogoutButton';
import { AlumniNavbar } from "../../components/NavBar";

export const Dean = () => {
    const { user } = useAuthContext();
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
        <AlumniNavbar/>

            <h1>Welcome, {user ? user.full_name : "DEAN"}</h1>
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
            
            <Logout/>
        </>
        
    );
};