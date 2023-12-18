import React from 'react'

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const user = localStorage.getItem("user") ?JSON.parse(localStorage.getItem("user")):null
    
    if(user !== null)
        return children
    else
        return <Navigate to="/"/>

}

export default PrivateRoute
