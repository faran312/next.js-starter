import React from 'react';
import '../styles/fetchData.scss';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <h1>
        Hello, now you're using {this.props.userAgent}
      </h1>
    )
  }
}