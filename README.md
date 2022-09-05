# Django-gRPC Todo app
A simple Todo app backend build with Django and gRPC

### setup

To get this repository, run the following command inside your git enabled terminal

    $ git clone https://github.com/Pradeeparul2/todo_app.git
    
Create virtual environment and install requirements

    python -m venv myvenv
    
    # Mac OS / Linux
    $ source myvenv/bin/activate
 
    # windows
    $ myvenv\Scripts\activate
    
    $ pip install -r requirements.txt
    
Open terminal and run below comment to start grpc server

    $ python manage.py grpcrunserver --dev
    
   
Open another terminal to start client

    $ python manage.py runserver
    
