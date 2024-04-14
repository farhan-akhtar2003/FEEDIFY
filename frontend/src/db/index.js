// ////////////////////////////////////////////////
//FEEDIFY>FRONTEND>SRC>DB>INDEX.JS
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests

// Signup function
export const signup = async (email, pwd) => {
  try {
    // Make a POST request to your backend API endpoint for user registration
    const response = await axios.post("/api/signup", { email, pwd });
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Login function
export const login = async (email, pwd) => {
  try {
    // Make a POST request to your backend API endpoint for user login
    const response = await axios.post("/api/login", { email, pwd });
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Logout function
export const logout = async () => {
  try {
    // Make a POST request to your backend API endpoint for user logout
    await axios.post("/api/logout");
    // Clear user data from local storage
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Custom hook for user authentication
export const useAuthenticated = () => {
  const [user, setUser] = useState(null); // Initialize user state as null

  useEffect(() => {
    // Fetch user data from the server when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUser(response.data); // Set the user state with the response data
      } catch (error) {
        console.error("Fetch user error:", error);
        setUser(null); // Set user state to null if there's an error
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  return user; // Return the user state
};

// Function to create a form
export const createForm = async (formModel) => {
  try {
    // Make a POST request to your backend API endpoint to create a form
    const response = await axios.post("/api/forms", formModel);
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to fetch forms
export const getForms = async () => {
  try {
    // Make a GET request to your backend API endpoint to fetch forms
    const response = await axios.get("/api/forms");
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to fetch a single form
export const getForm = async (formId) => {
  try {
    // Make a GET request to your backend API endpoint to fetch a single form
    const response = await axios.get(`/api/forms/${formId}`);
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to delete a form
export const deleteForm = async (formId) => {
  try {
    // Make a DELETE request to your backend API endpoint to delete a form
    const response = await axios.delete(`/api/forms/${formId}`);
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to upload a file
export const uploadFile = async (file, fileName) => {
  try {
    // Make a POST request to your backend API endpoint to upload a file
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to submit a form
export const submitForm = async (submission, formId) => {
  try {
    // Make a POST request to your backend API endpoint to submit a form
    const response = await axios.post(
      `/api/forms/${formId}/submissions`,
      submission
    );
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// Function to fetch submissions
export const getSubmissions = async (opts) => {
  try {
    // Make a GET request to your backend API endpoint to fetch submissions
    const response = await axios.get("/api/submissions", { params: opts });
    return response.data; // Return the response from the server
  } catch (error) {
    throw error.response.data.error; // Throw an error if the request fails
  }
};

// import { useState, useEffect } from "react";
// //import { auth, firestore, storage } from "./firebase";

// export const signup = async (email, pwd) =>
//   auth.createUserWithEmailAndPassword(email.trim(), pwd.trim());
// export const login = async (email, pwd) =>
//   auth.signInWithEmailAndPassword(email.trim(), pwd.trim());
// export const logout = () => {
//   localStorage.setItem("gfc-user", "");
//   return auth.signOut();
// };

// export const useAuthenticated = () => {
//   const [user, setUser] = useState({});
//   useEffect(() => {
//     auth.onAuthStateChanged((usr) => setUser(usr));
//   }, []);
//   return user;
// };

// export const createForm = (formModel) => {
//   const user = JSON.parse(localStorage.getItem("gfc-user"));
//   return firestore.collection("forms").add({ ...formModel, uid: user.uid });
// };

// export const getForms = async () => {
//   const user = JSON.parse(localStorage.getItem("gfc-user"));
//   let docs = await firestore.collection("forms").get({
//     uid: user.uid,
//   });
//   docs = docs.docs;
//   let forms = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   return forms;
// };

// export const getForm = async (ops) => {
//   let docs = await firestore.collection("forms").get(ops);
//   let doc = docs.docs[0];
//   doc = { ...doc.data(), id: doc.id };
//   return doc;
// };

// export const deleteForm = async (formId) => {
//   let submissions = await firestore
//     .collection("submissions")
//     .where("formId", "==", formId)
//     .get();
//   submissions = submissions.docs;
//   for (let submission of submissions) {
//     await firestore.collection("submissions").doc(submission.id).delete();
//   }
//   return firestore.collection("forms").doc(formId).delete();
// };

// export const uploadFile = (file, fileName) => {
//   let ref = storage.ref("files/" + fileName);
//   return ref.put(file);
// };

// export const submitForm = (submission, formId) =>
//   firestore.collection("submissions").add({
//     submission,
//     formId,
//   });

// export const getSubmissions = async (opts) => {
//   let docs = await firestore.collection("submissions").get(opts);
//   docs = docs.docs;
//   let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   console.log(submissions);
//   return submissions;
// };
