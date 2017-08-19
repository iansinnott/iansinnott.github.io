#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');
const format = require('date-fns/format');
const { pipe, toLower, replace, trim } = require('ramda');
const stripIndent = require('strip-indent');

const doc = pipe(stripIndent, trim);

const writeFile = util.promisify(fs.writeFile);

const toYAML = obj => {
  let yaml = '';

  Object.keys(obj).forEach(k => {
    yaml += k + ': ' + obj[k] + '\n';
  });

  return yaml;
};

const surround = str => body => str + body + str;

const formatFrontmatter = pipe(toYAML, surround('---\n'));

const formatSlug = pipe(
  toLower,
  replace(/\s+/g, '-'),
  replace(/[^\w\-]+/g, '') // Remove all non-word chars
);

const createPost = ({ published, args }) => {
  if (!args.length) {
    throw new Error('[create-draft] No title provided.');
  }

  const outdir = path.resolve(__dirname, `../content/${published ? '_posts' : '_drafts'}`);
  const d = new Date();
  const date = format(d, 'YYYY-MM-DD');
  const datetime = d.toISOString();
  const title = args.join(' ');
  const filename = (published ? `${date}-` : '') + formatSlug(title) + '.md';
  const filepath = outdir + '/' + filename;

  const _frontmatter = {
    title,
    created: datetime,
  };

  if (published) _frontmatter.published = _frontmatter.created;
  if (!published) _frontmatter.draft = true;

  const frontmatter = formatFrontmatter(_frontmatter);

  // NOTE: Trimming indent doesn't work well here because lines in the front
  // matter can have no indent due to the way it's constructed.
  const body = trim(`
${frontmatter}
# ${title}
  `);

  return {
    filepath,
    body,
  };
};

const main = async () => {
  const cmd = process.argv[2];
  switch (cmd) {
    case 'post':
    case 'draft': {
      const post = createPost({
        published: cmd === 'post',
        args: process.argv.slice(3),
      });
      await writeFile(post.filepath, post.body);
      return Promise.resolve(post.filepath);
    }
    case 'help':
    default:
      console.error(
        doc(`
        Usage:

          post  $title [Creates a new post]
          draft $title [Creates a new draft of a post]
          help         [Prints this help output]

      `)
      );
      return Promise.reject();
  }
};

main().then(console.log, console.error);

