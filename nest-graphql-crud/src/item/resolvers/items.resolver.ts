import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CreateInputItem } from 'src/item/dto/createItem.dto';
import { ItemServce } from 'src/item/services/item.service';
import { Item } from '../dto/item.dto';
import { UpdateItemInput } from '../dto/updateItem.dto';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemServce: ItemServce) {}
  
  @Query(() => [Item], { name: 'items' })
  async findAll(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number
  ) {
    const result = await this.itemServce.findAll(limit, skip);
    return result;  
  }

  @Query(() => Item, { name: 'item', nullable: true })
  find(@Args('id') id: string) {
    return this.itemServce.findOne(id);
  }

  @Mutation(() => Item)
  createItem(@Args('input') input: CreateInputItem) {
    return this.itemServce.createItem(input);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: string, 
    @Args('input') input: UpdateItemInput, 
  ): Promise<Item|null> {
    return this.itemServce.updateItem(id, input);
  }

  @Mutation(() => Boolean)
  deleteItem(@Args('id') id: string) {
    return this.itemServce.deleteOne(id);
  }
}
