import EtalaseToken from '@components/Koleksi/EtalaseToken';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';

const Koleksi: NextPage = () => {
	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="flex-cc my-12 w-full text-4xl font-bold">Koleksi d-Meterai</h1>
			<EtalaseToken />
		</MainLayout>
	);
};

export default Koleksi;

