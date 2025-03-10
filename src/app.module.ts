import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';  // Importamos ConfigModule
import { ImagesModule } from './images/images.module';
import { images } from './images/entities/images.entity';
import { urlAws } from './images/entities/AWS.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Hacemos que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'apires.croiwkokku5r.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '6D6vS6gStEjeiMqEbODv',
      database: 'apinestjsDB',
      entities: [images,urlAws],
      synchronize: true,
    }),
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
