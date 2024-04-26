import { useRef, useState } from "react";
import { Appbar } from "@/components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';

export const Publish = () => {
  const [title, setTitle] = useState(""); // to add prefill title
  const [content, setContent] = useState("");// to add prefill content
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };


  const handleSubmit = async () => {

    try {
      await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content, // Send plain text content to backend
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      navigate("/blogs"); // Redirect to blogs page on success
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle errors appropriately, e.g., display error message to user
    }
  };

  return (
    <div>
      <Appbar onSearch={() => {}} />
      <div className="p-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus outline-none"
        />
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)} // Update state with HTML content
          />
        <button
          onClick={handleSubmit}
          className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function ImageUpload() {
//   const [file, setFile] = useState<File | undefined>(); // Update the state type to File | undefined
//   const navigate = useNavigate();

//   // Function to handle file input change
//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   }

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     try {
//       // Ensure a file is selected before proceeding
//       if (!file) {
//         console.error("No file selected");
//         return;
//       }

//       // Create FormData object and append the selected file
//       const formData = new FormData();
//       formData.append("file", file);

//       // Make a POST request to upload the image to the backend
//       await axios.post(`${BACKEND_URL}/api/v1/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Set content type as multipart form-data
//           Authorization: localStorage.getItem("token"),
//         },
//       });

//       // Once the image is uploaded successfully, navigate to another page
//       navigate("/blogs");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       // Handle error if image upload fails
//     }
//   };

//   return (
//     <div className="ml-4">
//       <div className="flex gap-4">
//         <h2 className="font-bold text-xl">Add Image:</h2>
//         <input type="file" onChange={handleChange} />
//       </div>
//       <img src={file ? URL.createObjectURL(file) : ''} className="w-60 mt-5" alt="Selected image" />
//       <button
//         onClick={handleSubmit}
//         className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-6"
//       >
//         Upload
//       </button>
//     </div>
//   );
// }
