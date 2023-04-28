//@flow strict
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import Checkbox from "../../../Checkbox";
import Indicator from "../../../Indicator";
import { defineName } from "../../../../utils";

import type { IndicatorVariant } from "../../../Indicator";

export const TableRowInner = ({
  actions,
  children,
  hasRowsWithIndicators = false,
  isSelectable = false,
  isSelected = false,
  indicatorStatus,
  onSelect,
  style,
  ...props
}: Props) => {
  return (
    <tr
      {...(props: any)}
      className={isSelected ? "row selected" : "row"}
      onClick={onSelect}
      sx={{ variant: "tableRow", ...style }}
      tabIndex={0}
    >
      {isSelectable && (
        <td>
          <Checkbox
            checked={isSelected}
            onClick={(e) => {
              if (typeof onSelect === "function") {
                onSelect();
                e.stopPropagation();
              }
            }}
            onChange={() => {}}
          />
        </td>
      )}

      {hasRowsWithIndicators && (
        <td className={isSelectable ? "indicator pushRight" : "indicator"}>
          {indicatorStatus && <Indicator variant={indicatorStatus} />}
        </td>
      )}
      {children}
      {!!actions && (
        <td>
          <div className="actions">{actions}</div>
        </td>
      )}
    </tr>
  );
};

type Props = {
  actions?: React$Node,
  /** Table cells (tr) to be rendered within the row. */
  children: React$Node,
  /**
   * If any of the rows in table show an indicator, this must be `true` for
   * all rows within the same table. A true value adds the extra <td> for
   * indicator to preserve column alignment and spacing.
   */
  hasRowsWithIndicators: boolean,
  /** If a valid indicator variant, shows an `Indicator` on the left side of the row. */
  indicatorStatus?: IndicatorVariant,
  /**
   * Whether or not the row is selectable/shows the selectable
   * checkbox.
   * */
  isSelectable?: boolean,
  /**
   * Whether or not the row has been selected (if `isSelectable` is `true`).
   * */
  isSelected?: boolean,
  /** Callback invoked on TableRow `tr` click. */
  onClick?: () => {},
  /**
   * Callback invoked on selectable checkbox click (if `isSelectable`
   * is `true`)
   * */
  onSelect?: () => {},
  /**
   * Any extra styles, provided as an object for the table row. Styles are
   * provided to the row's `sx` prop, meaning access to theme colors,
   * however numbers will need to be as a string with the appropriate suffix
   * e.g. (4 => "4px").
   * */

  style?: any,
  ...
};

const TableRowDocz = (_: Props) => <div />;
const TableRow = defineName(TableRowInner, "TableRow");

export { TableRowDocz, TableRow as default };
