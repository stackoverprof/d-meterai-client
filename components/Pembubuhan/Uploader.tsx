import React, { useEffect, useState } from 'react';
import qr from 'qr-image';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';
import useDigitalMeterai from '@core/hooks/useDigitalMeterai';
import useIPFS from '@core/hooks/useIPFS';
import { PDFDocument, PDFName, PDFPage, PDFString, rgb, StandardFonts } from 'pdf-lib';
import { passwordGenerator } from '@core/utils/passwordGenerator';

type EnumStatus = 'initial' | 'uploading' | 'binding' | 'done' | 'failed';

const Uploader = () => {
	const [status, setStatus] = useState<EnumStatus>('initial');
	const [file, setFile] = useState<any[]>(null);

	const router = useRouter();

	const { tokenId } = router.query;

	const verificationURL = `${window.location.origin}/pengunduhan?tokenId=${tokenId}`;

	const generateQR = () => {
		// Generate QR Code for the verification link
		const buffer = qr.imageSync(verificationURL, { type: 'pdf' });
		const blob = new Blob([buffer], { type: 'application/pdf' });
		const file = new File([blob], 'qr-stamp.pdf', { type: 'application/pdf' });
		return file;
	};

	const digitalSign = async (document: File): Promise<File> => {
		// Convert file to buffer format
		const asBuffer = await fileToArrayBuffer(document);

		// Using pdf-lib to process the file
		const pdfDoc = await PDFDocument.load(asBuffer);
		const pages = pdfDoc.getPages();

		// Selecting the first page
		const mainPage = pages[0];

		// Supporting variables
		const { height } = mainPage.getSize();
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const signedAt = new Date().toLocaleString('id-ID', {
			timeZone: 'Asia/Jakarta',
		});

		// Writing the texts
		mainPage.drawText(
			`Tertanda tangan digital dengan d-Meterai#${tokenId} pada ${signedAt} — Buka tautan di bawah ini untuk melihat dokumen autentik`,
			{
				x: 50,
				y: height - 12,
				size: 8,
				font: helveticaFont,
				color: rgb(0.5, 0.5, 0.5),
			}
		);

		// Writing the verification link
		mainPage.drawText(verificationURL, {
			x: 50,
			y: height - 20,
			size: 8,
			font: helveticaFont,
			color: rgb(0.6, 0.11, 0.89),
		});

		// Set as hyperlink
		const link = createPageLinkAnnotation(mainPage, verificationURL);
		mainPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));

		// Generate QR Code
		const qrPdf = generateQR();
		const qrBuffer = await fileToArrayBuffer(qrPdf);
		const [qrEmbed] = await pdfDoc.embedPdf(qrBuffer);

		// Embed the QR Code to page
		mainPage.drawPage(qrEmbed, {
			width: 40,
			height: 40,
			x: 5,
			y: height - 45,
		});

		// Save the changes
		const pdfBytes = await pdfDoc.save();

		// Convert back to File
		const asBlob = new Blob([pdfBytes], { type: 'application/pdf' });
		const asFile = new File([asBlob], 'signed.pdf', { type: 'application/pdf' });
		return asFile;
	};

	const createPageLinkAnnotation = (page: PDFPage, uri: string) =>
		page.doc.context.register(
			page.doc.context.obj({
				Type: 'Annot',
				Subtype: 'Link',
				Rect: [0, 0, 0, 0],
				Border: [0, 0, 0],
				C: [0, 0, 0],
				A: {
					Type: 'Action',
					S: 'URI',
					URI: PDFString.of(uri),
				},
			})
		);

	const fileToArrayBuffer = async (file: File): Promise<string | ArrayBuffer> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsArrayBuffer(file);
		});
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

		// Processing document for QR stamping and url linking
		const processedDocument = await digitalSign(file[0]);

		// Encrypting document before uploading to IPFS
		const asBase64 = await fileToBase64(processedDocument);
		const password = passwordGenerator();
		const encryptedBase64 = CryptoJS.AES.encrypt(asBase64, password).toString();
		const asTxtBlob = new Blob([encryptedBase64], { type: 'text/plain' });
		const asTxtFile = new File([asTxtBlob], 'document', { type: 'text/plain' });

		// Uploading to IPFS
		const folderCID = await IPFS.put([asTxtFile]);

		// Continue to binding operation
		handleTokenBinding(folderCID, password);
	};

	const handleTokenBinding = async (folderCID: string, password: string) => {
		// Updating token metadata with the given CID
		DigitalMeterai.bind(tokenId, folderCID, password);
	};

	const handleFileChange = (e: any) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	const DigitalMeterai = useDigitalMeterai();

	const onSuccess = (res) => {
		const received = res.toString();
		if (received !== tokenId) return;
		setStatus('done');
		router.push(`/pengunduhan?tokenId=${received}`);
	};

	useEffect(() => {
		if (DigitalMeterai) DigitalMeterai.on('DMT___Bound', onSuccess);

		return () => {
			if (DigitalMeterai) DigitalMeterai.off('DMT___Bound', onSuccess);
		};
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
					disabled={status !== 'initial'}
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
						done: 'Pembubuhan berhasil!',
					}[status]
				}
			</button>
		</div>
	);
};

export default Uploader;

