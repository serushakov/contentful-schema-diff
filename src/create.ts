import { getFieldAnnotationIds } from './annotations'
import { IContentType } from './model'

import { IContext } from './runners'
import {extendPrototypes} from './utils'
extendPrototypes()

export async function writeCreate(
  newType: IContentType,
  write: (chunk: string) => Promise<any>,
  context: IContext,
): Promise<void> {
  context.operations.push('create')

  const v = newType.sys.id.camelCase()
  const typeDef = Object.assign({}, newType)
  delete(typeDef.fields)
  delete(typeDef.sys)

  if(typeDef.metadata?.annotations) {
    delete typeDef.metadata.annotations

    if(Object.keys(typeDef.metadata).length === 0) {
      delete typeDef.metadata
    }
  }

  await write(`
  const ${v} = migration.createContentType('${newType.sys.id}', ${typeDef.dump()})
`)
  context.varname = v

  for (const field of newType.fields) {
    const fieldDef = Object.assign({}, field)
    delete(fieldDef.id)

    const annotations = getFieldAnnotationIds(newType, field.id)
    await write(`
      ${v}.createField('${field.id}', ${fieldDef.dump()})
      ${annotations ? `.setAnnotations(${JSON.stringify(annotations)})` : ''}
    `)
  }
}
