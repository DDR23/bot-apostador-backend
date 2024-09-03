import SchemaConfig, { ConfigDocument } from '../schemas/SchemaConfig';
import { TypeConfig } from '../types/TypeConfig';
import { Model } from 'mongoose';

class Config {
  private model: Model<ConfigDocument>;

  constructor() {
    this.model = SchemaConfig;
  }

  async save(data: TypeConfig): Promise<ConfigDocument> {
    const config = new this.model(data);
    await config.save();
    return config;
  }

  async update(id: string, data: Partial<TypeConfig>): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(id, data, { new: true });
    return updatedConfig;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ConfigDocument | null> {
    const config = await this.model.findById(id);
    return config;
  }

  async findAll(): Promise<ConfigDocument[]> {
    const configs = await this.model.find();
    return configs;
  }
}

export default new Config();
