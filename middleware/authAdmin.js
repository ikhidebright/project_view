/**
 * This middleware protects admin routes that accepts
 * authenticated admins only
 * (if not loggedIn its takes you to the admin login page)
 */

export default function ({ redirect, store }) {
  // if user is not loggedin redirect to admin login page
  if (!store.state.auth.loggedIn || store.state.auth.strategy !== 'local2') {
    return redirect('/admin/login')
  }
}
