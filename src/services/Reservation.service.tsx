import { IFlight } from "../models/models";

interface IDates {
    mode: string,
    outboundDate: string,
    returnDate: string
}

export class ReservationService {
    private static OUTBOUND_FLIGHT: IFlight;
    private static RETURN_FLIGHT: IFlight;
    private static NUMBER_PASSENGERS_ADULTS: number;
    private static NUMBER_PASSENGERS_CHILDREN: number;
    private static NUMBER_PASSENGERS_INFANTS: number;
    private static OFFER: string;
    private static DATES: IDates;

    static getOutboundFlight(): IFlight {
        return ReservationService.OUTBOUND_FLIGHT;
    }

    static getReturnFlight(): IFlight {
        return ReservationService.RETURN_FLIGHT;
    }

    static setOutboundFlight(flight: IFlight): void {
        ReservationService.OUTBOUND_FLIGHT = flight;
    }

    static setReturnFlight(flight: IFlight): void {
        ReservationService.RETURN_FLIGHT = flight;
    }

    static getNumberPassengersAdults(): number {
        return ReservationService.NUMBER_PASSENGERS_ADULTS;
    }

    static getNumberPassengersChildren(): number {
        return ReservationService.NUMBER_PASSENGERS_CHILDREN;
    }

    static getNumberPassengersInfants(): number {
        return ReservationService.NUMBER_PASSENGERS_INFANTS;
    }

    static getOffer(): string {
        return ReservationService.OFFER;
    }

    static getDates(): IDates {
        return ReservationService.DATES;
    }

    static setNumberPassengersAdults(n: number): void {
        ReservationService.NUMBER_PASSENGERS_ADULTS = n;
    }

    static setNumberPassengersChildren(n: number): void {
        ReservationService.NUMBER_PASSENGERS_CHILDREN = n;
    }

    static setOutNumberPassengersInfants(n: number): void {
        ReservationService.NUMBER_PASSENGERS_INFANTS = n;
    }

    static setOffer(offer: string): void {
        ReservationService.OFFER = offer;
    }

    static setDates(dates: IDates) {
        ReservationService.DATES = dates;
    }
}
