import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user, isLoading } = useContext(UserContext);
// console.log(user);
  return (
    <div className="container pt-20 mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-black">Dashboard</h2>
      {isLoading ? (
        <p className="text-xl text-gray-800">Loading...</p>
      ) : user ? (
        <>
          <h2 className="text-xl text-gray-800">Hi {user.user.name}!</h2>
          <p className="text-xl text-gray-800">
            USER TYPE: {user.user.userType}
          </p>
          <p className="text-xl text-gray-800">ID: {user.user.rollId}</p>
          <p className="text-xl text-gray-800">EMAIL: {user.user.email}</p>
        </>
      ) : (
        <p className="text-xl text-gray-800">User not found</p>
      )}
    </div>
  );
}
