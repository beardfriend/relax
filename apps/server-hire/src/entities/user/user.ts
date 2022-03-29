import { signUpType, userType } from '@Constants/Types';
import { UserDto } from '@Libs/dto/user';
import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Academy from './academy';
import Teacher from './teacher';

@Entity()
class User extends UserDto implements Primary {
  @Column({ default: null })
  email: string;

  @Column({ default: null })
  kakaoId: number;

  @Column({ default: null })
  googleId: string;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
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
