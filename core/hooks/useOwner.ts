import compareAddresses from '@core/utils/compareAddresses';
import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useOwner = () => {
	const [owner, setOwner] = useState('');

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			const owner = await DigitalMeterai.owner();

			setOwner(owner);
		})();
	}, [account, DigitalMeterai]);

	return { owner, isOwner: compareAddresses(account, owner) };
};

export default useOwner;

