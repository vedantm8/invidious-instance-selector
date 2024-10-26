# Installation Guide for Textise This UserScript

This guide will show you how to install the **Textise This UserScript** using **ViolentMonkey**, a free and open-source UserScript manager. The script will allow you to convert the current page into a text-only format using Textise.net.

## Prerequisites
- A modern browser like **Google Chrome**, **Mozilla Firefox**, or **Microsoft Edge**.
- **ViolentMonkey** extension installed in your browser.

## Step 1: Install ViolentMonkey
If you don't already have **ViolentMonkey** installed, follow the appropriate link for your browser and install it:

- [ViolentMonkey for Chrome](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- [ViolentMonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
- [ViolentMonkey for Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- [ViolentMonkey for Opera](https://addons.opera.com/en/extensions/details/violent-monkey/)

## Step 2: Add the Script
1. Click on the **ViolentMonkey** icon in the top-right corner of your browser toolbar.
2. In the dropdown menu, click the **“+” (Create a new script)** button.
3. This will open a script editor.

## Step 3: Paste the Script Code
1. Remove the default content in the editor.
2. Paste the following code into the editor:

    ```javascript
    // ==UserScript==
    // @name           Textise This
    // @namespace      https://github.com/vedantm8/Textise-This
    // @version        1.0
    // @description    Opens current page in Textise.net
    // @author         -
    // @match          *://*/*
    // @grant          none
    // ==/UserScript==
    
    (function() {
        'use strict';
    
        // Function to get the current URL
        let currURL = window.location.href;
    
        // Create a new button and add it to the page
        let textiseButton = document.createElement('button');
        textiseButton.id = 'textise-button';
        textiseButton.textContent = 'View in Textise';
        textiseButton.style.position = 'fixed';
        textiseButton.style.bottom = '10px';
        textiseButton.style.right = '10px';
        textiseButton.style.zIndex = '10000';
        textiseButton.style.padding = '10px';
        textiseButton.style.backgroundColor = '#4CAF50';
        textiseButton.style.color = 'white';
        textiseButton.style.border = 'none';
        textiseButton.style.cursor = 'pointer';
    
        document.body.appendChild(textiseButton);
    
        // Event listener to open Textise in a new tab when the button is clicked
        textiseButton.addEventListener('click', function() {
            let textiseURL = `https://www.textise.net/showText.aspx?strURL=${encodeURIComponent(currURL)}`;
            window.open(textiseURL, '_blank');
        });
    
    })();
    ```

## Step 4: Save the Script
1. Click the **Save & Close** button at the top-right corner of the editor.
2. The script is now installed and will appear in your ViolentMonkey dropdown menu.

## Step 5: Test the Script
1. Go to any website (e.g., [https://www.example.com](https://www.example.com)).
2. You will see a floating button at the bottom-right corner labeled **"View in Textise"**.
3. Click the button, and the current page will open in **Textise.net** in a new tab.
---
