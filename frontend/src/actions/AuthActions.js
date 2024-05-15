export function registerUserAction(matrikel, name, email, password){
    const registrationForm = {
        name: name,
        password: password,
        studenId: matrikel,
        email: email
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(registrationForm)
    }

    return fetch('https://localhost/api/user/create', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error adding course');
            }
            console.log(response);
        })
}