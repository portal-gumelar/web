import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white rounded-3xl shadow-xl p-10 border border-red-100">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-black text-gray-800 mb-4">Ups! Terjadi Kesalahan</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Mohon maaf, sepertinya ada sedikit kendala teknis. Silakan coba muat ulang halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
            >
              Muat Ulang Halaman
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
