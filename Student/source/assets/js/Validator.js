
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {getFirestore, collection, doc, setDoc, getDoc, where, query, getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCWZqzZdpjOHikzcRsTdklt0fJ0EhA5ko",
  authDomain: "login-noti.firebaseapp.com",
  projectId: "login-noti",
  storageBucket: "login-noti.appspot.com",
  messagingSenderId: "300130445360",
  appId: "1:300130445360:web:89742cf5cdbf82e7a7e5f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const checkAdmin = query(collection(db, "user"), where("admin", "==", true));
const checkUser = query(collection(db, "user"), where("admin", "==", false));

const querySnapshot_admin = await getDocs(checkAdmin);
const querySnapshot_user = await getDocs(checkUser);

console.log("HELLO");
var notifi = document.querySelector('.ti-bell');
var flag = true;
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
                const email = formValues.user;
                const password = formValues.password;
                 signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        // console.log(options.user);
                        // console.log(user.uid);
                        let user_id;
                        let data_user ={};
                        let isTeacher;
                        let isStudent;
                        if(options.user == "admin"){
                            querySnapshot_admin.forEach((doc) => {                                
                                if(user.uid== doc.data()["user_id"]){
                                    data_user = doc.data();
                                    user_id = doc.data()["user_id"]
                                }
                            });
                            if(user_id){
                                alert("success login admin");
                                window.location.href = "index.html";    // đường dẫn 
                            }
                            else
                                throw Error();
                            
                        }   
                        else if(options.user == "user"){
                                querySnapshot_user.forEach((doc)=>{
                                    if(user.uid== doc.data()["user_id"]){
                                        data_user = doc.data();
                                        user_id = doc.data()["user_id"]
                                        isTeacher = doc.data().teacher;
                                        isStudent = doc.data().student;
                                    }
                                })
                                if(isTeacher == true){
                                alert("success login teacher");
                                // đường dẫn trang
                                }
                                else if(isStudent == true){
                                    alert("success login student");
                                // đường dẫn trang
                                }
                                else{
                                    throw Error();
                                }
                            }
                        else{
                                throw Error();
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

