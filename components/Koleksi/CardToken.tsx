import Link from '@components/_shared/Link';
import React from 'react';
import qr from 'qr-image';

interface Props {
	data: any;
}

const CardToken = ({ data }: Props) => {
	const generateQRAsset = () => {
		const verificationURL = `${window.location.origin}/pengunduhan?tokenId=${data.tokenId}`;
		const buffer = qr.imageSync(verificationURL, {
			type: 'png',
			margin: 2,
		});
		const blob = new Blob([buffer], { type: 'image/png' });
		const blobURL = URL.createObjectURL(blob);
		return blobURL;
	};

	return (
		<div
			className={[
				'relative flex-cc m-4 w-56 h-96 bg-opacity-30 rounded ',
				data.status === 2 ? 'bg-white' : 'bg-theme-purple',
			].join(' ')}
		>
			<div className="relative flex-bc col z-10 p-4 m-4 full">
				<div className={['flex-sc col', data.status === 2 && 'saturate-0'].join(' ')}>
					<div className="mb-2 w-48 h-48 bg-purple-300">
						<img src={generateQRAsset()} alt="QR" className="full" />
					</div>
					<div className="flex-ss col w-full">
						<p className="text-2xl font-bold text-white">d-Meterai</p>
						<p
							className={[
								'text-2xl font-bold',
								data.status === 2 ? 'text-white' : 'text-theme-purple',
							].join(' ')}
						>
							#{data.tokenId}
						</p>
						<p className="text-lg">{data.price} ETH</p>
					</div>
				</div>
				{data.status === 1 && (
					<Link
						href={`/pembubuhan?tokenId=${data.tokenId}`}
						className="flex-cc w-full h-12 text-lg rounded border-2 hover:bg-theme-purple border-theme-purple"
					>
						Pembubuhan
					</Link>
				)}
				{data.status === 2 && (
					<Link
						href={`/pengunduhan?tokenId=${data.tokenId}`}
						className="flex-cc w-full h-12 text-lg rounded hover:border-2 bg-theme-purple"
					>
						Unduh dokumen
					</Link>
				)}
			</div>
			<div
				className={[
					'absolute flex-ee overflow-hidden top-0 z-0 opacity-25 full',
					data.status === 2 && 'saturate-0',
				].join(' ')}
			>
				<img src="/img/garuda.svg" alt="" className="relative -right-12 -bottom-12 h-1/2" />
			</div>
		</div>
	);
};

export default CardToken;

