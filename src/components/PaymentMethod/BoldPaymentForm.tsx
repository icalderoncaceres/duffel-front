import { useEffect, useRef } from 'react';
import { IBoldPaymentConfig } from '../../models/models';

interface IProp {
    config: IBoldPaymentConfig
}

declare global {
    var BoldCheckout: any;
}
export default function BoldPaymentForm(props: IProp) {
    const formRef = useRef(null);
    /*
    useEffect(() => {

        const script = document.createElement('script');
        script.setAttribute('data-bold-button', 'light-M');
        script.setAttribute('data-order-id', props.config.orderId);
        script.setAttribute('data-currency', props.config.currency);
        script.setAttribute('data-amount', props.config.amount);
        script.setAttribute('data-api-key', props.config.apiKey);
        script.setAttribute('data-integrity-signature', props.config.integritySignature);
        script.setAttribute('data-redirection-url', props.config.urlSuccess);
        script.setAttribute('data-description', props.config.description);
        // script.setAttribute('data-tax', props.config.tax);

        formRef.current.appendChild(script);

        // Clean up function
        return () => {
            formRef.current.removeChild(script);
        };
    }, []);
    */
    const handlePay = () => {
        const checkout = new BoldCheckout({
            orderId: props.config.orderId,
            currency: props.config.currency,
            amount: props.config.amount,
            apiKey: props.config.apiKey,
            redirectionUrl: props.config.urlSuccess,
            integritySignature: props.config.integritySignature,
            description: props.config.description,
            // tax: props.config.tax,
        });
        checkout.open();
    }

    return (
        <form>
            <div id="bold-payment-button">
                <button type="button" onClick={handlePay}>Pagar con BOLD</button>
            </div>
        </form>
    );
}
