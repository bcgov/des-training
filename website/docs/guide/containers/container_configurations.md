---
title: Container configuration with Nginx
description: Understanding container configurations with environment variables.
date: 2023-11-5
---

# Container Configurations with Nginx
## Objective
To understand how a container's configuration can be modified with the use of environment variables.  

## Prerequisites
- Docker
- Terminal program
- [Nginx Image Documentation](https://hub.docker.com/_/nginx)


## Deploy a simple Nginx container
Using the official Nginx image and running a docker command to create a simple Nginx web server.
:::: code-group
::: code-group-item Try me
```sh
docker run --name learning-nginx --rm  -p 30001:80 nginx
```
:::
::::

This runs a docker container with:
- `--name learning-nginx` name of the container
- `--rm` removes container after the process is exited
- `-p 30001:80` maps your machine's port `30001` to the container port `80`
- `nginx` the image name

Going to [127.0.0.1:30001](http://127.0.0.1:30001) should serve an Nginx web server.

![nginx screenshot](/des-training/images/nginx-docker-run.png)

## Reasons for Changing configurations.
Environment variables, and mounting configurations files allow an image to be more versatile for different deployment configurations.
- Nginx's `hostname` and `port` number are configurations that might need to be changed
- Nginx default hostname is `localhost` and default port is `80`
- There are a few ways to modify these configuration, lets take a look in the following examples.

### Example 1 - Create a new image
Creating new images from existing images, is an easy way to update a configuration.
Lets say we need to update the Nginx port to 8080, because our platform doesn't allow the use of [privileged ports](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html) like port 80.
- We would create a docker image by making a new file named `Dockerfile`
- We would then add our new configurations which is determined by this `Dockerfile`
- The simplest way to modify the configuration is by using the `sed` command, this is what we did in our example
- Another way of modifying the configurations is to copy new files into the image



To create this image run the following command.  This will create a new nginx image with a tag of port8080 `nginx:port8080` using the `Dockerfile` shown in this example.

:::: code-group
::: code-group-item Try me
```sh:no-line-numbers
# builds new image `nginx:port8080`
docker buildx build \
-t nginx:port8080 \
-f Dockerfile.sed \
--output type=docker \
https://bcgov/des-training.git#:docker/nginx
```
:::
::: code-group-item Dockerfile
@[code docker](../../../../docker/nginx/Dockerfile.sed)
:::
::::

If we try changing the default Nginx image to use port 8080, without changing the configuration it will fail
:::: code-group
::: code-group-item This fails 
```sh
# This fails because the Nginx container is still listening on port 80.
docker run --name learning-nginx --rm  -p 30001:8080 nginx
```
:::
::: code-group-item This works
```sh
# this works because we modified the port in the image
docker run --name learning-nginx --rm  -p 30001:8080 nginx:port8080
```
:::
::::

This solves the problem of being able to change ports. Though this has one big disadvantage, you have to create a new image for every new configuration change.

### Example 2 - Adding configuration templates

A better approach would be to use Nginx's templates, and pass ENV's into the container.
- There needs to be a `template` added to the Nginx image as shown
- A new docker image will be created by a `Dockerfile`, which adds this template as shown
- Deploy the new image

:::: code-group
::: code-group-item Try me
```sh:no-line-numbers
# builds new image `nginx:template`
docker buildx build \
-t nginx:template \
-f Dockerfile.template \
--output type=docker \
https://github.com/bcgov/des-training.git#:docker/nginx
```
::: 
::: code-group-item Dockerfile
@[code docker](../../../../docker/nginx/Dockerfile.template)
:::
::: code-group-item default.conf.template
@[code](../../../../docker/nginx/default.conf.template)
:::
::::

In order to checkout out our new image, lets test it out on a couple different ports.
#### Using docker run
```sh:no-line-numbers
# This should use the default port, when new env variables are passed.
docker run \
--name learning-nginx \
--rm \
-e NGINX_PORT=80 \
-e NGINX_HOST=localhost \
-p 30001:80 \
nginx:template

# This should work, with Nginx using port 8080
docker run \
--name learning-nginx \
--rm \
-e NGINX_PORT=8080 \
-e NGINX_HOST=localhost \
-p 30001:8080 \
nginx:template

# Lets change NGINX_HOST to example.com, 
# you will have to add an entry to your hosts file
#/etc/hosts
...
127.0.0.1  example.com

# This should work, with Nginx using port 8080 and going to http://example.com:30001
docker run \
--name learning-nginx \
--rm \
-e NGINX_PORT=8080 \
-e NGINX_HOST=example.com \
-p 30001:8080 \
nginx:template
```
#### Using docker-compose
```sh
# you will need to create a docker-compose.yaml locally
docker compose -f docker-compose.yaml up
```
@[code](../../../../docker/nginx/docker-compose.yaml)

The disadvantage of using the templates (Nginx configuration limitation), is that there is no way of adding fallback values, so these environment variables always have to be passed.  Though the advantage, is that you have a highly configurable image.


In order to see all the environment variables that the Nginx container is using view the output.  Notice the `NGINX_PORT=8080` and the `NGINX_HOST=example.com`.
:::: code-group
::: code-group-item Try me
 ```sh{2}:no-line-numbers
docker exec -it learning-nginx env
```
:::
::: code-group-item Output
```sh{4,5}:no-line-numbers
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=49e1ae7b4f62
TERM=xterm
NGINX_PORT=8080
NGINX_HOST=example.com
NGINX_VERSION=1.25.3
NJS_VERSION=0.8.2
PKG_RELEASE=1~bookworm
HOME=/root
```
:::
::::

## Conclusion
Environmental variables within an image or the `env` on your local computer, allow configurations to be modified to change its operation.  In the case of Nginx it is used for changing the `NGINX_PORT` and the `NGINX_HOST`.  Other images like [postgres](https://hub.docker.com/_/postgres) are used to change `POSTGRES_PASSWORD`, `POSTGRES_USER`, and `POSTGRES_DB`.

Ways to pass environment variables:
- When running `docker run` you use the `-e` flag 
- Docker compose you pass them using the `environment` property
- Kubernetes you pass these using [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
