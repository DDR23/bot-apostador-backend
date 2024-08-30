// src/models/Config.ts
import { EstrategiesTenis, TypeConfigTenis } from "../types/TypeConfigTenis";

export class Config implements TypeConfigTenis {
  _id: number;
  USER: string;
  PASSWORD: string;
  TIME_START: string;
  TIME_FINISH: string;
  STOP_WIN: number;
  STOP_LOSS: number;
  ESTRATEGIES: EstrategiesTenis[];
  STATUS: boolean;

  constructor(data: TypeConfigTenis) {
    this._id = data._id;
    this.USER = data.USER;
    this.PASSWORD = data.PASSWORD;
    this.TIME_START = data.TIME_START;
    this.TIME_FINISH = data.TIME_FINISH;
    this.STOP_WIN = data.STOP_WIN;
    this.STOP_LOSS = data.STOP_LOSS;
    this.ESTRATEGIES = data.ESTRATEGIES;
    this.STATUS = data.STATUS;
  }

  save(): void {
    console.log(`A configuração do usuario: ${this.USER} foi salva com sucesso.`);
    console.log('Config:', { ...this });
  }
}

// update(data: Partial<TypeConfigTenis>): void {
//   Object.assign(this, data);
//   console.log(`Configuração do usuário ${this.USER} atualizada com sucesso.`);
// }

// static findById(id: number): Config {
//   // Simulação de busca por ID
//   // Dados de exemplo, você pode ajustar conforme sua lógica
//   return new Config(
//     'ExemploUser',
//     'ExemploSenha',
//     '13:00',
//     '14:00',
//     5,
//     5,
//     [
//       { DIFF_SET: 2, DIFF_POINT: 5, MULTIP: 1.7, ODD_VALUE: 5 },
//       { DIFF_SET: null, DIFF_POINT: null, MULTIP: 1.7, ODD_VALUE: 5 }
//     ],
//     true
//   );
// }

// delete(): void {
//   console.log(`Configuração do usuário ${this.USER} deletada com sucesso.`);
// }
