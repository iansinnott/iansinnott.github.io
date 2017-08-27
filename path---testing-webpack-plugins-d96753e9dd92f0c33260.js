webpackJsonp([0xe48a26e6b4f8d000],{"./node_modules/json-loader/index.js!./.cache/json/testing-webpack-plugins.json":function(n,s){n.exports={data:{post:{html:'<p><em><strong>TL;DR:</strong> I\'m going to show you how to test Webpack plugins. I\'ll even show you how to integrate with a CI server 😄. The trick is to use the Webpack <a href="https://webpack.github.io/docs/node.js-api.html">Node API</a></em>.</p>\n<p>Ever built a <a href="https://github.com/webpack/docs/wiki/how-to-write-a-plugin">Webpack Plugin</a>? Ever wondered how to test that awesome plugin you just built? If so, this article is for you.</p>\n<p>I scoured the internet (skimmed the first page of a google search) for resources on testing Webpack plugins and came up empty, so I decided it was time to take matters into my own hands!</p>\n<p>I recently built my own Webpack plugin for generating static sites from React Router routes. You can check it out <a href="https://github.com/iansinnott/react-static-webpack-plugin">here if interested</a>. Anyway, I was getting somewhat annoyed that I hadn\'t yet tested the plugin. I had seen some regressions as I added support for more features and it was no fun to have to resolve those issues when I really just anted to generate awesome static sites using React and Webpack.</p>\n<h2>Where to turn...</h2>\n<!-- more -->\n<p>Even if the first page of a google search didn\'t answer my questions, I figured someone somewhere must have needed to test their Webpack plugins in the past, and I was right! My first move was to think about what popular Webpack plugins I was aware of. The first one that came to mind was the venerable <a href="https://github.com/webpack/extract-text-webpack-plugin">Extract Text Webpack Plugin</a>. Little did I know, it was written by the same guy who wrote Webpack.</p>\n<p>I figured that such a high profile plugin is likely to be well tested and it is. The plugin has a whole <a href="https://github.com/webpack/extract-text-webpack-plugin/tree/master/test">suite of tests</a> which you can check out and use as a reference for writing your own. Nice 💥</p>\n<h2>Writing the tests</h2>\n<p>Let\'s jump in. To write a tests for a Webpack plugin you will probably want to analyze the output of a build. To do so, you can simply use the <a href="https://webpack.github.io/docs/node.js-api.html">Node API</a>. It runs in Node so it probably runs in your favorite test runner. For me this is <a href="https://github.com/sindresorhus/ava">Ava</a>, but it\'s just Node code so you can use whatever you like.</p>\n<p>The Webpack API let\'s you pass in options and a callback to Webpack. The callback will be called with an <code>err</code> object and some <code>stats</code> on how the build went. In short, here\'s the <a href="https://github.com/iansinnott/react-static-webpack-plugin/blob/master/example/test.js">exact test I use in my plugin</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">import</span> test <span class="token keyword">from</span> <span class="token string">\'ava\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> webpack <span class="token keyword">from</span> <span class="token string">\'webpack\'</span><span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">// 0. Import the config that uses my plugin</span>\n<span class="token keyword">import</span> options <span class="token keyword">from</span> <span class="token string">\'./webpack.config.js\'</span><span class="token punctuation">;</span>\n\ntest<span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">(</span><span class="token string">\'Compiles routes nested at one level\'</span><span class="token punctuation">,</span> t <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n\n  <span class="token comment" spellcheck="true">// 1. Run webpack</span>\n  <span class="token function">webpack</span><span class="token punctuation">(</span>options<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> stats<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token comment" spellcheck="true">// 2. Fail test if there are errors</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> t<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>stats<span class="token punctuation">.</span><span class="token function">hasErrors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> t<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>stats<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment" spellcheck="true">// 3. Map asset objects to output filenames</span>\n    <span class="token keyword">const</span> files <span class="token operator">=</span> stats<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>assets<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>x <span class="token operator">=</span><span class="token operator">></span> x<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment" spellcheck="true">// 4. Run assertions. Make sure that the three expected</span>\n    <span class="token comment" spellcheck="true">//    HTML files were generated</span>\n    t<span class="token punctuation">.</span><span class="token boolean">true</span><span class="token punctuation">(</span>files<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">\'index.html\'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    t<span class="token punctuation">.</span><span class="token boolean">true</span><span class="token punctuation">(</span>files<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">\'about.html\'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    t<span class="token punctuation">.</span><span class="token boolean">true</span><span class="token punctuation">(</span>files<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">\'404.html\'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    t<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This is a pretty simple test. Given the routes defined in <a href="https://github.com/iansinnott/react-static-webpack-plugin/blob/master/example/src/routes.js"><code>routes.js</code></a>, the plugin should generate three HTML files: <code>index.html</code>, <code>about.html</code> and <code>404.html</code>. This test simply runs Webpack and checks the output to make sure those three files were generated. It doesn\'t check the contents of those files or check that they were written to disk, but this test already gives me infinitely more code coverage than I had before.</p>\n<p>Of course it should be noted that I had to create a whole new directory and give it its own <code>package.json</code> and <code>node_modules</code> in order to get this test to run, but it works.</p>\n<p>Also, looking at the Extract Plugin tests it looks like it may not be necessary to do a full <code>npm instal</code> for the subdirectory in order to run Webpack. In the future I may optimize the tests by looking more closely at how the tests are being run in the Extract Plugin.</p>\n<h2>Running your tests on a CI server</h2>\n<p>Now that you know how to write tests for a Webpack plugin you will also probably want to run them automatically whenever you push. Personally I use <a href="https://circleci.com/">Circle CI</a> for this, but I\'m sure Travis or any other modern CI service would work fine.</p>\n<p>The key point to note is that you need to run <code>npm install</code> in whatever directory you\'re using for your tests. This will vary depending on your CI provider so I\'ll just show you the command I run and link you to my <code>circle.yml</code>.</p>\n<p>Install node modules in the <code>example/</code> directory using a <a href="http://www.tldp.org/LDP/abs/html/subshells.html">subshell</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>(cd example; npm install)</code></pre>\n      </div>\n<p>You can see my full <a href="https://github.com/iansinnott/react-static-webpack-plugin/blob/master/circle.yml#L9"><code>circle.yml</code> here</a>.</p>\n<h2>Conclusions</h2>\n<p>It wasn\'t as hard as I thought it would be to run tests on a Webpack plugin. That being said I didn\'t find this documented anywhere and google proved particularly useless since it turned up a ton of results related to Webpack plugins that run tests on your web app for you... I was looking for ways to run tests on Webpack plugins <em>themselves</em>, so this is not what I was looking for.</p>\n<p>Hopefully this helps you out. Webpack plugins are crucial pieces of many build processes out there, so it\'s important that we know how to test them.</p>\n<p>Feel free to <a href="https://github.com/iansinnott/react-static-webpack-plugin">star my plugin repository</a> if you liked this write up, or leave me a comment if anything wasn\'t clear.</p>\n<p>Cheers 🍻</p>',frontmatter:{created:"2016-05-11T07:00:00.000Z",title:"Testing Webpack Plugins"}}},pathContext:{id:"/Users/jandrix/dev/sites/blog.iansinnott.com/content/_posts/2016-05-11-testing-webpack-plugins.md absPath of file >>> MarkdownRemark",next:{frontmatter:{title:"Going fully HTTPS (SSL) fo' free",created:"2016-04-29T07:00:00.000Z"},slug:"going-fully-https-fo-free"},prev:{frontmatter:{title:"Getting Started with Flow and Webpack",created:"2016-06-11T07:00:00.000Z"},slug:"getting-started-with-flow-and-webpack"}}}}});
//# sourceMappingURL=path---testing-webpack-plugins-d96753e9dd92f0c33260.js.map