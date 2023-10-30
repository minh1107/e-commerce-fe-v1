import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import withBaseComponent from "hocs/withBaseComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

// This value is from the props in the UI
const style = {"layout":"vertical"};
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount, setPaymentExpression, isAblePaypal }) => {
    const [{ isPending, options }] = usePayPalScriptReducer();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch({
        type: 'resetOption',
        value: {...options, currency: currency}
      })

    }, [currency, showSpinner])

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={isAblePaypal}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [{amount: {currency_code: currency, value: amount}}]
                }).then(orderID => orderID).catch(error => 
                        Swal.fire('Hãy kiểm tra đầy đủ thông tin thanh toán', 'Lỗi', 'warning')
                    )}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(async (response) => {
                        setPaymentExpression(response)
                    })
                }}
            />
        </>
    );
}

const Paypal = ({amount, setPaymentExpression, isAblePaypal}) => {
    const [priceUsd, setPriceUsd] = useState(null)
    useEffect(() => {
        setPriceUsd(Math.round(amount/24000))
    }, [amount])
    
    return (
        <div style={{ maxWidth: "750px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper isAblePaypal={isAblePaypal} setPaymentExpression={setPaymentExpression} currency={'USD'} amount={priceUsd} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal