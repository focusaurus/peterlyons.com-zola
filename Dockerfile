FROM node:11.5.0-slim

SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

# debian: packages
RUN apt-get -qq -y update >/dev/null; apt-get -qq -y install git less wget >/dev/null

ARG USER
ARG USER_ID=1000
ARG GROUP_ID=1000

# debian: userid match
RUN addgroup --gid "${GROUP_ID}" "${USER}" || true
RUN adduser --disabled-password --gid "${GROUP_ID}" --uid "${USER_ID}" --gecos "${USER}" "${USER}" || true

ARG ZOLA_VERSION=0.5.1
RUN wget -q -O - \
  "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
  | tar --extract --gzip --file - --directory /usr/local/bin \
  && chmod 755 /usr/local/bin/zola

EXPOSE 9002
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/host/bin:/host/node_modules/.bin RUST_BACKTRACE=1
WORKDIR /host
CMD ["bash"]

USER ${USER}
