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


`CssSyntaxError: \my-app\components\UI\Button\Button.st.css:1:1: Unknown word`



