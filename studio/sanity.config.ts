import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'the-palms',
  title: 'The Palms — Conteúdo',
  // `sanity init` writes these for you, or set SANITY_STUDIO_PROJECT_ID:
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Conteúdo').items([
          S.listItem().title('Página inicial (fotos)').id('homepage')
            .child(S.document().schemaType('homepage').documentId('homepage')),
          S.documentTypeListItem('therapist').title('Massagistas'),
        ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
