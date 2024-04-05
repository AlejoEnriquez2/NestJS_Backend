import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementHeaderDto } from './create-movement-header.dto';

export class UpdateMovementHeaderDto extends PartialType(CreateMovementHeaderDto) {}
