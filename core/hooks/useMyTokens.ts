import converterTokenData from '@core/utils/converterTokenData';
import { useState, useEffect } from 'react';
import useDigitalMeterai from './useDigitalMeterai';
import useWallet from './useWallet';

const useMyTokens = () => {
	const [myTokens, setMyTokens] = useState<any[] | null>(null);

	const { account } = useWallet();

	const DigitalMeterai = useDigitalMeterai();

	const update = () => {
		DigitalMeterai.getMyTokens().then((res) => {
			setMyTokens(res.map((token) => converterTokenData.toJSON(token)));
		});
	};

	useEffect(() => {
		if (DigitalMeterai) update();
	}, [DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai) {
			DigitalMeterai.on('DMT___Bought', update);
			DigitalMeterai.on('DMT___Bound', update);
		}
		return () => {
			if (DigitalMeterai) {
				DigitalMeterai.off('DMT___Bought', update);
				DigitalMeterai.off('DMT___Bound', update);
			}
		};
	}, [DigitalMeterai]);

	useEffect(() => {
		if (account) update();
	}, [account]);

	return {
		tokens: myTokens,
		tokensByStatus: {
			available: myTokens?.filter((token) => token.status === 0),
			paid: myTokens?.filter((token) => token.status === 1),
			bound: myTokens?.filter((token) => token.status === 2),
		},
	};
};

export default useMyTokens;

