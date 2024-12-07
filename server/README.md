# MERN Music Player Application

### Install dependencies

```
music-player> yarn install
music-player> cd client
music-player/client> yarn install
```

### Configure your app

Create a `.env` file in the project root

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/music-player
JWT_SECRER=averyveryverylongsecret


BUCKET_NAME=<bucket-name>
BUCKET_REGION=<region>
ACCESS_KEY=<access_key>
SECRET_ACCESS_KEY=<secret_access_key>
```

### Run the app

Run the backend with `yarn start:dev`

Run the frontend in `client` folder with `yarn dev`

### Add a song

Register and login as a user, then upload files with jwt token

```
POST http://localhost:5000/api/songs
Authorization: Bearer eyasdjghdowpfr7ksh91jsflqp...
Content-Type: multipart/form-data

name: Random Song
file: randomsong.mp3
```
