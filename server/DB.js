// class DB {
//   constructor() {
//     const pool = new pool({ connectionString : process.env.DATABASE_URL });
//   }

//   getRows(_table, _conditions = {}) {
//     let sql = 'SELECT ';
//     sql +=  _conditions.hasOwnProperty('select')?_conditions['select'].forEach(fields=>{ `${fields},` }):'*';
//     sel += `FROM ${table}`;
//     if( _conditions.hasOwnProperty('where')){
//       sel += ' WHERE ';
//       let i = 1;
//       // const whereProperty = Object.keys(conditions.where);
//       const whereValue = Object.keys(conditions.where);
//       for(i=0; i<whereProperty.length; i++) {

//       }
      
//       // for(key in $conditions['where']){
//       //   const pre = (i > 0)?' AND ':'';
//       //   sql += key +'='
//       //   sql += key ." = '".value."'";
//       //     $i++;
//       // }
//     }
    
//   }

//   insert() {}

//   update() {}

//   delete() {}
// }
