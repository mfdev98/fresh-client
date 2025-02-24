import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}

const eventsData: EventData[] = [
	{
		eventTitle: 'Paradise City Theme Park',
		city: 'Incheon',
		description:
			'Experience magic and wonder in Incheon with a visit to the night-themed indoor theme park Wonderbox at Paradise City!',
		imageSrc: '/img/events/INCHEON.webp',
	},
	{
		eventTitle: 'Taebaeksan Snow Festival',
		city: 'Seoul',
		description: 'If you have the opportunity to travel to South Korea, do not miss the Taebaeksan Snow Festival!',
		imageSrc: '/img/events/SEOUL.webp',
	},
	{
		eventTitle: 'Suseong Lake Event',
		city: 'Daegu',
		description: 'The Suseong Lake Festival is a culture and arts festival held alongside Suseongmot Lake!',
		imageSrc: '/img/events/DAEGU.webp',
	},
	{
		eventTitle: 'Sand Festival',
		city: 'Busan',
		description:
			'Haeundae Sand Festival, the nation’s largest eco-friendly exhibition on sand, is held at Haeundae Beach!',
		imageSrc: '/img/events/BUSAN.webp',
	},
];

const Event = () => {
	useEffect(() => {
		AOS.init({
			duration: 3000, // Animation duration in milliseconds
			offset: 100, // Offset (in px) from the viewport to trigger animations
			once: false, // Whether animation should happen only once
		});
	}, []);

	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % eventsData.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + eventsData.length) % eventsData.length);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full h-[700px] mx-auto p-4 mb-10" data-aos={'zoom-in-up'}>
			<div className="space-y-5 w-full text-center">
				<Typography variant="h1" className="mb-5 text-3xl font-semibold text-slate-900 md:text-5xl ">
					Hot Events
				</Typography>
				<p className="text-xl text-slate-900 md:text-center md:text-2xl">
					Don't miss out on our hot travel events and special offers!
				</p>
			</div>
			<div className="relative ">
				{/* Carousel wrapper */}
				<div className="overflow-hidden relative h-[550px] rounded-lg mt-10 flex justify-center">
					{eventsData.map((slide, index) => (
						<div
							key={index}
							className={`absolute w-[70%] h-[500px] transition-opacity duration-700 ease-in-out  ${
								currentSlide === index ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 z-10">
								{slide.eventTitle}
							</span>
							<img
								src={slide.imageSrc}
								className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 "
								alt={`Slide ${index + 1}`}
							/>
						</div>
					))}
				</div>
				{/* Navigation Buttons */}
				<button
					onClick={prevSlide}
					className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full"
				>
					◀
				</button>
				<button
					onClick={nextSlide}
					className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full"
				>
					▶
				</button>
			</div>
		</div>
	);
};

export default Event;
