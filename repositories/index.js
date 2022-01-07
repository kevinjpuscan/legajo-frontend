import User from '@/repositories/user'

export default (ctx) => {
  const user = new User(ctx)

  return {
    user,
  }
}
