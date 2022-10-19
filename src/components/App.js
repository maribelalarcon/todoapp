import React, { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("");
  const [todos, setTodos] = useState({});

  const onNewTodoChange = (event) => setNewTodo(event.target.value);
  const onFilterChange = (event) => setFilter(event.target.value);

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

  const onTodoChecked = (id) => (event) => {
    setTodos({
      ...todos,
      [id]: {
        ...todos[id],
        checked: event.target.checked,
      },
    });
  };

  const onTodoEdit = (id) => () => {
    setTodos({
      ...todos,
      [id]: {
        ...todos[id],
        editing: !todos[id].editing,
      },
    });
  };

  const onTodoUpdate = (id) => (event) => {
    setNewTodo();
    setTodos({
      ...todos,
      [id]: {
        ...todos[id],
        text: event.target.value,
      },
    });
  };

  const onTodoDelete = (id) => () => {
    let _todos = { ...todos };
    delete _todos[id];
    setTodos(_todos);
  };

  return (
    <div className="App">
      <form onSubmit={onAddNewTodo}>
        <input type="text" value={newTodo} onChange={onNewTodoChange} />
        <input type="submit" value="+" />
      </form>
      <input type="text" value={filter} onChange={onFilterChange} />
      <button>Cats</button>
      <ul>
        {Object.values(todos)
          .filter(({ text }) => text.indexOf(filter) !== -1)
          .map(({ id, text, checked, editing }) => (
            <li key={id}>
              <input
                type="checkbox"
                checked={checked}
                onChange={onTodoChecked(id)}
              />

              {editing ? (
                <input type="text" value={text} onChange={onTodoUpdate(id)} />
              ) : (
                text
              )}
              <button onClick={onTodoEdit(id)}>{editing ? "Save" : "E"}</button>
              <button onClick={onTodoDelete(id)}>X</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
