import * as actionTypes from './actionTypes';

export function playerFire(coord) {
  return {
    type: actionTypes.PLAYER_FIRE,
    payload: coord,
  };
};

export function compFire(coord) {
  return {
    type: actionTypes.COMP_FIRE,
    payload: coord,
  };
};

