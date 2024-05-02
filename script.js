// Fetching class and ID from HTML code
const options = document.querySelectorAll('.option');
const newsContainer = document.querySelector('.news-container');
const newsPopup = document.querySelector('.news-popup');
const cancelBtn = document.querySelector('.cancelBtn');

// News Box Content
const newsBox = (newsContent) => {
    let news = document.createElement('div');
    news.className = "news-box";

    let shortDescription = '';
    if (newsContent.description) {
        let words = newsContent.description.split(' ');
        shortDescription = words.slice(0, 20).join(' ');
    }

    news.innerHTML = `
    <img src="${newsContent.image_url}" alt="No Image Found" class="news-image">
    <h2>${newsContent.title}</h2>
    <p>${shortDescription}</p>
    <button class="readMore">Read More</button>
    `

    const readMore = news.querySelector('.readMore');
    readMore.addEventListener('click', () => {
        newsPopup.style.display = "block";
        const newsDetails = document.querySelector('.news-details');
        newsDetails.innerHTML = `${newsContent.description}`;
    })
    newsContainer.appendChild(news);
}

// Fetching News from API Key
const news = async (op) => {

    try {
        newsContainer.innerHTML = ``;

        const country = "in";
        const apiKey = "pub_43304696eab4b24063569436796f3b1f9e3ec"; // API KEY
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${op}&country=${country}&language=en`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const newsLatest = data.results;
        console.log(newsLatest);

        newsLatest.forEach(newsContent => {
            newsBox(newsContent);
        })

    } catch (error) {
        newsContainer.innerHTML = `<h2>${error}<h2>`;
    }

}

// When option Button is Clicked
const addOptionEventListeners = () => {
    options.forEach(option => {
        option.addEventListener('click', () => {
            let op = option.innerHTML;
            console.log(op);
            news(op);
        });
    });
};

// Call the Function
addOptionEventListeners();

// Cancel the Pop Up Window
cancelBtn.addEventListener('click', () => {
    newsPopup.style.display = "none";
})
