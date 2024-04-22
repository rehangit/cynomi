# Getting started

This repo implements the technical task outlined in the [document](./CHALLENGE.md).

## Overview

### Frontend

The app start with a simple form requesting user input for a sleep record for a user.

![Input form](./docs/screenshot.png "Input form")

The data is posted to backend using the new rest API `/api/customer`

List of users with number fo records and graph showing their records

![List and Graph](./docs/listandgraph.png "List and Graph")

### Backend

Backend is implemented using NestJS and MongoDB.

#### POST `/api/sleep-records`

A POST endpoint is implemented to process the user input and save the data in the database.

#### GET `/api/sleep-records?name=<NAME>&from=<DATE>`

A GET endpoint that returns the sleep records. It provides basic filtering to select records for a specified user and from a specified date (e.g. date=2024-04-01).

#### GET `/api/sleep-records/user-counts?name=<NAME>&from=<DATE>`

A GET endpoint that returns the list of summarised sleep records for a given user within the specified date range.
