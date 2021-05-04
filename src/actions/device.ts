import {ADD_DEVICE, INCREASE_COUNTER} from './actionTypes';

export const addDevice = (data: any) => ({
  payload: data,
  type: ADD_DEVICE,
});

export const increaseCounter = (data: any) => ({
  payload: data,
  type: INCREASE_COUNTER,
});