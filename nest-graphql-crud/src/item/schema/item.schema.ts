import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType()
export class Item extends Document {
  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field(() => Int)
  quantity: number;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
