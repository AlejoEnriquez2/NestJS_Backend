import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get<string>('HOST'),
        port: config.get<number>('PORTDB'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        database: config.get<string>('DBNAME'),
        synchronize: true,
        entities: ['dist/**/*.entity.{.ts,.js}'],       
      } as ConnectionOptions;
    },
  }),
];
