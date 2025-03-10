import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Booking } from '../../types/booking/booking';
import { formatterStr } from '../../utils';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { BookingStatus } from '../../enums/booking.enum';

interface BookingCardProps {
	booking: Booking;
	deleteBookingHandler?: any;
	memberPage?: boolean;
	updateBookingHandler?: any;
}

export const BookingCard = (props: BookingCardProps) => {
	const { booking, deleteBookingHandler, memberPage, updateBookingHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const pushEditBooking = async (id: string) => {
		console.log('+pushEditBooking: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addBooking', bookingId: id },
		});
	};

	const pushBookingDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/booking/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE BOOKING CARD</div>;
	} else
		return (
			<Stack className="property-card-box">
				<Stack className="image-box" onClick={() => pushBookingDetail(booking?._id)}>
					<img src={`${process.env.REACT_APP_API_URL}/${booking.bookingImages[0]}`} alt="" />
				</Stack>
				<Stack className="information-box" onClick={() => pushBookingDetail(booking?._id)}>
					<Typography className="name">{booking.bookingTitle}</Typography>
					<Typography className="price">
						<strong>${formatterStr(booking?.bookingPrice)}</strong>/
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{booking.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{booking.bookingStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && booking.bookingStatus !== 'SOLD' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{booking.bookingStatus === 'ACTIVE' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateBookingHandler(BookingStatus.SOLD, booking?._id);
									}}
								>
									Sold
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="views-box">
					<Typography className="views">{booking.bookingViews.toLocaleString()}</Typography>
				</Stack>
				{!memberPage && booking.bookingStatus === BookingStatus.ACTIVE && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditBooking(booking._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => deleteBookingHandler(booking._id)}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};
