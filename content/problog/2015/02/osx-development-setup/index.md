+++
title = "OSX Development Setup"
date = 2015-02-06T20:42:03.350Z
+++
This post will describe my current setup for development on OS X.

### Requirements

- easy to maintain
- easy to recreate
- easy to work with during development
- friendly to many projects/clients with highly varied software stacks
- don't pollute my main OSX install too much
- Don't interfere with my core tools: text editor, local filesystem, git, command line terminal
- allow offline work
- don't make me crazy with too many DHCP IPs, port mappings, virtual networks, etc

### Tools

- [VirtualBox](https://www.virtualbox.org/) for running other OSes in VMs on top of OS X
- Ubuntu as my preferred OS for linux based servers
- [Docker](https://www.docker.com/) for containerized apps
- [Vagrant](https://www.vagrantup.com/) to script creation of virtualbox VMs
- [boot2docker](http://boot2docker.io/)

![OSX Dev Setup](/problog/images/2015/osx-dev-setup.png)

### My App Stacks

I generally build web applications that involve a node.js based application server, one or more database servers, and an optional front-end web server (used in stage and production but not in development).

### Just go to town with homebrew?

The simplest thing would probably be to install all my tools and databases with homebrew straight into OS X. And I think actually that's probably fine for a lot of people. I don't do it for reasons that are admittedly a bit emotional/OCD.

- I feel like getting too much stuff installed in my OS gradually pollutes it, destabilizes it, slows it down, and makes me feel doubt about it
- Managing background daemons on OS X is awkward
- Since I deploy to linux, I'd like to run and manage my DBs  on linux

### VirtualBox for DBs

So for the above reasons, I use Vagrant to script a base Ubuntu VM I call "dbs". I give this 2 network interfaces:

- Adapter 1 is a NAT setup with a DHCP-assigned IP that gives the VM access to the Internet via my Mac's Internet connection
- Adapter 2 is a host-only network with a static IP so I can always access this host

I put the host name "dbs" with the host-only IP in my `/etc/hosts` file on my mac and I can access it via `ssh dbs`. I directly install via `apt-get install` all the DBs I want to use for local development and client work: postgresql, mysql, couchdb, elasticsearch, etc. I run these on the default port for simplicity and try not to do too much configuration. I do have to configure them to bind to the host-only IP address though, which also makes sure they are not reachable from anywhere other than my mac.

That gets me what I need for developing multiple client projects. After a reboot I have a shell alias to start this VM: `VBoxManage startvm dbs`.

### Docker for staging containers

I've started using docker a bit both for client work and one personal side project and so far I'm liking it. To allow me to do docker builds and deploy containers, I run docker inside the "dbs" VM as well.

When I created this setup [boot2docker](http://boot2docker.io/) was not quite ready for prime time, but if I had to start over, I might just use boot2docker and run everything as containers. But what I have is every bit as easy to manage for the moment, so I haven't bothered to rebuild it.

So for docker work I just `export DOCKER_HOST=tcp://dbs:2375` and use the docker command from homebrew on my mac to do my docker work.

For my dockerized side project, I can run the full stack of docker containers exactly like I do in production all locally on my laptop, which provides an adequate staging environment such that I don't feel a dedicated staging system in the cloud is necessary. I use the same automation scripts to automate docker stuff on my staging VM and for production I just point them at the production host which is a digital ocean droplet. So far it's worked pretty well for me.
