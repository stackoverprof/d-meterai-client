import React from 'react';

interface Props {
	data: any;
}

const CardToken = ({ data }: Props) => {
	console.log('data', data);
	return (
		<div className="flex-sc col pt-6 m-4 w-56 h-80 bg-white bg-opacity-10">
			<div className="w-44 h-44 bg-purple-300"></div>
			<p className="">ID: {data.tokenId}</p>
			<p className="">Harga: {data.price}</p>
			<p className="">Dokumen: {data.document}</p>
		</div>
	);
};

export default CardToken;

