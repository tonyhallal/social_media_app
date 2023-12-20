/**************************************************************************************************************
 * File: registration.js
 * Author: Tony Hallal
 * Date: 12/5/2023
 * Description: This file contains all the functionality for the registration ejs template
 *************************************************************************************************************/

/**
 * handles the registration mode change by toggling it between sign in and sign up
 */
const handleRegistrationMode = () => {
    //get all the document elements that will change when the mode changes
    const modeTitle = document.querySelector('h1');
    const registerButton = document.getElementById('submit-btn');
    const otherOptionSpan = document.getElementById('other-option');
    const form = document.querySelector('form');
    //check for the mode and change the elements accordingly
    if (modeTitle.textContent === 'Sign In') {
        modeTitle.textContent = 'Sign Up';
        registerButton.textContent = 'Sign Up';
        registerButton.setAttribute('href', '/sign-up');
        otherOptionSpan.innerHTML = `Already have an account? <button id="handle-mode-btn" class="underline hover:opacity-70 duration-300" onclick="handleRegistrationMode()" >Sign In</button>`
        form.setAttribute('action', 'api/v1/add-user')
    } else {
        modeTitle.textContent = 'Sign In';
        registerButton.textContent = 'Sign In';
        registerButton.setAttribute('href', '/api/v1/auth');
        otherOptionSpan.innerHTML = `Don't have an account? <button id="handle-mode-btn" class="underline hover:opacity-70 duration-300" onclick="handleRegistrationMode()">Sign Up</button>`
        form.setAttribute('action', '/sign-in')
    }
}

document.getElementById('handle-mode-btn').addEventListener('click', handleRegistrationMode)
//remove both username and user id from local storage in case of logout
localStorage.removeItem('userId');
localStorage.removeItem('username');