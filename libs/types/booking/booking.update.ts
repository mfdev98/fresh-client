import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';

export interface BookingUpdate {
	_id: string;
	bookingType?: BookingType;
	bookingStatus?: BookingStatus;
	bookingLocation?: BookingLocation;
	bookingTitle?: string;
	bookingPrice?: number;
	bookingImages?: string[];
	bookingDesc?: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
