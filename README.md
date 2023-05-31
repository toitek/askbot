### Chat

Chat builds on top of search. It uses search results to create a prompt that is fed into GPT-3.5-turbo.

This allows for a chat-like experience where the user can ask questions about mighty deal products and get an answers.

### Requirements

1. Set up OpenAI

You'll need an OpenAI API key to generate embeddings.

2. Set up Supabase and create a database
   Sure, here are the steps to set up a database in Supabase:

I. Create a Supabase account: If you don't already have a Supabase account, sign up for an account at https://supabase.io/.

II. Create a new project: Once you're signed in, create a new project by clicking the "New Project" button on the dashboard. Give your project a name in this case AiMightyDeals and click "Create Project".

III. Set up a new database: Click on the "Database" tab on the project dashboard and click the "Create Database" button. Choose a name in this case AiMightyDeals for the database and click "Create Database".

There is a schema.sql file in the root of the repo that you you will use to set up the database.

Run that in the SQL editor in Supabase as directed from step 1 to the last step.

I recommend turning on Row Level Security in supabase (Row Level Security (RLS) is recommended in Supabase for security and privacy reasons. RLS helps to ensure that data is only accessible to authorized users by implementing security policies at the row level).

3. Install dependencies

```bash
npm i
```

4. Set up environment variables

Create a .env.local file in the root of the repo with the following variables:

```bash
OPEN_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Click on the "Settings" tab on the project dashboard in supabase and then click on the "Database" sub-tab. Here you will find the database SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL role key that will be needed as described above to authenticate and send requests to the database.

### Dataset

5. Run scraping script

```bash
npm run scrape
```

This scrapes all of the contents of mighty deals website needed and saves them to a json file which is under ./scripts folder.

6. Run embedding script

```bash
npm run embed
```

This reads the json file, generates embeddings for each chunk of text, and saves the results to the database.

There is a 200ms delay between each request to avoid rate limiting.

This process will take 30-40 minutes.

### App

8. Run app

```bash
npm run dev
```

### Browser

9.  on the browser run http://localhost:3000

10. To add new deals, create a new JSON FILE with the following structure
    {
    "deals": [
    {
    "title": "",
    "url": "",
    "date": "",
    "old_price": ,
    "price": ,
    "image": "",
    "content": ""
    }
    ]
    }

            The title is the title of the of the deal being added, url is the where the deal was added in the main Mighty deal website, date is the when the deal discount will expire, old_price is the deal old price before the discount, price is the price after discount, Image is the image URL of the deal and content is the explanation of the deal.
            Your can add as many deals as possible and each deal should be separated by a comma,

            name your file as new_deals.json and save it in the new_deals folder

            To add new deals to the database,

            an example of the Json file data,

            {

    "deals": [
    {
    "title": "test title",
    "url": "https://www.mightydeals.com/deal/vintage-photo-effects-bundle.html",
    "date": " 1684994340",
    "old_price": 211,
    "price": 19,
    "image": "https://mightydeals.s3.amazonaws.com/images/vintage-photo-effects-bundle/Vintage-Effects-Bundle-3.jpg",
    "content": "test content"
    }
    ]
    }

```bash
    npm run add
```

and all the deals in your file will be added to the databse and will be now searchable on the mighty deal AI website.

```

```
