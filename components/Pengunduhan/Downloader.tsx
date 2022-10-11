import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import useIPFS from '@core/hooks/useIPFS';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAccessControlList from '@core/hooks/useAccessControlList';

type EnumStatus =
	| 'initial'
	| 'rootcid'
	| 'filecid'
	| 'fetching'
	| 'password'
	| 'decrypting'
	| 'downloading';

const Downloader = () => {
	const [status, setStatus] = useState<EnumStatus>('initial');
	const IPFS = useIPFS();
	const DigitalMeterai = useDigitalMeterai();

	const router = useRouter();
	const { tokenId: _tokenId } = router.query;

	const { isListed } = useAccessControlList(parseInt(_tokenId as string));

	const handleDownload = async () => {
		if (typeof _tokenId !== 'string') return;
		setStatus('rootcid');
		const tokenId = parseInt(_tokenId);
		const tokenData = await DigitalMeterai.getToken(tokenId);
		const rootCID = tokenData.document;
		console.log('rootCID', `https://${rootCID}.ipfs.w3s.link`);

		const info = await IPFS.status(rootCID);
		console.log('info', info);
		setStatus('filecid');
		const res = await IPFS.get(rootCID).catch((err) => {
			console.error('err getting file CID', err);
			setStatus('initial');
		});
		console.log('res', res);
		if (!res) return;
		const files = await res.files().catch((err) => {
			console.log('err getting file');
			console.log(err);

			setStatus('initial');
		});
		console.log('files', files);
		if (!files || files.length === 0) return;
		const CID = files[0].cid;
		console.log('fileCID', `https://${CID}.ipfs.w3s.link`);

		setStatus('fetching');
		const downloadLink = `https://${CID}.ipfs.w3s.link`;
		const encryptedBase64 = await axios.get(downloadLink).then((res) => res.data);
		setStatus('password');

		const password = await DigitalMeterai.getPassword(tokenId).catch((err) => {
			console.log('err', err);
		});

		setStatus('decrypting');
		const decryptedBase64 = CryptoJS.AES.decrypt(encryptedBase64, password).toString(
			CryptoJS.enc.Utf8
		);

		setStatus('downloading');
		const response = await fetch(decryptedBase64);
		const asBlob = await response.blob();

		const blobURL = URL.createObjectURL(asBlob);
		const a = document.createElement('a');
		a.setAttribute('download', `d-Meterai-document-${tokenId}.pdf`);
		a.setAttribute('href', blobURL);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setStatus('initial');
	};

	return (
		<div className="flex-sc col">
			<button
				className="px-4 h-11 text-xl font-bold rounded bg-theme-purple disabled:bg-opacity-50"
				onClick={handleDownload}
				disabled={!isListed || status !== 'initial'}
			>
				{{
					initial: 'Unduh dari IPFS',
					rootcid: 'Mendapatkan root CID...',
					filecid: 'Mendapatkan file CID...',
					fetching: 'Mengambil dokumen...',
					password: 'Mengakses password...',
					decrypting: 'Dekripsi dokumen...',
					downloading: 'Menyimpan ke perangkat...',
				}[status] || ''}
			</button>
			{!isListed && <p className="mt-4 text-sm text-red-400">Anda tidak memiliki akses</p>}
		</div>
	);
};

export default Downloader;

