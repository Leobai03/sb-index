import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import questions, { pairMeta } from '../src/data/questions'
import { personas } from '../src/data/personas'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const outputDirectory = resolve(scriptDirectory, '../douyin-miniapp/data')

function commonJs(name: string, value: unknown) {
  return `// Generated from the web app source. Run npm run build:douyin-data after editing the quiz.\nconst ${name} = ${JSON.stringify(value, null, 2)}\n\nmodule.exports = { ${name} }\n`
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  writeFile(
    resolve(outputDirectory, 'questions.js'),
    `// Generated from the web app source. Run npm run build:douyin-data after editing the quiz.\nconst pairMeta = ${JSON.stringify(pairMeta, null, 2)}\n\nconst questions = ${JSON.stringify(questions, null, 2)}\n\nmodule.exports = { pairMeta, questions }\n`,
  ),
  writeFile(resolve(outputDirectory, 'personas.js'), commonJs('personas', personas)),
])

console.log(`Douyin miniapp data exported to ${outputDirectory}`)
