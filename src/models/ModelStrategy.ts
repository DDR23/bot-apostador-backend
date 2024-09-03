import { Model } from "mongoose";
import { TypeStrategyTenis } from "../types/TypeStrategyTenis";
import SchemaStrategyTenis, { StrategyTenisDocument } from "../schemas/SchemaStrategyTenis";

class Strategy {
  private model: Model<StrategyTenisDocument>;

  constructor() {
    this.model = SchemaStrategyTenis;
  }

  async save(data: TypeStrategyTenis): Promise<StrategyTenisDocument> {
    const strategy = new this.model(data);
    await strategy.save();
    console.log(`A estratégia do usuário ${data.STRATEGY_CONFIG} foi salva com sucesso.`);
    return strategy;
  }

  async update(id: string, data: Partial<TypeStrategyTenis>): Promise<StrategyTenisDocument | null> {
    const updatedStrategy = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (updatedStrategy) {
      console.log(`Estratégia com ID ${id} atualizada com sucesso.`);
    }
    return updatedStrategy;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
    console.log(`Estratégia com ID ${id} deletada com sucesso.`);
  }

  async findById(id: string): Promise<StrategyTenisDocument | null> {
    const strategy = await this.model.findById(id);
    if (strategy) {
      console.log(`Estratégia encontrada com ID ${id}.`);
    } else {
      console.log(`Nenhuma estratégia encontrada com ID ${id}.`);
    }
    return strategy;
  }
}

export default new Strategy();
