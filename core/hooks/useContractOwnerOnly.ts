import compareAddresses from '@core/utils/compareAddresses';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useOwner from './useOwner';
import useWallet from './useWallet';

const useContractOwnerOnly = () => {
	const { owner } = useOwner();
	const { account } = useWallet();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (!owner || !account) return;
			if (!compareAddresses(account, owner)) router.push('/');
		})();
	}, [account, owner]);
};

export default useContractOwnerOnly;

