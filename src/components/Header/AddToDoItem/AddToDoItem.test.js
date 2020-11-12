import React from "react";
import { render } from "@testing-library/react";
import AddToDoItem from "./AddToDoItem";

describe("AddToDoItem tests", () => {
  it("should render", () => {
    expect(render(<AddToDoItem />)).toBeTruthy();
  });
});
