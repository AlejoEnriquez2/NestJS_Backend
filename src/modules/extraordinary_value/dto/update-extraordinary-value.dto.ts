import { PartialType } from '@nestjs/mapped-types';
import { CreateExtraordinaryValueDto } from './create-extraordinary-value.dto';

export class UpdateExtraordinaryValueDto extends PartialType(CreateExtraordinaryValueDto) {}
