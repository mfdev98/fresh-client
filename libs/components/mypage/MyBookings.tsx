import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Booking } from '../../types/booking/booking';
import { AgentBookingsInquiry } from '../../types/booking/booking.input';
import { T } from '../../types/common';
import { BookingStatus } from '../../enums/booking.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { GET_AGENT_BOOKINGS } from '../../../apollo/user/query';
import { UPDATE_BOOKING } from '../../../apollo/user/mutation';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';
import { BookingCard } from './BookingCard';

const MyBookings: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentBookingsInquiry>(initialInput);
	const [agentBookings, setAgentBookings] = useState<Booking[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateBooking] = useMutation(UPDATE_BOOKING);

	const {
		loading: getAgentBookingsLoading,
		data: getAgentBookingsData,
		error: getAgentBookingsError,
		refetch: getAgentBookingsRefetch,
	} = useQuery(GET_AGENT_BOOKINGS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentBookings(data?.getAgentBookings?.list);
			setTotal(data?.getAgentBookings?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: BookingStatus) => {
		setSearchFilter({ ...searchFilter, search: { bookingStatus: value } });
	};

	const deleteBookingHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this booking?')) {
				await updateBooking({
					variables: {
						input: {
							_id: id,
							bookingStatus: 'DELETE',
						},
					},
				});

				await getAgentBookingsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			sweetErrorHandling(err);
		}
	};

	const updateBookingHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status} status?`)) {
				await updateBooking({
					variables: {
						input: {
							_id: id,
							bookingStatus: status,
						},
					},
				});

				await getAgentBookingsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'AGENT') {
		router.back();
	}

	return (
		<div id="my-property-page">
			<Stack className="main-title-box">
				<Stack className="right-box">
					<Typography className="main-title">My Bookings</Typography>
					<Typography className="sub-title">We are glad to see you again!</Typography>
				</Stack>
			</Stack>
			<Stack className="property-list-box">
				<Stack className="tab-name-box">
					<Typography
						onClick={() => changeStatusHandler(BookingStatus.ACTIVE)}
						className={searchFilter.search.bookingStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
					>
						On Sale
					</Typography>
					<Typography
						onClick={() => changeStatusHandler(BookingStatus.SOLD)}
						className={searchFilter.search.bookingStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
					>
						On Sold
					</Typography>
				</Stack>
				<Stack className="list-box">
					<Stack className="listing-title-box">
						<Typography className="title-text">Listing title</Typography>
						<Typography className="title-text">Date Published</Typography>
						<Typography className="title-text">Status</Typography>
						<Typography className="title-text">View</Typography>
						{searchFilter.search.bookingStatus === 'ACTIVE' && <Typography className="title-text">Action</Typography>}
					</Stack>

					{agentBookings?.length === 0 ? (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Booking found!</p>
						</div>
					) : (
						agentBookings.map((booking: Booking) => {
							return (
								<BookingCard
									booking={booking}
									deleteBookingHandler={deleteBookingHandler}
									updateBookingHandler={updateBookingHandler}
								/>
							);
						})
					)}
				</Stack>
			</Stack>
		</div>
	);
};

MyBookings.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			bookingStatus: 'ACTIVE',
		},
	},
};

export default MyBookings;
