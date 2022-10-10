import { ethers } from 'ethers';

const converterTokenData = {
	toJSON: (input) => {
		const data = {
			tokenId: input[0].toString(),
			owner: input[1],
			document: input[2],
			status: input[3],
			price: ethers.utils.formatEther(input[4].toString()),
		};
		return data;
	},
};

export default converterTokenData;

