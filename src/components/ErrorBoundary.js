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
    if (this.state.hasError) {
      return <InternalServerErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;