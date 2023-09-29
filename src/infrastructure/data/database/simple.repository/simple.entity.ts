import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  Generated,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  Unique,
} from 'typeorm';

export const SIMPLE_TABLE = 'simples';
@Entity(SIMPLE_TABLE)
@Unique('name_deleted_at_un', ['name', 'deleted_at'])
export class SimpleEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  @Index()
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string;

  @Column({ type: 'bigint', default: Date.now() })
  created_at?: number;

  @Column({ type: 'bigint', default: Date.now() })
  updated_at?: number;

  @Column({ type: 'bigint', nullable: true })
  deleted_at?: number;
}

@EventSubscriber()
export class SimpleEntitySubscriber
  implements EntitySubscriberInterface<SimpleEntity>
{
  async beforeInsert(event: InsertEvent<SimpleEntity>) {
    event.entity.created_at = Date.now();
    event.entity.updated_at = Date.now();
  }

  async beforeUpdate(event: UpdateEvent<SimpleEntity>) {
    if (!event.entity.deleted_at) {
      event.entity.updated_at = Date.now();
    }
  }
}
