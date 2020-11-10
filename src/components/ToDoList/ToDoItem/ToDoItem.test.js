import React from "react";
import { render } from "@testing-library/react";
import ToDoItem from "./ToDoItem";

describe("ToDoItem tests", () => {
  it("should render", () => {
    expect(render(<ToDoItem />)).toBeTruthy();
  });
});
