import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";


export const Logout = () =>  {
    const { logout } = useAuthContext()
    const navigate = useNavigate();

    const handeLogout = () => {
        const isLoggedOut = confirm("Are you sure you want to log out?");
        if(!isLoggedOut){
            return
        }

        // Logged out the user and route them back to logout
        logout();
        navigate('/login');
        toast.dismiss();
        toast.success("You have been successfully logged out");
    }

    return (
        <button className="text-white bg-transparent border-0" onClick={handeLogout}>Logout</button>
    );
}
