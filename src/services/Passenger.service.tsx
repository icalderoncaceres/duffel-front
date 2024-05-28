
import { IPassengerData, EMPTY_PASSENGER } from "../models/models";
import { SERVER_URL, VALIDATE_PASSENGER } from '../helpers/const';

export class PassengerService {
    private static ADULTS: IPassengerData[];
    private static CHILDREN: IPassengerData[];
    private static INFANTS: IPassengerData[];
    private static CAN_SAVE: boolean = true;

    static initAdults(n: number) {
        PassengerService.ADULTS = Array(n).fill({...EMPTY_PASSENGER});
        console.log('Pasajeros::', PassengerService.ADULTS);
    }

    static initChildren(n: number) {
        PassengerService.CHILDREN = Array(n).fill({...EMPTY_PASSENGER, type: 'CHILD' });
    }

    static initInfants(n: number) {
        PassengerService.INFANTS = Array(n).fill({...EMPTY_PASSENGER, type: 'INFANT'});
    }

    static initAll(nAdults: number, nChildren: number, nInfants: number) {
        PassengerService.initAdults(nAdults);
        PassengerService.initChildren(nChildren);
        PassengerService.initInfants(nInfants);
    }

    static getAdults(): IPassengerData[] {
        return PassengerService.ADULTS;
    }

    static getChildren(): IPassengerData[] {
        return PassengerService.CHILDREN;
    }

    static getInfants(): IPassengerData[] {
        return PassengerService.INFANTS;
    }

    static getAll(): IPassengerData[] {
        const allPassengers = [...PassengerService.ADULTS, ...PassengerService.CHILDREN, ...PassengerService.INFANTS]; 
        return allPassengers;
    }

    static setAdults(arr: IPassengerData[]): void {
        PassengerService.ADULTS = arr;
    }

    static setChildren(arr: IPassengerData[]): void {
        PassengerService.CHILDREN = arr;
    }

    static setInfants(arr: IPassengerData[]): void {
        PassengerService.INFANTS = arr;
    }

    static validate(): VALIDATE_PASSENGER {
        let state: VALIDATE_PASSENGER = VALIDATE_PASSENGER.PASSENGER_VALIDATED;
        [...PassengerService.ADULTS, ...PassengerService.CHILDREN, ...PassengerService.INFANTS].forEach((passenger: IPassengerData) => {
            if (passenger.first_name === "" || 
                passenger.last_name === ""  ||
                passenger.date_of_born === "" ||
                passenger.date_expired_document === "" ||
                passenger.date_issue_document === "" ||
                passenger.address === "" ||
                passenger.email === "" ||
                passenger.phone === ""
            ) {
                state = VALIDATE_PASSENGER.MISSING_DATA;
                return;
            }
            if (passenger.type === 'ADULT' && passenger.date_of_born > passenger.date_expired_document) {
                state = VALIDATE_PASSENGER.DATE_NOT_VALID;
                return;
            }
        }); 
        return state;
    }

    static async save(outboundId: string, returnId: string): Promise<void> {
        if (!PassengerService.CAN_SAVE) {
            setTimeout(() => {
                PassengerService.CAN_SAVE = true;
            }, 2000);
            return;
        }
        const data = {
            outboundId,
            returnId,
            adults: PassengerService.ADULTS,
            children: PassengerService.CHILDREN,
            infants: PassengerService.INFANTS
        }
        try {
            PassengerService.CAN_SAVE = false;
            await fetch(`${SERVER_URL}/setPassengers`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log('Reintentar cargar pasajeros');
        }
    }
}
