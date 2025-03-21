import React, { useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import HeaderFilter from '../homepage/HeaderFilter';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';


const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		useEffect(() => {
				AOS.init({
					duration: 1000, // Animation duration in milliseconds
					offset: 100, // Offset (in px) from the viewport to trigger animations
					once: false, // Whether animation should happen only once
				});
			}, []);

		/** HANDLERS **/

		return (
			<>
				<Head>
					<title>FreshTour</title>
					<meta name={'title'} content={`FreshTour`} />
				</Head>
				<Stack id="pc-wrap">
					<Stack id={'top'}>
						<Top />
					</Stack>
					<Stack data-aos={'zoom-in-up'} className={'header-main'}>
						<div className="relative w-full mx-auto h-full">
							<img src="/img/media/header01.jpg" alt="Header Banner" className="w-full h-[500] object-cover" />
						</div>
						<Stack className={'container'}>
							<HeaderFilter />
						</Stack>
					</Stack>
					<Stack id={'main'}>
						<Component {...props} />
					</Stack>
					{<Chat />}
					<Stack id={'footer'}>
						<Footer />
					</Stack>
				</Stack>
			</>
		);
	};
};

export default withLayoutMain;
