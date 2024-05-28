import { useEffect, useState } from "react";
import { ReservationService } from "../services/Reservation.service";
import { PassengerService } from "../services/Passenger.service";
import PassengerForm from "./Passenger/PassengerForm/PassengerForm";
import { NavLink } from "react-router-dom";
import React from 'react';
import { IPassengerData } from "../models/models";
import { SERVER_URL, VALIDATE_PASSENGER } from '../helpers/const';
import { WorkflowService } from '../services/Workflow.service';

function Passengers() {
    const validateForm = (e: any) => {
        PassengerService.setAdults(adultsForm);
        PassengerService.setChildren(childrenForm);
        PassengerService.setInfants(infantsForm);
        
        if (PassengerService.validate() !== VALIDATE_PASSENGER.PASSENGER_VALIDATED) {
            e.preventDefault();
            if (PassengerService.validate() === VALIDATE_PASSENGER.MISSING_DATA) {
                setErrMsg('Por favor complete todos los datos de los pasajeros');
                return;
            }
            if (PassengerService.validate() === VALIDATE_PASSENGER.DATE_NOT_VALID) {
                setErrMsg('La fecha de nacimiento no es valida, por favor revise las fechas');
                return;
            }
        }
    }

    const [errMsg, setErrMsg] = useState<string>('');

    const [adultsForm, setAdultsForm] = useState<IPassengerData[]>(PassengerService.getAdults());
    const [childrenForm, setChildrenForm] = useState<IPassengerData[]>(PassengerService.getChildren());
    const [infantsForm, setInfantsForm] = useState<IPassengerData[]>(PassengerService.getInfants());
    useEffect(() => {
        (async() => {
            const data = {
                outbound: ReservationService.getOutboundFlight(),
                return: ReservationService.getReturnFlight(),
            }
            const body = JSON.stringify(data);
            const url = `${SERVER_URL}/startSell`;;
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body,
                });
                const result = await response.json();
                console.log('Result::', result);
                if (result.code !== 200) {
                    alert('Es vergonsozo pero ocurrio un error, por favor vuelva a intentarlo');    
                    return;
                }
            } catch (error) {
                alert('Es vergonsozo pero ocurrio un error, por favor vuelva a intentarlo');
                window.parent.postMessage({key: 'PM_FINISH', value: true}, '*');
                return;
            }
        })();
        window.parent.postMessage({key: 'SHOW_SEARCH_BAR', value: false} , '*');
        WorkflowService.setStep(3);
    },[]);

    const onChange = (e: any, key: string, pos: number, type: 'ADULT' | 'CHILD' | 'INFANT' ) => {
        if (type === 'ADULT') {
            const updatedArr = [...adultsForm];
            updatedArr[pos] = {
                ...updatedArr[pos],
                [key]: e.target.value
            };
            setAdultsForm(updatedArr);
        } else if (type === 'CHILD') {
            const updatedArr = [...childrenForm];
            updatedArr[pos] = {
                ...updatedArr[pos],
                [key]: e.target.value
            };
            setChildrenForm(updatedArr);           
        } else {
            const updatedArr = [...infantsForm];
            updatedArr[pos] = {
                ...updatedArr[pos],
                [key]: e.target.value
            };
            setInfantsForm(updatedArr); 
        }
    }
    return (
        <React.Fragment>
        <div className="container">
        <div><h1 className="font-weight-bold shadow col-12">Información de pasajeros</h1></div>
         <form className=" bg-light bg-opacity-75 border border-3 rounded" action="">
            {
                adultsForm.map((passenger: IPassengerData, index: number) => (<PassengerForm key={index} passenger={passenger} n={index + 1} onChange={(e, key: string) => onChange(e, key, index, 'ADULT')}></PassengerForm>))
            }

            {
                childrenForm.map((passenger: IPassengerData, index: number) => (<PassengerForm key={index} passenger={passenger} n={index + 1} onChange={(e, key: string) => onChange(e, key, index, 'CHILD')}></PassengerForm>))
            }

            {
                infantsForm.map((passenger: IPassengerData, index: number) => (<PassengerForm key={index} passenger={passenger} n={index + 1} onChange={(e, key: string) => onChange(e, key, index, 'INFANT')}></PassengerForm>))
            } 
            { 
            errMsg ? <span className="alert alert-danger">{errMsg}</span> : null 
            }
            </form>
             <NavLink className="btn btn-primary btn-lg mt-3" to={`/payment/${ReservationService.getOutboundFlight().id}-RETURN-${ReservationService.getReturnFlight().id}`} onClick={e => validateForm(e)}>Continuar</NavLink>

            </div>
        </React.Fragment>
    )
}

export default Passengers;