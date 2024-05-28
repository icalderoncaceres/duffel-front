import React, { useEffect, useState } from "react";
import { IPassengerData } from "../../../models/models";

interface IProps {
    n: number
    passenger: IPassengerData
    onChange: any
}

function PassengerForm(props: IProps) {

    const [type, setType] = useState<string>('Adulto');
    useEffect(() => {
        if (props.passenger.type === 'CHILD') {
            setType('Niño con asiento');
        } else if (props.passenger.type === 'INFANT') {
            setType('Bebe en brazos');
        }
    }, []);

    const onChange = (e, key: string) => {
        props.onChange(e, key);
    }

    return (
        <div className="container  ml-1 mr-1">
            <h3 className="">
                <span className="badge bg-secondary">
                    {type} {props.n}
                </span>
            </h3>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Nombre(s)</strong></label>
                    <input type="input" className="form-control" id="input-first-name" placeholder="Nombre(s)" onChange={e => onChange(e, 'first_name')} value={props.passenger.first_name} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Apellido(s)</strong></label>
                    <input type="input" className="form-control" id="input-last-name" placeholder="Apellido(s)" onChange={e => onChange(e, 'last_name')} value={props.passenger.last_name} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Tipo documento</strong></label>
                    <select className="form-select" aria-label="Default select example" onChange={e => onChange(e, 'document_type')} value={props.passenger.document_type} >
                        <option selected>Seleccione</option>
                        <option value="CC">Cedula de Ciudadania</option>
                        <option value="PA">Pasaporte</option>
                        <option value="CE">Cedula de extranjeria</option>
                    </select>
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Número documento</strong></label>
                    <input type="input" className="form-control" id="input-document-number" placeholder="Número de documento" onChange={e => onChange(e, 'document_number')} value={props.passenger.document_number} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Fecha de Nacimiento</strong></label>
                    <input type="date" className="form-control" id="input-date-born" placeholder="Fecha de Nacimiento" onChange={e => onChange(e, 'date_of_born')} value={props.passenger.date_of_born} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Fecha de Expedición</strong></label>
                    <input type="date" className="form-control" id="input-last-name" placeholder="Fecha de Expedición" onChange={e => onChange(e, 'date_issue_document')} value={props.passenger.date_issue_document} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Fecha de Vencimiento</strong></label>
                    <input type="date" className="form-control" id="input-last-name" placeholder="Fecha de Vencimiento" onChange={e => onChange(e, 'date_expired_document')} value={props.passenger.date_expired_document} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Genero</strong></label>
                    <select className="form-select" aria-label="Default select example" onChange={e => onChange(e, 'gender')} value={props.passenger.gender} >
                        <option selected>Seleccione Genero</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Correo Electónico</strong></label>
                    <input type="email" className="form-control" id="input-last-name" placeholder="Correo Electrónico" onChange={e => onChange(e, 'email')} value={props.passenger.email} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Telefono</strong></label>
                    <input type="email" className="form-control" id="input-last-name" placeholder="Telefono" onChange={e => onChange(e, 'phone')} value={props.passenger.phone} />
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Alguna condición especial?</strong></label>
                    <select className="form-select" aria-label="Default select example" onChange={e => onChange(e, 'specialCondition')} value={props.passenger.specialCondition ? 'S' : 'N'}>
                        <option selected>Seleccione</option>
                        <option value="S">Si</option>
                        <option value="N">No</option>
                    </select>
                </div>
                <div className="col-md-3 mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><strong>Dirección</strong></label>
                    <input type="input" className="form-control" id="input-last-name" placeholder="Dirección" onChange={e => onChange(e, 'address')} value={props.passenger.address} />
                </div>
            </div>

        </div>
    )
}

export default PassengerForm;