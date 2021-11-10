const {
  db,
  syncAndSeed,
  models: { Album },
} = require('./db');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.redirect('/albums');
});

app.get('/albums', async (req, res, next) => {
  try {
    const albums = await Album.findAll();
    const names = albums.map((album) => album.name);

    res.send(`<html>
    <head></head>
    <body>
        <h1>Albums</h1>
        <ul>
            ${names
              .map(
                (name) => `
            <li>
                <a href="/albums/${name}">${name}</a>
            </li>`
              )
              .join('')}
        </ul>
    </body>
    </html>`);
  } catch (ex) {
    next(ex);
  }
});

app.get('/albums/:id', async (req, res, next) => {
  try {
    const albums = await Album.findAll({ where: { name: req.params.id } });
    if (albums.length === 0) {
      res.send(`<html>
      <head></head>
      <body>
          <h1>Album Not Found</h1>
          <a href="/albums">All Albums</a>
      </body>
      </html>`);
    }
    res.send(`<html>
    <head></head>
    <body>
        <h1>${req.params.id}</h1>
        <ul>
            ${albums
              .filter((album) => album.name === req.params.id)
              .map(
                (album) => `
            <li>
                Album Name: ${album.name}</li>
                <li>Artist: ${album.artist}</li>
                <li>Release Date: ${album.date}</li>
                <li>Record Label: ${album.label}</li>
                <li>Certifications: ${album.certification}</li>
                <li><a href="${album.wiki}" target="_blank">Learn More</a>
            </li>`
              )
              .join('')}
        </ul>
        <a href="/albums">All Albums</a>
    </body>
    
    
    </html>`);
  } catch (err) {
    next(err);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
