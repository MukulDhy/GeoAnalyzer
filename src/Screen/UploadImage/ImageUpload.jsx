import React, { useState } from "react";
import "./ImageUpload.css"; // Import your CSS file
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setImageDetail } from "../../Redux/actions/allAction";

const ImageUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.pathname.split("/").pop();

  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];

    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(newFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("config = ", config);
    try {
      const response = await axios.post(
        "http://localhost:6969/api/v1/image/new",
        formData,
        config
      );
      dispatch(setImageDetail(imagePreviewUrl));
      alert("Image uploaded successfully");
      if (task === "rock" || task === "mineral") {
        navigate(`/identify/${task}?imageId=${response.data.imageId}`);
        return;
      }

      navigate(`/Analysing/${task}?imageId=${response.data.imageId}`);
    } catch (error) {
      console.error("Upload error", error);
      alert("Error uploading image: " + error.message);
    }
  };

  const imagePreview = imagePreviewUrl ? (
    <img src={imagePreviewUrl} alt="Preview" />
  ) : (
    <div className="previewText my-10">Please select an Image for Preview</div>
  );

  return (
    <>
      <div className="px-20 py-10">
        <div className="previewText my-10 text-center text-3xl">
          Upload Image
        </div>
        <div className="previewComponent">
          <form onSubmit={handleUpload}>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              name="file"
              onChange={handleImageChange}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (MAX. 800x200px).
            </p>
            <div className="imgPreview card my-5">{imagePreview}</div>
            {file && (
              <button type="submit" className="text-center w-50px">
                <span className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md">
                  Upload
                </span>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
