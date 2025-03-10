import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(()=>Int)
  quantity: number;

  @Field()
  createdAt: Date;
}