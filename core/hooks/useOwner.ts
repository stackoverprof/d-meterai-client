import compareAddresses from '@core/utils/compareAddresses';
import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useOwner = () => {
	const [owner, setOwner] = useState('');

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	const update = () => {
		DigitalMeterai.owner().then((owner) => {
			setOwner(owner);
		});
	};

	const ownershipChanged = (_, current) => {
		if (current === owner) return;
		DigitalMeterai.owner().then((owner) => {
			setOwner(owner);
		});
	};

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			update();
		})();
	}, [account, DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai && owner) {
			DigitalMeterai.on('OwnershipTransferred', ownershipChanged);
		}
		return () => {
			if (DigitalMeterai && owner)
				DigitalMeterai.off('OwnershipTransferred', ownershipChanged);
		};
	}, [DigitalMeterai, owner]);

	return { owner, isOwner: compareAddresses(account, owner) };
};

export default useOwner;

