import React, { Component } from 'react';
import { Link } from 'dva/router';

export default class One extends Component {
  render () {
    console.log('hello')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      One page
    </div>
  );
  }
}
