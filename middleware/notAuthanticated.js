export default ({ store, redirect, route }) => {
  if (store.state.Auth.token) {
    if (store.state.Auth.role === 'A') {
      redirect('/admin')
    } else {
      redirect('/')
    }
  }
}
