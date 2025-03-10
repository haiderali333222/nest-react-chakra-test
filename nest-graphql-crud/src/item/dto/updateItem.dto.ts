import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput {
  @Field({ nullable: true })  // Nullable fields, so you don't have to provide them all
  name?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}
