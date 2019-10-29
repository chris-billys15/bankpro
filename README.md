# Bank Pro

Tugas 2
IF3110 Pengembangan Aplikasi Berbasis Web
2019/2020
Deskripsi Singkat
Setelah aplikasi web Engima diluncurkan, bioskop Engi menjadi sangat laku. Sebelumnya, Engi mengurus semua transaksi tiket film dan penambahan data film secara manual. Karena kewalahan, akhirnya Engi pergi ke seorang konsultan IT untuk menemukan solusi dari permasalahannya. Konsultan menyarankan Engi untuk menggunakan web service untuk mempermudah pekerjaannya. Melihat aplikasi web yang Anda kerjakan memuaskan, Engi meminta Anda untuk mengimplementasikan perubahan tersebut beserta web service dan aplikasi Bank yang digunakan untuk transaksi tiket film di Engima.

Hal-hal detil yang disebutkan pada spesifikasi di bawah seperti data yang disimpan di basis data dan jenis layanan yang disediakan adalah spesifikasi minimum yang harus dipenuhi. Anda boleh menambahkan data atau layanan lain yang menurut Anda dibutuhkan oleh aplikasi atau web service. Jika Anda ingin mengubah data dan layanan yang disebutkan di bawah, Anda wajib mempertanggung jawabkannya dan memiliki argumen yang mendukung keputusan tersebut.
Spesifikasi Tugas

Aplikasi Bank Pro
Anda diminta untuk mengembangkan aplikasi web bank sederhana menggunakan ReactJS. Pada aplikasi ini, pengguna dapat melakukan transaksi di Bank Pro. Pengguna yang dapat menggunakan aplikasi adalah nasabah Bank Pro. Berikut adalah hal yang dapat dilakukan oleh pengguna pada aplikasi Bank Pro.

Login
Nasabah login dengan memasukkan bank nomor rekening. Jika nasabah berhasil masuk, akan muncul halaman utama yang menampilkan nama pemilik, nomor rekening, nama bank, dan saldo terakhir. Pada menu utama, pengguna juga dapat memilih untuk transfer ke rekening lain dan melihat riwayat transaksi.

Melakukan Transfer
Pengguna dapat mentransfer uang ke rekening lain di Bank Pro. Tidak ada potongan tambahan ketika mentransfer ke rekening bank lain. Saat transaksi selesai, ada pesan berhasil atau gagal yang muncul.

Melihat Riwayat Transaksi
Pada riwayat transaksi, pengguna dapat melihat daftar data berikut: waktu transaksi, jenis transaksi (debit/kredit), jumlah transaksi, dan rekening terkait (jika ada).
Tampilan aplikasi Bank diserahkan kepada Anda selama ketiga fungsi di atas terpenuhi. Gunakan create-react-app untuk membuat aplikasi single-page ReactJS.
Web Service Bank
Anda diminta untuk mengimplementasikan web service Bank di atas java servlet menggunakan JAX-WS dengan protokol SOAP. Web service ini digunakan untuk Aplikasi Bank Pro dan Engima.

Web service Bank memiliki basis data terpisah dari basis data Engima yang terdiri dari data nasabah dan transaksi rekening setiap bank (lihat daftar bank di Aplikasi Bank). Informasi rekening yang disimpan adalah nama pemilik, nomor rekening, dan nomor akun virtual (jika ada). Nomor akun virtual untuk satu rekening bisa lebih dari satu. Informasi transaksi yang disimpan adalah id nasabah, jenis transaksi (debit/kredit), jumlah transaksi, nomor yang terkait (rekening atau akun virtual, jika ada), dan waktu transaksi.

Layanan yang disediakan oleh web service ini adalah:
Validasi nomor rekening. Jika nomor rekening terdaftar di basis data, maka nomor tersebut valid.
Memberikan data rekening seorang nasabah. Data pengguna meliputi nama pengguna, nomor kartu, saldo terakhir, dan riwayat transaksi (debit dan kredit).
Melakukan transaksi transfer dengan input nomor rekening pengirim, nomor rekening/akun virtual penerima, dan jumlah uang yang ditransfer. Layanan mengembalikan status transfer (berhasil/gagal). Transfer berhasil jika:
Nomor rekening atau akun virtual tujuan valid
Saldo rekening mencukupi untuk transaksi
Jika transfer berhasil, akan dicatat transaksi debit pada rekening pengirim dan transaksi kredit pada rekening penerima.
Membuat akun virtual untuk suatu nomor rekening. Layanan mengembalikan nomor unik akun virtual tersebut.
Mengecek ada atau tidak sebuah transaksi kredit dalam suatu rentang waktu. Input yang diterima adalah nomor rekening atau akun virtual tujuan, jumlah nominal yang diharapkan, dan jangka waktu (dalam menit) rentang waktu (start datetime, end datetime).
Web Service Transaksi
Anda diminta untuk membuat web service Transaksi yang dibangun di atas Node.js dan mengimplementasikan protokol REST. Web service ini bertanggung jawab untuk semua transaksi tiket film Engima.

Web service Transaksi memiliki basis data tersendiri yang memiliki informasi transaksi tiket film setiap pengguna Engima. Informasi transaksi adalah id pengguna, nomor akun virtual tujuan, id film, jadwal film, kursi yang dipesan, waktu pembuatan transaksi, dan status transaksi.

Ada tiga status pembayaran sebuah transaksi tiket film sebagai berikut.
Pending: tiket belum dibayar namun belum lewat dari masa berlaku transaksi.
Cancelled: tiket belum dibayar dan sudah lewat dari masa berlaku transaksi. Status kursi yang dipesan pada transaksi dengan status cancelled menjadi tersedia kembali.
Success: tiket sudah dibayar sebelum masa berlaku transaksi.
Berikut layanan yang disediakan oleh web service ini:
Menambah transaksi baru dengan status “Pending”. Input yang diberikan adalah id pengguna, id film, kursi yang dipilih, dan nomor akun virtual yang menjadi tujuan pembayaran. Layanan mengembalikan id transaksi.
Mengubah status suatu transaksi menjadi status “Success” atau “Cancelled”. Input yang diberikan adalah id transaksi.
Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima.
TheMovieDB
Aplikasi Engima akan menggunakan API dari The Movie Database (https://www.themoviedb.org/) untuk mengambil data film. Data yang diambil dari API tersebut adalah gambar poster, nama film, summary, tanggal rilis, rating, dan durasi film.

Anda dapat melihat dokumentasi API TheMovieDB pada tautan berikut:
https://developers.themoviedb.org/3/getting-started/introduction
Perubahan pada Aplikasi Engima
Karena pemanfaatan web service Transaksi dan TheMovieDB, berikut perubahan pada aplikasi Engima.

Pengambilan data film diambil dari API TheMovieDB. Basis data Engima tidak menyimpan data film yang sudah didapatkan dari API tersebut.
Pada halaman Home, film yang ditampilkan adalah film yang memiliki tanggal rilis tidak lebih dari 7 hari dari hari ini.
Pada halaman Film Details, akan ada dua jenis rating. Satu rating dari ulasan pengguna, satu lagi dari critics (rating dari TheMovieDB).
Pada halaman Buy Ticket, jika pengguna membeli tiket, akan muncul id transaksi dan nomor akun virtual unik untuk pembayaran tiket. Gunakan popup yang sebelumnya menampilkan status transaksi sukses/gagal.
Pada halaman Transaction History, ditampilkan id dan status pembayaran setiap transaksi tiket film. Masa berlaku suatu transaksi adalah 2 menit. Status pembayaran diperbaharui jika halaman diperbaharui (refresh). Transaksi yang sudah memiliki status “Cancelled” tidak dapat dilunaskan lagi sehingga pembayaran terhadap nomor akun virtual terkait setelah masa berlaku pembayaran tidak lagi diperhitungkan.
Transaksi tiket film pada halaman Transaction History didapat dari basis data Transaksi. Basis data Engima tidak menyimpan data transaksi pembelian tiket.
Skenario Aplikasi Engima
Berikut skenario pembelian tiket di aplikasi Engima.
Pengguna memesan tiket untuk suatu film dengan tombol “Buy Ticket”.
Aplikasi Engima memanggil web service Bank untuk membuat akun virtual baru untuk transaksi ini. Web service mengirimkan nomor akun virtual sebagai balasannya.
Setelah mendapat nomor akun virtual, aplikasi Engima memanggil web service Transaksi untuk menambahkan transaksi baru ini. Web service Transaksi mengirimkan id transaksi sebagai balasannya.
Setelah mendapatkan nomor akun virtual dan id transaksi, aplikasi Engima menampilkan kedua data tersebut sebagai popup. Pengguna pergi ke halaman Transaction History menggunakan tombol “Go to transaction history”.
Saat membuka halaman Transaction History, aplikasi Engima memanggil web service Transaksi untuk mengambil data transaksi pengguna yang sedang login. 
Untuk setiap transaksi yang masih memiliki status pembayaran “Pending”, aplikasi Engima melakukan hal berikut:
Jika belum lewat 2 menit dari waktu pembuatan transaksi, aplikasi Engima memanggil web service Bank yang mengecek apakah tiket tersebut sudah dibayar atau tidak. Jika sudah ada transaksi di Bank, aplikasi Engima memanggil web service Transaksi untuk mengubah status pembayaran tersebut menjadi “Success”.
Jika sudah lewat 2 menit dari waktu pembuatan transaksi, aplikasi Engima memanggil web service Transaksi untuk mengubah status pembayaran tersebut menjadi “Cancelled”.
Setelah semua status sudah diperbaharui (jika ada), maka halaman Transaction History baru ditampilkan.
Skenario Aplikasi Bank Pro
Berikut skenario penggunaan aplikasi Bank Pro.
Pengguna memasukan nomor rekening pada halaman Login. Aplikasi Bank Pro memanggil web service Bank untuk validasi nomor rekening.
Setelah berhasil login, pengguna dapat memilih untuk melakukan transfer. Pengguna memasukkan nomor rekening tujuan dan jumlah nominal yang ditransfer.
Setelah pengguna memilih untuk transfer, aplikasi Bank Pro memanggil web service Bank untuk melakukan transfer tersebut.
Jika transfer berhasil, aplikasi Bank Pro menampilkan pesan berhasil. Sebaliknya, jika transfer gagal, aplikasi Bank Pro menampilkan pesan eror.
Pengguna kemudian dapat mengecek riwayat transaksi. Aplikasi Bank Pro memanggil web service Bank untuk mengambil data riwayat transaksi tersebut.
Catatan
Waktu transaksi yang digunakan adalah waktu lokal.
Bonus
Catatan: kerjakan dulu spesifikasi wajib sebelum mengerjakan bonus.

Login via Google
Aplikasi Engima memiliki pilihan untuk login menggunakan akun Google, seperti yang sering ditemui pada aplikasi web atau permainan. Informasi yang ditampilkan untuk pengguna yang login dengan akun Google diambil dari informasi akun Google tersebut.


Status Pembayaran Real-time
Pada halaman Transaction History, status pembayaran yang ditunjukkan adalah yang paling baru (tanpa refresh halaman). Sebelum pemesanan telah dibayarkan atau tidak berlaku (cancelled), akan ditunjukkan waktu countdown sebelum pemesanan tersebut tidak berlaku.

Autentikasi Web Service Bank
Web service Bank hanya menerima request jika menerima juga token yang telah terdaftar pada basis data. Token yang dibangkitkan oleh web service Bank adalah random string dan unik.

REST
TheMovieDB - getMovie: 13517050
[WS-Transaksi] Membuat basis data transaksi : 13517047, 13517050, 13517062
[WS-Transaksi] Fungsi Menambah Transaksi Baru: 13517047, 13517050
[WS-Transaksi] Fungsi Mengubah Status "Success" atau "Cancelled" : 13517062,13517050
[WS-Transaksi] Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima : 13517047, 13517062

SOAP
[WS-Bank] Membuat basis data bank : 13517047, 13517050, 13517062
[WS-Bank] Fungsi Validasi Nomor Rek: 13517047
[WS-Bank] Fungsi Memberikan data rekening seorang nasabah: 13517047
[WS-Bank] Fungsi Melakukan transaksi transfer: 13517050, 13517062
[WS-Bank] Fungsi membuat akun virtual untuk suatu nomor rekening: 13517062
[WS-Bank] Fungsi Mengecek ada atau tidak sebuah transaksi kredit dalam suatu rentang waktu: 13517050

ReactJS
[Aplikasi Bank-pro] Login: 13517050
[Aplikasi Bank-pro] Melakukan transfer ke rekening lain: 13517047
[Aplikasi Bank-pro] Melihat Riwayat Transaksi: 13517062

Perubahan Engima
Halaman Transaction History: 13517062, 13517047
Halaman Film Details: 13517062, 13517050
Halaman Buy Ticket: 13517062, 13517047
Halaman Home: 13517062, 13517050


About
Asisten IF3110
Shevalda | Fahmi | Teresa | Yonas | Gery | Alif

