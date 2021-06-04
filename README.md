# Getting Started

## Start the app
```
npm i
npm run dev
```

currently i get the following error:


`CssSyntaxError: \my-app\components\UI\Button\Button.st.css:1:1: Unknown word`

## docker guide


In the terminal under the folder path run build image command

```
docker build . -t test:latest
```

After the command is done run the image to create the container:
```
docker run  -p 3000:3000 test
```

open browser in localhost:3000






