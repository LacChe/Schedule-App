import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const auth = useAuth0();

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
        <p>{JSON.stringify(auth)}</p>
        {auth.isAuthenticated && (
        <div>
            <img src={auth.user.picture} alt={auth.user.name} />
            <h2>{auth.user.name}</h2>
            <p>{auth.user.email}</p>
        </div>
        )}
    </>
  );
};

export default Profile;