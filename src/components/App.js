import React, { useState } from "react";
import TodoList from "./TodoList";
import styles from "./App.module.css";

const CAT_API_URL = "https://catfact.ninja/facts";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("");
  const [numberOfCatPhrases, setNumberOfCatPhrases] = useState(10);
  const [todos, setTodos] = useState({});

  const onNewTodoChange = (event) => setNewTodo(event.target.value);
  const onFilterChange = (event) => setFilter(event.target.value);
  const onNumberOfCatPhrasesChange = (event) =>
    setNumberOfCatPhrases(event.target.value);

  const onTodosChange = (todos) => setTodos(todos);

  const onAddNewTodo = (event) => {
    event.preventDefault();
    const id = Date.now();
    setTodos({
      ...todos,
      [id]: {
        id,
        checked: false,
        editing: false,
        text: newTodo,
      },
    });
    setNewTodo("");
  };

  const onCatPhrasesLoad = async () => {
    const { data } = await fetch(
      `${CAT_API_URL}?${new URLSearchParams({
        limit: numberOfCatPhrases,
        max_length: 150,
      })}`
    ).then((response) => response.json());

    const baseId = Date.now();

    const catPhraseTodos = data.reduce((catPhraseMap, catPhrase, idx) => {
      const id = baseId + idx;
      return {
        ...catPhraseMap,
        [id]: {
          id,
          checked: false,
          editing: false,
          text: catPhrase.fact,
        },
      };
    }, {});

    setTodos({
      ...todos,
      ...catPhraseTodos,
    });
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Lista de tareas</h1>

      <div className={styles.topBar}>
        <div className={styles.newTodo}>
          <form onSubmit={onAddNewTodo}>
            <input
              type="text"
              value={newTodo}
              onChange={onNewTodoChange}
              placeholder="Add new todo..."
            />
            <input type="submit" value="+" className={styles.blueButton} />
          </form>
        </div>

        <div className={styles.filterAndCatPhrases}>
          <input
            type="text"
            value={filter}
            onChange={onFilterChange}
            placeholder="Filter todos..."
          />
          <input
            type="number"
            min={1}
            max={100}
            value={numberOfCatPhrases}
            onChange={onNumberOfCatPhrasesChange}
            placeholder="Filter todos..."
            className={styles.catPhrasesCount}
          />
          <button onClick={onCatPhrasesLoad} className={styles.blueButton}>
            Load cats
          </button>
        </div>
      </div>

      {Object.values(todos).length ? (
        <TodoList todos={todos} onChange={onTodosChange} filter={filter} />
      ) : (
        <p className={styles.noTodos}>No hay tareas pendientes</p>
      )}
    </div>
  );
}

export default App;
