webpackJsonp([0xe18ad75517a91800],{"./node_modules/json-loader/index.js!./.cache/json/running-a-meteor-app-on-dokku.json":function(e,o){e.exports={data:{post:{html:'<p>This is a quick overview of how to get a Meteor app set up on Dokku. It\'s actually not difficult, but it doesn\'t seem to have been well documented anywhere yet. Let\'s get started.</p>\n<h2 id="what-you-need"><a href="#what-you-need" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>What you need</h2>\n<p>Obviously, you will need a server running Dokku. I used the Digital Ocean Dokku droplet, which uses the following versions:</p>\n<ul>\n<li>Ubuntu 14.04</li>\n<li>Docker 1.1.2</li>\n<li>Dokku 0.2.3</li>\n</ul>\n<p>If you have a different setup your results may vary, but I\'m guessing this guide will generally work for you as long as you have Dokku v0.2.3 setup.</p>\n<p>You also need a meteor app. If you are reading this just out of curiosity and don\'t have an app feel free to use one of the example apps. You can generate them easily through the CLI. Example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ meteor create --example todos</code></pre>\n      </div>\n<h2 id="dokku-configuration"><a href="#dokku-configuration" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Dokku Configuration</h2>\n<p>First of all, the default buildpack that Dokku will use if it detects a Meteor app is the <a href="https://github.com/oortcloud/heroku-buildpack-meteorite">Heroku Buildpack</a>, which is not yet compatible with Meteor 1.0 and still uses Meteorite. That\'s no good, so you will need to specify a custom buildpack for Dokku. The buildpack I\'ve used successfully with Meteor 1.0 is <a href="https://github.com/AdmitHub/meteor-buildpack-horse">Meteor Buildpack Horse</a>. As of this writing (11/22/14) the documentation still doesn\'t reflect that it\'s compatible with 1.0, but it\'s worked so far so don\'t worry about that.</p>\n<p>To specify a custom buildpack, just create a file in your project root named <code>.env</code> and within that file export the buildpack URL like so:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>export BUILDPACK_URL=\'https://github.com/AdmitHub/meteor-buildpack-horse.git\'</code></pre>\n      </div>\n<p>Make sure you <code>git add</code> your new <code>.env</code> file with and commit it.</p>\n<h2 id="adding-mongo"><a href="#adding-mongo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Adding Mongo</h2>\n<p>Now you need to add the <a href="https://github.com/jeffutter/dokku-mongodb-plugin">Dokku MongoDB Plugin</a> to Dokku. Make sure you\'ve SSHed into your server, then run the following commands:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ git clone https://github.com/jeffutter/dokku-mongodb-plugin.git /var/lib/dokku/plugins/mongodb\n$ dokku plugins-install</code></pre>\n      </div>\n<p>This may take a few minutes since it will need to install <code>mongodb-server</code> on the remote machine, unless you\'ve already installed Mongo in which case it should be quick. Once it\'s done, start Mongo and link it to your app:</p>\n<p><strong>Note:</strong> In the following snippet replace <code>&#x3C;app></code> with the name of your application, assuming you\'ve already pushed it to Dokku. If not, push your app up first and then run these commands. Your app name is what you specify in the git remote URL that points to Dokku. It looks like <code>dokku@yoursite.com:&#x3C;app></code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ mongodb:start\n$ mongodb:create <app></code></pre>\n      </div>\n<h2 id="final-configuration"><a href="#final-configuration" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Final Configuration</h2>\n<p>If you haven\'t yet, deploy your app to Dokku. It will most likely crash (i.e. You get an Nginx error when you hit your URL), but that\'s fine as it is still missing one last piece.</p>\n<p>The final step is to set the <code>ROOT_URL</code> environment variable in your app container. You need to have pushed your app at least once for the app container to exist. Replace <code>&#x3C;url></code> with the URL you intend to use for your app. If you haven\'t yet purchased a domain name, you can set this variable to your IP address and it should still run just fine. Don\'t forget the leading <code>http://</code> (ex: <code>http://example.com</code> or <code>http://0.0.0.0</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ dokku config:set <app> ROOT_URL=<url></code></pre>\n      </div>\n<p>Setting the environment variable will trigger Dokku to restart your app. Once it does you should be able to view the app at the URL you provided in<code>&#x3C;url></code>.</p>\n<h2 id="success"><a href="#success" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Success!</h2>\n<p>That\'s it. Hopefully this helps as you deploy your meteor apps quickly using Dokku. If you want to create another meteor app you will just need to run through the above steps again, with the exception of adding the MongoDB plugin.</p>\n<h2 id="troubleshooting"><a href="#troubleshooting" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Troubleshooting</h2>\n<p>If you had trouble with anything above there are a couple ways you can troubleshoot Dokku and it\'s containers:</p>\n<ol>\n<li>Inspect the apps logs. This is likely the most useful troubleshooting technique, and will likely reveal the problem. Run <code>dokku logs &#x3C;app></code>.</li>\n<li>If the logs don\'t reveal the issue, put Dokku into debug mode and re-deploy. To do this you need to create a new Dokku config file at <code>/home/dokku/dokkurc</code>. Add a single line to the file: <code>export DOKKU_TRACE=1</code>. Now when you deploy, Dokku will send back <em>a lot</em> more information.</li>\n</ol>\n<h2 id="useful-resources"><a href="#useful-resources" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Useful Resources</h2>\n<ul>\n<li><a href="https://github.com/jeffutter/dokku-mongodb-plugin">MongoDB Dokku Plugin</a></li>\n<li><a href="https://github.com/AdmitHub/meteor-buildpack-horse">Meteor Buildpack Horse</a></li>\n<li><a href="https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx">How To Deploy a Meteor.js Application on Ubuntu 14.04 with Nginx</a></li>\n</ul>\n<p>That last link is <em>not</em> specific to Dokku or even Docker, but it gives good insight into what is required to set up a production Meteor server.</p>\n<p>Feel free to leave comments if you still have questions.</p>',frontmatter:{created:"2014-11-22T08:00:00.000Z",title:"Running a Meteor App on Dokku"}}},pathContext:{id:"/Users/jandrix/dev/sites/blog.iansinnott.com/content/_posts/2014-11-22-running-a-meteor-app-on-dokku.md absPath of file >>> MarkdownRemark",next:{frontmatter:{title:"Teaching My Brother To Code",created:"2014-12-07T08:00:00.000Z"},slug:"teaching-my-brother-to-code"},prev:{frontmatter:{title:"Time Machine to the Rescue",created:"2014-10-03T07:00:00.000Z"},slug:"time-machine-to-the-rescue"}}}}});
//# sourceMappingURL=path---running-a-meteor-app-on-dokku-9083ea508f5dcafee38a.js.map