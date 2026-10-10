# Library Loan API 📚

## 1. Deskripsi Umum & Tujuan Proyek
Proyek ini adalah sebuah REST API sederhana yang dibangun menggunakan **Node.js, Express.js**, dan **Supabase** (sebagai database PostgreSQL-as-a-service). Tujuan dari proyek ini adalah untuk menyediakan layanan backend pencatatan peminjaman buku perpustakaan. API ini mendukung operasi **CRUD (Create, Read, Update, Delete)** untuk data peminjaman, serta memiliki fitur **filter query** untuk melihat status peminjaman tertentu (misal: buku yang sedang dipinjam atau terlambat dikembalikan). Proyek ini juga disiapkan agar dapat di-deploy secara publik melalui **Vercel**.

---

## 2. Struktur Data / Schema
Database yang digunakan adalah Supabase dengan satu tabel utama yaitu `loans`. Berikut adalah schema untuk tabel `loans`:

| Column Name   | Data Type | Constraints               | Description                         |
|---------------|-----------|---------------------------|-------------------------------------|
| `id`          | uuid      | Primary Key, Default uuid | ID unik untuk setiap peminjaman     |
| `member_name` | text      | Not Null                  | Nama anggota yang meminjam buku     |
| `book_title`  | text      | Not Null                  | Judul buku yang dipinjam            |
| `borrow_date` | date      | Not Null                  | Tanggal buku dipinjam               |
| `return_date` | date      | Nullable                  | Tanggal buku dikembalikan           |
| `status`      | text      | Not Null                  | Status ('Dipinjam', 'Dikembalikan') |
| `created_at`  | timestamp | Default `now()`           | Waktu data dibuat                   |

**SQL untuk membuat tabel di Supabase:**
```sql
CREATE TABLE loans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  member_name TEXT NOT NULL,
  book_title TEXT NOT NULL,
  borrow_date DATE NOT NULL,
  return_date DATE,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Contoh Request dan Response

### A. Mendapatkan Semua Data Peminjaman (GET /loans)
**Request:**
```http
GET /loans
```
**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "e0b47167-a5fa-4993-9c88-299f1b272fdf",
      "member_name": "Andri",
      "book_title": "Belajar Node.js",
      "borrow_date": "2023-10-01",
      "return_date": null,
      "status": "Dipinjam",
      "created_at": "2023-10-01T10:00:00Z"
    }
  ]
}
```

### B. Filter Peminjaman Berdasarkan Status (GET /loans?status=Terlambat)
**Request:**
```http
GET /loans?status=Terlambat
```
**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "abc47167-a5fa-4993-9c88-123f1b272fdf",
      "member_name": "Budi",
      "book_title": "Pemrograman Express",
      "borrow_date": "2023-09-01",
      "return_date": null,
      "status": "Terlambat",
      "created_at": "2023-09-01T08:00:00Z"
    }
  ]
}
```

### C. Menambah Data Peminjaman (POST /loans)
**Request:**
```http
POST /loans
Content-Type: application/json

{
  "member_name": "Siti",
  "book_title": "Mastering Supabase",
  "borrow_date": "2023-10-10",
  "status": "Dipinjam"
}
```
**Response (201 Created):**
```json
{
  "message": "Loan created successfully",
  "data": {
    "id": "new-uuid-here",
    "member_name": "Siti",
    "book_title": "Mastering Supabase",
    "borrow_date": "2023-10-10",
    "return_date": null,
    "status": "Dipinjam",
    "created_at": "2023-10-10T12:00:00Z"
  }
}
```

### D. Mengubah Data Peminjaman (PUT /loans/:id)
**Request:**
```http
PUT /loans/e0b47167-a5fa-4993-9c88-299f1b272fdf
Content-Type: application/json

{
  "status": "Dikembalikan",
  "return_date": "2023-10-15"
}
```
**Response (200 OK):**
```json
{
  "message": "Loan updated successfully",
  "data": {
    "id": "e0b47167-a5fa-4993-9c88-299f1b272fdf",
    "member_name": "Andri",
    "book_title": "Belajar Node.js",
    "borrow_date": "2023-10-01",
    "return_date": "2023-10-15",
    "status": "Dikembalikan",
    "created_at": "2023-10-01T10:00:00Z"
  }
}
```

### E. Menghapus Data Peminjaman (DELETE /loans/:id)
**Request:**
```http
DELETE /loans/e0b47167-a5fa-4993-9c88-299f1b272fdf
```
**Response (200 OK):**
```json
{
  "message": "Loan deleted successfully",
  "data": {
    "id": "e0b47167-a5fa-4993-9c88-299f1b272fdf"
  }
}
```

---

## 4. Panduan Instalasi & Cara Menjalankan Lokal

1. **Clone Repository ini:**
   ```bash
   git clone https://github.com/username/ResponsiMod1_Andri.git
   cd ResponsiMod1_Andri
   ```

2. **Install Dependencies:**
   Pastikan Node.js sudah terinstal, lalu jalankan:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   - Copy file `.env.example` menjadi `.env`:
     ```bash
     cp .env.example .env
     ```
   - Isi kredensial Supabase Anda di dalam file `.env`:
     ```env
     SUPABASE_URL=https://xyz.supabase.co
     SUPABASE_KEY=ey...
     PORT=3000
     ```

4. **Jalankan Server:**
   ```bash
   npm start
   ```
   API akan berjalan di `http://localhost:3000`.

---

## 5. Link Hasil Deployment Vercel

🌐 **Base URL Deployment:**  
[https://responsi-mod1-andri.vercel.app](https://responsi-mod1-andri.vercel.app) *(Ganti URL ini dengan link asli setelah deploy di Vercel)*

**Endpoint untuk diuji:**
- `GET https://[url-vercel]/loans`
- `GET https://[url-vercel]/loans?status=Terlambat`
- `POST https://[url-vercel]/loans`
