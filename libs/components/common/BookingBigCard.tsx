import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Booking } from '../../types/booking/booking';
import { REACT_APP_API_URL, topBookingRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface BookingBigCardProps {
	booking: Booking;
	likeBookingHandler?: any;
}

const BookingBigCard = (props: BookingBigCardProps) => {
	const { booking, likeBookingHandler } = props;
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goBookingDetatilPage = (bookingId: string) => {
		router.push(`/booking/detail?id=${bookingId}`);
	};

	return (
		<Stack className="property-big-card-box" onClick={() => goBookingDetatilPage(booking?._id)}>
			<Box
				component={'div'}
				className={'card-img'}
				style={{ backgroundImage: `url(${REACT_APP_API_URL}/${booking?.bookingImages?.[0]})` }}
			>
				{booking && booking?.bookingRank >= topBookingRank && (
					<div className={'status'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<span>top</span>
					</div>
				)}

				<div className={'price'}>${formatterStr(booking?.bookingPrice)}</div>
			</Box>
			<Box component={'div'} className={'info'}>
				<strong className={'title'}>{booking?.bookingTitle}</strong>
				<p className={'desc'}>{booking?.bookingDesc}</p>
				<Divider sx={{ mt: '15px', mb: '17px' }} />
				<div className={'bott'}>
					<div className="buttons-box">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{booking?.bookingViews}</Typography>
						<IconButton
							color={'default'}
							onClick={(e: any) => {
								e.stopPropagation();
								likeBookingHandler(user, booking?._id);
							}}
						>
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

export default BookingBigCard;
