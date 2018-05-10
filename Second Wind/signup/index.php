
<html>
  <head>
    <title>Second Wind - Sign Up</title>
    <link rel="stylesheet" href="../css/login-signup.css"/>
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="../css/style.css"/>
  </head>
  <body>
    <div class="loginParent">
      <div class="loginChild menuSolid textWhite signupContentParent" id="signupContent">
        <cardhead>
          <h3>Sign Up</h3>
        </cardhead>
        <error class="loginContent" id="error"><em><?=$error?></em></error>
        <user1 class="loginContent">Username:</user1>
        <user2 class="loginContent">
          <input class="loginInput textWhite" id="username" type="text" oninput="loadP('error','checkUserExists',element('username').value)"/>
        </user2>
        <email1 class="loginContent">Email:</email1>
        <email2 class="loginContent">
          <input class="loginInput textWhite" id="email" type="email"/>
        </email2>
        <pass1 class="loginContent">Password:</pass1>
        <pass2 class="loginContent">
          <input class="loginInput textWhite" id="password" type="password"/>
        </pass2>
        <login class="loginContent"><a href="../login">
            <button class="loginButton textWhite">back to login</button></a></login>
        <signup class="loginContent">
          <button class="loginButton textWhite" id="signup" onclick="signup()">Signup</button>
        </signup>
      </div>
    </div>
    <div id="ghost"></div>
  </body>
</html>