import React, { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      checked: false,
      text: "comprar leche",
    },
    {
      id: 2,
      checked: true,
      text: "hacer la cama",
    },
  ]);

  const onNewTodoChange = (event) => setNewTodo(event.target.value);

  const onAddNewTodo = () =>
    setTodos([
      ...todos,
      {
        id: Date.now(),
        checked: false,
        text: newTodo,
      },
    ]);

  return (
    <div className="App">
      <input type="text" value={newTodo} onChange={onNewTodoChange} />
      <button onClick={onAddNewTodo}>+</button>
      <button>Filter</button>
      <button>Cats</button>
      <ul>
        {todos.map(({ id, text, checked }) => (
          <li key={id}>
            <input type="checkbox" checked={checked} />
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
