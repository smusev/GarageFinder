import {INCREASE_COUNTER} from './actionTypes';

export const increaseCounter = (data: any) => ({
  payload: data,
  type: INCREASE_COUNTER,
});