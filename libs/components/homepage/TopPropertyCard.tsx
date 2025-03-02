import React, { useEffect } from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Booking } from '../../types/booking/booking';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
interface TopBookingCardProps {
	booking: Booking;
	likeBookingHandler: any;
}

const TopPropertyCard = (props: TopBookingCardProps) => {
	const { booking, likeBookingHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (bookingId: string) => {
		console.log('bookingId: ', bookingId);
		await router.push({ pathname: '/booking/detail', query: { id: bookingId } });
	};

	return (
		<Stack className="top-card-box">
			<Box
				component={'div'}
				className={'card-img'}
				style={{ backgroundImage: `url(${REACT_APP_API_URL}/${booking?.bookingImages[0]})` }}
				onClick={() => {
					pushDetailHandler(booking._id);
				}}
			>
				<div className={'status'}>
					<img src="/img/icons/electricity.svg" alt="" />
					<span>top</span>
				</div>
				<div>${booking?.bookingPrice} </div>
			</Box>
			<Box component={'div'} className={'info'}>
				<strong
					className={'title'}
					onClick={() => {
						pushDetailHandler(booking._id);
					}}
				>
					{booking?.bookingTitle}
				</strong>
				<Divider sx={{ mt: '15px', mb: '17px' }} />
				<div className={'bott'}>
					<div className="view-like-box">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{booking?.bookingViews}</Typography>
						<IconButton color={'default'} onClick={() => likeBookingHandler(user, booking?._id)}>
							{booking?.meLiked && booking?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon style={{ color: 'red' }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{booking?.bookingLikes}</Typography>
					</div>
				</div>
			</Box>
		</Stack>
	);
};

export default TopPropertyCard;
