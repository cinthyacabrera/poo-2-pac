<?php
   // echo "<br>" .sha1('1234');
   // echo "<br>" .md5('1234');
  //  echo "<br>" .password_hash('1234',PASSWORD_DEFAULT);

    echo "<br>Verification: ".password_verify('1234','$2y$10$U2mYTx3e76nY9swFsSp6VOCmCJK/vVcKjKRjD2Uzgl7OrQDuDtJXi');
?>