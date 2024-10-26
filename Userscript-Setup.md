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
    // @name         Invidious Instance Selector
    // @namespace    http://tampermonkey.net/
    // @version      1.4
    // @description  Redirect YouTube videos to selected Invidious instance
    // @match        *://*.youtube.com/*
    // @grant        GM_openInTab
    // @grant        GM.xmlHttpRequest
    // ==/UserScript==

    (function () {
        'use strict';

        // CSS styles for a better appearance
        const styles = `
            #toggle-invidious-popup {
                background-color: #1e90ff;
                color: #fff;
                border: none;
                border-radius: 5px;
                padding: 10px 15px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                position: fixed;
                top: 10px;
                right: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                transition: background-color 0.3s ease;
            }
            #toggle-invidious-popup:hover {
                background-color: #104e8b;
            }
            #invidious-popup {
                display: none;
                position: fixed;
                top: 50px;
                right: 10px;
                width: 250px;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                font-family: Arial, sans-serif;
            }
            #invidious-popup h1 {
                font-size: 18px;
                margin: 0;
                margin-bottom: 10px;
                color: #333;
            }
            #invidious-popup label {
                font-size: 14px;
                color: #555;
            }
            #instanceSelect {
                width: 100%;
                padding: 8px;
                margin-top: 8px;
                margin-bottom: 12px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            #redirectToInstance {
                background-color: #28a745;
                color: #fff;
                border: none;
                border-radius: 5px;
                padding: 8px 12px;
                cursor: pointer;
                width: 100%;
                font-size: 14px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            #redirectToInstance:hover {
                background-color: #218838;
            }
        `;
    
        // Insert CSS styles into the document
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    
        // Create a button to toggle the Invidious selector popup
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggle-invidious-popup';
        toggleButton.textContent = 'Invidious Selector';
        document.body.appendChild(toggleButton);
    
        // Create the popup container, initially hidden
        const container = document.createElement('div');
        container.id = 'invidious-popup';
        container.innerHTML = `
            <h1>Invidious Instance Selector</h1>
            <label for="instanceSelect">Select an Invidious instance:</label>
            <select id="instanceSelect">
                <!-- Dropdown populated dynamically -->
            </select>
            <button id="redirectToInstance">Go to Invidious</button>
        `;
        document.body.appendChild(container);
    
        // Toggle visibility of the popup when the button is clicked
        toggleButton.addEventListener('click', () => {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        });
    
        // Populate instanceSelect dropdown
        const instanceSelect = container.querySelector('#instanceSelect');
        const redirectToInstanceButton = container.querySelector('#redirectToInstance');
    
        // Fetch the list of Invidious instances
        GM.xmlHttpRequest({
            method: 'GET',
            url: 'https://docs.invidious.io/instances/',
            onload: function(response) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.responseText, 'text/html');
                const instanceOptions = doc.querySelectorAll('h2 + ul a');
    
                instanceOptions.forEach(option => {
                    const instanceUrl = option.href;
                    const instanceName = option.textContent;
                    if (!instanceUrl.toLowerCase().includes('github')) {
                        const optionElement = document.createElement('option');
                        optionElement.value = instanceUrl;
                        optionElement.textContent = instanceName;
                        instanceSelect.appendChild(optionElement);
                    }
                });
            },
            onerror: function() {
                alert("Failed to load Invidious instances.");
            }
        });
    
        // Redirect to selected Invidious instance
        redirectToInstanceButton.addEventListener('click', () => {
            const selectedInstance = instanceSelect.value;
            const youtubeVideoID = getYoutubeVideoID(window.location.href);
    
            if (youtubeVideoID) {
                const invidiousLink = `${selectedInstance.replace(/\/$/, '')}/watch?v=${youtubeVideoID}`;
                GM_openInTab(invidiousLink, { active: true });
            } else {
                alert('No YouTube video ID found.');
            }
        });
    
        // Helper function to extract YouTube video ID from URL
        function getYoutubeVideoID(url) {
            const match = url.match(/[?&]v=([^&]+)/);
            return match && match[1] ? match[1] : '';
        }
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
