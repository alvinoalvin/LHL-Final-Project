import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 80
  },
  input: {
    width: 110,
    height: 40,
    padding: 0
  },
  select: {
    width: 130,
    height: 40
  },
  link: {
    color: "black",
    textDecoration: "underline black"
  },
}));