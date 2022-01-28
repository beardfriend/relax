import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import Resume from './resume';

@Entity()
class Education extends Primary {
  @Column()
  school_name: string;

  @Column()
  major: string;

  @Column()
  degree: string;

  @Column()
  admission_date: string;

  @Column()
  graduated_date: string;

  @Column()
  etc_explain: string;

  @ManyToOne(() => Resume)
  resume: Resume;
}

export default Education;
