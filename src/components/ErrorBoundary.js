import React from "react";
import InternalServerErrorPage from "../pages/errors/InternalServerErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state; 
    const { children } = this.props;

    if (hasError) {
      return <InternalServerErrorPage />;
    }

    return children;
  }
}

export default ErrorBoundary;
