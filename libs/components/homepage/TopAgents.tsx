import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopAgentCard from './TopAgentCard';
import { Member } from '../../types/member/member';
import { AgentsInquiry } from '../../types/member/member.input';
import { GET_AGENTS } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { Typography } from '@mui/material';

interface TopAgentsProps {
	initialInput: AgentsInquiry;
}

const TopAgents = (props: TopAgentsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [topAgents, setTopAgents] = useState<Member[]>([]);
	/** APOLLO REQUESTS **/

	const {
		loading: getAgentsLoading,
		data: getAgentsData,
		error: getAgentsError,
		refetch: getAgentsRefetch,
	} = useQuery(GET_AGENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopAgents(data?.getAgents?.list);
		},
	});

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className={'top-agents'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top Agents</span>
					</Stack>
					<Stack className={'wrapper'}>
						<Swiper
							className={'top-agents-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={29}
							modules={[Autoplay]}
						>
							{topAgents.map((agent: Member) => {
								return (
									<SwiperSlide className={'top-agents-slide'} key={agent?._id}>
										<TopAgentCard agent={agent} key={agent?.memberNick} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-agents'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<div className="space-y-5  md:text-center mt-10">
							<Typography
								variant="h1"
								className="mb-5 text-3xl font-semibold text-slate-900 md:text-center md:text-5xl"
							>
								Meet Our Top Agents
							</Typography>
							<p className="text-xl text-slate-900 md:text-center md:text-2xl">Top Agents always ready to serve you</p>
						</div>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'} onClick={() => router.push('/agent')}>
								<span>See All Agents</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'wrapper'}>
						<Box component={'div'} className={'switch-btn swiper-agents-prev'}>
							<ArrowBackIosNewIcon sx={{ color: 'white' }} />
						</Box>
						<Box component={'div'} className={'card-wrapper'}>
							<Swiper
								className={'top-agents-swiper'}
								slidesPerView={'auto'}
								spaceBetween={29}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-agents-next',
									prevEl: '.swiper-agents-prev',
								}}
							>
								{topAgents.map((agent: Member) => {
									return (
										<SwiperSlide className={'top-agents-slide'} key={agent?._id}>
											<div
												key={agent?._id}
												onClick={() =>
													router.push({
														pathname: '/agent/detail',
														query: { agentId: agent?._id },
													})
												}
											>
												<TopAgentCard agent={agent} key={agent?.memberNick} />
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</Box>
						<Box component={'div'} className={'switch-btn swiper-agents-next'}>
							<ArrowBackIosNewIcon sx={{ color: 'white', transform: 'rotate(180deg)' }} />
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopAgents.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'memberRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopAgents;
