import {defineMigration, patch, at, setIfMissing, set} from 'sanity/migrate'

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: 'update portfolio documents with default SEO title and description',
  documentTypes: ["portfolio"],

  async *migrate(documents, context) {
    for await (const document of documents()) {
      yield patch(document._id, [
        at(
          'seoTitle',
          setIfMissing(document.title ? `Portfolio project: ${document.title}` : 'Default title'),
        ),
        at('seoDescription', set(blocksToText(document.description))),
      ])
    }
  }
})

const defaults = {nonTextBehavior: 'remove'}

function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}