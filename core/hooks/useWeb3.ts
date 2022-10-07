import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useWeb3 = () => {
	const [provider, setProvider] = useState<any>(null);

	// get provider
	const getProvider = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(provider);
	};

	useEffect(() => {
		getProvider();
	}, []);

	return {
		provider,
	};
};

export default useWeb3;

