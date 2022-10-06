import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import useContractOwnerOnly from '@core/hooks/useContractOwnerOnly';

const Admin: NextPage = () => {
	useContractOwnerOnly();

	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="mb-4 text-4xl font-bold">Admin</h1>
		</MainLayout>
	);
};

export default Admin;
