import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TableComponent from "./TableComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    marginTop: "1em",
  },
}));

function SearchComponent() {
  const [city, setCity] = React.useState("");
  const [bankResults, setBankResults] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const filterData = (v) => {
    const filterItems = bankResults.filter((value) => {
      let found = false;
      const values = Object.values(value);
      
      found = values.some((item) => String(item).includes(v));
      return found;
    });
    setSearchData(filterItems);
  };
  const map = new Object();
  const fetchDetails = () => {
    if (map[`https://vast-shore-74260.herokuapp.com/banks?city=${city}`]) {
      setBankResults(
        map[`https://vast-shore-74260.herokuapp.com/banks?city=${city}`]
      );
    } else {
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Cannot fetch Bank Details");
          }
          return res.json();
        })
        .then((data) => {
          setBankResults(data);
          map[`https://vast-shore-74260.herokuapp.com/banks?city=${city}`] =
            data;
        });
    }
  };
  React.useEffect(() => {
    fetchDetails();
    console.log(bankResults);
  }, [city]);
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={11} sm={6} md={4}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          fullWidth
        >
          <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={city}
            label="Select City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <MenuItem value="MUMBAI">Mumbai</MenuItem>
            <MenuItem value="KOLKATA">Kolkata</MenuItem>
            <MenuItem value="DELHI">Delhi</MenuItem>
            <MenuItem value="HYDERABAD">Hyderabad</MenuItem>
            <MenuItem value="BANGALORE">Bangalore</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={11} sm={6} md={7}>
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          onChange={(e) => {
            filterData(e.target.value);
          }}
          className={classes.formControl}
          InputProps={{
            autoCapitalize: true,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {!bankResults ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Grid item xs={12} sm={12}>
          <TableComponent data={searchData.length ? searchData : bankResults} />
        </Grid>
      )}
    </Grid>
  );
}

export default SearchComponent;
