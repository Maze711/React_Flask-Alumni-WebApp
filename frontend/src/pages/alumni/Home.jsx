import { Logout } from '../../components/LogoutButton';
import { AlumniNavbar } from "../../components/NavBar";

export const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <AlumniNavbar/>
            <h1>Welcome, {user.full_name}</h1>
            <p>This is the home page for alumni.</p>
            
            <Logout/>
            
        </>
    );
};