import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import HeroSection from '@components/Home/HeroSection';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';

const Index: NextPage = () => {
	// inisiasi DigitalMeterai
	const DigitalMeterai = useDigitalMeterai();

	// Contoh penggunaan instance smart contract
	DigitalMeterai.getTotalSupply();
	DigitalMeterai.mint(24, 0.0005);
	DigitalMeterai.buy(1);
	DigitalMeterai.bind(1, 'document.pdf', '123456');
	DigitalMeterai.owner();

	return (
		<MainLayout title="Home" className="flex-sc col">
			<HeroSection />
		</MainLayout>
	);
};

export default Index;
