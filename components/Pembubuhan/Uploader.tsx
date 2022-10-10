import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import qr from 'qr-image';
import { useRouter } from 'next/router';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN });

const Uploader = () => {
	const [fileUrl, setFileUrl] = useState('');
	const [file, setFile] = useState<any[]>(null);

	const router = useRouter();
	const { tokenId } = router.query;

	const generateQR = () => {
		const verificationURL = `${window.location.origin}/verify?tokenId=${tokenId}`;
		const buffer = qr.imageSync(verificationURL, { type: 'png' });
		const blob = new Blob([buffer], { type: 'image/png' });
		const blobFile = new File([blob], 'qr-stamp.png');
		return blobFile;
	};

	const handleUpload = async () => {
		const qrStamp = generateQR();
		if (!file || !file.length) return;
		const rootCid = await client.put([...file, qrStamp]);
		setFileUrl(`https://${rootCid}.ipfs.w3s.link`);
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	// console.log('file', file);
	// const router = useRouter();
	// const { tokenId } = router.query;

	// const handleQR = async () => {
	// 	console.log('blob', blob);
	// 	setFile((prev) => [...prev, blobFile]);
	// 	document.getElementById('my-img').src = URL.createObjectURL(blob);
	// };

	// console.log('file', file);

	return (
		<div className="flex-sc col">
			<div className="w-[800px] mb-8 h-48 flex-cc rounded border-2 relative border-theme-purple">
				<input type="file" id="file" className="opacity-0" onChange={handleFileChange} />
				<label
					htmlFor="file"
					className="absolute flex-cc z-50 text-xl bg-white bg-opacity-0 hover:bg-opacity-20 full"
				>
					{file === null ? 'Letakkan file di sini' : `File: ${file[0].name}`}
				</label>
			</div>
			<button
				className="px-4 h-11 text-xl font-bold rounded bg-theme-purple"
				onClick={handleUpload}
			>
				Unggah dokumen ke IPFS
			</button>
			FileUrl :{' '}
			<a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
				{fileUrl}
			</a>
		</div>
	);
};

export default Uploader;

