import React, { Component } from "react";
// import { render } from "react-dom";

const Cell = props => {
  let cellClass;
  switch (props.cellCode){
    case 'w':
      cellClass = 'water';
      break;
    case 'h':
      cellClass = 'hit';
      break;
    case 'm':
      cellClass = 'miss';
      break;
    case 'd':
      cellClass = 'duck'; // TODO
      break;
    case 'b':
      cellClass = 'battleship'; // TODO
      break;
    case 's':
      cellClass = 'sub';// TODO
      break;
    default:
      cellClass = 'water';
  }
  

  // it is a 'cell' class and one of the above...for cell coloring
  let classnameText = "cell " + cellClass;
  return (
    <button id={props.coord} className={classnameText} onClick={props.updateState}></button>
  )
}


export default Cell;