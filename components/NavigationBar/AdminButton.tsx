import Link from '@components/_shared/Link';
import React from 'react';
import { RiShieldFlashLine } from 'react-icons/ri';

const AdminButton = () => {
	return (
		<Link
			href="/admin"
			className="flex-cc w-11 h-11 bg-white bg-opacity-0 rounded hover:bg-opacity-40 "
		>
			<RiShieldFlashLine className="w-8 h-8" />
		</Link>
	);
};

export default AdminButton;

