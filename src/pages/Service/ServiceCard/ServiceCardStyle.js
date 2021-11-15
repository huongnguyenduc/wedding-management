import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ServiceContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    padding: "3.5rem 3rem 3rem",
    transition: "transform 5s",
    [theme.breakpoints.down("md")]: {
      padding: "3rem 2rem 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 2rem 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 1rem 1rem",
    },
  },
  ServiceCard: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: "20px",
    boxShadow: "0 60px 80px -35px rgba(60, 60, 60, 0.15)",
    transition: "box-shadow 0.3s",
    animation: "$grow 0.5s ease-out",

    "&:hover": {
      "& .Image": {
        transform: "translate(0,-30px)",
      },
      "& .divControl": {
        display: "flex",
      },
      boxShadow: "0 60px 80px -35px rgba(60, 60, 60, 0.25)",
    },
  },
  "@keyframes grow": {
    from: {
      opacity: 0,
      transform: "translate(0,20px)",
    },
    to: {
      opacity: 1,
      transform: "translate(0,0)",
    },
  },
  Image: {
    paddingTop: "70%",
    borderRadius: "2px",
    opacity: "1",
    transition: "opacity 0.6s, transform 0.3s",
    animation: "$GrowImage 0.6s 1",
    zIndex: 0,
  },
  "@keyframes GrowImage": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  MediaContent: {
    position: "relative",
    borderRadius: "2px",
    "&:hover": {
      "& .Image": {
        opacity: "0.7",
      },
      "& .btnDetail": {
        opacity: "1",
      },
    },
    zIndex: 0,
  },
  ButtonLabel: {
    margin: "0",
  },
  btnDetail: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: "0",
    transition: "opacity 0.6s",
    cursor: "pointer",
  },
  divControl: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 0,
    display: "none",
    justifyContent: "center",
  },
  Button: {
    borderRadius: "0",
    padding: "5px 20px",
  },
  LabelButton: {
    marginLeft: "0",
  },
  ButtonIcon: {
    fontSize: "17px",
  },
  DeleteIcon: {
    color: "#f44336",
  },
  UpdateIcon: {
    color: "#4caf50",
  },
  TextContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  Name: {
    margin: "20px 0 8px",
    textAlign: "center",
    color: "#3d3935",
    "&:hover": {
      color: "#b58a61",
      textDecoration: "none",
    },
    textTransform: "uppercase",
    lineHeight: "30px",
    fontWeight: "600",
    fontSize: "20px",
    cursor: "pointer",
    fontFamily: '"Raleway", sans-serif',
  },
  Price: {
    position: "relative",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: "#c17a37",
  },
  SearchControl: {},
}));
export default useStyles;
