
import React, { useEffect } from 'react';
import { ReservationService } from '../services/Reservation.service';
import Flight from './Flight/Flight';
import { IFlight } from '../models/models';
import { NavLink } from 'react-router-dom';
import Summary from './Summary/Summary';
import { WorkflowService } from '../services/Workflow.service';

function Confirmation() {

    const onSelect = (f: IFlight, type: 'OUTBOUND' | 'RETURN') => {
        console.log('DO NOT DO ANYTHING');
    }
    const outboundFlight = ReservationService.getOutboundFlight();
    const returnFlight = ReservationService.getReturnFlight();
    
    useEffect(() => {
        window.parent.postMessage({ key: 'SHOW_SEARCH_BAR', value: true }, '*');
        WorkflowService.setStep(2);
    }, []);

    return (
        <React.Fragment>
            <div className='container'>
            <h1 className='font-weight-bold shadow'>
                CONFIRME SU SELECCIÓN</h1>            
            <div className="movil container d-flex flex-md-row  flex-sm-column p-2 justify-content-between">
                <div className="col-md-6 mt-4 m-1">
                    <h1 className='font-weight-light'>Vuelo de ida</h1>
                    <Flight 
                        flight={outboundFlight}
                        isSelected={true}
                        onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                        type="OUTBOUND"
                    ></Flight>
                </div>
                <div className="col-md-6 mt-4 m-1">
                <h1 className='font-weight-light'>Vuelo de regreso</h1>
                    <Flight 
                        flight={returnFlight}
                        isSelected={true}
                        onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                        type="RETURN"
                    ></Flight>
                </div>
            </div>
            <Summary outboundFlight={outboundFlight} returnFlight={returnFlight}></Summary>
            
            <NavLink className="btn btn-primary btn-lg mt-3 " to={`/passengers/${outboundFlight.id}-RETURN-${returnFlight.id}`}>Continuar</NavLink>
            </div>
        </React.Fragment>
    );
}

export default Confirmation;