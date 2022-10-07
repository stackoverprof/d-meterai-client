import React from 'react';
import ConnectionPortal from './ConnectionPortal';
import { RiShieldFlashLine } from 'react-icons/ri';
import { MdOutlineHome } from 'react-icons/md';
import Link from '@components/_shared/Link';

const NavbarAdmin = () => {
	return (
		<div className="flex-cc w-full border-b border-theme-purple">
			<div className="container flex-bc py-3">
				<div className="flex-cc gap-4">
					<div className="flex-cc gap-2 pt-1">
						<RiShieldFlashLine className="w-10 h-10" />
						<p className="text-2xl">Dasbor Admin</p>
						<p className="text-2xl font-bold text-theme-purple">d-Meterai </p>
					</div>
				</div>
				<div className="flex-cc gap-2">
					<ConnectionPortal />
					<Link
						href="/"
						className="flex-cc w-11 h-11 bg-white bg-opacity-0 rounded hover:bg-opacity-40 "
					>
						<MdOutlineHome className="w-8 h-8" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NavbarAdmin;

