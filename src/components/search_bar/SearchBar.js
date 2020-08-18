import React, { useState } from "react";
import {
  withStyles,
  InputBase,
  Paper,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Style } from "./Style";
import SearchIcon from "@material-ui/icons/Search";
import { searchQuery } from "../../store/actions/SearchAction";
import { connect } from "react-redux";

function SearchBar(props) {

  const { classes, searchQuery, loading, setLoading } = props;
  const [type, setType] = useState(0);
  const [query, setQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()
    if(query.length < 3 ){
      alert("Enter atleast 3 char");
    }
    setLoading(true);
    let params = { "s": query};
    if(type){
      params["type"] = type
    }
    await searchQuery(params);
    setLoading(false)
  }

  if(loading){
    return(<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200}}>
      <CircularProgress />
    </div>)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit} className={classes.container} style={{ width: '100%'}} >
        <Paper className={classes.searchContainer}>
          <SearchIcon />
          <InputBase
            style={{ width: "100%" }}
            placeholder={`Search by title`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Paper>
        <Select onChange={(e) => setType(e.target.value)} value={type} className={classes.selectBox}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value="movie">Movies</MenuItem>
          <MenuItem value="series">Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
        <Button type="submit" className={classes.button} color="primary" variant="contained">
          Search
        </Button>
      </form>
    </div>
  );
}

export default connect(null, { searchQuery })(withStyles(Style)(SearchBar));
