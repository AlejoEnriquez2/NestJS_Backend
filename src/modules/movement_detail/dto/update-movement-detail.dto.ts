import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementDetailDto } from './create-movement-detail.dto';

export class UpdateMovementDetailDto extends PartialType(
  CreateMovementDetailDto,
) {}
