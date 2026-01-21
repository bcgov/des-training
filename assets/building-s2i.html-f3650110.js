import{_ as l,r as o,o as p,c,e as i,a as s,b as a,d as t}from"./app-99b11ff4.js";const u={},r={href:"https://docs.openshift.com/container-platform/4.14/cli_reference/openshift_cli/getting-started-cli.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.openshift.com/container-platform/4.14/openshift_images/image-streams-manage.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.openshift.com/container-platform/4.14/rest_api/image_apis/imagestream-image-openshift-io-v1.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://docs.openshift.com/container-platform/4.14/cicd/builds/understanding-buildconfigs.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.openshift.com/container-platform/4.14/rest_api/workloads_apis/buildconfig-build-openshift-io-v1.html#buildconfig-build-openshift-io-v1",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/bcgov/des-training/tree/master/docker/nginx",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/bcgov/des-training/blob/master/docker/nginx/Dockerfile.template",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.openshift.com/container-platform/latest/cicd/builds/creating-build-inputs.html#builds-input-secrets-configmaps_creating-build-inputs",target:"_blank",rel:"noopener noreferrer"};function y(f,n){const e=o("ExternalLinkIcon");return p(),c("div",null,[n[20]||(n[20]=i('<h1 id="buildconfigs-and-imagestream" tabindex="-1"><a class="header-anchor" href="#buildconfigs-and-imagestream" aria-hidden="true">#</a> BuildConfigs and ImageStream</h1><h2 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> Object</h2><p>To understand how BuildConfigs and ImageStreams are used to create images that are used in Kubernetes containers. The examples that will be used in this tutorial is a Nginx server.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>',4)),s("ul",null,[n[8]||(n[8]=s("li",null,"OpenShift Instance",-1)),n[9]||(n[9]=s("li",null,"Terminal program",-1)),s("li",null,[s("a",r,[n[0]||(n[0]=a("oc command line tool",-1)),t(e)])]),s("li",null,[n[7]||(n[7]=a("Documentation: ",-1)),s("ul",null,[s("li",null,[s("a",d,[n[1]||(n[1]=a("ImageStreams",-1)),t(e)]),n[3]||(n[3]=a(" and ",-1)),s("a",m,[n[2]||(n[2]=a("ImageStream API",-1)),t(e)])]),s("li",null,[s("a",k,[n[4]||(n[4]=a("BuildConfigs",-1)),t(e)]),n[6]||(n[6]=a(" and ",-1)),s("a",v,[n[5]||(n[5]=a("BuildConfig API",-1)),t(e)])])])])]),n[21]||(n[21]=i(`<div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>There is no namespaces included with ImageStreams BuildConfig or Pod deployments. When you are using oc command lines to apply a configuration, it will use your existing context. please use the <code>oc project &lt;yournamespace&gt;</code> before running any of these commands</p></div><h2 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> Setup</h2><p>In order to start this tutorial, login to openshift through the terminal, and then switch to your namespace.</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>oc project <span class="token operator">&lt;</span>yournamespace<span class="token operator">&gt;</span>
</code></pre></div><h2 id="the-imagestream" tabindex="-1"><a class="header-anchor" href="#the-imagestream" aria-hidden="true">#</a> The ImageStream</h2><blockquote><p>Image streams provide a means of creating and updating container images in an on-going way. As improvements are made to an image, tags can be used to assign new version numbers and keep track of changes. This document describes how image streams are managed.</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>

<span class="token comment">## Run to deploy nginx ImageStream</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-stream.yaml
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStream
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> image.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> Nginx Image stream with templates for NGINX_PORT and NGINX_HOST
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>kind: <strong>ImageStream</strong> - defines the type of resource</li><li>apiVersion: <strong>image.openshift.io/v1</strong> - this gives the specification</li><li>metadata.name - <strong>nginx</strong> - will be how we identify this resource</li></ul><h2 id="the-buildconfig" tabindex="-1"><a class="header-anchor" href="#the-buildconfig" aria-hidden="true">#</a> The BuildConfig</h2><blockquote><p>The build config is the instruction on how your image will get build, from source, docker or as a multi-build.</p></blockquote><h3 id="build-config-example-1-from-repository" tabindex="-1"><a class="header-anchor" href="#build-config-example-1-from-repository" aria-hidden="true">#</a> Build Config Example 1 from Repository</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>

<span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build.yaml
<span class="token comment">## Create a build and follow</span>
oc start-build <span class="token parameter variable">-F</span> nginx-build-config
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> BuildConfig
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> build.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>build<span class="token punctuation">-</span>config
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> This builds the nginx image from GIT source.
<span class="token key atrule">strategy</span><span class="token punctuation">:</span>
  <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">forcePull</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">successfulBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">failedBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">runPolicy</span><span class="token punctuation">:</span> Serial
  <span class="token key atrule">source</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Git
    <span class="token key atrule">git</span><span class="token punctuation">:</span>
      <span class="token key atrule">ref</span><span class="token punctuation">:</span> main
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/bcgov/des<span class="token punctuation">-</span>training.git
    <span class="token key atrule">contextDir</span><span class="token punctuation">:</span> docker/nginx
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Docker
    <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">dockerfilePath</span><span class="token punctuation">:</span> Dockerfile.template
      <span class="token key atrule">buildArgs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> CODE_VERSION
        <span class="token key atrule">value</span><span class="token punctuation">:</span>  1.24.0
  <span class="token key atrule">output</span><span class="token punctuation">:</span>
    <span class="token key atrule">to</span><span class="token punctuation">:</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStreamTag
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>template
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)),s("ul",null,[s("li",null,[n[12]||(n[12]=a("Source of code is this repo, with the context directory of ",-1)),s("a",b,[n[10]||(n[10]=a("docker/nginx",-1)),t(e)]),n[13]||(n[13]=a(", and uses the ",-1)),s("a",g,[n[11]||(n[11]=a("Dockerfile.template",-1)),t(e)])]),n[14]||(n[14]=s("li",null,[a("This gets build to the nginx image with a tag of template "),s("code",null,"nginx:template")],-1))]),n[22]||(n[22]=i(`<h4 id="dockerfile-template" tabindex="-1"><a class="header-anchor" href="#dockerfile-template" aria-hidden="true">#</a> Dockerfile.template</h4><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># Dockerfile.template - used to create an Nginx image with templates.</span>
<span class="token instruction"><span class="token keyword">ARG</span> CODE_VERSION=latest</span>
<span class="token instruction"><span class="token keyword">FROM</span> nginx:<span class="token variable">\${CODE_VERSION}</span></span>
<span class="token comment"># As of Nginx 1.19 you can use templates</span>
<span class="token instruction"><span class="token keyword">COPY</span> ./default.conf.template /etc/nginx/templates/</span>
<span class="token comment"># Fix up permissions</span>
<span class="token instruction"><span class="token keyword">RUN</span> chmod -Rf 0777 /tmp /var /run /etc /mnt || :</span>
<span class="token comment"># Switch to usermode</span>
<span class="token instruction"><span class="token keyword">USER</span> 104</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="default-conf-template" tabindex="-1"><a class="header-anchor" href="#default-conf-template" aria-hidden="true">#</a> default.conf.template</h4><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>#default.conf.template
server {
   listen       \${NGINX_PORT};
   listen  [::]:\${NGINX_PORT};
   server_name  \${NGINX_HOST};

   #access_log  /var/log/nginx/host.access.log  main;

   location / {
       root   /usr/share/nginx/html;
       index  index.html index.htm;
   }

   #error_page  404              /404.html;

   # redirect server error pages to the static page /50x.html
   #
   error_page   500 502 503 504  /50x.html;
   location = /50x.html {
       root   /usr/share/nginx/html;
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cleanup-resources" tabindex="-1"><a class="header-anchor" href="#cleanup-resources" aria-hidden="true">#</a> Cleanup resources</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>
oc delete <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build.yaml
</code></pre></div><h3 id="build-config-example-2-with-source-image-from-repository" tabindex="-1"><a class="header-anchor" href="#build-config-example-2-with-source-image-from-repository" aria-hidden="true">#</a> Build Config Example 2 with Source Image from Repository</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>

<span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-source.yaml
<span class="token comment">## Create a build and follow</span>
oc start-build <span class="token parameter variable">-F</span> nginx-build-source-config
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> BuildConfig
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> build.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>build<span class="token punctuation">-</span>source<span class="token punctuation">-</span>config
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> This builds the nginx image from GIT source.
<span class="token key atrule">strategy</span><span class="token punctuation">:</span>
  <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">forcePull</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">successfulBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">failedBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">runPolicy</span><span class="token punctuation">:</span> Serial
  <span class="token key atrule">source</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Git
    <span class="token key atrule">git</span><span class="token punctuation">:</span>
      <span class="token key atrule">ref</span><span class="token punctuation">:</span> main
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/bcgov/des<span class="token punctuation">-</span>training.git
    <span class="token key atrule">contextDir</span><span class="token punctuation">:</span> docker/nginx
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Docker
    <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">from</span><span class="token punctuation">:</span>
        <span class="token key atrule">kind</span><span class="token punctuation">:</span> DockerImage
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.23.3<span class="token punctuation">-</span>alpine
      <span class="token key atrule">dockerfilePath</span><span class="token punctuation">:</span> Dockerfile.template
      <span class="token key atrule">buildArgs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> CODE_VERSION
        <span class="token key atrule">value</span><span class="token punctuation">:</span>  1.24.0
  <span class="token key atrule">output</span><span class="token punctuation">:</span>
    <span class="token key atrule">to</span><span class="token punctuation">:</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStreamTag
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>from<span class="token punctuation">-</span>source
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>This works exactly the same as example 1 with these differences <ul><li>It overwrites the <code>FROM</code> image with the image in the <code>strategy.dockerStrategy.from.name</code></li><li>This gets build to the nginx image with a tag of from-source <code>nginx:from-source</code></li></ul></li></ul><h3 id="cleanup-resources-1" tabindex="-1"><a class="header-anchor" href="#cleanup-resources-1" aria-hidden="true">#</a> Cleanup resources</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>
oc delete <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-source.yaml
</code></pre></div><h3 id="build-config-example-3-inline-dockerfile" tabindex="-1"><a class="header-anchor" href="#build-config-example-3-inline-dockerfile" aria-hidden="true">#</a> Build Config Example 3 Inline Dockerfile</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>

<span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-inline.yaml
<span class="token comment">## Create a build and follow</span>
oc start-build <span class="token parameter variable">-F</span> nginx-build-inline-config
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> BuildConfig
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> build.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>build<span class="token punctuation">-</span>inline<span class="token punctuation">-</span>config
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> This builds the nginx image from inline dockerfile.
<span class="token key atrule">strategy</span><span class="token punctuation">:</span>
  <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">forcePull</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">successfulBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">failedBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">runPolicy</span><span class="token punctuation">:</span> Serial
  <span class="token key atrule">source</span><span class="token punctuation">:</span>
    <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
      <span class="token comment"># Dockerfile.sed - used to create an Nginx image with new port defined by $PORT</span>
      ARG CODE_VERSION=latest
      FROM nginx<span class="token punctuation">:</span>$<span class="token punctuation">{</span>CODE_VERSION<span class="token punctuation">}</span>
      <span class="token comment"># Using sed to change port 80 to \${PORT} as port 80 is a privileged port.</span>
      RUN <span class="token punctuation">[</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sed -i &#39;s/80/38081/g&#39; /etc/nginx/conf.d/default.conf&quot;</span><span class="token punctuation">]</span>
      <span class="token comment"># Fix up permissions</span>
      <span class="token key atrule">RUN chmod -Rf 0777 /tmp /var /run /etc /mnt ||</span> <span class="token punctuation">:</span>
      <span class="token comment"># Switch to usermode</span>
      USER 104
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Docker
    <span class="token key atrule">dockerStrategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">buildArgs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> CODE_VERSION
        <span class="token key atrule">value</span><span class="token punctuation">:</span>  1.25.3
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PORT
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token number">38081</span>
  <span class="token key atrule">output</span><span class="token punctuation">:</span>
    <span class="token key atrule">to</span><span class="token punctuation">:</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStreamTag
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>port38081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>This build uses a Docker strategy, that uses an inline Docker file.</li><li>It passes the buildArgs to pass the port and the version.</li><li>This gets build to the nginx image with a tag of port38081 <code>nginx:port38081</code></li></ul><h3 id="cleanup-resources-2" tabindex="-1"><a class="header-anchor" href="#cleanup-resources-2" aria-hidden="true">#</a> Cleanup resources</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>
oc delete <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-inline.yaml
</code></pre></div><h3 id="build-config-example-4-inline-dockerfile-with-configmap" tabindex="-1"><a class="header-anchor" href="#build-config-example-4-inline-dockerfile-with-configmap" aria-hidden="true">#</a> Build Config Example 4 Inline Dockerfile with ConfigMap</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>

<span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/composer-build-with-config.yaml
<span class="token comment">## Create a build and follow</span>
oc start-build <span class="token parameter variable">-F</span> des-training-composer-build
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token comment"># The config map which will contain the composer.json file for the s2i build.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> des<span class="token punctuation">-</span>training<span class="token punctuation">-</span>composer<span class="token punctuation">-</span>file
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> Training<span class="token punctuation">,</span> Configmap that stores a composer.json file<span class="token punctuation">,</span> used for building an image.
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">composer.json</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    {
      &quot;name&quot;: &quot;bcgov/sample-composer-project&quot;,
      &quot;type&quot;: &quot;project&quot;,
      &quot;license&quot;: &quot;MIT&quot;,
      &quot;require&quot;: {
          &quot;monolog/monolog&quot;: &quot;3.5.0&quot;
      },
      &quot;config&quot;: {
        &quot;php&quot;: &quot;8.3&quot;
      }
    }</span>
<span class="token punctuation">---</span>
<span class="token comment"># Image stream</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStream
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> image.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> des<span class="token punctuation">-</span>training<span class="token punctuation">-</span>composer
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> Training<span class="token punctuation">,</span> Image that has the composer install on a composer.json from buildConfig
<span class="token punctuation">---</span>
<span class="token comment"># The Build config to run composer.json defined in config map</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> BuildConfig
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> build.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> des<span class="token punctuation">-</span>training<span class="token punctuation">-</span>composer<span class="token punctuation">-</span>build
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> training
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">output</span><span class="token punctuation">:</span>
    <span class="token key atrule">to</span><span class="token punctuation">:</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStreamTag
      <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;des-training-composer:latest&#39;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">limits</span><span class="token punctuation">:</span>
      <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&#39;0.4&#39;</span>
      <span class="token key atrule">memory</span><span class="token punctuation">:</span> 400Mi
    
  <span class="token key atrule">successfulBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">failedBuildsHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">completionDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">1800</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Docker
  <span class="token key atrule">source</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
      FROM composer<span class="token punctuation">-</span>source AS composer
      WORKDIR /var/www/html
      <span class="token comment"># Because there is a dockerfile and not using github for s2i, it uses the configmap for composer.json</span>
      COPY composer.json /var/www/html
      RUN composer install
    <span class="token key atrule">images</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">from</span><span class="token punctuation">:</span>
          <span class="token key atrule">kind</span><span class="token punctuation">:</span> DockerImage
          <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;composer:lts&#39;</span>
        <span class="token key atrule">as</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> composer<span class="token punctuation">-</span>source
    <span class="token key atrule">configMaps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> des<span class="token punctuation">-</span>training<span class="token punctuation">-</span>composer<span class="token punctuation">-</span>file
      <span class="token comment"># - configMap:</span>
      <span class="token comment">#     name: some-other-config-map</span>
  <span class="token key atrule">runPolicy</span><span class="token punctuation">:</span> Parallel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21)),s("ul",null,[n[17]||(n[17]=s("li",null,"This build uses a Docker strategy, that uses an inline Docker file.",-1)),n[18]||(n[18]=s("li",null,"It passes the composer.json file from the configMap",-1)),s("li",null,[n[16]||(n[16]=a("For more information on ",-1)),s("a",h,[n[15]||(n[15]=a("input secrets and config maps",-1)),t(e)])]),n[19]||(n[19]=s("li",null,[a("This gets build to the des-training-composer image with a tag of latest "),s("code",null,"des-training-composer:latest")],-1))]),n[23]||(n[23]=i(`<h3 id="cleanup-resources-3" tabindex="-1"><a class="header-anchor" href="#cleanup-resources-3" aria-hidden="true">#</a> Cleanup resources</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## oc project &lt;yournamespace&gt;</span>
oc delete <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/composer-build-with-config.yaml
</code></pre></div>`,2))])}const w=l(u,[["render",y],["__file","building-s2i.html.vue"]]);export{w as default};
