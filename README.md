# Day 1–2: Requirement Analysis
## Project: RESTful Blog Application API

**Project ID:** SCR845NGFF  
**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose, JWT

## 1. Introduction

The RESTful Blog Application API is a backend application designed to manage blog posts and comments. It allows users to register, authenticate, create blog posts, view posts, update their own posts, and delete them.

The application also provides comment management functionality, allowing authenticated users to add, view, update, and delete comments.

The API follows REST architectural principles and uses JSON (JavaScript Object Notation) as the data exchange format between the client and server.

## 2. Objectives

The main objectives of this project are:

1. Develop a RESTful API using Node.js and Express.js.
2. Create user registration and login functionality.
3. Store user information, blog posts, and comments in MongoDB.
4. Implement CRUD (Create, Read, Update, Delete) operations.
5. Implement JWT-based authentication.
6. Provide authorization to prevent unauthorized modifications.
7. Validate user input and handle errors properly.
8. Test API endpoints using Postman.

## 3. Functional Requirements

Functional requirements describe the operations and features that the application must provide.

### A. User Management

- Users should be able to register using their username, email, and password.
- Users should be able to log in using their credentials.
- Passwords must be securely hashed using bcrypt.
- The server should generate a JWT after successful authentication.

### B. Blog Post Management

- Users should be able to create blog posts.
- Users should be able to retrieve all blog posts.
- Users should be able to retrieve a specific post using its ID.
- Users should be able to update their own posts.
- Users should be able to delete their own posts.

### C. Comment Management

- Users should be able to add comments to blog posts.
- Users should be able to retrieve comments associated with a particular post.
- Users should be able to retrieve a specific comment.
- Users should be able to update their own comments.
- Users should be able to delete their own comments.

### D. Authentication and Authorization

- JWT should be used to authenticate users.
- Protected routes should require a valid access token.
- Only authenticated users should be allowed to create posts and comments.
- Users should not be allowed to modify or delete another user's posts or comments.

## 4. Non-Functional Requirements

1. **Security:** Passwords must be hashed and protected routes must use JWT authentication.
2. **Performance:** Database queries should be optimized for efficient data retrieval.
3. **Scalability:** The application should support additional features in the future.
4. **Maintainability:** The project should follow a modular folder structure.
5. **Reliability:** The API should handle invalid requests and unexpected errors.
6. **Usability:** API responses should be understandable and consistently formatted.

## 5. Identification of API Endpoints

An API endpoint is a specific URL through which a client communicates with the server to perform an operation.

### A. Authentication Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Authenticate an existing user |

### B. Blog Post Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | /api/posts | Create a new blog post |
| GET | /api/posts | Retrieve all blog posts |
| GET | /api/posts/:id | Retrieve a specific blog post |
| PUT | /api/posts/:id | Update a blog post |
| DELETE | /api/posts/:id | Delete a blog post |

### C. Comment Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | /api/comments | Create a new comment |
| GET | /api/comments?postId=:postId | Retrieve comments of a post |
| GET | /api/comments/:id | Retrieve a specific comment |
| PUT | /api/comments/:id | Update a comment |
| DELETE | /api/comments/:id | Delete a comment |

## 6. User Roles and Permissions

The application initially supports two access states:

**1. Guest User**
- Can view blog posts.
- Can view comments.
- Cannot create, update, or delete content.

**2. Authenticated User**
- Can create blog posts.
- Can create comments.
- Can update their own posts and comments.
- Can delete their own posts and comments.

## 7. Basic Application Workflow

1. A user registers an account.
2. The server validates the registration details.
3. The password is hashed and stored in MongoDB.
4. The user logs in with registered credentials.
5. The server verifies the credentials and generates a JWT.
6. The user sends the JWT with protected API requests.
7. The server verifies the token.
8. The user performs authorized blog post and comment operations.
9. The server communicates with MongoDB and returns the appropriate JSON response.

## 8. Expected Project Outcome

After completing the project, the application should provide a fully functional RESTful API supporting:

- User registration and authentication.
- Secure JWT-based access control.
- Complete CRUD operations for blog posts.
- Complete CRUD operations for comments.
- MongoDB database integration.
- Input validation and error handling.
- API testing and documentation.

## 9. Conclusion

Requirement analysis establishes the foundation of the RESTful Blog Application API. It identifies the application's functional and non-functional requirements, user permissions, and API endpoints.

This analysis provides a clear development roadmap and helps ensure that the application is structured, secure, and maintainable before proceeding to database design and implementation.
