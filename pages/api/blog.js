const Blog = (req, res) => {
  if (!req.method === 'POST') {
    res.status(405).end() // Method Not Allowed
    return
  }
  const { name, email, blogurl, feedurl, notes } = req.body

  const Airtable = require('airtable')
  const base = new Airtable({ apiKey: process.env.APIKEY }).base(
    'appZKl2MCd5HF6yF5'
  )

  base('Table 1').create(
    [{ fields: { name, email, blogurl, feedurl, notes } }],
    (err) => {
      if (err) {
        console.error(err)
        res.status(500).end()
        return
      }
      res.json({
        success: true
      })
    }
  )
}

export default Blog
