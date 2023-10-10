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
      return  <div className="not-found-page">
      <h1 className='error_header'> 500 | Internal Server Error</h1>
      <p className='error_footer'>Oops! Something went wrong.</p>    
    </div>
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
