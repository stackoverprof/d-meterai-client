import compareAddresses from '@core/utils/compareAddresses';
import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useOwnerOf = (tokenId: number) => {
	const [tokenOwner, setTokenOwner] = useState('');

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			const owner = await DigitalMeterai.ownerOf(tokenId);

			setTokenOwner(owner);
		})();
	}, [account, DigitalMeterai]);

	return { tokenOwner, isTokenOwner: compareAddresses(account, tokenOwner) };
};

export default useOwnerOf;

