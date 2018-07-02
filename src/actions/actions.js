import * as actionTypes from './actionTypes';

export function playerFire() {
  return {
    type: actionTypes.PLAYER_FIRE,
    payload: 1,
  };
};