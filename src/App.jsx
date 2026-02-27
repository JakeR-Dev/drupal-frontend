import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const [articles, setArticles] = useState([]);
  const [pages, setPages] = useState([])

  useEffect(() => {
    // fetch the articles
    const articlesFetch = async () => {
      const url = 'https://drupal-headless.test/jsonapi/node/article';
      const options = {
        method: 'GET'
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setArticles(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    articlesFetch();

    // fetch the pages
    const pagesFetch = async () => {
      const url = 'https://drupal-headless.test/jsonapi/node/page';
      const options = {
        method: 'GET'
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setPages(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    pagesFetch();
  }, []);

  return (
    <main>
      {/* articles */}
      <h1 className="mb-6">Articles</h1>
      <div className="articles grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-center mb-10">
        {articles?.map(article => {
          // console.log('article: ', article);
          return (
            <div key={article.id} className="card article rounded-[5px] border-1">
              <h3 className="">{article.attributes?.title}</h3>
              <p>{article.attributes?.body?.summary}</p>
            </div>
          )
        })}
      </div>

      {/* pages */}
      <h1 className="mb-4">Pages</h1>
      <div className="pages grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-center mb-10">
        {pages?.map(page => {
          // console.log('page: ', page);
          return (
            <div key={page.id} className="card article rounded-[5px] border-1">
              <h3 className="">{page.attributes?.title}</h3>
              <p>{page.attributes?.body?.summary}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default App
