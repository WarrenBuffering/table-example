//@flow strict
import React from "react";

import faker from "faker";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableCell from "..";

const Wrapper = (props) => (
  <table>
    <tbody>
      <tr>{props.children}</tr>
    </tbody>
  </table>
);

describe("TableCell", () => {
  const cellText = faker.lorem.word();

  test("renders correctly with default props", () => {
    const { queryByText, queryByRole } = render(
      <Wrapper>
        <TableCell>{cellText}</TableCell>
      </Wrapper>,
    );
    const cell = queryByRole("cell");
    const content = queryByText(cellText);

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute("colSpan", "1");
    expect(cell).toHaveAttribute("rowSpan", "1");
    expect(cell).toHaveAttribute("aria-colspan", "1");
    expect(cell).toHaveAttribute("aria-rowspan", "1");

    expect(content).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    const colSpan = 3;
    const role = faker.lorem.word();
    const rowSpan = 9;
    const { queryByRole } = render(
      <Wrapper>
        <TableCell {...{ colSpan, role, rowSpan }}>{cellText}</TableCell>
      </Wrapper>,
    );

    const cell = queryByRole(role);
    const colSpanStr = colSpan.toString();
    const rowSpanStr = rowSpan.toString();

    expect(cell).toHaveAttribute("colSpan", colSpanStr);
    expect(cell).toHaveAttribute("rowSpan", rowSpanStr);
    expect(cell).toHaveAttribute("aria-colspan", colSpanStr);
    expect(cell).toHaveAttribute("aria-rowspan", rowSpanStr);
  });

  test("accepts additional props", () => {
    const cellClick = jest.fn();
    const { queryByRole } = render(
      <Wrapper>
        <TableCell onClick={cellClick}>{cellText}</TableCell>
      </Wrapper>,
    );
    const cell = queryByRole("cell");

    userEvent.click(cell);
    expect(cellClick).toHaveBeenCalledTimes(1);
  });

  test("renders with a set width", () => {
    const cellWidth = 500;
    const { queryByRole } = render(
      <Wrapper>
        <TableCell width={cellWidth}>{cellText}</TableCell>
      </Wrapper>,
    );

    expect(queryByRole("cell")).toHaveStyle({ width: `${cellWidth}px` });
  });

  test("renders with a background color", () => {
    const backgroundColor = "red";
    const { queryByRole } = render(
      <Wrapper>
        <TableCell color={backgroundColor}>{cellText}</TableCell>
      </Wrapper>,
    );

    expect(queryByRole("cell")).toHaveStyle({ backgroundColor });
  });

  test("renders with children left aligned", () => {
    const { queryByText } = render(
      <Wrapper>
        <TableCell>{cellText}</TableCell>
      </Wrapper>,
    );
    const content = queryByText(cellText);
    expect(content).toHaveClass("start");
  });

  test("renders with children centered", () => {
    const { queryByText } = render(
      <Wrapper>
        <TableCell align="center">{cellText}</TableCell>
      </Wrapper>,
    );
    const content = queryByText(cellText);
    expect(content).toHaveClass("center");
  });

  test("renders with children right aligned", () => {
    const { queryByText } = render(
      <Wrapper>
        <TableCell align="end">{cellText}</TableCell>
      </Wrapper>,
    );
    const content = queryByText(cellText);
    expect(content).toHaveClass("end");
  });
});
