webpackJsonp([0xc5bbede108430000],{"./node_modules/json-loader/index.js!./.cache/json/jekyll-management-like-a-boss.json":function(e,t){e.exports={data:{post:{html:'<h2 id="blogging-without-friction"><a href="#blogging-without-friction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Blogging Without Friction</h2>\n<p>Yesterday I wrote a script to help myself blog more often. This is what it looks like in the terminal:</p>\n<ul>\n<li>Create a new post: <code>post new [post title]</code></li>\n<li>List all of my posts: <code>post list</code></li>\n<li>Search existing posts: <code>post search [post title]</code></li>\n<li>Edit a post: <code>post edit [partial post title]</code></li>\n<li>Publish to this blog: <code>post publish</code></li>\n</ul>\n<p>I really like <a href="http://jekyllrb.com/">Jekyll</a>, but having to manually create files with the Jekyll filename format (<code>YYYY-MM-DD-post-title</code>) is a bit of a hassle. Clearly you could just do this by hand, but if you\'re like me and want to automate all the minutia in your life, then that\'s not going to cut it.</p>\n<!--more-->\n<p>The other reason I decided to write a script for managing Jekyll was <em>friction</em>. Blogging can be fun, but sometimes it\'s hard to get myself to actually start writing posts. In the past, that was largely because my post-writing workflow looked something like this:</p>\n<ol>\n<li>Open a new Markdown file</li>\n<li>Write an amazing post</li>\n<li>Open a browser, log in to WordPress</li>\n<li>Use the WordPress UI to create a new post</li>\n<li>Copy my Markdown from my editor into the WordPress WYSIWYG</li>\n<li>Hit publish</li>\n<li>Navigate to the post on the front-end to make sure it looked OK</li>\n</ol>\n<p>Steps 3-7 were really causing a lot of friction when it came to writing blog posts. So much so that I still have some posts sitting on my computer that never got published because interacting with the WordPress UI is just too tedious. Here\'s what my new workflow looks like:</p>\n<ol>\n<li>In a terminal: <code>post new Jekyll Management Like a Boss</code></li>\n<li>Write blog post about Jekyll. Save it.</li>\n<li>Back in a terminal: <code>post publish</code></li>\n</ol>\n<p>And done.</p>\n<p>Now I have no excuses. If I don\'t write a post, I can only blame my own lassitude since I now have a super efficient workflow. This is a good thing.</p>\n<h2 id="why-not-octopress"><a href="#why-not-octopress" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Why not Octopress</h2>\n<p>The only existing option for managing a Jekyll blog that I came across was <a href="http://octopress.org/">Octopress</a>. It\'s a good project, and I already miss some of its features by not using it, but to me it had one glaring problem: Theming. There is limited documentation on how to theme Octopress, and while there are a bunch of 3rd-part Octopress themes to choose from it\'s just not good enough. I have nothing against using premade themes, it\'s just that once in a while you will probably want to change some little thing about the site and if you don\'t know how it\'s a real pain.</p>\n<p>The other reason I decided against Octopress, is fairly minor, but significant in my mind: The CLI syntax. If you don\'t know, creating a new post in Octopress looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>rake new_post[\'Post Title\']</code></pre>\n      </div>\n<p>To me that just doesn\'t make sense, when you can just as easily write a script to do the same thing with much less typing:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>post new Post Title</code></pre>\n      </div>\n<p>Octopress certainly does <em>way</em> more than this little script I wrote, and I\'m sure those guys knew exactly what they were doing when they designed the CLI the way they did, but it\'s the little things like that that really make the experience for me so I just decided to write my own.</p>\n<p>For anyone interested, you can find my script on GitHub: <a href="https://github.com/iansinnott/jekyll-post">https://github.com/iansinnott/jekyll-post</a></p>\n<p><strong>Note:</strong> I haven\'t optimized this script for use on other systems, so it may well not work on Linux or especially Windows. It also won\'t work on any system without <a href="http://nodejs.org/"> Node </a> installed.</p>',frontmatter:{created:"2014-06-28T07:00:00.000Z",title:"Jekyll Management Like a Boss"}}},pathContext:{id:"/Users/jandrix/dev/sites/blog.iansinnott.com/content/_posts/2014-06-28-jekyll-management-like-a-boss.md absPath of file >>> MarkdownRemark",next:{frontmatter:{title:"Meteor is (Almost) Awesome",created:"2014-06-28T07:00:00.000Z"},slug:"meteor-is-almost-awesome"},prev:{frontmatter:{title:"Jekyll Theming Like a Boss With Gulp",created:"2014-06-19T07:00:00.000Z"},slug:"super-birthday-post"}}}}});
//# sourceMappingURL=path---jekyll-management-like-a-boss-92baeb2540455d596e77.js.map