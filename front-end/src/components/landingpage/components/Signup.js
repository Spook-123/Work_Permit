import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:4000/api/v1/signup", { email, password })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            history("/", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2634] ">
      <div className="max-w-md w-full bg-[#263043] p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Signup</h1>
        <form onSubmit={submit}>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 focus:outline-none"
          >
            Signup
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2 text-white">OR</p>
          <Link to="/" className="text-blue-500">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
