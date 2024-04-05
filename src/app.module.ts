import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { BuildingModule } from './modules/building/building.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { PropertyModule } from './modules/property/property.module';
import { GoodModule } from './modules/good/good.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { TypeModule } from './modules/type/type.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { BankModule } from './modules/bank/bank.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { OwnerModule } from './modules/owner/owner.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PhoneModule } from './modules/phone/phone.module';
import { PersonModule } from './modules/person/person.module';
import { MovementHeaderModule } from './modules/movement_header/movement-header.module';
import { MovementDetailModule } from './modules/movement_detail/movement-detail.module';
import { ServiceModule } from './modules/service/service.module';
import { AssemblyModule } from './modules/assembly/assembly.module';
import { MinuteModule } from './modules/minute/minute.module';
import { ExtraordinaryValueModule } from './modules/extraordinary_value/extraordinary-value.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST_DB: Joi.string().required(),
        NAME_DB: Joi.string().required(),
        USERNAME_DB: Joi.string().required(),
        PASSWORD_DB: Joi.string().required(),
        PORT_DB: Joi.number().required(),
      }),
    }),
    ConfigModule,
    DatabaseModule,
    BuildingModule,
    ConfigurationModule,
    PropertyModule,
    GoodModule,
    EmployeeModule,
    TypeModule,
    TenantModule,
    BankModule,
    SupplierModule,
    OwnerModule,
    NotificationModule,
    PhoneModule,
    PersonModule,
    MovementHeaderModule,
    MovementDetailModule,
    ServiceModule,
    AssemblyModule,
    MinuteModule,
    ExtraordinaryValueModule,
  ],
})
export class AppModule {}
