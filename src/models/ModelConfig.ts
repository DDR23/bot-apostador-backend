import SchemaConfig, { ConfigDocument } from '../schemas/SchemaConfig';
import { TypeConfigCreate, TypeConfigUpdate } from '../types/TypeConfig';
import { Model, Types } from 'mongoose';
import Strategy from './ModelStrategy';

class Config {
  private model: Model<ConfigDocument>;

  constructor() {
    this.model = SchemaConfig;
  }

  async save(data: TypeConfigCreate): Promise<ConfigDocument> {
    const config = new this.model(data);
    await config.save();
    return config;
  }

  async findById(id: Types.ObjectId): Promise<ConfigDocument | null> {
    const config = await this.model.findById(id);
    return config;
  }

  async findAll(): Promise<ConfigDocument[]> {
    const configs = await this.model.find();
    return configs;
  }

  async update(id: Types.ObjectId, data: Partial<TypeConfigUpdate>): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(id, data, { new: true });
    return updatedConfig;
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await Strategy.deleteManyByConfig(id)
    await this.model.findByIdAndDelete(id);
  }

  async addStrategyToConfig(configId: Types.ObjectId, strategyId: Types.ObjectId): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(
      configId,
      { $push: { CONFIG_STRATEGIES: strategyId } },
      { new: true }
    );
    return updatedConfig;
  }

  async removeStrategyFromConfig(configId: Types.ObjectId, strategyId: Types.ObjectId): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(
      configId,
      { $pull: { CONFIG_STRATEGIES: strategyId } },
      { new: true }
    );
    return updatedConfig;
  }

}

export default new Config();
