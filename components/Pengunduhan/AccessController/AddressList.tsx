import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useOwner from '@core/hooks/useOwner';
import useOwnerOf from '@core/hooks/useOwnerOf';
import compareAddresses from '@core/utils/compareAddresses';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const AddressList = ({ address }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { tokenId: _tokenId } = router.query;

	const { owner } = useOwner();
	const { tokenOwner } = useOwnerOf(parseInt(_tokenId as string));
	const isRemovable = !compareAddresses(owner, address) && !compareAddresses(tokenOwner, address);

	const DigitalMeterai = useDigitalMeterai();
	const handleRemoveAccess = () => {
		if (typeof _tokenId !== 'string') return;
		setIsLoading(true);

		const tokenId = parseInt(_tokenId);
		DigitalMeterai.removeAccessControl(tokenId, address).catch((err) => {
			console.error('Gagal menghapus akses', err);
			setIsLoading(false);
		});
	};

	return (
		<div className={['flex-bc mb-4 w-full', isLoading && 'opacity-20'].join(' ')}>
			<p className="flex-sc w-full text-xl">
				{address.slice(0, 10)}...{address.slice(-6)}
			</p>
			{isRemovable && !isLoading && (
				<RiDeleteBack2Fill
					size={20}
					className="text-red-400"
					onClick={handleRemoveAccess}
				/>
			)}
			{!isRemovable && compareAddresses(owner, address) && (
				<p className="ml-4">(Pemerintah)</p>
			)}
			{!isRemovable && compareAddresses(tokenOwner, address) && (
				<p className="ml-4">(Pemilik)</p>
			)}
		</div>
	);
};

export default AddressList;

