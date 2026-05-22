// One-time: upload current photos + content into Sanity.
// Run AFTER creating the project:  SANITY_PROJECT_ID=xxx SANITY_TOKEN=yyy npm run seed
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {createClient} from '@sanity/client'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN
if (!projectId || !token) {
  console.error('Set SANITY_PROJECT_ID and SANITY_TOKEN (a write token) first.')
  process.exit(1)
}
const client = createClient({projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false})

async function upload(rel) {
  const abs = path.join(ROOT, rel.split('?')[0])
  const asset = await client.assets.upload('image', fs.readFileSync(abs), {filename: path.basename(abs)})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  // homepage singleton
  const home = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/homepage.json'), 'utf8'))
  const doc = {_id: 'homepage', _type: 'homepage'}
  for (const [k, v] of Object.entries(home)) { doc[k] = await upload(v); console.log('homepage:', k) }
  await client.createOrReplace(doc)
  console.log('✓ homepage seeded')

  // therapists
  const ts = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/therapists.json'), 'utf8'))
  let i = 0
  for (const t of ts) {
    const photo = await upload(t.img)
    await client.create({_type: 'therapist', name: t.name, tag: t.tag, touch: t.touch,
      years: t.years, size: t.size || undefined, order: i++, photo})
    console.log('therapist:', t.name)
  }
  console.log(`✓ seed complete — ${ts.length} therapists + homepage`)
}
main().catch((e) => { console.error(e); process.exit(1) })
