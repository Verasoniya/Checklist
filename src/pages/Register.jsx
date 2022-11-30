import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { apiRequest } from "../context/apiRequest";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email && username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      username,
      password,
    };
    apiRequest("register", "POST", body)
      .then((res) => {
        if (res.status === "success") {
          alert("Success Register..!");
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.toString());
      });
  };
  return (
    <div className="flex justify-center bg-gray-200 w-full min-h-screen">
      <div className="w-fit self-center flex flex-col p-4 bg-white shadow-lg">
        <form className="flex flex-col justify-center gap-2" onSubmit={(e) => handleSubmit(e)}>
          <p>Create Account</p>
          <Input id="input-email" type="email" placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)} />
          <Input id="input-username" type="text" placeholder="Your Username" required onChange={(e) => setUsername(e.target.value)} />
          <Input id="input-password" type="password" placeholder="Your Password" required onChange={(e) => setPassword(e.target.value)} />
          <Button Id="btn-submit" Label="Submit" />
        </form>
        <p>
          Have an account?
          <Link to="/login" className="text-[#4285F4] ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
