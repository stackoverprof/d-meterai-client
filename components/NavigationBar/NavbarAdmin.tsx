import React from 'react';
import ConnectionPortal from './ConnectionPortal';
import { RiShieldFlashLine } from 'react-icons/ri';

const NavbarAdmin = () => {
	return (
		<div className="flex-cc w-full border-b border-theme-purple">
			<div className="container flex-bc py-3">
				<div className="flex-cc gap-4">
					<div className="flex-cc gap-2 pt-1">
						<RiShieldFlashLine className="w-10 h-10" />
						<p className="text-2xl">Admin Portal</p>
						<p className="text-2xl font-bold text-theme-purple">d-Meterai </p>
					</div>
				</div>
				<ConnectionPortal />
			</div>
		</div>
	);
};

export default NavbarAdmin;

