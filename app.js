const express = require('express');
const app = express();

// Setup EJS and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.render('pages/home'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/services', (req, res) => res.render('pages/services'));
app.get('/contact', (req, res) => res.render('pages/contact'));

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
app.get('/', (req, res) => res.render('pages/home'));
app.get('/about', (req, res) => res.render('pages/about'));

// NEW TESTIMONIALS ROUTE
app.get('/testimonials', (req, res) => {
  res.render('pages/testimonials');
});
app.get('/pricing', (req, res) => res.render('pages/pricing'));
// Existing routes
app.get('/', (req, res) => res.render('pages/home'));
app.get('/about', (req, res) => res.render('pages/about'));

// NEW BLOG ROUTE (paste this)
app.get('/blog', (req, res) => {
  res.render('pages/blog', {
    posts: [
      { 
        title: "5 Marketing Trends for 2024", 
        content: "AI-powered tools are changing how we analyze customer data..." 
      },
      { 
        title: "How to Grow Your Instagram", 
        content: "Consistent posting and strategic hashtags are key..." 
      }
    ]
  });
});
// Existing blog route (keep this)
app.get('/blog', (req, res) => {
  res.render('pages/blog', {
    posts: [
      { 
        id: 1, // Add ID field to each post
        title: "5 Marketing Trends", 
        content: "AI-powered tools..." 
      },
      { 
        id: 2,
        title: "Grow Your Instagram", 
        content: "Consistent posting..." 
      }
    ]
  });
});

// NEW DYNAMIC ROUTE (paste this below)
app.get('/blog/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = [
    { id: 1, title: "5 Marketing Trends", content: "Full content here..." },
    { id: 2, title: "Grow Your Instagram", content: "Full content here..." }
  ];
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).send('Post not found');
  }
  
  res.render('pages/single-post', { post });
});
const fs = require('fs').promises;

// Load posts from JSON
let posts = [];
async function loadPosts() {
  posts = JSON.parse(await fs.readFile('./data/posts.json'));
}
loadPosts();

// Updated blog routes
app.get('/blog', (req, res) => res.render('pages/blog', { posts }));

app.get('/blog/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).render('pages/404');
  res.render('pages/single-post', { post });
});

app.get('/blog', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("marketing-blog");
    const posts = await db.collection("posts").find().toArray();
    res.render("pages/blog", { posts });
  } finally {
    await client.close();
  }
});

//async function insertSamplePosts() {
//  const client = new MongoClient(uri);
  //await client.connect();
 // const db = client.db("marketing-blog");
  //await db.collection("posts").insertMany([
    //{ 
      //id: 1, 
      //title: "5 Marketing Trends", 
      //content: "AI is changing the game...", 
      //date: new Date() 
   // }
  //]);
//  console.log("Sample posts added!");
//}
//insertSamplePosts();