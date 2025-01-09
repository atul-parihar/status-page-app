import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log("loggedInUser: ", loggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!loggedInUser) {
      navigate('/');
    } 
    // If user role is not in allowedRoles, redirect to access-denied
    else if (!allowedRoles.includes(loggedInUser.role)) {
      navigate('/access-denied');
    }
  }, [loggedInUser, allowedRoles, navigate]); // Depend on user, allowedRoles, and navigate

  // Render children (the protected component) only if allowed
  if (loggedInUser && allowedRoles.includes(loggedInUser.role)) {
    return children;
  }

  // You can return a loading spinner or something else while checking the conditions
  return <div>Loading...</div>;
};

export default ProtectedRoute;
