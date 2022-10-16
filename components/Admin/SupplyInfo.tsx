import useTokenSupply from '@core/hooks/useTokenSupply';
import React from 'react';

const SupplyInfo = () => {
	const { total, available, paid, bound } = useTokenSupply();

	return (
		<div className="flex-cc gap-8 my-8">
			<div className="flex-bs col py-4 w-52 h-32">
				<p className="text-2xl">Total beredar</p>
				<p className="text-5xl font-bold">{total}</p>
			</div>
			<div className="flex-bs col px-4 py-5 w-64 h-32 bg-opacity-50 rounded-lg bg-theme-green">
				<p className="text-2xl">Tersedia</p>
				<p className="text-5xl font-bold">{available}</p>
			</div>
			<div className="flex-bs col px-4 py-5 w-64 h-32 bg-opacity-50 rounded-lg bg-theme-yellow">
				<p className="text-2xl">Terbayarkan</p>
				<p className="text-5xl font-bold">{paid}</p>
			</div>
			<div className="flex-bs col px-4 py-5 w-64 h-32 bg-opacity-50 rounded-lg bg-theme-red">
				<p className="text-2xl">Tergunakan</p>
				<p className="text-5xl font-bold">{bound}</p>
			</div>
		</div>
	);
};

export default SupplyInfo;

