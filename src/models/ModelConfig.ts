import SchemaConfig, { ConfigDocument } from '../schemas/SchemaConfig';
import { TypeConfigCreate, TypeConfigUpdate } from '../types/TypeConfig';
import { Model } from 'mongoose';

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

  async findById(id: string): Promise<ConfigDocument | null> {
    const config = await this.model.findById(id);
    return config;
  }

  async findAll(): Promise<ConfigDocument[]> {
    const configs = await this.model.find();
    return configs;
  }

  async update(id: string, data: Partial<TypeConfigUpdate>): Promise<ConfigDocument | null> {
    const updatedConfig = await this.model.findByIdAndUpdate(id, data, { new: true });
    return updatedConfig;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

}

export default new Config();
