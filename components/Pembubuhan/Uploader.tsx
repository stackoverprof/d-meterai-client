import React, { useEffect, useState } from 'react';
import qr from 'qr-image';
import PDFMerger from 'pdf-merger-js/browser';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useIPFS from '@core/hooks/useIPFS';
import { passwordGenerator } from '@core/utils/passwordGenerator';

type EnumStatus = 'initial' | 'uploading' | 'binding' | 'done' | 'failed';

const Uploader = () => {
	const [status, setStatus] = useState<EnumStatus>('initial');
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

	const IPFS = useIPFS();

	const handleUpload = async () => {
		if (!file || !file.length) return;
		setStatus('uploading');
		const processedDocument = await attachToken(file[0]);

		const asBase64 = await fileToBase64(processedDocument).then((res) => res);
		if (typeof asBase64 !== 'string') return;

		const password = passwordGenerator();
		const encryptedBase64 = CryptoJS.AES.encrypt(asBase64, password).toString();
		const asTxtBlob = new Blob([encryptedBase64], { type: 'text/plain' });
		const asTxtFile = new File([asTxtBlob], `encrypted-${tokenId}`, { type: 'text/plain' });

		const folderCID = await IPFS.put([asTxtFile]);

		await IPFS.status(folderCID);

		handleTokenBinding(folderCID, password);
	};

	const handleFileChange = (e: any) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	const DigitalMeterai = useDigitalMeterai();

	const handleTokenBinding = async (folderCID: string, password: string) => {
		setStatus('binding');
		DigitalMeterai.bind(tokenId, folderCID, password).catch((err) => {
			console.error('Failed to bind', err);
			setStatus('failed');
		});
	};

	const onSuccess = () => {
		setStatus('done');
		router.push(`/pengunduhan?tokenId=${0}`);
	};

	useEffect(() => {
		if (DigitalMeterai) {
			// listen to mint event on DigitalMeterai
			DigitalMeterai.on('DMT___Bound', onSuccess);
		}
	}, [DigitalMeterai]);

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
				className="px-4 h-11 text-xl font-bold rounded bg-theme-purple disabled:bg-opacity-30"
				onClick={handleUpload}
				disabled={status !== 'initial'}
			>
				{
					{
						initial: 'Unggah dan bubuhkan meterai',
						uploading: 'Proses penggunggahan...',
						binding: 'Proses pembubuhan...',
					}[status]
				}
			</button>
		</div>
	);
};

export default Uploader;

