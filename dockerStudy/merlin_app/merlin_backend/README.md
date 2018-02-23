## INTRO

Building a web server with a docker for testing

## USAGE

1. /etc/hosts file modify

```vi
0.0.0.0   nodeapp.local
```

2. build express image

```sh
$ docker build -t blog_express:v1 -f ./dockerfile/Dockerfile_express .
```

3. docker compose up

```sh
$ docker-compose up app_blue
```

4. load balancing test

```sh
$ sh check.sh
```


