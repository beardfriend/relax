import { UpdateColumn } from '@Libs/entites/abstract';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ImageDto } from './image';
import { YogaDto } from './yoga';

export class TeacherProfileDto extends UpdateColumn {
  @Exclude()
  id: number;

  @Expose()
  name: string;

  @Expose()
  introduce: string;

  @Expose()
  @IsNotEmpty()
  representationNumber: string;

  @Type(() => ImageDto)
  profileImage: ImageDto;

  @Type(() => YogaDto)
  yoga: YogaDto[];
}
export class TeacherDto extends UpdateColumn {
  @Exclude()
  id: number;

  @Type(() => TeacherProfileDto)
  teacherProfile: TeacherProfileDto;
}
