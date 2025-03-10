import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import PopularProperties from '../libs/components/homepage/PopularProperties';
import TopAgents from '../libs/components/homepage/TopAgents';
import Event from '../libs/components/homepage/Event';
import TopProperties from '../libs/components/homepage/TopProperties';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TrendCard from '../libs/components/homepage/TrendCard';
import Logos from '../libs/components/homepage/Logos';
import LogosTop from '../libs/components/homepage/LogosTop';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	return (
		<Stack className={'home-page'}>
			<TopProperties />
			<Logos />
			<TrendCard />
			<Advertisement />
			<PopularProperties />
			<TopAgents />
			<Event />
			<LogosTop />
			<CommunityBoards />
		</Stack>
	);
};

export default withLayoutMain(Home);
