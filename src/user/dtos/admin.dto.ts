import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { IsEnum } from 'class-validator';

export class AdminDto extends CreateUserDto {
    
    @ApiProperty({description: 'Role of the user, either admin or patient'})
    @IsEnum(['admin', 'professional'], {message: 'Role is not valid'})
    adminRole: 'admin' | 'professional';
        
}

export class UpdateAdminDto extends PartialType(AdminDto){}
