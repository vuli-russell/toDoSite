import React from "react";
import { render } from "@testing-library/react";
import FilterPanel from "./FilterPanel";

describe("FilterPanel tests", () => {
  it("should render", () => {
    expect(render(<FilterPanel />)).toBeTruthy();
  });
});
