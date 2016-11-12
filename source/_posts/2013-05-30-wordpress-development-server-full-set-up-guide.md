---
title: "WordPress Development Server - Full Set Up Guide"
dsq_thread_id:
  - 1337579457
  - 1337579457
categories:
  - web
  - wordpress
---

## Unleashing your WordPress Development Server

So you want to escape inclusive packages like MAMP, learn about web servers and generally code like a boss? Well if you use a Mac your in the right place, but guess what we need before we get started? A local development environment! If you don't know what that is, read the next paragraph. If you do, then skip down. Even if you already have a local dev server set up this will still be useful knowledge should you want to untether yourself from MAMP or any other AMP stack bundle.

<!--more-->

**Windows Users:** This article is about setting up a local dev environment on Mac OSX 10.8. You will also need to get an AMP stack up and running but I'm not familiar with Windows so I'm just going to recommend [WAMP](http://bitnami.org/stack/wamp) (sigh).

## The Local Dev Environment

When you code in PHP you need somewhere to test your work as you go along. This is where the local dev server comes in. You will also need a local dev server if you do any sort of online development. What the local dev server is&#8230; is just that: a server that runs on your computer. When you buy web hosting your paying for disk space on someone else's server. That server is running server-side software that let's you do many things, like using PHP and MySQL. So we're going to set up the same thing running from our own computer. This means web files (.php, .html, etc.) on your own hard drive will be hosted and served to your browser. **Let's go!**

### This tutorial

There are so many tutorials on this subject out there, so why read this one&#8230; I'll tell you: Because most of the rest suck. Notice how I said most. I will refer in this lesson to some tutorials elsewhere that are actually very useful. Also, I will be focusing on setting up a professional dev environment, free of MAMP or XAMP or whatever else is out there. If you've ever seen/used MAMP Pro this is essentially setting up the same thing without a GUI. And my way is free!

There is also the added benefit that you get to better understand your server, learn a bit of terminal and in the end feel a huge sense of accomplishment (maybe). So with that, let's see what we will need to get started.

### Necessary Ingredients
Todays recipe is fairly simple in prep, more difficult later on in pickup. Her's what we need (follow the links to download):

1. phpMyAdmin (maybe not 'required' but you want it)
2. MySQL
3. An open Terminal window (../Applications/Utilities/Terminal.app)

**Disclaimer:** This tutorial is for Mac OSX 10.8. I've seen it work on 10.6 and 10.7 but you may run into bugs that I don't solve in this post.

Now let's get cooking! The first step is in Terminal. Before we really delve in we want to make a backup copy of the files we're going to edit. Skip this step if you like, but do so at your own peril. I don't want to see angry comments later saying I broke your machine.

### Step 0: Setup / Backup

If it doesn't already exit, make a file under your home directory called `Sites`. This is going to be the root of your server, and where you will store all your sites. In this new folder make another folder called something like 'server-backup'. This is where we will backup to.

The three files we will be editing are:

1. `httpd.conf`
2. `httpd-vhosts.conf`
3. `[username].conf`

That last one is specific to you. During this post if I write '[username]' what I mean is your own username on the system. You can find this if you don't know it by typing `whoami` into terminal and hitting return.

So to backup these files do the following commands.


1. `cp /etc/apache2/httpd.conf ~/Sites/server-backup`
2. `cp /etc/apache2/extra/httpd-vhosts.conf ~/Sites/server-backup`
3. `cp /etc/apache2/users/[username].conf ~/Sites/server-backup`

That last command may or may not work because you may not have created the [username].conf file yet. Don't worry, we'll get to that soon.

**One last setup step:** You will need to be able to open files for editing _from the Terminal_. You can use whatever editor you want. My favorite is [Sublime Text 2](http://www.sublimetext.com/2). I wrote a quick [writeup on SB2](http://iansinnott.com) that you can check out if your interested. To see how to set up sublime for terminal use, check out this [Gist on GitHub](https://gist.github.com/artero/1236170). If you don't want to do anything like that and just want to get moving, use nano. It's built in to Terminal. Use it by typing something like the following:

```
nano [filename]
```

Where '[filename]' would be the file you want to open and edit. It's a bit esoteric so I don't recommend it, but it's built into your computer.

### Step 1: Enabling Apache

Open up Terminal. Then use the following command to start Apache:

```
sudo apachectl start
```

Now fire up your favorite browser and make sure everything is in order. In the nav bar type <a href="http://localhost">http://localhost</a>. You should see something like this displaying the text &#8220;It Works!&#8221;:

<img src="http://coolestguyplanettech.com/downtown/sites/default/files/itworks.png" alt="it works apache" />

Now that we're all set there, let's see what we're looking at. Localhost is the default web root for your local server. The file being displayed can be found here:

```
/Library/WebServer/Documents/
```

This is the system root, but we want to get your user root directory running properly. That's the next step.

### The User Root

Remember the 'Sites' folder you created? Open finder and get to it. If you haven't made that file yet for some reason, create it now and name it 'Sites'. Here's a pic I pulled from Google. You can see the Sites folder at the bottom.

#### Set Up Development Folders

Now within the Sites folder you need to create all the folders you want to be able to serve to your local browser. You can make as many as you want. For instance, my sites folder contains wp1.dev, wp2.dev, etc. I also have a folder named ian.dev where I keep the local installation of my personal site for editing. Name these folders whatever you want. The point is that each one will eventually contain a full site. Just name the folder something that you don't mind typing into a browser (i.e. something short).

<a href="http://phpbackward.files.wordpress.com/2013/01/home-folder.jpeg"><img src="http://phpbackward.files.wordpress.com/2013/01/home-folder.jpeg?w=300" alt="Making the sites folder" /></a>

This is the home folder for the user 'admin'.

Now it's time to get serious. We need to edit your computers hosts file so that when we actually type these addresses into the browser they are redirected. To edit the hosts file do this:

```
sudo subl /private/etc/hosts
```

Or, if you are using nano do this:

```
sudo nano /private/etc/hosts
```
<p>It doesn't matter what is currently in there, but don't delete anything. What were going to do is add some lines to the bottom. You need to add '127.0.0.1&#8242; followed by the name of one of the folders you just created. So for my wp1.dev site I have a line in my hosts file that reads '127.0.0.1 wp1.dev'. Here's a bit of my hosts file:</p>
```
127.0.0.1 ian.dev
127.0.0.1 wp1.dev
127.0.0.1 wp2.dev
127.0.0.1 wp3.dev
```

<p>You see that I have my personal site plus three development servers. This list actually goes all the way to wp15.dev, but you get the point. I recommend creating more of these aliases than you think you will need so you don't have to come back and edit hosts later. As I'll show you in a bit, this allows me to simply create a new folder in Sites with one of these names and bam! a new site is good to go. Now save hosts and exit Sublime or whatever text editor your in.</p>
<p>Jump into Terminal and do the following two commands:</p>

```
cd /etc/apache2/users
sudo nano username.conf
```

You will need to enter your password to use sudo commands. For anyone not familiar with the Terminal, the first line gets us to the right folder and the second line opens up the file for editing. Past in the following, but remember to put your username in the place of 'your_user_name'. For me it's /Users/Ian/Sites/:

```
<Directory "/Users/ian/Sites/">
Options Indexes MultiViews FollowSymLinks
AllowOverride All AuthConfig
Order allow,deny
Allow from all
</Directory>
```

Now save the changes and close out of nano. Your editing window will show you the hotkeys you need at the bottom. It will probably prompt you to name your file when you save. Keep the name unchanged so that we overwrite the original.

Now check the permissions on the file you just edited. To do that type `ls -lah` in Terminal. As long as you're in the right directory already, it should look something like this:

```
-rw-r--r--  1 root  wheel  148 12 28 21:11 username.conf
```
If the permissions come up with anything other than `-rw-r--r--` use this next command to fix them:

```
sudo chmod 644 username.conf
```

Remember you can't just copy and paste that. You need to write in your own username. Now restart Apache. You will need to use this command several more times so keep it on hand.

```
sudo apachectl restart

```

## Setting Up PHP (editing httpd.conf)

Finally! We're going to get PHP running. This is actually super simple. All we have to do is uncomment a line in our Apache config file. Before we do that I will say again: **BE CAREFUL!** This file is one of those system files that can seriously break things if not handled with care. If you have been following from the beginning you already backed this file up, so your all set. Alright, back to it. Do this:

```
sudo nano /etc/apache2/httpd.conf

```

<p>Now find and uncomment the following line:</p>

```
LoadModule php5_module libexec/apache2/libphp5.so

```

When within nano, you can use the 'control + W' hotkey to search the document. After you remove the '#' and save the file that's it, PHP is enabled. However, I'm going to suggest you don't close out of httpd.conf just yet. Let's make a few more changes while were here.

Move down a number of lines to roughly 130. You should see two lines of code for User and Group. Comment the existing lines and input your own username and the group name staff. It should look like this:

```
#User _www
#Group _www
User username
Group staff

```

This makes Apache run as you, meaning you will be given full server permissions. This is optional but it may save you trouble later. For me it was needed to allow local WordPress installations to download and install plugins/themes from the back end. I'll also remind you again to make user you replace 'username' with your own user name. If you're having an identity crisis, use the `whoami` command.

Now find the following line of code via search (ctrl+w in nano):

```
#Include /private/etc/apache2/extra/httpd-vhosts.conf

```

Remove the pound sign to uncomment. This enables the virtual hosts file which is necessary to turn our folders within Sites into local websites.

Finally, search for the text “AllowOverride”. This will bring you to a comment block describing “what directives may be placed in .htaccess files.” This is what you’re after. Change the line `AllowOverride None` to `AllowOverride All`. Save and close your httpd.conf file, hopefully you will never have to touch it again.

**The User.conf File**

Next we need to edit a user specific file. In terminal do the following, replacing username with your user name:

```
sudo nano /private/etc/apache2/users/Ian.conf
```

Make sure the file looks like this:

```
<Directory "/Users/your_user_name/Sites/">
Options Indexes MultiViews FollowSymLinks
AllowOverride All AuthConfig
Order allow,deny
Allow from all
</Directory>
```

Save and close that file. Then restart Apache (remember the command?).

## Virtual Hosts

Open up the virtual hosts file:

```
sudo subl /private/etc/apache2/extra/httpd-vhosts.conf

```

You should see a file around 40 lines long, with a couple of virtual host entries. These are sample entries. We're going to be making a number of entries in here and they will depend on how you named your files within Sites. The head of your virtual-hosts file will need a line like this:

```
NameVirtualHost *:80

<VirtualHost *:80>
DocumentRoot "/Users/ian/Sites"
</VirtualHost>
```
Then you need to specify the actual virtual hosts for each of your local sites. Here is a sample from my own vhosts file:

```
<VirtualHost *:80>
    DocumentRoot "/Users/Ian/Sites/wp1.dev"
    ServerName wp1.dev
</VirtualHost>
<VirtualHost *:80>
    DocumentRoot "/Users/Ian/Sites/wp2.dev"
    ServerName wp2.dev
</VirtualHost>
<VirtualHost *:80>
    DocumentRoot "/Users/Ian/Sites/wp3.dev"
    ServerName wp3.dev
</VirtualHost>
```
You can see the pattern. All you need to do is create lines like these replacing the directory to your sites folder as well as the folder names.

Within the VirtualHost block the first line points to the file location on the system and the second line indicates the web address. Meaning that when you type that string into your browser you should get to the folder indicated in line one. So after you input all the virtual hosts you want then you're done! Finally. Now you should be able to input any of these addresses and get to that folder, which is probably still empty at this point.

So now we should be up and running with PHP. To make sure go to your document root (either the sites folder or the system root mentioned above). Find the file that's currently being served at localhost. It will probably be named something like 'index.html'. Now edit this using either the nano command or any text editor. Here's the nano command on my system:

```
sudo nano Library/WebServer/Documents/index.php
```

Edit that file and add the following code to anywhere. Here's what my 'index.php' file looks like. I added an extra paragraph to remind myself where the doc was being served from:

```
<html><body></p>
<h1>It works!</h1>
<p>This doc at: /Library/WebServer/Documents/
<?php phpinfo();>
</body></html>
```

Save the file. Now when you reload localhost you should see all your php info. NOTE: Be sure that the file is a .php file. I think by default it will be a .html file so you may need to change it.

If you don't get the expected page with a big list of php settings then something went wrong. Check the filename, check that you edited the file in the right directory and if that doesn't work go back up and try following from the beginning of this section again.

## MySQL

So now we have PHP and Apache up and running. The last key ingredient MySQL. To be half-decent PHP developers we need to be able to work well with a database, so even though you could start coding PHP right now with the current setup we still need a database. Download it from the <a href="http://dev.mysql.com/downloads/mysql/" title="download mysql">MySQL site</a>. Use the Mac OS X ver. 10.6 (x86, 64-bit), DMG Archive version (works fine on 10.8). Install everything that comes in the DMG.

You can now start the MySQL server from the System Preferences pane or via the command line.<a href="http://phpbackward.files.wordpress.com/2013/01/e89ea2e5b995e5bfabe785a7-2013-01-22-e4b88ae58d882-14-31.png"><img src="http://phpbackward.files.wordpress.com/2013/01/e89ea2e5b995e5bfabe785a7-2013-01-22-e4b88ae58d882-14-31.png" alt="You can start the MySQL server from the System Preferences" /></a>

#### Set The Root Password

Use this command, and remember the password you use:

`/usr/local/mysql/bin/mysqladmin -u root password 'yourpasswordhere'`

Now we're ready for phpMyAdmin.

## Installing phpMyAdmin

If I wrote up this section I would pretty much just be copying word for word the article that helped me get it set up, so I'm just going to point you there. Here's the link:

<a href="http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion" title="phpMyAdmin installation">Installing phpMyAdmin</a>

If you have read along here you can scroll down to the last section where you will find out how to get phpMyAdmin up and running. This is a very good article and if anything has gone wrong up to this point I suggest checking it out, as I may have forgotten something. Once you get phpMyAdmin set up your done! Now we can get to the real purpose of why were here: Coding PHP.

## Done!

## External Resources

Most of what I wrote here is a combination of various articles I read myself to learn how to make this work. Here are two great articles that talk about setting up your own AMP stack and working with virtual hosts, respectively:

- <a href="http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion" title="setting up amp stack">Install and configure phpMyAdmin and MySql on Mac</a>
- <a href="http://wpcandy.com/teaches/how-to-improve-local-wordpress-development-on-a-mac/#.UP43IaFARdQ" title="virtual hosts with wordpress">How to improve local WordPress development</a>
