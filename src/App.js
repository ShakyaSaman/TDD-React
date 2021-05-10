import { useState, useEffect } from "react";
import "./App.css";
import Todolist from "./Components/todolist";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [items, setItems] = useState([]);

  const [newitem, setNewItem] = useState({ id: null, title: "" });
  const [error, setError] = useState("");

  const clearErrorField = () => {
    setError("");
  };

  useEffect(() => {
    setTimeout(clearErrorField, 5000);
    return () => {
      clearTimeout(clearErrorField);
    };
  }, [error]);

  const addTodo = async (e) => {
    if (!newitem || newitem.title.trim() == "") {
      setError("Please add an Item.");
      return;
    }

    if (items.filter((item) => item.title == newitem.title).length != 0) {
      setError("Item already exists");
      return;
    }

    await setItems((items) => [...items, newitem]);
    setNewItem({ id: null, title: "" });
  };

  const removeItemFromList = (item) => {
    setItems((items) => items.filter((old_item) => old_item.id != item.id));
  };

  const updateItemsList = (updated_item) => {
    const new_items = items.map((new_item) => {
      if (new_item.id == updated_item.id) {
        return {
          ...new_item,
          title: updated_item.title,
        };
      }
      return { ...new_item };
    });

    setItems(new_items);
  };

  return (
    <div className="todo-container bg-dark p-5" data-testid="todo-container">
      <span className="title">TODO LIST:</span>
      <div className="input-box-add">
        <input
          className="add-input"
          type="text"
          data-testid="add-input"
          onChange={(e) =>
            setNewItem({ id: items.length + 1, title: e.target.value })
          }
          value={newitem.title}
        />
        <button
          onClick={addTodo}
          title="add-btn"
          className="btn btn-outline-success"
        >
          {" "}
          ADD ITEM
        </button>
      </div>

      {error.length != 0 && (
        <span className="error" data-testid="error">
          {error}
        </span>
      )}

      <div
        data-testid="lists-container"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        {items && items.length != 0 && (
          <div className="todo-list-container" data-testid="todo-lists">
            <div className="delete-all">
              {" "}
              <button
                className="delete-all-btn btn btn-outline-danger"
                onClick={() => setItems([])}
                data-testid="delete-all"
              >
                DELETE ALL
              </button>{" "}
            </div>

            <Todolist
              updateItems={(updated_item) => updateItemsList(updated_item)}
              items={items}
              removeItemFromList={(item) => removeItemFromList(item)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
