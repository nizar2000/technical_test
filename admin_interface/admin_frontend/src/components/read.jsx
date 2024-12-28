import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8000/api/courses/${id}`)
        .then(() => {
          setSuccessMessage("Course deleted successfully!");
          getData(); // Fetch updated data
        })
        .catch((err) => {
          setError("Error deleting course.");
          console.error(err);
        });
    }
  };
  
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
  };
  const closeModal = () => {
    setModalImage(null);
  };
  const getData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/api/courses")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching courses.");
        setIsLoading(false);
      });
  };

  const setToLocalStorage = (id, title, price, image) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("price", price);
    localStorage.setItem("image", image);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="mt-10 max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <img
          className="mx-auto h-12 w-auto"
          src="https://9antra.tn/content/images/LogoBridge.png"
          alt="Your Company"
        />
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Courses List</h2>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full shadow-lg rounded-lg overflow-hidden text-sm text-center text-gray-500">
        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
          <tr>
            <th className="px-6 py-3 font-medium">Course ID</th>
            <th className="px-6 py-3 font-medium">Title</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Image</th>
            <th className="px-6 py-3 font-medium">View Full Image</th> {/* New column */}
            <th className="px-6 py-3 font-medium">Edit</th>
            <th className="px-6 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-red-500">
                {error}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No courses available.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200 transition duration-300 ease-in-out`}
              >
                <td className="px-6 py-4 font-bold">{index + 1}</td>
                <td className="px-6 py-4 font-bold">{item.title}</td>
                <td className="px-6 py-4 font-bold">{item.price} TND</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:8000/storage/${item.image}`}
                    alt={item.title}
                    className="w-16 h-16 object-cover mx-auto rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  {/* Button to open the full image in a modal */}
                  <button
                    onClick={() => openImageModal(`http://localhost:8000/storage/${item.image}`)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1  px-4 rounded-lg transition duration-300"
                  >
                    View Full Image
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={"/update"}
                    onClick={() => setToLocalStorage(item.id, item.title, item.price, item.image)}
                  >
                    <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-1 px-4 rounded-lg transition duration-300">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-4 rounded-lg transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal to display the image in full screen */}
      {modalImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeModal}
  >
    <div className="relative max-w-4xl max-h-screen p-4 bg-white rounded-lg">
      <img
        src={modalImage}
        alt="Full screen"
        className="w-auto max-h-[550px] object-contain mx-auto"
      />
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
      >
        &times;
      </button>
    </div>
  </div>
)}

      </div>

      <div className="flex justify-center mt-8">
        <Link to={"/create"}>
          <button
            type="button"
            className="flex w-32 mb-10 justify-center rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md transition duration-300"
          >
            Add Course
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Read;
