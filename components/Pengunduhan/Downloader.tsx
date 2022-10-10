import React from 'react';
import CryptoJS from 'crypto-js';
import useIPFS from '@core/hooks/useIPFS';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import { useRouter } from 'next/router';
import axios from 'axios';

const Downloader = () => {
	const IPFS = useIPFS();
	const DigitalMeterai = useDigitalMeterai();

	const router = useRouter();
	const { tokenId } = router.query;

	const handleDownload = async () => {
		if (typeof tokenId !== 'string') return;
		const tokenData = await DigitalMeterai.getToken(0);
		const rootCID = tokenData.document;

		const res = await IPFS.get(rootCID); // Promise<Web3Response | null>
		console.log('res res', res);
		const files = await res.files();
		console.log('res files', files);
		const CID = files[0].cid;
		const downloadLink = `https://${CID}.ipfs.w3s.link`;
		const encryptedBase64 = await axios.get(downloadLink).then((res) => res.data);
		const decryptedBase64 = CryptoJS.AES.decrypt(encryptedBase64, 'password').toString(
			CryptoJS.enc.Utf8
		);
		const response = await fetch(decryptedBase64);
		const asBlob = await response.blob();

		const blobURL = URL.createObjectURL(asBlob);
		const a = document.createElement('a');
		a.setAttribute('download', 'decrypted.pdf');
		a.setAttribute('href', blobURL);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<button
			className="px-4 h-11 text-xl font-bold rounded bg-theme-purple"
			onClick={handleDownload}
		>
			download
		</button>
	);
};

export default Downloader;

