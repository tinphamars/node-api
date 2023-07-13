<=> InLine Caching trong v8 Engine: Là một cơ chế tối ưu quan trọng được sử dụng để cải thiện hiệu suất truy cập các thuộc tính động trong javascript.

VD:
  function getX(object) {
    return object.x;
  }
  
  * Mỗi khi hàm này được chạy thì javascript engine sẽ tạo ra một hàm ghi nhớ
  