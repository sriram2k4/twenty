import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import { IDField } from '@ptc-org/nestjs-query-graphql';
import { IsOptional } from 'class-validator';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';

export enum RemoteTableStatus {
  SYNCED = 'SYNCED',
  NOT_SYNCED = 'NOT_SYNCED',
}

export enum TableUpdate {
  TABLE_DELETED = 'TABLE_DELETED',
  COLUMNS_DELETED = 'COLUMN_DELETED',
  COLUMNS_ADDED = 'COLUMN_ADDED',
  COLUMNS_TYPE_CHANGED = 'COLUMN_TYPE_CHANGED',
}

registerEnumType(RemoteTableStatus, {
  name: 'RemoteTableStatus',
  description: 'Status of the table',
});

registerEnumType(TableUpdate, {
  name: 'TableUpdate',
  description: 'Schema update on a table',
});

@ObjectType('RemoteTable')
export class RemoteTableDTO {
  @IDField(() => UUIDScalarType, { nullable: true })
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => RemoteTableStatus)
  status: RemoteTableStatus;

  @IsOptional()
  @Field(() => String, { nullable: true })
  schema?: string;

  @IsOptional()
  @Field(() => [TableUpdate], { nullable: true })
  schemaPendingUpdates?: [TableUpdate];
}
