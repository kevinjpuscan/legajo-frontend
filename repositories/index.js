import User from '@/repositories/user'
import Security from '@/repositories/security'
import Worker from '@/repositories/worker'
import Section from '@/repositories/section'
import DocumentFactory from '@/repositories/documentFactory'
import Document from '@/repositories/document'
import Upload from '@/repositories/upload'
import Rotation from '@/repositories/rotation'
import License from '@/repositories/license'
import JobPosition from '@/repositories/job-position'
import Salary from '@/repositories/salary'
import SalaryConcept from '@/repositories/salary-concept'
import Bonus from '@/repositories/bonus'
import Report from '@/repositories/reports'
import ReportGroup from '@/repositories/report-group'

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
  const jobPosition = new JobPosition(ctx)
  const salary = new Salary(ctx)
  const salaryConcept = new SalaryConcept(ctx)
  const bonus = new Bonus(ctx)
  const report = new Report(ctx)
  const reportGroup = new ReportGroup(ctx)

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
    jobPosition,
    salary,
    salaryConcept,
    bonus,
    report,
    reportGroup,
  }
}
