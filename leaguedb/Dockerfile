FROM tiangolo/uwsgi-nginx-flask:flask

COPY requirements.txt /tmp/

RUN pip install -U pip
RUN pip install -r /tmp/requirements.txt

COPY ./app /app

