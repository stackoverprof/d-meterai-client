import AccessController from '@components/Pengunduhan/AccessController';
import Downloader from '@components/Pengunduhan/Downloader';
import MainLayout from '@components/_layouts/MainLayout';
import useOwner from '@core/hooks/useOwner';
import useOwnerOf from '@core/hooks/useOwnerOf';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Pengunduhan: NextPage = () => {
	const router = useRouter();
	const { tokenId } = router.query;

	const { isOwner } = useOwner();
	const { isTokenOwner } = useOwnerOf(parseInt(tokenId as string));

	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="flex-cc mt-12 mb-4 w-full text-4xl font-bold">Unduh dokumen</h1>
			<p className="mb-12 text-xl">hasil pembubuhan d-Meterai #{tokenId}</p>
			<Downloader />
			{(isOwner || isTokenOwner) && <AccessController />}
		</MainLayout>
	);
};

export default Pengunduhan;

