
<html>
  <head>
    <title>Second Wind - Login</title>
    <link rel="stylesheet" href="../css/login-signup.css"/>
    <link rel="stylesheet" href="../css/style.css"/>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="../libraries/account/functions.js"></script>
    <script src="../libraries/utility/functions.js"></script>
    <script src="functions.js"></script>
  </head>
  <body>
    <div class="loginParent">
      <section class="loginChild menuSolid loginContentParent textWhite" id="loginContent">
        <cardhead>
          <h3>Login</h3>
        </cardhead>
        <error class="loginContent" id="message"></error>
        <user1 class="loginContent">Username:</user1>
        <user2 class="loginContent">
          <input class="loginInput textWhite" id="username" type="text"/>
        </user2>
        <pass1 class="loginContent">Password:</pass1>
        <pass2 class="loginContent">
          <input class="loginInput textWhite" id="password" type="password"/>
        </pass2>
        <signup class="loginContent"><a href="../signup">
            <button class="loginButton textWhite">Signup</button></a></signup>
        <login class="loginContent"><a onclick="login()">
            <button class="loginButton textWhite" id="login">Login</button></a></login>
      </section>
    </div>
    <div id="ghost">                   </div>
  </body>
</html>