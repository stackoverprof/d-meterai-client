import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useWeb3 from './useWeb3';

const useWallet = () => {
	// is installed wallet
	const [isInstalledWallet, setIsInstalledWallet] = useState<boolean>(false);
	// is connected wallet
	const [isConnected, setIsConnected] = useState<boolean>(false);
	// connected accounts
	const [account, setAccount] = useState<string | null>(null);
	// balance
	const [balance, setBalance] = useState<string | number>(0);

	// is connect process still running
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

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
				setAccount(accounts[0]);
				setIsConnected(true);
			} else {
				setAccount(null);
				setIsConnected(false);
				router.push('/');
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
			setAccount(accounts[0]);
			setIsConnected(true);
		} else {
			setAccount(null);
			setIsConnected(false);
			router.push('/');
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
					setAccount(accounts[0]);
					setIsConnected(true);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('Wallet connection error:', err);

				setIsLoading(false);
			});
	};

	// get balance
	const getBalance = async () => {
		const balance = await provider.getBalance(account);
		setBalance(ethers.utils.formatEther(balance));
	};

	const { provider } = useWeb3();

	useEffect(() => {
		account && getBalance();
	}, [account, provider]);

	useEffect(() => {
		if (typeof provider !== 'undefined' && account) {
			(async () => {
				await provider.on('block', () => {
					provider.getBalance(account).then((value) => {
						setBalance(ethers.utils.formatEther(value));
					});
				});
			})();
		}
	}, [provider, account]);

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
		balance,
		checkIfWalletIsInstalled,
		checkIfWalletIsConnected,
		connectWallet,
	};
};

export default useWallet;

