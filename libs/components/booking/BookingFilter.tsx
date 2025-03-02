import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Typography, Checkbox, OutlinedInput, Tooltip, IconButton } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { BookingLocation, BookingType } from '../../enums/booking.enum';
import { BookingsInquiry } from '../../types/booking/booking.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: BookingsInquiry;
	setSearchFilter: any;
	initialInput: BookingsInquiry;
}

const BookingFilter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [bookingLocation, setBookingLocation] = useState<BookingLocation[]>(Object.values(BookingLocation));
	const [bookingType, setBookingType] = useState<BookingType[]>(Object.values(BookingType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const [showMore2, setShowMore2] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			// setShowMore(false);
			router
				.push(
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const bookingLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('bookingLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, bookingLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const bookingTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/booking?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('bookingTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, bookingTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const bookingPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, start: value * 1 },
						},
					})}`,
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, end: value * 1 },
						},
					})}`,
					`/booking?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/booking?input=${JSON.stringify(initialInput)}`,
				`/booking?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	return (
		<Stack className={'filter-main'}>
			<Stack className={'find-your-home'} mb={'40px'}>
				<div className={'find-text'}>
					<Typography className={'title-main'}>Find Your Trip Here</Typography>
				</div>
				<Stack className={'input-box'}>
					<OutlinedInput
						value={searchText}
						type={'text'}
						className={'search-input'}
						placeholder={'What are you looking for?'}
						onChange={(e: any) => setSearchText(e.target.value)}
						onKeyDown={(event: any) => {
							if (event.key == 'Enter') {
								setSearchFilter({
									...searchFilter,
									search: { ...searchFilter.search, text: searchText },
								});
							}
						}}
						endAdornment={
							<>
								<CancelRoundedIcon
									onClick={() => {
										setSearchText('');
										setSearchFilter({
											...searchFilter,
											search: { ...searchFilter.search, text: '' },
										});
									}}
								/>
							</>
						}
					/>
					<img src={'/img/icons/search_icon.png'} alt={''} />
					<Tooltip title="Reset">
						<IconButton onClick={refreshHandler}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Stack>
			<Stack className={'find-your-home'} mb={'30px'}>
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					onClick={() => setShowMore(!showMore)}
					style={{ cursor: 'pointer' }}
				>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<span
						style={{
							transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
							transition: 'transform 0.3s ease',
						}}
					>
						▼
					</span>
				</Stack>
				<Stack
					className={`property-location`}
					style={{
						height: showMore ? '253px' : '0px',
						overflow: 'hidden',
						transition: 'height 0.3s ease',
					}}
				>
					{bookingLocation.map((location: string) => {
						return (
							<Stack className={'input-box'} key={location}>
								<Checkbox
									id={location}
									className="property-checkbox"
									color="default"
									size="small"
									value={location}
									checked={(searchFilter?.search?.locationList || []).includes(location as BookingLocation)}
									onChange={bookingLocationSelectHandler}
								/>
								<label htmlFor={location} style={{ cursor: 'pointer' }}>
									<Typography className="property-type">{location}</Typography>
								</label>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
			<Stack className={'find-your-home'} mb={'30px'}>
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					onClick={() => setShowMore2(!showMore2)}
					style={{ cursor: 'pointer' }}
				>
					<Typography className={'title'}>Property Type</Typography>
					<span
						style={{
							transform: showMore2 ? 'rotate(180deg)' : 'rotate(0deg)',
							transition: 'transform 0.5s ease',
						}}
					>
						▼
					</span>
				</Stack>
				<Stack
					style={{
						height: showMore2 ? 'auto' : '0px',
						overflow: 'hidden',
						transition: 'height 0.5s ease',
					}}
				>
					{bookingType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="property-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={bookingTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as BookingType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
			</Stack>

			<Stack className={'find-your-home'}>
				<Typography className={'title'}>Price Range</Typography>
				<Stack className="square-year-input">
					<input
						type="number"
						placeholder="$ min"
						min={0}
						value={searchFilter?.search?.priceRange?.start ?? 0}
						onChange={(e: any) => {
							if (e.target.value >= 0) {
								bookingPriceHandler(e.target.value, 'start');
							}
						}}
					/>
					<div className="central-divider"></div>
					<input
						type="number"
						placeholder="$ max"
						value={searchFilter?.search?.priceRange?.end ?? 0}
						onChange={(e: any) => {
							if (e.target.value >= 0) {
								bookingPriceHandler(e.target.value, 'end');
							}
						}}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BookingFilter;
