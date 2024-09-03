import { Types } from "mongoose";

export interface TypeStrategyTenis {
  STRATEGY_DIFF_SET?: number;
  STRATEGY_DIFF_POINT?: number;
  STRATEGY_MULTIPLIER?: number;
  STRATEGY_ENTRY_VALUE: number;
  STRATEGY_STOP_WIN?: number;
  STRATEGY_STOP_LOSS?: number;
  STRATEGY_CONFIG: Types.ObjectId;
}
