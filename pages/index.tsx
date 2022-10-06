import React from 'react';

import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';

const Index: NextPage = () => {
	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="mb-4 text-4xl font-bold">Home</h1>
		</MainLayout>
	);
};

// Above are sample use of

// MainLayout: open 'components/_layouts/', that is the place where you put navbar and footer, not here
// Link: custom link that can be styled into anything and is so comfortable

export default Index;
