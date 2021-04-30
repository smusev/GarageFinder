export interface DeviceData {
  userAddress: string;
  userAge: number;
  userBankName: string;
  userDOB: string;
  userGender: string;
  userMobileNumber: string;
  userName: string;
  useraccountNumber: string;
  userbankAddress: string;
}

export interface DeviceState {
  devices: DeviceData[];
}

export interface DeviceAction {
  type: string;
  payload: any;
}

export type PostTypes = DeviceAction;
