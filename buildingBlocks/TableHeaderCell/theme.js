//@flow strict
import palette from "../../../../../theme/palette";

const colors = {
  default: {
    background: {
      hover: palette.material.black[3],
    },
    content: {
      restful: palette.neutral,
    },
  },
  dark: {},
};

const variants = {
  alignItems: "center",
  height: "48px",
  direction: "ltr",
  padding: "0 12px",
  "&:hover": {
    backgroundColor: "tableHeaderCell.background.hover",
  },
  "&.rtl": {
    direction: "rtl",
  },
  ".content": {
    display: "flex",
    height: "48px!important",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    "&.start": {
      justifyContent: "flex-start",
    },
    "&.center": {
      justifyContent: "center",
    },
    "&.end": {
      justifyContent: "flex-end",
    },
  },
  ".alignSortIconLeft": {
    height: "24px", // redundant but necessary for flex center alignment
    marginInlineEnd: "4px",
    width: "24px",
  },
  ".alignSortIconRight": {
    height: "24px", // redundant but necessary for flex center alignment
    marginInlineStart: "4px",
    width: "24px",
  },
  p: {
    color: "tableHeaderCell.content.restful",
    display: "inline-flex",
    fontSize: 3,
    fontWeight: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    margin: 0,
  },
};

export default { colors, variants };
