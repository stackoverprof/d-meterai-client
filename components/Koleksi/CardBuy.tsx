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
			className="relative flex-cc m-4 w-56 h-96 bg-opacity-0 rounded border-2 group hover:bg-opacity-20 bg-theme-purple border-theme-purple"
		>
			<div className="relative flex-bc col z-10 p-4 m-4 full">
				<div className="flex-sc col">
					<div className="flex-cc col mb-2 w-48 h-48 bg-white bg-opacity-0 border-2 border-dashed border-theme-purple group-hover:bg-opacity-20">
						{isLoading ? (
							<>
								<p className="w-40 text-xl">Pembelian diproses...</p>
							</>
						) : (
							<>
								<FiPlus size={60} className="mb-4" />
								<p className="w-40 text-xl">Beli Meterai</p>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="absolute flex-ee overflow-hidden top-0 z-0 opacity-25 full">
				<img src="/img/garuda.svg" alt="" className="relative -right-12 -bottom-12 h-1/2" />
			</div>
		</button>
	);
};

export default CardBuy;

