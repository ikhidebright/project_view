/**
 * The Admin login uses Nuxt Auth strategy (local2)
 * If the strategy is not local2 means user is not an admin
 * and should be taken to users login
 */

export default function ({ redirect, store }) {
  // if user is admin redirect user to /admin
  if (store.state.auth.strategy !== 'local1') {
    return redirect('/admin/login')
  }
}
