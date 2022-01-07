import repositories from '@/repositories'
export default (ctx, inject) => {
  inject('repository', repositories(ctx))
  ctx.$repository = repositories(ctx)
}
