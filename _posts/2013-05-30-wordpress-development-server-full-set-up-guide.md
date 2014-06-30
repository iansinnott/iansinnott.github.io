---
title: 'WordPress Development Server &#8211; Full Set Up Guide'
author: Ian
layout: post
permalink: /blog/wordpress-development-server-full-set-up-guide/
dsq_thread_id:
  - 1337579457
  - 1337579457
categories:
  - web
  - wordpress
---
<h2>Unleashing your WordPress Development Server</h2>
<p>So you want to escape inclusive packages like MAMP, learn about web servers and generally code like a boss? Well if you use a Mac your in the right place, but guess what we need before we get started? A local development environment! If you don&#8217;t know what that is, read the next paragraph. If you do, then skip down. Even if you already have a local dev server set up this will still be useful knowledge should you want to untether yourself from MAMP or any other AMP stack bundle.</p>
<p><!--more--></p>
<p><strong>Windows Users: </strong>This article is about setting up a local dev environment on Mac OSX 10.8. You will also need to get an AMP stack up and running but I&#8217;m not familiar with Windows so I&#8217;m just going to recommend <a href="http://bitnami.org/stack/wamp" title="wamp: amp stack for windows">WAMP</a> (sigh).</p>
<h2>The Local Dev Environment</h2>
<p>When you code in PHP you need somewhere to test your work as you go along. This is where the local dev server comes in. You will also need a local dev server if you do any sort of online development. What the local dev server is&#8230; is just that: a server that runs on your computer. When you buy web hosting your paying for disk space on someone else&#8217;s server. That server is running server-side software that let&#8217;s you do many things, like using PHP and MySQL. So we&#8217;re going to set up the same thing running from our own computer. This means web files (.php, .html, etc.) on your own hard drive will be hosted and served to your browser. <strong>Let&#8217;s go!</strong></p>
<h3>This tutorial</h3>
<p>There are so many tutorials on this subject out there, so why read this one&#8230; I&#8217;ll tell you: Because most of the rest suck. Notice how I said most. I will refer in this lesson to some tutorials elsewhere that are actually very useful. Also, I will be focusing on setting up a professional dev environment, free of MAMP or XAMP or whatever else is out there. If you&#8217;ve ever seen/used MAMP Pro this is essentially setting up the same thing without a GUI. And my way is free!</p>
<p>There is also the added benefit that you get to better understand your server, learn a bit of terminal and in the end feel a huge sense of accomplishment (maybe). So with that, let&#8217;s see what we will need to get started.</p>
<h3>Necessary Ingredients</h3>
<p>Todays recipe is fairly simple in prep, more difficult later on in pickup. Her&#8217;s what we need (follow the links to download):</p>
<ol>
<li> phpMyAdmin (maybe not &#8216;required&#8217; but you want it)</li>
<li> MySQL</li>
<li> An open Terminal window (../Applications/Utilities/Terminal.app)</li>
</ol>
<p><strong>Disclaimer:</strong> This tutorial is for Mac OSX 10.8. I&#8217;ve seen it work on 10.6 and 10.7 but you may run into bugs that I don&#8217;t solve in this post.</p>
<p>Now let&#8217;s get cooking! The first step is in Terminal. Before we really delve in we want to make a backup copy of the files we&#8217;re going to edit. Skip this step if you like, but do so at your own peril. I don&#8217;t want to see angry comments later saying I broke your machine.</p>
<h3>Step 0: Setup / Backup</h3>
<p>If it doesn&#8217;t already exit, make a file under your home directory called &#8220;Sites&#8221;. This is going to be the root of your server, and where you will store all your sites. In this new folder make another folder called somethig liek &#8216;server-backup&#8217;. This is where we will backup to.</p>
<p>The three files we will be editing are:</p>
<ol>
<li><code>httpd.conf</code></li>
<li><code>httpd-vhosts.conf</code></li>
<li><code>[username].conf</code></li>
</ol>
<p>That last one is specific to you. During this post if I write &#8216;[username]&#8216; what I mean is your own username on the system. You can find this if you don&#8217;t know it by typing <code>whoami</code> into terminal and hitting return.</p>
<p>So to backup these files do the following commands.</p>
<ol>
<li><code>cp /etc/apache2/httpd.conf ~/Sites/server-backup</code></li>
<li><code>cp /etc/apache2/extra/httpd-vhosts.conf ~/Sites/server-backup</code></li>
<li><code>cp /etc/apache2/users/[username].conf ~/Sites/server-backup</code></li>
</ol>
<p>That last command may or may not work because you may not have created the [username].conf file yet. Don&#8217;t worry, we&#8217;ll get to that soon.</p>
<p><strong>One last setup step:</strong> You will need to be able to open files for editing <em>from the Terminal</em>. You can use whatever editor you want. My favorite is <a href="http://www.sublimetext.com/2" title="Sublime text 2">Sublime Text 2</a>. I wrote a quick <a href="http://iansinnott.com/" title="Thoughts on text editors">writeup on SB2</a> that you can check out if your interested. To see how to set up sublime for terminal use, check out this <a href="https://gist.github.com/artero/1236170">Gist on GitHub</a>. If you don&#8217;t want to do anything like that and just want to get moving, use nano. It&#8217;s built in to Terminal. Use it by typing something like the following:</p>
<pre><code>nano [filename]
</code></pre>
<p>Where &#8216;[filename]&#8216; would be the file you want to open and edit. It&#8217;s a bit esoteric so I don&#8217;t recommend it, but it&#8217;s built into your computer.</p>
<h3>Step 1: Enabling Apache</h3>
<p>Open up Terminal. Then use the following command to start Apache:</p>
<pre><code>sudo apachectl start
</code></pre>
<p>Now fire up your favorite browser and make sure everything is in order. In the nav bar type <a href="http://localhost">http://localhost</a>. You should see something like this displaying the text &#8220;It Works!&#8221;:</p>
<p><img src="http://coolestguyplanettech.com/downtown/sites/default/files/itworks.png" alt="it works apache" /></p>
<p>Now that we&#8217;re all set there, let&#8217;s see what we&#8217;re looking at. Localhost is the default web root for your local server. The file being displayed can be found here:</p>
<pre>/Library/WebServer/Documents/</pre>
<p>This is the system root, but we want to get your user root directory running properly. That&#8217;s the next step.</p>
<h3>The User Root</h3>
<p>Remember the &#8216;Sites&#8217; folder you created? Open finder and get to it. If you haven&#8217;t made that file yet for some reason, create it now and name it &#8216;Sites&#8217;. Here&#8217;s a pic I pulled from Google. You can see the Sites folder at the bottom.</p>
<h4>Set Up Development Folders</h4>
<p>Now within the Sites folder you need to create all the folders you want to be able to serve to your local browser. You can make as many as you want. For instance, my sites folder contains wp1.dev, wp2.dev, etc. I also have a folder named ian.dev where I keep the local installation of my personal site for editing. Name these folders whatever you want. The point is that each one will eventually contain a full site. Just name the folder something that you don&#8217;t mind typing into a browser (i.e. something short).</p>
<div id="attachment_28" style="width: 310px" class="wp-caption alignnone"><a href="http://phpbackward.files.wordpress.com/2013/01/home-folder.jpeg"><img src="http://phpbackward.files.wordpress.com/2013/01/home-folder.jpeg?w=300" alt="Making the sites folder" /></a><p class="wp-caption-text">This is the home folder for the user &#8216;admin&#8217;.</p></div>
<p>Now it&#8217;s time to get serious. We need to edit your computers hosts file so that when we actually type these addresses into the browser they are redirected. To edit the hosts file do this:</p>
<pre><code>sudo subl /private/etc/hosts
</code></pre>
<p>Or, if you are using nano do this:</p>
<pre><code>sudo nano /private/etc/hosts
</code></pre>
<p>It doesn&#8217;t matter what is currently in there, but don&#8217;t delete anything. What were going to do is add some lines to the bottom. You need to add &#8217;127.0.0.1&#8242; followed by the name of one of the folders you just created. So for my wp1.dev site I have a line in my hosts file that reads &#8217;127.0.0.1 wp1.dev&#8217;. Here&#8217;s a bit of my hosts file:</p>
<pre><code>127.0.0.1 ian.dev
127.0.0.1 wp1.dev
127.0.0.1 wp2.dev
127.0.0.1 wp3.dev
</code></pre>
<p>You see that I have my personal site plus three development servers. This list actually goes all the way to wp15.dev, but you get the point. I recommend creating more of these aliases than you think you will need so you don&#8217;t have to come back and edit hosts later. As I&#8217;ll show you in a bit, this allows me to simply create a new folder in Sites with one of these names and bam! a new site is good to go. Now save hosts and exit Sublime or whatever text editor your in.</p>
<p>Jump into Terminal and do the following two commands:</p>
<pre><code>cd /etc/apache2/users
sudo nano username.conf
</code></pre>
<p>You will need to enter your password to use sudo commands. For anyone not familiar with the Terminal, the first line gets us to the right folder and the second line opens up the file for editing. Past in the following, but remember to put your username in the place of &#8216;your_user_name&#8217;. For me it&#8217;s /Users/Ian/Sites/:</p>
<pre><code>&lt;Directory "/Users/ian/Sites/"&gt;
Options Indexes MultiViews FollowSymLinks
AllowOverride All AuthConfig
Order allow,deny
Allow from all
&lt;/Directory&gt;
</code></pre>
<p>Now save the changes and close out of nano. Your editing window will show you the hotkeys you need at the bottom. It will probably prompt you to name your file when you save. Keep the name unchanged so that we overwrite the original.</p>
<p>Now check the permissions on the file you just edited. To do that type <code>ls -lah</code> in Terminal. As long as you&#8217;re in the right directory already, it should look something like this:</p>
<pre><code>-rw-r--r--  1 root  wheel  148 12 28 21:11 username.conf
</code></pre>
<p>If the permissions come up with anything other than <code>-rw-r--r--</code> use this next command to fix them:</p>
<pre><code>sudo chmod 644 username.conf
</code></pre>
<p>Remember you can&#8217;t just copy and paste that. You need to write in your own username. Now restart Apache. You will need to use this command several more times so keep it on hand.</p>
<pre><code>sudo apachectl restart
</code></pre>
<h2>Setting Up PHP (editing httpd.conf)</h2>
<p>Finally! We&#8217;re going to get PHP running. This is actually super simple. All we have to do is uncomment a line in our Apache config file. Before we do that I will say again: <strong>BE CAREFUL!</strong> This file is one of those system files that can seriously break things if not handled with care. If you have been following from the beginning you already backed this file up, so your all set. Alright, back to it. Do this:</p>
<pre><code>sudo nano /etc/apache2/httpd.conf
</code></pre>
<p>Now find and uncomment the following line:</p>
<pre><code>LoadModule php5_module libexec/apache2/libphp5.so
</code></pre>
<p>When within nano, you can use the &#8216;control + W&#8217; hotkey to search the document. After you remove the &#8216;#&#8217; and save the file that&#8217;s it, PHP is enabled. However, I&#8217;m going to suggest you don&#8217;t close out of httpd.conf just yet. Let&#8217;s make a few more changes while were here.</p>
<p>Move down a number of lines to roughly 130. You should see two lines of code for User and Group. Comment the existing lines and input your own username and the group name staff. It should look like this:</p>
<pre><code>#User _www
#Group _www
User username
Group staff
</code></pre>
<p>This makes Apache run as you, meaning you will be given full server permissions. This is optional but it may save you trouble later. For me it was needed to allow local WordPress installations to download and install plugins/themes from the back end. I&#8217;ll also remind you again to make user you replace &#8216;username&#8217; with your own user name. If you&#8217;re having an identity crisis, use the <code>whoami</code> command.</p>
<p>Now find the following line of code via search (ctrl+w in nano):</p>
<pre><code>#Include /private/etc/apache2/extra/httpd-vhosts.conf
</code></pre>
<p>Remove the pound sign to uncomment. This enables the virtual hosts file which is necessary to turn our folders within Sites into local websites.</p>
<p>Finally, search for the text “AllowOverride”. This will bring you to a comment block describing “what directives may be placed in .htaccess files.” This is what you’re after. Change the line <code>AllowOverride None</code> to <code>AllowOverride All</code>. Save and close your httpd.conf file, hopefully you will never have to touch it again.</p>
<p><strong>The User.conf File</strong></p>
<p>Next we need to edit a user specific file. In terminal do the following, replacing username with your user name:</p>
<pre>sudo nano /private/etc/apache2/users/Ian.conf</pre>
<p>Make sure the file looks like this:</p>
<pre><code>&lt;Directory "/Users/your_user_name/Sites/"&gt;
Options Indexes MultiViews FollowSymLinks
AllowOverride All AuthConfig
Order allow,deny
Allow from all
&lt;/Directory&gt;
</code></pre>
<p>Save and close that file. Then restart Apache (remember the command?).</p>
<h2>Virtual Hosts</h2>
<p>Open up the virtual hosts file:</p>
<pre><code>sudo subl /private/etc/apache2/extra/httpd-vhosts.conf
</code></pre>
<p>You should see a file around 40 lines long, with a couple of virtual host entries. These are sample entries. We&#8217;re going to be making a number of entries in here and they will depend on how you named your files within Sites. The head of your virtual-hosts file will need a line like this:</p>
<pre><code>NameVirtualHost *:80

&lt;VirtualHost *:80&gt;
DocumentRoot "/Users/ian/Sites"
&lt;/VirtualHost&gt;
</code></pre>
<p>Then you need to specify the actual virtual hosts for each of your local sites. Here is a sample from my own vhosts file:</p>
<pre><code>&lt;VirtualHost *:80&gt;
    DocumentRoot "/Users/Ian/Sites/wp1.dev"
    ServerName wp1.dev
&lt;/VirtualHost&gt;
&lt;VirtualHost *:80&gt;
    DocumentRoot "/Users/Ian/Sites/wp2.dev"
    ServerName wp2.dev
&lt;/VirtualHost&gt;
&lt;VirtualHost *:80&gt;
    DocumentRoot "/Users/Ian/Sites/wp3.dev"
    ServerName wp3.dev
&lt;/VirtualHost&gt;
</code></pre>
<p>You can see the pattern. All you need to do is create lines like these replacing the directory to your sites folder as well as the folder names.</p>
<p>Within the VirtualHost block the first line points to the file location on the system and the second line indicates the web address. Meaning that when you type that string into your browser you should get to the folder indicated in line one. So after you input all the virtual hosts you want then you&#8217;re done! Finally. Now you should be able to input any of these addresses and get to that folder, which is probably still empty at this point.</p>
<p>So now we should be up and running with PHP. To make sure go to your document root (either the sites folder or the system root mentioned above). Find the file that&#8217;s currently being served at localhost. It will probably be named something like &#8216;index.html&#8217;. Now edit this using either the nano command or any text editor. Here&#8217;s the nano command on my system:</p>
<pre>sudo nano Library/WebServer/Documents/index.php</pre>
<p>Edit that file and add the following code to anywhere. Here&#8217;s what my &#8216;index.php&#8217; file looks like. I added an extra paragraph to remind myself where the doc was being served from:</p>
<p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;html&gt;&lt;body&gt;&lt;/p&gt;

&lt;h1&gt;It works!&lt;/h1&gt;

&lt;p&gt;This doc at: /Library/WebServer/Documents/
&amp;lt;?php phpinfo();&gt;
&lt;/body&gt;&lt;/html&gt;
</pre>
</p>
<pre>&lt;?php phpinfo(); ?&gt;</pre>
<p>Save the file. Now when you reload localhost you should see all your php info. NOTE: Be sure that the file is a .php file. I think by default it will be a .html file so you may need to change it.</p>
<p>If you don&#8217;t get the expected page with a big list of php settings then something went wrong. Check the filename, check that you edited the file in the right directory and if that doesn&#8217;t work go back up and try following from the beginning of this section again.</p>
<h2>MySQL</h2>
<p>So now we have PHP and Apache up and running. The last key ingredient MySQL. To be half-decent PHP developers we need to be able to work well with a database, so even though you could start coding PHP right now with the current setup we still need a database. Download it from the <a href="http://dev.mysql.com/downloads/mysql/" title="download mysql">MySQL site</a>. Use the Mac OS X ver. 10.6 (x86, 64-bit), DMG Archive version (works fine on 10.8). Install everything that comes in the DMG.</p>
<p>You can now start the MySQL server from the System Preferences pane or via the command line.<a href="http://phpbackward.files.wordpress.com/2013/01/e89ea2e5b995e5bfabe785a7-2013-01-22-e4b88ae58d882-14-31.png"><img src="http://phpbackward.files.wordpress.com/2013/01/e89ea2e5b995e5bfabe785a7-2013-01-22-e4b88ae58d882-14-31.png" alt="You can start the MySQL server from the System Preferences" /></a></p>
<h4>Set The Root Password</h4>
<p>Use this command, and remember the password you use:<br />
<code>/usr/local/mysql/bin/mysqladmin -u root password 'yourpasswordhere'</code><br />
Now we&#8217;re ready for phpMyAdmin.</p>
<h2>Installing phpMyAdmin</h2>
<p>If I wrote up this section I would pretty much just be copying word for word the article that helped me get it set up, so I&#8217;m just going to point you there. Here&#8217;s the link:<br />
<a href="http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion" title="phpMyAdmin installation">Installing phpMyAdmin</a><br />
If you have read along here you can scroll down to the last section where you will find out how to get phpMyAdmin up and running. This is a very good article and if anything has gone wrong up to this point I suggest checking it out, as I may have forgotten something. Once you get phpMyAdmin set up your done! Now we can get to the real purpose of why were here: Coding PHP.</p>
<h2>Done!</h2>
<h4>External Resources</h4>
<p>Most of what I wrote here is a combination of various articles I read myself to learn how to make this work. Here are two great articles that talk about setting up your own AMP stack and working with virtual hosts, respectively:</p>
<ul>
<li><a href="http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion" title="setting up amp stack">Install and configure phpMyAdmin and MySql on Mac</a></li>
<li><a href="http://wpcandy.com/teaches/how-to-improve-local-wordpress-development-on-a-mac/#.UP43IaFARdQ" title="virtual hosts with wordpress">How to improve local WordPress development</a></li>
</ul>
