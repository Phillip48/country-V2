const favoriteCountry = async (event) => {
    event.preventDefault();

    const favoriteCountry = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const favoriteCountryReform = favoriteCountry.replace(/%20/g, " ")
    // console.log(favoriteCountryReform)

    const response = await fetch('/api/favorite', {
        method: 'POST',
        body: JSON.stringify({ favoriteCountryReform }),
        headers: { 'Content-Type': 'application/json' },
    });
};

document.querySelector('#add-favorite-button').addEventListener('click', favoriteCountry);
