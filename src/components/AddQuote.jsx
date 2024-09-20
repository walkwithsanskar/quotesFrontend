import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddQuote() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://quotesbackend-5ten.onrender.com/api/quotes",
        { text, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Quote added successfully!");
      navigate("/quotes");
    } catch (err) {
      toast.error("Failed to add quote. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm mx-auto mt-10 sm:w-3/4 lg:w-1/2"
    >
      <h2 className="text-2xl mb-4 text-center ">Add Quote</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quote"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105  duration-300 "
        >
          Add Quote
        </button>
      </div>
    </form>
  );
}

export default AddQuote;
