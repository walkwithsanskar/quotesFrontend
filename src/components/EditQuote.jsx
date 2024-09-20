import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({ text: "", author: "" });
  const { text, author } = quote;

  useEffect(() => {
    const fetchQuote = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`https://quotesbackend-5ten.onrender.com/api/quotes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuote(res.data);
      } catch (err) {
        toast.error("Failed to load quote.");
      }
    };

    fetchQuote();
  }, [id]);

  const onChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://quotesbackend-5ten.onrender.com/api/quotes/${id}`,
        { text, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Quote updated successfully!");
      navigate("/quotes");
    } catch (error) {
      toast.error("Failed to update quote. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto  p-2 mt-40">
      <h2 className="text-2xl mb-4 font-extrabold text-center">Edit Quote</h2>
      <input
        type="text"
        name="text"
        value={text}
        onChange={onChange}
        placeholder="Quote"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <input
        type="text"
        name="author"
        value={author}
        onChange={onChange}
        placeholder="Author"
        className="w-full p-4 border border-gray-300 rounded mb-4 "
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        Update Quote
      </button>
    </form>
  );
};

export default EditQuote;
