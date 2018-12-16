+++
title = "And the bots show up"
slug = "2011/02/and-the-bots-show-up"
date = 2011-02-06T02:00:35.000Z
+++
I set up a staging server for a web app I'm working on yesterday. This morning I find this in my rails log.

<div class="code">

<pre>ActionController::RoutingError (No route matches "/scripts/setup.php"):
ActionController::RoutingError (No route matches "/sql/scripts/setup.php"):
ActionController::RoutingError (No route matches "/web/scripts/setup.php"):
ActionController::RoutingError (No route matches "/scripts/setup.php"):
ActionController::RoutingError (No route matches "/admin/scripts/setup.php"):
ActionController::RoutingError (No route matches "/PMA/scripts/setup.php"):
ActionController::RoutingError (No route matches "/phpmyadmin/scripts/setup.php"):
</pre>

</div>

Thus the shotgun bot scanning has commenced. It's funny how organic and viral (viral in the bad sense) the web is given it's all just computer programs.