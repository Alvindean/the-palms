import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'therapist',
  title: 'Massagista',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nome', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'photo', title: 'Foto', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'tag', title: 'Especialidade', type: 'string',
      options: {list: ['Sensorial', 'Quatro Mãos', 'Casal', 'Tântrico', 'Pedras Quentes']}}),
    defineField({name: 'touch', title: 'Toque', type: 'string',
      options: {list: ['Toque lento', 'Toque firme', 'Toque contemplativo']}}),
    defineField({name: 'years', title: 'Anos de experiência', type: 'number'}),
    defineField({name: 'size', title: 'Tamanho no mosaico', type: 'string',
      options: {list: [
        {title: 'Alto', value: 'tall'},
        {title: 'Médio', value: 'medium'},
        {title: 'Baixo', value: 'short'},
      ]}}),
    defineField({name: 'order', title: 'Ordem de exibição', type: 'number'}),
  ],
  orderings: [{title: 'Ordem', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'tag', media: 'photo'}},
})
