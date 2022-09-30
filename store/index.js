export const store = () => ({
  user: {},
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  clearUserData(state) {
    state.user = {}
    console.log(state.user)
  }
};

export const actions = {
  SOCKET_getMessage: (ctx, data) => {
    console.log("Message received", data);
  },
};
