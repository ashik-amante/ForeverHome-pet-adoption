import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const CheckoutForm = ({ amount, petName, closeModal, petId,refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || amount <= 0) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);

        if (!card) {
            setProcessing(false);
            return;
        }

        try {
            const res = await axiosSecure.post('/create-payment-intent', { amount });
            const clientSecret = res.data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'unknown@mail.com',
                    },
                },
            });

            if (confirmError) {
                toast.error(confirmError.message);
                setProcessing(false);
            } else if (paymentIntent.status === 'succeeded') {
             
                const donationData = {
                    campaignId: petId,
                    donorEmail: user?.email,
                    donorName: user?.displayName,
                    transactionId: paymentIntent.id,
                    amount: parseFloat(amount),
                    paidAt: new Date(),
                    petName: petName
                };

                const response = await axiosSecure.post('/donations', donationData);

                if (response.data.insertedId) {
                    toast.success(`Thank you for your $${amount}! donating `);
                    refetch()
                    closeModal();
                }
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        } finally {
            setProcessing(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-xl bg-muted/30">
                <CardElement  />
            </div>
            <Button type="submit" disabled={!stripe || processing} className="w-full h-12">
                {processing ? <Loader2 className="animate-spin" /> : `Pay $ ${amount}`}
            </Button>
        </form>
    );
};

export default CheckoutForm;