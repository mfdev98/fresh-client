import React, { useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import AOS from 'aos';
import 'aos/dist/aos.css';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/media/header1.svg';
	
	useEffect(() => {
				AOS.init({
					duration: 3000, // Animation duration in milliseconds
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
						pathname: '/property/detail',
						query: { id: property?._id },
					}}
				>
					<img src={imagePath} alt="" />
				</Link>
				{property && property?.propertyRank > topPropertyRank && (
					<Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box>
				)}
				<Box component={'div'} className={'price-box'}>
					<Typography>${formatterStr(property?.propertyPrice)}</Typography>
				</Box>
			</Stack>
			<Stack className="bottom">
				<Stack className="name-address">
					<Stack className="name">
						<Link
							href={{
								pathname: '/property/detail',
								query: { id: property?._id },
							}}
						>
							<Typography>{property.propertyTitle}</Typography>
						</Link>
					</Stack>
					<Stack className="address">
						<Typography>
							{property.propertyAddress}, {property.propertyLocation}
						</Typography>
					</Stack>
				</Stack>
				<Stack className="options">
					<Stack className="option">
						<img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography>
					</Stack>
					<Stack className="option">
						<img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography>
					</Stack>
					<Stack className="option">
						<img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography>
					</Stack>
				</Stack>
				<Stack className="divider"></Stack>
				<Stack className="type-buttons">
					{!recentlyVisited && (
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PropertyCard;
