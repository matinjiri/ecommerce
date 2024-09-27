import { ApiProperty } from "@nestjs/swagger";

export class TokenPair {
  @ApiProperty({
    type: String,
  })
  accessToken: string;
  @ApiProperty({
    type: String,
  })
  refreshToken: string;
}