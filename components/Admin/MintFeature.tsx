import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useForm from '@core/hooks/useForm';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

interface FormType {
	quantity: number;
	price: number;
}

const MintFeature = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { form, mutateForm, resetForm } = useForm<FormType>({
		quantity: 1,
		price: 0.0005,
	});

	const DigitalMeterai = useDigitalMeterai();

	const handleSubmit = async () => {
		setIsLoading(true);
		const txResponse = await DigitalMeterai.mint(
			form.quantity,
			ethers.utils.parseEther(form.price.toString())
		).catch(() => alert('Proses penerbitan gagal'));
		console.log('txResponse', txResponse.toString());
	};

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Minted', () => {
				setIsLoading(false);
				resetForm();
			});
		}
	}, [DigitalMeterai]);

	return (
		<div className="flex-cc gap-4">
			<p className="text-2xl">Penerbitan d-Meterai</p>
			<input
				type="text"
				name="quantity"
				value={form.quantity}
				onChange={mutateForm}
				className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
			/>
			<input
				type="text"
				name="price"
				value={form.price}
				onChange={mutateForm}
				className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
			/>
			<button
				disabled={isLoading}
				onClick={handleSubmit}
				className="px-4 h-12 text-2xl rounded bg-theme-purple disabled:bg-opacity-50"
			>
				{isLoading ? 'Menerbitkan...' : 'Terbitkan'}
			</button>
		</div>
	);
};

export default MintFeature;

