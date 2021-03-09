import React, { useState } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { RegionData } from '../RegionData';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const defaultData = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    department: '',
    job_title: '',
    country: RegionData[0].countryName,
    city: ''
};

const steps = [
    { id: 'step1' },
    { id: 'step2' },
    { id: 'step3' }
]

function Signup() {
    let history = useHistory();
    const [formData, setForm] = useForm(defaultData);
    const [password, setPassword] = useState('')
    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })

    const props = { formData, setForm, navigation, setPassword, password }

    const updateEmployers = () => {
        const database = firebase.database();
        database.ref().child('employers').get().then(data => {
            let employersArr = data.val().slice();
            employersArr.push(formData)

            database.ref().child('employers').set(employersArr)
        });
    }

    const validateForm = () => {
        for (let key in formData) {
            if (formData[key].trim() === "") {
                return alert("Please fill all fields")
            }
        }

        if (password.trim() === "") {
            return alert("Please fill password field")
        }
    }

    const createNewUser = ({ email, password }) => {
        return firebase.createUser(
          { email, password }
        )
      }

    const handleRegistration = () => {
        validateForm();


        createNewUser({email: formData.email,password: password})
        .then((userCredential) => {
            updateEmployers();
            history.replace('/profile');
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        })



        
        // add user to firebase db and redirect to /profile
    }

    switch (step.id) {
        case 'step1':
            return <Step1 {...props} />;
        case 'step2':
            return <Step2 {...props} />;
        case 'step3':
            return <Step3 {...props} handleRegistration={handleRegistration} />;
        default:
            return <Step1 {...props} />;
    }
}

export default Signup
