export default ({ body, title, initialState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1">
        <title>Portfolio</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="sortable.css">
        <link rel="stylesheet" type="text/css" href="app/css/sortable.css">
        <link rel="stylesheet" type="text/css" href="app/css/Global.css">
        <link rel="stylesheet" type="text/css" href="Global.css">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
      </head>
      
      <body>
        <div id="app">${body}</div>
      </body>
      
      <script src="public/assets/bundle.js"></script>
    </html>
  `;
};