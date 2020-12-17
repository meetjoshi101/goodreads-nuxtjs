/* eslint-disable no-console */
export default ({ store, redirect, route }) => {
  console.log(store.state.Auth.role)
  if (store.state.Auth.token) {
    if (store.state.Auth.role !== 'A') {
      redirect('/login')
    }
  }
}
