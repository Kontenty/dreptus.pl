"use client";

import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  section: "map" | "filter" | "list";
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class TripsErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(`Error in ${this.props.section} section:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const sectionNames: Record<string, string> = {
        map: "Map",
        filter: "Filter",
        list: "Trip List",
      };

      return (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-md flex items-center justify-center">
          <p className="text-red-700 text-sm">
            Failed to load {sectionNames[this.props.section]}. Please refresh
            the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
