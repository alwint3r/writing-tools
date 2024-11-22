(async () => {
  const arxivModal = await import("./arxiv_modal.js");
  const arxivApi = await import("./arxiv_api.js");

  arxivModal.render();

  chrome.runtime.onMessage.addListener(
    async (request, _sender, _sendResponse) => {
      if (request.action === "translateText") {
        // do nothing for now
      }

      if (request.action === "searchOnArxiv") {
        const selection = window.getSelection().toString();
        const { feed } = await arxivApi.search(selection);
        console.log(feed);

        if (!feed.entry) {
          return;
        }

        arxivModal.show();

        for (const item of feed.entry) {
          const author = item.author;
          let authorNames = "";
          if (Array.isArray(author)) {
            authorNames = author.map((a) => a.name["#text"]).join(", ");
          } else {
            authorNames = author.name["#text"];
          }

          arxivModal.renderItem({
            title: item.title["#text"],
            author: authorNames,
            link: item.id["#text"],
            summary: item.summary["#text"],
            published: item.published["#text"],
          });
        }
      }
    },
  );
})();
