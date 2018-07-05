import React from "react";

const Ducks = props => {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  let goose_skull_class = "hidden";
  let duck_skull_class = "hidden";
  let duckling_skull_class = "hidden";

  for (let i = 0; i < 4; i += 1) {
    if (i < props.duckHealth.goose)
      arr1.push(<div className="on" key={`goose${i}`} />);
    else arr1.push(<div className="off" key={`goose${i}`} />);
  }
  for (let j = 0; j < 3; j += 1) {
    if (j < props.duckHealth.duck)
      arr2.push(<div className="on" key={`duck${j}`} />);
    else arr2.push(<div className="off" key={`duck${j}`} />);
  }
  for (let k = 0; k < 2; k += 1) {
    if (k < props.duckHealth.duckling)
      arr3.push(<div className="on" key={`duckling${k}`} />);
    else arr3.push(<div className="off" key={`duckling${k}`} />);
  }

  if (props.duckHealth.goose === 0) {
    goose_skull_class = "show";
  }
  if (props.duckHealth.duck === 0) {
    duck_skull_class = "show";
  }
  if (props.duckHealth.duckling === 0) {
    duckling_skull_class = "show";
  }

  return (
    <table className="fleet-table">
      <thead>
        <tr className="fleet">
          <th>Goose</th>
          <th>Duck</th>
          <th>Duckling</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="lifeBoxes">{arr1}</td>
          <td className="lifeBoxes">{arr2}</td>
          <td className="lifeBoxes">{arr3}</td>
        </tr>
        <tr><td className="skull-and-crossbones">
            <div className={goose_skull_class}>☠</div>
          </td>
          <td className="skull-and-crossbones">
            <div className={duck_skull_class}>☠</div>
          </td>
          <td className="skull-and-crossbones">
            <div className={duckling_skull_class}>☠</div>
          </td>️</tr>
      </tbody>
    </table>
  );
};

export default Ducks;
