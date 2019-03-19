# Workflow Management 
[![Build Status](https://travis-ci.com/reuelrds/Workflow.svg?branch=master)](https://travis-ci.com/reuelrds/Workflow)
[![codecov](https://codecov.io/gh/reuelrds/Workflow/branch/master/graph/badge.svg)](https://codecov.io/gh/reuelrds/Workflow)

##### *This website was a part of Internet Programming and Software Engineering & Project Management Mini Projects*
***

This website allows organizations to create their custom workflow by defining a report template using a Form Designer tool, then define a workflow in a form of flow-chart and then set premissions on the form fields. Also, every user has access to Timeline which helps to schedule and plan tasks much easier.

There’s also an Admin Panel, for system administrators of a company. It also allows them to invite employees to register, assign employee’s to groups or departments and define their role within the organization.


*Live preview from latest commit to master branch can be found here: [workflow](http://sepm-workflow.s3-website-ap-southeast-1.amazonaws.com)*

## To Run this locally

#### Clone this repo and install dependencies

```
> git clone https://github.com/reuelrds/Workflow.git
> cd ./WorkFlow
> npm install
```

#### Start the local server in dev mode along with mongodb (For Backend)
```
> npm run start:localDB
> npm run start:server --env="dev"
```

#### Serve the application
Navigate to angular root directory
```
> cd ./frontend
```
Launch the website
```
> ng serve -o
```

## Running unit tests

To execute the unit tests via [Karma](https://karma-runner.github.io) for frontend
```
> cd ./frontend
> ng test
```

To execute tests for backend
```
> jest
```
Or Alternatively
```
> npm run test:server
```

## Running end-to-end tests

Run `ng e2e` from frontend directory to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

