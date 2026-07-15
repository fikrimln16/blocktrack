import { PoolConnection, ResultSetHeader } from "mysql2/promise";

export interface CreateVisitPayload {
  user_id: number;
  block_id: number;

  visit_date: string;
  visit_time: string;

  weather: string;
  duration: number;

  latitude: number;
  longitude: number;
  accuracy?: number | null;

  planting_type: "TM" | "TBM";

  // ===== TM =====
  produksi?: number | null;
  kuantitas_sisipan_3_5_tahun?: number | null;
  ganoderma?: number | null;
  pasar_panen?: number | null;
  tunas_pokok?: number | null;
  nomor_dan_kebersihan_tph?: number | null;
  titi_panen?: number | null;
  pencurian?: number | null;

  // ===== TBM =====
  kuantitas_sisipan?: number | null;
  pasar_rintis?: number | null;
  tph?: number | null;
  sanitasi_kastrasi?: number | null;
  perawatan_kacangan?: number | null;
  titi_rintis?: number | null;

  // ===== Dipakai TM & TBM =====
  populasi_pokok?: number | null;
  rayap?: number | null;
  hama_oryctes?: number | null;
  tikus_babi_other_pest?: number | null;
  ulat_pemakan_daun?: number | null;
  beneficial_weed?: number | null;

  piringan?: number | null;
  gawangan_mineral_gambut?: number | null;

  jalan?: number | null;
  jembatan?: number | null;

  kondisi_drainase_blok?: number | null;
  parit?: number | null;
  sumur_pantau?: number | null;

  pemupukan?: number | null;

  notes: string;
}

interface AmaRow extends RowDataPacket {
  ama_code: string;
}

export async function createVisit(
  connection: PoolConnection,
  visit: CreateVisitPayload,
): Promise<number> {
  // ===========================
  // Ambil kode AMA
  // ===========================

  const [amaRows] = await connection.query<AmaRow[]>(
    `
    SELECT
      a.code AS ama_code
    FROM blocks b

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    WHERE b.id = ?

    LIMIT 1
    `,
    [visit.block_id],
  );

  if (amaRows.length === 0) {
    throw new Error("AMA not found.");
  }

  const amaCode = amaRows[0].ama_code.toUpperCase();

  // ===========================
  // Insert Visit
  // ===========================

  const [result] = await connection.execute<ResultSetHeader>(
    `
  INSERT INTO visits
  (
    user_id,
    block_id,

    visit_date,
    visit_time,

    weather,
    duration,
    status,

    latitude,
    longitude,
    accuracy,

    planting_type,

    produksi,
    populasi_pokok,
    kuantitas_sisipan,
    kuantitas_sisipan_3_5_tahun,
    ganoderma,
    rayap,
    hama_oryctes,
    tikus_babi_other_pest,
    ulat_pemakan_daun,
    beneficial_weed,

    piringan,
    pasar_panen,
    pasar_rintis,
    tunas_pokok,
    gawangan_mineral_gambut,
    tph,
    sanitasi_kastrasi,
    perawatan_kacangan,
    nomor_dan_kebersihan_tph,

    jalan,
    jembatan,
    titi_panen,
    titi_rintis,

    kondisi_drainase_blok,
    parit,
    sumur_pantau,

    pencurian,
    pemupukan,

    notes
  )
  VALUES
  (
    ?, ?, ?, ?, ?, ?, ?,

    ?, ?, ?,

    ?,

    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,

    ?, ?, ?, ?, ?, ?, ?, ?, ?,

    ?, ?, ?, ?,

    ?, ?, ?,

    ?, ?,

    ?
  )
  `,
    [
      visit.user_id,
      visit.block_id,

      visit.visit_date,
      visit.visit_time,

      visit.weather,
      visit.duration,

      "Done",

      visit.latitude,
      visit.longitude,
      visit.accuracy ?? null,

      visit.planting_type,

      // TM
      visit.produksi ?? null,
      visit.populasi_pokok ?? null,
      visit.kuantitas_sisipan ?? null,
      visit.kuantitas_sisipan_3_5_tahun ?? null,
      visit.ganoderma ?? null,
      visit.rayap ?? null,
      visit.hama_oryctes ?? null,
      visit.tikus_babi_other_pest ?? null,
      visit.ulat_pemakan_daun ?? null,
      visit.beneficial_weed ?? null,

      // Kondisi Kebun
      visit.piringan ?? null,
      visit.pasar_panen ?? null,
      visit.pasar_rintis ?? null,
      visit.tunas_pokok ?? null,
      visit.gawangan_mineral_gambut ?? null,
      visit.tph ?? null,
      visit.sanitasi_kastrasi ?? null,
      visit.perawatan_kacangan ?? null,
      visit.nomor_dan_kebersihan_tph ?? null,

      // Infrastruktur
      visit.jalan ?? null,
      visit.jembatan ?? null,
      visit.titi_panen ?? null,
      visit.titi_rintis ?? null,

      // Drainase
      visit.kondisi_drainase_blok ?? null,
      visit.parit ?? null,
      visit.sumur_pantau ?? null,

      // Management
      visit.pencurian ?? null,
      visit.pemupukan ?? null,

      visit.notes,
    ],
  );

  const visitId = result.insertId;

  // ===========================
  // Generate Visit Code
  // ===========================

  const date = new Date(visit.visit_date);

  const yy = String(date.getFullYear()).slice(-2);

  const mm = String(date.getMonth() + 1).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");

  const dateCode = `${yy}${mm}${dd}`;

  const uniqueId = String(visitId).padStart(2, "0");

  const visitCode = `VIS-${dateCode}-${amaCode}-${uniqueId}`;

  // ===========================
  // Update Visit Code
  // ===========================

  await connection.execute(
    `
    UPDATE visits
    SET visit_code = ?
    WHERE id = ?
    `,
    [visitCode, visitId],
  );

  return visitId;
}

export async function createVisitPhoto(
  connection: PoolConnection,
  visitId: number,
  photoUrl: string,
): Promise<void> {
  await connection.execute(
    `
    INSERT INTO visit_photos
    (
      visit_id,
      photo_url
    )
    VALUES
    (?, ?)
    `,
    [visitId, photoUrl],
  );
}

import fs from "fs/promises";
import path from "path";

import { RowDataPacket } from "mysql2/promise";

interface VisitPhotoRow extends RowDataPacket {
  photo_url: string;
}

interface VisitAttachmentRow extends RowDataPacket {
  file_url: string;
}

export async function deleteVisit(
  connection: PoolConnection,
  visitId: number,
): Promise<void> {
  const [photos] = await connection.execute<VisitPhotoRow[]>(
    `
    SELECT
      photo_url
    FROM visit_photos
    WHERE visit_id = ?
    `,
    [visitId],
  );

  const [attachments] = await connection.execute<VisitAttachmentRow[]>(
    `
    SELECT
      file_url
    FROM visit_attachments
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visit_photos
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visit_attachments
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visits
    WHERE id = ?
    `,
    [visitId],
  );

  // Hapus file fisik (dipanggil setelah data database dihapus)
  await Promise.allSettled(
    photos.map((photo) =>
      fs.unlink(
        path.join(process.cwd(), "storage/uploads/photos", photo.photo_url),
      ),
    ),
  );

  await Promise.allSettled(
    attachments.map((attachment) =>
      fs.unlink(
        path.join(
          process.cwd(),
          "storage/uploads/attachments",
          attachment.file_url,
        ),
      ),
    ),
  );
}
export interface UpdateVisitInspectionPayload {
  planting_type: "TM" | "TBM";

  // Kondisi Tanaman
  produksi?: number | null;
  populasi_pokok?: number | null;
  kuantitas_sisipan?: number | null;
  kuantitas_sisipan_3_5_tahun?: number | null;
  ganoderma?: number | null;
  rayap?: number | null;
  hama_oryctes?: number | null;
  tikus_babi_other_pest?: number | null;
  ulat_pemakan_daun?: number | null;
  beneficial_weed?: number | null;

  // Kondisi Kebun
  piringan?: number | null;
  pasar_panen?: number | null;
  pasar_rintis?: number | null;
  tunas_pokok?: number | null;
  gawangan_mineral_gambut?: number | null;
  tph?: number | null;
  sanitasi_kastrasi?: number | null;
  perawatan_kacangan?: number | null;
  nomor_dan_kebersihan_tph?: number | null;

  // Infrastruktur
  jalan?: number | null;
  jembatan?: number | null;
  titi_panen?: number | null;
  titi_rintis?: number | null;

  // Drainase
  kondisi_drainase_blok?: number | null;
  parit?: number | null;
  sumur_pantau?: number | null;

  // Manajemen
  pencurian?: number | null;
  pemupukan?: number | null;
}

export async function updateVisitInspection(
  connection: PoolConnection,
  visitId: number,
  payload: UpdateVisitInspectionPayload,
): Promise<void> {
  await connection.execute<ResultSetHeader>(
    `
    UPDATE visits
    SET
      planting_type = ?,

      produksi = ?,
      populasi_pokok = ?,
      kuantitas_sisipan = ?,
      kuantitas_sisipan_3_5_tahun = ?,
      ganoderma = ?,
      rayap = ?,
      hama_oryctes = ?,
      tikus_babi_other_pest = ?,
      ulat_pemakan_daun = ?,
      beneficial_weed = ?,

      piringan = ?,
      pasar_panen = ?,
      pasar_rintis = ?,
      tunas_pokok = ?,
      gawangan_mineral_gambut = ?,
      tph = ?,
      sanitasi_kastrasi = ?,
      perawatan_kacangan = ?,
      nomor_dan_kebersihan_tph = ?,

      jalan = ?,
      jembatan = ?,
      titi_panen = ?,
      titi_rintis = ?,

      kondisi_drainase_blok = ?,
      parit = ?,
      sumur_pantau = ?,

      pencurian = ?,
      pemupukan = ?

    WHERE id = ?
    `,
    [
      payload.planting_type,

      payload.produksi ?? null,
      payload.populasi_pokok ?? null,
      payload.kuantitas_sisipan ?? null,
      payload.kuantitas_sisipan_3_5_tahun ?? null,
      payload.ganoderma ?? null,
      payload.rayap ?? null,
      payload.hama_oryctes ?? null,
      payload.tikus_babi_other_pest ?? null,
      payload.ulat_pemakan_daun ?? null,
      payload.beneficial_weed ?? null,

      payload.piringan ?? null,
      payload.pasar_panen ?? null,
      payload.pasar_rintis ?? null,
      payload.tunas_pokok ?? null,
      payload.gawangan_mineral_gambut ?? null,
      payload.tph ?? null,
      payload.sanitasi_kastrasi ?? null,
      payload.perawatan_kacangan ?? null,
      payload.nomor_dan_kebersihan_tph ?? null,

      payload.jalan ?? null,
      payload.jembatan ?? null,
      payload.titi_panen ?? null,
      payload.titi_rintis ?? null,

      payload.kondisi_drainase_blok ?? null,
      payload.parit ?? null,
      payload.sumur_pantau ?? null,

      payload.pencurian ?? null,
      payload.pemupukan ?? null,

      visitId,
    ],
  );
}
