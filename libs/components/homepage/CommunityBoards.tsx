import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { T } from '../../types/common';

const CommunityBoards: React.FC = () => {
	const device = useDeviceDetect();
	const [searchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);

	const { loading: getNewsArticlesLoading, data: getNewsArticlesData } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: { ...searchCommunity, limit: 6, search: { articleCategory: BoardArticleCategory.NEWS } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		},
	});

	const { loading: getFreeArticlesLoading, data: getFreeArticlesData } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: { ...searchCommunity, limit: 3, search: { articleCategory: BoardArticleCategory.FREE } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFreeArticles(data?.getBoardArticles?.list);
		},
	});

	return (
		<section id="community-boards" className="py-20 bg-white">
			<div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
				<div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
					<div className="mb-12 space-y-5 md:mb-16 md:text-center">
						<Typography variant="h1" className="mb-5 text-3xl font-semibold text-slate-900 md:text-center md:text-5xl">
							COMMUNITY BOARD HIGHLIGHTS
						</Typography>
						<p className="text-xl text-slate-900 md:text-center md:text-2xl">
							Explore what our community is talking about
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
					{/* News Section */}
					<div className="space-y-8">
						<div className="relative p-6 space-y-6 rounded-lg bg-white ring-1 ring-gray-900/5">
							<Link href="/community?articleCategory=NEWS" className="flex items-center ">
								<div className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
									<span className="text-lg font-semibold text-slate-800">News</span>
									<ArrowBackIosNewIcon sx={{ width: '16px', color: 'slate-800', transform: 'rotate(180deg)' }} />
								</div>
							</Link>
							<div className="space-y-6">
								{getNewsArticlesLoading ? (
									<p className="text-gray-300">Loading...</p>
								) : (
									newsArticles.map((article, index) => (
										<CommunityCard key={article?._id} vertical={true} article={article} index={index} />
									))
								)}
							</div>
						</div>
					</div>

					{/* Free Section */}
					<div className="space-y-8">
						<div className="relative p-6 space-y-6 rounded-lg bg-white ring-1 ring-gray-900/5">
							<Link href="/community?articleCategory=FREE" className="flex items-center">
								<div className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
									<span className="text-lg font-semibold text-slate-800">Free</span>
									<ArrowBackIosNewIcon sx={{ width: '16px', color: 'slate-800', transform: 'rotate(180deg)' }} />
								</div>
							</Link>
							<div className="space-y-6">
								{getFreeArticlesLoading ? (
									<p className="text-gray-300">Loading...</p>
								) : (
									freeArticles.map((article, index) => (
										<CommunityCard key={article?._id} vertical={false} article={article} index={index} />
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CommunityBoards;
