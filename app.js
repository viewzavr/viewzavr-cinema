import { default as setup_cinema, create_cinema } from "./src/cinema-viewzavr.js";

var ci = create_cinema( vz,{} );
ci.setParam("file","./examples/_tutorial/0-points-fly.cdb/data.csv");

vz.restoreFromHash();