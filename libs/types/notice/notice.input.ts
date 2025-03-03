import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { Direction } from '../../enums/common.enum';

export interface NoticeInput {
	noticeCategory: NoticeCategory;
	noticeTitle: string;
	noticeContent: string;
	memberId?: string;
}
export interface NoticeInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
}

export interface ANISearch {
	noticeStatus?: NoticeStatus;
	noticeCategory?: NoticeCategory;
	text?: string;
}

export interface AllNoticeInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ANISearch;
}
