import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useForm from '@core/hooks/useForm';
import React, { useState } from 'react';

const OwnershipManagement = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { form, mutateForm } = useForm({
		address: '',
	});

	const DigitalMeterai = useDigitalMeterai();

	const handleTransferOwnership = () => {
		DigitalMeterai.transferOwnership(form.address).catch((err) => {
			console.error('Gagal mentransfer kepemilikan', err);
			setIsLoading(false);
		});
	};

	return (
		<div className="flex-sc col">
			<div className="flex-sc col">
				<p className="flex-cc mt-12 mb-4 w-full text-2xl font-bold">Transfer kepemilikan</p>
				<div className="flex-cc gap-4">
					<input
						type="text"
						value={form.address}
						onChange={mutateForm}
						name="address"
						placeholder="Masukan address"
						className="px-2 py-1 h-12 text-xl rounded border bg-base border-theme-purple"
					/>
					<button
						className="px-4 h-12 text-xl font-bold rounded bg-theme-purple disabled:bg-opacity-50"
						disabled={isLoading}
						onClick={handleTransferOwnership}
					>
						{isLoading ? 'Memindahkan...' : 'Berikan kepemilikan'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default OwnershipManagement;

