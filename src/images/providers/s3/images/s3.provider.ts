import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { images } from 'src/images/entities/images.entity';
import * as fs from 'fs';

@Injectable()
export class S3Provider {
  private s3: AWS.S3;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(images) private imagesRepository: Repository<images>,
  ) {

    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      region: this.configService.get('S3_REGION'),
    });
  }
  async uploadFileToS3(file: Express.Multer.File) {
    if (!file.buffer) {
      throw new Error('El buffer del archivo está vacío. Asegúrate de usar multer.memoryStorage().');
    }
  
    const uploadParams = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,  // Usamos directamente el buffer
      ACL: 'public-read',
      ContentType: file.mimetype,
    };
  
    try {
      const uploadResult = await this.s3.upload(uploadParams).promise();
      return uploadResult;
    } catch (error) {
      throw new Error(`Error subiendo el archivo a S3: ${error.message}`);
    }
  }
  
  
}