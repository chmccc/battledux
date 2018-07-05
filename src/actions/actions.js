import * as actionTypes from './actionTypes';

export function playerFire(coord) {
  return {
    type: actionTypes.PLAYER_FIRE,
    payload: coord,
  };
};


export function compFire() {
  return {
    type: actionTypes.COMP_FIRE,
    payload: null,
  }
}

export function login(username) {
  console.log("what is username?", username);
  let status;
  return (dispatch) => {
    const configuration = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }),
    }
    return fetch('http://localhost:5000/login', configuration)
      .then((res) => {
        console.log('STATUS CODE: ', res.status);
        status = res.status
        return res.json();
      })
      .then((data) => {
        console.log('FETCHED DATA: ', data);
        if (status === 206) { // "206 Partial Content", means have user but no active games
          dispatch(loadGame({ data: [], new: false, username, userID: data.userID }));
        }
        if (status === 200) { // found user and active game, expect game data...
          dispatch(loadGame({ data, new: false, username, userID: data.user_id }));
        } else if (status === 201) { // "201 Created", created new user
          dispatch(loadGame({ data: [], new: true, username, userID: data.id }));
        }
      })
      .catch(e => console.error(e));
  }
}

export function saveGame(first_time) {

}

export function loadGame(data) {
  const hasSavedGame = !data.new && data.data.status === 'A';
  const action = hasSavedGame ? {
    type: actionTypes.LOAD_GAME,
    payload: data,
  } : {
    type: actionTypes.NEW_GAME,
    payload: data,
  };
  return action;
}
