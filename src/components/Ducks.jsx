import React from 'react';
// import '../style.css';

const Ducks = (props) => {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  for (let i = 0; i < 4; i += 1) {
    if (i < props.duckHealth.goose) arr1.push(<div className="on" />);
    else arr1.push(<div className="off" />);
  }
  for (let j = 0; j < 3; j += 1) {
    if (j < props.duckHealth.duck) arr2.push(<div className="on" />);
    else arr2.push(<div className="off" />);
  }
  for (let k = 0; k < 2; k += 1) {
    if (k < props.duckHealth.duckling) arr3.push(<div className="on" />);
    else arr3.push(<div className="off" />);
  }

  return (
    <table>
      <tr className="fleet">
        <th>Goose</th>
        <th>Duck</th>
        <th>Duckling</th>
      </tr>
      <tr>
        <td className="lifeBoxes">
          {arr1}
        </td>
        <td className="lifeBoxes">
          {arr2}
        </td>
        <td className="lifeBoxes">
          {arr3}
        </td>
      </tr>
    </table>
  );
};


export default Ducks;
