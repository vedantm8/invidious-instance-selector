document.addEventListener("DOMContentLoaded", function () {
    var instanceSelect = document.getElementById("instanceSelect");
    var redirectToInstanceButton = document.getElementById("redirectToInstance");

    // Fetch the list of Invidious instances from the provided URL and populate the dropdown.
    fetch("https://docs.invidious.io/instances/")
        .then((response) => response.text())
        .then((html) => {
            // Parse the HTML to extract Invidious instance URLs and populate the dropdown.
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var instanceOptions = doc.querySelectorAll("h2 + ul a");

            instanceOptions.forEach((option) => {
                var instanceUrl = option.href;
                var instanceName = option.textContent;
                var optionElement = document.createElement("option");
                optionElement.value = instanceUrl;
                optionElement.textContent = instanceName;
                instanceSelect.appendChild(optionElement);
            });
        });

    redirectToInstanceButton.addEventListener("click", function () {
        var selectedInstance = instanceSelect.value;

        // Get the current URL of the active tab.
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                var currentUrl = tabs[0].url;

                // Extract the YouTube video ID from the current URL.
                var youtubeVideoID = getYoutubeVideoID(currentUrl);

                // Construct the Invidious link with the selected instance and video ID.
                var invidiousLink = selectedInstance.replace(/\/$/, '') + "/watch?v=" + youtubeVideoID;

                // Open a new tab with the constructed Invidious link.
                browser.tabs.create({ url: invidiousLink });
            }
        });
    });

    // Helper function to extract YouTube video ID from a URL.
    function getYoutubeVideoID(url) {
        var match = url.match(/[?&]v=([^&]+)/);
        return match && match[1] ? match[1] : "";
    }
});
