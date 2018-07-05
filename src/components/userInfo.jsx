import React from 'react';

const UserInfo = (props) => {

  let accuracy = props.shots.hits / props.shots.shots * 100;

  return (
    <div>
      <h3>Start game ☝</h3>
      <div>
        hits: {props.shots.hits}
      </div>
      <div>
        shots: {props.shots.shots}
      </div>
      <div>
        accuracy: {accuracy}%
      </div>
    </div>
  );
};

export default UserInfo;
