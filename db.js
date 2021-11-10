const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/kdot_db'
);

const Album = conn.define('album', {
  name: {
    type: STRING,
    allowNull: false,
  },
  artist: {
    type: STRING,
    allowNull: false,
  },
  date: {
    type: STRING,
    allowNull: false,
  },
  label: {
    type: STRING,
    allowNull: false,
  },
  certification: {
    type: STRING,
    allowNull: false,
  },
  wiki: {
    type: STRING,
    allowNull: false,
  },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all(
    data.map((album) =>
      Album.create({
        name: album.name,
        artist: album.artist,
        date: album.date,
        label: album.label,
        certification: album.certification,
        wiki: album.wiki,
      })
    )
  );
};

const init = async () => {
  try {
    await syncAndSeed();
    console.log('Data Seeded');
    console.log(await Album.findAll());
  } catch (ex) {
    console.log(ex);
  }
};

const data = [
  {
    id: 1,
    name: 'Section.80',
    artist: 'Kendrick Lamar',
    date: 'July 2, 2011',
    label: 'Top Dawg',
    certification: 'RIAA: Gold',
    wiki: 'https://en.wikipedia.org/wiki/Section.80',
  },
  {
    id: 2,
    name: 'Good Kid, M.A.A.D City',
    artist: 'Kendrick Lamar',
    date: 'October 22, 2012',
    label: 'Top Dawg',
    certification: 'RIAA: 3x Platinum',
    wiki: 'https://en.wikipedia.org/wiki/Good_Kid,_M.A.A.D_City',
  },
  {
    id: 3,
    name: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    date: 'March 16, 2015',
    label: 'Top Dawg',
    certification: 'RIAA: Platinum',
    wiki: 'https://en.wikipedia.org/wiki/To_Pimp_a_Butterfly',
  },
  {
    id: 4,
    name: 'Damn',
    artist: 'Kendrick Lamar',
    date: 'April 14, 2017',
    label: 'Top Dawg',
    certification: 'RIAA: 3x Platinum',
    wiki: 'https://en.wikipedia.org/wiki/Damn_(Kendrick_Lamar_album)',
  },
];

module.exports = { syncAndSeed, models: { Album } };
