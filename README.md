# TASK-Management-System

[![Gitter](https://badges.gitter.im/TMS-Community/community.svg)](https://gitter.im/TMS-Community/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)  [![Linkedin](https://img.icons8.com/fluent/48/000000/linkedin.png)](https://www.linkedin.com/in/ayushman1024/)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W01JFRM) <a href="https://www.buymeacoffee.com/ar7HQlZ" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" width=15% height=15%></a>
#### *Spring Boot and Angular 7 web application for task management .*
>  [Frontend Documentation](https://ayushman1024.github.io/documentation/)

## Demo
![DEMO](misc/demo/tms_demo.gif)

## Introduction
- Task management system is a web application developed for team project works where users can manage various task within team easily.
- It is developed using Spring Boot(backend) with Angular(front-end)  framework.
- Project is focused mainly on handling document based projects.
- “User” can be member of more than “Program” simultaneously. And one program can have any number of “User” member associated with it.
- This web application is very secure and robust. We have implemented JWT based Authentication technique in our application. The password is encrypted using public and private keys then is stored in database.
- Using MySQL and Sring Data JPA for database management.

### TODO:
- Lots of UI/UX improvements.

## Dependencies
- Java 8 JDK
- Embedded Tomcat 9 server
- MySQL Database
- Node Package Manager NPM
- Maven
## Installation
### Backend
 - In Eclipse or similar IDE import the "backend" from this repo with option "import existing maven project".
 - Build the maven project to install all the required dependencies.
 - To setup database, install MySQL. Make any database.
 - Then update below three configuration fields in file **application.properties** inside **/resources** folder
>

    spring.datasource.url=jdbc:mysql://localhost:3306/tms
    spring.datasource.username=root
    spring.datasource.password=root
- For email services you need to use email via SMTP. For that you need to update **application.properties** below fields. 

>
    spring.mail.host=smtp.gmail.com
	spring.mail.smtp.ssl.trust=smtp.gmail.com
	spring.mail.port=587
	spring.mail.transport.protocol=smtp
	spring.mail.username=your.email@gmail.com
	spring.mail.password=password`
Read [Google SMTP common issues](https://help.dreamhost.com/hc/en-us/articles/115001719551-Troubleshooting-GMAIL-SMTP-authentication-errors)

- Run the project from **BackendApplication.java**, all the tables will be initialised in database with its first run.
- Now execute **roles.sql** on your database.

### Frontend
- You should have node.js installed on your system.
- GOTO the path of **frontend** folder in comand-prompt and run `npm start`  instead of ~~`ng serve`~~ because i have configured different port number for frontend.
- Now your frontend will be hosted on http://localhost:8001 ,open this link in browser.(only for DEV)


<img src="https://github-pages-visitor.herokuapp.com/counterimg/githubDashboard_TMS" alt="" width="5"/>
