import { UpdateColumn } from '@Libs/entites/abstract';
import { Exclude, Expose, Type } from 'class-transformer';
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
  instagram: string;

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
