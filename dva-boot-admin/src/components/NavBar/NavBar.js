import React, { PureComponent } from 'react';
import Icon from '../Icon';
import { Popover, Badge, Avatar } from 'antd';
import { connect, router, routerRedux } from 'dva';
import cx from 'classnames';
import './style/index.less';
import logoImg from 'assets/images/logo.png';
import SearchBox from './SearchBox';
// import {routerRedux} from "dva/index";
import {login} from "../../routes/Login/service";
import $$ from "cmn-utils/lib/index";
const { Link } = router;


@connect()
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

  onOpenSearchBox = () => {
    this.setState({
      openSearchBox: true
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
      toggleSidebarHeader,
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
            <b>HHH</b>
            Admin
          </Link>
          <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
            <Icon type="lines" />
          </span>
        </div>


        <ul className="nav navbar-nav navbar-right clearfix">
          <li className="dropdown">
            <Popover
              placement="bottomRight"
              title={`用户设置`}
              overlayClassName={cx('navbar-popup', { [theme]: !!theme })}
              content={<UserDropDown { ...this.props} />}
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



const UserDropDown = props => {
  const signOut = ()=>{
      $$.removeStore('Token');
  };
  return (
      <ul className="dropdown-menu list-group dropdown-persist">
          <li className="list-group-item dropdown-footer">
              <Link to="/sign/login" onClick={signOut}>
                  <Icon type="poweroff" /> 退出
              </Link>
          </li>
      </ul>
  )
};

export default NavBar;
