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

export function login(data){
  console.log("what is data?", data);
  return dispatch => {
    var configuration = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: data}),   
    }
    return fetch('http://localhost:5000/login', configuration)
      .then((res) => {
        res.json()
          .then((res2) => {
            console.log(res2);
            dispatch(loadBoard(res2))
          })
      })
  }
}


export function loadBoard(datafromDB) {
  // return{
  //   type: actionTypes.LOAD_BOARD,
  //   payload: datafromDB
  // }
}
