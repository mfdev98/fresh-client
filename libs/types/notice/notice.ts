import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { Member } from '../member/member';

export interface NoticeType {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	createdAt: Date;
	updatedAt: Date;
	memberId: string;
	memberData?: Member;
}

export interface TotalCounter {
	total: number;
}

export interface Notices {
	list: NoticeType[];
	metaCounter?: TotalCounter[];
}
