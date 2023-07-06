<=> Streams trong nodejs: là một cơ chê đọc ghi dự liệu một cách hiệu quả trong nodejs. bạn có thể cần dùng đến stream khi làm việc với dự liệu lớn mà không muốn đợi dự liệu tải hoàn toàn hoặc không muốn chiến quá nhiều bộ nhớ.

<=> when used it:
  * Readable Streams: Được sử dụng để đọc dữ liệu. Ví dụ: đọc file, nhận dữ liệu từ mạng, hoặc đọc dữ liệu từ một luồng thông tin.

  * Writable Streams: Được sử dụng để ghi dữ liệu. Ví dụ: ghi dữ liệu vào file, gửi dữ liệu đến mạng, hoặc ghi dữ liệu vào một luồng thông tin.

  * Duplex Streams: Kết hợp cả Readable và Writable Streams. Ví dụ: kết nối mạng full-duplex, nơi bạn có thể đọc và ghi dữ liệu đồng thời.

  * Transform Streams: Loại đặc biệt của Duplex Streams, nơi dữ liệu được biến đổi khi chuyển từ phần Readable sang phần Writable. Ví dụ: nén/giải nén dữ liệu, mã hóa/giải mã dữ liệu.


