var countryInfo = [];

var submitBtn = document.getElementById("Submit-btn");

let countryImg = document.getElementById('country-img');

// Country search
function countrySearch(event) {
    event.preventDefault();

    var inputArea = document.getElementById("Search-box").value.trim();

    if (inputArea) {
        document.location.replace(`/search/${inputArea}`)
    } else {
        alert('Please enter a valid country');
    }
}


submitBtn.addEventListener("click", countrySearch);
