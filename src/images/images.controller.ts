import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import * as multer from 'multer';

@Controller('images')
export class UploadController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Archivo recibido:', file);

    if (!file || !file.buffer) {
      throw new Error('El buffer del archivo está vacío.');
    }

    const savedImage = await this.imagesService.saveImage(file);
    return { message: 'Archivo subido y guardado en la base de datos', file: savedImage };
  }

  @Get()
  getAllImages() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(Number(id));
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return this.imagesService.deleteImage(Number(id));
  }
}
