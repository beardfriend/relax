import { AcadmeyBusinessDto } from '@Libs/dto/academy';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Academy from './academy';

@Entity()
class AcademyBusiness extends AcadmeyBusinessDto {
  @Column()
  businessNumber: string;

  @Column()
  representationName: string;

  @Column()
  openDate: string;

  @OneToOne(() => Academy)
  @JoinColumn()
  academy: Academy;
}

export default AcademyBusiness;
