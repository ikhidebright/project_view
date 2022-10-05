/**
 * When youre logedin already and visits Auth pages,
 * this middleware takes you to the homepage
 */

export default function ({ redirect, store }) {
  // if user is already loggedin redirect to home
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
