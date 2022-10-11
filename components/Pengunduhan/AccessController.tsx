import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useAccessControlList from '@core/hooks/useAccessControlList';
import useForm from '@core/hooks/useForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import useOwner from '@core/hooks/useOwner';
import useOwnerOf from '@core/hooks/useOwnerOf';

const AccessController = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { form, mutateForm } = useForm({
		address: '',
	});

	const router = useRouter();
	const { tokenId: _tokenId } = router.query;
	const DigitalMeterai = useDigitalMeterai();
	const { list } = useAccessControlList(parseInt(_tokenId as string));

	const { isOwner } = useOwner();
	const { isTokenOwner } = useOwnerOf(parseInt(_tokenId as string));

	const handleGrantAccess = () => {
		if (typeof _tokenId !== 'string') return;
		setIsLoading(true);

		const tokenId = parseInt(_tokenId);
		DigitalMeterai.addAccessControl(tokenId, form.address).catch((err) => {
			console.error('Gagal memberikan akses', err);
			setIsLoading(false);
		});
	};

	const onSuccess = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___AccessControlAdded', onSuccess);
		}
	}, [DigitalMeterai]);

	return (
		<div className="flex-sc col">
			<div className="flex-sc col">
				<p className="flex-cc mt-12 mb-4 w-full text-2xl font-bold">
					Berikan akses ke orang lain
				</p>
				<div className="flex-cc gap-4">
					<input
						type="text"
						value={form.address}
						onChange={mutateForm}
						name="address"
						placeholder="Masukan address"
						className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
					/>
					<button
						className="px-4 h-12 text-xl font-bold rounded bg-theme-purple disabled:bg-opacity-50"
						disabled={isLoading}
						onClick={handleGrantAccess}
					>
						{isLoading ? 'Menambahkan...' : 'Berikan Akses'}
					</button>
				</div>
			</div>
			<div className="flex-sc col mt-12">
				<p className="flex-cc mb-4 w-full text-2xl font-bold">Daftar akses</p>
				<div className="flex-sc col w-64">
					{list.map((address, i) => (
						<div className="flex-bc mb-4 w-full" key={i}>
							<p className="flex-sc w-full text-xl" key={i}>
								{address.slice(0, 10)}...{address.slice(-6)}
							</p>
							{!isOwner && !isTokenOwner && (
								<RiDeleteBack2Fill size={20} className="text-red-400" />
							)}{' '}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AccessController;

