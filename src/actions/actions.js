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


export function create(data) {
  console.log("in?....");
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
// NEED:
// userID, status, playerBoard, compBoard, turns, hits, userSunk, compSunk

// HAVE: 
// playerBoard: store.gameReducer.playerBoard,
// compBoard: store.gameReducer.compBoard,
// userDuckHealth: store.gameReducer.userDuckHealth,
// compDuckHealth: store.gameReducer.compDuckHealth,
// playerStats: store.gameReducer.playerStats,
// userName: store.gameReducer.userName,
// currentPlayer: store.gameReducer.currentPlayer,
// compAvailableMoves: store.gameReducer.compAvailableMoves,

export function saveGame(storeData) {


  return (dispatch) => {
    const configuration = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(storeData),

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
