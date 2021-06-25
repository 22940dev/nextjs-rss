import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'


const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [blogurl, setBlogurl] = useState('')
  const [feedurl, setFeedurl] = useState('')
  const [notes, setNotes] = useState('')
  const [response, setResponse] = useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await fetch('/api/blog', {

        
        method: 'POST',
        body: JSON.stringify({ name, email, blogurl, feedurl, notes }),
        headers: { 'Content-Type': 'application/json' }
      })

      const json = await res.json()
      
      if (json.success) {
        alert('Thank you for submitting your blog!')
        Router.push('/')
      } else {
        setResponse(json.message)
      }
    } catch (error) {
      setResponse('An error occured while submitting the form' + error)
    }
  }
  
  return (
    <div>
      <Head>
        <title>Add new blog</title>
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
                Add new blog
              </h1>
              <div>
                <Link href='/'>
                  <a>
                    <p className='mt-2 underline cursor-pointer'>
                      Back
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main>
          <p className='pb-5 text-center'>{response}</p>

          <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div>
              <div className='max-w-3xl mx-auto sm:px-6 lg:px-8'>
                <form
                  className='mt-5 md:mt-0 md:col-span-2'
                  action=''
                  method='POST'
                  onSubmit={handleSubmit}
                  >
                  <div className='shadow sm:rounded-md sm:overflow-hidden'>
                    <div className='px-4 py-5 bg-white sm:p-6'>
                      <label className='block text-sm font-medium leading-5 text-gray-700'>
                        Blog name / owner name
                      </label>
                      <input
                        required
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className='block w-full px-3 py-2 mt-1 mb-5 transition duration-150 ease-in-out border border-gray-300 rounded shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                        />
                      <label className='block text-sm font-medium leading-5 text-gray-700'>
                        Email address
                      </label>
                      <input
                        required
                        type='email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className='block w-full px-3 py-2 mt-1 mb-5 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                        />
                      <label className='block text-sm font-medium leading-5 text-gray-700'>
                        Blog URL
                      </label>
                      <input
                        type='url'
                        required
                        value={blogurl}
                        onChange={event => setBlogurl(event.target.value)}
                        className='block w-full px-3 py-2 mt-1 mb-5 transition duration-150 ease-in-out border border-gray-300 rounded shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                        placeholder='https://www.example.com'
                      />
                      <label className='block text-sm font-medium leading-5 text-gray-700'>
                        RSS Feed URL
                      </label>
                      <input
                        type='url'
                        required
                        value={feedurl}
                        onChange={event => setFeedurl(event.target.value)}
                        className='block w-full px-3 py-2 mt-1 mb-5 transition duration-150 ease-in-out border border-gray-300 rounded shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                        placeholder='https://www.example.com/feed'
                      />

                      <label
                        htmlFor='about'
                        className='block text-sm font-medium leading-5 text-gray-700'
                      >
                        Notes
                      </label>
                      <div className='rounded-md shadow-sm'>
                        <textarea
                          value={notes}
                          onChange={event => setNotes(event.target.value)}
                          rows='3'
                          className='block w-full mt-1 transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5'
                          placeholder='Anything you want to tell us!'
                        />
                      </div>
                      <p className='mt-2 text-sm text-gray-500'>
                        Your submission will be approved before appearing on the
                        site
                      </p>
                    </div>
                    <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
                      <span className='inline-flex rounded-md shadow-sm'>
                        <button
                          type='submit'
                          className='inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700'
                        >
                          Save
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Form