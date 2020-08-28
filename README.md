# Social Network Application
This is a small social network app that includes authentication,GoogleOauth, profiles and forum posts and Notifications when the user like or comment the post.

# Features
1.The user can Register and add their details of education and work experience.

2.The user can register with google. (as this application needs password to login so the user need to add the password).

3.The user can choose the any of the 4 avatar.(If the user registers with google the avatar will automatically be the users google account pic)

4.The user can add a new post,comment or like on existing post.

5.As soon as the user likes or comments on the post. The user of that post will get a notification that who liked or commented the post.

6.If the user wishes to delete the account the user can delete the account.


## Quick Start

```
# create config.env file

# add all these data in config.env file

JWT_SECRET=
JWT_EXPIRES_IN= 
DATABASE_PASSWORD=
DATABASE=mongodb+srv:
DATABASE_LOCAL=mongodb:
CLIENT_ID=
 
```

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```




