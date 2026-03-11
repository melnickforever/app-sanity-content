import {defineCliConfig} from 'sanity/cli'
import path from 'path'

const frontendPath = path.resolve(process.cwd(), '../../../app-sanity-nextjs-frontend')

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  typegen: {
    schema: `${frontendPath}/sanity-schema.json`,
    generates: `${frontendPath}/src/sanity/types.ts`,
    path: `${frontendPath}/src/**/*.{ts,tsx}`,
  },
  server: {
    port: 3334,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
