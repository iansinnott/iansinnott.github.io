---
title: "Using Docker on a Mac with Boot2Docker"
---

## One thing to remember

When your running [boot2docker][bd] on a Mac (and probably Windows as well) it's important to remember that ports exposed by your containers will not be directly accessible via localhost as you might expect. Since docker is running within boot2docker containers will be exposed via ports on the boot2docker IP.

For example, if running `docker ps` tells you your app is exposing port 80 on some high-numbered port on the local host, it is actually exposed via boot2dockers IP:

```
$ docker ps
CONTAINER ID    IMAGE NAMES      PORTS
6751b94bb5c0    ubuntu:latest    0.0.0.0:49154->80/tcp
```

Going to `0.0.0.0:49154` in your browser won't work. You need to replace `0.0.0.0` with boot2docker's IP address. To find it, run:

```
$ boot2docker ip

The VM's Host only interface IP address is: 192.168.55.555

```

Putting that into the browser will along with the correct port will give you `192.168.55.555:49154` and you will be able to access your web app as expected.

This may all be very simple for anyone familiar with networking, but it took me a good amount of time to figure this out with no error message. I guess you should just run Docker on Linux :wink:

[bd]: http://boot2docker.io/

Although not entirely related, I wrote a gist to automatically export boot2docker's IP address into an environment variable whenever it is set:

{% gist iansinnott/0a0c212260386bdbfafb %}
