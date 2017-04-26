/*
 * ChatPanel Messages
 *
 * This contains all the text for the ChatPanel component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.ChatPanel.header',
    defaultMessage: 'This is ChatPanel container !',
  },
  search: {
    id: 'app.containers.ChatPanel.headerSearch',
    defaultMessage: '搜索',
  },
  intro: {
    id: 'app.containers.ChatPanel.intro',
    defaultMessage: '个人简介',
  },
  friend: {
    id: 'app.containers.ChatPanel.friend',
    defaultMessage: '好友',
  },
  group: {
    id: 'app.containers.ChatPanel.group',
    defaultMessage: '群组',
  },
  noSearchResult: {
    id: 'app.containers.ChatPanel.noSearchResult',
    defaultMessage: '没有相关匹配',
  },
});
