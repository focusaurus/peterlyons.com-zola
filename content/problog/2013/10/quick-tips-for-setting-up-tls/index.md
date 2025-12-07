+++
title = "Quick Tips for Setting Up TLS"
date = 2013-10-17T18:46:14.775Z
+++
Here's a few quick links that I found really helpful setting up an nginx web site to use a TLS certificate.

* [Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS) on the Mozilla wiki
* Qualys SSL Labs [SSL Deployment Best Practices](https://www.ssllabs.com/projects/best-practices/index.html)
* Qualys's [SSL Server Test](https://www.ssllabs.com/ssltest/index.html). If you follow the Mozilla guidelines, you should score an "A" on this test.
* [nginx library](http://nginxlibrary.com/) has a few useful sample nginx configuration files. It's stale and only has a few posts, but it was a nice idea in theory if not in execution.

Some commands for reference:

  * generate a new 2048-bit RSA private key, named with hostname and year
    * Adding the year will make replacing the certificate when it expires an easy symlink swap operation and avoid confusion. Install the new files then swap the symlinks when ready
  * `openssl genrsa -out example.com-2013.key 2048`
  * lock down its filesystem permissions
  * `chown root:root example.com-2013.key`
  * `chmod 400 example.com-2013.key`
  * symlink it for convenience
  * `ln -nsf example.com-2013.key example.com.key`
  * Create a certificate signing request
  * `openssl req -new -sha256 -nodes -key example.com.key -out example.com-2013.csr`
  * paste that into [NameCheap](http://namecheap.com) or whichever vendor you prefer to have them sign it
  * when the certificate arrives, unzip it and concatenate it as follows
  * `cat example_com.crt PositiveSSLCA2.crt AddTrustExternalCARoot.crt > example.com-2013.bundle.crt`
  * symlink that for convenience
  * `ln -nsf example.com-2013.bundle.crt example.com.crt`
  * generate a dhparam file
  * `openssl dhparam -out example.com-2013.dhparam.pem 2048`
  * `ln -nsf example.com-2013.dhparam.pem example.com.dhparam.pem`

For express.js, make sure your session middleware has `proxy: true, secure: true, httpOnly: true` options set.
