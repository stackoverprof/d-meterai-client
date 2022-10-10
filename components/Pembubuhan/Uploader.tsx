import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import qr from 'qr-image';
import PDFMerger from 'pdf-merger-js/browser';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';
import axios from 'axios';

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

	const attachToken = async (document: File) => {
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

	const fileToBase64 = async (file: File) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleUpload = async () => {
		if (!file || !file.length) return;
		const processedDocument = await attachToken(file[0]);

		const asBase64 = await fileToBase64(processedDocument).then((res) => res);
		if (typeof asBase64 !== 'string') return;
		const encryptedBase64 = CryptoJS.AES.encrypt(asBase64, 'password').toString();
		const asTxtBlob = new Blob([encryptedBase64], { type: 'text/plain' });
		const asTxtFile = new File([asTxtBlob], `encrypted-${tokenId}`, { type: 'text/plain' });

		const res = await client.put([asTxtFile]);
		setFolderCID(res);
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	const handleDownload = async () => {
		const res = await client.get(folderCID);
		const files = await res.files();

		const downloadLink = `https://${files[0].cid}.ipfs.w3s.link`;
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

