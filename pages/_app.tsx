import React from 'react';
import Head from 'next/head';
import ProgressBar from '@components/_shared/ProgressBar';
import store from '@core/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import '@core/styles/global.tailwind.css';
import '@core/styles/typefaces.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<ProgressBar color="#009AFF" />

			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
			<ToastContainer position="bottom-right" autoClose={5000} pauseOnHover theme="dark" />
		</>
	);
};

export default App;

declare global {
	interface window {
		ethereum: any;
	}
}
