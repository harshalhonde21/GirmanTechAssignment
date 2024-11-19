import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import bgImage from "/bg-home.svg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle the form submit (when Enter key is pressed)
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchTerm.trim()) {
      navigate(`/search-card?query=${searchTerm}`); // Navigate with search query as URL parameter
    }
  };

  return (
    <div className="h-screen overflow-hidden">
  <div
    className="relative h-full w-full bg-cover bg-center flex flex-col items-center justify-start"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-blue-300 to-transparent"></div>
    <div className="z-10 w-full flex flex-col items-center pt-40 sm:pt-20">
      <img
        src="/logo-home.svg"
        alt="Girman Logo"
        className="mb-5 w-[220px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[550px] mx-4"
      />
      <form onSubmit={handleSearch} className="relative w-3/4 max-w-md mx-4 sm:w-11/12 md:w-3/4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </form>
    </div>
  </div>
</div>

  );
};

export default Home;
