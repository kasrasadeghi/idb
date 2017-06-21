FROM tiangolo/uwsgi-nginx:python2.7

RUN pip install flask
COPY nginx.conf /etc/nginx/conf.d/

COPY requirements.txt /tmp/

RUN pip install -U pip
RUN pip install -r /tmp/requirements.txt

COPY ./app /app

