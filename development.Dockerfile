FROM python:3.11.6-slim


WORKDIR /code

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


COPY . /code/


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

WORKDIR /code/backend
