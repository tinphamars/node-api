<=> Shapes trong v8 Engine: 

  chúng ta có một object.
  const aObject = {
    x : 10,
    y: 11,
  }

  Mỗi một object này sẽ tạo ra một shapes(hình dạng) cho riêng nó. Việc làm này sẽ làm cho bộ nhớ tăng lên một cách đáng kể. |=>>> Để khắc phục vấn đề này thì engine không lưu nó chung với JSObject mà lưu nó riêng ra. Mỗi JSObject có cùng shapes(hình dạng) sẽ trỏ tới cùng một shapes. 


