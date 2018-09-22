module.exports = function solveSudoku(matrix) {
  var A = matrix[0].length;
  var B = matrix.length;
  var a = Math.sqrt(A);
  var b = Math.sqrt(B);
  var R = [];
  var L = [];
  var Q = [];
  var itIsNotFull = true;
  var list = [1,2,3,4,5,6,7,8,9];
  var num = 0;
  var slv = 0;
  var init = true;
  var solvList = [];
  
  
  // нахождение однозначных решений
  while (itIsNotFull) {
    num = slv;
    itIsNotFull = false;
    for (var x = 0; x<A; x++) {
      for (var y = 0; y<B; y++) {
        if (matrix[x][y]===0) {
          itIsNotFull = true;
          var zList = [[],[],[]];
            //проверяем столбец
            R = list.slice();
            for (var i=0;i<A;i++){ 
              if (matrix[x][i]=== 0 && i!=y) {
                zList[0].push([x,i]);
                continue;
              }
              for (var j=0;j<R.length;j++) {
                if (matrix[x][i]===R[j]) {
                  R.splice(j,1);
                  j--;
                }
              }
            }

            //проверяем строку
            L = list.slice();
            for (var i=0;i<B;i++){ 
              if (matrix[i][y]=== 0 && i!=x) {
                zList[1].push([i,y]);
                continue;
              }
              for (var j=0;j<L.length;j++) {
                if (matrix[i][y]===L[j]) {
                  L.splice(j,1);
                  j--;
                }    
              } 
            }
            
            //проверяем квадрат
            Q = list.slice();
            var x0 = rectNum(x);
            var y0 = rectNum(y);
            for (var x1 = x0; x1<x0+3;x1++){
              for (var y1 = y0; y1<y0+3;y1++){
                if (matrix[x1][y1]=== 0 && !(x1===x && y1===y)) {
                zList[2].push([x1,y1]);
                continue;
              }
                for (var j=0;j<Q.length;j++) {
                  if (matrix[x1][y1]===Q[j]) {
                    Q.splice(j,1);
                    j--;
                  }
                }
              }
            }
            //проверка
            for (var i = 0; i<R.length; i++) {
              var t = true;
                for (var j = 0; j<L.length; j++) {
                  if (R[i] === L[j]) {
                    t = false;
                  }
                }
              if (t) {
                R.splice(i,1);
                i--;
              }  
            }

            for (var i = 0; i<R.length; i++) {
              var t = true;
                for (var j = 0; j<Q.length; j++) {
                  if (R[i] === Q[j]) {
                    t = false;
                  }
                }
              if (t) {
                R.splice(i,1);
                i--;
              }  
            }


            if (R.length == 1) {
            matrix[x][y]=R[0];
            slv++;
            } else {
                for (var i=0;i<R.length;i++){
                  for (var j=0;j<3;j++) {
                    var n = zList[j].length;
                      for (var k=0;k<zList[j].length;k++) {
                        if (!trySth(zList[j][k][0],zList[j][k][1],R[i],matrix)) n--;
                      }
                    if (n === 0) {
                      matrix[x][y]=R[i];
                      slv++;
                    }
                  }
                }
              }
            if (!init)  {
              if (R.length===0) return false;
              if (R.length>2) continue;
              solvList.push([x,y]);
              solvList[solvList.length-1] = solvList[solvList.length-1].concat(R);
            }
        }
      }
    }
    if (!init) break;

    if (num === slv && itIsNotFull == true) {
      init = false;
    }
}
  //

  //// подготовка к рекурсии, сортировка массива возможных значений в порядке убывания их колличества
  solvList.sort(sortsolv);
  ////
  for (var i=0;i<solvList.length;i++) {
    for (var j=2;j<solvList[i].length;j++) {
      var matrixTest = JSON.parse(JSON.stringify(matrix));
      matrixTest[solvList[i][0]][solvList[i][1]] = solvList[i][j];
      if (matrixTest = solveSudoku(matrixTest)) {
        if(matrixSum (matrixTest) == (A*B*5)) return matrixTest;
        }
    }
  }


  // функция сортировки по длине вложенных массивов
  function sortsolv (a, b) {
    return a.length - b.length;
  }

  // определение квадрата, в котором находится решение 
  function rectNum(n){
    var  res=0;
      if ((n)>=6) {
        res=6;
      } 
      else {
        if ((n)>=3) {
          res=3;
        } 
          else { 
            if ((n)<3) {
              res=0;
            }
          }
      }
    return res;
  }
  //
  //сумма всех значенией в матрице
  function matrixSum (matrix) {
    var A = matrix[0].length;
    var B = matrix.length;
    var sum = 0;
    for (var x = 0; x<A; x++) {
        for (var y = 0; y<B; y++) {
          if (matrix[x][y]===0) return false;
          sum+=matrix[x][y];
        }
      }
    return sum;
  }
  //
  // проверка можно ли вставить значение
  function trySth (x, y, sthToProve, matrix) {
    var A = matrix.length;
    var x0 = rectNum(x);
    var y0 = rectNum(y);
    for (var i=0;i<A;i++){ 
        if (matrix[x][i] === sthToProve) return false;
        if (matrix[i][y] === sthToProve) return false;
    }
    for (var x1 = x0; x1<x0+3;x1++){
        for (var y1 = y0; y1<y0+3;y1++){
            if (matrix[x1][y1] === sthToProve) return false;
        }
      }
    return true;
}

  if(matrixSum (matrix) == (A*B*5)){
    return matrix
  }
  else return false;
}