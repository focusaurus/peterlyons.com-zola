+++
title = "AWS API Gateway Misleading Error"
slug = "2017/02/aws-api-gateway-misleading-error"
date = 2017-02-02T15:47:44.807Z
+++
Just a quick note from the trenches of AWS Lambda and API Gateway. API Gateway will throw a very misleading HTTP 403 status code error with the JSON body `{"message": "Missing Authentication Token"}`. This would naturally lead us to think there's something wrong with authentication. But in my case, my endpoints are public, and this error simply means 404 Not Found that I've fat-fingered the path portion of the URL. Not sure why API Gateway responds this way, but rest assured there's no nasty IAM or API Token issue to debug, it's just an incorrect URL.

**Update:** Here's a link to the [AWS Forum Thread regarding this issue](https://forums.aws.amazon.com/thread.jspa?threadID=216684&tstart=0)
