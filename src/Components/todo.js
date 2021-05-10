import React, { useState, useRef, useEffect } from "react";

export default function Todo({ item, removeItem, updateItem }) {
  const [updateditem, setUpdatedItem] = useState(item);
  const inputRef = useRef(null);
  const editItem = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    updateItem(updateditem);
  }, [updateditem]);

  return (
    <>
      <span className="todo-item">
        <input
          value={updateditem.title}
          onClick={editItem}
          onChange={(e) =>
            setUpdatedItem((item) => {
              return {
                ...item,
                title: e.target.value,
              };
            })
          }
          ref={inputRef}
        />

        <button
          className="delete-btn btn btn-danger"
          onClick={() => removeItem(item)}
        >
          Delete
        </button>
      </span>
    </>
  );
}
