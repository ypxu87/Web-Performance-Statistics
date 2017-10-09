import React from 'react';
import { connect } from 'dva';
import Header from './components/header';
import { browserHistory } from 'dva/router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var self = this;
    const headerProps = {
      currentItem: this.props.app.currentItem,
      onTabClick(tabName) {
        self.props.dispatch({ type: 'app/changePage', payload: tabName });
        browserHistory.push('/' + tabName);
      },
    };
    return (
      <div>
        {this.props.app.currentItem === 'welcome' ? '' : <Header {...headerProps} />}
        {this.props.children}
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(App);
