<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About](#about)
- [Installation and Configuration](#Installation-and-configuration)
- [Run API](#run-api)

# About
This is an REST API that has these core features:
- CRUD User
- Login Feature (with JWT)
- CRUD Roles

## Project structure
    .
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (unused for now)
    ├── .env                    # Environtment Variables
    ├── package-lock.json       # Node.js project Informations
    ├── package.json            # Node.js project Informations
    └── README.md               # Documentation

The Nest.js manages feature in form of "module" contains its controller, service, middleware, etc.
There will always a main `app.module.ts` to load other modules.

# Installation and Configuration
## Node
- Run these commands to install latest LTS version of Node
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm list-remote
nvm install lts/*
```


## MySQL
### Install
- Run these commands to install mysql
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql.service
```

### Configure Database
- Connect to mysql
```bash
sudo mysql
```

- Create new Database
```bash
mysql > CREATE DATABASE usermgmt_db;
```

- Add new users and grant user all the privileges to recently created database.
```bash
mysql > CREATE USER 'dbuser'@'%' IDENTIFIED BY 'secret';
mysql > GRANT ALL PRIVILEGES ON usermgmt_db.* TO 'dbuser'@'%';
mysql > FLUSH PRIVILEGES;
```

### Finalize
`sudo systemctl start mysql.service`

# Run API
## Clone GitHub Repo
- Run these commands to clone this repo
```bash
cd ~
git clone https://github.com/muhrizky-a/dot-user-mangement-rest-api.git
cd ~/dot-user-mangement-rest-api
cp .env.example .env
```

## Install Node Packages
- Run these commands to install packages needed to run the API
```bash
npm install
```
## Start the API
- Run these commands to start the API with PM2
```bash
cd ~/social-media-api
npm run start:dev
```

## Test the API
- Import the postman files on `postman` folder