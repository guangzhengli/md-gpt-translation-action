---
title: How to Integrate Umami Analytics into Your Blog for Free
date: 2022-08-14T21:34:36+08:00
tags: ["hugo", "ladder", "tutorial", "analytics", "umami"]
series: ["how to create your blog"]
featured: true
---
This article explains how to integrate [umami](https://umami.is/) analytics into your blog or website for free. The database used is a limited [Postgres](https://supabase.com/docs/guides/database) provided by [Supabase](https://app.supabase.com/), but the free 500MB is more than enough for [umami](https://umami.is/).

The [umami](https://umami.is/) service is hosted on [Vercel](https://vercel.com/). Thanks to the excellent service capabilities of today's cloud providers, you can integrate *umami* in just 10 minutes. You can click [Analytics Dashboard](https://umami-ochre-nu.vercel.app/share/o3zAba1V/guangzhengli) to see the final result.

<!--more-->

## Creating the Database

The database used is a limited [Postgres](https://supabase.com/docs/guides/database) provided by [Supabase](https://app.supabase.com/). Create a Supabase account, start a new project, and enter the Database password to create the database service.

![cN3Zg4](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/cN3Zg4.png)

It may take a few minutes to create, and once it's done, you just need to get the `DATABASE_URL`.

![image-20220815182141638](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/image-20220815182141638.png)

## Hosting Umami

The [umami](https://umami.is/) service is hosted on [Vercel](https://vercel.com/). After creating the database instance, you can deploy the umami service with one click via Vercel. Visit the [Running on Vercel](https://umami.is/docs/running-on-vercel) section of the [umami official documentation](https://umami.is/) for instructions and a one-click deployment script.

First, log in to your GitHub account and `fork` the umami (https://github.com/umami-software/umami) project.

Log in to [Vercel](https://vercel.com/), create an account (it's recommended to use your GitHub account), and in `new project`, select `import` for the project you just `forked`.

Next, fill in the environment variables. We need to fill in two environment variables here:

* DATABASE_URL: The DATABASE_URL obtained when creating the database
* TRACKER_SCRIPT_NAME: The default `tracker_script_name` might be blocked by some `AdBlock` tools, causing some data loss. So here, I used `hugo-ladder`.

Finally, in the Build phase, remember to fill in the `build command` as `yarn build && yarn update-db`, so the database tables will be automatically migrated. No need to import them manually.

![gePzXI](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/gePzXI.png)

Of course, if you want to import them manually, you can get the required tables directly from here: https://github.com/umami-software/umami/blob/master/sql/schema.postgresql.sql.

## Configuring Umami

After deploying umami on Vercel, you will get a `<deploy-id>.vercel.app`. Visit it, and the default username and password are **admin** and **umami**.

After completing the basic account setup, click the Websites tab on the sidebar and add a new website. Fill in the basic information and you can check `enable share URL` so anyone can access this analytics dashboard.

Get the corresponding `data-website-id` and `src`, and fill them into the theme configuration under `params.analytics.umami.website_id` and `params.analytics.umami.url`.

![OZcU7U](https://cdn.jsdelivr.net/gh/guangzhengli/PicURL@master/uPic/OZcU7U.png)

Finally, we can get the analytics dashboard functionality for our site 🎉🎉🎉

Original link: https://guangzhengli.com/zh/blog/zh/how-to-integrate-umami-for-free-to-blog-site/