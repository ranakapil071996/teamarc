import React from "react";
import { withStyles } from "@material-ui/core";
import { Style } from "./Style";
import Favorite from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { addTofavourite, removeFromfavourite } from "../../store/actions";
import { withRouter } from "react-router-dom";

function MovieCard(props) {

  const { classes, data, favourites, addTofavourite, removeFromfavourite, history } = props;

  const handleFavouriteClick = (e, remove) => {
      e.stopPropagation();
      if(remove){
        removeFromfavourite(data.imdbID)
      }else{
        addTofavourite(data)
      }
  }

  const renderFavUnFavBtn = () => {
    if (favourites && favourites.map((item) => item.imdbID).includes(data.imdbID)) {
      return (
        <div  onClick={(e) => handleFavouriteClick(e, true)} title="Remove from favourite" className={classes.addContainer}>
          <p style={{ marginRight: "0.5em" }}>Remove from favourite</p>
          <Favorite color="error" />
        </div>
      );
    } else {
      return (
        <div onClick={(e) => handleFavouriteClick(e)} title="Add to favourite" className={classes.addContainer}>
          <p style={{ marginRight: "0.5em" }}>Add to favourite</p>
          <Favorite />
        </div>
      );
    }
  };

  return (
    <div onClick={() => history.push(`/detail/${data.imdbID}`)} className={classes.container}>
      <img height="250px" src={data.Poster} alt={data.Title} />
      <div className={classes.content}>
        <h3>{data.Title}</h3>
        <i>Year of release {data.Year}</i>
        <p style={{ margin: 0 }}>
          <b>ImdbId:</b> {data.imdbID}
        </p>
        {renderFavUnFavBtn()}
      </div>
    </div>
  );
}

const mapStateToProps = ({ search }) => {
  return {
    ...search,
  };
};

export default connect(mapStateToProps, { addTofavourite, removeFromfavourite})(withStyles(Style)(withRouter(MovieCard)));
