import { useState, useEffect } from "react";
// import { SERVER_URL } from "../../helpers/const";
import { IFlight, IBoldPaymentConfig } from "../../models/models";
import { ReservationService } from "../../services/Reservation.service";
import Accordion from 'react-bootstrap/Accordion';
import { PaymentService } from "../../services/Payment.service";
import BoldPaymentForm from "./BoldPaymentForm";

export default function PaymentMethod() {
    const outboundFlight: IFlight = ReservationService.getOutboundFlight();
    const returnFlight: IFlight = ReservationService.getReturnFlight();
    const [message, setMessage] = useState<string>('Si realizó el pago y no capturo la imágen del comprobante, contactenos por el chat de whatsapp');

    const [paymentConfig, setPaymentConfig] = useState<IBoldPaymentConfig>(null);

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        try {
            const result = await PaymentService.uploadVoucher(file, ReservationService.getOutboundFlight().id, ReservationService.getReturnFlight().id);
            if (result) {
                setMessage('Se ha subido el archivo correctamente, en unos minutos nos contactaremos');
                setTimeout(() => {
                    document.location.href = `/summary/${outboundFlight.id}-RETURN-${returnFlight.id}`;
                }, 1000);
            } else {
                setMessage('Se presento un error subiendo el comprobante');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const fetchPaymentConfig = async () => {
        try {
            const outboundFlightId = ReservationService.getOutboundFlight().id;
            const returnFlightId = ReservationService.getReturnFlight().id;

            const response = await PaymentService.getPaymentConfig(outboundFlightId, returnFlightId);
            setPaymentConfig(response.data);
        } catch (error) {
            console.error("Failed to fetch payment config:", error);
        }
    };

    useEffect(() => {
        fetchPaymentConfig();
    }, []);

    return (
        <div className="sidebar">
            <h3 className='font-weight-bold shadow'>METODOS DE PAGO</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><i className="bi-payment bi-bank"> </i> Pago por transferencia bancaria</Accordion.Header>
                    <Accordion.Body>

                        <div className='row'>
                            <h5>REALICE LA TRANSFERENCIA A ALGUNOS DE LOS SIGUIENTES NÚMEROS DE CUENTA Y LUEGO CARGUE EL COMPROBANTE</h5>
                            <div className='col-md-12'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">País</th>
                                            <th scope="col">Banco</th>
                                            <th scope="col">Tipo de Cta.</th>
                                            <th scope="col">Número</th>
                                            <th scope="col">Titular</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Colombia</td>
                                            <td>Bancolombia</td>
                                            <td>Ahorros</td>
                                            <td>54700002114</td>
                                            <td>Yliana Carolina Perez</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <label htmlFor="input-voucher" className='alert'>Adjunte el comprobante de pago</label>
                        <input type="file" accept="image/png, image/gif, image/jpeg" name="input-voucher" className="btn btn-success btn-lg mt-3 mr-3" onChange={handleFileInput} />
                        <p className='mt-2'><b>
                            {message}
                        </b></p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><i className="bi-payment bi-cash-coin"> </i> Pago con tarjeta de crédito, PSE, Nequi o Daviplata con Wompi</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            {
                                paymentConfig ? <BoldPaymentForm config={paymentConfig}></BoldPaymentForm> : 'CARGANDO...'
                            }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
