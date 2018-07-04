import React from 'react';

const UserInfo = (props) => {

  let accuracy = props.hits / props.shots * 100;

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
        accuracy: {accuracy}%
      </div>
    </div>
  );
};

export default UserInfo;
