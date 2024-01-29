---
title: Building Images with BuildConfigs and ImageStreams
prev: 
    text: Container Configurations with Nginx
    link: /guide/containers/container_configurations.md
---

# BuildConfigs and ImageStream
## Object 
To understand how BuildConfigs and ImageStreams are used to create images that are used in Kubernetes containers.
The examples that will be used in this tutorial is a Nginx server.  

## Prerequisites
- OpenShift Instance
- Terminal program
- [oc command line tool](https://docs.openshift.com/container-platform/4.14/cli_reference/openshift_cli/getting-started-cli.html)
- Documentation:
    - [ImageStreams](https://docs.openshift.com/container-platform/4.14/openshift_images/image-streams-manage.html) and [ImageStream API](https://docs.openshift.com/container-platform/4.14/rest_api/image_apis/imagestream-image-openshift-io-v1.html)
    - [BuildConfigs](https://docs.openshift.com/container-platform/4.14/cicd/builds/understanding-buildconfigs.html) and [BuildConfig API](https://docs.openshift.com/container-platform/4.14/rest_api/workloads_apis/buildconfig-build-openshift-io-v1.html#buildconfig-build-openshift-io-v1)
    

::: warning
There is no namespaces included with ImageStreams BuildConfig or Pod deployments. When you are using oc command lines to apply a configuration, it will use your existing context.
please use the `oc project <yournamespace>` before running any of these commands
:::

## Setup
In order to start this tutorial, login to openshift through the terminal, and then switch to your namespace.
```sh:no-line-numbers
oc project <yournamespace>
```

## The ImageStream
> Image streams provide a means of creating and updating container images in an on-going way. As improvements are made to an image, tags can be used to assign new version numbers and keep track of changes. This document describes how image streams are managed. 

```sh:no-line-numbers
## oc project <yournamespace>

## Run to deploy nginx ImageStream
oc apply -f https://bcgov.github.io/des-training/code/openshift/nginx-image-stream.yaml
```
@[code](../../.vuepress/public/code/openshift/nginx-image-stream.yaml)
- kind: **ImageStream** - defines the type of resource
- apiVersion: **image.openshift.io/v1** - this gives the specification
- metadata.name - **nginx** - will be how we identify this resource

## The BuildConfig
> The build config is the instruction on how your image will get build, from source, docker or as a multi-build.
### Build Config Example 1 from Repository

```sh:no-line-numbers
## oc project <yournamespace>

## Run to deploy nginx BuildConfig
oc apply -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build.yaml
## Create a build and follow
oc start-build -F nginx-build-config
```
@[code](../../.vuepress/public/code/openshift/nginx-image-build.yaml)
- Source of code is this repo, with the context directory of [docker/nginx](https://github.com/bcgov/des-training/tree/master/docker/nginx), and uses the [Dockerfile.template](https://github.com/bcgov/des-training/blob/master/docker/nginx/Dockerfile.template)
- This gets build to the nginx image with a tag of template `nginx:template`
#### Dockerfile.template
@[code docker](../../../../docker/nginx/Dockerfile.template)
#### default.conf.template
@[code conf](../../../../docker/nginx/default.conf.template)

### Cleanup resources 
```sh:no-line-numbers
## oc project <yournamespace>
oc delete -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build.yaml
```

### Build Config Example 2 with Source Image from Repository
```sh:no-line-numbers
## oc project <yournamespace>

## Run to deploy nginx BuildConfig
oc apply -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build-source.yaml
## Create a build and follow
oc start-build -F nginx-build-source-config
```
@[code](../../.vuepress/public/code/openshift/nginx-image-build-source.yaml)
- This works exactly the same as example 1 with these differences
    - It overwrites the `FROM` image with the image in the `strategy.dockerStrategy.from.name`
    - This gets build to the nginx image with a tag of from-source `nginx:from-source`

### Cleanup resources 
```sh:no-line-numbers
## oc project <yournamespace>
oc delete -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build-source.yaml
```

### Build Config Example 3 Inline Dockerfile
```sh:no-line-numbers
## oc project <yournamespace>

## Run to deploy nginx BuildConfig
oc apply -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build-inline.yaml
## Create a build and follow
oc start-build -F nginx-build-inline-config
```
@[code](../../.vuepress/public/code/openshift/nginx-image-build-inline.yaml)
- This build uses a Docker strategy, that uses an inline Docker file.
- It passes the buildArgs to pass the port and the version.
- This gets build to the nginx image with a tag of port38081 `nginx:port38081`

### Cleanup resources 
```sh:no-line-numbers
## oc project <yournamespace>
oc delete -f https://bcgov.github.io/des-training/code/openshift/nginx-image-build-inline.yaml
```

### Build Config Example 4 Inline Dockerfile with ConfigMap
```sh:no-line-numbers
## oc project <yournamespace>

## Run to deploy nginx BuildConfig
oc apply -f https://bcgov.github.io/des-training/code/openshift/composer-build-with-config.yaml
## Create a build and follow
oc start-build -F des-training-composer-build
```
@[code](../../.vuepress/public/code/openshift/composer-build-with-config.yaml)
- This build uses a Docker strategy, that uses an inline Docker file.
- It passes the composer.json file from the configMap
- For more information on [input secrets and config maps](https://docs.openshift.com/container-platform/latest/cicd/builds/creating-build-inputs.html#builds-input-secrets-configmaps_creating-build-inputs)
- This gets build to the des-training-composer image with a tag of latest `des-training-composer:latest`

### Cleanup resources 
```sh:no-line-numbers
## oc project <yournamespace>
oc delete -f https://bcgov.github.io/des-training/code/openshift/composer-build-with-config.yaml
```


