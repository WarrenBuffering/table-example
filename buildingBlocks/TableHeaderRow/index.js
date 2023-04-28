//@flow strict
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import Checkbox from "../../../Checkbox";
import { defineName } from "../../../../utils";

export const TableHeaderRowInner = ({
  children,
  hasRowsWithIndicators = false,
  hasSelectedRows = false,
  isSelected = false,
  isSelectable = false,
  onClick,
  onSelect,
  rowActions,
  ...props
}: Props) => {
  return (
    <tr {...(props: any)} onClick={onClick} sx={{ variant: "tableHeaderRow" }}>
      {isSelectable && (
        <th>
          <div className="leftChildren">
            <Checkbox
              indeterminate={hasSelectedRows && !isSelected}
              checked={isSelected || hasSelectedRows}
              onClick={onSelect}
              onChange={() => {}}
            />
          </div>
        </th>
      )}

      {hasRowsWithIndicators && (
        <th
          className={isSelectable ? "indicator pushRight" : "indicator"}
          tabIndex={-1}
        />
      )}
      {children}
      {rowActions && (
        <th>
          <div className="hidden">{rowActions}</div>
        </th>
      )}
    </tr>
  );
};

type Props = {
  /** Table Headers (th) to be rendered within the row. */
  children: React$Node,
  /**
   * Should be true for proper styling if any child row ever does or can show
   * the status indicator (`TableRow` with a specified `indicatorStatus` prop).
   */
  hasRowsWithIndicators?: boolean,
  /**
   * If true, checkbox is "selected" and shows as indeterminate
   */
  hasSelectedRows?: boolean,
  /**
   * Whether or not the row has been selected (if `isSelectable` is `true`).
   * */
  isSelected?: boolean,
  /**
   * Whether or not the row is selectable/shows the selectable
   * checkbox.
   * */
  isSelectable?: boolean,
  /** Callback invoked on TableHeaderRow `th` click. */
  onClick?: () => {},
  /**
   * Callback invoked on selectable checkbox click (if `isSelectable`
   * is `true`)
   * */
  onSelect?: () => {},
  /**
   * Component used for row actions. This will not be displayed, but is
   * instead provided to set overall column width. Table Headers set the
   * width for their rows. For styling to behave correctly, `rowActions`
   * should include the entirety of children. Providing only a subset of
   * all possible children will cause jumps in resizing when a row
   * with all actions are visible is hovered or focused.
   * */
  rowActions?: React$Node,
  ...
};

const TableHeaderRowDocz = (_: Props) => <div />;
const TableHeaderRow = defineName(TableHeaderRowInner, "TableHeaderRow");

export { TableHeaderRowDocz, TableHeaderRow as default };
