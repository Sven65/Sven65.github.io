!function(e,t){"use strict";"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Qty=t()}(this,function(){"use strict";function e(t){if(U(t),!T(this))return new e(t);if(this.scalar=null,this.baseScalar=null,this.signature=null,this._conversionCache={},this.numerator=R,this.denominator=R,M(t)?(this.scalar=t.scalar,this.numerator=t.numerator&&0!==t.numerator.length?t.numerator:R,this.denominator=t.denominator&&0!==t.denominator.length?t.denominator:R):X.call(this,t),this.denominator.join("*").indexOf("temp")>=0)throw new _("Cannot divide with temperatures");if(this.numerator.join("*").indexOf("temp")>=0){if(this.numerator.length>1)throw new _("Cannot multiply by temperatures");if(!c(this.denominator,R))throw new _("Cannot divide with temperatures")}if(this.initValue=t,J.call(this),this.isTemperature()&&this.baseScalar<0)throw new _("Temperatures must not be less than absolute zero")}function t(e,t){return(e+" "+t).trim()}function r(){throw new _("Incompatible units")}function n(t,r){for(var n,a=[],i=[],o=1,s=0;s<t.length;s++)n=t[s],nt[n]?o=w(o,nt[n]):it[n]&&(o*=it[n].scalar,it[n].numerator&&a.push(it[n].numerator),it[n].denominator&&i.push(it[n].denominator));for(var m=0;m<r.length;m++)n=r[m],nt[n]?o/=nt[n]:it[n]&&(o/=it[n].scalar,it[n].numerator&&i.push(it[n].numerator),it[n].denominator&&a.push(it[n].denominator));return a=a.reduce(function(e,t){return e.concat(t)},[]),i=i.reduce(function(e,t){return e.concat(t)},[]),e({scalar:o,numerator:a,denominator:i})}function a(e){var t=et[e];if(t)return t;var r,n=[];if(!vt.test(e))throw new _("Unit not recognized");for(;r=gt.exec(e);)n.push(r.slice(1));return n=n.map(function(e){return at[e[0]]?[at[e[0]],ot[e[1]]]:[ot[e[1]]]}),n=n.reduce(function(e,t){return e.concat(t)},[]),n=n.filter(function(e){return e}),et[e]=n,n}function i(){}function o(e){var t=tt.get(e);if(t)return t;var r=c(e,R);return t=r?"1":m(s(e)).join("*"),tt.set(e,t),t}function s(e){for(var t,r,n=[],a=0;a<e.length;a++)t=e[a],r=e[a+1],nt[t]?(n.push(st[t]+st[r]),a++):n.push(st[t]);return n}function m(e){var t=e.reduce(function(e,t){var r=e[t];return r||e.push(r=e[t]=[t,0]),r[1]++,e},[]);return t.map(function(e){return e[0]+(e[1]>1?e[1]:"")})}function c(e,t){if(t.length!==e.length)return!1;for(var r=0;r<e.length;r++){if(t[r].compareArray&&!t[r].compareArray(e[r]))return!1;if(t[r]!==e[r])return!1}return!0}function u(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}function l(t,r){var n=t.units(),a=r.to(n),i=e(p(n));return e({scalar:t.scalar-a.scalar,numerator:i.numerator,denominator:i.denominator})}function h(t,r){var n=r.to(p(t.units()));return e({scalar:t.scalar-n.scalar,numerator:t.numerator,denominator:t.denominator})}function d(t,r){var n=r.to(p(t.units()));return e({scalar:t.scalar+n.scalar,numerator:t.numerator,denominator:t.denominator})}function p(e){if("tempK"===e)return"degK";if("tempC"===e)return"degC";if("tempF"===e)return"degF";if("tempR"===e)return"degR";throw new _("Unknown type for temp conversion from: "+e)}function f(t,r){var n,a=g(t),i=r.units();if("degK"===i)n=a.scalar;else if("degC"===i)n=a.scalar;else if("degF"===i)n=9*a.scalar/5;else{if("degR"!==i)throw new _("Unknown type for degree conversion to: "+i);n=9*a.scalar/5}return e({scalar:n,numerator:r.numerator,denominator:r.denominator})}function g(t){var r,n=t.units();if(n.match(/(deg)[CFRK]/))r=t.baseScalar;else if("tempK"===n)r=t.scalar;else if("tempC"===n)r=t.scalar;else if("tempF"===n)r=5*t.scalar/9;else{if("tempR"!==n)throw new _("Unknown type for temp conversion from: "+n);r=5*t.scalar/9}return e({scalar:r,numerator:["<kelvin>"],denominator:R})}function v(t,r){var n,a=r.units();if("tempK"===a)n=t.baseScalar;else if("tempC"===a)n=t.baseScalar-273.15;else if("tempF"===a)n=9*t.baseScalar/5-459.67;else{if("tempR"!==a)throw new _("Unknown type for temp conversion to: "+a);n=9*t.baseScalar/5}return e({scalar:n,numerator:r.numerator,denominator:r.denominator})}function b(t){var r,n=t.units();if(n.match(/(deg)[CFRK]/))r=t.baseScalar;else if("tempK"===n)r=t.scalar;else if("tempC"===n)r=t.scalar+273.15;else if("tempF"===n)r=5*(t.scalar+459.67)/9;else{if("tempR"!==n)throw new _("Unknown type for temp conversion from: "+n);r=5*t.scalar/9}return e({scalar:r,numerator:["<temp-K>"],denominator:R})}function w(){for(var e=1,t=0,r=0;r<arguments.length;r++){var n=arguments[r];t+=k(n),e*=n}return 0!==t?u(e,t):e}function y(e,t){if(0===t)throw new _("Divide by zero");var r=Math.pow(10,k(t)),n=r/(r*t);return w(e,n)}function k(e){if(!rt(e))return 0;for(var t=0;e%1!==0;)e*=10,t++;return t}function x(e,t){e=e.filter(function(e){return e!==B}),t=t.filter(function(e){return e!==B});for(var r,n={},a=0;a<e.length;a++)nt[e[a]]?(r=[e[a],e[a+1]],a++):r=e[a],r&&r!==B&&(n[r]?n[r][0]++:n[r]=[1,r]);for(var i=0;i<t.length;i++)nt[t[i]]?(r=[t[i],t[i+1]],i++):r=t[i],r&&r!==B&&(n[r]?n[r][0]--:n[r]=[-1,r]);e=[],t=[];for(var o in n)if(n.hasOwnProperty(o)){var s,m=n[o];if(m[0]>0)for(s=0;s<m[0];s++)e.push(m[1]);else if(m[0]<0)for(s=0;s<-m[0];s++)t.push(m[1])}return 0===e.length&&(e=R),0===t.length&&(t=R),e=e.reduce(function(e,t){return e.concat(t)},[]),t=t.reduce(function(e,t){return e.concat(t)},[]),[e,t]}function C(e){return e}function S(e){return"string"==typeof e||e instanceof String}function z(e){return rt(e)}function T(t){return t instanceof e}function M(e){return e&&"object"==typeof e&&e.hasOwnProperty("scalar")}function U(e){if(!(S(e)||z(e)||T(e)||M(e)))throw new _("Only strings, numbers or quantities accepted as initialization values")}function _(){var e;return this?(e=Error.apply(this,arguments),this.name="QtyError",this.message=e.message,void(this.stack=e.stack)):(e=Object.create(_.prototype),_.apply(e,arguments),e)}var K={"<googol>":[["googol"],1e100,"prefix"],"<kibi>":[["Ki","Kibi","kibi"],Math.pow(2,10),"prefix"],"<mebi>":[["Mi","Mebi","mebi"],Math.pow(2,20),"prefix"],"<gibi>":[["Gi","Gibi","gibi"],Math.pow(2,30),"prefix"],"<tebi>":[["Ti","Tebi","tebi"],Math.pow(2,40),"prefix"],"<pebi>":[["Pi","Pebi","pebi"],Math.pow(2,50),"prefix"],"<exi>":[["Ei","Exi","exi"],Math.pow(2,60),"prefix"],"<zebi>":[["Zi","Zebi","zebi"],Math.pow(2,70),"prefix"],"<yebi>":[["Yi","Yebi","yebi"],Math.pow(2,80),"prefix"],"<yotta>":[["Y","Yotta","yotta"],1e24,"prefix"],"<zetta>":[["Z","Zetta","zetta"],1e21,"prefix"],"<exa>":[["E","Exa","exa"],1e18,"prefix"],"<peta>":[["P","Peta","peta"],1e15,"prefix"],"<tera>":[["T","Tera","tera"],1e12,"prefix"],"<giga>":[["G","Giga","giga"],1e9,"prefix"],"<mega>":[["M","Mega","mega"],1e6,"prefix"],"<kilo>":[["k","kilo"],1e3,"prefix"],"<hecto>":[["h","Hecto","hecto"],100,"prefix"],"<deca>":[["da","Deca","deca","deka"],10,"prefix"],"<deci>":[["d","Deci","deci"],.1,"prefix"],"<centi>":[["c","Centi","centi"],.01,"prefix"],"<milli>":[["m","Milli","milli"],.001,"prefix"],"<micro>":[["u","μ","µ","Micro","mc","micro"],1e-6,"prefix"],"<nano>":[["n","Nano","nano"],1e-9,"prefix"],"<pico>":[["p","Pico","pico"],1e-12,"prefix"],"<femto>":[["f","Femto","femto"],1e-15,"prefix"],"<atto>":[["a","Atto","atto"],1e-18,"prefix"],"<zepto>":[["z","Zepto","zepto"],1e-21,"prefix"],"<yocto>":[["y","Yocto","yocto"],1e-24,"prefix"],"<1>":[["1","<1>"],1,""],"<meter>":[["m","meter","meters","metre","metres"],1,"length",["<meter>"]],"<inch>":[["in","inch","inches",'"'],.0254,"length",["<meter>"]],"<foot>":[["ft","foot","feet","'"],.3048,"length",["<meter>"]],"<yard>":[["yd","yard","yards"],.9144,"length",["<meter>"]],"<mile>":[["mi","mile","miles"],1609.344,"length",["<meter>"]],"<naut-mile>":[["nmi"],1852,"length",["<meter>"]],"<league>":[["league","leagues"],4828,"length",["<meter>"]],"<furlong>":[["furlong","furlongs"],201.2,"length",["<meter>"]],"<rod>":[["rd","rod","rods"],5.029,"length",["<meter>"]],"<mil>":[["mil","mils"],254e-7,"length",["<meter>"]],"<angstrom>":[["ang","angstrom","angstroms"],1e-10,"length",["<meter>"]],"<fathom>":[["fathom","fathoms"],1.829,"length",["<meter>"]],"<pica>":[["pica","picas"],.00423333333,"length",["<meter>"]],"<point>":[["pt","point","points"],.000352777778,"length",["<meter>"]],"<redshift>":[["z","red-shift"],1.302773e26,"length",["<meter>"]],"<AU>":[["AU","astronomical-unit"],1495979e5,"length",["<meter>"]],"<light-second>":[["ls","light-second"],299792500,"length",["<meter>"]],"<light-minute>":[["lmin","light-minute"],1798755e4,"length",["<meter>"]],"<light-year>":[["ly","light-year"],9460528e9,"length",["<meter>"]],"<parsec>":[["pc","parsec","parsecs"],3085678e10,"length",["<meter>"]],"<kilogram>":[["kg","kilogram","kilograms"],1,"mass",["<kilogram>"]],"<AMU>":[["u","AMU","amu"],6.0221415e26,"mass",["<kilogram>"]],"<dalton>":[["Da","Dalton","Daltons","dalton","daltons"],6.0221415e26,"mass",["<kilogram>"]],"<slug>":[["slug","slugs"],14.5939029,"mass",["<kilogram>"]],"<short-ton>":[["tn","ton"],907.18474,"mass",["<kilogram>"]],"<metric-ton>":[["tonne"],1e3,"mass",["<kilogram>"]],"<carat>":[["ct","carat","carats"],2e-4,"mass",["<kilogram>"]],"<pound>":[["lbs","lb","pound","pounds","#"],.45359237,"mass",["<kilogram>"]],"<ounce>":[["oz","ounce","ounces"],.0283495231,"mass",["<kilogram>"]],"<gram>":[["g","gram","grams","gramme","grammes"],.001,"mass",["<kilogram>"]],"<grain>":[["grain","grains","gr"],6479891e-11,"mass",["<kilogram>"]],"<dram>":[["dram","drams","dr"],.0017718452,"mass",["<kilogram>"]],"<stone>":[["stone","stones","st"],6.35029318,"mass",["<kilogram>"]],"<hectare>":[["hectare"],1e4,"area",["<meter>","<meter>"]],"<acre>":[["acre","acres"],4046.85642,"area",["<meter>","<meter>"]],"<sqft>":[["sqft"],1,"area",["<feet>","<feet>"]],"<liter>":[["l","L","liter","liters","litre","litres"],.001,"volume",["<meter>","<meter>","<meter>"]],"<gallon>":[["gal","gallon","gallons"],.0037854118,"volume",["<meter>","<meter>","<meter>"]],"<quart>":[["qt","quart","quarts"],.00094635295,"volume",["<meter>","<meter>","<meter>"]],"<pint>":[["pt","pint","pints"],.000473176475,"volume",["<meter>","<meter>","<meter>"]],"<cup>":[["cu","cup","cups"],.000236588238,"volume",["<meter>","<meter>","<meter>"]],"<fluid-ounce>":[["floz","fluid-ounce"],295735297e-13,"volume",["<meter>","<meter>","<meter>"]],"<tablespoon>":[["tbs","tablespoon","tablespoons"],147867648e-13,"volume",["<meter>","<meter>","<meter>"]],"<teaspoon>":[["tsp","teaspoon","teaspoons"],492892161e-14,"volume",["<meter>","<meter>","<meter>"]],"<bushel>":[["bu","bsh","bushel","bushels"],.035239072,"volume",["<meter>","<meter>","<meter>"]],"<kph>":[["kph"],.277777778,"speed",["<meter>"],["<second>"]],"<mph>":[["mph"],.44704,"speed",["<meter>"],["<second>"]],"<knot>":[["kt","kn","kts","knot","knots"],.514444444,"speed",["<meter>"],["<second>"]],"<fps>":[["fps"],.3048,"speed",["<meter>"],["<second>"]],"<gee>":[["gee"],9.80665,"acceleration",["<meter>"],["<second>","<second>"]],"<kelvin>":[["degK","kelvin"],1,"temperature",["<kelvin>"]],"<celsius>":[["degC","celsius","celsius","centigrade"],1,"temperature",["<kelvin>"]],"<fahrenheit>":[["degF","fahrenheit"],5/9,"temperature",["<kelvin>"]],"<rankine>":[["degR","rankine"],5/9,"temperature",["<kelvin>"]],"<temp-K>":[["tempK"],1,"temperature",["<temp-K>"]],"<temp-C>":[["tempC"],1,"temperature",["<temp-K>"]],"<temp-F>":[["tempF"],5/9,"temperature",["<temp-K>"]],"<temp-R>":[["tempR"],5/9,"temperature",["<temp-K>"]],"<second>":[["s","sec","secs","second","seconds"],1,"time",["<second>"]],"<minute>":[["min","mins","minute","minutes"],60,"time",["<second>"]],"<hour>":[["h","hr","hrs","hour","hours"],3600,"time",["<second>"]],"<day>":[["d","day","days"],86400,"time",["<second>"]],"<week>":[["wk","week","weeks"],604800,"time",["<second>"]],"<fortnight>":[["fortnight","fortnights"],1209600,"time",["<second>"]],"<year>":[["y","yr","year","years","annum"],31556926,"time",["<second>"]],"<decade>":[["decade","decades"],315569260,"time",["<second>"]],"<century>":[["century","centuries"],3155692600,"time",["<second>"]],"<pascal>":[["Pa","pascal","Pascal"],1,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<bar>":[["bar","bars"],1e5,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<mmHg>":[["mmHg"],133.322368,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<inHg>":[["inHg"],3386.3881472,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<torr>":[["torr"],133.322368,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<atm>":[["atm","ATM","atmosphere","atmospheres"],101325,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<psi>":[["psi"],6894.76,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<cmh2o>":[["cmH2O"],98.0638,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<inh2o>":[["inH2O"],249.082052,"pressure",["<kilogram>"],["<meter>","<second>","<second>"]],"<poise>":[["P","poise"],.1,"viscosity",["<kilogram>"],["<meter>","<second>"]],"<stokes>":[["St","stokes"],1e-4,"viscosity",["<meter>","<meter>"],["<second>"]],"<mole>":[["mol","mole"],1,"substance",["<mole>"]],"<molar>":[["M","molar"],1e3,"concentration",["<mole>"],["<meter>","<meter>","<meter>"]],"<wtpercent>":[["wt%","wtpercent"],10,"concentration",["<kilogram>"],["<meter>","<meter>","<meter>"]],"<katal>":[["kat","katal","Katal"],1,"activity",["<mole>"],["<second>"]],"<unit>":[["U","enzUnit"],1.6667e-15,"activity",["<mole>"],["<second>"]],"<farad>":[["F","farad","Farad"],1,"capacitance",["<farad>"]],"<coulomb>":[["C","coulomb","Coulomb"],1,"charge",["<ampere>","<second>"]],"<ampere>":[["A","Ampere","ampere","amp","amps"],1,"current",["<ampere>"]],"<siemens>":[["S","Siemens","siemens"],1,"conductance",["<second>","<second>","<second>","<ampere>","<ampere>"],["<kilogram>","<meter>","<meter>"]],"<henry>":[["H","Henry","henry"],1,"inductance",["<meter>","<meter>","<kilogram>"],["<second>","<second>","<ampere>","<ampere>"]],"<volt>":[["V","Volt","volt","volts"],1,"potential",["<meter>","<meter>","<kilogram>"],["<second>","<second>","<second>","<ampere>"]],"<ohm>":[["Ohm","ohm","Ω","Ω"],1,"resistance",["<meter>","<meter>","<kilogram>"],["<second>","<second>","<second>","<ampere>","<ampere>"]],"<weber>":[["Wb","weber","webers"],1,"magnetism",["<meter>","<meter>","<kilogram>"],["<second>","<second>","<ampere>"]],"<tesla>":[["T","tesla","teslas"],1,"magnetism",["<kilogram>"],["<second>","<second>","<ampere>"]],"<gauss>":[["G","gauss"],1e-4,"magnetism",["<kilogram>"],["<second>","<second>","<ampere>"]],"<maxwell>":[["Mx","maxwell","maxwells"],1e-8,"magnetism",["<meter>","<meter>","<kilogram>"],["<second>","<second>","<ampere>"]],"<oersted>":[["Oe","oersted","oersteds"],250/Math.PI,"magnetism",["<ampere>"],["<meter>"]],"<joule>":[["J","joule","Joule","joules"],1,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<erg>":[["erg","ergs"],1e-7,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<btu>":[["BTU","btu","BTUs"],1055.056,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<calorie>":[["cal","calorie","calories"],4.184,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<Calorie>":[["Cal","Calorie","Calories"],4184,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<therm-US>":[["th","therm","therms","Therm"],105480400,"energy",["<meter>","<meter>","<kilogram>"],["<second>","<second>"]],"<newton>":[["N","Newton","newton"],1,"force",["<kilogram>","<meter>"],["<second>","<second>"]],"<dyne>":[["dyn","dyne"],1e-5,"force",["<kilogram>","<meter>"],["<second>","<second>"]],"<pound-force>":[["lbf","pound-force"],4.448222,"force",["<kilogram>","<meter>"],["<second>","<second>"]],"<hertz>":[["Hz","hertz","Hertz"],1,"frequency",["<1>"],["<second>"]],"<radian>":[["rad","radian","radians"],1,"angle",["<radian>"]],"<degree>":[["deg","degree","degrees"],Math.PI/180,"angle",["<radian>"]],"<gradian>":[["gon","grad","gradian","grads"],Math.PI/200,"angle",["<radian>"]],"<steradian>":[["sr","steradian","steradians"],1,"solid_angle",["<steradian>"]],"<rotation>":[["rotation"],2*Math.PI,"angle",["<radian>"]],"<rpm>":[["rpm"],2*Math.PI/60,"angular_velocity",["<radian>"],["<second>"]],"<byte>":[["B","byte"],1,"memory",["<byte>"]],"<bit>":[["b","bit"],.125,"memory",["<byte>"]],"<dollar>":[["USD","dollar"],1,"currency",["<dollar>"]],"<cents>":[["cents"],.01,"currency",["<dollar>"]],"<candela>":[["cd","candela"],1,"luminosity",["<candela>"]],"<lumen>":[["lm","lumen"],1,"luminous_power",["<candela>","<steradian>"]],"<lux>":[["lux"],1,"illuminance",["<candela>","<steradian>"],["<meter>","<meter>"]],"<watt>":[["W","watt","watts"],1,"power",["<kilogram>","<meter>","<meter>"],["<second>","<second>","<second>"]],"<horsepower>":[["hp","horsepower"],745.699872,"power",["<kilogram>","<meter>","<meter>"],["<second>","<second>","<second>"]],"<gray>":[["Gy","gray","grays"],1,"radiation",["<meter>","<meter>"],["<second>","<second>"]],"<roentgen>":[["R","roentgen"],.00933,"radiation",["<meter>","<meter>"],["<second>","<second>"]],"<sievert>":[["Sv","sievert","sieverts"],1,"radiation",["<meter>","<meter>"],["<second>","<second>"]],"<becquerel>":[["Bq","bequerel","bequerels"],1,"radiation",["<1>"],["<second>"]],"<curie>":[["Ci","curie","curies"],37e9,"radiation",["<1>"],["<second>"]],"<cpm>":[["cpm"],1/60,"rate",["<count>"],["<second>"]],"<dpm>":[["dpm"],1/60,"rate",["<count>"],["<second>"]],"<bpm>":[["bpm"],1/60,"rate",["<count>"],["<second>"]],"<dot>":[["dot","dots"],1,"resolution",["<each>"]],"<pixel>":[["pixel","px"],1,"resolution",["<each>"]],"<ppi>":[["ppi"],1,"resolution",["<pixel>"],["<inch>"]],"<dpi>":[["dpi"],1,"typography",["<dot>"],["<inch>"]],"<cell>":[["cells","cell"],1,"counting",["<each>"]],"<each>":[["each"],1,"counting",["<each>"]],"<count>":[["count"],1,"counting",["<each>"]],"<base-pair>":[["bp"],1,"counting",["<each>"]],"<nucleotide>":[["nt"],1,"counting",["<each>"]],"<molecule>":[["molecule","molecules"],1,"counting",["<1>"]],"<dozen>":[["doz","dz","dozen"],12,"prefix_only",["<each>"]],"<percent>":[["%","percent"],.01,"prefix_only",["<1>"]],"<ppm>":[["ppm"],1e-6,"prefix_only",["<1>"]],"<ppt>":[["ppt"],1e-9,"prefix_only",["<1>"]],"<gross>":[["gr","gross"],144,"prefix_only",["<dozen>","<dozen>"]],"<decibel>":[["dB","decibel","decibels"],1,"logarithmic",["<decibel>"]]},F=["<meter>","<kilogram>","<second>","<mole>","<farad>","<ampere>","<radian>","<kelvin>","<temp-K>","<byte>","<dollar>","<candela>","<each>","<steradian>","<decibel>"],B="<1>",R=[B],O="[+-]",P="\\d+",q=O+"?"+P,A="\\."+P,j="(?:"+P+"(?:"+A+")?)|(?:"+A+")",D="[Ee]"+q,E="(?:"+j+")(?:"+D+")?",H=O+"?\\s*"+E,I="("+H+")?\\s*([^/]*)(?:/(.+))?",N=new RegExp("^"+I+"$"),G="\\^|\\*{2}",Y=new RegExp("([^ \\*]+?)(?:"+G+")?(-?\\d+)"),Z=new RegExp("([^ \\*]+?)(?:"+G+")?(\\d+)"),Q=["length","time","temperature","mass","current","substance","luminosity","currency","memory","angle","capacitance"],V={"-312058":"resistance","-312038":"inductance","-152040":"magnetism","-152038":"magnetism","-152058":"potential","-39":"acceleration","-38":"radiation","-20":"frequency","-19":"speed","-18":"viscosity",0:"unitless",1:"length",2:"area",3:"volume",20:"time",400:"temperature",7942:"power",7959:"pressure",7962:"energy",7979:"viscosity",7961:"force",7997:"mass_concentration",8000:"mass",159999:"magnetism",160000:"current",160020:"charge",312058:"conductance",3199980:"activity",3199997:"molar_concentration",3200000:"substance",63999998:"illuminance",64000000:"luminous_power",1280000000:"currency",25600000000:"memory",511999999980:"angular_velocity",512000000000:"angle",10240000000000:"capacitance"},$={};e.parse=function(t){if(!S(t))throw new _("Argument should be a string");try{return e(t)}catch(r){return null}},e.swiftConverter=function(t,r){var n=e(t),a=e(r);if(n.eq(a))return C;var i;return i=n.isTemperature()?function(e){return n.mul(e).to(a).scalar}:function(e){return e*n.baseScalar/a.baseScalar},function(e){var t,r,n;if(Array.isArray(e)){for(r=e.length,n=[],t=0;r>t;t++)n.push(i(e[t]));return n}return i(e)}},e.getKinds=function(){var e=Object.keys(V).map(function(e){return V[e]}).sort();return e},e.formatter=t;var J=function(){if(this.baseScalar)return this.baseScalar;if(this.isBase())this.baseScalar=this.scalar,this.signature=W.call(this);else{var e=this.toBase();this.baseScalar=e.scalar,this.signature=e.signature}},W=function(){if(this.signature)return this.signature;for(var e=L.call(this),t=0;t<e.length;t++)e[t]*=Math.pow(20,t);return e.reduce(function(e,t){return e+t},0)},L=function(){if(!this.isBase())return L.call(this.toBase());for(var e=new Array(Q.length),t=0;t<e.length;t++)e[t]=0;for(var r,n,a=0;a<this.numerator.length;a++)(r=K[this.numerator[a]])&&(n=Q.indexOf(r[2]),n>=0&&(e[n]=e[n]+1));for(var i=0;i<this.denominator.length;i++)(r=K[this.denominator[i]])&&(n=Q.indexOf(r[2]),n>=0&&(e[n]=e[n]-1));return e},X=function(e){if(S(e)||(e=e.toString()),e=e.trim(),0===e.length)throw new _("Unit not recognized");var t=N.exec(e);if(!t)throw new _(e+": Quantity not recognized");var r=t[1];r?(r=r.replace(/\s/g,""),this.scalar=parseFloat(r)):this.scalar=1;for(var n,i,o,s=t[2],m=t[3];t=Y.exec(s);){if(n=parseFloat(t[2]),isNaN(n))throw new _("Unit exponent is not a number");if(0===n&&!vt.test(t[1]))throw new _("Unit not recognized");i=t[1]+" ",o="";for(var c=0;c<Math.abs(n);c++)o+=i;n>=0?s=s.replace(t[0],o):(m=m?m+o:o,s=s.replace(t[0],""))}for(;t=Z.exec(m);){if(n=parseFloat(t[2]),isNaN(n))throw new _("Unit exponent is not a number");if(0===n&&!vt.test(t[1]))throw new _("Unit not recognized");i=t[1]+" ",o="";for(var u=0;n>u;u++)o+=i;m=m.replace(t[0],o,"g")}s&&(this.numerator=a(s.trim())),m&&(this.denominator=a(m.trim()))};e.prototype={constructor:e,toFloat:function(){if(this.isUnitless())return this.scalar;throw new _("Can't convert to Float unless unitless.  Use Unit#scalar")},isUnitless:function(){return c(this.numerator,R)&&c(this.denominator,R)},isCompatible:function(t){return S(t)?this.isCompatible(e(t)):T(t)&&void 0!==t.signature?this.signature===t.signature:!1},isInverse:function(e){return this.inverse().isCompatible(e)},kind:function(){return V[this.signature.toString()]},isBase:function(){return void 0!==this._isBase?this._isBase:this.isDegrees()&&this.numerator[0].match(/<(kelvin|temp-K)>/)?(this._isBase=!0,this._isBase):(this.numerator.concat(this.denominator).forEach(function(e){e!==B&&-1===F.indexOf(e)&&(this._isBase=!1)},this),this._isBase===!1?this._isBase:(this._isBase=!0,this._isBase))},toBase:function(){if(this.isBase())return this;if(this.isTemperature())return b(this);var e=$[this.units()];return e||(e=n(this.numerator,this.denominator),$[this.units()]=e),e.mul(this.scalar)},units:function(){if(void 0!==this._units)return this._units;var e=c(this.numerator,R),t=c(this.denominator,R);if(e&&t)return this._units="",this._units;var r=o(this.numerator),n=o(this.denominator);return this._units=r+(t?"":"/"+n),this._units},eq:function(e){return 0===this.compareTo(e)},lt:function(e){return-1===this.compareTo(e)},lte:function(e){return this.eq(e)||this.lt(e)},gt:function(e){return 1===this.compareTo(e)},gte:function(e){return this.eq(e)||this.gt(e)},toPrec:function(t){if(S(t)&&(t=e(t)),z(t)&&(t=e(t+" "+this.units())),this.isUnitless()?t.isUnitless()||r():t=t.to(this.units()),0===t.scalar)throw new _("Divide by zero");var n=w(Math.round(this.scalar/t.scalar),t.scalar);return e(n+this.units())},toString:function(e,t){var r;if(z(e))r=this.units(),t=e;else if(S(e))r=e;else if(T(e))return this.toPrec(e).toString(t);var n=this.to(r),a=void 0!==t?u(n.scalar,t):n.scalar;return n=(a+" "+n.units()).trim()},format:function(t,r){1===arguments.length&&"function"==typeof t&&(r=t,t=void 0),r=r||e.formatter;var n=this.to(t);return r.call(this,n.scalar,n.units())},compareTo:function(t){return S(t)?this.compareTo(e(t)):(this.isCompatible(t)||r(),this.baseScalar<t.baseScalar?-1:this.baseScalar===t.baseScalar?0:this.baseScalar>t.baseScalar?1:void 0)},same:function(e){return this.scalar===e.scalar&&this.units()===e.units()},inverse:function(){if(this.isTemperature())throw new _("Cannot divide with temperatures");if(0===this.scalar)throw new _("Divide by zero");return e({scalar:1/this.scalar,numerator:this.denominator,denominator:this.numerator})},isDegrees:function(){return(null===this.signature||400===this.signature)&&1===this.numerator.length&&c(this.denominator,R)&&(this.numerator[0].match(/<temp-[CFRK]>/)||this.numerator[0].match(/<(kelvin|celsius|rankine|fahrenheit)>/))},isTemperature:function(){return this.isDegrees()&&this.numerator[0].match(/<temp-[CFRK]>/)},to:function(t){var n,a;if(!t)return this;if(!S(t))return this.to(t.units());if(n=this._conversionCache[t])return n;if(a=e(t),a.units()===this.units())return this;if(this.isCompatible(a))if(a.isTemperature())a=v(this,a);else if(a.isDegrees())a=f(this,a);else{var i=y(this.baseScalar,a.baseScalar);a=e({scalar:i,numerator:a.numerator,denominator:a.denominator})}else this.isInverse(a)?a=this.inverse().to(t):r();return this._conversionCache[t]=a,a},add:function(t){if(S(t)&&(t=e(t)),this.isCompatible(t)||r(),this.isTemperature()&&t.isTemperature())throw new _("Cannot add two temperatures");return this.isTemperature()?d(this,t):t.isTemperature()?d(t,this):e({scalar:this.scalar+t.to(this).scalar,numerator:this.numerator,denominator:this.denominator})},sub:function(t){if(S(t)&&(t=e(t)),this.isCompatible(t)||r(),this.isTemperature()&&t.isTemperature())return l(this,t);if(this.isTemperature())return h(this,t);if(t.isTemperature())throw new _("Cannot subtract a temperature from a differential degree unit");return e({scalar:this.scalar-t.to(this).scalar,numerator:this.numerator,denominator:this.denominator})},mul:function(t){if(z(t))return e({scalar:w(this.scalar,t),numerator:this.numerator,denominator:this.denominator});if(S(t)&&(t=e(t)),(this.isTemperature()||t.isTemperature())&&!this.isUnitless()&&!t.isUnitless())throw new _("Cannot multiply by temperatures");var r=this,n=t;r.isCompatible(n)&&400!==r.signature&&(n=n.to(r));var a=x(r.numerator.concat(n.numerator),r.denominator.concat(n.denominator));return e({scalar:w(r.scalar,n.scalar),numerator:a[0],denominator:a[1]})},div:function(t){if(z(t)){if(0===t)throw new _("Divide by zero");return e({scalar:this.scalar/t,numerator:this.numerator,denominator:this.denominator})}if(S(t)&&(t=e(t)),0===t.scalar)throw new _("Divide by zero");if(t.isTemperature())throw new _("Cannot divide with temperatures");if(this.isTemperature()&&!t.isUnitless())throw new _("Cannot divide with temperatures");var r=this,n=t;r.isCompatible(n)&&400!==r.signature&&(n=n.to(r));var a=x(r.numerator.concat(n.denominator),r.denominator.concat(n.numerator));return e({scalar:r.scalar/n.scalar,numerator:a[0],denominator:a[1]})}};var et={};i.prototype.get=function(e){return arguments.length>1&&(e=Array.apply(null,arguments)),e.reduce(function(t,r,n){if(t){var a=t[r];return n===e.length-1?a?a.data:void 0:a}},this)},i.prototype.set=function(e,t){return arguments.length>2&&(e=Array.prototype.slice.call(arguments,0,-1),t=arguments[arguments.length-1]),e.reduce(function(r,n,a){var i=r[n];return void 0===i&&(i=r[n]={}),a===e.length-1?(i.data=t,t):i},this)};var tt=new i;e.mulSafe=w,e.divSafe=y;var rt=Number.isFinite||window.isFinite,nt={},at={},it={},ot={},st={};for(var mt in K)if(K.hasOwnProperty(mt)){var ct=K[mt];if("prefix"===ct[2]){nt[mt]=ct[1];for(var ut=0;ut<ct[0].length;ut++)at[ct[0][ut]]=mt}else{it[mt]={scalar:ct[1],numerator:ct[3],denominator:ct[4]};for(var lt=0;lt<ct[0].length;lt++)ot[ct[0][lt]]=mt}st[mt]=ct[0][0]}var ht=Object.keys(at).sort(function(e,t){return t.length-e.length}).join("|"),dt=Object.keys(ot).sort(function(e,t){return t.length-e.length}).join("|"),pt="\\b|$",ft="("+ht+")??("+dt+")(?:"+pt+")",gt=new RegExp(ft,"g"),vt=new RegExp("^\\s*("+ft+"\\s*\\*?\\s*)+$");return _.prototype=Object.create(Error.prototype,{constructor:{value:_}}),e.Error=_,e});