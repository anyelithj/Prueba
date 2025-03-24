// import { store } from "@/store/store";
// import { AppProps } from "next/app";
// import { Provider } from "react-redux";
// import '../styles/globals.css';


// function MyApp({ Component, pageProps }: AppProps) {
//   <Provider store={store}>
//      <Component {...pageProps}/>
//   </Provider>
// }

// export default MyApp;
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;