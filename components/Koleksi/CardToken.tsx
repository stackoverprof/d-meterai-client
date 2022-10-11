import Link from '@components/_shared/Link';
import React from 'react';

interface Props {
	data: any;
}

const CardToken = ({ data }: Props) => {
	return (
		<div
			className={[
				'flex-bc col p-4 m-4 w-56 h-96 bg-white bg-opacity-10',
				data.status === 2 && 'saturate-0',
			].join(' ')}
		>
			<div className="flex-sc col">
				<div className="mb-2 w-48 h-48 bg-purple-300"></div>
				<div className="flex-ss col w-full">
					<p className="text-2xl font-bold text-white">d-Meterai</p>
					<p className="text-2xl font-bold text-theme-purple">#{data.tokenId}</p>
					<p className="text-lg">{data.price} ETH</p>
				</div>
			</div>
			{data.status === 1 && (
				<Link
					href={`/pembubuhan?tokenId=${data.tokenId}`}
					className="flex-cc w-full h-12 rounded border-2 border-theme-purple"
				>
					Pembubuhan
				</Link>
			)}
			{data.status === 2 && (
				<Link
					href={`/pengunduhan?tokenId=${data.tokenId}`}
					className="flex-cc w-full h-12 rounded border-2 border-theme-purple"
				>
					Unduh dokumen
				</Link>
			)}
		</div>
	);
};

export default CardToken;

