import React from "react";
import { render } from "@testing-library/react";
import ToDoList from "./ToDoList";

describe("ToDoList tests", () => {
  it("should render", () => {
    expect(render(<ToDoList />)).toBeTruthy();
  });
});
