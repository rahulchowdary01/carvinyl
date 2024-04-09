import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from '../contexts/Authcontext';

const PrivateRoutes=() => {
    const {CurrentUser}= useAuth();
    const isAuthenticated=CurrentUser !== null;

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
};

export default PrivateRoutes;