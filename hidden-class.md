<=> Hidden class trong v8 Engine : là quá trình ghi nhớ lại cấu của các object, giúp truy cập các object một cách nhanh chống.
  * [Examples] : 
  const point = {
    x: 1,
    y: 2,
  }
  Trong vd trên thì v8 Engine sẽ tạo ra một hidden class ghi nhớ cấu trúc của object "point", để sau này có truy cập vào object "point" sẽ nhanh hơn bt.



