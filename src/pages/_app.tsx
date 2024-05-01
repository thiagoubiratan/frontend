import '../../styles/globals.scss'
import type { AppProps } from "next/app";
import { AuthProvider } from '../contexts/AuthContex'
import { ToastContainer, ToastContent } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}
