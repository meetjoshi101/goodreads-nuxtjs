export default ({ store, redirect, route }) => {
  if (store.state.Auth.token) {
    redirect('/')
  }
}
