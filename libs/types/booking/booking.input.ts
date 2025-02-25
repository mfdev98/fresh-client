import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';
import { Direction } from '../../enums/common.enum';

export interface BookingInput {
	bookingType: BookingType;
	bookingLocation: BookingLocation;
	bookingTitle: string;
	bookingPrice: number;
	bookingImages: string[];
	bookingDesc?: string;
	memberId?: string;
	constructedAt?: Date;
}

interface BISearch {
	memberId?: string;
	locationList?: BookingLocation[];
	typeList?: BookingType[];
	options?: string[];
	priceRange?: Range;
	periodRange?: PeriodRange;
	text?: string;
}

export interface BookingsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: BISearch;
}

interface ABISearch {
	bookingStatus?: BookingStatus;
}

export interface AgentBookingsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ABISearch;
}

interface ALBISearch {
	bookingStatus?: BookingStatus;
	bookingLocationList?: BookingLocation[];
}

export interface AllBookingsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALBISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodRange {
	start: Date | number;
	end: Date | number;
}
