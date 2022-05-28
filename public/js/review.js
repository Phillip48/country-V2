
const reviewFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#review-content').value.trim();
    const review_likes = document.querySelector('input[name="rating"]:checked').value;
    const userId = document.querySelector("#ugly-userId").textContent;

    const country_id = document.querySelector("#ugly-countryId").textContent;

    const country_title = document.querySelector("#get-title-name").textContent;
    
    if (content && review_likes) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          content: content,
          review_likes: review_likes,
          user_id: userId,
          country_id: country_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/search/${country_title}`)
      } else {
        alert('Failed to work.');
      }
    }
  };

  document.querySelector("#review-submit").addEventListener("click", reviewFormHandler)