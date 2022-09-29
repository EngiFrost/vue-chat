export const store = () => ({
  user: {},
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  SOCKET_getMessage: (ctx, data) => {
    console.log("Message received", data);
  },
};
