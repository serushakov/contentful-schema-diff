import { IContentType } from './model';
import { IContext } from './runners';
import { AsyncWrite } from './runners/async_writer';

export async function writeContentTypeAnnotations(to: IContentType, write: AsyncWrite, context: IContext) {
  if(!to.metadata?.annotations?.ContentType?.length) {
    return
  }

  const ctx: IContext = context || { operations: [] }
  if (!ctx.varname) {
    const v = to.sys.id.camelCase()
    await write(`
  const ${v} = migration.editContentType('${to.sys.id}')
`)
    ctx.varname = v
  }

  const annotationIds = to.metadata.annotations.ContentType
    .map(annotation => annotation.sys.id)

  await write(`
  ${ctx.varname}.setAnnotations(${JSON.stringify(annotationIds)})
  `)
}

export function getFieldAnnotationIds(contentType: IContentType, fieldId: string) {
  return contentType.metadata?.annotations
    ?.ContentTypeField?.[fieldId]
    ?.map(a => a.sys.id)
}