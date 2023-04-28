//@flow strict
import faker from "faker";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableHeaderCell, { SortIcon } from "..";

// "Component" prevents "th can not appear as a child of div" error
const Component = (props) => (
  <table>
    <thead>
      <tr>
        <TableHeaderCell {...props} />
      </tr>
    </thead>
  </table>
);

describe("TableHeaderCell", () => {
  const title = faker.lorem.word();

  test("renders correctly with default props", () => {
    render(<Component title={title} />);

    const header = screen.queryByRole("columnheader");
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
    expect(header).toHaveAttribute("aria-label", `${title} column header`);
    expect(header).toHaveAttribute("tabIndex", "0");
    expect(header).not.toHaveAttribute("arial-sort");
    expect(header).toHaveClass("start");
  });

  test("renders correctly when sortable but not sorted", () => {
    render(<Component isSortable title={title} />);

    const header = screen.queryByRole("columnheader");
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).not.toHaveAttribute("aria-sort");
    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
    expect(header).toHaveStyle({
      width: "100%",
      direction: "ltr",
    });
  });

  test.only("renders correctly when sortable but no initial sort order", () => {
    render(<Component isSortable title={title} />);

    const header = screen.queryByRole("columnheader");
    const headerContent = header?.firstChild;
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).not.toHaveAttribute("aria-sort");
    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
    expect(headerContent).not.toBeUndefined();
  });

  test("renders correctly when sortable and sort direction but not sorted", () => {
    render(
      <Component isSortable initialSortDirection="ascending" title={title} />,
    );

    const header = screen.queryByRole("columnheader");
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("renders correctly when specific align='center' prop provided", () => {
    render(<Component {...{ title }} align="center" />);

    expect(screen.getByRole("columnheader")).toHaveClass("center");
  });

  test("renders correctly when specific align='end' prop provided", () => {
    render(<Component {...{ title }} align="end" />);

    expect(screen.getByRole("columnheader")).toHaveClass("end");
  });

  test("renders correctly when focused while not sorted", () => {
    render(<Component {...{ title }} isSortable />);

    const header = screen.getByRole("columnheader");

    userEvent.hover(header);

    expect(screen.getByLabelText(Icon.PREVIEW_ASC)).toBeInTheDocument();
  });

  test("renders correctly when focused while not sorted and sort rotation inverted", () => {
    render(<Component {...{ title }} isSortable isSortRotationInverted />);

    const header = screen.getByRole("columnheader");

    userEvent.hover(header);

    expect(screen.getByLabelText(Icon.PREVIEW_DESC)).toBeInTheDocument();
  });

  test("renders correctly when sortable, sorted, and initial sort direction is ascending", () => {
    render(
      <Component
        isSortable
        isSorted
        initialSortDirection="ascending"
        title={title}
      />,
    );

    const header = screen.queryByRole("columnheader");
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(ascIcon).toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("renders correctly when sortable, sorted, and initial sort direction is descending", () => {
    render(
      <Component
        isSortable
        isSorted
        initialSortDirection="descending"
        title={title}
      />,
    );

    const header = screen.queryByRole("columnheader");
    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("aria-sort", "descending");
    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("handles clicks correctly when sortable", () => {
    const props = {
      isSortable: true,
      onSortChange: jest.fn(),
      title,
    };
    render(<Component {...props} />);

    const header = screen.queryByRole("columnheader");

    userEvent.click(header);

    expect(props.onSortChange).toHaveBeenCalledTimes(1);
    expect(props.onSortChange).toHaveBeenCalledWith({
      sortDirection: "ascending",
      title,
    });

    userEvent.click(header);

    expect(props.onSortChange).toHaveBeenCalledTimes(2);
    expect(props.onSortChange).toHaveBeenCalledWith({
      sortDirection: "descending",
      title,
    });

    userEvent.click(header);

    expect(props.onSortChange).toHaveBeenCalledTimes(3);
    expect(props.onSortChange).toHaveBeenCalledWith({
      sortDirection: null,
      title,
    });
  });

  test("handles first click correctly when sortable and sort rotation inverted", () => {
    const props = {
      isSortable: true,
      isSortRotationInverted: true,
      onSortChange: jest.fn(),
      title,
    };
    render(<Component {...props} />);

    const header = screen.queryByRole("columnheader");

    userEvent.click(header);

    expect(props.onSortChange).toHaveBeenCalledTimes(1);
    expect(props.onSortChange).toHaveBeenCalledWith({
      sortDirection: "descending",
      title,
    });

    userEvent.click(header);
    expect(props.onSortChange).toHaveBeenCalledTimes(2);
    expect(props.onSortChange).toHaveBeenCalledWith({
      sortDirection: "descending",
      title,
    });
  });

  test("is focusable via keyboard", () => {
    render(<Component {...title} />);

    expect(screen.getByRole("columnheader")).not.toHaveFocus();

    userEvent.tab();
    expect(screen.getByRole("columnheader")).toHaveFocus();

    userEvent.tab();
    expect(screen.getByRole("columnheader")).not.toHaveFocus();
  });

  test("is clickable via keyboard", () => {
    const mockSortChange = jest.fn();
    render(
      <Component {...{ title }} isSortable onSortChange={mockSortChange} />,
    );

    userEvent.tab();
    userEvent.keyboard("{enter}");

    expect(mockSortChange).toHaveBeenCalledTimes(1);
    expect(mockSortChange).toHaveBeenCalledWith({
      sortDirection: "ascending",
      title,
    });
  });
});

describe("SortIcon", () => {
  test("renders correctly when visible and direction is ascending", () => {
    render(<SortIcon isVisible direction="ascending" />);

    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(ascIcon).toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("renders correctly when visible and direction is descending", () => {
    render(
      <SortIcon
        direction="descending"
        isVisible
        isPreviewVisible
        previewDirection="ascending"
      />,
    );

    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("renders correctly when not visible, preview is visible and direction is ascending", () => {
    render(<SortIcon isPreviewVisible previewDirection="ascending" />);

    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).toBeInTheDocument();
    expect(previewDescIcon).not.toBeInTheDocument();
  });

  test("renders correctly when not visible, preview is visible and direction is descending", () => {
    render(<SortIcon isPreviewVisible previewDirection="descending" />);

    const ascIcon = screen.queryByLabelText(Icon.ASC);
    const descIcon = screen.queryByLabelText(Icon.DESC);
    const previewAscIcon = screen.queryByLabelText(Icon.PREVIEW_ASC);
    const previewDescIcon = screen.queryByLabelText(Icon.PREVIEW_DESC);

    expect(ascIcon).not.toBeInTheDocument();
    expect(descIcon).not.toBeInTheDocument();
    expect(previewAscIcon).not.toBeInTheDocument();
    expect(previewDescIcon).toBeInTheDocument();
  });

  test("renders correctly when passed unexpected args", () => {
    const { container } = render(<SortIcon />);

    expect(container?.firstChild).toBeNull();
  });
});

/** @enum @readonly */
const Icon = {
  ASC: "ascending sort icon",
  DESC: "descending sort icon",
  PREVIEW_ASC: "preview ascending sort icon",
  PREVIEW_DESC: "preview descending sort icon",
};
