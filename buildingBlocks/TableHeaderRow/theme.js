//@flow strict
import palette from "../../../../../theme/palette";

const colors = {
  default: {
    background: palette.material.black[3],
  },
  dark: {},
};

const variants = {
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "green",
  backgroundColor: "tableHeaderRow.background",
  ".leftChildren": {
    display: "flex",
    justifyContent: "flex-start",
  },
  "th:first-of-type": {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    paddingLeft: "16px",
  },
  ".hidden": {
    visibility: "hidden",
  },
  "th.indicator": {
    width: "6px",
    "&.pushRight": {
      paddingLeft: "11px",
    },
  },
  "th:last-of-type": {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    paddingRight: "16px",
  },
};

export default { colors, variants };
