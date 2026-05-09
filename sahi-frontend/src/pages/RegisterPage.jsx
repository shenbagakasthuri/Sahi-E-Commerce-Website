import { useState } from "react";

import {
  Link
} from "react-router-dom";



import "../styles/AuthPage.css";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";



function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const register = async (userData) => {
  try {
    // eslint-disable-next-line no-undef
    setLoading(true);

    const res = await registerUser(userData);

    console.log("REGISTER RESPONSE:", res);

    alert(res.message || "Registration successful");

    navigate("/login");

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );

  } finally {
    // eslint-disable-next-line no-undef
    setLoading(false);
  }
};


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleSubmit = (e) => {

    e.preventDefault();

    register({
      name,
      email,
      password
    });
  };


  return (

    <div className="login-page">

      <div>

        <h2>
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
          >

            {loading
              ? "Loading..."
              : "Register"}

          </button>

        </form>


        <div className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}


export default RegisterPage;