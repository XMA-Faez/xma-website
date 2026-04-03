import { NextSchemaScript, type Schema } from '@operationnation/sanity-plugin-schema-markup/nextSchemaScript'
import { projectId, dataset } from '@/sanity/env'

interface SchemaMarkupProps {
  schema: Schema[]
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <NextSchemaScript
      schema={schema}
      projectId={projectId}
      dataset={dataset}
    />
  )
}
