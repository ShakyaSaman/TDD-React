import { render, fireEvent, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

afterEach(cleanup);
test("checkAddButtonRender", () => {
  const { queryByTitle } = render(<App />);
  const btn = queryByTitle("add-btn");
  expect(btn).toBeTruthy();
});

describe("addNonEmptyItem", () => {
  test("onClick", () => {
    const { queryByTitle, getByTestId } = render(<App />);
    const addinput = getByTestId("add-input");
    const btn = queryByTitle("add-btn");
    fireEvent.change(addinput, { target: { value: "test" } });
    fireEvent.click(btn);
    const todolist = getByTestId("todo-lists");
    expect(todolist).toBeInTheDocument();
  });
});

describe("addduplicateItems", () => {
  test("onClick", () => {
    const { queryByTitle, getByTestId } = render(<App />);
    const addinput = getByTestId("add-input");
    const btn = queryByTitle("add-btn");
    fireEvent.change(addinput, { target: { value: "test" } });
    fireEvent.click(btn);
    fireEvent.change(addinput, { target: { value: "test" } });
    fireEvent.click(btn);
    const error = getByTestId("error");
    expect(error.innerHTML).toBe("Item already exists");
  });
});

describe("addEmptyItem", () => {
  test("onClick", () => {
    const { queryByTitle, getByTestId } = render(<App />);
    const addinput = getByTestId("add-input");
    const btn = queryByTitle("add-btn");
    fireEvent.change(addinput, { target: { value: "" } });
    fireEvent.click(btn);
    const error = getByTestId("error");
    expect(error.innerHTML).toBe("Please add an Item.");
  });
});

describe("deleteAll", () => {
  test("onClick", async () => {
    const { queryByTitle, getByTestId } = render(<App />);
    const addinput = getByTestId("add-input");
    const btn = queryByTitle("add-btn");
    fireEvent.change(addinput, { target: { value: `test${Math.random()}` } });
    fireEvent.click(btn);
    fireEvent.change(addinput, { target: { value: `test${Math.random()}` } });
    fireEvent.click(btn);
    fireEvent.change(addinput, { target: { value: `test${Math.random()}` } });
    fireEvent.click(btn);
    fireEvent.change(addinput, { target: { value: `test${Math.random()}` } });
    fireEvent.click(btn);
    const deleteAll = getByTestId("delete-all");
    await fireEvent.click(deleteAll);
    const todocontainer = getByTestId("lists-container");
    expect(todocontainer.textContent).toBe("s");
  });
});
