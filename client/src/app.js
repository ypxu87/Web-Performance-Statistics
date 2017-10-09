import React from 'react';
import { connect } from 'dva';
import Header from './components/header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(App);
