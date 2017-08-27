import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class Index extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { dispatch, count } = this.props;
    dispatch({
      type: "INCREMENT_ASYNC",
      payload: { count: count + 1 }
    });
  };

  render() {
    const { count } = this.props;
    return (
      <div style={{ padding: 20 }}>
        <button onClick={this.handleClick}>点击</button>
        <div>
          {count}
        </div>
        <Link to="/list">To List</Link>
      </div>
    );
  }
}

export default connect(state => {
  return {
    count: state.count
  };
})(Index);
