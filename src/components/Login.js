import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../style/component.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const currentUserObject = JSON.parse(currentUser);
  const currentName = currentUserObject ? currentUserObject.userName : "";
  const currentPassword = currentUserObject ? currentUserObject.password : "";

  const [userName, setUserName] = useState(currentName);
  const [password, setPassword] = useState(currentPassword);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    currentUserObject && navigate(`/home/${currentUserObject.username}`);
  }, []);

  const nevigation = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: userName,
        password: password,
      });

      if (response.data && response.data.length !== 0) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate(`/home/${response.data.username}`);
      }
    } catch (e) {
      console.log(e);
      alert("One of the entered data is incorrect");
    }
  };

  const onSubmitHandler = () => {
    if (userName.length > 0 && password.length > 0) {
      nevigation();
    } else {
      alert("Enter your username and password");
    }
  };

  return (
    <div className={style.login}>
      <h1 style={{ color: "white" }}> Log In </h1>
      <form>
        <input
          className={style.inputPassword}
          onChange={onChangeUserName}
          id="name"
          type="text"
          placeholder="name"
        />
        <br />
        <br />
        <input
          className={style.inputName}
          onChange={onChangePassword}
          id="password"
          type="password"
          placeholder="password"
        />
        <br />
        <br />
        <div
          className={style.submit}
          onClick={() => {
            onSubmitHandler();
          }}
        >
          Go
        </div>
      </form>
    </div>
  );
}
