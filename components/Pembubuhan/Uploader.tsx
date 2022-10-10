import React, { useRef, useState } from 'react';
import { Web3Storage } from 'web3.storage';

// Construct with token and endpoint
const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN });

// const fileInput = document.querySelector('input[type="file"]');

// Pack files into a CAR and send to web3.storage

// Get info on the Filecoin deals that the CID is stored in

// Fetch and verify files from web3.storage

const Uploader = () => {
	const [fileUrl, setFileUrl] = useState('');
	const [file, setFile] = useState(null);

	const handleUpload = async () => {
		const rootCid = await client.put(file);
		setFileUrl(`https://${rootCid}.ipfs.w3s.link`);
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files;
		setFile(file);
	};

	return (
		<div className="flex-sc col">
			<div className="w-[800px] mb-8 h-48 flex-cc rounded border-2 relative border-theme-purple">
				<input type="file" id="file" className="opacity-0" onChange={handleFileChange} />
				<label
					htmlFor="file"
					className="absolute flex-cc text-xl bg-white bg-opacity-0 hover:bg-opacity-20 full"
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

