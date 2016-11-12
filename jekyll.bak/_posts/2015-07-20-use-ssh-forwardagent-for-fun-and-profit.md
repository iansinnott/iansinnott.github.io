---
layout: post
title: "Use SSH ForwardAgent for fun and profit"
comments: true
---

Yesterday I discovered something amazing. With just _one line_ of code you can bypass the annoyance of not being able to access private web services (i.e. GitHub) while SSHed into a machine. The method is called SSH agent forwarding and it's changed my deployment workflow. 

Here's the quick version. For every `Host` in your `~/.ssh/config` file you can add a new line that allows you to use your own _local_ SSH keys even while SSHed into the remote server. Example:

```
Host myhost
  HostName X.X.X.X
  ForwardAgent yes # <-- This line is key
```

See that last line? That is all it takes to turn on agent forwarding whenever you SSH into the server called `myhost`. Cool right? 

### The workflow

So, you might be wondering why this matters. The answer is ease of deployment. For small and even mid-size projects it's probably not too much to ask to SSH in to the actual server whenever you need to deploy new code. This may not be the best or easiest deployment workflow, but it not difficult and it's quite simple. 

Furthermore, if your deployment process ever breaks it will not be difficult to troubleshoot because you will understand every step as opposed to using some automated deployment method that makes everything ten times as complex.

Now that you have ForwardAgent turned on, you can do something like this:

1. Change the codebase. Commit changes
2. `git push`
3. `ssh` into production server. `cd` into app directory
4. `git pull`
5. Restart your app, now with up-to-date code

I love this workflow, mainly because step 4 is much easier than it was before I discovered `ForwardAgent`. Since you can easily pull code from any private repo that you have SSH access to you can now use Git as your primary means of deployment.

Step 5 will depend on your setup and is up to you, but hopefully it's nothing too onerous. If it is, then I suggest you check out [Docker][docker]. It may just make your deployment life a whole lot better.

[docker]: https://www.docker.com/
