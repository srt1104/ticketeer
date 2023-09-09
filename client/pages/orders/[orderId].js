import { useState, useEffect } from "react";
import Router from "next/router";
import StripeCheckout from "react-stripe-checkout";

import useRequest from "../../hooks/use-request";

const ViewOrder = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { token: "", orderId: order.id },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.floor(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      <p>Time left to pay: {timeLeft} seconds</p>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51IyGV1SAP3M7eocNHmR6hKSWamMhE5IEHzcGzCaQCoZktQo8WaNbobzTTVrEMZ6YCreyNsR94gjZEF37KJpPbICi00GmK5caOm"
        amount={order.ticket.price * 100}
        currency="INR"
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

ViewOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default ViewOrder;
