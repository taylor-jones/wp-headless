*This project is based on the helpful [Postlight Headless WP Starter](https://github.com/postlight/headless-wp-starter/tree/master/frontend)

<br>

# Synergy In Action - Headless WP Site

Synergy In Action's Headless WordPress site contains:

1.  A WordPress backend that serves its data via the [WP REST API](https://developer.wordpress.org/rest-api/) and [GraphQL](http://graphql.org/) (graphql not yet implemented).
2.  A server-side rendered React frontend using [Next.js](https://github.com/zeit/next.js/).


<br><hr><br>

## WordPress Backend

Before you install WordPress, make sure you have all the required software installed for your operating system.

### Prerequisites

*   **OS X:** You'll need [Homebrew](https://brew.sh/) and [Yarn](https://yarnpkg.com/en/) installed.
*   **Windows:** To install under Windows you need to be running the _64-bit version of Windows 10 Anniversary Update or later (build 1607+)_. The [Linux Subsystem for Windows](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) should be installed and enabled before proceeding. Then, you'll need the prerequisites for Ubuntu Linux, detailed below, set up.
*   **Ubuntu Linux:** You'll need the latest version of NodeJS, Yarn and debconf-utils installed first. Follow this [simple guide](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to get the latest version of NodeJS installed. Install the rest of the packages using the `apt-get` package manager. _Note: During the WordPress installation, you may be asked to enter the root password at the prompt due to the use of the `sudo` command_



<br>

### Install

The following command will get WordPress running locally on your machine, along with the WordPress plugins you'll need to create and serve custom data via the WP REST API.

```zsh
yarn install
```


<br>

### Starting the WP Backend

Once installed, make sure your local mysql server is running. On mac OS, if you installed mysql@5.7 via homebrew, you can run:
```zsh
brew services start mysql@5.7
```

Once mysql is running, start the WP backend with:
```zsh
yarn start
```

Once the WP backend is started:

* The WordPress REST API is available at [http://localhost:8080](http://localhost:8080)
* The WordPress GraphQL API is available at [http://localhost:8080/graphql](http://localhost:8080/graphql)
* The WordPress admin is at [http://localhost:8080/wp-admin/](http://localhost:8080/wp-admin/) default login credentials `admin` : `pass`



<br>

#### (Optionally) Extend the REST and GraphQL APIs

At this point you can start setting up custom fields in the WordPress admin, and if necessary, creating [custom REST API endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/) in the Postlight Headless WordPress Starter theme. You can also [modify and extend the GraphQL API](https://wpgraphql.com/docs/getting-started/about).

The primary theme code is located in `wordpress/wp-content/themes/synergy-headless`. Remember to [lint your code](README-linting.md) as you go.




<br><hr><br>

## React Frontend

To initially install the packages necessary for front-end development, run:
```zsh
yarn install
```

<br>

Afterwards, you can spin up the front-end using:
```zsh
yarn dev
```
...for development OR...
```zsh
yarn start
```
...for production.

<br>

In either case, the Next.js app will be running on [http://localhost:3000](http://localhost:3000).



