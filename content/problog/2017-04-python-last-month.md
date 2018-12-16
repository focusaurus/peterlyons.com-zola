+++
title = "Python Last Month"
slug = "2017/04/python-last-month"
date = 2017-04-01T17:09:16.346Z
+++
I needed to compute timestamps representing the start and end of "last month" so I could build a URL needed to generate an invoicing report. Because the URL uses actual dates, I can't just bookmark it since it changes every month. Python has a lot of date and time management capabilities, but finding the one that is going to get the job done correctly and succinctly is actually harder than the code itself.

With that in mind, here's essentially a 3-liner that does it

```python
import time
import datetime

now = time.localtime()

# Get the last day of last month by taking the first day of this month
# and subtracting 1 day.
last = datetime.date(now.tm_year, now.tm_mon, 1) - datetime.timedelta(1)

# Set the day to 1 gives us the start of last month
first = last.replace(day=1)

# The default string representation of these datetime instances is 
# YYYY-mm-dd format (which is what I usually need),
# so we can just print them out
print first, last
```

Here's what I see running it on the command line.

```sh
python /tmp/range.py
2017-03-01 2017-03-31
```
