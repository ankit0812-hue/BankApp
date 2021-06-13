import React, { useLocalStorage } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationComponent(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
export default function TableComponent(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [favourite, setFavourite] = React.useState([]);
  const [showfav, setShowfav] = React.useState(false);
  const rows = props.data;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourite));
  }, [favourite]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableCell style={{ width: 160 }} align="center">
              IFSC
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              BANK ID
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              BRANCH
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              ADDRESS
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              CITY
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              DISTRICT
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              STATE
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              BANK NAME
            </TableCell>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.ifsc}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.bank_id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.branch}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.address}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.city}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.district}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.state}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.bank_name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <IconButton
                    onClick={() => {
                      setFavourite(row);
                      alert("Added To favourites");
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
