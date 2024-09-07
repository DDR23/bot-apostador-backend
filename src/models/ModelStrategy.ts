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
  //   if (strategy) {
  //     console.log(`Estratégia encontrada com ID ${id}.`);
  //   } else {
  //     console.log(`Nenhuma estratégia encontrada com ID ${id}.`);
  //   }
  //   return strategy;
  // }

  async findAllByConfig(configId: Types.ObjectId): Promise<StrategyTenisDocument[]> {
    const strategies = await this.model.find({ STRATEGY_CONFIG: configId });
    return strategies;
  }

  // async update(id: Types.ObjectId, data: Partial<TypeStrategyTenis>): Promise<StrategyTenisDocument | null> {
  //   const updatedStrategy = await this.model.findByIdAndUpdate(id, data, { new: true });
  //   if (updatedStrategy) {
  //     console.log(`Estratégia com ID ${id} atualizada com sucesso.`);
  //   }
  //   return updatedStrategy;
  // }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export default new Strategy();
