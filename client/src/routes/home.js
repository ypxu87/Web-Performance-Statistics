import React from 'react';
import { connect } from 'dva';
import {} from 'antd';
import styles from './home.css';
import Header from '../components/header';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.fullHeight}>

      </div>
    );
  }
}

Home.propTypes = {
};

function mapStateToProps({ app }) {
  return { app };
}
export default connect(mapStateToProps)(Home);
