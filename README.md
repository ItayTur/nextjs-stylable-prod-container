## Getting Started

In the terminal under the folder path run build image command

```
docker build . -t test:latest
```

After the command is done run the image to create the container:
```
docker run  -p 3000:8080 test
```


currently i get the following error:

```
Error: Could not find a production build in the '/app/.next' directory. Try building your app with 'next build' before starting the production server. https://nextjs.org/docs/messages/production-start-no-build-id
    at Server.readBuildId (/app/node_modules/next/dist/next-server/server/next-server.js:151:355)
    at new Server (/app/node_modules/next/dist/next-server/server/next-server.js:3:120)
    at NextServer.createServer (/app/node_modules/next/dist/server/next.js:1:2935)
    at async /app/node_modules/next/dist/server/next.js:1:3360
    ```


