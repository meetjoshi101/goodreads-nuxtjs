export default ({ store, redirect, route }) => {
  if (store.state.Auth.token) {
    if (!store.state.Auth.token === 'A') {
      redirect('/login')
    }
  }
}
