//@flow strict

import palette from "../../../../../theme/palette";

const colors = {
  default: {
    background: {
      hover: palette.material.black[5],
      selected: palette.tint.primary[10],
    },
  },
  dark: {},
};

const variants = {
  height: 64,
  marginTop: "4px",
  borderRadius: "8px",
  "&:focus, :hover": {
    backgroundColor: "tableRow.background.hover",
    ".actions": {
      visibility: "visible",
    },
  },
  "&.selected": {
    backgroundColor: "tableRow.background.selected",
  },
  "td:first-of-type": {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    paddingLeft: "16px",
    verticalAlign: "middle",
  },
  "td:last-of-type": {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    paddingRight: "16px",
    verticalAlign: "middle",
  },
  ".actions": {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    visibility: "hidden",
    "@media screen and (max-width: 860px)": {
      visibility: "visible",
    },
  },
  "td.indicator": {
    width: "6px",
    "&.pushRight": {
      paddingLeft: "11px",
    },
  },
  ".leftChildren": {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    "&.alignEnd": {
      justifyContent: "flex-end",
    },
  },
};

export default { colors, variants };
