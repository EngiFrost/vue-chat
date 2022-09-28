export const store = () => {};

export const actions = {
  SOCKET_getMessage: (ctx, data) => {
    console.log("Message received", data);
  },
};
