import React, { Component } from "react";
// import { render } from "react-dom";

const Cell = props => {
  let cellClass;

  // set the class so that our CSS can color the square correctly
  switch (props.cellCode){
    case 'W':
      cellClass = 'water';
      break;
    case 'H':
      cellClass = 'hit';
      break;
    case 'M':
      cellClass = 'miss';
      break;
    case 'D':
      cellClass = 'duck';
      break;
    case 'G':
      cellClass = 'battleship'; // TODO
      break;
    case 'B':
      cellClass = 'sub';// TODO
      break;
    default:
      cellClass = 'water';
  }
  

  // it is a 'cell' class and one of the above...for cell coloring
  let classnameText = "cell " + cellClass;
  return (
    <button id={props.coord} className={classnameText} onClick={props.handleCellClick}></button>
  )
}


export default Cell;