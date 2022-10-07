import React from 'react';
import SEOTags from '@components/_shared/SEOTags';
import useMinHeight from '@core/hooks/useMinHeight';
import NavbarAdmin from '@components/NavigationBar/NavbarAdmin';

interface Props {
	children: React.ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
}

const AdminLayout = ({ children, title, className, style }: Props) => {
	const [minHeight, upperRef, lowerRef] = useMinHeight();

	return (
		<>
			<SEOTags title={title} />

			<header ref={upperRef}>
				<NavbarAdmin />
			</header>

			<main style={{ minHeight, ...style }} className={className}>
				{children}
			</main>

			<footer ref={lowerRef}>{/* Footer things */}</footer>
		</>
	);
};

export default AdminLayout;
