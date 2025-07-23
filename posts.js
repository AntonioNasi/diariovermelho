fetch('posts.json')
      .then(res => res.json())
      .then(postList => {
        const container = document.getElementById('posts-container');
        container.innerHTML = '';

        postList.forEach(post => {
          fetch(post.file)
            .then(res => res.text())
            .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const data = doc.getElementById('post-data');
              if (!data) return;

              const postData = JSON.parse(data.textContent);
              container.innerHTML += `
                <div class="post-preview">
                  <a href="${postData.link}">
                    <img src="${postData.image}" alt="${postData.title}">
                    <h2>${postData.title}</h2>
                  </a>
                </div>
              `;
            });
        });
      })
      .catch(err => {
        document.getElementById('posts-container').innerText = 'Erro ao carregar posts.';
        console.error(err);
      });