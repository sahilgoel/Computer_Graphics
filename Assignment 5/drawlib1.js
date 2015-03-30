
   function Vector3(x, y, z) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.set(x, y, z);
   }
   Vector3.prototype = {
      set : function(x, y, z) {
         if (x !== undefined) this.x = x;
         if (y !== undefined) this.y = y;
         if (z !== undefined) this.z = z;
      },
   }
   Vector3.prototype.translate = function(other) {
      var result = [];
      for(var i = 0;i<3 ; i++)
      {
         result[i] = [];
      }
      result[0] = other[0][0]*this.x + other[0][1]*this.y + other[0][2]*this.z + other[0][3];
      result[1] = other[1][0]*this.x + other[1][1]*this.y + other[1][2]*this.z + other[1][3];
      result[2] = other[2][0]*this.x + other[2][1]*this.y + other[2][2]*this.z + other[2][3];
      this.x = result[0];
      this.y = result[1];
      this.z = result[2];
   }
   Vector3.prototype.rotate = function(other) {
      var result = [];
      for(var i = 0;i<3 ; i++)
      {
         result[i] = [];
      }
      result[0] = other[0][0]*this.x + other[0][1]*this.y + other[0][2]*this.z + other[0][3];
      result[1] = other[1][0]*this.x + other[1][1]*this.y + other[1][2]*this.z + other[1][3];
      result[2] = other[2][0]*this.x + other[2][1]*this.y + other[2][2]*this.z + other[2][3];
      this.x = result[0];
      this.y = result[1];
      this.z = result[2];
   }
   Vector3.prototype.scale = function(other) {
      var result = [];
      for(var i = 0;i<3 ; i++)
      {
         result[i] = [];
      }
      result[0] = other[0][0]*this.x + other[0][1]*this.y + other[0][2]*this.z + other[0][3];
      result[1] = other[1][0]*this.x + other[1][1]*this.y + other[1][2]*this.z + other[1][3];
      result[2] = other[2][0]*this.x + other[2][1]*this.y + other[2][2]*this.z + other[2][3];
      this.x = result[0];
      this.y = result[1];
      this.z = result[2];
   }
   Vector3.prototype.fixview = function() {
      this.x = canvas.width/2 + this.x * canvas.width/2;
      this.y = canvas.height/2 - this.y * canvas.width/2;
   }

   function Matrix(m, n){
      this.m = m;
      this.n = n;
      var mat = Array.apply(null, new Array(m)).map(
        Array.prototype.valueOf,
        new Array(n)
      );
    return mat;
   }

   function identity()
   {
      var result = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
      return result;
   }

     function translate(x,y,z)
   {
      var result = [[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]];
      return result;
   }

      function rotateX(Theta)
   {
      var result = [[1,0,0,0],[0, Math.cos(Theta), -Math.sin(Theta),0],[0, Math.sin(Theta), Math.cos(Theta),0], [0,0,0,1]];
      return result;
   }

      function rotateY(Theta)
   {
      var result = [[Math.cos(Theta), 0, Math.sin(Theta),0],[0,1,0,0],[-Math.sin(Theta),0, Math.cos(Theta),0], [0,0,0,1]];
      return result;
   }

      function rotateZ(Theta)
   {
      var result = [[Math.cos(Theta), -Math.sin(Theta),0,0], [Math.sin(Theta), Math. cos(Theta), 0, 0],[0,0,1,0],[0,0,0,1]];
      return result;
   }

      function scale(x,y,z)
   {
      var result = [[x,0,0,0],[0,y,0,0],[0,0,z,0],[0,0,0,1]];
      return result;
   }

     function transform(p,m)
   {
      return [ m[0] * p[0] + m[4] * p[1] + m[ 8] * p[2] + m[12],
               m[1] * p[0] + m[5] * p[1] + m[ 9] * p[2] + m[13],
               m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]];
   }

   

   

   var startTime = (new Date()).getTime() / 1000, time = startTime;
   var canvases = [];
   function initCanvas(id) {
      var canvas = document.getElementById(id);
      canvas.setCursor = function(x, y, z) {
         var r = this.getBoundingClientRect();
	 this.cursor.set(x - r.left, y - r.top, z);
      }
      canvas.cursor = new Vector3(0, 0, 0);
      canvas.onmousedown = function(e) { this.setCursor(e.clientX, e.clientY, 1); }
      canvas.onmousemove = function(e) { this.setCursor(e.clientX, e.clientY   ); }
      canvas.onmouseup   = function(e) { this.setCursor(e.clientX, e.clientY, 0); }
      canvases.push(canvas);
      return canvas;
   }
   function tick() {
      time = (new Date()).getTime() / 1000 - startTime;
      for (var i = 0 ; i < canvases.length ; i++)
         if (canvases[i].update !== undefined) {
	    var canvas = canvases[i];
            var g = canvas.getContext('2d');
            g.clearRect(0, 0, canvas.width, canvas.height);
            canvas.update(g);
         }
      setTimeout(tick, 1000 / 60);
   }
   tick();
