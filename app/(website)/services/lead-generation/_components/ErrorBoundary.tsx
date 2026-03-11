"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class LeadGenErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lead Gen Component Error:", error);
    console.error("Error Info:", errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === "production") {
      this.reportError(error, errorInfo);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    const errorReport = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: {
        componentStack: errorInfo.componentStack,
      },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.error("Error Report:", errorReport);
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[400px] flex items-center justify-center p-8"
        >
          <div className="max-width-lg mx-auto text-center">
            <div className="p-8 rounded-3xl glass-primary border border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-4 text-red-400">
                Something Went Wrong
              </h2>

              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                We encountered an unexpected error while loading this section.
                Don&apos;t worry - your data is safe and this won&apos;t affect
                other parts of the application.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-zinc-900/50 border border-zinc-700 rounded-lg text-left"
                >
                  <h3 className="text-sm font-medium text-red-400 mb-2">
                    Error Details:
                  </h3>
                  <pre className="text-xs text-zinc-300 overflow-auto max-h-32">
                    {this.state.error.message}
                  </pre>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-zinc-500 cursor-pointer">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-zinc-400 mt-1 overflow-auto max-h-24">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ScanningButton
                  color="amber"
                  onClick={this.handleRetry}
                  variant="secondary"
                  size="md"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </ScanningButton>

                <button
                  onClick={this.handleGoHome}
                  className="px-6 py-3 rounded-xl glass-primary hover:glass-secondary transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default LeadGenErrorBoundary;
