import {ADD_DEVICE} from './actionTypes';

export const addDevice = (data: any) => ({
  payload: data,
  type: ADD_DEVICE,
});
