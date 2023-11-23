import{_ as i,r as l,o,c,a as n,b as s,d as e,e as t}from"./app-9uM0FHE3.js";const p={},u=t('<h1 id="buildconfigs-and-imagestream" tabindex="-1"><a class="header-anchor" href="#buildconfigs-and-imagestream" aria-hidden="true">#</a> BuildConfigs and ImageStream</h1><h2 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> Object</h2><p>To understand how BuildConfigs and ImageStreams are used to create images that are used in Kubernetes containers. The examples that will be used in this tutorial is a Nginx server.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>',4),r=n("li",null,"OpenShift Instance",-1),d=n("li",null,"Terminal program",-1),k={href:"https://docs.openshift.com/container-platform/4.14/cli_reference/openshift_cli/getting-started-cli.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.openshift.com/container-platform/4.14/openshift_images/image-streams-manage.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.openshift.com/container-platform/4.14/rest_api/image_apis/imagestream-image-openshift-io-v1.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.openshift.com/container-platform/4.14/cicd/builds/understanding-buildconfigs.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://docs.openshift.com/container-platform/4.14/rest_api/workloads_apis/buildconfig-build-openshift-io-v1.html#buildconfig-build-openshift-io-v1",target:"_blank",rel:"noopener noreferrer"},h=t(`<div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>There is no namespaces included with ImageStreams BuildConfig or Pod deployments. When you are using oc command lines to apply a configuration, it will use your existing context. please use the <code>oc project &lt;yournamespace&gt;</code> before running any of these commands</p></div><h2 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> Setup</h2><p>In order to start this tutorial, login to openshift through the terminal, and then switch to your namespace.</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>oc project <span class="token operator">&lt;</span>yournamespace<span class="token operator">&gt;</span>
</code></pre></div><h2 id="the-imagestream" tabindex="-1"><a class="header-anchor" href="#the-imagestream" aria-hidden="true">#</a> The ImageStream</h2><blockquote><p>Image streams provide a means of creating and updating container images in an on-going way. As improvements are made to an image, tags can be used to assign new version numbers and keep track of changes. This document describes how image streams are managed.</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## Run to deploy nginx ImageStream</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-stream.yaml
</code></pre></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageStream
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> image.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> Nginx Image stream with templates for NGINX_PORT and NGINX_HOST
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>kind: <strong>ImageStream</strong> - defines the type of resource</li><li>apiVersion: <strong>image.openshift.io/v1</strong> - this gives the specification</li><li>metadata.name - <strong>nginx</strong> - will be how we identify this resource</li></ul><h2 id="the-buildconfig" tabindex="-1"><a class="header-anchor" href="#the-buildconfig" aria-hidden="true">#</a> The BuildConfig</h2><blockquote><p>The build config is the instruction on how your image will get build, from source, docker or as a multi-build.</p></blockquote><h3 id="build-config-example-1-from-repository" tabindex="-1"><a class="header-anchor" href="#build-config-example-1-from-repository" aria-hidden="true">#</a> Build Config Example 1 from Repository</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build.yaml
<span class="token comment">## Create a build and follow</span>
oc build-start <span class="token parameter variable">-F</span> nginx-build-config
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),f={href:"https://github.com/bcgov/des-training/tree/master/docker/nginx",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/bcgov/des-training/blob/master/docker/nginx/Dockerfile.template",target:"_blank",rel:"noopener noreferrer"},x=n("li",null,[s("This gets build to the nginx image with a tag of template "),n("code",null,"nginx:template")],-1),_=t(`<h4 id="dockerfile-template" tabindex="-1"><a class="header-anchor" href="#dockerfile-template" aria-hidden="true">#</a> Dockerfile.template</h4><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># Dockerfile.template - used to create an Nginx image with templates.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="build-config-example-2-with-source-image-from-repository" tabindex="-1"><a class="header-anchor" href="#build-config-example-2-with-source-image-from-repository" aria-hidden="true">#</a> Build Config Example 2 with Source Image from Repository</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-source.yaml
<span class="token comment">## Create a build and follow</span>
oc build-start <span class="token parameter variable">-F</span> nginx-build-source-config
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>This works exactly the same as example 1 with these differences <ul><li>It overwrites the <code>FROM</code> image with the image in the <code>strategy.dockerStrategy.from.name</code></li><li>This gets build to the nginx image with a tag of from-source <code>nginx:from-source</code></li></ul></li></ul><h3 id="build-config-example-3-inline-dockerfile" tabindex="-1"><a class="header-anchor" href="#build-config-example-3-inline-dockerfile" aria-hidden="true">#</a> Build Config Example 3 Inline Dockerfile</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## Run to deploy nginx BuildConfig</span>
oc apply <span class="token parameter variable">-f</span> https://bcgov.github.io/des-training/code/openshift/nginx-image-build-inline.yaml
<span class="token comment">## Create a build and follow</span>
oc build-start <span class="token parameter variable">-F</span> nginx-build-inline-config
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>This build uses a Docker strategy, that uses an inline Docker file.</li><li>It passes the buildArgs to pass the port and the version.</li><li>This gets build to the nginx image with a tag of port38081 <code>nginx:port38081</code></li></ul>`,12);function S(w,I){const a=l("ExternalLinkIcon");return o(),c("div",null,[u,n("ul",null,[r,d,n("li",null,[n("a",k,[s("oc command line tool"),e(a)])]),n("li",null,[s("Documentation: "),n("ul",null,[n("li",null,[n("a",m,[s("ImageStreams"),e(a)]),s(" and "),n("a",v,[s("ImageStream API"),e(a)])]),n("li",null,[n("a",g,[s("BuildConfigs"),e(a)]),s(" and "),n("a",b,[s("BuildConfig API"),e(a)])])])])]),h,n("ul",null,[n("li",null,[s("Source of code is this repo, with the context directory of "),n("a",f,[s("docker/nginx"),e(a)]),s(", and uses the "),n("a",y,[s("Dockerfile.template"),e(a)])]),x]),_])}const N=i(p,[["render",S],["__file","building-s2i.html.vue"]]);export{N as default};
