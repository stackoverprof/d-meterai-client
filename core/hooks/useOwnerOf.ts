import compareAddresses from '@core/utils/compareAddresses';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useOwnerOf = (tokenId: number) => {
	const [tokenOwner, setTokenOwner] = useState('');

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			const owner = await DigitalMeterai.ownerOf(tokenId).catch(() => {
				router.push('/');
			});

			setTokenOwner(owner);
		})();
	}, [account, DigitalMeterai]);

	return { tokenOwner, isTokenOwner: compareAddresses(account, tokenOwner) };
};

export default useOwnerOf;

