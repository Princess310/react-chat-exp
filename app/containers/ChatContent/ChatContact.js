/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexRow from 'components/FlexRow';
import ChatHeader from 'components/ChatHeader';
import ExpProgress from 'components/ExpProgress';

import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import messages from './messages';
import Wrapper from './Wrapper';

import {
  makeSelectChatContact,
} from './selectors';

import {
  fetchTouchUser,
  loadMessageUser,
  chageTab,
} from 'containers/ChatPage/actions';

const ContentWrapper = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BlackChatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${pallete.text.help};
`;

const LabelWrapper = styled.span`
  margin-left: 8px;
  color: ${pallete.text.help};
`;

export class ChatContact extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { contact, loadUser, getTouchUser, chageTab } = this.props;

    const contentView = contact ?
    (
      <Wrapper>
        <ChatHeader title={<FormattedMessage {...messages.contact} />} />
        <ContentWrapper>
          <Avatar src={contact.avatar} size={80} />
          <FlexRow style={{ marginTop: '15px', fontSize: 20 }}>
            <span>{contact.nickname}</span>
          </FlexRow>
          <FlexRow style={{ marginTop: '15px', alignItems: 'center' }}>
            {contact.tag_identity_name && <span>{contact.tag_identity_name}</span>}
            <LabelWrapper><FormattedMessage {...messages.influence} />: </LabelWrapper>
            <span style={{ marginLeft: '4px', color: pallete.theme }}>{contact.influence}</span>
            <LabelWrapper><FormattedMessage {...messages.level} /> </LabelWrapper>
            <ExpProgress progress={contact.integrity_progress} />
            <span style={{ marginLeft: '4px', color: pallete.text.yellow }}>V{contact.integrity_level}</span>
          </FlexRow>
          <RaisedButton
            label={<FormattedMessage {...messages.sendMessage} />}
            primary={true}
            style={{ marginTop: '40px' }}
            onTouchTap={() => {
              loadUser(contact);
              getTouchUser(contact.id);
              chageTab('message');
            }}
          />
        </ContentWrapper>
      </Wrapper>
    ) : (
      <BlackChatWrapper>
        <FormattedMessage {...messages.noSelectContact} />
      </BlackChatWrapper>
    );

    return (
      <Wrapper>
        {contentView}
      </Wrapper>
    );
  }
}

ChatContact.propTypes = {
  contact: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loadUser: PropTypes.func,
  getTouchUser: PropTypes.func,
  chageTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contact: makeSelectChatContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadUser: (data) => dispatch(loadMessageUser(data)),
    getTouchUser: (id) => dispatch(fetchTouchUser(id)),
    chageTab: (tab) => dispatch(chageTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContact);
