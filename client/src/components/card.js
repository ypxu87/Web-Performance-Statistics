import React from 'react';
import { Card } from 'antd';

class PorductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card bordered title={this.props.webName} style={{ width: '90%', height: 60 }} >
        <span>asdasda</span>
      </Card>
    );
  }
}

export default PorductCard;
