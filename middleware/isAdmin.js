/**
 * The Admin login uses Nuxt Auth strategy (local2)
 * If the strategy is not local2 means user is not an admin
 * and should be taken to users login
 */

export default function ({ redirect, store }) {
  // if user is not admin redirect to user login
  if (store.state.auth.strategy !== 'local2') {
    return redirect('/login')
  }
}
