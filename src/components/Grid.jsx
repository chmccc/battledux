import React from "react";
import Cell from "./Cell.jsx";

const Grid = props => { 

  const cells=[];

  // loop through our data and create divs
  const hitMissArr = props.hitMissArr;
  const shipsArr = props.shipsArr;
  const cpu = props.cpu;

  // Make some dummy data for now
  // const cpu = false;
  
  // const hitMissArr = [];
  // for (let row=0; row<8; row++){
  //   let trow = []
  //   for (let row=0; row<8; row++){
  //     trow.push('W');
  //   }
  //   hitMissArr.push(trow)
  // }
  // console.log(hitMissArr);


  // const shipsArr = [
  //   [0,0,0,0,0,0,0,0],
  //   [0,0,0,'b','b','b','b',0],
  //   [0,0,0,0,0,0,0,0],
  //   [0,0,'s',0,'d','d',0,0],
  //   [0,0,'s',0,0,0,0,0],
  //   [0,0,'s',0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0]
  // ];

  // Display the grid
  for(let row=0; row<hitMissArr.length; row++){
    for (let col=0; col<hitMissArr[row].length; col++){
      let cellCode;
      // TODO:: do something if it's the CPU...don't show the ship
      // TODO:: need to update this based on real data

      // First show the ship...if it's not the CPU
      if ( !cpu && shipsArr[row][col] !== 'W') {
      // if ( shipsArr[row][col] !== 'W') { // just show for now so we can easily play test
        cellCode = shipsArr[row][col]; // if it's a non hit ship location...show the ship
      }

      // Override the cellCode if it is a HIT or Miss
      if ( hitMissArr[row][col] !== 'W' ){
        cellCode = hitMissArr[row][col];
      }


      // The cells are positioned from left to rigth and then up to down...
      // So, the coordinates start are (col,row);
      cells.push(<Cell coord={col+"-"+row} key={col+"-"+row} cellCode={cellCode} handleCellClick={props.handleCellClick}/>)
    }
  }
  // console.log(cells);
  return (
    <div className="pond-grid">
      {cells}
    </div>   
  )
}


export default Grid;