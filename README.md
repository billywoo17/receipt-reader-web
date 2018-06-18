# Paperless Receipt: iOS Camera/Web App
### An App to Make Employee Expense Reports Easier!

Paperless is a mobile application that let employees scan and send business expense receipts directly to their admin department. The app uses OCR capabilities of Google Vision and some backend logic to auto-magically parse out the important receipt information such as total and date. This information is easily accessed by both employees and admins from an easy to use web-interface. 

[iOS Client](https://github.com/melchua/receipt-camera)

[Web Client](https://github.com/billywoo17/receipt-reader-web)

[Express Server](https://github.com/samsamkim/server-receipt)


## Motivation
This project was birthed from a final project idea our team had at the Lighthouse Labs bootcamp in June 2018. As fairly new web developers, we wanted to tackle some new technologies that were not taught during our bootcamp. As web developers, we were far removed from mobile apps, so we decided to learn React Native and Google Vision's API in the span of 3 days to create this app. 

Through this we learned teamwork, as well as how to work in an Agile / Kanban style methodology to complete a functioning application in the span of 8 days. 


## Screenshots

(pending)

## Built with

**iOS**

- React Native
- Node.js

**Front-end Web Server**

- React JS
- Webpack(Babel)
- Express/Node.JS
- SASS/CSS

**Back-end Server**

- Postgresql/Knex
- Express/Node.JS  
- API: AWS S3, Google Cloud (Vision)


## Installation

### iOS App

Fork and Clone

``` 
> git clone git@github.com:[yourusername]/receipt-camera.git 
> npm install

```

Configure

``` 
# Create a .env file in your project's root directory

.env

LOCALURL=http://[your ip address on your local network]:8080

```

Run

```
npm start
```

### Front-end Client

Fork and Clone

```
> git clone git@github.com:[yourusername]/receipt-reader-web.git
> npm install
```
Run

```
npm start
```

### Back-end Server

Fork and Clone

```
> git clone git@github.com:[yourusername]/server-receipt.git
> npm install
```

Setup Database (you must have PSQL installed and setup)

```
# Create a PSQL database called "final"

# Migrate and seed data
> knex migrate:latest
> knex seed:run

```

## Configuration

### iOS App

In your root directory: 

``` 
> touch .env
> vim .env
>  LOCALURL=http://[your-local-ip]:8080
```

### Front-end Client

``` 
> vim package.json
> "proxy": "http://192.168.1.104:8080"
```

### Back-end Server

1. Apply for an AWS S3 account
2. Apply for a Google Cloud account and enable the Vision API
3. Store your Google Vision JSON key in your root directory and rename it as "google_vision_key.json"

```
> touch .env

DB_HOST=localhost
DB_USER=bsms
DB_PASS=bsms
DB_NAME=final
DB_SSL=true if heroku
DB_PORT=5432
GOOGLE_APPLICATION_CREDENTIALS = "./google_vision_key.json"
AWS_ACCESS_KEY_ID = [add your aws access key id]
AWS_SECRET_ACCESS_KEY = [add your aws secret access key]
```


## How to use?

Both the Front-end Web Client and the iOS app operate independently of each other. You will however need to have the Back-end Server up and running in order to use either of these products. 



## Team

| Bill | Mel | Sam | Stephen |
|------|-----|-----|---------|
| img  | img | img | img     |

