import Link from '@components/_shared/Link';
import React from 'react';

interface Props {
	data: any;
}

const CardToken = ({ data }: Props) => {
	console.log('data', data);
	return (
		<div className="flex-sc col p-4 m-4 w-56 h-80 bg-white bg-opacity-10">
			<div className="w-48 h-48 bg-purple-300"></div>
			<p className="">ID: {data.tokenId}</p>
			<p className="">Harga: {data.price}</p>
			<p className="">Dokumen: {data.document}</p>
			<Link
				href={`/pembubuhan?tokenId=${data.tokenId}`}
				className="flex-cc w-full h-12 rounded border-2 border-theme-purple"
			>
				Pembubuhan
			</Link>
		</div>
	);
};

export default CardToken;

