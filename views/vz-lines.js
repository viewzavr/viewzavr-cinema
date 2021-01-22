import parse_csv from "../src/csv.js";

export default function cinema_points( parent,name ) {

  //var obj = vz.create_obj( parent, name );
  var obj = parent.vz.create_obj( {}, {parent:parent, name:name} );
  var gr  = parent.vz.vis.addLines( obj, "lines" );
  
  obj.addFile( "file","",function(v) {
    loadFile( v, function(res) {
      var dat = parse_csv( res );
      
      gr.positions = combine( [ dat.X, dat.Y, dat.Z, dat.X2, dat.Y2, dat.Z2 ] );
      gr.colors = combine( [ dat.R, dat.G, dat.B,dat.R2, dat.G2, dat.B2 ] );
      gr.radiuses = dat.RADIUS || [];
      
    },
    function(err) {
      gr.positions = [];
    });
  });

  return obj;
}

function combine( arrays_list ) {
  if (!Array.isArray(arrays_list[0])) return [];
  
  var res = [];
  var len = arrays_list[0].length;
  for (var i=0; i<len; i++) {
    for (var j=0; j<arrays_list.length; j++)
      res.push( arrays_list[j][i] );
  }
  return res;
}