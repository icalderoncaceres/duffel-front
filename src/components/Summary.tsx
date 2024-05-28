import { useState, useEffect } from "react"; 
import image from '../assets/images/estado-de-reserva.jpeg';
import { WorkflowService } from "../services/Workflow.service";

function Summary() {
    const [state] = useState<string>('PENDIENTE');
    const [reservationNumber] = useState<string>('');
    const reload = () => {
        window.parent.postMessage({ key: 'GET_STEP', value: 5 }, '*');
    }
    useEffect(() => {
        window.parent.postMessage({ key: 'SHOW_SEARCH_BAR', value: false }, '*');
        WorkflowService.setStep(5);
    }, []);
    return (
        <>
            <hr/>
            <h1>ESTADO DE LA RESERVA {state} NUMERO {reservationNumber}</h1>
            <hr />
            <img src={image} alt="zoomviaje.com" />
            <hr/>
            <button type="button" className="btn btn-primary btn-lg" onClick={reload}>Ir a buscar</button>
        </>

    )
}

export default Summary;