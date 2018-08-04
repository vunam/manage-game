export default () => `<html>
  <head>
    <title>Game</title>
    <style>
      * {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        padding: 0;
        font-size: 10px;
        font-family: 'Lato', sans-serif;
      }
      h1, h2, h3, h4 {
        font-family: 'Montserrat', sans-serif;
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,700|Montserrat:300,900" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script src="/assets/bundle.js"></script>
  </body>
</html>`;
