import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

const EventCarousel: React.FC = () => {
	const device = useDeviceDetect();
	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrev = () => {
		setActiveIndex((prev) => (prev === 0 ? eventsData.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setActiveIndex((prev) => (prev === eventsData.length - 1 ? 0 : prev + 1));
	};

	if (device === 'mobile') {
		return <div>EVENT CAROUSEL MOBILE</div>;
	}

	const activeEvent = eventsData[activeIndex];

	return (
		<Stack sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 4, sm: 6, lg: 12 }, bgcolor: 'white' }}>
			{/* Carousel Body */}
			<Box
				sx={{
					position: 'relative',
					borderRadius: 2,
					display: { md: 'flex' },
					alignItems: 'center',
					bgcolor: 'grey.100',
					boxShadow: 6,
					minHeight: '19rem',
				}}
			>
				{/* Image Section */}
				<Box
					sx={{
						position: 'relative',
						width: { xs: '100%', md: '40%' },
						minHeight: '19rem',
						overflow: 'hidden',
						borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' },
					}}
				>
					<Box
						component="img"
						src={activeEvent.imageSrc}
						alt={activeEvent.eventTitle}
						sx={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
					<Box sx={{ position: 'absolute', inset: 0, bgcolor: 'indigo.900', opacity: 0.75 }} />
					<Box
						sx={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
						}}
					>
						<strong>{activeEvent.city}</strong>
					</Box>
				</Box>

				{/* Content Section */}
				<Box
					sx={{
						width: { xs: '100%', md: '60%' },
						bgcolor: 'grey.100',
						borderRadius: 2,
						p: { xs: 4, md: '12px 24px 12px 16px' },
					}}
				>
					<Box component="p" sx={{ color: 'grey.600' }}>
						<Box component="span" sx={{ color: 'grey.900', fontWeight: 'bold' }}>
							{activeEvent.eventTitle}
						</Box>{' '}
						- {activeEvent.description}
					</Box>
					<Box
						component="a"
						href="#"
						sx={{
							display: 'flex',
							alignItems: 'baseline',
							mt: 3,
							color: 'indigo.600',
							'&:hover': { color: 'indigo.900' },
						}}
					>
						<span>Learn more about this event</span>
						<Box component="span" sx={{ ml: 1, fontSize: 'xs' }}>
							➜
						</Box>
					</Box>
				</Box>

				{/* Navigation Buttons */}
				<Box
					component="button"
					onClick={handlePrev}
					sx={{
						position: 'absolute',
						top: '50%',
						left: -10,
						transform: 'translateY(-50%)',
						bgcolor: 'white',
						borderRadius: '50%',
						boxShadow: 'md',
						height: 30,
						width: 30,
						color: 'indigo.600',
						'&:hover': {
							color: 'indigo.400',
							transform: 'translateY(-50%) scale(1.2)', // 마우스 오버시 1.2배 커짐
						},
						ml: -6,
						border: 'none',
						cursor: 'pointer',
						transition: 'transform 0.2s ease-in-out', // 부드러운 크기 변화를 위한 전환 효과
					}}
				>
					<ArrowBackIosNewIcon sx={{ width: '25px', color: 'slate-800' }} />
				</Box>
				<Box
					component="button"
					onClick={handleNext}
					sx={{
						position: 'absolute',
						top: '50%',
						right: -10,
						transform: 'translateY(-50%)',
						bgcolor: 'white',
						borderRadius: '50%',
						boxShadow: 'md',
						height: 30,
						width: 30,
						color: 'indigo.600',
						'&:hover': {
							color: 'indigo.400',
							transform: 'translateY(-50%) scale(1.2)', // 마우스 오버시 1.2배 커짐
						},
						mr: -6,
						border: 'none',
						cursor: 'pointer',
						transition: 'transform 0.2s ease-in-out', // 부드러운 크기 변화를 위한 전환 효과
					}}
				>
					<ArrowBackIosNewIcon sx={{ width: '25px', color: 'slate-800', transform: 'rotate(180deg)' }} />
				</Box>
			</Box>

			{/* Carousel Tabs */}
			<Stack direction="row" spacing={2} sx={{ pt: 10, justifyContent: 'space-between', alignItems: 'center' }}>
				{eventsData.map((event, index) => (
					<Box
						component="button"
						key={event.eventTitle}
						onClick={() => setActiveIndex(index)}
						sx={{
							px: 2,
							opacity: activeIndex === index ? 1 : 0.5,
							'&:hover': { opacity: 1 },
							transition: 'opacity 0.3s',
							border: 'none',
							bgcolor: 'transparent',
							cursor: 'pointer',
						}}
					>
						<span>{event.eventTitle}</span>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default EventCarousel;
