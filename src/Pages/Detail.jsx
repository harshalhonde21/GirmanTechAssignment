import { useState, useEffect } from "react";
import { FaPhoneAlt, FaSearch, FaSearchLocation } from "react-icons/fa"; // Importing React icons
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom"; // Hook for URL location

const Detail = () => {
  const [data, setData] = useState([]); // State to store the fetched data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedItem, setSelectedItem] = useState(null); // State for selected card details
  const location = useLocation(); // Current location (URL)

  // Fetch the JSON data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  // Get the search query from the URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query") || ""; // Default empty
    setSearchQuery(urlQuery);
  }, [location.search]);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data); // Show all data if query is empty
    } else {
      setFilteredData(
        data.filter((item) =>
          item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data]);

  // Close the modal by setting selectedItem to null
  const closeModal = () => setSelectedItem(null);

  // Handle click outside the modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  };

  return (
    <div className="font-inter min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 p-6 flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-md mb-8">
  <div className="relative">
    {/* Search Icon */}
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <FaSearch className="text-gray-400 text-xl" />
    </div>

    {/* Input Field */}
    <input
      className="w-full p-4 pl-10 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>

  
      {/* Conditional Rendering */}
      {filteredData.length > 0 ? (
        // Cards Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              {/* Profile Image */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://i.ibb.co/wyNf9q6/coder.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
  
              {/* Name and Location */}
              <h3 className="text-3xl font-bold mb-2">{`${item.first_name} ${item.last_name}`}</h3>
              <p className="text-gray-500 text-sm flex items-center mb-4">
                <FaLocationDot className="mr-2 text-black-500" />
                {item.city}
              </p>
  
              {/* Phone Info */}
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 flex items-center">
                    <FaPhoneAlt
                      style={{ color: "black", fontWeight: "800" }}
                      className="mr-2"
                    />
                    {item.contact_number}
                  </p>
                  <p className="text-xs text-gray-400">Available on phone</p>
                </div>
                {/* Button */}
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
                  onClick={() => setSelectedItem(item)}
                >
                  Fetch Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No Results Found Placeholder
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src="/no-search.svg"
            alt="No Results Found"
            className="w-80 h-60 object-contain mb-4"
          />
          <p className="text-gray-600 text-lg">No results found. Please try another search term.</p>
        </div>
      )}
  
      {/* Modal */}
      {selectedItem && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div 
        style={{margin:'1rem'}} className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
            {/* Modal Content */}
            <h3 className="text-2xl font-bold mb-4">Fetch Details</h3>
            <p style={{ color: "grey" }} className="mb-4">
              Here are the details of following employee.
            </p>
            <p className="text-black-500">
              <strong>Name:</strong> {`${selectedItem.first_name} ${selectedItem.last_name}`}
            </p>
            <p className="text-black-500">
              <strong>Location:</strong> {selectedItem.city}
            </p>
            <p className="text-black-500">
              <strong>Contact Number:</strong> {selectedItem.contact_number}
            </p>
            <p className="text-black-500 mt-4">
              <strong>Profile Image:</strong>
            </p>
            <div className="w-28 h-28 overflow-hidden">
              <img
                src="https://i.ibb.co/wyNf9q6/coder.webp"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              style={{ border: "1px solid black", padding: "5px", borderRadius: "5px" }}
              className="absolute top-80 right-8 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
