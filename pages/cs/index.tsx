import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Notice from '../../libs/components/cs/Notice';
import Faq from '../../libs/components/cs/Faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const CS: NextPage = () => {
	const router = useRouter();

	/** HANDLERS **/
	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/cs',
				query: { tab: tab },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab = router.query.tab ?? 'notice';

	useEffect(() => {
		AOS.init({
			duration: 600, // Animation duration in milliseconds
			offset: 100, // Offset (in px) from the viewport to trigger animations
			once: false, // Whether animation should happen only once
			easing: 'ease-in-out',
		});
	}, []);

	return (
		<Stack className={'cs-page'} data-aos="fade-up">
			<Stack className={'container'}>
				<Box component={'div'} className={'cs-main-info'}>
					<Box component={'div'} className={'btns'}>
						<div
							className={tab == 'notice' ? 'active' : ''}
							onClick={() => {
								changeTabHandler('notice');
							}}
						>
							Notice
						</div>
						<div
							className={tab == 'faq' ? 'active' : ''}
							onClick={() => {
								changeTabHandler('faq');
							}}
						>
							FAQ
						</div>
					</Box>
				</Box>

				<Box component={'div'} className={'cs-content'}>
					{tab === 'notice' && <Notice />}

					{tab === 'faq' && <Faq />}
				</Box>
			</Stack>
		</Stack>
	);
};

export default withLayoutBasic(CS);
