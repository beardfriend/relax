import { signUpType, userType } from '@Constants/Types';
import { UserDto } from '@Libs/dto/user';
import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Academy from './academy';
import Teacher from './teacher';

@Entity()
class User extends UserDto implements Primary {
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  kakaoId: number;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: userType, default: null })
  role: userType;

  @Column({ type: 'enum', enum: signUpType, default: null })
  signupType: signUpType;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => Academy)
  @JoinColumn()
  academy: Academy;
}

export default User;
