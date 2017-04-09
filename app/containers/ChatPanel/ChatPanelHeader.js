import React, { PropTypes } from 'react';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';

class ChatPanelHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openPopup: false,
    };
  }

  handleTouchTap = (e) => {
    e.preventDefault();

    this.setState({
      openPopup: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      openPopup: false,
    });
  }

  render() {
    const { user } = this.props;
    const { palette } = this.context.muiTheme;

    return (
      <div>
        <List>
          <ListItem
            leftAvatar={
              <Avatar src={user.avatar} />
            }
            hoverColor="#fff"
            onTouchTap={this.handleTouchTap}
          >
            {user.nickname}
          </ListItem>
          <Popover
            open={this.state.openPopup}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
            style={{ width: '240px' }}
          >
            <img src={user.avatar} role="presentation" style={{ width: '100%' }} />
            <div style={{ padding: '15px' }}>
              <section>
                <span>{user.nickname}</span>
                <span
                  className={user.gender === 1 ? 'mdi mdi-gender-male' : 'mdi mdi-gender-female'}
                  style={{
                    marginLeft: '15px',
                    color: (user.gender === 1 ? palette.primary1Color : palette.accent1Color),
                  }}
                />
              </section>
              <section style={{ color: palette.secondaryTextColor, fontSize: '12px' }}>
                个人简介: {user.intro}
              </section>
            </div>
          </Popover>
        </List>
      </div>
    );
  }
}

ChatPanelHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ChatPanelHeader;
