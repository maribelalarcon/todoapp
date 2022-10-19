import React, { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState({
    1: {
      id: 1,
      checked: false,
      text: "comprar leche",
    },
    2: {
      id: 2,
      checked: true,
      text: "hacer la cama",
    },
  });

  const onNewTodoChange = (event) => setNewTodo(event.target.value);

  const onAddNewTodo = () => {
    const id = Date.now();
    setTodos({
      ...todos,
      [id]: {
        id,
        checked: false,
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

  return (
    <div className="App">
      <input type="text" value={newTodo} onChange={onNewTodoChange} />
      <button onClick={onAddNewTodo}>+</button>
      <button>Filter</button>
      <button>Cats</button>
      <ul>
        {Object.values(todos).map(({ id, text, checked }) => (
          <li key={id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={onTodoChecked(id)}
            />
            {text}
            <button>X</button>
            <button>E</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
