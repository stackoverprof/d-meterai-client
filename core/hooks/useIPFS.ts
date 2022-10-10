import { Web3Storage } from 'web3.storage';
const useIPFS = () => {
	const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN });
	return client;
};
export default useIPFS;

