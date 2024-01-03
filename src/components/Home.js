import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/component.module.css";
export default function Home() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const currentUserObject = JSON.parse(currentUser);
  const currentUserName = currentUserObject.username;
  const currentName = currentUserObject.name;

  return (
    <div className={style.home}>
      <h1 className={style.welcome}>Welcome {currentName} !</h1>
      <h3 className={style.p}>
        Here you can see all the information you have on the server.
      </h3>
      <h3 className={style.p}>
        Information can be deleted and information can be uploaded.
      </h3>
      <div
        className={style.links}
        onClick={() => {
          navigate(`/${currentUserName}/todos/`);
        }}
      >
        Todos
      </div>
      <div
        className={style.links}
        onClick={() => {
          navigate(`/${currentUserName}/albums`);
        }}
      >
        Albums
      </div>

      <div
        className={style.links}
        onClick={() => {
          navigate(`/${currentUserName}/posts`);
        }}
      >
        Posts
      </div>
    </div>
  );
}
