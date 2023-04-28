const variants = {
  padding: "12px 16px!important",
  position: "relative",
  verticalAlign: "middle",
  ".content": {
    display: "flex",
    flexDirection: "row",
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
};

export default { variants };
