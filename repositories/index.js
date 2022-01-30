import User from '@/repositories/user'
import Security from '@/repositories/security'
import Worker from '@/repositories/worker'
import Section from '@/repositories/section'
import DocumentFactory from '@/repositories/documentFactory'
import Document from '@/repositories/document'
import Upload from '@/repositories/upload'
import Rotation from '@/repositories/rotation'
import License from '@/repositories/license'

export default (ctx) => {
  const user = new User(ctx)
  const security = new Security(ctx)
  const worker = new Worker(ctx)
  const section = new Section(ctx)
  const documentFactory = new DocumentFactory(ctx)
  const document = new Document(ctx)
  const upload = new Upload(ctx)
  const rotation = new Rotation(ctx)
  const license = new License(ctx)

  return {
    user,
    security,
    worker,
    section,
    documentFactory,
    document,
    upload,
    rotation,
    license,
  }
}
