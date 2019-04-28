import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';

export default class Index extends Component {
  render () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        hello world
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around'  }}>
        <Link to='/one'>
          <div>one</div>
        </Link>
        <Link to='/two'>
          <div>two</div>
        </Link>
        <Link to='/three'>
          <div>three</div>
        </Link>
      </div>
    </div>
  );
  }
}
