# Gendo Technical Task

Welcome to my attempt at completing Gendo's technical task.

In this application we have a generate button that selects a random image of a
dog from a range of statically hosted images. This image is then displayed in
the 12x12 grid. When the image is clicked on it is saved as a post to the API
where it is stored in the DB. A `GET /api/posts` endpoint has been implemented
that allows the retrieval of all Posts.

Each post is associated with a user. Because authentication has yet to be
implemented, a single static "default" user is being used in lieu of being able
to extract user data from authentication data (JWT for example).

## API Routes

### `GET /api/posts`

Gets all posts for a given user including the associated file.

### `POST /api/post`

Creates a post for a given user and saves information to the DB.

## Database Schema

The database structure has been split out into three tables (`users`, `posts`
and `files`).

By extracting the file data into it's own table (as opposed to keeping the data
alongside it's post) we allow for a more flexible approach to file storage and
schema. For example in future we might want to move file storage to an AWS S3
bucket, serve files from a separate endpoint or allow multiple posts to
reference the same image.

## Future Considerations

- Establish improved coding patterns around things like validation, HTTP
  requests, DB repositories and API clients
- Save blob data into external storage, for example AWS S3, to prevent DB bloat
- Separate endpoint for file retrieval to improve responsiveness and reduce
  request times
- Authentication and users
