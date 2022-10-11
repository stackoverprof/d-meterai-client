import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useAccessControlList = (tokenId: number) => {
	const [list, setList] = useState([]);

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	const update = () => {
		DigitalMeterai.getAccessControl(tokenId)
			.then((res) => {
				setList(res);
			})
			.catch((err) => {
				console.error('forbidden', err);
			});
	};

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			update();
		})();
	}, [account, DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai) {
			DigitalMeterai.on('DMT___AccessControlChanged', update);
		}
		return () => {
			if (DigitalMeterai) DigitalMeterai.off('DMT___AccessControlChanged', update);
		};
	}, [DigitalMeterai]);

	return {
		list,
		isListed: account
			? list.map((address) => address.toLowerCase()).includes(account.toLowerCase())
			: false,
	};
};

export default useAccessControlList;

