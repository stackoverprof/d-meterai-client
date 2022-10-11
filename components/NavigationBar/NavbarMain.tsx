import Logo from '@components/NavigationBar/Logo';
import Link from '@components/_shared/Link';
import useOwner from '@core/hooks/useOwner';
import React from 'react';
import { RiShieldFlashLine } from 'react-icons/ri';

import ConnectionPortal from './ConnectionPortal';

const NavbarMain = () => {
	const { isOwner } = useOwner();
	return (
		<div className="flex-cc w-full border-b border-theme-purple">
			<div className="container flex-bc py-3">
				<Logo />
				<div className="flex-cc gap-2">
					<ConnectionPortal />
					{isOwner && (
						<Link
							href="/admin"
							className="flex-cc w-11 h-11 bg-white bg-opacity-0 rounded hover:bg-opacity-40 "
						>
							<RiShieldFlashLine className="w-8 h-8" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavbarMain;

