+++ 
date = 2022-01-21T14:33:37+05:30
title = "Sync files between Linux and Android using Syncthing"
tags = ["foss", "sync"]
+++
In this blog, I'll guide you through setting up Syncthing on Linux and Android, allowing you to sync files seamlessly between the two machines.

## 1 What is [Syncthing](https://syncthing.net/)?

Syncthing is an open-source decentralized peer-to-peer file synchronization application built using the Go lang. Developed with privacy, security, and user control in mind, Syncthing allows for the synchronization of files across two or more machines using a decentralized approach, eliminating the need for relying on any cloud storage.

Described on its website as "Syncthing is a continuous file synchronization program. It synchronizes files between two or more computers in real time, safely protected from prying eyes. Your data is your data alone and you deserve to choose where it is stored, whether it is shared with some third party, and how it’s transmitted over the internet". Syncthing employs a well-documented and open-source protocol without any hidden shady magic.

It relies on top-of-the-line encryption and authentication algorithms to ensure data security. Sounds complicated right? So it should be hard to setup? Answer is no, It provides a very easy to use simple yet a power and portable interface to do so.  
Supported across various platforms, including Linux, Windows, Mac, and well-known BSD-based operating systems, Syncthing also extends its compatibility to Android. However, it's worth noting that iOS is not supported (reason [here](https://docs.syncthing.net/users/faq.html#is-there-an-ios-client)). Additionally, Syncthing operates seamlessly on both LAN and over the Internet using 'relay.' More details below.  
[Here](https://docs.syncthing.net/users/faq.html) is its FAQ that answers many questions that you may have.

## 2 Some details on inner workings of Syncthing

1. When there is a direct connection between syncing devices, like within a LAN, Syncthing simply connects each with the other and transfers files/info for synchronization. When there's no direct connection, like over the internet, it uses 'Relay servers' to bounce traffic between sync devices. Therefore, transfer rates are much lower compared to LAN. There are many public relay servers available. You can host your own restricted rely servers too for privacy reasons  

2. So, Syncthing sometimes relies on 'some server' to sync. What about privacy, you ask? Well, Syncthing employs end-to-end encryption. Not to mention, when using relay servers, it utilizes the TLS encryption method to securely transfer data. TL;DR: Fear not, your data is protected through the power of encryption, and it's open source. Many vets the source code for leaks, unlike closed-source solutions.  

3. Each device is identified using Syncthing-specific 'Device IDs,' which are unique to each device. While these IDs are unique, they are not sensitive. Only in limited scenarios can a device's IP be reverse-engineered using its ID (when Global discovery is enabled), but it can't be used to connect to your devices or peek over the curtains.  

4. Syncthing, similar to many torrenting protocols, divides the files into many chunks called blocks, and each block is synced between devices at a time. So, like torrents, when you have many devices syncing the same files, transfer rates tend to be faster with load sharing.

## 3 Steps to setting up Syncthing on Linux and Android

### 3.1 Installation

#### Linux - Ubuntu / Debian based Distributions

Many Debian-based distributions include Syncthing in their `apt` repositories. To install, simply run `sudo apt install syncthing -y`. If it's not available in apt, follow the instructions provided [here](https://apt.syncthing.net/)

#### Android

Syncthing is available both on [Google Play Store](https://play.google.com/store/apps/details?id=com.nutomic.syncthingandroid) and on [F-Droid](https://f-droid.org/packages/com.nutomic.syncthingandroid/). Install it from one of these stores.

#### Non Debian Distros

Prominent distros like Arch and Fedora typically include Syncthing in their package managers, providing an easy installation. In case it's not available, you can download the binary from [Syncthing's Site](https://syncthing.net/downloads/), extract it, and manually add it to your `PATH`.

#### Windows

Download the installer from [Syncthing's Site](https://syncthing.net/downloads/) and install it like other apps. Grant necessary permissions when prompted, including firewall permissions.

### 3.2 Autostart setup

After installation, on Debian/Ubuntu distros, Syncthing usually doesn't get added to autostart by default, so you'd have to do it manually. On Windows, as far as I know, the installer takes care of it.  
*Note: For Android, check the Syncthing app's optimizations and ensure it has the necessary permissions to autostart.*

#### Steps to add it to Autostart on Linux Mint
*Note: I've used Linux Mint for this setup, but these steps shouldn't be much different on other Debian distros like Ubuntu.*

- Search and open a tool related to auto-start, such as 'Startup Applications,' as shown below.
- Enable "Start Syncthing" if it is not enabled already.
    - If you don't see it listed, find Syncthing's `.desktop` file and add it manually. Use the below command to find it
    - `find /usr/share/applications -name syncthing-start.desktop`

![7265a2c89e779b2ef8ae2b2e95f56a18.png](7265a2c89e779b2ef8ae2b2e95f56a18.png "Linux Mint Autostart window")

- Either re-login or start Syncthing by using the command `syncthing`.

### 3.3 Configure Syncthing to Sync a folder sync

**On Linux**

- Open up your browser of choice and go to this URL `http://127.0.0.1:8384/`. You should see something similar to the screenshot below:

![c3823e8a6906cc43831ab12a01f7a471.png](c3823e8a6906cc43831ab12a01f7a471.png "Syncthing webview")
- Go to Actions - > Show ID, Copy the ID and send it over to Android
![d48be2740265561568be47018c67fa66.png](d48be2740265561568be47018c67fa66.png "Device ID")

**On Android**

- Install Syncthing from either [Google Play Store](https://play.google.com/store/apps/details?id=com.nutomic.syncthingandroid) or from [F-Droid](https://f-droid.org/packages/com.nutomic.syncthingandroid/), start the app. You should see something similar to the screenshot below:
    - *Also, make sure to turn off battery optimization for Syncthing. As it's a file syncing app, it requires full permission to run in the background. Don't worry; resource usage is minimal unless you're constantly syncing things.*

![Android_SS_Rescaled.jpg](Android_SS_Rescaled.jpg "Android view")
- Go to Devices -> Click `+`, enter the Device ID you copied, and give it a suitable device name.

**On Linux**
- You should see a new message pop up at the top of your browser window, as shown below, displaying the Device ID of the Android device (You can find the Android's Device ID on the Android App by going to its Menu ☰ -> Show Device ID).

![Screenshot from 2024-02-21 12-43-37.png](Screenshot%20from%202024-02-21%2012-43-37.png "Pair request")
- Click "Add Device" and give it a suitable name. 
- It should now appear in the Remote Devices Area on both Linux and Android, as shown below.

![932e7ddea222fa8efc6ba3509db7146f.png](932e7ddea222fa8efc6ba3509db7146f.png "Remote devices [Desktop]")
![8f1b0f4dd32bb2fad45828dd484457b5.png](8f1b0f4dd32bb2fad45828dd484457b5.png "Remote devices [Android]")

*Note: In the above screenshots, `Linux` and `Windows` represent the labels that I have assigned, not the respective Operating systems*
- In the Folders section, add a new folder by clicking the  `+Add Folder` button. 
	- Provide a suitable `Folder Label`
	- **Note down** the `Folder ID`
	- Add the path of the folder you want to sync to the `Folder Path`, for example, `/home/manjunath/workspace/test/sync-folder-in-linux`.

![9658d5654d69d857e6d2d3ce1b1c7e1e.png](9658d5654d69d857e6d2d3ce1b1c7e1e.png "New folder to sync")
	- In `Sharing` tab, Enable the device you want to sync with. In our case, it should be the Android's device label that we gave during pairing process and Click `Save`

![51dfe4a8eb0c34f67a9521b5a05d673f.png](51dfe4a8eb0c34f67a9521b5a05d673f.png "Share settings")
	
**On Android**
- Go to Folders section -> Click `+` button
	- Provide a suitable `Folder Label`
	- Enter the same `Folder ID` from Linux settings that was noted down earlier (In my case its `dr7zy-nauf7`) 
	- Enable the Device that you want to Sync with (In my case its `Linux`) and click on the `✓` button as shown below 

![411158db5382a7be08fcb468c4c1829a.png](411158db5382a7be08fcb468c4c1829a.png "Create folder and share settings [Android]")

{{< admonition success >}}
Thats it! you shoud now have `sync-folder-in-linux` in Linux machine synced with `sync-folder-in-android` on Android.
{{< /admonition >}}

## 4 Addendum
- **To remove sync**, simply remove the folder from the Syncthing GUI / App on one device, but it's recommended to remove it from both.
- **Securing Syncthing Web GUI** - By default, you and others on the same network can access the Syncthing Web GUI if left unprotected. To secure it, set up a **Username** and a Strong **Password**
	- To do that, Go to Actions -> Advanced
	- In GUI Section, provide a Username in `User` section and a Strong Password in `Password` section.

![96bb3ab42a54f9c181ee2974356cfedd.png](96bb3ab42a54f9c181ee2974356cfedd.png "Securing syncthing")

## 5 References
- [Syncthing Docs](https://docs.syncthing.net/)
- [Syncthing Review](https://proprivacy.com/cloud/review/syncthing)
- https://ostechnix.com/synchronize-files-between-multiple-systems-with-syncthing/
