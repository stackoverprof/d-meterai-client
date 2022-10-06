import { Web3ProviderContext, useMetaMask } from '@core/lib/ethers-react';

import React, { useContext, useEffect } from 'react';

const NavigationBar = () => {
	const { balance } = useContext(Web3ProviderContext);
	const { isLoading, account, connectWallet } = useMetaMask();

	return (
		<div>
			<p className="truncate whitespace-nowrap">
				{account
					? `
						Connected to 
						${account.slice(0, 8)}...${account.slice(-6)} 
						balance: ${balance}
					`
					: 'Please connect'}
			</p>
			{!account && (
				<button className="" onClick={connectWallet} disabled={isLoading}>
					{isLoading ? 'Opening MetaMask' : 'Connect'}
				</button>
			)}
		</div>
	);
};

export default NavigationBar;

