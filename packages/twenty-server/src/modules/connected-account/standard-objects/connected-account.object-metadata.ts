import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { CONNECTED_ACCOUNT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CalendarChannelObjectMetadata } from 'src/modules/calendar/standard-objects/calendar-channel.object-metadata';
import { MessageChannelObjectMetadata } from 'src/modules/messaging/standard-objects/message-channel.object-metadata';
import { WorkspaceMemberObjectMetadata } from 'src/modules/workspace-member/standard-objects/workspace-member.object-metadata';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-object.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';

export enum ConnectedAccountProvider {
  GOOGLE = 'google',
}

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.connectedAccount,
  namePlural: 'connectedAccounts',
  labelSingular: 'Connected Account',
  labelPlural: 'Connected Accounts',
  description: 'A connected account',
  icon: 'IconAt',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class ConnectedAccountObjectMetadata extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.handle,
    type: FieldMetadataType.TEXT,
    label: 'handle',
    description: 'The account handle (email, username, phone number, etc.)',
    icon: 'IconMail',
  })
  handle: string;

  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.provider,
    type: FieldMetadataType.TEXT,
    label: 'provider',
    description: 'The account provider',
    icon: 'IconSettings',
  })
  provider: ConnectedAccountProvider; // field metadata should be a SELECT

  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.accessToken,
    type: FieldMetadataType.TEXT,
    label: 'Access Token',
    description: 'Messaging provider access token',
    icon: 'IconKey',
  })
  accessToken: string;

  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.refreshToken,
    type: FieldMetadataType.TEXT,
    label: 'Refresh Token',
    description: 'Messaging provider refresh token',
    icon: 'IconKey',
  })
  refreshToken: string;

  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.lastSyncHistoryId,
    type: FieldMetadataType.TEXT,
    label: 'Last sync history ID',
    description: 'Last sync history ID',
    icon: 'IconHistory',
  })
  lastSyncHistoryId: string;

  @WorkspaceField({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.authFailedAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Auth failed at',
    description: 'Auth failed at',
    icon: 'IconX',
  })
  @WorkspaceIsNullable()
  authFailedAt: Date;

  @WorkspaceRelation({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.accountOwner,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Account Owner',
    description: 'Account Owner',
    icon: 'IconUserCircle',
    joinColumn: 'accountOwnerId',
    inverseSideTarget: () => WorkspaceMemberObjectMetadata,
    inverseSideFieldKey: 'connectedAccounts',
  })
  accountOwner: Relation<WorkspaceMemberObjectMetadata>;

  @WorkspaceRelation({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.messageChannels,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Message Channels',
    description: 'Message Channels',
    icon: 'IconMessage',
    inverseSideTarget: () => MessageChannelObjectMetadata,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  messageChannels: Relation<MessageChannelObjectMetadata[]>;

  @WorkspaceRelation({
    standardId: CONNECTED_ACCOUNT_STANDARD_FIELD_IDS.calendarChannels,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Calendar Channels',
    description: 'Calendar Channels',
    icon: 'IconCalendar',
    inverseSideTarget: () => CalendarChannelObjectMetadata,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  calendarChannels: Relation<CalendarChannelObjectMetadata[]>;
}
