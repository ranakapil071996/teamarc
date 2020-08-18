import React from "react";
import { withStyles, AppBar } from "@material-ui/core";
import { Style } from "./Style";
import FavouriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { toggleFavourites } from "../../store/actions/SearchAction";

function Header(props) {
  const { classes, toggleFavourites, showFav } = props;

  return (
    <AppBar color="primary">
      <div className={classes.container}>
        <div className={classes.headerTitle}>
          <div className={classes.logo}>TM</div>
          <h1>TeamArc Movies</h1>
        </div>
        <div onClick={() => toggleFavourites()} className={classes.headerTitle}>
          <FavouriteIcon color={showFav ? "error": ""} />
          <h3 style={{ marginLeft: '0.5em'}}>{"Favourites"}</h3>
        </div>
      </div>
    </AppBar>
  );
}

const mapStateToProps = ({ search }) => {
  return {
    ...search,
  };
};

export default connect(mapStateToProps, { toggleFavourites})(withStyles(Style)(Header));
