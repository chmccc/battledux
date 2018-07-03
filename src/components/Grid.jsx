import React, { Component } from "react";
import Cell from "./Cell.jsx";

const Grid = props => { 

  const cells=[];

  // loop through our data and create divs
  // const hitMissArr = props.hitMissArr;
  // const shipsArr = props.shipsArr;
  // const cpu = props.cpu;

  // Make some dummy data for now
  const cpu = false;
  
  const hitMissArr = [];
  for (let row=0; row<8; row++){
    let trow = []
    for (let row=0; row<8; row++){
      trow.push('w');
    }
    hitMissArr.push(trow)
  }
  console.log(hitMissArr);


  const shipsArr = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,'b','b','b','b',0],
    [0,0,0,0,0,0,0,0],
    [0,0,'s',0,'d','d',0,0],
    [0,0,'s',0,0,0,0,0],
    [0,0,'s',0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
  ];

  for(let row=0; row<hitMissArr.length; row++){
    for (let col=0; col<hitMissArr[row].length; col++){
      let cellCode;
      // TODO:: do something if it's the CPU...don't show the ship
      if ( !cpu && shipsArr[row][col] !== 0 && hitMissArr[row][col] !== 'h') { // TODO:: need to update this based on real data
        cellCode = shipsArr[row][col]; // if it's a non hit ship location...show the ship 
      } else {
        cellCode = hitMissArr[row][col]; // otherwise, show the hit miss
      }

      cells.push(<Cell id={col+"-"+row} key={col+"-"+row} cellCode={cellCode} />)
    }
  }
  console.log(cells);
  return (
    <div className="pond-grid">
      {cells}
    </div>   
  )
}


export default Grid;