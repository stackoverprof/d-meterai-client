import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useForm from '@core/hooks/useForm';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FormType {
	quantity: number;
	price: number;
}

const MintFeature = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { form, mutateForm, resetForm } = useForm<FormType>({
		quantity: 1,
		price: 10000,
	});

	const DigitalMeterai = useDigitalMeterai();

	const handleSubmit = async () => {
		setIsLoading(true);
		DigitalMeterai.mint(form.quantity, ethers.utils.parseEther(form.price.toString())).catch(
			(err) => {
				toast.error(err.errorName);
				setIsLoading(false);
			}
		);
	};

	const onSuccess = () => {
		setIsLoading(false);
		resetForm();
	};

	useEffect(() => {
		if (DigitalMeterai) {
			DigitalMeterai.on('DMT___Minted', onSuccess);
		}

		return () => {
			if (DigitalMeterai) DigitalMeterai.off('DMT___Minted', onSuccess);
		};
	}, [DigitalMeterai]);

	return (
		<div className="w-[1070px] flex-bc mt-20">
			<p className="text-2xl">Penerbitan d-Meterai</p>
			<div className="flex-cc gap-4">
				<div className="flex-cs col pb-6">
					<label htmlFor="quantity" className="capitalize">
						jumlah
					</label>
					<input
						type="text"
						name="quantity"
						value={form.quantity}
						onChange={mutateForm}
						className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
					/>
				</div>
				<div className="flex-cs col pb-6">
					<label htmlFor="price" className="capitalize">
						harga
					</label>
					<input
						type="text"
						name="price"
						value={form.price}
						onChange={mutateForm}
						className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
					/>
				</div>
				<button
					disabled={isLoading}
					onClick={handleSubmit}
					className="px-4 h-12 text-2xl rounded bg-theme-purple disabled:bg-opacity-50"
				>
					{isLoading ? 'Menerbitkan...' : 'Terbitkan'}
				</button>
			</div>
		</div>
	);
};

export default MintFeature;

