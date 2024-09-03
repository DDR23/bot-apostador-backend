//CONFIG E IMPORTAÇÕES
import { Schema, model, Document } from 'mongoose';
import { TypeConfig } from '../types/TypeConfig';

export interface ConfigDocument extends TypeConfig, Document {}

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
      required: true
    },
    CONFIG_TIME_FINISH: {
      type: String,
      required: true
    },
    CONFIG_STATUS: {
      type: Boolean,
      default: false
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
