import * as actionTypes from './actionTypes';

export function playerFire(target) {
  return {
    type: actionTypes.PLAYER_FIRE,
    payload: target,
  };
}

export function compFire() {
  return {
    type: actionTypes.COMP_FIRE,
    payload: null,
  }
}