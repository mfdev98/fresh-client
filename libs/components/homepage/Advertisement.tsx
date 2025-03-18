import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	return (
		<Stack className={'video-frame'}>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				style={{ minWidth: '1300px', width: '100%', height: '100%', objectFit: 'cover' }}
			>
				<source src="/video/travel.mp4" type="video/mp4" />
			</video>
		</Stack>
	);
};

export default Advertisement;
