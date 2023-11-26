
FROM python:3.11.6-slim

RUN pip install --upgrade pip

WORKDIR /code

COPY ./dist/epseon_gui-0.1.0-py3-none-any.whl .
RUN pip install ./epseon_gui-0.1.0-py3-none-any.whl
RUN rm ./epseon_gui-0.1.0-py3-none-any.whl
