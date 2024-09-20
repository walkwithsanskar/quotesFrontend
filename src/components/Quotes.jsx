import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import toast from "react-hot-toast";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to view quotes");
        navigate("/login");
        return;
      }

      try {
        await axios
          .get("https://quotesbackend-5ten.onrender.com/api/quotes", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setQuotes(res.data);
          });
      } catch (err) {
        toast.error("Failed to fetch quotes. Please try again.");
      }
    };

    fetchQuotes();
  }, [navigate]);

  const deleteQuote = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://quotesbackend-5ten.onrender.com/api/quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes(quotes.filter((quote) => quote._id !== id));
      toast.success("Quote deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete quote. Please try again.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-2 ">
      <h1 className="text-2xl mb-4 text-center font-bungee text-8xl">Quotes</h1>

      <div className=" p-3 space-x-4">
        <Link
          to="/add-quote"
          className="mb-4 inline-block bg-blue-500 text-white p-2 rounded hover:shadow-xl hover:bg-blue-600 transition-transform transform hover:scale-125  duration-300  "
        >
          Add Quote
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-transform transform hover:scale-125  duration-300 "
        >
          Logout
        </button>
      </div>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div
            key={quote._id}
            className="p-4 mt-3 ml-3 mb-4 border rounded-3xl  shadow-2xl "
          >
            <p className="mb-2 font-satisfy text-2xl">"{quote.text}"</p>
            <p className="text-right font-bold text-3xl font-satisfy text-gray-500">
              - {quote.author}
            </p>
            <div>
              <button
                onClick={() => deleteQuote(quote._id)}
                className="text-black p-2 hover:text-red-700 bg- bg-red-500 rounded-3xl"
              >
                Delete
              </button>

              <button>
                <Link
                  to={`/edit-quote/${quote._id}`}
                  className="ml-5 text-black p-2 hover:text-red-700  bg-gray-300 rounded-2xl hover:shadow-xl hover:bg-gray-100 transition duration-200"
                >
                  Edit
                </Link>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No quotes available.</p>
      )}
    </div>
  );
}

export default Quotes;
