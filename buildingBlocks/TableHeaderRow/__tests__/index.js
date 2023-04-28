//@flow strict
import React from "react";

import faker from "faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableHeaderRow from "..";

const Wrapper = (props) => (
  <table>
    <tbody>{props.children}</tbody>
  </table>
);

const defaultProps = {
  onSelect: jest.fn(),
  onClick: jest.fn(),
};

describe("TableHeaderRow", () => {
  afterEach(() => {
    defaultProps.onSelect.mockReset();
    defaultProps.onClick.mockReset();
  });

  test("renders correctly with default props", () => {
    const rowOneText = faker.lorem.words(3);
    const rowTwoText = faker.lorem.words(3);
    const rowThreeText = faker.lorem.words(3);

    const screen = render(
      <Wrapper>
        <TableHeaderRow {...defaultProps}>
          <td>{rowOneText}</td>
          <td>{rowTwoText}</td>
          <td>{rowThreeText}</td>
        </TableHeaderRow>
      </Wrapper>,
    );

    const rowOne = screen.queryByText(rowOneText);
    const rowTwo = screen.queryByText(rowTwoText);
    const rowThree = screen.queryByText(rowThreeText);
    const indicator = screen.queryByLabelText(QueryText.INDICATOR);
    const checkbox = screen.queryByRole(QueryText.CHECKBOX);
    const actions = screen.queryByLabelText(QueryText.ROW_ACTIONS);

    expect(rowOne).toBeInTheDocument();
    expect(rowTwo).toBeInTheDocument();
    expect(rowThree).toBeInTheDocument();
    expect(indicator).not.toBeInTheDocument();
    expect(checkbox).not.toBeInTheDocument();
    expect(actions).not.toBeInTheDocument();
  });

  test("renders indicator correctly", () => {
    const rowOneText = faker.lorem.words(3);
    const props = { ...defaultProps, isIndicatorVisible: true };
    const screen = render(
      <Wrapper>
        <TableHeaderRow {...props} rowsShowIndicator table="positive">
          <td>{rowOneText}</td>
        </TableHeaderRow>
      </Wrapper>,
    );

    const rowOne = screen.queryByText(rowOneText);
    const indicator = screen.queryByLabelText(QueryText.INDICATOR);

    expect(indicator).toBeInTheDocument();
    expect(rowOne).toBeInTheDocument();
  });

  test("renders selectable row correctly", () => {
    const rowOneText = faker.lorem.words(3);
    const props = {
      ...defaultProps,
      isSelectable: true,
      isSelected: false,
    };

    render(
      <Wrapper>
        <TableHeaderRow {...props}>
          <td>{rowOneText}</td>
        </TableHeaderRow>
      </Wrapper>,
    );

    const checkbox = screen.queryByRole(QueryText.CHECKBOX);
    const rowOne = screen.queryByText(rowOneText);

    expect(screen.queryByRole(QueryText.CHECKBOX)).toBeInTheDocument();
    expect(rowOne).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
  });

  test.only("renders with actions correctly", () => {
    const rowOneText = faker.lorem.words(3);
    const actionOneText = faker.lorem.words(3);
    const actionTwoText = faker.lorem.words(3);
    const actionThreeText = faker.lorem.words(3);
    const Actions = () => {
      return (
        <div>
          <p>{actionOneText}</p>
          <p>{actionTwoText}</p>
          <p>{actionThreeText}</p>
        </div>
      );
    };

    render(
      <Wrapper>
        <TableHeaderRow {...defaultProps} rowActions={<Actions />}>
          <td>{rowOneText}</td>
        </TableHeaderRow>
      </Wrapper>,
    );

    const actionOne = screen.queryByText(actionOneText);
    const actionTwo = screen.queryByText(actionTwoText);
    const actionThree = screen.queryByText(actionThreeText);
    const rowOne = screen.queryByText(rowOneText);

    expect(actionOne).toBeInTheDocument();
    expect(actionTwo).toBeInTheDocument();
    expect(actionThree).toBeInTheDocument();
    expect(rowOne).toBeInTheDocument();
  });
});

/** @enum */
const QueryText = {
  CHECKBOX: "checkbox",
  INDICATOR: "status indicator",
  ROW_ACTIONS: "row actions",
};
