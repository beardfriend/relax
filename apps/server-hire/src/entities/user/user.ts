import { IsEmail } from 'class-validator';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { userType, signUpType } from '@Constants/Types';
import { Exclude } from 'class-transformer';
import { Primary } from '@Libs/entites/abstract';
import Teacher from './teacher';
import Academy from './academy';

@Entity()
class User extends Primary {
  @Column({ nullable: true })
  kakao_id: number;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ type: 'enum', enum: userType, default: null })
  role: userType;

  @Column({ type: 'enum', enum: signUpType, default: null })
  signup_type: signUpType;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => Academy)
  @JoinColumn()
  academy: Academy;
}

export default User;
