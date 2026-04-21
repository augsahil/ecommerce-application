import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { UserSlicePath } from "@/redux/slice/user.slice";
import { useNavigate, Outlet } from 'react-router-dom';
import LoaderComponent from '@/components/ui/LoaderComponent';

const AuthLayout = ({ children }) => {
    const user = useSelector(UserSlicePath);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log("user is: ", user);
            
            // navigate("/dashboard");
        } else {
            console.log("user not found, staying on auth page");
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderComponent />
            </div>
        );
    }

    return (
        <>
            {children ? children : <Outlet />}
        </>
    );
};

export default AuthLayout;