import React from 'react';
import { NextPage } from 'next';
import useContractOwnerOnly from '@core/hooks/useContractOwnerOnly';
import AdminLayout from '@components/_layouts/AdminLayout';
import MintFeature from '@components/Admin/MintFeature';
import useTokenSupply from '@core/hooks/useTokenSupply';

const Admin: NextPage = () => {
	useContractOwnerOnly();

	const { total, available } = useTokenSupply();

	return (
		<AdminLayout title="Home" className="flex-sc col">
			<div className="my-8">
				<p className="">{total}</p>
				<p className="">{available}</p>
			</div>
			<MintFeature />
		</AdminLayout>
	);
};

export default Admin;
