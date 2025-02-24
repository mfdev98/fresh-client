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
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
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

interface ALPISearch {
	bookingStatus?: BookingStatus;
	bookingLocationList?: BookingLocation[];
}

export interface AllBookingsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
