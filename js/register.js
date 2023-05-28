    var firebaseConfig = {
    apiKey: "AIzaSyAMo5G5bWkDHzyXkLQjcB6F5C8GQGmeiNc",
    authDomain: "kan-clothing.firebaseapp.com",
    databaseURL: "https://kan-clothing-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kan-clothing",
    storageBucket: "kan-clothing.appspot.com",
    messagingSenderId: "943100252975",
    appId: "1:943100252975:web:0268951ffea192d27e47da"
  };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();
       

    function registerNow (){
        email = document.getElementById('email').value;
        fname = document.getElementById('firstname').value;
        lname = document.getElementById('lastname').value;
        password = document.getElementById('password').value;
        confpassword = document.getElementById('rpassword').value;

        if (validate_email(email)==false||validate_password(password)==false){
            alert('Email or Password is out of Line!')
            return
        }
        if (validate_field(fname)==false || validate_field(lname) == false){
            alert('One or More Extra Fields is out of line!')
            return
        }
        if (password !== confpassword) {
            alert('Passwords do not match!')
            return
          }

         auth.createUserWithEmailAndPassword(email, password)
        .then(function(){
            var user = auth.currentUser
            var database_ref = database.ref()

            var user_data = {
                email : email,
                firstname : fname,
                lastname : lname,
                last_login : Date.now()

            }

            database_ref.child('users/' + user.uid).set(user_data)

                
            alert('User Created')


        })
        .catch(function(error){
            var error_code = error.code
            var error_message = error.message
            
            alert(error_message)
        })

    }

    function validate_email(email) {
        expression = /^[^@]+@\w+(\.\w+)+\w$/
        if (expression.test(email) == true){
            return true
        }
        else{
            return false
        }
    }

    function validate_password(password){
        if (password < 6){
            return false
        } else {
            return true
        }
    }

    function validate_field(field){
        if(field == null){
            return false
        } 
        if(field.length <=0){
            return false
        }else {
            return true
        }
    }

          

