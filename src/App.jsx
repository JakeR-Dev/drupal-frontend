import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const [articles, setArticles] = useState([]);
  const [pages, setPages] = useState([])

  useEffect(() => {
    // fetch the articles
    const articlesFetch = async () => {
      const url = 'https://drupal-headless.test/jsonapi/node/article?include=field_image';
      const options = {
        method: 'GET'
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // Store both data and included for reference
        setArticles(result.data.map(article => ({
          ...article,
          _included: result.included
        })));
      } catch (error) {
        console.error(error);
      }
    }
    articlesFetch();

    // fetch the pages
    const pagesFetch = async () => {
      const url = 'https://drupal-headless.test/jsonapi/node/page?include=field_hero_image';
      const options = {
        method: 'GET'
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setPages(result.data.map(page => ({
          ...page,
          _included: result.included
        })));
      } catch (error) {
        console.error(error);
      }
    }
    pagesFetch();
  }, []);

  return (
    <main>
      {(() => {
        // get the first page (assume it's the home page)
        const page = pages?.[0];
        const fileId = page?.relationships?.field_hero_image?.data?.id;
        const file = page?._included?.find(f => f.id === fileId);
        const heroImage = file?.attributes?.uri?.url;

        return (
          <section className="hero relative pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-20 lg:pb-20 text-center">
            <img src={`https://drupal-headless.test${heroImage}`} alt={`${page?.attributes?.title} hero image`} className="fixed top-0 left-0 w-full h-full object-cover" />
            <div className="container relative z-10">
              <h1 className="mb-4 uppercase">Welcome to</h1>
              <img src="/Ascutney-Transparent-Logo.png" alt="AO Logo" className="w-100 ml-auto mr-auto" />
            </div>
          </section>
        )
      })()}
      {/* articles */}
      <section className="blog pt-10 pb-10 md:pt-12 md:pb-12 lg:pt-20 lg:pb-20 relative z-10 bg-stone-900">
        <div className="container">
          <h2 className="mb-8">From Our Blog</h2>
          <div className="articles grid grid-cols-3 gap-4 justify-center text-center items-center mb-10">
            {articles?.map(article => {
              const id = article.id;
              const title = article.attributes?.title;
              const summary = article.attributes?.body?.summary;
              // find the image URL from the included data
              const fileId = article.relationships?.field_image?.data?.id;
              const file = article._included?.find(f => f.id === fileId);
              const image = file?.attributes?.uri?.url;

              return (
                <div key={id} className="card article rounded-[5px] border-1">
                  <div className="image-wrapper relative h-[200px] rounded-sm overflow-hidden mb-4">
                    {image && <img src={`https://drupal-headless.test${image}`} alt={`${title} image`} className="absolute top-0 left-0 w-full h-full object-cover" />}
                  </div>
                  <h5 className="mb-4">{title}</h5>
                  <p>{summary}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
