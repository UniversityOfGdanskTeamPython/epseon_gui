
FROM python:3.11.6-slim

WORKDIR /code

ENV PIP_DISABLE_PIP_VERSION_CHECK 1

COPY ./app /code/app

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
