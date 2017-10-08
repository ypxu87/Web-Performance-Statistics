import React from 'react';
import { connect } from 'dva';
import {} from 'antd';
import styles from './welcome.css';

function Welcome() {
  return (
    <div className={styles.fullHeight}>
      <section className={styles.top}>
        <div className={styles.loginBtn}>
          login
        </div>
        <div className={styles.heading}>
          <div className={styles.logo}>webux</div>
          <div className={styles.explain}>一个统计web性能参数的工具,旨在帮助技术人员优化用户体验</div>
        </div>
      </section>
      <section>
        <div className={styles.content} />
      </section>
    </div>
  );
}

Welcome.propTypes = {
};

export default connect()(Welcome);
