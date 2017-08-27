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

/**
 * NOTE: For some reason I had been storing the disqus thread id in an array in
 * the old frontmatter, but it's one single value. This ended up causing errors
 * in graphql which expected a string but instead found an array.
 */
const normalize = ({ frontmatter, filename }) => {
  const filedate = getFiledate(filename);

  const result = Object.assign({}, {
    created: filedate.toISOString(),
    published: filedate.toISOString(),
  }, frontmatter);

  // See NOTE
  if (result.dsq_thread_id && Array.isArray(result.dsq_thread_id)) {
    result.dsq_thread_id = JSON.stringify(result.dsq_thread_id[0]); // We want it as a string
  }

  // The first pass with the thread IDs did not leave me with a string, so this
  // is to make up for that.
  if (typeof result.dsq_thread_id === 'number') {
    result.dsq_thread_id = JSON.stringify(result.dsq_thread_id); // We want it as a string
  }

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
