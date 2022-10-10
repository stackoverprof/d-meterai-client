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
			console.log('res', res);
			setMyTokens(res.map((token) => converterTokenData.toJSON(token)));
		});
	};

	useEffect(() => {
		if (DigitalMeterai) update();
	}, [DigitalMeterai]);

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Bought', update);
			DigitalMeterai.on('DMT___Bound', update);
		}
	}, [DigitalMeterai]);

	useEffect(() => {
		if (account) update();
	}, [account]);

	return {
		tokens: myTokens,
	};
};

export default useMyTokens;

