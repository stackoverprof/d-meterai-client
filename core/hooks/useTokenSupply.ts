import { useState, useEffect } from 'react';
import useDigitalMeterai from './useDigitalMeterai';

const useTokenSupply = () => {
	const [totalSupply, setTotalSupply] = useState<number | null>(null);
	const [availableSupply, setAvailableSupply] = useState<number | null>(null);
	const [paidSupply, setPaidSupply] = useState<number | null>(null);
	const [boundSupply, setBoundSupply] = useState<number | null>(null);

	const DigitalMeterai = useDigitalMeterai();

	const updateTotalSupply = () => {
		DigitalMeterai.getTotalSupply().then((res) => {
			setTotalSupply(parseInt(res.toString()));
		});

		DigitalMeterai.getTotalSupplyByStatus(0)
			.then((res) => {
				setAvailableSupply(parseInt(res.toString()));
			})
			.catch((err) => console.error('forbidden', err));
		DigitalMeterai.getTotalSupplyByStatus(1)
			.then((res) => {
				setPaidSupply(parseInt(res.toString()));
			})
			.catch((err) => console.error('forbidden', err));
		DigitalMeterai.getTotalSupplyByStatus(2)
			.then((res) => {
				setBoundSupply(parseInt(res.toString()));
			})
			.catch((err) => console.error('forbidden', err));
	};

	useEffect(() => {
		if (DigitalMeterai) updateTotalSupply();
	}, [DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Minted', updateTotalSupply);
		}
	}, [DigitalMeterai]);

	return {
		total: totalSupply,
		available: availableSupply,
		paid: paidSupply,
		bound: boundSupply,
	};
};

export default useTokenSupply;

