import Downloader from '@components/Pengunduhan/Downloader';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Pengunduhan: NextPage = () => {
	const router = useRouter();
	const { tokenId } = router.query;
	console.log('tokenId', tokenId);
	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="flex-cc my-12 w-full text-4xl font-bold">Pengunduhan d-Meterai</h1>
			<Downloader />
		</MainLayout>
	);
};

export default Pengunduhan;

