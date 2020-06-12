# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

Homepage
!["Homepage. Showing all urls."](./docs/homepage.png)

Login Page
!["Login Page"](./docs/login_page.png)

Registration Page
!["Registration Page"](./docs/register_page.png)

User's URLs Page
!["User's URL Page"](./docs/user_url_page.png)

Create New URL Page
!["Create New URL Page"](./docs/create_new_url.png)

Error 401 Page
!["Page not found Error 401"](./docs/page401.png)

Error 403 Page
!["Page not found Error 403"](./docs/page403.png)


Error 404 Page
!["Page not found Error 404"](./docs/page404.png)


Error 409 Page
!["Wrong Credential Error 409"](./docs/page409.png)

## Dependencies

- Node.js
- Express
- EJS
- uuid
- bcrypt
- body-parser
- cookie-parser
- cookie-session
- method-override

## Dev Dependencies
- chai
- mocha

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

### Troubleshooting
1. Make sure Express 4.16 is being utilized as this project did not use body-parser package but the built-in JSON middleware.
