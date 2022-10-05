import { SclRequests } from '~/lib/api'
export default (ctx, inject) => {
  const auth = ctx.$auth
  const instance = ctx.$axios
  const store = ctx.store
  const services = {
    token: process.env.TOKEN_SERVICE,
    user: process.env.USER_SERVICE,
    tenant: process.env.TENANT_SERVICE,
    role: process.env.ROLE_SERVICE,
    sessions: process.env.SESSION_SERVICE,
    applicant: process.env.PROFILED_APPLICANT_SERVICE,
    adminSettings: process.env.ADMIN_SETTINGS,
    document: process.env.DOCUMENT_UPLOAD_SERVICE,
    transaction: process.env.TRANSACTION_SERVICE,
    tenantId: process.env.TENANT_ID,
    configuration: process.env.CONFIGURATION_SERVICE,
  }

  const Api = new SclRequests(instance, services, store, auth)

  inject('api', Api)
}
