+++ 
date = 2023-10-09T23:06:56+05:30
title = "Joplin Note Taking App - Sync Setup with Cloud S3 Object Storage"
description = ""
slug = "joplin-cloud-s3-sync"
tags = ["foss", "hosting", "workflow", "sync"]
+++

## Joplin
[Joplin](https://joplinapp.org/) is an awesome note taking app that ticks all the right boxes:
1. **It's FOSS**: Joplin is free and [open source](https://github.com/laurent22/joplin/)
2. **Markdown Support**: It utilizes markdown for note-taking, providing a clean and efficient writing format.
3. **Versatile Syncing Options**: Joplin offers multiple ways to sync notes between devices, including official cloud options and self-hosting capabilities.
4. **Cross-Platform Sync Availability**: It's officially available on all platforms, including Linux, Windows, Mac, iPhone, and Android.
5. **Minimal Design**: With a minimal design, Joplin minimizes distractions

![joplin.webp](joplin.webp)

## Syncing Joplin across devices

There are many ways to sync Joplin; some options include Joplin Cloud (official), Dropbox, OneDrive, Nextcloud, and hosting your own Joplin Cloud instance (for privacy reasons). The one that I prefer is using S3 Object Storage from [Oracle Cloud](https://www.oracle.com/cloud/), as I already have a free account with a 10GB limit.

I'm not very picky about privacy since I typically use it to store my personal notes, but for those who are concerned, Joplin has an inbuilt way of encrypting your notes before syncing (Awesome, right?).

Let's get on with setting up sync in Joplin.

## Joplin Sync Setup using S3 Object Storage (Cloud)

- Before setting up syncing, you need to set up an S3 Object Storage bucket and gather a few things:
	1. S3 bucket name
	2. S3 Object storage URL
	3. S3 Region id
	4. Access and secret keys to access your S3 bucket
- Go to your S3 Object Storage provider, in my case, Oracle, and create an S3 bucket. Note down the bucket name/id. Alternatively, you can host your own [S3 Object Storage](https://min.io/)
	- In Oracle, go to Object Storage and Create Bucket.
- Some providers offer an S3 Object Storage URL directly from their portal. However, in my case, I had to manually obtain the bucketnamespace and region and fill them into the following URL:
	- I got my `<bucketnamespace>` from Tenancy details and `<region>` from accout details.
```html
https://<bucketnamespace>.compat.objectstorage.<region>.oraclecloud.com
```
- The S3 region id should be available somewhere on the provider's portal; otherwise, reach out to the provider for it.
- Create access and secret keys to access your S3 storage from the provider's portal.
	- *Note: The access and secret keys should be kept private. Ensure that you keep them secure and refrain from sharing them with unknown parties.*
	- I created mine from going to Profile settings -> Customer Secret Keys (on left of the settings page).
- Now, input those details you obtained into Joplin
	- Go to Tools -> Options -> Syncronization
	- Set the Syncronization Target as `S3 (Beta)`
	- Furnish the details.
	- Experiment with enabling and disabling Force path style and clicking `Check synchronization` configuration. One of those should work if everything is correct, as shown below.
		- For OCI (Oracle) S3 Object Storage, enable `Force path style`
![3b5038c6e91aa5d555f9e75254a90da7.png](3b5038c6e91aa5d555f9e75254a90da7.png)
- Click `Apply`
- ***Your Joplin sync is set up! Now, save the S3 details somewhere secure and fill in the same details on the machine you want to sync with.***
### Enable Encrytion - Optional
For those concerned about privecy, enable **Encryption!**. Follow these steps:
- Go to Tools -> Options -> Encryption
- Click `Enable Encryption` and enter a touch and secure **Master Password** twice. 
- Note down the **Master Password**  along with S3 storage details and apply it on other machines you want to sync.

***Eh voila, you're good to go!***

## References
- https://joplinapp.org/help/apps/sync/s3/
- https://blog.jfx.ac/syncing-joplin-notes-to-aws-s3.html
- https://maximilian.tech/2022/12/27/sync-joplin-notes-across-devices-for-free-via-oracle-cloud-s3-object-storage/

