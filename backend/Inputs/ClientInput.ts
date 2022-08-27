import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateClientInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  adress: string;

  @Field()
  tel: string;
}

@InputType()
export class EditClientInput {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  adress: string;

  @Field()
  tel: string;
}
