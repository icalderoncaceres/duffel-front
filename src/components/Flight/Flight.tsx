import { useState } from "react";
import { IFlight, ISegment, ISlice } from "../../models/models";


interface IProp {
    flight: IFlight
    onSelect: any
    type: 'OUTBOUND' | 'RETURN'
    isSelected?: boolean
    onClickScroll?: () => void
}

function Flight(props: IProp) {
    const departureDate = new Date(props.flight.slices[0].segments[0].departing_at);
    const arrivalDate = new Date(props.flight.slices[0].segments[0].arriving_at);

    //let stops = 'Sin paradas';
    //if (props.flight.slices[0].segments[0].stops.length > 0) {
    //   stops = props.flight.slices[0].segments[0].stops.length + ' Paradas';
    //}

    const [show, setShow] = useState<boolean>(false);
    const showDetail = () => {
        setShow(!show);
    }

    

    const onSelect = () => {
        props.onSelect(props.flight, props.type);        
    }

    const handleButton = () => {
      onSelect();
      props.onClickScroll(); 
    }

    let detailTag;
    if (show) {
        detailTag = props.flight.slices.map((slice: ISlice, index: number) => {
            const title = index === 0 ? <b>Vuelo de Ida</b> : <b>Vuelo de Regreso</b>;
            let baggage = 'Con bolso de mano';
            const rows = slice.segments.map((segment: ISegment, index2: number) => {
                if (segment.passengers[0].baggages.length === 1) {
                    if (segment.passengers[0].baggages[0].type === "carry_on") {
                        baggage = 'Con bolso de mano y maleta de 10 kg';
                    } else {
                        baggage = 'Con bolso de mano y equipaje de bodega';
                    }
                } else if(segment.passengers[0].baggages.length > 1) {
                    const hasCarryOnBaggage = segment.passengers[0].baggages.find((item: {type: string, quanty: number} ) => item.type === 'carry_on' && item.quanty > 0);
                    if (hasCarryOnBaggage) {
                        baggage = 'Con bolso de mano y maleta de 10 kg';
                    }
                    const hasCheckedBaggage = segment.passengers[0].baggages.find((item: {type: string, quanty: number} ) => item.type === 'checked' && item.quanty > 0);
                    if (hasCheckedBaggage) {
                        baggage = baggage + ' y equipaje de bodega';
                    }
                }
                return (
                    <tr key={index2}>
                        <td>{segment.origin.city_name} ({segment.origin.iata_code})</td>
                        <td>{segment.departing_at}</td>
                        <td>{segment.destination.city_name} ({segment.destination.iata_code})</td>
                        <td>{segment.arriving_at}</td>
                        <td><b>Duración:</b>{segment.duration}</td>
                    </tr>
                );
            });
            return (
                <table className="table border-top">
                    <caption className="table caption-top p-4">{title}<span className="badge bg-dark"> {slice.segments.length === 1 ? 'Vuelo Directo' : 'Vuelo con escalas'} {baggage}</span></caption>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        });
    }
    return (

        <div className="card p-2 border border-4 border-rounded-5 border-success border-opacity-50">
            <div className="card-body">
                <div className="container row pt-1">
                    <div className="col-7">
                        <span className="badge bg-secondary">{props.flight.slices[0].segments[0].passengers[0].cabin_class_marketing_name}</span>
                        <h3 className="">{props.flight.total_currency} {new Intl.NumberFormat('de-DE').format(props.flight.total_amount)}</h3>
                    </div>
                    <div className="col-5 d-flex form-check pb-4">
                        <button className={`btn  ${props.isSelected ? 'btn-primary' : 'btn-secondary'}`} onClick={handleButton}>{props.isSelected ? 'Seleccionado' : 'Seleccionar'} <i className="bi bi-check2-circle bi-select"></i></button>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <span className="badge bg-dark">{departureDate.toDateString()}</span>
                                </div>
                                <div className="col-4">
                                    <img alt={props.flight.owner.name} title={props.flight.owner.name} height="32" width="32"
                                        src={props.flight.owner.logo_symbol_url} />
                                    <span className=""> {props.flight.owner.name} ({props.flight.owner.iata_code})</span>
                                    <span className=""></span>
                                </div>
                                <div className="col-4">
                                    <span className="badge bg-dark">{arrivalDate.toDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={showDetail} >{show ? 'Ocultar detalle' : 'Ver detalle'}</button>
                        </div>
                    </div>
                </div>
            </div>
            {detailTag}
        </div>
    )
}

export default Flight;