import useIsOwner from '@core/hooks/useIsOwner';
import useWallet from '@core/hooks/useWallet';
import React from 'react';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { RiShieldFlashFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';

const ConnectionPortal = () => {
	const { isLoading, account, connectWallet, balance } = useWallet();
	const isOwner = useIsOwner();
	if (account)
		return (
			<div className="flex-cc gap-6">
				<div className="flex-cc gap-2">
					<MdAccountBalanceWallet size={24} />
					<p className="text-lg">{balance.toString().slice(0, 8)} ETH</p>
				</div>
				<div className="flex-cc gap-2 px-4 py-2 h-11 text-lg font-semibold text-white rounded bg-theme-purple">
					{isOwner ? (
						<RiShieldFlashFill className="mb-[2px] text-white" size={24} />
					) : (
						<FaUserAlt className="mb-[2px] text-white" size={19} />
					)}
					{account.slice(0, 5)}...{account.slice(-4)}
				</div>
			</div>
		);
	else
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
};

export default ConnectionPortal;

