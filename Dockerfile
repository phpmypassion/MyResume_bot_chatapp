FROM python:3

ADD ./myresume_bot /myresume_bot

COPY requirements.txt /tmp

WORKDIR /myresume_bot

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]
