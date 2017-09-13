FROM python:2.7-jessie
LABEL maintainer="chris.greenhalgh@nottingham.ac.uk"

RUN apt-get update && apt-get install -y libxml2-dev libxslt1-dev zlib1g-dev

WORKDIR /root/meld
ADD requirements.txt ./
RUN pip install -r requirements.txt

FROM python:2.7-alpine
WORKDIR /root/meld
COPY --from=0 /root/.cache /root/.cache
ADD requirements.txt ./
RUN pip install -r requirements.txt && rm -rf /root/.cache

ADD config.py manage.py ./
ADD app/ app/

VOLUME /root/meld/collection
VOLUME /root/meld/annostate
VOLUME /root/meld/subscription

EXPOSE 5000

ENV MELD_BASE_URI http://127.0.0.1:5000
ENV MELD_MEI_URI http://127.0.0.1:3000/content
ENV MELD_MUZICODES_URI http://127.0.0.1:3000
ENV MELD_BASECAMP_MEI_FILE http://127.0.0.1:3000/content/BaseCamp.mei

CMD ["python","manage.py","runserver","--host=0.0.0.0"]
