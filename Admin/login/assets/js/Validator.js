
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {getFirestore, collection, doc, setDoc, getDoc, where, query, getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnihNKFFQo2oqJBP_SsgmTHSyeUQetVN0",
    authDomain: "ltnc232-8301c.firebaseapp.com",
    databaseURL: "https://ltnc232-8301c-default-rtdb.firebaseio.com",
    projectId: "ltnc232-8301c",
    storageBucket: "ltnc232-8301c.appspot.com",
    messagingSenderId: "636222150811",
    appId: "1:636222150811:web:a41d6fc9e6c0cd35dd8e3e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(getDatabase());

var notifi = document.querySelector('.ti-bell');
var flag = true;
let data_user ={};

notifi.onclick = function(){
    if(flag){
        notifi.querySelector('ul').style.display='list-item';
        flag =!flag;
    }
    else{
        notifi.querySelector('ul').style.display='none';
        flag =!flag;
    }
}

export function Validator(options){
    var formElement = document.querySelector(options.form)
    function validate(inputElement,rule){
        var messageElement = inputElement.parentElement.querySelector('.form-message')
        var labelElement =  inputElement.parentElement.querySelector('label')
        var errorMessage =  rule.test(inputElement.value)
        var inputValue = inputElement.value.trim()
               if(errorMessage){
                    messageElement.innerText = errorMessage
                    inputElement.parentElement.classList.add('invalid')
                    if(inputValue){
                    labelElement.classList.add('focus-label')   
                    }
                    else{
                    labelElement.classList.remove('focus-label')
                    }
                    
                    return false;
               }else{
                    messageElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                    labelElement.classList.add('focus-label')
                    return true;
               }
               
    }

    // submit form
    if(formElement){
         formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid  = validate(inputElement,rule)
                if(!isValid){
                    isFormValid = false;
                }
            })

            if(isFormValid){
                
                var enableElement = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableElement).reduce(function(value,input){
                    value[input.name] = input.value;
                    return value;
                },{})
                const email = formValues.user + "@hcmut.edu.vn";
                const password = formValues.password;

                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        // console.log(options.user);
                        // console.log(user.uid);
                        
                        let user_id = user.uid;
                        let isTeacher;
                        let isStudent;
                        localStorage.setItem('user',
                            user_id
                        );
                        if(options.user == "admin"){
                            
                            
                            if(user_id){
                                alert("success login admin");
                                window.location.href = ".../admin.html";    // đường dẫn TODO
                            }
                            else
                                throw Error('đăng nhập admin không thành công');
                            
                        }   
                        else if(options.user == "user"){
                            
                           get(child(dbRef, `users/student/${user_id}`))
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    console.log(snapshot.val());
                                    //TODO
                                    alert("Student login");
                                    window.location.href = "index.html";
                                } else {

                                  get(child(dbRef, `users/teacher/${user_id}`))
                                    .then((snapshot) => {
                                    if (snapshot.exists()) {
                                    console.log(snapshot.val());
                                    alert("teacher login");
                                    window.location.href = "index.html";
                                    
                                } else {
                                  alert("sai tên đăng nhập hoặc mật khẩu");
                                  window.location.href = window.location.href;
                                }
                            })
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                            }
                            
                            
                        else{
                                throw Error("đăng nhập không thành công 2");
                        }
                        
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("ERROR: ", errorMessage);
                        alert("sai tên đăng nhập hoặc mật khẩu");
                        window.location.reload()
                    });
            }
            
        
        }
    }

    // xử lí rules
    options.rules.forEach(function(rule) {
        const inputElement = formElement.querySelector(rule.selector)
        if(inputElement){
            inputElement.onblur = function(){
               validate(inputElement,rule)
            }
            inputElement.oninput = function(){
                    var messageElement = inputElement.parentElement.querySelector('.form-message')
                    messageElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                
            }
            
        }
    })
    
    
}

// // dinh nghia Rules
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test:  function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}
Validator.isEmail = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/;
            return regex.test(value) ? undefined : message || 'vui lòng nhập trường này'
        }
    };
}
export function getID(){
    return user_id;
}
export function getDataId(){
    return data_user;
}

