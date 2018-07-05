import React from 'react';

const UserInfo = (props) => {

  let accuracy = props.hits / props.shots * 100;
  let accuracyFixed = accuracy.toFixed(2);
  if (props.shots === 0) {
    accuracyFixed = 0;
  }

  return (
    <div>
      <h3>Start game ☝</h3>
      <div>
        hits: {props.hits}
      </div>
      <div>
        shots: {props.shots}
      </div>
      <div>
        accuracy: {accuracyFixed}%
      </div>
    </div>
  );
};

export default UserInfo;
