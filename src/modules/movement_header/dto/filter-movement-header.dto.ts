import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterMovementHeaderDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  // @IsOptional()
  // @IsPositive()
  // minPrice: number;

  // @ValidateIf((item) => item.minPrice)
  // @IsPositive()
  // maxPrice: number;
}
