import React from 'react';
import {connect} from 'react-redux';

class List extends React.Component {
  render() {
    return (
      <div>
        list
      </div>
    )
  }
}

export default connect()(List)
