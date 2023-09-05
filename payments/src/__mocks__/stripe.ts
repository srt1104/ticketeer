export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({ id: "some-valid-stripe-charge-id" }),
  },
};
