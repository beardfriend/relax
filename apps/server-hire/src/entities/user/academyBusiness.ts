import { AcadmeyBusinessDto } from '@Libs/dto/academy';
import { UpdateColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Academy from './academy';

@Entity()
class AcademyBusiness extends AcadmeyBusinessDto implements UpdateColumn {
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
