//@flow strict
/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { jsx } from "theme-ui";

import palette from "../../../../../theme/palette";
import { Icon } from "../../../../iconography";
import { defineName } from "../../../../utils";

/** @enum */
const SortDirection = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

/** @enum */
const Align = {
  CENTER: "center",
  END: "end",
  START: "start",
};

const sortRotation = {
  [SortDirection.ASCENDING]: SortDirection.DESCENDING,
  [SortDirection.DESCENDING]: null,
  start: SortDirection.ASCENDING,
};

const invertedSortRotation = {
  [SortDirection.ASCENDING]: null,
  [SortDirection.DESCENDING]: SortDirection.ASCENDING,
  start: SortDirection.DESCENDING,
};

const TableHeaderCellInner = ({
  align = Align.START,
  initialSortDirection,
  isRTL = false,
  isSortable = false,
  isSorted = false,
  isSortRotationInverted = false,
  onSortChange,
  title,
  width = undefined,
  ...props
}: Props) => {
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (name) => {
    setIsFocused(true);
  };
  const handleBlur = (name) => {
    setIsFocused(false);
  };

  const handleClick = () => {
    const sortKey = sortDirection || "start";

    const newDirection = isSortRotationInverted
      ? invertedSortRotation[sortKey]
      : sortRotation[sortKey];

    setSortDirection(newDirection);

    if (typeof onSortChange === "function") {
      // $FlowFixMe
      onSortChange({ sortDirection: newDirection, title });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const sortStartDirection = isSortRotationInverted
    ? SortDirection.DESCENDING
    : SortDirection.ASCENDING;

  const isSortIconStartAligned =
    align === Align.END || (isRTL && Align.CENTER) || (isRTL && Align.START);
  const isPreviewIconVisible = isFocused && !isSorted;

  return (
    <th
      {...{ props }}
      tabIndex={0}
      aria-label={`${title} column header`}
      aria-sort={sortDirection}
      className={align}
      onClick={handleClick}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onKeyDown={handleKeyDown}
      role="columnheader"
      sx={{ variant: "tableHeaderCell" }}
    >
      <div
        className={`content ${align}`}
        style={{
          width,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {isSortIconStartAligned && (
          <div className="alignSortIconLeft">
            <SortIcon
              direction={sortDirection}
              isPreviewVisible={isPreviewIconVisible}
              isVisible={isSorted}
              previewDirection={sortStartDirection}
            />
          </div>
        )}

        {align === Align.CENTER && !isRTL && (
          <div className="alignSortIconLeft" />
        )}

        <p>{title}</p>

        {align === Align.CENTER && isRTL && (
          <div className="alignSortIconRight" />
        )}

        {!isSortIconStartAligned && (
          <div className="alignSortIconRight">
            <SortIcon
              direction={sortDirection}
              isPreviewVisible={isPreviewIconVisible}
              isVisible={isSorted}
              previewDirection={sortStartDirection}
            />
          </div>
        )}
      </div>
    </th>
  );
};

const SortIcon = ({
  direction,
  isPreviewVisible = false,
  isVisible = false,
  previewDirection,
}: SortIconProps) => {
  if (isVisible && direction === SortDirection.ASCENDING) {
    return (
      <Icon.ArrowUp24
        aria-label="ascending sort icon"
        color={palette.neutral.__default}
      />
    );
  }

  if (isVisible && direction === SortDirection.DESCENDING) {
    return (
      <Icon.ArrowDown24
        aria-label="descending sort icon"
        color={palette.neutral.__default}
      />
    );
  }

  if (isPreviewVisible && previewDirection === SortDirection.ASCENDING) {
    return (
      <Icon.ArrowUp24
        aria-label="preview ascending sort icon"
        color={palette.neutral[60]}
      />
    );
  }

  if (isPreviewVisible && previewDirection === SortDirection.DESCENDING) {
    return (
      <Icon.ArrowDown24
        aria-label="preview descending sort icon"
        color={palette.neutral[60]}
      />
    );
  }

  return null;
};

type SortDir = "ascending" | "descending";

type SortArgs = {
  sortDirection?: SortDir,
  title?: string | number,
};

type SortIconProps = {
  isVisible?: boolean,
  direction?: SortDir,
  isPreviewVisible?: boolean,
  previewDirection?: SortDir,
};

type Props = {
  /** Horizontal alignment of TableHeader contents. */
  align?: "center" | "end" | "start",
  /** If provided and `isSortable` and `isSorted` are true, specifies the intial sort direction of the TableHeader. */
  initialSortDirection?: SortDir,
  /** If provided, contents will be displayed in right-to-left. */
  isRTL?: boolean,
  /** If true, header will be sortable. */
  isSortable?: boolean,
  /** If true and `isSortable` is true, header will display current sort direction value (if header is clicked or `initialSortDirection` has been specified) */
  isSorted?: boolean,
  /** If true, sort rotation will change from "ascending" > "descending" > null to "descending" > "ascending" > null. */
  isSortRotationInverted?: boolean,
  /** Callback invoked when TableHeader sort direction changes. See "onSortChange Params" for specific callback args. */
  onSortChange?: (args: SortArgs) => {},
  title: string,
  /** If provided specifies the width of the header cell. By default TableHeader will fill the entirety of its container. */
  width?: string | number,
};

// For Docz only
const SortArgsDocz = (props: SortArgs) => <div />;
const TableHeaderCellDocz = (_: Props) => <div />;

const TableHeaderCell = defineName(TableHeaderCellInner, "TableHeaderCell");

export {
  SortArgsDocz,
  SortIcon,
  TableHeaderCellDocz,
  TableHeaderCell as default,
};
