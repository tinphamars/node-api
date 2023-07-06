<=> EventEmitter trong nodejs: là một lớp(class) trong nodejs, được sử dụng để giữ và lắng nghe(listen) các sự kiện trong môi trường nodejs. EventEmitter cho phép các thành phần các nhau có thể giao tiếp trao đổi dự liệu với nhau thông qua việc phát ra các (emit) và lắng nghe(listen) các sự kiện.

  * on(event, listener): Đăng ký một hàm lắng nghe (listener) cho sự kiện cụ thể.
  * emit(event, [args]): Phát ra một sự kiện cụ thể với các đối số tùy chọn.
  * once(event, listener): Đăng ký một hàm lắng nghe chỉ được gọi một lần cho sự kiện cụ thể.
  * removeListener(event, listener): Xóa một hàm lắng nghe đã được đăng ký cho sự kiện cụ thể.
  * removeAllListeners([event]): Xóa tất cả hoặc tất cả các hàm lắng nghe đã được đăng ký cho sự kiện cụ thể.

