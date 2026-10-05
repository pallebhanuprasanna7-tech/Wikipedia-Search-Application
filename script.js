let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createSearchResult(searchResult) {
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let resultTitleEl = document.createElement("a");
    resultTitleEl.textContent = searchResult.title;
    resultTitleEl.href = searchResult.link;
    resultTitleEl.target = "_blank";
    resultTitleEl.classList.add("result-title");

    let resultLinkEl = document.createElement("a");
    resultLinkEl.textContent = searchResult.link;
    resultLinkEl.href = searchResult.link;
    resultLinkEl.target = "_blank";
    resultLinkEl.classList.add("result-url");

    let resultDescriptionEl = document.createElement("p");
    resultDescriptionEl.textContent = searchResult.description;
    resultDescriptionEl.classList.add("link-description");

    resultItemEl.appendChild(resultTitleEl);
    resultItemEl.appendChild(document.createElement("br"));
    resultItemEl.appendChild(resultLinkEl);
    resultItemEl.appendChild(document.createElement("br"));
    resultItemEl.appendChild(resultDescriptionEl);

    return resultItemEl;
}

function displaySearchResults(searchResults) {
    spinnerEl.classList.add("d-none");
    searchResultsEl.textContent = "";

    if (!searchResults || searchResults.length === 0) {
        let noResultsEl = document.createElement("p");
        noResultsEl.textContent = "No results found.";
        noResultsEl.classList.add("link-description");
        searchResultsEl.appendChild(noResultsEl);
        return;
    }

    for (let searchResult of searchResults) {
        let resultItemEl = createSearchResult(searchResult);
        searchResultsEl.appendChild(resultItemEl);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value.trim();

        if (searchInput === "") {
            displaySearchResults([]);
            return;
        }

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(function(jsonData) {
                let searchResults = jsonData.search_results;
                displaySearchResults(searchResults);
            })
            .catch(function() {
                spinnerEl.classList.add("d-none");
                searchResultsEl.textContent = "";
                let errorEl = document.createElement("p");
                errorEl.textContent = "Something went wrong. Please try again.";
                errorEl.classList.add("link-description");
                searchResultsEl.appendChild(errorEl);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
