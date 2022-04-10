FROM node:14.19-alpine
LABEL description="IT Certifications Guide."
LABEL org.opencontainers.image.source=https://github.com/Piotr1215/dca-prep-kit
COPY ./docs ./docs
RUN npm install -g docsify-cli@latest && \
  docsify init ./docs
EXPOSE 3000/tcp
ENTRYPOINT docsify serve ./docs
