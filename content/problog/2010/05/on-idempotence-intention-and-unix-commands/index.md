+++
title = "On Idempotence, intention, and unix commands"
slug = "2010/05/on-idempotence-intention-and-unix-commands/"
date = 2010-05-21T09:42:05.000Z
+++
[Idempotence](http://en.wikipedia.org/wiki/Idempotence#In_computing) means that running a command or function several times produces the same result as running it only once. This is an very important design principle that is a blessing when used appropriately and a scourge when not used where warranted.

For analogy, imagine you ask a housemate (or butler if that's how you roll) to empty the dishwasher. They dutifully go over there, open the dishwasher door, and find it's already empty. How do they react? Do they come back to you shouting in confusion "You fool! How can I empty the dishwasher if there's nothing in it! Oh woe is me. What am I to do?"? Or do they just think to themselves "score!" and go on a coffee break, leaving you to go about your business trusting that the dishwasher is now empty?

Another analogy is from the military's notion of "management by intent" wherein a commander might order his troops to "have camp fully operational by noon" as opposed to dictating specific tactics that must be taken in order to achieve the intended outcome. This way, the troops can rely on their own abilities to achieve the intent and are empowered to respond to changing or unexpected circumstances independently.

Now, when it comes to computer programs, UNIX has a mixed bag of utilities that understand this and some that don't.

<div class="code">

<pre>mkdir /tmp/2;echo $?;mkdir /tmp/2;echo $?
0
mkdir: cannot create directory `/tmp/2': File exists
1

rm /tmp/foo;echo $?;rm /tmp/foo;echo $?
0
rm: cannot remove `/tmp/foo': No such file or directory
1

</pre>

</div>

So the bad examples include `mkdir, rmdir, rm, ln, and perhaps kill (debatable)`. Think about how much simpler using a command line and writing shell scripts would be if these were idempotent and instead of panicking in horror when the user does not know the current state of the filesystem, just allowed the user to describe the desired end state. I would love to have idempotent and recursive by default commands like `mkdir -p` or `rm -rf` in combination with a transactional filesystem with built in undo capabilities.

Good idempotent examples include `touch, tar, zip, cp, chmod`.

So the point about design and usability here is **it's good to ask oneself "What is the user's intent here?"**, and try to do everything in your power to work in concert with that intention. A strong and painful negative example from my career has to do with the fact that the Solaris `patchadd` program is not idempotent and it doesn't return exit codes according to the user's intent. So when I run `patchadd 123456-01`, really my intention is "I want this system to be OK with regard to patch 123456-01". `patchadd` will return a non-zero exit code if the patch is already installed or the patch is not applicable to the server or if a newer revision is already installed. As a user of `patchadd`, I don't care. It's all success to me, and nor do I want to be bothered with implementation details within patchadd such as not installing a patch if a newer revision is already installed. I think many shell scripts would be a lot smaller and clearer and simpler without always having to wrap `mkdir` in an `if [ ! -d /blah/dir ]` clause to avoid spurious error output.

A few other links on this topic:

*   [The Importance of Idempotence (devhawk)](http://devhawk.net/2007/11/09/The+Importance+Of+Idempotence.aspx)
*   [Java Glossary entry on Idempotent](http://www.allapplabs.com/glossary/idempotent.htm). I like this quote "Elevator call buttons are also idempotent, though many people think they are not."
*   [Stack Overflow: What is an idempotent operation?](http://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation)