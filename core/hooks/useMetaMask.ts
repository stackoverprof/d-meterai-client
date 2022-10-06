import { useState, useEffect } from 'react';

const useMetaMask = () => {
	// is installed wallet
	const [isInstalledWallet, setIsInstalledWallet] = useState<boolean>(false);
	// is connected wallet
	const [isConnected, setIsConnected] = useState<boolean>(false);
	// connected accounts
	const [account, setaccount] = useState<string | null>(null);
	// is connect process still running
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// check wallet is installed
	const checkIfWalletIsInstalled = async () => {
		let flag = true;
		if (!window.ethereum) {
			flag = false;
		}
		setIsInstalledWallet(flag);
		return flag;
	};

	// monitor accounts change
	const onChangeAccounts = async () => {
		if (!isInstalledWallet) {
			return false;
		}
		window.ethereum.on('accountsChanged', function (accounts) {
			if (accounts && accounts.length) {
				setaccount(accounts[0]);
				setIsConnected(true);
			} else {
				setaccount(null);
				setIsConnected(false);
			}
		});
	};

	// monitor chain change
	const onChangeChain = async () => {
		if (!isInstalledWallet) {
			return false;
		}
		window.ethereum.on('chainChanged', function (_chainId) {
			console.log('chainChanged:', parseInt(_chainId));
			window.location.reload();
		});
	};

	// check wallet is connected
	const checkIfWalletIsConnected = async () => {
		if (!isInstalledWallet) {
			return false;
		}
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (accounts && accounts.length) {
			setaccount(accounts[0]);
			setIsConnected(true);
		} else {
			setaccount(null);
			setIsConnected(false);
			console.log('No accounts found');
		}
	};

	// connect wallet
	const connectWallet = async () => {
		if (!isInstalledWallet) {
			return false;
		}
		setIsLoading(true);
		window.ethereum
			.request({
				method: 'eth_requestAccounts',
			})
			.then((accounts) => {
				if (accounts && accounts.length) {
					setaccount(accounts[0]);
					setIsConnected(true);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('Wallet connection error:', err);

				setIsLoading(false);
			});
	};

	useEffect(() => {
		checkIfWalletIsInstalled();
	}, []);

	useEffect(() => {
		checkIfWalletIsConnected();
		onChangeAccounts();
		onChangeChain();
	}, [isInstalledWallet]);

	return {
		isInstalledWallet,
		isConnected,
		isLoading,
		account,
		checkIfWalletIsInstalled,
		checkIfWalletIsConnected,
		connectWallet,
	};
};

export default useMetaMask;

