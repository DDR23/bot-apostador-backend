import SchemaConfig from '../schemas/SchemaConfig';
import SchemaStrategyTenis from '../schemas/SchemaStrategyTenis';
import { TypeConfig } from '../types/TypeConfig';
import { Model, Document } from 'mongoose';

interface ConfigDocument extends TypeConfig, Document {}

class Config {
  private model: Model<ConfigDocument>;

  constructor() {
    this.model = SchemaConfig;
  }

  async save(data: TypeConfig): Promise<ConfigDocument> {
    const config = new this.model(data);
    await config.save();
    console.log(`A configuração do usuário ${data.CONFIG_USER} foi salva com sucesso.`);
    return config;
  }

  async update(id: string, data: Partial<TypeConfig>): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(id, data, { new: true }).populate('STRATEGIES');
    if (updatedConfig) {
      console.log(`Configuração do usuário ${updatedConfig.CONFIG_USER} atualizada com sucesso.`);
    }
    return updatedConfig;
  }

  async delete(id: string): Promise<void> {
    const config = await this.model.findById(id).populate('CONFIG_STRATEGIES');

    if (config) {
      if (config.CONFIG_STRATEGIES && config.CONFIG_STRATEGIES.length > 0) {
        await SchemaStrategyTenis.deleteMany({ _id: { $in: config.CONFIG_STRATEGIES } });
      }

      await this.model.findByIdAndDelete(id);
      console.log(`Configuração e suas estratégias deletadas com sucesso.`);
    } else {
      console.log(`Nenhuma configuração encontrada com ID ${id}`);
    }
  }

  async findById(id: string): Promise<ConfigDocument | null> {
    const config = await this.model.findById(id).populate('STRATEGIES');
    console.log(`Buscando configuração com ID ${id}...`);
    return config;
  }

  async findStrategies(id: string): Promise<any[]> {
    const config = await this.model.findById(id).populate('STRATEGIES');
    if (config) {
      console.log(`Estratégias encontradas para a configuração com ID ${id}:`, config.CONFIG_STRATEGIES);
      return config.CONFIG_STRATEGIES ?? [];
    }
    console.log(`Nenhuma configuração encontrada com ID ${id}`);
    return [];
  }
}

export default new Config();
