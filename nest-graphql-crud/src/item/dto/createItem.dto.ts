import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateInputItem {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(()=>Int)
  @IsNumber()
  quantity: number;
}
