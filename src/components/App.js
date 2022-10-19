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
        {todos.map((todo) => (
          <li>
            <input type="checkbox" />
            comprar leche
            <button>X</button>
            <button>E</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
