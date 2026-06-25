const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function run() {
  let db;

  try {
    db = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3304,
      user: "root",
      password: "",
      database: "blocktrack",
    });

    console.log("✅ Connected MySQL");

    // membaca file geojson
    const filePath = path.join(__dirname, "../geojson/blok.geojson");

    const raw = fs.readFileSync(filePath, "utf8");

    const geojson = JSON.parse(raw);

    console.log(`📦 Total Feature : ${geojson.features.length}`);

    const amaCache = new Map();
    const estateCache = new Map();

    let current = 0;

    for (const feature of geojson.features) {
      current++;

      const p = feature.properties;

      //-----------------------------------
      // AMA
      //-----------------------------------

      let amaId = amaCache.get(p.AMA);

      if (!amaId) {
        const [rows] = await db.execute(
          "SELECT id FROM amas WHERE name=? LIMIT 1",
          [p.AMA],
        );

        if (rows.length > 0) {
          amaId = rows[0].id;
        } else {
          const code = p.AMA.replace(/\s+/g, "-").toUpperCase();

          const [result] = await db.execute(
            `
            INSERT INTO amas
            (code,name)
            VALUES (?,?)
            `,
            [code, p.AMA],
          );

          amaId = result.insertId;
        }

        amaCache.set(p.AMA, amaId);
      }

      //-----------------------------------
      // ESTATE
      //-----------------------------------

      const estateKey = `${amaId}_${p.ESTATE}`;

      let estateId = estateCache.get(estateKey);

      if (!estateId) {
        const [rows] = await db.execute(
          `
          SELECT id
          FROM estates
          WHERE ama_id=?
          AND name=?
          LIMIT 1
          `,
          [amaId, p.ESTATE],
        );

        if (rows.length > 0) {
          estateId = rows[0].id;
        } else {
          const [result] = await db.execute(
            `
            INSERT INTO estates
            (
                ama_id,
                code,
                name
            )
            VALUES
            (?,?,?)
            `,
            [amaId, p.BAInitial ?? "", p.ESTATE],
          );

          estateId = result.insertId;
        }

        estateCache.set(estateKey, estateId);
      }

      //-----------------------------------
      // BLOCK
      //-----------------------------------

      const geometry = JSON.stringify(feature.geometry);

      await db.execute(
        `
INSERT INTO blocks
(
    estate_id,

    block_code,
    block_name,

    status,

    division,

    planting_year,

    area_ha,

    ba_code,

    ba_initial,

    unit,

    remarks,

    geometry
)

VALUES
(
    ?,?,?,?,?,?,?,?,?,?,?,?
)

ON DUPLICATE KEY UPDATE

    status = VALUES(status),
    division = VALUES(division),
    planting_year = VALUES(planting_year),
    area_ha = VALUES(area_ha),
    ba_code = VALUES(ba_code),
    ba_initial = VALUES(ba_initial),
    unit = VALUES(unit),
    remarks = VALUES(remarks),
    geometry = VALUES(geometry)
`,
        [
          estateId,

          p.BlockCode,
          p.BLOK,

          p.STATUS,

          p.DIVISI,

          p.PYEAR,

          p.HA,

          p.BACode,

          p.BAInitial,

          p.Unit,

          p.KET,

          JSON.stringify(feature.geometry),
        ],
      );

      process.stdout.write(`\rImport ${current}/${geojson.features.length}`);
    }

    console.log("\n\n✅ Import selesai");
  } catch (err) {
    console.error(err);
  } finally {
    if (db) {
      await db.end();
    }
  }
}

run();
