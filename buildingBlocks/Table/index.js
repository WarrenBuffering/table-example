//@flow strict
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { defineName } from "../../../../utils";

const TableInner = ({ children, style = {}, ...props }: Props) => (
  <div {...(props: any)} sx={{ variant: "table", ...style }}>
    <table>{children}</table>
  </div>
);

type Props = {
  children: React$Node,
  /**
   * Any extra styles, provided as an object for the table row. Styles are
   * provided to the table's `sx` prop, meaning they have access to theme
   * colors, however this also means numbers will need to be as a string
   * with the appropriate suffix e.g. (4 => "4px").
   * */
  style?: any,
  ...
};

const TableDocz = (_: Props) => <div />;
const Table = defineName(TableInner, "Table");

export { TableDocz, Table as default };
