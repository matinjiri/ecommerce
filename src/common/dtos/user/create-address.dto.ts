import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
