import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CardBuy = () => {
	const [isLoading, setIsLoading] = useState(false);

	const DigitalMeterai = useDigitalMeterai();

	const handleBuy = async () => {
		setIsLoading(true);
		const targetToken = await DigitalMeterai.getAvailableToken().catch((err) => {
			toast.error(err.errorName);
			setIsLoading(false);
		});
		if (!targetToken) return;
		const price = targetToken.price;
		DigitalMeterai.buy(targetToken.tokenId, {
			value: price,
		}).catch((err) => {
			toast.error(err.errorName);
			setIsLoading(false);
		});
	};

	const onSuccess = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Bought', onSuccess);
			DigitalMeterai.on('DMT___Bound', onSuccess);
		}
	}, [DigitalMeterai]);

	return (
		<button
			onClick={handleBuy}
			disabled={isLoading}
			className="flex-cc col m-4 w-56 h-96 rounded border-2 border-theme-purple"
		>
			{isLoading ? (
				<>
					<p className="">Pembelian diproses...</p>
				</>
			) : (
				<>
					<FiPlus size={60} className="mb-4" />
					<p className="">Beli d-Meterai</p>
				</>
			)}
		</button>
	);
};

export default CardBuy;

