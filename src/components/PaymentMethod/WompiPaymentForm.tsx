import { useEffect, useRef } from 'react';
import { IPaymentConfig } from '../../models/models';

interface IProp {
    config: IPaymentConfig
}
export default function WompiPaymentForm(props: IProp) {
    const formRef = useRef(null);
    useEffect(() => {

        const script = document.createElement('script');
        script.src = "https://checkout.wompi.co/widget.js";
        script.async = true;

        // Set data attributes
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', props.config.publicKey);
        script.setAttribute('data-currency', props.config.currency);
        script.setAttribute('data-amount-in-cents', props.config.amountInCents);
        script.setAttribute('data-reference', props.config.reference);
        script.setAttribute('data-signature:integrity', props.config.signatureIntegrity);
        script.setAttribute('data-redirect-url', props.config.urlSuccess);

        formRef.current.appendChild(script);

        // Clean up function
        return () => {
            formRef.current.removeChild(script);
        };
    }, []);

    return (
        <form ref={formRef}>
            {/* No need to render anything here, as the script will handle the rendering */}
        </form>
    );
};

