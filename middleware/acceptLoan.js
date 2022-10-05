/**
 * This middleware checks if the accept loan page contains the neccessary query applicant
 */

export default function ({ query, redirect }) {
  // if the accept route doesnt get queried with applicant
  if (
    !query.applicant ||
    query.applicant === '' ||
    !query.tenantId ||
    query.tenantId === ''
  ) {
    return redirect('/login')
  }
}
