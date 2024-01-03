import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "../style/component.module.css";
import { useState, useEffect } from "react";
import Todo from "./todo";
export default function Todos() {
  const userId = useParams();
  const currentUser = localStorage.getItem("currentUser");
  const currentUserObject = JSON.parse(currentUser);
  const currentName = currentUserObject.name;
  const currentId = currentUserObject.id;
  const navigate = useNavigate();
  const [addTodo, setAddTodo] = useState(false);
  const [search, setSearch] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/todos/${currentId}`
    );
    console.log(response);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todoCompleted = (id) => {
    const listTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: (todo.completed + 1) % 2 } : todo
    );

    setTodos(listTodos);
    const myItem = listTodos.filter((item) => item.id === id);
    axios.put(`http://localhost:8080/todos/updateComleted/${id}`, {
      completed: myItem[0].completed,
    });
  };

  const upDateTitle = (e, id) => {
    e.preventDefault();
    const editTask = e.target.upDateTodo.value;
    if (editTask.length === 0) return;
    const listTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editTask } : todo
    );
    setTodos(listTodos);
    const myItem = listTodos.filter((item) => item.id === id);
    axios.put(`http://localhost:8080/todos/updateTitle/${id}`, {
      title: myItem[0].title,
    });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/todos/deletetodo/${id}`)
       fetchData();
  };

  const displeyTodos = () => {
    return todos.map((item) => (
      <Todo
        fetchData={fetchData}
        item={item}
        deleteTodo={deleteTodo}
        todoCompleted={todoCompleted}
        upDateTitle={upDateTitle}
      />
    ));
  };

  const randomComparison = () => Math.random() - 0.5;
  const randomSort = () => {
    const newArr = [...todos].sort((a, b) => randomComparison());
    setTodos(newArr);
  };

  const alphabet = () => {
    const newArr = [...todos].sort((a, b) => a.title.localeCompare(b.title));
    setTodos(newArr);
  };
  const isCompleted = () => {
    const newArr = [...todos].sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? -1 : 1
    );
    setTodos(newArr);
  };
  const handleSelect = (event) => {
    if (event.target.value === "a-z") {
      alphabet();
    } else if (event.target.value === "Serial") {
      fetchData();
    } else if (event.target.value === "Completed") {
      isCompleted();
    } else if (event.target.value === "Random") {
      randomSort();
    }
  };

  const creatNewTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target.add.value;
    if (newTodo.length === 0) return;
    todos.push({ userId: currentId, title: newTodo, completed: false });
    setTodos(todos);
    axios.post(`http://localhost:8080/todos/addtodos/${currentId}`, {
      title: newTodo,
    });
    setAddTodo(false);
  };
  const toSearch = (e) => {
    let searchTitle = e.target.value;
    let sortedTodos = [];
    todos.filter((element) => {
      if (element.title != null && element.title.startsWith(searchTitle)) {
        sortedTodos.push(element);
      }
    });
    searchTitle === "" ? fetchData() : setTodos(sortedTodos);
    return sortedTodos.map((item) => (
      <Todo
        fetchData={fetchData}
        item={item}
        deleteTodo={deleteTodo}
        todoCompleted={todoCompleted}
        upDateTitle={upDateTitle}
      />
    ));
  };

  return (
    <div>
      <div
        className={style.links}
        onClick={() => {
          navigate(`/home/${userId.id}`);
        }}
      >
        Home
      </div>
      <h1>tasks of {currentName} !</h1>
      <div className={style.todosContainer}>
        <div className={style.header}>
          <span className={style.selectBy}> Order by:</span>

          <select className={style.select} onChange={handleSelect}>
            <option>Order by</option>
            <option value="a-z">A-Z</option>
            <option value="Serial">Serial</option>
            <option value="Completed">Completed</option>
            <option value="Random">Random</option>
          </select>
          <div
            className={style.addTodoButton}
            onClick={() => {
              setAddTodo(true);
            }}
          >
            Add Todo
          </div>
          <div className={style.addTodoButton} onClick={() => setSearch(true)}>
            Search
          </div>
        </div>
        <br />
        <form
          style={addTodo ? { display: "block" } : { display: "none" }}
          onSubmit={(e) => {
            creatNewTodo(e);
          }}
        >
          <input
            className={style.addTodo}
            name="add"
            placeholder="Add a task"
          />
          <button className={style.sendNewTodo}>Send</button>
        </form>
        <input
          className={style.search}
          name="search"
          placeholder="search"
          style={search ? { display: "block" } : { display: "none" }}
          onChange={(e) => toSearch(e)}
        />
        {displeyTodos()}
      </div>

      <form></form>
    </div>
  );
}
