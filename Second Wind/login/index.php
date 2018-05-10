
<html>
  <head>
    <title>Second Wind - Login</title>
    <link rel="stylesheet" href="../css/login-signup.css"/>
    <link rel="stylesheet" href="../css/style.css"/>
  </head>
  <body>
    <div class="loginParent">
      <section class="loginChild menuSolid loginContentParent textWhite" id="loginContent">
        <cardhead>
          <h3>Login</h3>
        </cardhead>
        <error class="loginContent" id="error"><?=$error?></error>
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
        <login class="loginContent">
          <button class="loginButton textWhite" id="login" onclick="login()">Login</button>
        </login>
      </section>
    </div>
  </body>
</html>