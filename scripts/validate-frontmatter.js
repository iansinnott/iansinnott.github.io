#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');
const { map, split, head, pipe, toLower, match, replace, trim } = require('ramda');
const mdify = require('mdify');
const exec = util.promisify(require('child_process').exec);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Turn a jekyll style filename into a JS date.
 *
 * NOTE: The date constructor is strange, month is zero-indexed so we need to
 * subract 1.
 */
const getFiledate = pipe(
  match(/^\d\d\d\d-\d\d-\d\d/gmi),
  head,
  split('-'),
  map(Number),
  (([y, m, d]) => new Date(y, m - 1, d)) // See NOTE
);

const normalize = ({ frontmatter, filename }) => {
  const filedate = getFiledate(filename);
  const result = Object.assign({}, {
    created: filedate.toISOString(),
    published: filedate.toISOString(),
  }, frontmatter);

  if (typeof result.draft !== 'undefined') delete result.draft;

  return result;
};

/**
 * Validate the front matter of a single post
 *
 * NOTE: filepath shoudl be an absolute path
 * NOTE: Prepending a newline and trimming the markdown is just the result of a
 * bug in mdify. It was inserting a newline at the beginning of the markdown
 * with each pass, which meant that running this more than once on a file would
 * result in another newline each run.
 */
const main = async (filepath) => {
  console.log('[READING]:', filepath);
  const body = await readFile(filepath, { encoding: 'utf8' });
  const { metadata: frontmatter, markdown } = mdify.parse(body);
  const newFrontmatter = normalize({ frontmatter, filename: path.basename(filepath) });
  const newFile = mdify.stringify(newFrontmatter, '\n' + markdown.trim()); // See NOTE
  await writeFile(filepath, newFile);
  return filepath;
};

main(process.argv[2]).then(x => console.log('[UPDATED]:', x));
