
import parse_csv from  "../../src/csv.js";
import * as DF from    "../../src/df.js";
import * as utils from "../../src/utils.js";

export function setup( vz ) {
  vz.addItemType( "cinema-view-vtkpoints","Cinema: vtk points", function( opts ) {
    return create( vz, opts );
  } );
}

export function create( vz, opts ) {

  var obj = vz.createObj( opts );

  var gr  = vz.vis.addPoints( obj, "points" );
  gr.setParam("shape",2);
  gr.setParam("color",[1,0,0]);
  gr.setParam("radius",2.4);

  obj.trackParam( "@dat",function(v) {
    var dat = obj.getParam("@dat");

    gr.positions = utils.combine( [dat.X, dat.Y, dat.Z ] );
  });

  utils.file_merge_feature( obj,parse_vtk, utils.interp_csv, "@dat",loadFileBinary );

  return obj;
}

import { VTKLoader } from "./threejs-extract/VTKLoader.js";

function parse_vtk( data ) {
  var loader = new VTKLoader();
  var parsed = loader.parse( data );
  
  var num = Math.floor( parsed.length / 3 );
  var x = new Float32Array( num );
  var y = new Float32Array( num );
  var z = new Float32Array( num );
  
  for (var i=0,j=0; i<num; i++,j+=3) {
    x[i] = parsed[ j ];
    y[i] = parsed[ j+1];
    z[i] = parsed[ j+2 ];
  }
  
  // convert parsed to dataframe
  var df = DF.create();
  DF.add_column( df, "X",x);
  DF.add_column( df, "Y",y);
  DF.add_column( df, "Z",z);
  
  return df;
}