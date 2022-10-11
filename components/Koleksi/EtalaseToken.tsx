import useMyTokens from '@core/hooks/useMyTokens';
import React from 'react';
import CardBuy from './CardBuy';
import CardToken from './CardToken';

const EtalaseToken = () => {
	const { tokensByStatus } = useMyTokens();

	return (
		<div className="flex-sc col w-full">
			<div className="flex-sc col">
				<div className="container grid grid-cols-5">
					{tokensByStatus.paid?.map((token, i) => (
						<CardToken data={token} key={i} />
					))}
					<CardBuy />
				</div>
			</div>
			<div className="flex-sc col">
				<h1 className="flex-cc my-12 w-full text-xl font-bold">Sudah terpakai</h1>
				<div className="container grid grid-cols-5">
					{tokensByStatus.bound?.map((token, i) => (
						<CardToken data={token} key={i} />
					))}
					<CardBuy />
				</div>
			</div>
		</div>
	);
};

export default EtalaseToken;

