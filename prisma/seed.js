import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan titik koordinat acak di dalam radius lingkaran
function getRandomLocationWithinRadius(centerLat, centerLon, radiusInMeters) {
  const radiusInDegrees = radiusInMeters / 111320;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const deltaLat = w * Math.sin(t);
  const deltaLon = (w * Math.cos(t)) / Math.cos((centerLat * Math.PI) / 180);

  return {
    latitude: centerLat + deltaLat,
    longitude: centerLon + deltaLon,
  };
}

async function main() {
  console.log('Memulai proses seeding data laporan kriminal...');

  // 1. Buat Dummy User untuk Relasi Report
  const dummyUser = await prisma.user.upsert({
    where: { email: 'admin@tanjungbalai.go.id' },
    update: {},
    create: {
      email: 'admin@tanjungbalai.go.id',
      name: 'Admin Polsek',
      password: 'hashedpassword123',
      role: 'ADMIN',
    },
  });

  // 2. Buat Data Tipe Kriminal (Type) sesuai permintaan
  const crimeTypesData = [
    { name: 'Pencurian', level: 'LOW' },
    { name: 'Tindak Kekerasan', level: 'MEDIUM' },
    { name: 'Pemerkosaan', level: 'HIGH' },
    { name: 'Pembunuhan', level: 'CRITICAL' },
  ];

  await prisma.type.createMany({
    data: crimeTypesData,
    skipDuplicates: true,
  });

  const types = await prisma.type.findMany();

  // Pisahkan ID kategori umum dan kategori ekstrim
  const typePencurian = types.find(t => t.name === 'Pencurian').id;
  const typeKekerasan = types.find(t => t.name === 'Tindak Kekerasan').id;
  const typePemerkosaan = types.find(t => t.name === 'Pemerkosaan').id;
  const typePembunuhan = types.find(t => t.name === 'Pembunuhan').id;

  const commonTypes = [typePencurian, typeKekerasan];

  // 3. Ambil data Kecamatan dari Database
  const subdistricts = await prisma.subdistrict.findMany();
  if (subdistricts.length === 0) {
    throw new Error('Data kecamatan kosong! Harap jalankan seeder kecamatan terlebih dahulu.');
  }

  // 4. Mapping Jumlah Data Kriminal per Kecamatan
  const reportCounts = {
    'Sei Tualang Raso': 154,
    'Teluk Nibung': 105,
    'Tanjungbalai Utara': 211,
    'Datuk Bandar': 77,
    'Tanjungbalai Selatan': 132,
    'Datuk Bandar Timur': 110,
  };

  const reportsToInsert = [];

  // 5. Generate Data Report (Hanya dengan Pencurian & Kekerasan Terlebih Dahulu)
  for (const sub of subdistricts) {
    const targetCount = reportCounts[sub.name];
    if (!targetCount) continue;

    for (let i = 0; i < targetCount; i++) {
      const randomLocation = getRandomLocationWithinRadius(sub.latitude, sub.longitude, sub.radius);

      // Pilih jenis kriminal secara acak dari yang UMUM (Pencurian atau Tindak Kekerasan)
      const randomType = commonTypes[Math.floor(Math.random() * commonTypes.length)];

      reportsToInsert.push({
        userId: dummyUser.id,
        typeId: randomType,
        subdistrictId: sub.id,
        latitude: randomLocation.latitude,
        longitude: randomLocation.longitude,
        status: Math.random() > 0.5,
      });
    }
  }

  // 6. Suntikkan 1-2 Kasus Pembunuhan secara acak ke dalam array yang sudah dibuat
  const jumlahPembunuhan = Math.floor(Math.random() * 2) + 1; // Hasilkan angka 1 atau 2
  for (let i = 0; i < jumlahPembunuhan; i++) {
    const randomIndex = Math.floor(Math.random() * reportsToInsert.length);
    reportsToInsert[randomIndex].typeId = typePembunuhan;
  }

  // 7. Suntikkan 1-2 Kasus Pemerkosaan secara acak ke dalam array yang sudah dibuat
  const jumlahPemerkosaan = Math.floor(Math.random() * 2) + 1; // Hasilkan angka 1 atau 2
  for (let i = 0; i < jumlahPemerkosaan; i++) {
    // Cari index random, pastikan tidak menimpa data pembunuhan yang baru disuntikkan
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * reportsToInsert.length);
    } while (reportsToInsert[randomIndex].typeId === typePembunuhan);

    reportsToInsert[randomIndex].typeId = typePemerkosaan;
  }

  // 8. Masukkan semua data report ke database
  console.log(`Menyiapkan total ${reportsToInsert.length} data...`);
  console.log(`- Kasus Pembunuhan yang digenerate: ${jumlahPembunuhan}`);
  console.log(`- Kasus Pemerkosaan yang digenerate: ${jumlahPemerkosaan}`);

  const result = await prisma.report.createMany({
    data: reportsToInsert,
  });

  console.log(`✅ Berhasil menyisipkan ${result.count} data laporan kriminal!`);
}

main()
  .catch((e) => {
    console.error('Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });