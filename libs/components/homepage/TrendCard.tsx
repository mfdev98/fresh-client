import { Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const TrendCard = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000, // Animation duration in milliseconds
			offset: 100, // Offset (in px) from the viewport to trigger animations
			once: false, // Whether animation should happen only once
		});
	}, []);
	return (
		<section className="bg-white overflow-hidden min-w-[1300px]">
			<div className="flex items-center justify-center ">
				<div className="text-center space-y-5 ">
					<Typography variant="h1" className="mb-5 text-3xl font-semibold text-slate-900 md:text-5xl">
						We Offer Best Services
					</Typography>
					<p className="text-xl text-slate-900 md:text-2xl">To improve corporate value</p>
				</div>
			</div>

			<div className="max-w-screen-xl 2xl:max-w-screen-3xl px-8 md:px-12 mx-auto py-12 lg:py-24 space-y-24 h-svh flex flex-col justify-center">
				{/* Image Cards */}
				<div className="flex flex-row sm:flex-row mx-auto mt-10" data-aos={'zoom-in-up'}>
					{[
						'https://images.unsplash.com/photo-1530035415911-95194de4ebcc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						'https://images.unsplash.com/photo-1586996292898-71f4036c4e07?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						'https://images.unsplash.com/photo-1522775417749-29284fb89f43?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
					].map((src, index) => (
						<a href="#_" key={index}>
							<img
								src={src}
								className={`rounded-xl ${
									index % 2 === 0 ? 'rotate-6' : '-rotate-12'
								} hover:rotate-0 duration-500 h-full w-full object-cover hover:scale-150 transform origin-bottom`}
								alt="Animated"
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrendCard;
