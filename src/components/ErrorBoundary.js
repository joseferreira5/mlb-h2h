import React from 'react';

import Message from './styles/Message';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Surface runtime errors in dev without crashing the full app shell.
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error);
  }

  handleReload = () => {
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <Message>
          Something went wrong while rendering this screen.{' '}
          <button type="button" onClick={this.handleReload}>
            Go back home
          </button>
        </Message>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
