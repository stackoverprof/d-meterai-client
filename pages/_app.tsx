import React from 'react';
import Head from 'next/head';
import ProgressBar from '@components/_shared/ProgressBar';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import '@core/styles/global.tailwind.css';
import '@core/styles/typefaces.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<link rel="icon" href="/d-meterai-icon.svg" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<ProgressBar color="#009AFF" />

			<Component {...pageProps} />

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
