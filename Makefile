#MakeFile to build ConnectFour

# Put your user name below:
USER= ambrosend

CC= g++

#For Optimization
#CFLAGS= -O2
#For debugging
CFLAGS= -std=c++14

RM= /bin/rm -f

all: PutHTML

PutHTML:
	cp connectfour.html /var/www/html/class/softdev/$(USER)/WebAppProject/
	cp webApp.js /var/www/html/class/softdev/$(USER)/WebAppProject/


	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/class/softdev/$(USER)/WebAppProject/

clean:
	rm -f *.o  WebAppProject
