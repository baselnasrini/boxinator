# Boxinator

![fortnox_logo](https://www.fortnox.se/wp-content/themes/fortnox2017/image/loggo/fortnox_logo_svart.svg)

##### This project is done by Mohammed Basel Nasrini as a code test for Fortnox 
The backend is run at the port 4040 and the frontend at 8080

#### Backend:
You can import the backend as a Maven project.

To run the backend you have first to change the username and password of the MySQL database at the following files:
 - backend/src/main/resources/application.yml
 - backend/src/main/java/com/boxinator/backend/LuncherClass.java

If the database is not on the port 3306 you have to change it in the previous files too.
To run the backend you can just run the LuncherClass.

#### For the frontend you need only to run
```sh
npm install
npm run
```
