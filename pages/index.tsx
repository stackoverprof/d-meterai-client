import React, { useEffect } from 'react';

import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import HeroSection from '@components/Home/HeroSection';

const Index: NextPage = () => {
	const DigitalMeterai = useDigitalMeterai();

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Minted', (minter, quantity, price) => {
				console.log('DMT___Minted', minter, quantity, price);
			});
		}
	}, [DigitalMeterai]);

	return (
		<MainLayout title="Home" className="flex-sc col">
			<HeroSection />
		</MainLayout>
	);
};

// Above are sample use of

// MainLayout: open 'components/_layouts/', that is the place where you put navbar and footer, not here
// Link: custom link that can be styled into anything and is so comfortable

export default Index;
