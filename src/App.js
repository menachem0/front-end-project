import style from './style/component.module.css';
import Home from './components/Home';
import Login from './components/Login';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Albums from './components/Albums';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className={style.App}>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="home/:username" element={<Home />} />
          <Route path="/:username/todos" element={<Todos />} />
          <Route path="/:username/posts" element={<Posts />} />
          <Route path="/:username/albums" element={<Albums />} />
          <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
