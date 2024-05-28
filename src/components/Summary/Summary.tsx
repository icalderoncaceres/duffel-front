import { IFlight } from "../../models/models";
import React from 'react';

interface IProps {
    outboundFlight: IFlight
    returnFlight: IFlight
    id? : string;
}

function Summary(props: IProps) {
    const getTax_amount = () => +props.outboundFlight.tax_amount + props.returnFlight.tax_amount;
    
    const getBase_amount = () => +props.outboundFlight.base_amount + props.returnFlight.base_amount;
    
    const getTotal_amount = () => +props.outboundFlight.total_amount + props.returnFlight.total_amount;
    
    // const style = { style: 'currency',currency: props.outboundFlight.base_currency, currencySign: "accounting" };
    // const getFee = () => getTotal_amount() - (getBase_amount() + getTax_amount());
    const getFee = () => props.outboundFlight.total_fee_admin_amount + props.outboundFlight.total_fee_offer_amount + props.returnFlight.total_fee_admin_amount + props.returnFlight.total_fee_offer_amount;
    return (
        <React.Fragment>
            <table className="container table table-bordered table-hover mt-5">
                <tbody>
                <tr>
                    <td>
                        <h4>Precio Base</h4>
                    </td>
                    <td>
                        <h4>{props.outboundFlight.base_currency} {new Intl.NumberFormat('de-DE').format(getBase_amount())}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Impuestos</h4>
                    </td>
                    <td>
                    <h4>{props.outboundFlight.base_currency} {new Intl.NumberFormat('de-DE').format(getTax_amount())}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Fee administrativo</h4>
                    </td>
                    <td>
                        <h4>{props.outboundFlight.base_currency} {new Intl.NumberFormat('de-DE').format(getFee())}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Otros cargos</h4>
                    </td>
                    <td>
                    <h4>{props.returnFlight.base_currency} {new Intl.NumberFormat('de-DE').format(props.outboundFlight.total_fee_duffel_amount + props.returnFlight.total_fee_duffel_amount)}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>TOTAL</h3>
                    </td>
                    <td>
                        <h3>{props.returnFlight.base_currency} {new Intl.NumberFormat('de-DE').format(getTotal_amount())}</h3>
                    </td>
                </tr>
                </tbody>
            
            </table>
        </React.Fragment>
    )
}

export default Summary;