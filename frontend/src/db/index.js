// ////////////////////////////////////////////////
//FEEDIFY>FRONTEND>SRC>DB>INDEX.JS
import axios from "axios"; // Import Axios for HTTP requests

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

