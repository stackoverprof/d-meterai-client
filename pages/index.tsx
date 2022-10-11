import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { NextPage } from 'next';
import HeroSection from '@components/Home/HeroSection';

const Index: NextPage = () => {
	return (
		<MainLayout title="Home" className="flex-sc col">
			<HeroSection />
		</MainLayout>
	);
};

export default Index;
