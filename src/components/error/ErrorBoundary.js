import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>something went wrong</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
