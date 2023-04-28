//@flow strict
import React from "react";

import faker from "faker";
import { render, screen } from "@testing-library/react";

import Table from "..";

describe("Table", () => {
  const childText = faker.lorem.word();

  test("renders correctly", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>{childText}</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.queryByRole("table");
    const child = screen.queryByText(childText);

    expect(table).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });
});
