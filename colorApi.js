$(document).ready(function () {
    const randomColor = () => {
        let color = '';
        for (let i = 0; i < 6; i++){
           const random = Math.random();
           const bit = (random * 16) | 0;
           color += (bit).toString(16);
        };
        return color;
     };
     console.log(randomColor());
    $.getJSON( "https://www.thecolorapi.com/scheme?format=json&hex="+randomColor()+"&mode=analogic", function( data ) {
        var items = [];
        $.each( data['colors'], function( key, val ) {
          console.log(key,val['hex']['value']);
          localStorage.setItem(key,val['hex']['clean']);
        });
       
        
      });
}); 