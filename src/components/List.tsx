import React, { useState, useEffect} from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { IFlight } from '../models/models';
import Flight from './Flight/Flight';
import Summary from './Summary/Summary';
import { ReservationService } from '../services/Reservation.service';
import { PassengerService } from '../services/Passenger.service';
import { SERVER_URL } from '../helpers/const';
import { WorkflowService } from '../services/Workflow.service';
import Forbidden from './Forbidden';

function List() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'RETURN';
    const outboundAirport = searchParams.get('outboundAirport') || 'BOG';
    const returnAirport = searchParams.get('returnAirport') || 'MAD';
    const outboundDate = searchParams.get('outboundDate') || '01-01-2000';
    const returnDate = searchParams.get('returnDate') || '02-02-2023';
    const offer = searchParams.get('offer') || '144038';
    const adults = Number(searchParams.get('adults')) || 0;
    const infants = Number(searchParams.get('infants')) || 0;
    const children = Number(searchParams.get('children')) || 0;
    const interval3Days = searchParams.get('returnAirport') || 'NO';
    const nonStop = searchParams.get('nonStop') || 'NO';
    const currency = searchParams.get('currency') || 'COP';

    const [outbounds, setOutbounds] = useState([]);
    const [returns, setReturns] = useState([]);
    const [complete, setComplete] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [pageOutbouns, setPageOutbounds] = useState<number>(1);
    const [pageReturns, setPageReturns] = useState<number>(1);

    const scrollRef = (anchorid:any) => { window.location.hash = '#' + anchorid};
    
    const changePage = (index: number, isReturn?: boolean) => {
        if (isReturn) {
            setPageReturns(index);
        } else {
            setPageOutbounds(index);
        }
    }
    const onSelect = (f: IFlight, type: 'OUTBOUND' | 'RETURN') => {
        if (type === 'OUTBOUND') {
            setSelectedOutbound(f);
            ReservationService.setOutboundFlight(f);
        } else {
            setSelectedReturn(f);
            ReservationService.setReturnFlight(f);
        }
    }

    const [selectedOutbound, setSelectedOutbound] = useState<IFlight>(null);
    const [selectedReturn, setSelectedReturn] = useState<IFlight>(null);

    useEffect(() => {
        if (load) {
            return;
        }
        setLoad(true);
        window.parent.postMessage({ key: 'SHOW_SEARCH_BAR', value: true}, '*');
        const data: any = {
            mode,
            outboundAirport,
            returnAirport,
            outboundDate,
            returnDate,
            offer,
            adults,
            infants,
            children,
            interval3Days,
            nonStop,
            currency
        }
        const body = JSON.stringify(data);
        const url = `${SERVER_URL}/getFlights`;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body,
        }).then(result => result.json())
            .then(result => {
                if (result.outboundFlights) {
                    setOutbounds(result.outboundFlights);
                    setReturns(result.returnFlights);
                    setComplete(true);
                } else {
                    setError(true);
                }
        }).catch(err => setError(true));
        ReservationService.setNumberPassengersAdults(adults);
        ReservationService.setNumberPassengersChildren(children);
        ReservationService.setOutNumberPassengersInfants(infants);
        ReservationService.setOffer(offer);
        PassengerService.initAll(adults, children, infants);
        WorkflowService.setStep(1);
    }, []);
    let htmlToRender = <h1>ESPERE CARGANDO...</h1>;

    if (error) {
        htmlToRender = <Forbidden/>
    } else {
        if (complete) {
            const arrPages = [];
            let j = 0;
            for (let i = 0; i < outbounds.length; i += 8) {
                j++;
                arrPages.push(j);
            }
            const arrPages2 = [];
            let j2 = 0;
            for (let i = 0; i < returns.length; i += 8) {
                j2++;
                arrPages2.push(j2);
            }
            let pagination1Tag = <nav aria-label="Page navigation example" className="mt-4 mp-6">
                <ul className="pagination justify-content-center">
                    {
                        arrPages.map((i: number) => {
                            return (<li key={'page-' + i} className={`page-item ${i === pageOutbouns ? 'active' : ''}`}><button className="page-link" onClick={() => changePage(i)}>{i}</button></li>)
                        })
                    }
                </ul>
            </nav>
            let pagination2Tag = <nav aria-label="Page navigation example" className="mt-4 mp-6">
                <ul className="pagination justify-content-center">
                    {
                        arrPages2.map((i: number) => {
                            return (<li key={'page-' + i}className={`page-item ${i === pageReturns ? 'active' : ''}`}><button className="page-link" onClick={() => changePage(i, true)}>{i}</button></li>)
                        })
                    }
                </ul>
            </nav>
            let returnTag;
            if (returns && returns.length > 0) {
                returnTag = 
                    <div>
                    <h1 className="text-center font-weight-bold shadow" id='scrollGo'>SELECCIONA VUELO DE REGRESO</h1>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-10">
                            <div className="row">
                                {
                                    returns.slice((pageReturns - 1) * 8, ((pageReturns - 1) * 8) + 8).map((flight: IFlight, index: number) => {
                                        return (
                                            <div key={index} className="col-12 col-md-6  mt-4">
                                                <Flight 
                                                    flight={flight} 
                                                    onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                                                    type={'RETURN'}
                                                    isSelected={selectedReturn && flight.id === selectedReturn.id}
                                                    onClickScroll={()=>scrollRef("")}                 
                                                ></Flight>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-2">
                            PUBLICIDAD
                        </div>
                    </div>
                    {pagination2Tag}
                </div>
            }
            htmlToRender = <React.Fragment>
               
                <div className="container pt-4"  id="container-results">
                    
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-10">
                            <h1 className="text-center font-weight-bold shadow">SELECCIONA VUELO DE IDA</h1>
                            <div className="row">
                                {
                                    outbounds.slice((pageOutbouns - 1) * 8, ((pageOutbouns - 1) * 8) + 8).map((flight: IFlight, index: number) => {
                                        return (
                                            <div key={index} className="col-12 col-md-6  mt-4">
                                                <Flight 
                                                    flight={flight} 
                                                    onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                                                    type={'OUTBOUND'}
                                                    isSelected={selectedOutbound && flight.id === selectedOutbound.id}
                                                    onClickScroll={()=>scrollRef("")}
                                                ></Flight>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-2">
                            PUBLICIDAD
                        </div>
                    </div>
                    {pagination1Tag}
                    {returnTag}
                </div>
                {
                    selectedOutbound && selectedReturn ?
                        <React.Fragment>
                        <Summary 
                            id='scrollGo'
                            outboundFlight={selectedOutbound}
                            returnFlight={selectedReturn}
                        ></Summary><NavLink className="btn btn-primary btn-lg" to={`confirmation/${selectedOutbound.id}-RETURN-${selectedReturn.id}`}>Continuar</NavLink>
                        <p className="lead text-center">
                            Sistema construido por <a href="https://zoomtechnology.co" target="_blank">ZOOMTECHNOLOGY SAS</a>
                        </p></React.Fragment> : null
                }
            </React.Fragment>
        }
    }
    return (
        htmlToRender   
    );
}

export default List;