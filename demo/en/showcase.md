### Step 1: Direct Translation

---
title: How to Integrate Umami Analytics into Your Blog for Free
date: 2022-08-14T21:34:36+08:00
tags: ["hugo", "ladder", "tutorial", "analytics", "umami"]
series: ["how to create your blog"]
featured: true
---
This article explains how to integrate [umami](https://umami.is/) analytics into your blog or website for free. The database used is a limited [postgres](https://supabase.com/docs/guides/database) provided by [supabase](https://app.supabase.com/), but the free 500M is already enough for [umami](https://umami.is/).

The [umami](https://umami.is/) service is hosted on [vercel](https://vercel.com/). Thanks to the excellent service capabilities of today's cloud providers, you can integrate *umami* in 10 minutes. You can click [Analytics Dashboard](https://umami-ochre-nu.vercel.app/share/o3zAba1V/guangzhengli) to see the final effect.

<!--more-->

## Create Database

The database used is a limited [postgres](https://supabase.com/docs/guides/database) provided by [supabase](https://app.supabase.com/). Create a supabase account, create a new project, and enter the Database password to create the database service.

![cN3Zg4](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/cN3Zg4.png)

It may take a few minutes to create, and once created, you only need to get the `DATABASE_URL`.

![image-20220815182141638](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/image-20220815182141638.png)

## Host Umami

The [umami](https://umami.is/) service is hosted on [vercel](https://vercel.com/). After creating the database instance, you can deploy the umami service with one click through Vercel. Visit the [Running on Vercel](https://umami.is/docs/running-on-vercel) module in the [umami official documentation](https://umami.is/) for instructions and a one-click deployment script.

First, log in to your GitHub account and `fork` the umami (https://github.com/umami-software/umami) project.

Log in to [vercel](https://vercel.com/), create an account, it is recommended to register and log in using your GitHub account, and select `import` for the project you just `forked` in `new project`.

Then fill in the environment variables, here we need to fill in two environment variables:

* DATABASE_URL: The DATABASE_URL obtained when creating the database
* TRACKER_SCRIPT_NAME: The default `tracker_script_name` may cause some `AdBlock` to block requests, losing some access data, so I filled in `hugo-ladder`.

Finally, in the Build stage, remember to fill in `yarn build && yarn update-db` for the `build command`, so that the database tables will be automatically migrated. No need to import manually.

![gePzXI](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/gePzXI.png)

Of course, if you want to import manually, you can also get the required tables directly from here https://github.com/umami-software/umami/blob/master/sql/schema.postgresql.sql.

## Configure Umami

After deploying umami on vercel, you will get a `<deploy-id>.vercel.app`, visit it, the default account and password are **admin** and **umami**.

After completing the basic account configuration, click the website Tab on the sidebar, and click Add Website. Fill in the basic information of the website, you can check `enable share URL`, so that anyone can access this analytics dashboard.

We get the corresponding `data-website-id` and `src`, and fill in `params.analytics.umami.website_id` and `params.analytics.umami.url` in the theme configuration.

![OZcU7U](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/OZcU7U.png)

Finally, we can get the analytics dashboard function for this site 🎉🎉🎉

Original link: https://guangzhengli.com/zh/blog/zh/how-to-integrate-umami-for-free-to-blog-site/

### Step 2: Reflection on Direct Translation

1. **Difficult to Understand Statements:**
   - The phrase "limited [postgres](https://supabase.com/docs/guides/database) provided by [supabase](https://app.supabase.com/)" might be confusing. It could be clearer if we specify that it is a free tier with a 500MB limit.
   - The term "tracker_script_name" might not be immediately clear to all readers. It could benefit from a brief explanation.
   - The phrase "automatically migrate the database tables" might be too technical. Simplifying it to "automatically set up the database" could be better.

2. **Markdown Elements:**
   - All images and links have been preserved correctly.
   - Headings and code blocks are intact.

### Step 3: Reinterpretation for Clarity and Readability

---
title: How to Integrate Umami Analytics into Your Blog for Free
date: 2022-08-14T21:34:36+08:00
tags: ["hugo", "ladder", "tutorial", "analytics", "umami"]
series: ["how to create your blog"]
featured: true
---
This article explains how to integrate [umami](https://umami.is/) analytics into your blog or website for free. We'll use a free-tier [Postgres](https://supabase.com/docs/guides/database) database provided by [Supabase](https://app.supabase.com/), which offers 500MB of storage—more than enough for [umami](https://umami.is/).

We'll host the [umami](https://umami.is/) service on [Vercel](https://vercel.com/). Thanks to the excellent services provided by modern cloud platforms, you can integrate *umami* in just 10 minutes. Check out the [Analytics Dashboard](https://umami-ochre-nu.vercel.app/share/o3zAba1V/guangzhengli) to see the final result.

<!--more-->

## Create Database

We'll use a free-tier [Postgres](https://supabase.com/docs/guides/database) database provided by [Supabase](https://app.supabase.com/). Start by creating a Supabase account, then create a new project and enter a database password to set up the database service.

![cN3Zg4](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/cN3Zg4.png)

It may take a few minutes to set up. Once it's ready, you'll get a `DATABASE_URL`.

![image-20220815182141638](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/image-20220815182141638.png)

## Host Umami

We'll host the [umami](https://umami.is/) service on [Vercel](https://vercel.com/). After setting up the database, you can deploy the umami service with one click using Vercel. Visit the [Running on Vercel](https://umami.is/docs/running-on-vercel) section in the [umami official documentation](https://umami.is/) for instructions and a one-click deployment script.

First, log in to your GitHub account and `fork` the umami (https://github.com/umami-software/umami) project.

Log in to [Vercel](https://vercel.com/), create an account (it's recommended to use your GitHub account), and in `new project`, select `import` for the project you just `forked`.

Next, fill in the environment variables. We need to set two variables:

* DATABASE_URL: The `DATABASE_URL` you got when setting up the database.
* TRACKER_SCRIPT_NAME: The default `tracker_script_name` might be blocked by some `AdBlock` extensions, causing loss of some data. So, I used `hugo-ladder`.

Finally, in the Build stage, set the `build command` to `yarn build && yarn update-db`. This will automatically set up the database tables for you.

![gePzXI](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/gePzXI.png)

If you prefer to set up the tables manually, you can get the required SQL script from here: https://github.com/umami-software/umami/blob/master/sql/schema.postgresql.sql.

## Configure Umami

After deploying umami on Vercel, you'll get a URL like `<deploy-id>.vercel.app`. Visit this URL; the default username and password are **admin** and **umami**.

After setting up the basic account, click the website tab on the sidebar and add your website. Fill in the basic information and check `enable share URL` so anyone can access the analytics dashboard.

You'll get a `data-website-id` and `src`. Fill these into `params.analytics.umami.website_id` and `params.analytics.umami.url` in your theme configuration.

![OZcU7U](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/OZcU7U.png)

Finally, you'll have a fully functional analytics dashboard for your site 🎉🎉🎉

Original link: https://guangzhengli.com/zh/blog/zh/how-to-integrate-umami-for-free-to-blog-site/