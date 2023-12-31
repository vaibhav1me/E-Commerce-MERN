import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateLogin, checkCurrentUser, fetchUser } from "../apis/api";
import { LoginContext } from "../context/DataProvider";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser();
      if (!response.data.message) {
        var response2 = await fetchUser(response.data.id);
        setUser(response2.data.user);
        navigate("/");
      }
    };
    checkUserStatus();
  }, []);

  const [message, setMessage] = useState();
  const [login, setLogin] = useState({});

  const updateLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setMessage("");
    let response = await authenticateLogin(login);
    const data = response.data;
    if (data.message != "Login Successful") {
      setMessage(data.message);
    } else {
      localStorage.setItem("jwt", data.token);
      setUser(data.user);
      navigate("/");
    }
  };

  return (
    <section className="pt-[1rem]">
      <h1 className="bg-primary small:text-[2rem] text-[10vw] underline text-center ">
        ShopAseZ.com
      </h1>
      <div className="border-[2px] border-yellow px-[1.5rem] py-[1rem] w-[90%] m-auto mt-[1rem]">
        <h1 className="text-[1.5rem] text-center">Welcome Buddy!</h1>
        <div className="mt-[1rem]">
          <h2 className="">Email</h2>
          <input
            type="email"
            placeholder="Enter a valid email"
            onChange={(e) => {
              updateLogin(e);
            }}
            name="email"
            className="px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]"
          />
        </div>
        <div className="mt-[1rem]">
          <h2 className="">Password</h2>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              updateLogin(e);
            }}
            className="px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]"
          />
        </div>
        <div className="mt-[1rem]">
          <div className="text-center">
            <button
              className="bg-white text-[#162e44] px-[.5rem] py-[.2rem]"
              onClick={() => loginUser()}
            >
              Continue
            </button>
            {message && (
              <div className="text-[#FF0000] mt-[1rem]">{message}</div>
            )}
          </div>
        </div>
        <p className="text-center mt-[1rem]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#70ace3]">
            Create Account
          </Link>
        </p>
        <button>
          <Link to="/" className="text-yellow">
            Back To Home
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Login;
