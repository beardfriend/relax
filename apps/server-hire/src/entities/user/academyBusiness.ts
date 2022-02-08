import { Primary } from '@Libs/entites/abstract';
import { Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import Academy from './academy';

@Entity()
class AcademyBusiness extends Primary {
  @Column()
  bussiness_number: string;

  @Column()
  representation_name: string;

  @Column()
  open_date: string;

  @OneToOne(() => Academy)
  @JoinColumn()
  academy: Academy;
}

export default AcademyBusiness;
