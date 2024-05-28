
export interface IFlight {
    allowed_passenger_identity_document_types: string[]
    base_amount: number,
    base_currency: string,
    conditions: ICondition
    created_at: string
    expires_at: string
    id: string
    live_mode: boolean
    owner: {
        name: string
        logo_symbol_url: string
        id: string
        iata_code: string
    }
    partial: boolean
    passengers: IPassenger[]
    passenger_identity_documents_required: boolean
    payment_requirements: {
        requires_instant_payment: boolean
        price_guarantee_expires_at: string
        payment_required_by: string
    }
    supported_passenger_identity_document_types: string[]
    slices: ISlice[]
    tax_amount: number
    tax_currency: string
    total_amount: number
    total_currency: string
    total_emissions_kg: string
    total_fee_offer_amount: number
    total_fee_admin_amount: number
    total_fee_duffel_amount: number
    updated_at: string
}

interface IPassenger {
    age: string
    type: string
    id: string
    given_name: string
    fare_type: string
    family_name: string
}

export interface ISlice {
    segments: ISegment[]
    origin_type: string
    origin: any
    id: string
    fare_brand_name: string
    duration: string
    destination_type: string
    destination: any
    conditions: any
}

export interface ISegment {
    stops: any[]
    passengers: {
        passenger_id: string
        fare_basis_code: string
        cabin_class_marketing_name: string
        cabin_class: string
        cabin: {
            name: string
            marketing_name: string
            amenities: any

        }
        baggages: {
            type: string
            quanty: number
        }[]
    }[]
    origin_terminal: string
    origin: IPlace
    operating_carrier_flight_number: string
    operating_carrier: ICarrier
    marketing_carrier_flight_number: string
    marketing_carrier: ICarrier
    id: string
    duration: string
    distance: string
    destination_terminal: string
    destination: IPlace
    departing_at: string
    arriving_at: string
    aircraft: {
        name: string
        id: string
        iata_code: string 
    }
}

interface ICondition {
    change_before_departure: {
        penalty_currency: string
        penalty_amount: string
        allowed: boolean
    }
}

interface ICarrier {
    name: string
    logo_symbol_url: string
    logo_lockup_url: string
    id: string
    iata_code: string
    conditions_of_carriage_url: null
}

interface IPlace {
    type: string
    time_zone: string
    name: string
    longitude: string
    latitude: string
    id: string
    icao_code: string
    iata_country_code: string
    iata_code: string
    iata_city_code: string
    city_name: string
    city: string
    airports: string
}

export interface IPassengerData {
    first_name: string
    last_name: string
    date_of_born: string
    date_expired_document: string
    date_issue_document: string
    gender: 'F' | 'M'
    document_type: 'CC' | 'PA' | 'CE'
    document_number: string
    address: string
    email: string
    phone: string
    specialCondition?: boolean
    type: 'ADULT' | 'CHILD' | 'INFANT'
}

export const EMPTY_PASSENGER:IPassengerData = {
    first_name: '',
    last_name: '',
    address: '',
    gender: 'M',
    date_issue_document: '',
    date_expired_document: '',
    date_of_born: '',
    document_type: 'PA',
    document_number: '',
    email: '',
    phone: '',
    specialCondition: false,
    type: 'ADULT',
}

export interface IPaymentConfig {
    publicKey: string,
    currency: string,
    amountInCents: string,
    reference: string,
    signatureIntegrity: string,
    urlSuccess: string
}

export interface IBoldPaymentConfig {
    orderId: string,
    currency: string,
    amount: string,
    apiKey: string,
    integritySignature: string,
    urlSuccess: string,
    description: string,
    tax: string,
}
