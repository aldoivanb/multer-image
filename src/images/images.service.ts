import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { images } from './entities/images.entity';
import {urlAws} from './entities/AWS.entity'
import { S3Provider } from '../images/providers/s3/images/s3.provider';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(images) private imagesRepository: Repository<images>,
    @InjectRepository(urlAws) private urlAwsRepository: Repository<urlAws>,  // Asegúrate de inyectar el repositor
    private readonly s3Provider: S3Provider,
  ) { }

  async saveImage(file: Express.Multer.File) {

    if (!file.buffer) {
      throw new Error('El buffer del archivo está vacío.');
    }


    const fileName = `${Date.now()}-${file.originalname}`;


    const newImage = this.imagesRepository.create({
      //   filename: fileName, // 
      originalname: file.originalname,
      data: file.buffer,
    });


    const savedImage = await this.imagesRepository.save(newImage);


    const uploadResult = await this.s3Provider.uploadFileToS3(file);
    const imageUrl = uploadResult.Location; 

   
    const newUrlAws = this.urlAwsRepository.create({
      urlAws: imageUrl,
      images: savedImage,  
    });

    
    await this.urlAwsRepository.save(newUrlAws);

   
    savedImage.url = newUrlAws;
    await this.imagesRepository.save(savedImage);
    return savedImage;
  }



  async findAll() {
    return await this.imagesRepository.find();
  }

  async findOne(id: number): Promise<images> {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) throw new Error('Este id no existe');
    return image;
  }

  async deleteImage(id: number): Promise<void> {
    const deleteResult = await this.imagesRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Imagen no encontrada para eliminar');
    }
  }
}
