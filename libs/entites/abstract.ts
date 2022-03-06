import { CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Primary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}

export abstract class PrimaryJoinColumn {
  @PrimaryColumn()
  id: number;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}

export abstract class UnPrimary {
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}
