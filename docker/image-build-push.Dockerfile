FROM docker

RUN apk add --update make ca-certificates openssl python
RUN update-ca-certificates
RUN wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz
RUN tar zxvf google-cloud-sdk.tar.gz && ./google-cloud-sdk/install.sh --usage-reporting=false --path-update=true
RUN google-cloud-sdk/bin/gcloud --quiet components update
