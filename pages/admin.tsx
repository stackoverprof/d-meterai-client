import React from 'react';
import { NextPage } from 'next';
import useContractOwnerOnly from '@core/hooks/useContractOwnerOnly';
import AdminLayout from '@components/_layouts/AdminLayout';
import MintFeature from '@components/Admin/MintFeature';
import SupplyInfo from '@components/Admin/SupplyInfo';

const Admin: NextPage = () => {
	useContractOwnerOnly();

	return (
		<AdminLayout title="Home" className="flex-sc col">
			<SupplyInfo />
			<MintFeature />
		</AdminLayout>
	);
};

export default Admin;
