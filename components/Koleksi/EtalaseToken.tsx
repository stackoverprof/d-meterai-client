import useMyTokens from '@core/hooks/useMyTokens';
import React from 'react';
import CardBuy from './CardBuy';
import CardToken from './CardToken';

const EtalaseToken = () => {
	const { tokens } = useMyTokens();

	return (
		<div className="container grid grid-cols-5">
			{tokens?.map((token, i) => (
				<CardToken data={token} key={i} />
			))}
			<CardBuy />
		</div>
	);
};

export default EtalaseToken;

