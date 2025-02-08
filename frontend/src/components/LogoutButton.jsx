import { Link } from "react-router-dom"

export const Logout = () =>  {
    return (
        <Link to={'/login'}>Logout</Link>
    );
}