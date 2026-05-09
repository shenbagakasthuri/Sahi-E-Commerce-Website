import {
  createContext,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  loginUser,
  registerUser
} from "../api/authApi";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext =
  createContext();


export function AuthProvider({
  children
}) {

  const navigate =
    useNavigate();


  const [user,
    setUser] =
      useState(() => {

        try {

          const savedUser =
            localStorage.getItem(
              "user"
            );


          if (
            !savedUser ||
            savedUser === "undefined"
          ) {
            return null;
          }


          return JSON.parse(
            savedUser
          );

        } catch {

          return null;
        }
      });


  const [loading,
    setLoading] =
      useState(false);


  const login =
    async (
      email,
      password
    ) => {

      try {

        setLoading(
          true
        );


        const data =
          await loginUser(
            email,
            password
          );


        const {
          token,
          user
        } = data;


        localStorage.setItem(
          "token",
          token
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            user
          )
        );


        setUser(
          user
        );


        if (
          user.role ===
          "ADMIN"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/"
          );
        }

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Invalid credentials"
        );

      } finally {

        setLoading(
          false
        );
      }
      
    };


  const register =
    async (
      userData
    ) => {

      try {

        setLoading(
          true
        );


        await registerUser(
          userData
        );


        alert(
          "Registration successful"
        );


        navigate(
          "/login"
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          error.response?.data?.message ||
  "Registration failed"
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  const logout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setUser(
        null
      );

      navigate(
        "/"
      );
    };


  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        register,

        logout

      }}
    >

      {children}

    </AuthContext.Provider>
  );
}