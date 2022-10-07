import compareAddresses from '@core/utils/compareAddresses';
import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useIsOwner = () => {
	const [isOwner, setIsOwner] = useState(false);

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			const owner = await DigitalMeterai.owner();

			if (compareAddresses(account, owner)) setIsOwner(true);
			else setIsOwner(false);
		})();
	}, [account, DigitalMeterai]);

	return isOwner;
};

export default useIsOwner;
