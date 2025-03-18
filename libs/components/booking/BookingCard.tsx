import React, { useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Booking } from '../../types/booking/booking';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topBookingRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface BookingCardType {
	booking: Booking;
	likeBookingHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const BookingCard = (props: BookingCardType) => {
	const { booking, likeBookingHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = booking?.bookingImages[0]
		? `${REACT_APP_API_URL}/${booking?.bookingImages[0]}`
		: '/img/media/header1.svg';

	useEffect(() => {
		AOS.init({
			duration: 600, // Animation duration in milliseconds
			offset: 100, // Offset (in px) from the viewport to trigger animations
			once: false, // Whether animation should happen only once
			easing: 'ease-in-out',
		});
	}, []);

	return (
		<Stack className="card-config" data-aos="zoom-in-up">
			<Stack className="top">
				<Link
					href={{
						pathname: '/booking/detail',
						query: { id: booking?._id },
					}}
				>
					<img src={imagePath} alt="" />
				</Link>
				{booking && booking?.bookingRank > topBookingRank && (
					<Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box>
				)}
				<Box component={'div'} className={'price-box'}>
					<Typography>${formatterStr(booking?.bookingPrice)}</Typography>
				</Box>
			</Stack>
			<Stack className="bottom">
				<Stack className="name-address">
					<Stack className="name">
						<Link
							href={{
								pathname: '/booking/detail',
								query: { id: booking?._id },
							}}
						>
							<Typography>{booking.bookingTitle}</Typography>
						</Link>
					</Stack>
					<Stack className="address">
						<Typography>{booking.bookingLocation}</Typography>
					</Stack>
				</Stack>
				<Stack className="divider"></Stack>
				<Stack className="type-buttons">
					{!recentlyVisited && (
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{booking?.bookingViews}</Typography>
							<IconButton color={'default'} onClick={() => likeBookingHandler(user, booking?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : booking?.meLiked && booking?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{booking?.bookingLikes}</Typography>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BookingCard;
