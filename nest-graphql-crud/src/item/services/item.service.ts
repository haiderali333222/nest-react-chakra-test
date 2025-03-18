import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInputItem } from 'src/item/dto/createItem.dto';
import { Item } from '../dto/item.dto';
import { UpdateItemInput } from '../dto/updateItem.dto';

@Injectable()
export class ItemServce {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async findAll(limit: number = 10, skip: number = 0): Promise<Item[]> {
    const items = await this.itemModel.find().skip(skip).limit(limit).exec();
    return items;
  }

  async findOne(id: string): Promise<Item | null> {
    return this.itemModel.findById(id).exec();
  }

  async createItem(createInputItem: CreateInputItem): Promise<Item> {
    const newItem = new this.itemModel(createInputItem);
    return newItem.save();
  }

  async updateItem(id: string, input: UpdateItemInput): Promise<Item> {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedItem) {
      throw new Error(`Item with id ${id} not found`);
    }

    return updatedItem;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.itemModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
