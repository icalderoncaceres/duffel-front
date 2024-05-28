
import { SERVER_URL } from '../helpers/const';
import { IBoldPaymentConfig } from '../models/models';
export class PaymentService {
    
    static async uploadVoucher(selectedFile: any, outboundId: string, returnId: string): Promise<boolean> {
        const formData = new FormData();
        formData.append('voucher', selectedFile);
        formData.append('outboundId', outboundId);
        formData.append('returnId', returnId);
        const response = await fetch(`${SERVER_URL}/uploadVoucher`, {
            method: "POST",
            body: formData,
        });

        return response.json();
    }

    static async getPaymentConfig(outboundId: string, returnId: string): Promise<{status: number, data: IBoldPaymentConfig}> {
        const response = await fetch(`${SERVER_URL}/getPaymentConfig`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({outboundId, returnId})
        });
        return response.json();
    }
}