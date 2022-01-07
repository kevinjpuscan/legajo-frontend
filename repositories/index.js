import User from '@/repositories/user'
import Security from '@/repositories/security'

export default (ctx) => {
  const user = new User(ctx)
  const security = new Security(ctx)

  return {
    user,
    security,
  }
}
