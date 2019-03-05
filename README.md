# Workflow Management 
[![Build Status](https://travis-ci.com/reuelrds/Workflow.svg?branch=master)](https://travis-ci.com/reuelrds/Workflow)


##### *This website was a part of Internet Programming Mini Project
***

This website allows organizations to create their custom workflow by defining a report template using a Form Designer tool, then define a workflow in a form of flow-chart and then set premissions on the form fields. All the statistics are displayed on the dashboard in form of different graphs. Also, every user has access to Timeline which helps to schedule and plan tasks much easier.

There’s also an Admin Panel, for system administrators of a company. Admin Panel provides overall statistics and reports for a company. It also allows them to invite employees to register, assign employee’s to groups or departments and define their role within the organization.


~~*Live preview can be found here: [workflow](http://workflow-app.s3-website.ap-south-1.amazonaws.com)*~~

## To Run this locally

#### Clone this repo and install dependencies

```
> git clone https://github.com/reuelrds/Work-Flow-Management.git
> cd ./WorkFlow
> npm install
```
#### Start the local server in dev mode (For Backend)
```
> npm run start:server "dev"
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

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

###### Note: Tests are only available for Angular.
