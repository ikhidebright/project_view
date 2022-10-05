/**
 * When youre logedin (local2) already and visits Auth pages,
 * this middleware takes you to the homepage
 */

export default function ({ redirect, store }) {
  // if user is already loggedin (local2) redirect to /admin
  if (store.state.auth.loggedIn && store.state.auth.strategy === 'local1') {
    return redirect('/')
  }
  if (store.state.auth.loggedIn && store.state.auth.strategy === 'local2') {
    return redirect('/admin')
  }
}
