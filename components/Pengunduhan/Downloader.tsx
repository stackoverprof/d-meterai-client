import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAccessControlList from '@core/hooks/useAccessControlList';
import { toast } from 'react-toastify';

type EnumStatus = 'initial' | 'cid' | 'fetching' | 'password' | 'decrypting' | 'downloading';

const Downloader = () => {
	const [status, setStatus] = useState<EnumStatus>('initial');
	const DigitalMeterai = useDigitalMeterai();

	const router = useRouter();
	const { isListed } = useAccessControlList(parseInt(_tokenId as string));

	const { tokenId: _tokenId } = router.query;

	const handleDownload = async () => {
		if (typeof _tokenId !== 'string') return;

		// Getting the CID from the token metadata
		const tokenId = parseInt(_tokenId);
		const tokenData = await DigitalMeterai.getToken(tokenId);
		const rootCID = tokenData.document;

		// Generating url and fetching the file
		const downloadLink = `https://${rootCID}.ipfs.w3s.link/document`;
		const encryptedBase64 = await axios.get(downloadLink).then((res) => res.data);

		// Getting the password from the token metadata
		const password = await DigitalMeterai.getPassword(tokenId);

		// Decrypting the file with the password
		const decryptedBase64 = CryptoJS.AES.decrypt(encryptedBase64, password).toString(
			CryptoJS.enc.Utf8
		);

		// Converting the file format back
		const response = await fetch(decryptedBase64);
		const asBlob = await response.blob();

		// Downloading the file
		const blobURL = URL.createObjectURL(asBlob);
		const date = new Date().toISOString();
		const a = document.createElement('a');
		a.setAttribute('download', `d-Meterai-document-${tokenId}-${date}.pdf`);
		a.setAttribute('href', blobURL);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div className="flex-sc col">
			<button
				className="px-4 h-11 text-xl font-bold rounded bg-theme-purple disabled:bg-opacity-50"
				onClick={handleDownload}
				disabled={!isListed || status !== 'initial'}
			>
				{{
					initial: 'Unduh dokumen',
					cid: 'Mendapatkan root CID...',
					filecid: 'Mendapatkan file CID...',
					fetching: 'Mendapatkan dokumen...',
					password: 'Mengontrol akses...',
					decrypting: 'Dekripsi dokumen...',
					downloading: 'Menyimpan ke perangkat...',
				}[status] || ''}
			</button>
			{!isListed && <p className="mt-4 text-sm text-red-400">Anda tidak memiliki akses</p>}
		</div>
	);
};

export default Downloader;

