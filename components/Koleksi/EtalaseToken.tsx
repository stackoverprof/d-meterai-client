import useMyTokens from '@core/hooks/useMyTokens';
import React from 'react';
import CardBuy from './CardBuy';
import CardToken from './CardToken';

const EtalaseToken = () => {
	const { tokensByStatus } = useMyTokens();

	return (
		<div className="flex-sc col w-full">
			<div className="flex-sc col mb-24">
				<div className="container grid grid-cols-5">
					{tokensByStatus.paid?.map((token, i) => (
						<CardToken data={token} key={i} />
					))}
					<CardBuy />
				</div>
			</div>
			{tokensByStatus.bound?.length > 0 && (
				<div className="flex-sc col mb-24">
					<div className="container flex-sc">
						<h2 className="relative top-1 px-4 mb-3 text-2xl bg-base">
							d-Meterai terpakai
						</h2>
					</div>
					<div className="container grid grid-cols-5">
						{tokensByStatus.bound?.map((token, i) => (
							<CardToken data={token} key={i} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default EtalaseToken;

