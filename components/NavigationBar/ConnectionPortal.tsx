import useWallet from '@core/hooks/useWallet';
import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { MdAccountBalanceWallet } from 'react-icons/md';

const ConnectionPortal = () => {
	const { isLoading, account, connectWallet, balance } = useWallet();

	if (!account)
		return (
			<div className="flex-cc gap-6">
				<p className="text-lg opacity-75">Untuk menggunakan aplikasi</p>
				<button
					className="px-4 py-2 h-11 text-lg font-semibold text-white rounded bg-theme-purple"
					onClick={connectWallet}
					disabled={isLoading}
				>
					{isLoading ? 'Membuka MetaMask...' : 'Hubungkan Wallet'}
				</button>
			</div>
		);
	else
		return (
			<div className="flex-cc gap-6">
				<div className="flex-cc gap-2">
					<MdAccountBalanceWallet size={24} />
					<p className="text-lg">{balance.toString().slice(0, 8)} ETH</p>
				</div>
				<div className="flex-cc gap-2 px-4 py-2 h-11 text-lg font-semibold text-white rounded bg-theme-purple">
					<HiCheckCircle className="mb-[2px] text-white" size={24} />
					{account.slice(0, 5)}...{account.slice(-4)}
				</div>
			</div>
		);
};

export default ConnectionPortal;

