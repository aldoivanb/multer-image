import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { urlAws } from './AWS.entity';

@Entity()
export class images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;  
  
  @Column('longblob')
  data: Buffer;
  
  
  @OneToOne(() => urlAws)
  @JoinColumn({ name: 'id_url' })  
  url: urlAws;
}
