// FILE: src/Components/Shared/ErrorBoundary.jsx
import { Component } from "react";
import ServerError from "../../pages/errors/ServerError";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) return <ServerError />;
    return this.props.children;
  }
}
