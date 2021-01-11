/* eslint-disable no-console */
export default ({ store, redirect }) => {
  if (!store.state.Auth.token || store.state.Auth.role !== 'A') {
    redirect('/login')
  }
}
