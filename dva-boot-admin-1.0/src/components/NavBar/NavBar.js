import React, { PureComponent } from 'react';
import Icon from '../Icon';
import { Popover, Badge, Avatar } from 'antd';
import { router } from 'dva';
import cx from 'classnames';
import './style/index.less';
import logoImg from 'assets/images/logo.png';
import SearchBox from './SearchBox';
const { Link } = router;

/**
 * 其本本局头部区域
 */
class NavBar extends PureComponent {
  state = {
    openSearchBox: false
  };

  static defaultProps = {
    fixed: true,
    theme: '' //'bg-dark',
  };

  toggleFullScreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  onCloseSearchBox = () => {
    this.setState({
      openSearchBox: false
    });
  };

  render() {
    const { openSearchBox } = this.state;
    const {
      fixed,
      theme,
      onCollapseLeftSide,
      collapsed,
      onExpandTopBar,
      user,
      isMobile
    } = this.props;

    const classnames = cx('navbar', {
      'navbar-fixed-top': !!fixed,
      'navbar-sm': isMobile ? true : collapsed,
      ['bg-' + theme]: !!theme
    });

    return (
      <header className={classnames}>
        <div className="navbar-branding">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="logo" />
            <b>MuRata</b>
          </Link>
          <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
            <Icon type="lines" />
          </span>
        </div>
        <ul className="nav navbar-nav navbar-left clearfix" style={{display: 'none'}}>
          <li>
            <a onClick={onExpandTopBar}>
              <Icon type="wand" />
            </a>
          </li>

        </ul>
        <ul className="nav navbar-nav navbar-right clearfix">
          <li className="dropdown">
            <Popover
              placement="bottomRight"
              title={`WELCOME ${user.userName}`}
              overlayClassName={cx('navbar-popup', { [theme]: !!theme })}
              content={<UserDropDown />}
              trigger="click"
            >
              <a className="dropdown-toggle">
                <Badge dot>
                  <Avatar src={require('assets/images/avatar.jpg')}>
                    {user.userName}
                  </Avatar>
                </Badge>
              </a>
            </Popover>
          </li>
        </ul>
        <SearchBox visible={openSearchBox} onClose={this.onCloseSearchBox} />
      </header>
    );
  }
}

const UserDropDown = props => (
  <ul className="dropdown-menu list-group dropdown-persist">
    <li className="list-group-item dropdown-footer">
      <Link to="/sign/login">
        <Icon type="poweroff" /> 退出
      </Link>
    </li>
  </ul>
);

export default NavBar;
