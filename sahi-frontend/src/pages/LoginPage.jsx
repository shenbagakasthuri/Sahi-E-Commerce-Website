import { useState } from "react";
import '../styles/AuthPage.css';
import { useAuth }
  from "../hooks/useAuth";

function LoginPage() {

  const { login, loading } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    login(email, password);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">

          {loading
            ? "Loading..."
            : "Login"}

        </button>

      </form>

    </div>
    </div>
  );
}

export default LoginPage;