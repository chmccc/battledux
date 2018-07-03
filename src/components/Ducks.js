import React from 'react';
import '../style.css';

const Ducks = (props) => {

  return (
    <table>
      <tr class="fleet">
        <th>Goose</th>
        <th>Duck</th>
        <th>Duckling</th>
      </tr>
      <tr>
        <td class="wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </td>
        <td class="wrapper">
          <div></div>
          <div></div>
          <div></div>
        </td>
        <td class="wrapper">
          <div></div>
          <div></div>
        </td>
      </tr>
    </table>
  );
};


export default Ducks;
