How to access read and author page
Step 1: Build db through npm run build-db 
Step 2: run node index.js or npm run dev or npm run start in terminal
Step 3: Access login page through localhost:3000/
Step 4:Click on register here button to go to register page
Step 5:Create an account
Step 6:Login using same credentials- you will be redirected to homepage of your account
Step 7:You would be now able to navigate to all author and reader pages through the buttons namely:
*Create new draft-to get to the Author edit page
*Reader Homepage button- gets you to reader homepage
*Settings- Gets you to Author Settings page
Once you create an article you would get 3 buttons-Edit,delete and publish
*Edit button-takes you to Author edit page for the specific article with article details
*Delete button-Removes the specific article from database and from Author homepage
*Publish button-Adds article to published articles section
Once you publish an article you would get 2 more buttons-Share button and delete button
*Share button- Brings you to reader page for the specific article
*Delete button- removes article from the published articles section
Back buttons
*For author pages that are not the author homepage, there is a back button that will bring you back to author homepage
*For reader pages that are not the reader homepage, there is a back button that will bring you back to reader homepage
Logout Button
*This is to logout of account- preventing any unauthorised access to author homepages, reader pages would still be accessible through url
*If you do not logout- author homepages will still be accessible through url
*Once you logout, cookie is cleared, preventing any unauthorised access to author pages through typing the url
*Login again to gain access
Reader pages
* Reader homepage and article pages can be access through their urls as well as they have not been secured with password authentication

