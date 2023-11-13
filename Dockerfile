FROM python:3.11.6-slim


WORKDIR /code

ENV PIP_DISABLE_PIP_VERSION_CHECK 1

#COPY ./backend /code/backend
#COPY ./pyproject.toml /code/
COPY . /code/

RUN rm docker*
RUN rm Docker*

RUN apt-get -y update
RUN apt-get -y install git

RUN pip install --user poetry

ENV PATH="/root/.local/bin:${PATH}"

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

WORKDIR /code/backend

#COPY ./requirements.txt /code/requirements.txt


#RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
