import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './TopPropertyCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import { Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TopPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TopProperties = (props: TopPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topProperties, setTopProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopProperties(data?.getProperties?.list);
		},
	});

	/** HANDLERS **/

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await likeTargetProperty({
				variables: { input: id },
			});
			await getPropertiesRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success');
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	useEffect(() => {
		AOS.init({
			duration: 3000, // Animation duration in milliseconds
			offset: 100, // Offset (in px) from the viewport to trigger animations
			once: false, // Whether animation should happen only once
		});
	}, []);

	return (
		<Stack className={'top-properties'} data-aos={'zoom-in-up'}>
			<div className="w-full flex items-center justify-between ">
				<img src="/img/logo/stars.svg" alt="" className="w-42 md:w-46 scale-x-[-1]" />
				<div className="text-center space-y-5">
					<Typography variant="h1" className=" text-3xl font-semibold text-slate-900 md:text-5xl">
						Top Destinations
					</Typography>
					<p className="text-xl text-slate-900 md:text-2xl">Check out our Top Destinations</p>
				</div>
				<img src="/img/logo/stars.svg" alt="" className="w-42 md:w-46" />
			</div>
			<Stack className={'container '}>
				<Stack className={'card-box'}>
					<Swiper
						className={'top-property-swiper'}
						slidesPerView={'auto'}
						modules={[Autoplay, Navigation, Pagination]}
						navigation={{
							nextEl: '.swiper-top-next',
							prevEl: '.swiper-top-prev',
						}}
						pagination={{
							el: '.swiper-top-pagination',
							clickable: true,
						}}
					>
						{topProperties.map((property: Property) => {
							return (
								<SwiperSlide className="top-property-slide flex justify-center mx-auto" key={property?._id}>
									<TopPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Stack>
			</Stack>
		</Stack>
	);
};

TopProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 3,
		sort: 'propertyRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProperties;
