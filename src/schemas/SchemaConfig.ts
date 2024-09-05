//CONFIG E IMPORTAÇÕES
import { Schema, model, Document } from 'mongoose';
import { TypeConfig } from '../types/TypeConfig';

export interface ConfigDocument extends Omit<TypeConfig, '_id'>, Document {}

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelConfig: Schema<ConfigDocument> = new Schema<ConfigDocument>(
  {
    CONFIG_USER: {
      type: String,
      required: true
    },
    CONFIG_PASSWORD: {
      type: String,
      required: true
    },
    CONFIG_TIME_START: {
      type: String,
      default: '--:--'
    },
    CONFIG_TIME_FINISH: {
      type: String,
      default: '--:--'
    },
    CONFIG_STATUS: {
      type: Boolean,
      default: false
    },
    CONFIG_ENTRIES: {
      type: Number,
      default: 0
    },
    CONFIG_RESULT: {
      type: Number,
      default: 0
    },
    CONFIG_STRATEGIES: [{
      type: Schema.Types.ObjectId,
      ref: 'StrategyTenis'
    }]
  },
  { 
    timestamps: true
  }
);

export default model<ConfigDocument>('Config', modelConfig);
