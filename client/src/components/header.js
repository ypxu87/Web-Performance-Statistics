import React from 'react';
import styles from './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  setActivityItem(item) {
    this.props.dispatch({
      type: 'app/changePage',
      payload: item,
    });
  }
  render() {
    return (
      <header className={styles.headerView}>
        <span className={styles.logo}>webux</span>
        <nav>
          <span className={this.props.currentItem === 'home' ? styles.headerActivity : ''} onClick={this.setActivityItem.bind(this, 'home')}>主页</span>
          <span className={this.props.currentItem === 'statistics' ? styles.headerActivity : ''} onClick={this.setActivityItem.bind(this, 'statistics')}>统计</span>
          <div className={styles.logout}>logout</div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
};

export default Header;
