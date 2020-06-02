FROM python:3

ADD ./myresume_bot /myresume_bot

COPY requirements.txt /myresume_bot

WORKDIR /myresume_bot

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]


#docker build --tag resumechatbot:1.0 .

#docker run -it --restart always --net=subnet18 --hostname=myresume_chatbot --name=myresume_chatbot -p 80:8000 resumechatbot:1.0
