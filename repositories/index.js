import User from '@/repositories/user'
import Security from '@/repositories/security'
import Worker  from '@/repositories/worker'

export default (ctx) => {
  const user = new User(ctx)
  const security = new Security(ctx)
  const worker = new Worker(ctx)

  return {
    user,
    security,
    worker,
  }
}
