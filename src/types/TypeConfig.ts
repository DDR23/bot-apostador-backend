import { Types } from 'mongoose';

export interface TypeConfig {
  _id: Types.ObjectId;
  CONFIG_USER: string;
  CONFIG_PASSWORD: string;
  CONFIG_TIME_START: string;
  CONFIG_TIME_FINISH: string;
  CONFIG_STATUS: boolean;
  CONFIG_STRATEGIES: Types.ObjectId;
}
