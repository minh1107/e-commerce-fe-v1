import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import withBaseComponent from "hocs/withBaseComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// This value is from the props in the UI
const style = {"layout":"vertical"};
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount }) => {
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
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [{amount: {currency_code: currency, value: amount}}]
                }).then(orderID => orderID)}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    console.log(response)
                })}
            />
        </>
    );
}

const Paypal = ({amount}) => {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal