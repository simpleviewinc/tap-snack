ARG KEG_BASE_IMAGE=node:12.19-alpine
FROM $KEG_BASE_IMAGE as tap-base

# Install the dependecies with yarn setup, then remove the .npmrc
RUN apk add --no-cache git bash sudo; \
    yarn global add npm-run-all; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

ARG DOC_APP_PATH=/keg/tap
ENV DOC_APP_PATH=$DOC_APP_PATH

ARG DOC_BUILD_PATH=/keg/tap-build
ENV DOC_BUILD_PATH=$DOC_BUILD_PATH

ARG GIT_APP_URL=https://github.com/simpleviewinc/tap-snack.git
ENV GIT_APP_URL=$GIT_APP_URL

ARG GIT_APP_BRANCH=master
ENV GIT_APP_BRANCH=$GIT_APP_BRANCH

RUN git clone --single-branch --branch $GIT_APP_BRANCH $GIT_APP_URL $DOC_APP_PATH; \
    cd $DOC_APP_PATH; \
    yarn install; \
    yarn doc:setup

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

EXPOSE $KEG_PROXY_PORT

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
