import React from 'react';
import { Link } from 'react-router-dom'
class Index extends React.Component {
  render() {
    return (
      <div>
        index
        <Link to='/list'>List</Link>
      </div>
    )
  }
}

export default Index
