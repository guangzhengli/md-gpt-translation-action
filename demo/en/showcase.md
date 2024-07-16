### Step 1: Direct Translation

---
title: How to Integrate Umami Analytics into Your Blog for Free
date: 2022-08-14T21:34:36+08:00
tags: ["hugo", "ladder", "tutorial", "analytics", "umami"]
series: ["how to create your blog"]
featured: true
---
This article explains how to integrate [umami](https://umami.is/) analytics into your blog or website for free. The database used is a limited [postgres](https://supabase.com/docs/guides/database) provided by [supabase](https://app.supabase.com/), but the free 500M is already enough for [umami](https://umami.is/).

The [umami](https://umami.is/) service is hosted using [vercel](https://vercel.com/). Thanks to the excellent service capabilities of today's cloud providers, you can integrate *umami* in 10 minutes. You can click [Analytics Dashboard](https://umami-ochre-nu.vercel.app/share/o3zAba1V/guangzhengli) to see the final effect.

<!--more-->

## Create Database

The database used is a limited [postgres](https://supabase.com/docs/guides/database) provided by [supabase](https://app.supabase.com/). Create a supabase account, create a new project, and enter the Database password to create the database service.

![cN3Zg4](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/cN3Zg4.png)

Creating may take a few minutes, and once created, you only need to get the `DATABASE_URL`.

![image-20220815182141638](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/image-20220815182141638.png)

## Host Umami

The [umami](https://umami.is/) service is hosted using [vercel](https://vercel.com/). After creating the database instance, you can deploy the umami service with one click through Vercel. Visit the [Running on Vercel](https://umami.is/docs/running-on-vercel) module in the [umami official documentation](https://umami.is/) for instructions and a one-click deployment script.

First, log in to your GitHub account and `fork` the umami (https://github.com/umami-software/umami) project.

Log in to [vercel](https://vercel.com/), create an account, and it is recommended to register and log in using your GitHub account. In `new project`, select `import` the project you just `forked`.

Then fill in the environment variables. Here we need to fill in two environment variables:

* DATABASE_URL: The DATABASE_URL obtained when creating the database
* TRACKER_SCRIPT_NAME: The default `tracker_script_name` may cause some `AdBlock` to block requests, losing some access data, so I filled in `hugo-ladder`.

Finally, in the Build stage, remember to fill in `build command` with `yarn build && yarn update-db`, so it will automatically migrate the database tables. No need to import manually.

![gePzXI](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/gePzXI.png)

Of course, if you want to import it yourself, you can also get the required tables directly from here https://github.com/umami-software/umami/blob/master/sql/schema.postgresql.sql.

## Configure Umami

After deploying umami on vercel, you will get a `<deploy-id>.vercel.app`. Visit it, and the default account password is **admin** and **umami**.

After completing the basic account configuration, click the website Tab on the sidebar and click Add Website. Fill in the basic information of the website, and you can check `enable share URL`, so anyone can access this analytics dashboard.

We get the corresponding `data-website-id` and `src`, and fill in `params.analytics.umami.website_id` and `params.analytics.umami.url` in the theme configuration.

![OZcU7U](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/OZcU7U.png)

Finally, we can get the analytics dashboard function of this site 🎉🎉🎉

Original link: https://guangzhengli.com/zh/blog/zh/how-to-integrate-umami-for-free-to-blog-site/

### Step 2: Reflection

1. **Difficult to Understand Statements:**
   - "The database used is a limited postgres provided by supabase, but the free 500M is already enough for umami." - This sentence could be clearer about what "500M" refers to.
   - "The default tracker_script_name may cause some AdBlock to block requests, losing some access data, so I filled in hugo-ladder." - This could be simplified for better understanding.

2. **Preservation Issues of Original Markdown Elements:**
   - All images, headings, and links have been preserved correctly.
   - The code blocks and inline code elements are also correctly maintained.

3. **Missed Elements:**
   - No elements were missed in the translation.

### Step 3: Reinterpretation

---
title: How to Integrate Umami Analytics into Your Blog for Free
date: 2022-08-14T21:34:36+08:00
tags: ["hugo", "ladder", "tutorial", "analytics", "umami"]
series: ["how to create your blog"]
featured: true
---
This article explains how to integrate [umami](https://umami.is/) analytics into your blog or website for free. The database used is a limited [Postgres](https://supabase.com/docs/guides/database) provided by [Supabase](https://app.supabase.com/), but the free 500MB storage is already enough for [umami](https://umami.is/).

The [umami](https://umami.is/) service is hosted using [Vercel](https://vercel.com/). Thanks to the excellent service capabilities of today's cloud providers, you can integrate *umami* in just 10 minutes. You can click [Analytics Dashboard](https://umami-ochre-nu.vercel.app/share/o3zAba1V/guangzhengli) to see the final result.

<!--more-->

## Create Database

The database used is a limited [Postgres](https://supabase.com/docs/guides/database) provided by [Supabase](https://app.supabase.com/). Create a Supabase account, start a new project, and enter the database password to set up the database service.

![cN3Zg4](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/cN3Zg4.png)

Creating the database might take a few minutes. Once it's ready, you only need to get the `DATABASE_URL`.

![image-20220815182141638](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/image-20220815182141638.png)

## Host Umami

The [umami](https://umami.is/) service is hosted using [Vercel](https://vercel.com/). After creating the database instance, you can deploy the umami service with one click through Vercel. Visit the [Running on Vercel](https://umami.is/docs/running-on-vercel) section in the [umami official documentation](https://umami.is/) for instructions and a one-click deployment script.

First, log in to your GitHub account and `fork` the umami (https://github.com/umami-software/umami) project.

Log in to [Vercel](https://vercel.com/), create an account, and it is recommended to register and log in using your GitHub account. In `new project`, select `import` the project you just `forked`.

Then fill in the environment variables. Here we need to fill in two environment variables:

* DATABASE_URL: The DATABASE_URL obtained when creating the database
* TRACKER_SCRIPT_NAME: The default `tracker_script_name` may cause some `AdBlock` to block requests, losing some access data, so I used `hugo-ladder`.

Finally, in the Build stage, remember to fill in the `build command` with `yarn build && yarn update-db`, so it will automatically migrate the database tables. No need to import manually.

![gePzXI](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/gePzXI.png)

Of course, if you want to import it yourself, you can also get the required tables directly from here: https://github.com/umami-software/umami/blob/master/sql/schema.postgresql.sql.

## Configure Umami

After deploying umami on Vercel, you will get a `<deploy-id>.vercel.app`. Visit it, and the default account password is **admin** and **umami**.

After completing the basic account configuration, click the website Tab on the sidebar and click Add Website. Fill in the basic information of the website, and you can check `enable share URL`, so anyone can access this analytics dashboard.

We get the corresponding `data-website-id` and `src`, and fill in `params.analytics.umami.website_id` and `params.analytics.umami.url` in the theme configuration.

![OZcU7U](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/OZcU7U.png)

Finally, we can get the analytics dashboard function of this site 🎉🎉🎉

Original link: https://guangzhengli.com/zh/blog/zh/how-to-integrate-umami-for-free-to-blog-site/