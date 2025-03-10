import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './images.service';
import { UploadController } from './images.controller';
import { images } from './entities/images.entity';
import {urlAws} from './entities/AWS.entity'
import { S3Provider } from '../images/providers/s3/images/s3.provider'; 

@Module({
  imports: [TypeOrmModule.forFeature([images,urlAws])],
  controllers: [UploadController],
  providers: [ImagesService, S3Provider],  
})
export class ImagesModule {}
