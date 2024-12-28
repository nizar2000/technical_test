import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const titleInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const title = localStorage.getItem("title");
    const price = localStorage.getItem("price");
    const image = localStorage.getItem("image");

    setId(id);
    setTitle(title);
    setPrice(price);

    if (image) {
      setCurrentImage(`http://localhost:8000/storage/${image}`);
    }

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset success message before submitting
  
    // Form validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
  
    if (!price) {
      setError("Price is required");
      return;
    }
  
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', title.trim());
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      setLoading(true); // Start loading spinner
      const response = await axios.post(`http://localhost:8000/api/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      });
  
      console.log('Response:', response.data);
      alert('Success'); // Show the alert after successful update
      setSuccessMessage("Course updated successfully!"); // Optional: You can keep the success message as well
      setLoading(false); // Stop loading spinner
      setTimeout(() => {
        navigate("/read");
      }, 1500); // Navigate after showing success message
    } catch (error) {
      setLoading(false); // Stop loading spinner
      console.error("Error updating the course:", error.response?.data);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || "An error occurred while updating the course");
      }
    }
  };
  
  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (jpeg, png, jpg, gif)');
      return false;
    }
    setError('');
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImage(file)) {
      setImage(file);
    } else {
      e.target.value = '';
    }
  };

  return (
    <section className="  flex justify-center h-[130vh] w-full flex-col">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://9antra.tn/content/images/LogoBridge.png"
           
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Course
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

{successMessage && (
  <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
    <strong className="font-semibold">Success!</strong> {successMessage}
  </div>
)}
          
          <form className="space-y-6" onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              ref={titleInputRef}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={price}
              ref={priceInputRef}
              required
              min="0"
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            {currentImage && (
              <div className="mt-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Image:</label>
                <img
                  src={currentImage}
                  alt="Current course"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-700 file:border file:border-gray-300 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:bg-gray-100"
            />
            {image && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Image Preview:</label>
                <img
                  src={URL.createObjectURL(image)}
                  alt="New course preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Course'
              )}
            </button>

            <Link to="/read">
              <button
                type="button"
                className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back to Courses
              </button>
            </Link>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
};

export default Update;
