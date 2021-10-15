const styles = theme => ({
  drawerPaper: {
    width: 240,
    maxWidth: 240,
    zIndex: 10,
    height: "100%",
    position: "relative"
  },
  menuLink: {
    textDecoration: "none",
    fontSize: "15pt",
    color: theme.color.defaultTextColor
  },
  menuLinkActive: {
    "&>div": {
      backgroundColor: theme.color.hover
    }
  }
});

export default styles;
