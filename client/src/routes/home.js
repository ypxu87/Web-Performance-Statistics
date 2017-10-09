import React from 'react';
import { connect } from 'dva';
import {} from 'antd';
import styles from './home.css';
import Header from '../components/header';

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
    const headerProps = { currentItem: this.props.app.currentItem };
    return (
      <div className={styles.fullHeight}>
        <Header {...headerProps} />
      </div>
    );
  }
}

Home.propTypes = {
};

export default connect()(Home);
