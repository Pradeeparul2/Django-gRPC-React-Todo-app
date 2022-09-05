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
    
    $ python manage.py makemigrations
    $ python manage.py migrate
    
Open terminal and run below comment to start grpc server

    $ python manage.py grpcrunserver --dev
    
note: if you getting error like below

    TypeError: requires_system_checks must be a list or tuple.
    
comment following lines in myvenv/lib/python3.8/site-packages/django/core/management/base.py

    if (
            not isinstance(self.requires_system_checks, (list, tuple))
            and self.requires_system_checks != ALL_CHECKS
        ):
            raise TypeError("requires_system_checks must be a list or tuple.")
   
Open another terminal to start client

    $ python manage.py runserver
    
