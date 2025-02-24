import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Booking {
	_id: string;
	bookingType: BookingType;
	bookingStatus: BookingStatus;
	bookingLocation: BookingLocation;
	bookingTitle: string;
	bookingPrice: number;
	bookingViews: number;
	bookingLikes: number;
	bookingComments: number;
	bookingRank: number;
	bookingImages: string[];
	bookingDesc?: string;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Bookings {
	list: Booking[];
	metaCounter: TotalCounter[];
}
