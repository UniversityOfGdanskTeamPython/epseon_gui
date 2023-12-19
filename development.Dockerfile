FROM python:3.11.6-slim

WORKDIR /code

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./dist/epseon_gui-0.1.0-py3-none-any.whl .

RUN pip install ./epseon_gui-0.1.0-py3-none-any.whl

CMD ["uvicorn", "epseon_gui.main:app", "--host", "0.0.0.0", "--port", "80"]
