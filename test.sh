!#/bin/bash


echo "Installing npm packages"
#install npm packages
npm install
#check if the install went throuth, if not quit with error
if [ $? -ne 0 ]; then
    printf '%s\n' "Something went wrong. Please make sure npm is installed and setup correctly. npm is a prerequisit." >&2
    exit 1
fi

#Start frontend
echo "running frontend tests"
cd frontend
npm test

#Start backend
echo "running backend tests"
cd ../backend
npm test
