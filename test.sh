!#/bin/bash


#install npm packages
npm install

#Start frontend
cd frontend
npm test

#Start backend
cd ../backend
npm test
