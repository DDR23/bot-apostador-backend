//CONFIG E IMPORTAÇÕES
import { Schema, model, Document } from 'mongoose';
import { TypeConfig } from '../types/TypeConfig';

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelConfig: Schema = new Schema<TypeConfig>(
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

export default model<TypeConfig & Document>('Config', modelConfig);
