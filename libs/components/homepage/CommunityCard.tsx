import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';

interface CommunityCardProps {
  vertical: boolean;
  article: BoardArticle;
  index: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ vertical, article, index }) => {
  const device = useDeviceDetect();
  const articleImage = article?.articleImage
    ? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
    : '/img/event.svg';

  if (device === 'mobile') {
    return (
      <div className="text-white p-4 bg-slate-800 rounded-lg">
        COMMUNITY CARD (MOBILE)
      </div>
    );
  }

  return (
    <div className="text-sm leading-6 ">
      <div className="relative group ">
        <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
        <Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
          <Box 
            component="div" 
            className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5"
          >
            <div className={`flex ${vertical ? 'flex-col space-y-4' : 'items-center space-x-4'}`}>
              <div className={`${vertical ? 'w-full h-32 relative' : 'w-12 h-12'}`}>
                <img
                  src={articleImage}
                  alt={article?.articleTitle}
                  className={`${
                    vertical 
                      ? 'w-full h-full object-cover rounded-md' 
                      : 'w-12 h-12 bg-center bg-cover border rounded-full'
                  }`}
                />
                {vertical && (
                  <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className={vertical ? 'space-y-2' : ''}>
                <h3 className="text-lg font-semibold text-slate-800">{article?.articleTitle}</h3>
                <p className="text-gray-500 text-md">
                  {vertical ? (
                    article?.articleCategory
                  ) : (
                    <Moment format="DD.MM.YY">{article?.createdAt}</Moment>
                  )}
                </p>
              </div>
            </div>
          </Box>
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;