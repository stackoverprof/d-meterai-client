import React, { useEffect, useState } from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import useContractOwnerOnly from '@core/hooks/useContractOwnerOnly';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';

const Admin: NextPage = () => {
	useContractOwnerOnly();

	const [totalSupply, setTotalSupply] = useState<number | null>(null);

	const DigitalMeterai = useDigitalMeterai();

	useEffect(() => {
		if (DigitalMeterai) {
			DigitalMeterai.getTotalSupply().then((res) => {
				setTotalSupply(parseInt(res.toString()));
			});
		}
	}, [DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Minted', (minter, quantity, price) => {
				DigitalMeterai.getTotalSupply().then((res) => {
					setTotalSupply(parseInt(res.toString()));
				});
			});
		}
	}, [DigitalMeterai]);

	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="mb-4 text-4xl font-bold">Admin</h1>
			<h1 className="mb-4 text-4xl font-bold">{totalSupply}</h1>
		</MainLayout>
	);
};

export default Admin;
