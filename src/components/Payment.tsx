import React, { useEffect } from 'react';
import { IFlight } from '../models/models';
import { ReservationService } from '../services/Reservation.service';
import Flight from './Flight/Flight';
import Summary from './Summary/Summary';
//import { PaymentService } from '../services/Payment.service';
import { PassengerService } from '../services/Passenger.service';
//import { SERVER_URL } from '../helpers/const';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import { WorkflowService } from '../services/Workflow.service';
/*enum PAYMENT_TYPES {
    CASH = 'CASH',
    PSE = 'PSE',
    CREDIT_CARD = 'CREDIT_CARD'
}*/


function Payment() {
    const onSelect = (f: IFlight, type: 'OUTBOUND' | 'RETURN') => {
        console.log('DO NOT DO ANYTHING');
    }

    //const [,setSelectedFile] = useState<string>('');
    //const [message, setMessage] = useState<string>('Si realizó el pago y no capturo la imágen del comprobante, contactenos por el chat de whatsapp');
    /*const redirectSafePayment = async (type: PAYMENT_TYPES) => {
        const url = `${SERVER_URL}/getUrlPayment`;
        const body = JSON.stringify({
            type,
            outboundFlight,
            returnFlight
        });
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body,
            });
            const result = await response.json();
            document.location.replace(result.url);
        } catch (error) {
            alert('Esto es vergonzoso, por favor vuelva a intentarlo');
        }
    }

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        try {
            const result = await PaymentService.uploadVoucher(file, ReservationService.getOutboundFlight().id, ReservationService.getReturnFlight().id);
            if (result) {
                setMessage('Se ha subido el archivo correctamente, en unos minutos nos contactaremos');
                setTimeout(() => {
                    document.location.href = `/sumary/${outboundFlight.id}-RETURN-${returnFlight.id}`;
                }, 1000);
            } else {
                setMessage('Se presento un error subiendo el comprobante');
            }
        } catch (error) {
            console.log(error);
        }

    }

   /* const onFinish = async (e) => {
        e.preventDefault();
        alert('Finalizamos la compra');
    } */

    const outboundFlight: IFlight = ReservationService.getOutboundFlight();
    const returnFlight: IFlight = ReservationService.getReturnFlight();
    
    useEffect(() => {
        (async () => {
            const outboundId = ReservationService.getOutboundFlight().id;
            const returnId = ReservationService.getReturnFlight().id;
            await PassengerService.save(outboundId, returnId);
            window.parent.postMessage({ key: 'SHOW_SEARCH_BAR', value: false }, '*');
        })();
        WorkflowService.setStep(4);
    },[]);

    return (
        <div className='p-5'>
        <div className='col-12'><h1 className='font-weight-bold shadow col-12'>RESÚMEN DE SU COMPRA</h1></div>
        <div className='movil  d-flex flex-lg-row flex-md-column flex-sm-column'>
            <div className='movil d-flex flex-sm-column flex-md-column '>
                    <div className="col-11 col-md-10 col-lg-11 mt-4">
                            <h1>Vuelo de ida</h1>
                            <Flight
                                flight={outboundFlight}
                                isSelected={true}
                                onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                                type="OUTBOUND"
                                onClickScroll={()=> false}
                            ></Flight>
                        </div>
                        <div className="col-11 col-md-10 col-lg-11 mt-4">
                            <h1>Vuelo de regreso</h1>
                            <Flight
                                flight={returnFlight}
                                isSelected={true}
                                onSelect={(f: IFlight, type: 'OUTBOUND' | 'RETURN') => onSelect(f, type)}
                                type="RETURN"
                                onClickScroll={()=> false}
                            ></Flight>
                        </div>
                        <Summary outboundFlight={outboundFlight} returnFlight={returnFlight}></Summary>
            </div>

            <div className='container col-lg-6'>
                < PaymentMethod />
            </div>     
        </div>     

    </div>
    )
}

export default Payment;