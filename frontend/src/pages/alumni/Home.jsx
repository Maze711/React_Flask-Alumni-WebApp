import { useLocation } from 'react-router-dom';

export const Home = () => {
    const location = useLocation();
    const full_name = location.state?.full_name || 'Alumni';

    return (
        <>
            <h1>Welcome, {full_name}</h1>
            <p>This is the home page for alumni.</p>
        </>
    );
};