import React, { useState } from "react";
import cx from "classnames";
import styles from "./TodoList.module.css";

function TodoList({ todos, onChange, filter }) {
  const onTodoChecked = (id) => (event) => {
    onChange({
      ...todos,
      [id]: {
        ...todos[id],
        checked: event.target.checked,
      },
    });
  };

  const onTodoEdit = (id) => () => {
    onChange({
      ...todos,
      [id]: {
        ...todos[id],
        editing: !todos[id].editing,
      },
    });
  };

  const onTodoUpdate = (id) => (event) => {
    onChange({
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
    onChange(_todos);
  };

  return (
    <ul class={styles.list}>
      {Object.values(todos)
        .filter(({ text }) => text.indexOf(filter) !== -1)
        .map(({ id, text, checked, editing }) => (
          <li
            key={id}
            className={cx(styles.todo, {
              [styles.todoChecked]: checked,
            })}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={onTodoChecked(id)}
              className={styles.checkbox}
            />

            {editing ? (
              <input
                type="text"
                value={text}
                onChange={onTodoUpdate(id)}
                className={styles.todoInput}
              />
            ) : (
              <div className={styles.todoText}>{text}</div>
            )}
            <div className={styles.todoButtons}>
              <button onClick={onTodoEdit(id)}>{editing ? "Save" : "✎"}</button>
              <button onClick={onTodoDelete(id)}>✕</button>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default TodoList;
