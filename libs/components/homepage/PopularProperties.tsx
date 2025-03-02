import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularPropertyCard from './PopularPropertyCard';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { PropertiesInquiry } from '../../types/property/property.input';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';

interface PopularPropertiesProps {
	initialInput: PropertiesInquiry;
}

const PopularProperties = (props: PopularPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularProperties, setPopularProperties] = useState<Property[]>([]);

	const { data } = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularProperties(data?.getProperties?.list);
		},
	});

	if (!popularProperties) return null;

	return (
		<Stack className={'popular-properties'}>
			<Stack className={'container'}>
				<Stack className={'info-box'}>
					<div className="mb-12 space-y-5 md:mb-16 md:text-center">
						<Typography variant="h1" className="mb-5 text-3xl font-semibold text-slate-900 md:text-center md:text-5xl">
							Popular Stays
						</Typography>
						<p className="text-xl text-slate-900 md:text-center md:text-2xl">Popularity is based on views</p>
					</div>
					<Box component={'div'} className={'right'}>
						<div className={'more-box'}>
							<Link href={'/property'}>
								<span>See All Categories</span>
							</Link>
							<img src="/img/icons/rightup.svg" alt="" />
						</div>
					</Box>
				</Stack>
				<Stack className={'card-box'}>
					<Swiper
						className={'popular-property-swiper'}
						slidesPerView={'auto'}
						spaceBetween={25}
						modules={[Autoplay, Navigation, Pagination]}
						autoplay={{ delay: 1000, disableOnInteraction: false }}
						navigation={{
							nextEl: '.swiper-popular-next',
							prevEl: '.swiper-popular-prev',
						}}
						pagination={{
							el: '.swiper-popular-pagination',
						}}
					>
						{popularProperties.map((property: Property) => (
							<SwiperSlide key={property._id} className={'popular-property-slide'}>
								<PopularPropertyCard property={property} />
							</SwiperSlide>
						))}
					</Swiper>
				</Stack>
				<Stack className={'pagination-box'}>
					<WestIcon className={'swiper-popular-prev'} />
					<div className={'swiper-popular-pagination'}></div>
					<EastIcon className={'swiper-popular-next'} />
				</Stack>
			</Stack>
		</Stack>
	);
};

PopularProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'propertyViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularProperties;
