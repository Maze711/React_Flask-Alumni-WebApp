import { Link } from "react-router-dom";

export const Logout = () => {
    return (
        <Link style={{color: "white", textDecoration: "none"}} to={'/login'}>Logout</Link>
    );
}