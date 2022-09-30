// TODO: use Pinia instead!

export const store = () => ({
  user: {},
  messages: [],
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  clearData(state) {
    state.user = {}
    state.messages = []
  }
};

export const actions = {
  SOCKET_getMessage: (ctx, data) => {
    console.log("Message received", data);
  },
};
