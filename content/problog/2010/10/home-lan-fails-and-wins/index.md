+++
title = "Home LAN fails and wins"
date = 2010-10-11T04:16:55.000Z
+++
So my trusty Linksys wireless router up and died on me a few months ago. Of course, in a geek's world, lack of Wifi at home is a stop-the-line emergency, so of course I just immediately drove to a local brick and mortar store to get a replacement. I bought a Belkin as it was the cheapest. It seems to not have the ability to remember MAC to IP mappings for any significant length of time, which meant all my laptops and VMs were constantly changing IPs. I even ended up writing a little script to update `/etc/issue` on my VMs so I could see their current IP without needing to log in. Well, after a while I was finally frustrated with this enough to go see if the [DD-WRT](http://www.dd-wrt.com) replacement firmware was available. It wasn't, so I thought I'd get a different model so I could enjoy the DHCP with static IP mappings goodness. I clicked my handy bookmark for local craigslist and bam, there's a guy in my town selling a Buffalo WHR-G126 for $25 with the latest dd-wrt already installed. w00t! After a conversation over a few emails, calls, and texts, we rendezvoused in town just an hour or so later and completed our transaction.

So now my network is so nice and lovely. All my devices use DHCP, but the router remembers the devices that "live here" and gives them each a static IP address and entry in DNS. Hurray for dd-wrt and craigslist.

In case you might find this useful, here's a script to find the current IP address of a machine and put it into `/etc/issue` so you can see it on the login screen without actually logging in.

*   First, edit `/etc/issue` with a placeholder line (as root) like this: `echo "IP Address: " >> /etc/issue`
*   Second, edit `/etc/rc.local` and append this little bit of code.

    <div class="code">

    <pre>#plyons. Display the IP at the login screen so we can SSH in
    #without loggin in on the console
    getip() {
        IP=`ifconfig eth0 | egrep " inet addr:" | cut -d : -f 2 | cut -d " " -f 1`
    }
    getip
    if [ -z "${IP}" ]; then
        sleep 10 #Wait for network to initialize
        getip
    fi
    perl -pi -e "s/IP Address: .*/IP Address: ${IP}/" /etc/issue
    </pre>

    </div>

Now this has a lot of assumptions (one NIC called eth0, etc) and is in no way a generic solution, but for most VMs, it will probably get the job done as is or with a small tweak.