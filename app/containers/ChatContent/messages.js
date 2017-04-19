/*
 * ChatContent Messages
 *
 * This contains all the text for the ChatContent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.ChatContent.header',
    defaultMessage: 'This is ChatContent container !',
  },
  noSelectChat: {
    id: 'app.containers.ChatContent.noSelectChat',
    defaultMessage: '未选择聊天',
  },
  noSelectGroup: {
    id: 'app.containers.ChatContent.noSelectGroup',
    defaultMessage: '未选择群',
  },
  noSelectContact: {
    id: 'app.containers.ChatContent.noSelectContact',
    defaultMessage: '未选择用户',
  },
  sendMessage: {
    id: 'app.containers.ChatContent.sendMessage',
    defaultMessage: '发消息',
  },
  influence: {
    id: 'app.containers.ChatContent.influence',
    defaultMessage: '活跃度',
  },
  level: {
    id: 'app.containers.ChatContent.level',
    defaultMessage: '诚信等级',
  },
  group: {
    id: 'app.containers.ChatContent.group',
    defaultMessage: '群信息',
  },
  contact: {
    id: 'app.containers.ChatContent.contact',
    defaultMessage: '联系人',
  },
});
