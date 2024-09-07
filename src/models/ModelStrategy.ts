import { Model, Types } from "mongoose";
import { TypeStrategyTenis, TypeStrategyTenisCreate } from "../types/TypeStrategyTenis";
import SchemaStrategyTenis, { StrategyTenisDocument } from "../schemas/SchemaStrategyTenis";

class Strategy {
  private model: Model<StrategyTenisDocument>;

  constructor() {
    this.model = SchemaStrategyTenis;
  }

  async save(data: TypeStrategyTenisCreate): Promise<StrategyTenisDocument> {
    const strategy = new this.model(data);
    await strategy.save();
    return strategy;
  }

  // async findById(id: Types.ObjectId): Promise<StrategyTenisDocument | null> {
  //   const strategy = await this.model.findById(id);
  //   return strategy;
  // }

  async findAllByConfig(configId: Types.ObjectId): Promise<StrategyTenisDocument[]> {
    const strategies = await this.model.find({ STRATEGY_CONFIG: configId });
    return strategies;
  }

  // async update(id: Types.ObjectId, data: Partial<TypeStrategyTenis>): Promise<StrategyTenisDocument | null> {
  //   const updatedStrategy = await this.model.findByIdAndUpdate(id, data, { new: true });
  //   return updatedStrategy;
  // }

  async deleteManyByConfig(configId: Types.ObjectId): Promise<void> {
    await this.model.deleteMany({ STRATEGY_CONFIG: configId });
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export default new Strategy();
