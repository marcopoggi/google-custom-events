document.addEventListener("DOMContentLoaded", (_e) => {
  if (initializeArticles()) {
    initializeCustomEvents();
  }
});

function initializeArticles() {
  const articles = [
    {
      id: 1,
      title: "Article 1",
      email: "article+1@gmail.com",
      phone: "+542348907861",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum.",
    },
    {
      id: 2,
      title: "Article 2",
      email: "article+2@gmail.com",
      phone: "+542348907862",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum.",
    },
    {
      id: 3,
      title: "Article 3",
      email: "article+3@gmail.com",
      phone: "+542348907863",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum.",
    },
  ];

  const articles_container = document.querySelector(".articles");

  if (articles_container === null) return false;

  if (articles_container) {
    articles.forEach((article) => {
      let articleFragment = document.createDocumentFragment();

      let articleElement = document.createElement("article");
      let articleTitle = document.createElement("h1");
      let articleDescription = document.createElement("p");
      let articlePhoneLink = document.createElement("a");
      let articleEmailLink = document.createElement("a");

      articleElement.id = article.id;
      articleTitle.textContent = article.title;
      articleDescription.textContent = article.description;

      articlePhoneLink.className = "custon_click_event";
      articlePhoneLink.href = `tel:${article.phone}`;
      articlePhoneLink.textContent = `📞 ${article.phone}`;
      articlePhoneLink.dataset["article"] = JSON.stringify({
        action: "phone_click",
        ...article,
      });

      articleEmailLink.className = "custon_click_event";
      articleEmailLink.href = `mailto:${article.email}`;
      articleEmailLink.textContent = `📧 ${article.email}`;
      articleEmailLink.dataset["article"] = JSON.stringify({
        action: "email_click",
        ...article,
      });

      articleElement.appendChild(articleTitle);
      articleElement.appendChild(articleDescription);
      articleElement.appendChild(articlePhoneLink);
      articleElement.appendChild(articleEmailLink);

      articleFragment.append(articleElement);
      articles_container.append(articleFragment);
    });
  }

  return true;
}

function initializeCustomEvents() {
  let eventLinks = document.querySelectorAll(".custon_click_event");

  if (eventLinks && window.dataLayer) {
    eventLinks.forEach((eventLink) => {
      eventLink.addEventListener("click", (e) => {
        let data = JSON.parse(e.target.dataset.article) || {};
        let parameters = {
          article_id: data.id,
          article_action: data.action,
          article_title: data.title
        };

        window.dataLayer.push({
          event: "custom_click_event",
          ...parameters
        });
      });
    });
  }
}
