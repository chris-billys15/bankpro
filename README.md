# Bank Pro

REST<br>
TheMovieDB - getMovie: 13517050<br>
[WS-Transaksi] Membuat basis data transaksi : 13517047, 13517050, 13517062<br>
[WS-Transaksi] Fungsi Menambah Transaksi Baru: 13517047, 13517050<br>
[WS-Transaksi] Fungsi Mengubah Status "Success" atau "Cancelled" : 13517062,13517050<br>
[WS-Transaksi] Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima : 13517047, 13517062<br>
<br>
SOAP<br>
[WS-Bank] Membuat basis data bank : 13517047, 13517050, 13517062<br>
[WS-Bank] Fungsi Validasi Nomor Rek: 13517047<br>
[WS-Bank] Fungsi Memberikan data rekening seorang nasabah: 13517047<br>
[WS-Bank] Fungsi Melakukan transaksi transfer: 13517050, 13517062<br>
[WS-Bank] Fungsi membuat akun virtual untuk suatu nomor rekening: 13517062<br>
[WS-Bank] Fungsi Mengecek ada atau tidak sebuah transaksi kredit dalam suatu rentang waktu: 13517050<br>
<br>
ReactJS<br>
[Aplikasi Bank-pro] Login: 13517050<br>
[Aplikasi Bank-pro] Melakukan transfer ke rekening lain: 13517047<br>
[Aplikasi Bank-pro] Melihat Riwayat Transaksi: 13517062<br>
<br>
Perubahan Engima<br>
Halaman Transaction History: 13517062, 13517047<br>
Halaman Film Details: 13517062, 13517050<br>
Halaman Buy Ticket: 13517062, 13517047<br>
Halaman Home: 13517062, 13517050
<br>
<br>
#Pembagian Tugas DPPL
1. ci/cd scripts - 13517050
2. test react - 13517062
3. lint - 13517050
4. deployment - 13517047

#ENDPOINT<br>
http://100.26.43.243:3000/


<br>
#Deskripsi<br>
Bankpro adalah aplikasi banking berbasis web yang dapat menampung berbagai macam rekening dari berbagai macam bank di Indonesia.
fungsionalitas dari bankPro adalah :
1. Login
2. Transfer Rekening
3. Transfer Virtual Account
3. Check History
4. Menampilkan profile account

bankpro mengandalkan webservice bank berbasis soap untuk menyimpan data-data pengguna dan mencatat setiap transaksi yang ada.
