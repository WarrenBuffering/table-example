//@flow strict

import palette from "../../../../../theme/palette";

const colors = {
  default: {
    background: {
      restful: palette.neutral[0],
    },
  },
  dark: {},
};

const variants = {
  overflowX: "scroll",
  table: {
    backgroundColor: "table.background.restful",
    borderSpacing: "0 4px",
    width: "100%",
  },
};

export default { colors, variants };
