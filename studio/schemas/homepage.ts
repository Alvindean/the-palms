import {defineType, defineField} from 'sanity'

const img = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

export default defineType({
  name: 'homepage',
  title: 'Página inicial',
  type: 'document',
  fields: [
    img('hero', 'Ilustração principal (hero)'),
    img('guardian', 'Foto guardiã'),
    img('og', 'Imagem de compartilhamento (OG)'),
    img('feature1', 'Destaque 1'),
    img('feature2', 'Destaque 2'),
    img('feature3', 'Destaque 3'),
    img('feature4', 'Destaque 4'),
    img('gallery1', 'Galeria 1'), img('gallery2', 'Galeria 2'),
    img('gallery3', 'Galeria 3'), img('gallery4', 'Galeria 4'),
    img('gallery5', 'Galeria 5'), img('gallery6', 'Galeria 6'),
    img('gallery7', 'Galeria 7'), img('gallery8', 'Galeria 8'),
  ],
  preview: {prepare: () => ({title: 'Página inicial (fotos)'})},
})
