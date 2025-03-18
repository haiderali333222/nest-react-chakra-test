import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemResolver } from 'src/item/resolvers/items.resolver';
import { Item, ItemSchema } from 'src/item/schema/item.schema';
import { ItemServce } from 'src/item/services/item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemServce, ItemResolver],
})
export class ItemModule {}
