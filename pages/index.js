import Head from 'next/head'
import Parser from 'rss-parser'
import Link from 'next/link'

const Home = props => (
  <div>
    <Head>
      <title>Latest posts</title>
      <link rel='icon' href='/favicon.ico' />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css'
      />
    </Head>

    <div>
      <header className='bg-white shadow'>
        <div className='px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold leading-tight text-gray-900'>
              Latest posts
            </h1>
            <div>
              <Link href='/form'>
                <a>
                  <p className='mt-2 underline cursor-pointer'>
                    Add a new blog
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className='py-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='px-4 py-4 sm:px-0'>
            <div className='border-4 rounded-lg'>
              <div className='flex flex-col'>
                <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
                  <div className='inline-block min-w-full overflow-hidden align-middle shadow sm:rounded-lg'>
                    <table className='min-w-full'>
                      <thead>
                        <tr>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Post
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {props.posts
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((value, index) => {
                            return (
                              <tr key={index}>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  <div className='flex items-center'>
                                    <div className='ml-4'>
                                      <div className='text-sm font-medium leading-5 text-gray-900 underline'>
                                        <a href={value.link}>{value.title}</a>
                                      </div>
                                      <div className='text-sm leading-5 text-gray-500'>
                                        {value.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  <div className='text-sm leading-5 text-gray-900'>
                                    {new Date(value.date).toDateString()}
                                  </div>
                                  <div className='text-sm leading-5 text-gray-500' />
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
)

export async function getStaticProps(context) {
  const Airtable = require('airtable')
  const base = new Airtable({ apiKey: process.env.APIKEY }).base(
    'appZKl2MCd5HF6yF5'
  )

  const records = await base('Table 1')
    .select({
      view: 'Grid view'
    })
    .firstPage()

  const feeds = records
    .filter(record => {
      if (record.get('approved') === true) return true
    })

    .map(record => {
      return {
        id: record.id,
        name: record.get('name'),
        blogurl: record.get('blogurl'),
        feedurl: record.get('feedurl')
      }
    })

  const posts = []

  const parser = new Parser()

  for (const feed of feeds) {
    const data = await parser.parseURL(feed.feedurl)

    data.items.slice(0, 10).forEach(item => {
      posts.push({
        title: item.title,
        link: item.link,
        date: item.isoDate,
        name: feed.name
      })
    })
  }

  return {
    props: { posts }
  }
}

export default Home
