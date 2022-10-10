import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import qr from 'qr-image';
import PDFMerger from 'pdf-merger-js/browser';
import { useRouter } from 'next/router';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN });

const Uploader = () => {
	const [folderCID, setFolderCID] = useState(null);
	const [file, setFile] = useState<any[]>(null);

	const router = useRouter();
	const { tokenId } = router.query;

	const generateQR = () => {
		const verificationURL = `${window.location.origin}/verify?tokenId=${tokenId}`;
		const buffer = qr.imageSync(verificationURL, { type: 'pdf' });
		const blob = new Blob([buffer], { type: 'application/pdf' });
		const blobFile = new File([blob], 'qr-stamp.pdf', { type: 'application/pdf' });
		return blobFile;
	};

	const attachMeterai = async (document: File) => {
		const qrStamp = generateQR();
		const merger = new PDFMerger();
		await merger.add(qrStamp);
		await merger.add(document);
		const asBlob = await merger.saveAsBlob();
		const asFile = new File([asBlob], `${tokenId}-${document.name}.pdf`, {
			type: 'application/pdf',
		});
		return asFile;
	};

	const handleUpload = async () => {
		if (!file || !file.length) return;
		const processedDocument = await attachMeterai(file[0]);
		const res = await client.put([processedDocument]);
		setFolderCID(res);
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	const handleDownload = async () => {
		// Fetch and verify files from web3.storage
		const res = await client.get(folderCID); // Promise<Web3Response | null>
		const files = await res.files(); // Promise<Web3File[]>
		for (const file of files) {
			console.log(`${file.cid} ${file.name} ${file.size}`);
		}
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
				<input
					type="file"
					accept="application/pdf"
					name="document"
					id="file"
					className="opacity-0"
					onChange={handleFileChange}
				/>
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
			<a
				href={`https://${folderCID}.ipfs.w3s.link`}
				target="_blank"
				rel="noopener noreferrer"
				className="underline"
			>
				{folderCID}
			</a>
			<button className="" onClick={handleDownload}>
				download
			</button>
		</div>
	);
};

export default Uploader;

