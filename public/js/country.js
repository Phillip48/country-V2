var countryInfo = [];

var submitBtn = document.getElementById("Submit-btn");

let countryImg = document.getElementById('country-img');

// Country search
function countrySearch(event) {
    event.preventDefault();

    var inputArea = document.getElementById("Search-box").value.trim();

    if (inputArea) {
        document.location.replace(`/search/${inputArea}`)
        // document.getElementById('display-country-info').style.display = 'inline';
        // document.querySelectorAll('display-none').style.display = 'inline';
    } else {
        alert('Please enter a valid country');
    }
}
// const removeDisplay = () => {
//     document.getElementById('display-country-info').style.display = 'inline';
//     // let none = document.getElementById('display-country-info')
//     // none.classList.remove('display: none')
// }


submitBtn.addEventListener("click", countrySearch);
