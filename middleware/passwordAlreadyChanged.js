export default function ({ redirect, store }) {
  // if user is not admin redirect to user login
  if (!store.state.auth.user.mustChangePassword) {
    return redirect('/')
  }
}
