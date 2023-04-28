//@flow strict
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { defineName } from "../../../../utils";

const TableCellInner = ({
  colSpan = 1,
  rowSpan = 1,
  align = "start",
  color,
  children,
  isRTL = false,
  role = "cell",
  width,
  ...props
}: Props) => {
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <td
      {...(props: any)}
      {...{ colSpan, role, rowSpan }}
      aria-colspan={colSpan}
      aria-rowspan={rowSpan}
      sx={{
        variant: "tableCell",
        backgroundColor: color,
        direction,
        width,
      }}
    >
      <div className={`content ${align}`}>{children}</div>
    </td>
  );
};

type Props = {
  /** Horizontal alignment of children with respect to the cell. */
  align?: "center" | "end" | "start",
  /** Background color of the cell */
  color?: string,
  children?: Node,
  /** The `colSpan` attribute specifies the number of columns a cell should
   * span. `colSpan` allows a single table cell to span the width of more
   * than one column.
   *
   * Eg. if `colSpan` has a value of `2`, the cell will take up the space
   * of two columns in the table. Similar to the "merge cell" function in
   * Excel.
   *
   * `colSpan`'s default value is `1`. `colSpan` can not exceed `1000`.
   * Any values higher than `1000` will be set to the default value of
   * `1` as per HTML specs.
   *
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan)
   */
  colSpan?: number,
  /** If true, alignment of cells are flipped horizontally */
  isRTL?: boolean,
  /** Role of the cell. See
   * [Mozilla specs for details](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/cell_role). */
  role?: string,
  /**
   * The `rowSpan` attribute specifies the number of rows a cell should span.
   * `rowSpan` allows a single table cell to span the height of more than one
   * row.
   *
   * Eg. If `rowSpan` is equal to `2`, the cell takes up the
   * space of two rows in the table. Providing the same functionality as
   * "merge cell" in Excel.
   *
   * `rowSpan`'s default value is `1`. If its value is `0`, it extends until
   * the end of the table section, even with an implicitly defined width.
   * `rowSpan` or rows spanned can not exceed `65534` as per HTML specs.
   *
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-rowspan)
   */
  rowSpan?: number,
  /** A percentage or fixed width for the row. Note: width will be inherited if
   * the column header has a set width. */
  width?: number | string,
  ...
};

// For Docz only
const TableCellDocz = (_: Props) => <div />;
const TableCell = defineName(TableCellInner, "TableCell");

export { TableCellDocz, TableCell as default };
