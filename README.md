# Car Trading App

## Description

The goal of our project is to simplify the life of people who want to quickly sell or buy a car.
User can both place an ad and view others ads. Also search filters can be specified for more precise results.

## Car Trading Model

![DbModel](Car%20Trading%20Model.png 'Database Model')

## Roles

- User:
  - logged in user - can add/manage his ads
  - not logged in user - can only view the website content
- Admin: manages the system - can manage users ads, give the user admin rights

## Detailed on roles

Their rights

### User

User has following options:

- Register
- View ads
- Use search
- Registered:
  - Login
- Logged in:
  - Place an ad
  - Remove his ad
  - Edit his ad information
  - Edit his profile information
  - Delete his account
  - Change his password

### Admin

Admin has following rights and options:

- Add new admins (give the user admin rights)
- Change his and others password
- Delete other users ad
- Delete other users account

## Tech Stack

- Nest.js + TypeScript\
  Nest.js is a progressive Node.js framework, which extends frameworks like Express by adding modular organization. The use of modular structure simplifies the division of the project into separate blocks.
  It uses TypeScript which enabless developers to add types to our variables and provides compile errors and warnings based on them.
- MongoDB + Mongoose\
  MongoDB is not using tables for relationships. Data is stored in the form of JSON style document - structure of a single object is clear. Also MongoDB is easy to scale.
  Mongoose is an object document modeling layer that sits on top of Node's MongoDB driver. It has built in validation for schema definitions. Mongoose defines a schema for your data models so your documents follow a specific structure with pre-defined data types.
