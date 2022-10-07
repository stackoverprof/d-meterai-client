import Logo from '@components/NavigationBar/Logo';
import useIsOwner from '@core/hooks/useIsOwner';
import React from 'react';
import AdminButton from './AdminButton';
import ConnectionPortal from './ConnectionPortal';

const NavbarMain = () => {
	const isOwner = useIsOwner();
	return (
		<div className="flex-cc w-full border-b border-theme-purple">
			<div className="container flex-bc py-3">
				<Logo />
				<div className="flex-cc gap-2">
					<ConnectionPortal />
					{isOwner && <AdminButton />}
				</div>
			</div>
		</div>
	);
};

export default NavbarMain;

