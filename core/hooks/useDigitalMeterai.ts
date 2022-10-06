import { Contract, ethers } from 'ethers';
import DigitalMeteraiABI from '@abi/DigitalMeterai.json';
import { useEffect, useState } from 'react';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const useDigitalMeterai = () => {
	const [contract, setContract] = useState<Contract | null>(null);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const DigitalMeterai: Contract = new ethers.Contract(
				CONTRACT_ADDRESS,
				DigitalMeteraiABI,
				signer
			);
			setContract(DigitalMeterai);
		}
	}, []);

	return contract;
};
export default useDigitalMeterai;

