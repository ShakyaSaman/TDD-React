import React from "react";
import Todo from "./todo";

export default function todolist({ items, removeItemFromList, updateItems }) {
  const removeItem = (item) => {
    removeItemFromList(item);
  };

  return (
    <>
      {items.map((item, index) => (
        <li className="todo" key={index}>
          <Todo
            item={item}
            removeItem={(item) => removeItem(item)}
            updateItem={(item) => updateItems(item)}
          />
        </li>
      ))}
    </>
  );
}
