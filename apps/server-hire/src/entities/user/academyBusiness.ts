import { Primary } from '@Libs/entites/abstract';
import { Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import Academy from './academy';

@Entity()
class AcademyBusiness extends Primary {
  @Column()
  businessNumber: number;

  @Column()
  representationName: string;

  @Column()
  openDate: string;

  @OneToOne(() => Academy)
  @JoinColumn()
  academy: Academy;
}

export default AcademyBusiness;
