const ViewOrders = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

ViewOrders.getInitialProps = async (_context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default ViewOrders;
