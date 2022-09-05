# Django-gRPC-React Todo app
A simple Todo app backend build with Django and gRPC frontend build with React js

![todo](https://user-images.githubusercontent.com/40915147/188493216-32406fa7-95c0-4894-babf-738fb270d03b.png)

![todo](https://user-images.githubusercontent.com/40915147/188493514-00375f32-a13b-4892-a36b-91153f9da53d.gif)



### setup

To get this repository, run the following command inside your git enabled terminal

    $ git clone https://github.com/Pradeeparul2/Django-gRPC-React-Todo-app.git
    
Create virtual environment and install requirements

    python -m venv myvenv
    
    # Mac OS / Linux
    $ source myvenv/bin/activate
 
    # windows
    $ myvenv\Scripts\activate
    
    $ pip install -r requirements.txt
    
    $ python manage.py makemigrations
    $ python manage.py migrate
    
Open terminal and run below comment to start grpc server (first terminal)

    $ python manage.py grpcrunserver --dev
    
note: if you getting error like below

    TypeError: requires_system_checks must be a list or tuple.
    
comment following lines in myvenv/lib/python3.8/site-packages/django/core/management/base.py

    if (
            not isinstance(self.requires_system_checks, (list, tuple))
            and self.requires_system_checks != ALL_CHECKS
        ):
            raise TypeError("requires_system_checks must be a list or tuple.")
   
Open another terminal to start client (second terminal)

    $ python manage.py runserver
    
Open one more terminal to run frontend (third terminal)

    $ cd frontend
    $ npm install
    $ npm start

    
