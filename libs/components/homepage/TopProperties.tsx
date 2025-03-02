import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './TopPropertyCard';
import { BookingsInquiry } from '../../types/booking/booking.input';
import { Booking } from '../../types/booking/booking';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BOOKINGS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_BOOKING } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import { Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TopBookingsProps {
	initialInput: BookingsInquiry;
}

const TopProperties = (props: TopBookingsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topBookings, setTopBookings] = useState<Booking[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetBooking] = useMutation(LIKE_TARGET_BOOKING);

	const {
		loading: getBookingsLoading,
		data: getBookingsData,
		error: getBookingsError,
		refetch: getBookingsRefetch,
	} = useQuery(GET_BOOKINGS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopBookings(data?.getBookings?.list);
		},
	});

	/** HANDLERS **/

	const likeBookingHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await likeTargetBooking({
				variables: { input: id },
			});
			await getBookingsRefetch({ input: initialInput });

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
			<div className="w-full flex items-center justify-between mt-[50px] ">
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
						{topBookings.map((booking: Booking) => {
							return (
								<SwiperSlide className="top-property-slide flex justify-center mx-auto" key={booking?._id}>
									<TopPropertyCard booking={booking} likeBookingHandler={likeBookingHandler} />
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
		sort: 'bookingRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProperties;
