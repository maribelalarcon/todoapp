import React, { useState } from "react";

function App() {
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

  return (
    <div className="App">
      <input type="text" />
      <button>+</button>
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
