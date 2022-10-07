import Logo from '@components/_shared/Logo';
import React from 'react';
import ConnectionPortal from './ConnectionPortal';

const NavbarMain = () => {
	return (
		<div className="flex-cc w-full border-b border-theme-purple">
			<div className="container flex-bc py-3">
				<Logo />

				<ConnectionPortal />
			</div>
		</div>
	);
};

export default NavbarMain;

