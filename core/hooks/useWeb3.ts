import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import useMetaMask from './useMetaMask';

const useWeb3 = () => {
	const { account } = useMetaMask();
	const [balance, setBalance] = useState<string | number>(0);
	const [provider, setProvider] = useState<any>(null);

	// get provider
	const getProvider = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(provider);
	};

	// get balance
	const getBalance = async () => {
		const balance = await provider.getBalance(account);
		setBalance(ethers.utils.formatEther(balance));
	};

	useEffect(() => {
		getProvider();
	}, []);

	useEffect(() => {
		account && provider && getBalance();
	}, [account, provider]);

	return {
		balance,
		provider,
	};
};

export default useWeb3;

