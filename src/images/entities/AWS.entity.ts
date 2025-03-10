import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { images } from './images.entity';

@Entity()
export class urlAws {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlAws: string;  
  
  @OneToOne(() => images, (images) => images.url)
  images: images;
}
