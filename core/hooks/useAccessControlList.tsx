import { useEffect, useState } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useAccessControlList = (tokenId: number) => {
	const [list, setList] = useState([]);

	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;
			DigitalMeterai.getAccessControl(tokenId)
				.then((res) => {
					setList(res);
				})
				.catch((err) => {
					console.error('forbidden', err);
				});
		})();
	}, [account, DigitalMeterai]);

	return {
		list,
		isListed: account
			? list.map((address) => address.toLowerCase()).includes(account.toLowerCase())
			: false,
	};
};

export default useAccessControlList;

