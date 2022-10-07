import compareAddresses from '@core/utils/compareAddresses';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useContractOwnerOnly = () => {
	const DigitalMeterai = useDigitalMeterai();
	const { account } = useWallet();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (!DigitalMeterai || !account) return;

			const owner = await DigitalMeterai.owner();
			if (!compareAddresses(account, owner)) router.push('/');
		})();
	}, [account, DigitalMeterai]);
};

export default useContractOwnerOnly;

