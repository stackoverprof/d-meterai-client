import Link from '@components/_shared/Link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
	return (
		<section className="relative flex-cc w-full">
			<div className="container flex-bc px-16 w-full h-[640px] z-10">
				<div className="flex-ss col">
					<h1 className="mb-4 w-[800px] text-6xl font-bold">
						Evolusi meterai digital berbasis blockchain
					</h1>
					<h2 className="mb-12 w-[500px] text-xl leading-6">
						Tingkatkan pengalaman permeteraian dengan keamanan jaringan
						terdesentralisasi
					</h2>
					<Link
						href="/koleksi"
						className="flex-cc gap-2 px-5 py-2.5 text-2xl font-bold uppercase rounded"
						style={{
							background:
								'linear-gradient(91.82deg, #CD6DFF 3.68%, #B963FF 53.45%, #8145FF 99.24%)',
						}}
					>
						Mulai
						<FaArrowRight size={20} className="mb-1" />
					</Link>
				</div>
				<div className=""></div>

				<div className="fixed flex-ee right-0 bottom-0 pointer-events-none full">
					<div className="flex-ee overflow-hidden w-10/12 h-full">
						<img src="/img/bg-dmt.png" alt="background" className="full" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

