import useMetaMask from '@core/hooks/useMetaMask';
import useWeb3 from '@core/hooks/useWeb3';
import React from 'react';

const NavigationBar = () => {
	const { balance } = useWeb3();
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

