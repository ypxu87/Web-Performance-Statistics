import React from 'react';
import { connect } from 'dva';
import {} from 'antd';
import styles from './home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 'home',

    };
  }
  setActivityItem(item) {
    this.setState({ currentItem: item });
  }
  render() {
    return (
      <div className={styles.fullHeight}>
        <header className={styles.headerView}>
          <span className={styles.logo}>webux</span>
          <nav>
            <span className={this.state.currentItem === 'home' ? styles.headerActivity : ''} onClick={this.setActivityItem.bind(this, 'home')}>主页</span>
            <span className={this.state.currentItem === 'statistics' ? styles.headerActivity : ''} onClick={this.setActivityItem.bind(this, 'statistics')}>统计</span>
            <div className={styles.logout}>logout</div>
          </nav>
        </header>
      </div>
    );
  }
}

Home.propTypes = {
};

export default connect()(Home);
