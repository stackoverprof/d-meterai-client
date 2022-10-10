import MainLayout from '@components/_layouts/MainLayout';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import { NextPage } from 'next';
import React from 'react';

const Pembelian: NextPage = () => {
	const DigitalMeterai = useDigitalMeterai();

	const handleBuy = async () => {
		const targetToken = await DigitalMeterai.getAvailableToken();
		const price = targetToken.price;
		DigitalMeterai.buy(targetToken.tokenId, {
			value: price,
		});
	};

	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="flex-cc my-12 w-full text-4xl font-bold">Koleksi d-Meterai</h1>
			<button onClick={handleBuy}>Beli</button>
		</MainLayout>
	);
};

export default Pembelian;

