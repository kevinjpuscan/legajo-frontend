import User from '@/repositories/user'
import Security from '@/repositories/security'
import Worker  from '@/repositories/worker'
import Section  from '@/repositories/section'

export default (ctx) => {
  const user = new User(ctx)
  const security = new Security(ctx)
  const worker = new Worker(ctx)
  const section = new Section(ctx)

  return {
    user,
    security,
    worker,
    section,
  }
}
