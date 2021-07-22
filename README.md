LOGIN APP

Tools:
Frontend: Angular 11.2.14, Angular Material
Backend: Node 10.21.0, Express 4.16.4

#------------------------------------------------------------------------------------------

1. Authentication flow:

a) A user types in a login URL, default index.html will bring up the APP.
b) A login form is presented with form level validation.
c) Upon submitting the form, an backend API is called http://localhost:8000/users/login , the userID and userPassword are passed to the backend.
d) Backend authenticate using a simple file to store all credentials(simulate a user DB).
e) If authenticated, the backend pass a Token (simulate a JWT Token) to the frontend.
f) Front end will get a OK status along with a authenticated token, the Token is stored in Browser Session Storage.
g) Any subsequent API call will be intercepted by HTTP interceptor and add the Token in Browser Storage before sending to the backend.
h) Backend will always validate if it is a valid token before granting execution to the API code.
i) If a non-existing URL is entered, it will be directed to a component notifying non-existing page.
j) If a URL is entered, but not authenticated yet, a Guard will catch it and redirect to the Login page.

Note, this applicatoin does not implement robust error codes .

#------------------------------------------------------------------------------------------

2. Installation instruction:

a) Git Clone both projects and run in the same machine to test the functionality.
https://github.com/jsutinYoung/cloudiq-front.git
https://github.com/jsutinYoung/cloudiq-back.git

b) Run Client using:
     npm install  
     ng serve 
   Run server using: 
     npm install 
     node index.js
c) point Browser to http://localhost:4200

#------------------------------------------------------------------------------------------

3. Further reference:

a) I've create a full app as part of non-paid intern for a real company product using all these techniques.
b) goto https://justy.duckdns.org , user: vinanthi@cloudiq.io password: rUwo15Z&7
c) git hub: https://github.com/jsutinYoung/Energy-Forecast-Frontend

#------------------------------------------------------------------------------------------

4. Services:
   I've created the service files for the AuthGuard, which are auth.service.ts and token.service.ts

5. Interceptor:
   A HTTP interceptor is used to add an authenticated Token as Bearer in the header to every http API call to the backend, I use a test backend API http://localhost:8000/hello

Except during the login process, the HTTP interceptor filters out the login URL.
There are two URL for login page: 1) (Client) http://localhost:4200/login 2)(Server API) http://localhost:8000/users/login.

Without the HTTP interceptor, the Token has to be placed in a header of every HTTP API backend call. Interceptor centralize and save coding.

6. Route Guard:
   I add a route guard to the home component by creating a guard component called auth-guard using canActivate interface.

7. Error Page:
   I also create an error page component for any url does not exist in this app.

8. Validation:
   Validations are added to both email and password input. Error message appears when certain criteria aren't met.

#------------------------------------------------------------------------------------------

List of files I created for this app:

Frontend

1. components

   - error-page
   - home
   - login
   - app

2. services:

   - auth
   - token

3. others:
   - auth-interceptor
   - auth-guard

Backend:

1. backend server - index.js
2. mock user list - users.json
