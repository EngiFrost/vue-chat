export default function ({ store, redirect }) {
  if (store.state.user && !Object.keys(store.state.user).length) {
    redirect("/?message=noUser");
  }
}
