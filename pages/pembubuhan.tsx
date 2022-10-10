import Uploader from '@components/Pembubuhan/Uploader';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Pembubuhan: NextPage = () => {
	const router = useRouter();
	const { tokenId } = router.query;
	console.log('tokenId', tokenId);
	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="flex-cc my-12 w-full text-4xl font-bold">Pembubuhan d-Meterai</h1>
			<Uploader />
		</MainLayout>
	);
};

export default Pembubuhan;

