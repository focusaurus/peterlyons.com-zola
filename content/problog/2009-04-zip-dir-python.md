+++
title = "How to zip a directory in python"
slug = "2009/04/zip-dir-python/"
date = 2009-04-27T10:04:03.000Z
+++
I came across this problem at work and also over on [this www.stackoverflow.com thread](http://stackoverflow.com/questions/458436/adding-folders-to-a-zip-file-using-python/792199#792199). You have a directory and you want to recursively zip it up. Simple, right? The equivalent of the unix command "zip myDir.zip myDir". Should be like 5 lines of code? Python even has a built in zipfile module, sweet! Well, as is often the case (see urllib and friends), python's "batteries included" slogan is more like "enough batteries for 36 seconds included". Anyway, it's more like 23 lines of functional code, which is still pretty good, but I would have expected the zipfile module to have this included and not have to use os.walk() to do this.

<div class="code">

<pre>#!/usr/bin/python
# -*- coding: utf-8 -*-
"""This is a sample function for zipping an entire directory into a zipfile"""

#This seems to work OK creating zip files on both windows and linux. The output
#files seem to extract properly on windows (built-in Compressed Folders feature,
#WinZip, and 7-Zip) and linux. However, empty directories in a zip file appear
#to be a thorny issue. The solution below seems to work but the output of
#"zipinfo" on linux is concerning. Also the directory permissions are not set
#correctly for empty directories in the zip archive. This appears to require
#some more in depth research.

#I got some info from:
#http://www.velocityreviews.com/forums/t318840-add-empty-directory-using-zipfile.html
#http://mail.python.org/pipermail/python-list/2006-January/535240.html
import os
import zipfile

def zipdir(dirPath=None, zipFilePath=None, includeDirInZip=True):
    """Create a zip archive from a directory.

    Note that this function is designed to put files in the zip archive with
    either no parent directory or just one parent directory, so it will trim any
    leading directories in the filesystem paths and not include them inside the
    zip archive paths. This is generally the case when you want to just take a
    directory and make it into a zip file that can be extracted in different
    locations. 

    Keyword arguments:

    dirPath -- string path to the directory to archive. This is the only
    required argument. It can be absolute or relative, but only one or zero
    leading directories will be included in the zip archive.

    zipFilePath -- string path to the output zip file. This can be an absolute
    or relative path. If the zip file already exists, it will be updated. If
    not, it will be created. If you want to replace it from scratch, delete it
    prior to calling this function. (default is computed as dirPath + ".zip")

    includeDirInZip -- boolean indicating whether the top level directory should
    be included in the archive or omitted. (default True)

"""
    if not zipFilePath:
        zipFilePath = dirPath + ".zip"
    if not os.path.isdir(dirPath):
        raise OSError("dirPath argument must point to a directory. "
            "'%s' does not." % dirPath)
    parentDir, dirToZip = os.path.split(dirPath)
    #Little nested function to prepare the proper archive path
    def trimPath(path):
        archivePath = path.replace(parentDir, "", 1)
        if parentDir:
            archivePath = archivePath.replace(os.path.sep, "", 1)
        if not includeDirInZip:
            archivePath = archivePath.replace(dirToZip + os.path.sep, "", 1)
        return os.path.normcase(archivePath)

    outFile = zipfile.ZipFile(zipFilePath, "w",
        compression=zipfile.ZIP_DEFLATED)
    for (archiveDirPath, dirNames, fileNames) in os.walk(dirPath):
        for fileName in fileNames:
            filePath = os.path.join(archiveDirPath, fileName)
            outFile.write(filePath, trimPath(filePath))
        #Make sure we get empty directories as well
        if not fileNames and not dirNames:
            zipInfo = zipfile.ZipInfo(trimPath(archiveDirPath) + "/")
            #some web sites suggest doing
            #zipInfo.external_attr = 16
            #or
            #zipInfo.external_attr = 48
            #Here to allow for inserting an empty directory.  Still TBD/TODO.
            outFile.writestr(zipInfo, "")
    outFile.close()
</pre>

</div>

Here's some samples of how you use this:

<div class="code">

<pre>zipdir("foo") #Just give it a dir and get a .zip file
zipdir("foo", "foo2.zip") #Get a .zip file with a specific file name
zipdir("foo", "foo3nodir.zip", False) #Omit the top level directory
zipdir("../test1/foo", "foo4nopardirs.zip", False) #exclude some leading dirs
zipdir("../test1/foo", "foo5pardir.zip") #Include some leading dirs
</pre>

</div>