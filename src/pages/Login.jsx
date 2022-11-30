import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiRequest } from "../context/apiRequest";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    apiRequest("login", "POST", body)
      .then((res) => {
        const { data } = res;
        const { token } = data;

        localStorage.setItem("token", token);
        setToken(token);
        alert("Success Login..!");
        navigate("/home");
      })
      .catch((err) => {
        alert(err.toString());
      });
  };
  if (token === "0" || token == null) {
    return (
      <div className="flex justify-center bg-gray-200 w-full min-h-screen">
        <div className="w-fit self-center flex flex-col p-4 bg-white shadow-lg">
          <form className="flex flex-col justify-center gap-2" onSubmit={(e) => handleSubmit(e)}>
            <p>Create Account</p>
            <Input id="input-username" type="text" placeholder="Your Username" required onChange={(e) => setUsername(e.target.value)} />
            <Input id="input-password" type="password" placeholder="Your Password" required onChange={(e) => setPassword(e.target.value)} />
            <Button Id="btn-submit" Label="Submit" />
          </form>
          <p>
            Dont have an account?
            <Link to="/register" className="text-[#4285F4] ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
}

export default Login;
