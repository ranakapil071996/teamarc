import React, { useState } from "react";
import SearchBar from "../components/search_bar/SearchBar";
import MovieCard from "../components/movie_card/MovieCard";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

function LandingPage(props) {
  const classes = useStyle();
  const { showFav, searchResult, favourites } = props;
  const [loading, setLoading] = useState(false);

  const renderCard = () => {
    if (loading) {
      return <div />;
    }
    if (showFav) {
      return favourites.map((item) => (
        <MovieCard key={item.imdbID} data={item} />
      ));
    } else {
      if (!Array.isArray(searchResult)) {
        return (
          <div className={classes.noSearch}>
            Search movies, series, episodes ...
          </div>
        );
      }
      if (!searchResult.length) {
        return <div className={classes.noSearch}>No Result found</div>;
      }
      return searchResult.map((item) => (
        <MovieCard key={item.imdbID} data={item} />
      ));
    }
  };

  return (
    <div>
      {!showFav && <SearchBar loading={loading} setLoading={setLoading} />}
      <div className={classes.container}>{renderCard()}</div>
    </div>
  );
}

const mapStateToProps = ({ search }) => {
  return {
    ...search,
  };
};

export default connect(mapStateToProps)(LandingPage);

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: "2em",
  },
  noSearch: {
    fontSize: "1.6em",
    display: "flex",
    justifyContent: "center",
    color: "#a7a7a7",
  },
}));
