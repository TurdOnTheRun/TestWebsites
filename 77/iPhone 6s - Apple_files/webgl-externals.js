var THREE={REVISION:"71"};if(typeof module==="object"){module.exports=THREE}if(Math.sign===undefined){Math.sign=function(a){return(a<0)?-1:(a>0)?1:+a
}}THREE.log=function(){};THREE.warn=function(){};THREE.error=function(){};THREE.MOUSE={LEFT:0,MIDDLE:1,RIGHT:2};
THREE.CullFaceNone=0;THREE.CullFaceBack=1;THREE.CullFaceFront=2;THREE.CullFaceFrontBack=3;
THREE.FrontFaceDirectionCW=0;THREE.FrontFaceDirectionCCW=1;THREE.BasicShadowMap=0;
THREE.PCFShadowMap=1;THREE.PCFSoftShadowMap=2;THREE.FrontSide=0;THREE.BackSide=1;
THREE.DoubleSide=2;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;
THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NoBlending=0;THREE.NormalBlending=1;
THREE.AdditiveBlending=2;THREE.SubtractiveBlending=3;THREE.MultiplyBlending=4;THREE.CustomBlending=5;
THREE.AddEquation=100;THREE.SubtractEquation=101;THREE.ReverseSubtractEquation=102;
THREE.MinEquation=103;THREE.MaxEquation=104;THREE.ZeroFactor=200;THREE.OneFactor=201;
THREE.SrcColorFactor=202;THREE.OneMinusSrcColorFactor=203;THREE.SrcAlphaFactor=204;
THREE.OneMinusSrcAlphaFactor=205;THREE.DstAlphaFactor=206;THREE.OneMinusDstAlphaFactor=207;
THREE.DstColorFactor=208;THREE.OneMinusDstColorFactor=209;THREE.SrcAlphaSaturateFactor=210;
THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.AddOperation=2;THREE.UVMapping=300;
THREE.CubeReflectionMapping=301;THREE.CubeRefractionMapping=302;THREE.EquirectangularReflectionMapping=303;
THREE.EquirectangularRefractionMapping=304;THREE.SphericalReflectionMapping=305;
THREE.RepeatWrapping=1000;THREE.ClampToEdgeWrapping=1001;THREE.MirroredRepeatWrapping=1002;
THREE.NearestFilter=1003;THREE.NearestMipMapNearestFilter=1004;THREE.NearestMipMapLinearFilter=1005;
THREE.LinearFilter=1006;THREE.LinearMipMapNearestFilter=1007;THREE.LinearMipMapLinearFilter=1008;
THREE.UnsignedByteType=1009;THREE.ByteType=1010;THREE.ShortType=1011;THREE.UnsignedShortType=1012;
THREE.IntType=1013;THREE.UnsignedIntType=1014;THREE.FloatType=1015;THREE.HalfFloatType=1025;
THREE.UnsignedShort4444Type=1016;THREE.UnsignedShort5551Type=1017;THREE.UnsignedShort565Type=1018;
THREE.AlphaFormat=1019;THREE.RGBFormat=1020;THREE.RGBAFormat=1021;THREE.LuminanceFormat=1022;
THREE.LuminanceAlphaFormat=1023;THREE.RGBEFormat=THREE.RGBAFormat;THREE.RGB_S3TC_DXT1_Format=2001;
THREE.RGBA_S3TC_DXT1_Format=2002;THREE.RGBA_S3TC_DXT3_Format=2003;THREE.RGBA_S3TC_DXT5_Format=2004;
THREE.RGB_PVRTC_4BPPV1_Format=2100;THREE.RGB_PVRTC_2BPPV1_Format=2101;THREE.RGBA_PVRTC_4BPPV1_Format=2102;
THREE.RGBA_PVRTC_2BPPV1_Format=2103;THREE.Projector=function(){THREE.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
this.projectVector=function(a,b){THREE.warn("THREE.Projector: .projectVector() is now vector.project().");
a.project(b)};this.unprojectVector=function(a,b){THREE.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
a.unproject(b)};this.pickingRay=function(a,b){THREE.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
}};THREE.CanvasRenderer=function(){THREE.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
this.domElement=document.createElement("canvas");this.clear=function(){};this.render=function(){};
this.setClearColor=function(){};this.setSize=function(){}};THREE.Color=function(a){if(arguments.length===3){return this.setRGB(arguments[0],arguments[1],arguments[2])
}return this.set(a)};THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,set:function(a){if(a instanceof THREE.Color){this.copy(a)
}else{if(typeof a==="number"){this.setHex(a)}else{if(typeof a==="string"){this.setStyle(a)
}}}return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;
this.b=(a&255)/255;return this},setRGB:function(d,c,a){this.r=d;this.g=c;this.b=a;
return this},setHSL:function(d,c,b){if(c===0){this.r=this.g=this.b=b}else{var a=function(i,h,g){if(g<0){g+=1
}if(g>1){g-=1}if(g<1/6){return i+(h-i)*6*g}if(g<1/2){return h}if(g<2/3){return i+(h-i)*6*(2/3-g)
}return i};var f=b<=0.5?b*(1+c):b+c-(b*c);var e=(2*b)-f;this.r=a(e,f,d+1/3);this.g=a(e,f,d);
this.b=a(e,f,d-1/3)}return this},setStyle:function(b){if(/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(b)){var a=/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(b);
this.r=Math.min(255,parseInt(a[1],10))/255;this.g=Math.min(255,parseInt(a[2],10))/255;
this.b=Math.min(255,parseInt(a[3],10))/255;return this}if(/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(b)){var a=/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(b);
this.r=Math.min(100,parseInt(a[1],10))/100;this.g=Math.min(100,parseInt(a[2],10))/100;
this.b=Math.min(100,parseInt(a[3],10))/100;return this}if(/^\#([0-9a-f]{6})$/i.test(b)){var a=/^\#([0-9a-f]{6})$/i.exec(b);
this.setHex(parseInt(a[1],16));return this}if(/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(b)){var a=/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(b);
this.setHex(parseInt(a[1]+a[1]+a[2]+a[2]+a[3]+a[3],16));return this}if(/^(\w+)$/i.test(b)){this.setHex(THREE.ColorKeywords[b]);
return this}},copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a,b){if(b===undefined){b=2
}this.r=Math.pow(a.r,b);this.g=Math.pow(a.g,b);this.b=Math.pow(a.b,b);return this
},copyLinearToGamma:function(b,c){if(c===undefined){c=2}var a=(c>0)?(1/c):1;this.r=Math.pow(b.r,a);
this.g=Math.pow(b.g,a);this.b=Math.pow(b.b,a);return this},convertGammaToLinear:function(){var d=this.r,c=this.g,a=this.b;
this.r=d*d;this.g=c*c;this.b=a*a;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);
this.g=Math.sqrt(this.g);this.b=Math.sqrt(this.b);return this},getHex:function(){return(this.r*255)<<16^(this.g*255)<<8^(this.b*255)<<0
},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)
},getHSL:function(m){var l=m||{h:0,s:0,l:0};var a=this.r,e=this.g,h=this.b;var i=Math.max(a,e,h);
var c=Math.min(a,e,h);var f,d;var k=(c+i)/2;if(c===i){f=0;d=0}else{var j=i-c;d=k<=0.5?j/(i+c):j/(2-i-c);
switch(i){case a:f=(e-h)/j+(e<h?6:0);break;case e:f=(h-a)/j+2;break;case h:f=(a-e)/j+4;
break}f/=6}l.h=f;l.s=d;l.l=k;return l},getStyle:function(){return"rgb("+((this.r*255)|0)+","+((this.g*255)|0)+","+((this.b*255)|0)+")"
},offsetHSL:function(d,c,a){var b=this.getHSL();b.h+=d;b.s+=c;b.l+=a;this.setHSL(b.h,b.s,b.l);
return this},add:function(a){this.r+=a.r;this.g+=a.g;this.b+=a.b;return this},addColors:function(b,a){this.r=b.r+a.r;
this.g=b.g+a.g;this.b=b.b+a.b;return this},addScalar:function(a){this.r+=a;this.g+=a;
this.b+=a;return this},multiply:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b;
return this},multiplyScalar:function(a){this.r*=a;this.g*=a;this.b*=a;return this
},lerp:function(a,b){this.r+=(a.r-this.r)*b;this.g+=(a.g-this.g)*b;this.b+=(a.b-this.b)*b;
return this},equals:function(a){return(a.r===this.r)&&(a.g===this.g)&&(a.b===this.b)
},fromArray:function(a){this.r=a[0];this.g=a[1];this.b=a[2];return this},toArray:function(b,a){if(b===undefined){b=[]
}if(a===undefined){a=0}b[a]=this.r;b[a+1]=this.g;b[a+2]=this.b;return b},clone:function(){return new THREE.Color().setRGB(this.r,this.g,this.b)
}};THREE.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};
THREE.Quaternion=function(a,d,c,b){this._x=a||0;this._y=d||0;this._z=c||0;this._w=(b!==undefined)?b:1
};THREE.Quaternion.prototype={constructor:THREE.Quaternion,_x:0,_y:0,_z:0,_w:0,get x(){return this._x
},set x(a){this._x=a;this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a;
this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a;this.onChangeCallback()
},get w(){return this._w},set w(a){this._w=a;this.onChangeCallback()},set:function(a,d,c,b){this._x=a;
this._y=d;this._z=c;this._w=b;this.onChangeCallback();return this},copy:function(a){this._x=a.x;
this._y=a.y;this._z=a.z;this._w=a.w;this.onChangeCallback();return this},setFromEuler:function(g,h){if(g instanceof THREE.Euler===false){throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.")
}var f=Math.cos(g._x/2);var e=Math.cos(g._y/2);var c=Math.cos(g._z/2);var d=Math.sin(g._x/2);
var b=Math.sin(g._y/2);var a=Math.sin(g._z/2);if(g.order==="XYZ"){this._x=d*e*c+f*b*a;
this._y=f*b*c-d*e*a;this._z=f*e*a+d*b*c;this._w=f*e*c-d*b*a}else{if(g.order==="YXZ"){this._x=d*e*c+f*b*a;
this._y=f*b*c-d*e*a;this._z=f*e*a-d*b*c;this._w=f*e*c+d*b*a}else{if(g.order==="ZXY"){this._x=d*e*c-f*b*a;
this._y=f*b*c+d*e*a;this._z=f*e*a+d*b*c;this._w=f*e*c-d*b*a}else{if(g.order==="ZYX"){this._x=d*e*c-f*b*a;
this._y=f*b*c+d*e*a;this._z=f*e*a-d*b*c;this._w=f*e*c+d*b*a}else{if(g.order==="YZX"){this._x=d*e*c+f*b*a;
this._y=f*b*c+d*e*a;this._z=f*e*a-d*b*c;this._w=f*e*c-d*b*a}else{if(g.order==="XZY"){this._x=d*e*c-f*b*a;
this._y=f*b*c-d*e*a;this._z=f*e*a+d*b*c;this._w=f*e*c+d*b*a}}}}}}if(h!==false){this.onChangeCallback()
}return this},setFromAxisAngle:function(c,d){var a=d/2,b=Math.sin(a);this._x=c.x*b;
this._y=c.y*b;this._z=c.z*b;this._w=Math.cos(a);this.onChangeCallback();return this
},setFromRotationMatrix:function(e){var d=e.elements,i=d[0],h=d[4],g=d[8],c=d[1],b=d[5],a=d[9],l=d[2],k=d[6],j=d[10],f=i+b+j,n;
if(f>0){n=0.5/Math.sqrt(f+1);this._w=0.25/n;this._x=(k-a)*n;this._y=(g-l)*n;this._z=(c-h)*n
}else{if(i>b&&i>j){n=2*Math.sqrt(1+i-b-j);this._w=(k-a)/n;this._x=0.25*n;this._y=(h+c)/n;
this._z=(g+l)/n}else{if(b>j){n=2*Math.sqrt(1+b-i-j);this._w=(g-l)/n;this._x=(h+c)/n;
this._y=0.25*n;this._z=(a+k)/n}else{n=2*Math.sqrt(1+j-i-b);this._w=(c-h)/n;this._x=(g+l)/n;
this._y=(a+k)/n;this._z=0.25*n}}}this.onChangeCallback();return this},setFromUnitVectors:function(){var c,a;
var b=0.000001;return function(d,e){if(c===undefined){c=new THREE.Vector3()}a=d.dot(e)+1;
if(a<b){a=0;if(Math.abs(d.x)>Math.abs(d.z)){c.set(-d.y,d.x,0)}else{c.set(0,-d.z,d.y)
}}else{c.crossVectors(d,e)}this._x=c.x;this._y=c.y;this._z=c.z;this._w=a;this.normalize();
return this}}(),inverse:function(){this.conjugate().normalize();return this},conjugate:function(){this._x*=-1;
this._y*=-1;this._z*=-1;this.onChangeCallback();return this},dot:function(a){return this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w
},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w
},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)
},normalize:function(){var a=this.length();if(a===0){this._x=0;this._y=0;this._z=0;
this._w=1}else{a=1/a;this._x=this._x*a;this._y=this._y*a;this._z=this._z*a;this._w=this._w*a
}this.onChangeCallback();return this},multiply:function(a,b){if(b!==undefined){THREE.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.");
return this.multiplyQuaternions(a,b)}return this.multiplyQuaternions(this,a)},multiplyQuaternions:function(l,k){var i=l._x,h=l._y,g=l._z,j=l._w;
var e=k._x,d=k._y,c=k._z,f=k._w;this._x=i*f+j*e+h*c-g*d;this._y=h*f+j*d+g*e-i*c;
this._z=g*f+j*c+i*d-h*e;this._w=j*f-i*e-h*d-g*c;this.onChangeCallback();return this
},multiplyVector3:function(a){THREE.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
return a.applyQuaternion(this)},slerp:function(c,k){if(k===0){return this}if(k===1){return this.copy(c)
}var i=this._x,h=this._y,g=this._z,j=this._w;var b=j*c._w+i*c._x+h*c._y+g*c._z;
if(b<0){this._w=-c._w;this._x=-c._x;this._y=-c._y;this._z=-c._z;b=-b}else{this.copy(c)
}if(b>=1){this._w=j;this._x=i;this._y=h;this._z=g;return this}var d=Math.acos(b);
var a=Math.sqrt(1-b*b);if(Math.abs(a)<0.001){this._w=0.5*(j+this._w);this._x=0.5*(i+this._x);
this._y=0.5*(h+this._y);this._z=0.5*(g+this._z);return this}var f=Math.sin((1-k)*d)/a,e=Math.sin(k*d)/a;
this._w=(j*f+this._w*e);this._x=(i*f+this._x*e);this._y=(h*f+this._y*e);this._z=(g*f+this._z*e);
this.onChangeCallback();return this},equals:function(a){return(a._x===this._x)&&(a._y===this._y)&&(a._z===this._z)&&(a._w===this._w)
},fromArray:function(b,a){if(a===undefined){a=0}this._x=b[a];this._y=b[a+1];this._z=b[a+2];
this._w=b[a+3];this.onChangeCallback();return this},toArray:function(b,a){if(b===undefined){b=[]
}if(a===undefined){a=0}b[a]=this._x;b[a+1]=this._y;b[a+2]=this._z;b[a+3]=this._w;
return b},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){},clone:function(){return new THREE.Quaternion(this._x,this._y,this._z,this._w)
}};THREE.Quaternion.slerp=function(d,c,b,a){return b.copy(d).slerp(c,a)};THREE.Vector2=function(a,b){this.x=a||0;
this.y=b||0};THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;
this.y=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;
return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;
break;default:throw new Error("index is out of range: "+a)}},getComponent:function(a){switch(a){case 0:return this.x;
case 1:return this.y;default:throw new Error("index is out of range: "+a)}},copy:function(a){this.x=a.x;
this.y=a.y;return this},add:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
return this.addVectors(b,a)}this.x+=b.x;this.y+=b.y;return this},addScalar:function(a){this.x+=a;
this.y+=a;return this},addVectors:function(d,c){this.x=d.x+c.x;this.y=d.y+c.y;return this
},sub:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
return this.subVectors(b,a)}this.x-=b.x;this.y-=b.y;return this},subScalar:function(a){this.x-=a;
this.y-=a;return this},subVectors:function(d,c){this.x=d.x-c.x;this.y=d.y-c.y;return this
},multiply:function(a){this.x*=a.x;this.y*=a.y;return this},multiplyScalar:function(a){this.x*=a;
this.y*=a;return this},divide:function(a){this.x/=a.x;this.y/=a.y;return this},divideScalar:function(b){if(b!==0){var a=1/b;
this.x*=a;this.y*=a}else{this.x=0;this.y=0}return this},min:function(a){if(this.x>a.x){this.x=a.x
}if(this.y>a.y){this.y=a.y}return this},max:function(a){if(this.x<a.x){this.x=a.x
}if(this.y<a.y){this.y=a.y}return this},clamp:function(b,a){if(this.x<b.x){this.x=b.x
}else{if(this.x>a.x){this.x=a.x}}if(this.y<b.y){this.y=b.y}else{if(this.y>a.y){this.y=a.y
}}return this},clampScalar:(function(){var b,a;return function(c,d){if(b===undefined){b=new THREE.Vector2();
a=new THREE.Vector2()}b.set(c,c);a.set(d,d);return this.clamp(b,a)}})(),floor:function(){this.x=Math.floor(this.x);
this.y=Math.floor(this.y);return this},ceil:function(){this.x=Math.ceil(this.x);
this.y=Math.ceil(this.y);return this},round:function(){this.x=Math.round(this.x);
this.y=Math.round(this.y);return this},roundToZero:function(){this.x=(this.x<0)?Math.ceil(this.x):Math.floor(this.x);
this.y=(this.y<0)?Math.ceil(this.y):Math.floor(this.y);return this},negate:function(){this.x=-this.x;
this.y=-this.y;return this},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y
},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())
},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(c){var b=this.x-c.x,a=this.y-c.y;
return b*b+a*a},setLength:function(a){var b=this.length();if(b!==0&&a!==b){this.multiplyScalar(a/b)
}return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;
return this},lerpVectors:function(c,b,a){this.subVectors(b,c).multiplyScalar(a).add(c);
return this},equals:function(a){return((a.x===this.x)&&(a.y===this.y))},fromArray:function(b,a){if(a===undefined){a=0
}this.x=b[a];this.y=b[a+1];return this},toArray:function(b,a){if(b===undefined){b=[]
}if(a===undefined){a=0}b[a]=this.x;b[a+1]=this.y;return b},fromAttribute:function(b,a,c){if(c===undefined){c=0
}a=a*b.itemSize+c;this.x=b.array[a];this.y=b.array[a+1];return this},clone:function(){return new THREE.Vector2(this.x,this.y)
}};THREE.Vector3=function(a,c,b){this.x=a||0;this.y=c||0;this.z=b||0};THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,c,b){this.x=a;
this.y=c;this.z=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;
return this},setZ:function(a){this.z=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;
break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw new Error("index is out of range: "+a)
}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;
case 2:return this.z;default:throw new Error("index is out of range: "+a)}},copy:function(a){this.x=a.x;
this.y=a.y;this.z=a.z;return this},add:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
return this.addVectors(b,a)}this.x+=b.x;this.y+=b.y;this.z+=b.z;return this},addScalar:function(a){this.x+=a;
this.y+=a;this.z+=a;return this},addVectors:function(d,c){this.x=d.x+c.x;this.y=d.y+c.y;
this.z=d.z+c.z;return this},sub:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
return this.subVectors(b,a)}this.x-=b.x;this.y-=b.y;this.z-=b.z;return this},subScalar:function(a){this.x-=a;
this.y-=a;this.z-=a;return this},subVectors:function(d,c){this.x=d.x-c.x;this.y=d.y-c.y;
this.z=d.z-c.z;return this},multiply:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.");
return this.multiplyVectors(b,a)}this.x*=b.x;this.y*=b.y;this.z*=b.z;return this
},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},multiplyVectors:function(d,c){this.x=d.x*c.x;
this.y=d.y*c.y;this.z=d.z*c.z;return this},applyEuler:function(){var a;return function(b){if(b instanceof THREE.Euler===false){THREE.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.")
}if(a===undefined){a=new THREE.Quaternion()}this.applyQuaternion(a.setFromEuler(b));
return this}}(),applyAxisAngle:function(){var a;return function(b,c){if(a===undefined){a=new THREE.Quaternion()
}this.applyQuaternion(a.setFromAxisAngle(b,c));return this}}(),applyMatrix3:function(b){var a=this.x;
var f=this.y;var d=this.z;var c=b.elements;this.x=c[0]*a+c[3]*f+c[6]*d;this.y=c[1]*a+c[4]*f+c[7]*d;
this.z=c[2]*a+c[5]*f+c[8]*d;return this},applyMatrix4:function(b){var a=this.x,f=this.y,d=this.z;
var c=b.elements;this.x=c[0]*a+c[4]*f+c[8]*d+c[12];this.y=c[1]*a+c[5]*f+c[9]*d+c[13];
this.z=c[2]*a+c[6]*f+c[10]*d+c[14];return this},applyProjection:function(b){var a=this.x,h=this.y,g=this.z;
var c=b.elements;var f=1/(c[3]*a+c[7]*h+c[11]*g+c[15]);this.x=(c[0]*a+c[4]*h+c[8]*g+c[12])*f;
this.y=(c[1]*a+c[5]*h+c[9]*g+c[13])*f;this.z=(c[2]*a+c[6]*h+c[10]*g+c[14])*f;return this
},applyQuaternion:function(a){var l=this.x;var k=this.y;var j=this.z;var h=a.x;
var g=a.y;var f=a.z;var i=a.w;var d=i*l+g*j-f*k;var c=i*k+f*l-h*j;var b=i*j+h*k-g*l;
var e=-h*l-g*k-f*j;this.x=d*i+e*-h+c*-f-b*-g;this.y=c*i+e*-g+b*-h-d*-f;this.z=b*i+e*-f+d*-g-c*-h;
return this},project:function(){var a;return function(b){if(a===undefined){a=new THREE.Matrix4()
}a.multiplyMatrices(b.projectionMatrix,a.getInverse(b.matrixWorld));return this.applyProjection(a)
}}(),unproject:function(){var a;return function(b){if(a===undefined){a=new THREE.Matrix4()
}a.multiplyMatrices(b.matrixWorld,a.getInverse(b.projectionMatrix));return this.applyProjection(a)
}}(),transformDirection:function(b){var a=this.x,f=this.y,d=this.z;var c=b.elements;
this.x=c[0]*a+c[4]*f+c[8]*d;this.y=c[1]*a+c[5]*f+c[9]*d;this.z=c[2]*a+c[6]*f+c[10]*d;
this.normalize();return this},divide:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;
return this},divideScalar:function(b){if(b!==0){var a=1/b;this.x*=a;this.y*=a;this.z*=a
}else{this.x=0;this.y=0;this.z=0}return this},min:function(a){if(this.x>a.x){this.x=a.x
}if(this.y>a.y){this.y=a.y}if(this.z>a.z){this.z=a.z}return this},max:function(a){if(this.x<a.x){this.x=a.x
}if(this.y<a.y){this.y=a.y}if(this.z<a.z){this.z=a.z}return this},clamp:function(b,a){if(this.x<b.x){this.x=b.x
}else{if(this.x>a.x){this.x=a.x}}if(this.y<b.y){this.y=b.y}else{if(this.y>a.y){this.y=a.y
}}if(this.z<b.z){this.z=b.z}else{if(this.z>a.z){this.z=a.z}}return this},clampScalar:(function(){var b,a;
return function(c,d){if(b===undefined){b=new THREE.Vector3();a=new THREE.Vector3()
}b.set(c,c,c);a.set(d,d,d);return this.clamp(b,a)}})(),floor:function(){this.x=Math.floor(this.x);
this.y=Math.floor(this.y);this.z=Math.floor(this.z);return this},ceil:function(){this.x=Math.ceil(this.x);
this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);return this},round:function(){this.x=Math.round(this.x);
this.y=Math.round(this.y);this.z=Math.round(this.z);return this},roundToZero:function(){this.x=(this.x<0)?Math.ceil(this.x):Math.floor(this.x);
this.y=(this.y<0)?Math.ceil(this.y):Math.floor(this.y);this.z=(this.z<0)?Math.ceil(this.z):Math.floor(this.z);
return this},negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;return this
},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z
},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)
},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();
if(b!==0&&a!==b){this.multiplyScalar(a/b)}return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;
this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;return this},lerpVectors:function(c,b,a){this.subVectors(b,c).multiplyScalar(a).add(c);
return this},cross:function(c,b){if(b!==undefined){THREE.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.");
return this.crossVectors(c,b)}var a=this.x,e=this.y,d=this.z;this.x=e*c.z-d*c.y;
this.y=d*c.x-a*c.z;this.z=a*c.y-e*c.x;return this},crossVectors:function(d,c){var h=d.x,f=d.y,e=d.z;
var j=c.x,i=c.y,g=c.z;this.x=f*g-e*i;this.y=e*j-h*g;this.z=h*i-f*j;return this},projectOnVector:function(){var b,a;
return function(c){if(b===undefined){b=new THREE.Vector3()}b.copy(c).normalize();
a=this.dot(b);return this.copy(b).multiplyScalar(a)}}(),projectOnPlane:function(){var a;
return function(b){if(a===undefined){a=new THREE.Vector3()}a.copy(this).projectOnVector(b);
return this.sub(a)}}(),reflect:function(){var a;return function(b){if(a===undefined){a=new THREE.Vector3()
}return this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){var b=this.dot(a)/(this.length()*a.length());
return Math.acos(THREE.Math.clamp(b,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))
},distanceToSquared:function(d){var c=this.x-d.x;var b=this.y-d.y;var a=this.z-d.z;
return c*c+b*b+a*a},setEulerFromRotationMatrix:function(b,a){THREE.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
},setEulerFromQuaternion:function(b,a){THREE.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
},getPositionFromMatrix:function(a){THREE.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
return this.setFromMatrixPosition(a)},getScaleFromMatrix:function(a){THREE.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
return this.setFromMatrixScale(a)},getColumnFromMatrix:function(b,a){THREE.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
return this.setFromMatrixColumn(b,a)},setFromMatrixPosition:function(a){this.x=a.elements[12];
this.y=a.elements[13];this.z=a.elements[14];return this},setFromMatrixScale:function(a){var d=this.set(a.elements[0],a.elements[1],a.elements[2]).length();
var c=this.set(a.elements[4],a.elements[5],a.elements[6]).length();var b=this.set(a.elements[8],a.elements[9],a.elements[10]).length();
this.x=d;this.y=c;this.z=b;return this},setFromMatrixColumn:function(b,a){var d=b*4;
var c=a.elements;this.x=c[d];this.y=c[d+1];this.z=c[d+2];return this},equals:function(a){return((a.x===this.x)&&(a.y===this.y)&&(a.z===this.z))
},fromArray:function(b,a){if(a===undefined){a=0}this.x=b[a];this.y=b[a+1];this.z=b[a+2];
return this},toArray:function(b,a){if(b===undefined){b=[]}if(a===undefined){a=0
}b[a]=this.x;b[a+1]=this.y;b[a+2]=this.z;return b},fromAttribute:function(b,a,c){if(c===undefined){c=0
}a=a*b.itemSize+c;this.x=b.array[a];this.y=b.array[a+1];this.z=b.array[a+2];return this
},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}};THREE.Vector4=function(a,d,c,b){this.x=a||0;
this.y=d||0;this.z=c||0;this.w=(b!==undefined)?b:1};THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,d,c,b){this.x=a;
this.y=d;this.z=c;this.w=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;
return this},setZ:function(a){this.z=a;return this},setW:function(a){this.w=a;return this
},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;
case 2:this.z=b;break;case 3:this.w=b;break;default:throw new Error("index is out of range: "+a)
}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;
case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+a)
}},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=(a.w!==undefined)?a.w:1;
return this},add:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
return this.addVectors(b,a)}this.x+=b.x;this.y+=b.y;this.z+=b.z;this.w+=b.w;return this
},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;this.w+=a;return this},addVectors:function(d,c){this.x=d.x+c.x;
this.y=d.y+c.y;this.z=d.z+c.z;this.w=d.w+c.w;return this},sub:function(b,a){if(a!==undefined){THREE.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
return this.subVectors(b,a)}this.x-=b.x;this.y-=b.y;this.z-=b.z;this.w-=b.w;return this
},subScalar:function(a){this.x-=a;this.y-=a;this.z-=a;this.w-=a;return this},subVectors:function(d,c){this.x=d.x-c.x;
this.y=d.y-c.y;this.z=d.z-c.z;this.w=d.w-c.w;return this},multiplyScalar:function(a){this.x*=a;
this.y*=a;this.z*=a;this.w*=a;return this},applyMatrix4:function(b){var a=this.x;
var g=this.y;var f=this.z;var c=this.w;var d=b.elements;this.x=d[0]*a+d[4]*g+d[8]*f+d[12]*c;
this.y=d[1]*a+d[5]*g+d[9]*f+d[13]*c;this.z=d[2]*a+d[6]*g+d[10]*f+d[14]*c;this.w=d[3]*a+d[7]*g+d[11]*f+d[15]*c;
return this},divideScalar:function(b){if(b!==0){var a=1/b;this.x*=a;this.y*=a;this.z*=a;
this.w*=a}else{this.x=0;this.y=0;this.z=0;this.w=1}return this},setAxisAngleFromQuaternion:function(b){this.w=2*Math.acos(b.w);
var a=Math.sqrt(1-b.w*b.w);if(a<0.0001){this.x=1;this.y=0;this.z=0}else{this.x=b.x/a;
this.y=b.y/a;this.z=b.z/a}return this},setAxisAngleFromRotationMatrix:function(t){var u,j,i,h,D=0.01,k=0.1,g=t.elements,C=g[0],A=g[4],v=g[8],e=g[1],c=g[5],a=g[9],r=g[2],p=g[6],n=g[10];
if((Math.abs(A-e)<D)&&(Math.abs(v-r)<D)&&(Math.abs(a-p)<D)){if((Math.abs(A+e)<k)&&(Math.abs(v+r)<k)&&(Math.abs(a+p)<k)&&(Math.abs(C+c+n-3)<k)){this.set(1,0,0,0);
return this}u=Math.PI;var f=(C+1)/2;var q=(c+1)/2;var B=(n+1)/2;var d=(A+e)/4;var b=(v+r)/4;
var o=(a+p)/4;if((f>q)&&(f>B)){if(f<D){j=0;i=0.707106781;h=0.707106781}else{j=Math.sqrt(f);
i=d/j;h=b/j}}else{if(q>B){if(q<D){j=0.707106781;i=0;h=0.707106781}else{i=Math.sqrt(q);
j=d/i;h=o/i}}else{if(B<D){j=0.707106781;i=0.707106781;h=0}else{h=Math.sqrt(B);j=b/h;
i=o/h}}}this.set(j,i,h,u);return this}var l=Math.sqrt((p-a)*(p-a)+(v-r)*(v-r)+(e-A)*(e-A));
if(Math.abs(l)<0.001){l=1}this.x=(p-a)/l;this.y=(v-r)/l;this.z=(e-A)/l;this.w=Math.acos((C+c+n-1)/2);
return this},min:function(a){if(this.x>a.x){this.x=a.x}if(this.y>a.y){this.y=a.y
}if(this.z>a.z){this.z=a.z}if(this.w>a.w){this.w=a.w}return this},max:function(a){if(this.x<a.x){this.x=a.x
}if(this.y<a.y){this.y=a.y}if(this.z<a.z){this.z=a.z}if(this.w<a.w){this.w=a.w}return this
},clamp:function(b,a){if(this.x<b.x){this.x=b.x}else{if(this.x>a.x){this.x=a.x}}if(this.y<b.y){this.y=b.y
}else{if(this.y>a.y){this.y=a.y}}if(this.z<b.z){this.z=b.z}else{if(this.z>a.z){this.z=a.z
}}if(this.w<b.w){this.w=b.w}else{if(this.w>a.w){this.w=a.w}}return this},clampScalar:(function(){var b,a;
return function(c,d){if(b===undefined){b=new THREE.Vector4();a=new THREE.Vector4()
}b.set(c,c,c,c);a.set(d,d,d,d);return this.clamp(b,a)}})(),floor:function(){this.x=Math.floor(this.x);
this.y=Math.floor(this.y);this.z=Math.floor(this.z);this.w=Math.floor(this.w);return this
},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);
this.w=Math.ceil(this.w);return this},round:function(){this.x=Math.round(this.x);
this.y=Math.round(this.y);this.z=Math.round(this.z);this.w=Math.round(this.w);return this
},roundToZero:function(){this.x=(this.x<0)?Math.ceil(this.x):Math.floor(this.x);
this.y=(this.y<0)?Math.ceil(this.y):Math.floor(this.y);this.z=(this.z<0)?Math.ceil(this.z):Math.floor(this.z);
this.w=(this.w<0)?Math.ceil(this.w):Math.floor(this.w);return this},negate:function(){this.x=-this.x;
this.y=-this.y;this.z=-this.z;this.w=-this.w;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w
},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w
},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)
},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)
},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();
if(b!==0&&a!==b){this.multiplyScalar(a/b)}return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;
this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this
},lerpVectors:function(c,b,a){this.subVectors(b,c).multiplyScalar(a).add(c);return this
},equals:function(a){return((a.x===this.x)&&(a.y===this.y)&&(a.z===this.z)&&(a.w===this.w))
},fromArray:function(b,a){if(a===undefined){a=0}this.x=b[a];this.y=b[a+1];this.z=b[a+2];
this.w=b[a+3];return this},toArray:function(b,a){if(b===undefined){b=[]}if(a===undefined){a=0
}b[a]=this.x;b[a+1]=this.y;b[a+2]=this.z;b[a+3]=this.w;return b},fromAttribute:function(b,a,c){if(c===undefined){c=0
}a=a*b.itemSize+c;this.x=b.array[a];this.y=b.array[a+1];this.z=b.array[a+2];this.w=b.array[a+3];
return this},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)
}};THREE.Euler=function(b,d,c,a){this._x=b||0;this._y=d||0;this._z=c||0;this._order=a||THREE.Euler.DefaultOrder
};THREE.Euler.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];THREE.Euler.DefaultOrder="XYZ";
THREE.Euler.prototype={constructor:THREE.Euler,_x:0,_y:0,_z:0,_order:THREE.Euler.DefaultOrder,get x(){return this._x
},set x(a){this._x=a;this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a;
this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a;this.onChangeCallback()
},get order(){return this._order},set order(a){this._order=a;this.onChangeCallback()
},set:function(b,d,c,a){this._x=b;this._y=d;this._z=c;this._order=a||this._order;
this.onChangeCallback();return this},copy:function(a){this._x=a._x;this._y=a._y;
this._z=a._z;this._order=a._order;this.onChangeCallback();return this},setFromRotationMatrix:function(e,f,g){var j=THREE.Math.clamp;
var d=e.elements;var k=d[0],i=d[4],h=d[8];var c=d[1],b=d[5],a=d[9];var o=d[2],n=d[6],l=d[10];
f=f||this._order;if(f==="XYZ"){this._y=Math.asin(j(h,-1,1));if(Math.abs(h)<0.99999){this._x=Math.atan2(-a,l);
this._z=Math.atan2(-i,k)}else{this._x=Math.atan2(n,b);this._z=0}}else{if(f==="YXZ"){this._x=Math.asin(-j(a,-1,1));
if(Math.abs(a)<0.99999){this._y=Math.atan2(h,l);this._z=Math.atan2(c,b)}else{this._y=Math.atan2(-o,k);
this._z=0}}else{if(f==="ZXY"){this._x=Math.asin(j(n,-1,1));if(Math.abs(n)<0.99999){this._y=Math.atan2(-o,l);
this._z=Math.atan2(-i,b)}else{this._y=0;this._z=Math.atan2(c,k)}}else{if(f==="ZYX"){this._y=Math.asin(-j(o,-1,1));
if(Math.abs(o)<0.99999){this._x=Math.atan2(n,l);this._z=Math.atan2(c,k)}else{this._x=0;
this._z=Math.atan2(-i,b)}}else{if(f==="YZX"){this._z=Math.asin(j(c,-1,1));if(Math.abs(c)<0.99999){this._x=Math.atan2(-a,b);
this._y=Math.atan2(-o,k)}else{this._x=0;this._y=Math.atan2(h,l)}}else{if(f==="XZY"){this._z=Math.asin(-j(i,-1,1));
if(Math.abs(i)<0.99999){this._x=Math.atan2(n,b);this._y=Math.atan2(h,k)}else{this._x=Math.atan2(-a,l);
this._y=0}}else{THREE.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+f)
}}}}}}this._order=f;if(g!==false){this.onChangeCallback()}return this},setFromQuaternion:function(){var a;
return function(c,b,d){if(a===undefined){a=new THREE.Matrix4()}a.makeRotationFromQuaternion(c);
this.setFromRotationMatrix(a,b,d);return this}}(),setFromVector3:function(b,a){return this.set(b.x,b.y,b.z,a||this._order)
},reorder:function(){var a=new THREE.Quaternion();return function(b){a.setFromEuler(this);
this.setFromQuaternion(a,b)}}(),equals:function(a){return(a._x===this._x)&&(a._y===this._y)&&(a._z===this._z)&&(a._order===this._order)
},fromArray:function(a){this._x=a[0];this._y=a[1];this._z=a[2];if(a[3]!==undefined){this._order=a[3]
}this.onChangeCallback();return this},toArray:function(b,a){if(b===undefined){b=[]
}if(a===undefined){a=0}b[a]=this._x;b[a+1]=this._y;b[a+2]=this._z;b[a+3]=this._order;
return b},toVector3:function(a){if(a){return a.set(this._x,this._y,this._z)}else{return new THREE.Vector3(this._x,this._y,this._z)
}},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){},clone:function(){return new THREE.Euler(this._x,this._y,this._z,this._order)
}};THREE.Line3=function(b,a){this.start=(b!==undefined)?b:new THREE.Vector3();this.end=(a!==undefined)?a:new THREE.Vector3()
};THREE.Line3.prototype={constructor:THREE.Line3,set:function(b,a){this.start.copy(b);
this.end.copy(a);return this},copy:function(a){this.start.copy(a.start);this.end.copy(a.end);
return this},center:function(b){var a=b||new THREE.Vector3();return a.addVectors(this.start,this.end).multiplyScalar(0.5)
},delta:function(b){var a=b||new THREE.Vector3();return a.subVectors(this.end,this.start)
},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)
},at:function(c,b){var a=b||new THREE.Vector3();return this.delta(a).multiplyScalar(c).add(this.start)
},closestPointToPointParameter:function(){var b=new THREE.Vector3();var a=new THREE.Vector3();
return function(c,g){b.subVectors(c,this.start);a.subVectors(this.end,this.start);
var f=a.dot(a);var e=a.dot(b);var d=e/f;if(g){d=THREE.Math.clamp(d,0,1)}return d
}}(),closestPointToPoint:function(b,e,d){var c=this.closestPointToPointParameter(b,e);
var a=d||new THREE.Vector3();return this.delta(a).multiplyScalar(c).add(this.start)
},applyMatrix4:function(a){this.start.applyMatrix4(a);this.end.applyMatrix4(a);
return this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)
},clone:function(){return new THREE.Line3().copy(this)}};THREE.Box2=function(b,a){this.min=(b!==undefined)?b:new THREE.Vector2(Infinity,Infinity);
this.max=(a!==undefined)?a:new THREE.Vector2(-Infinity,-Infinity)};THREE.Box2.prototype={constructor:THREE.Box2,set:function(b,a){this.min.copy(b);
this.max.copy(a);return this},setFromPoints:function(c){this.makeEmpty();for(var b=0,a=c.length;
b<a;b++){this.expandByPoint(c[b])}return this},setFromCenterAndSize:function(){var a=new THREE.Vector2();
return function(b,d){var c=a.copy(d).multiplyScalar(0.5);this.min.copy(b).sub(c);
this.max.copy(b).add(c);return this}}(),copy:function(a){this.min.copy(a.min);this.max.copy(a.max);
return this},makeEmpty:function(){this.min.x=this.min.y=Infinity;this.max.x=this.max.y=-Infinity;
return this},empty:function(){return(this.max.x<this.min.x)||(this.max.y<this.min.y)
},center:function(b){var a=b||new THREE.Vector2();return a.addVectors(this.min,this.max).multiplyScalar(0.5)
},size:function(b){var a=b||new THREE.Vector2();return a.subVectors(this.max,this.min)
},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);
this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);
this.max.addScalar(a);return this},containsPoint:function(a){if(a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y){return false
}return true},containsBox:function(a){if((this.min.x<=a.min.x)&&(a.max.x<=this.max.x)&&(this.min.y<=a.min.y)&&(a.max.y<=this.max.y)){return true
}return false},getParameter:function(b,c){var a=c||new THREE.Vector2();return a.set((b.x-this.min.x)/(this.max.x-this.min.x),(b.y-this.min.y)/(this.max.y-this.min.y))
},isIntersectionBox:function(a){if(a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y){return false
}return true},clampPoint:function(b,c){var a=c||new THREE.Vector2();return a.copy(b).clamp(this.min,this.max)
},distanceToPoint:function(){var a=new THREE.Vector2();return function(b){var c=a.copy(b).clamp(this.min,this.max);
return c.sub(b).length()}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);
return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this
},translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)
},clone:function(){return new THREE.Box2().copy(this)}};THREE.Box3=function(b,a){this.min=(b!==undefined)?b:new THREE.Vector3(Infinity,Infinity,Infinity);
this.max=(a!==undefined)?a:new THREE.Vector3(-Infinity,-Infinity,-Infinity)};THREE.Box3.prototype={constructor:THREE.Box3,set:function(b,a){this.min.copy(b);
this.max.copy(a);return this},setFromPoints:function(c){this.makeEmpty();for(var b=0,a=c.length;
b<a;b++){this.expandByPoint(c[b])}return this},setFromCenterAndSize:function(){var a=new THREE.Vector3();
return function(b,d){var c=a.copy(d).multiplyScalar(0.5);this.min.copy(b).sub(c);
this.max.copy(b).add(c);return this}}(),setFromObject:function(){var a=new THREE.Vector3();
return function(b){var c=this;b.updateMatrixWorld(true);this.makeEmpty();b.traverse(function(h){var j=h.geometry;
if(j!==undefined){if(j instanceof THREE.Geometry){var f=j.vertices;for(var g=0,e=f.length;
g<e;g++){a.copy(f[g]);a.applyMatrix4(h.matrixWorld);c.expandByPoint(a)}}else{if(j instanceof THREE.BufferGeometry&&j.attributes.position!==undefined){var d=j.attributes.position.array;
for(var g=0,e=d.length;g<e;g+=3){a.set(d[g],d[g+1],d[g+2]);a.applyMatrix4(h.matrixWorld);
c.expandByPoint(a)}}}}});return this}}(),copy:function(a){this.min.copy(a.min);
this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=this.min.z=Infinity;
this.max.x=this.max.y=this.max.z=-Infinity;return this},empty:function(){return(this.max.x<this.min.x)||(this.max.y<this.min.y)||(this.max.z<this.min.z)
},center:function(b){var a=b||new THREE.Vector3();return a.addVectors(this.min,this.max).multiplyScalar(0.5)
},size:function(b){var a=b||new THREE.Vector3();return a.subVectors(this.max,this.min)
},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);
this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);
this.max.addScalar(a);return this},containsPoint:function(a){if(a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z){return false
}return true},containsBox:function(a){if((this.min.x<=a.min.x)&&(a.max.x<=this.max.x)&&(this.min.y<=a.min.y)&&(a.max.y<=this.max.y)&&(this.min.z<=a.min.z)&&(a.max.z<=this.max.z)){return true
}return false},getParameter:function(b,c){var a=c||new THREE.Vector3();return a.set((b.x-this.min.x)/(this.max.x-this.min.x),(b.y-this.min.y)/(this.max.y-this.min.y),(b.z-this.min.z)/(this.max.z-this.min.z))
},isIntersectionBox:function(a){if(a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z){return false
}return true},clampPoint:function(b,c){var a=c||new THREE.Vector3();return a.copy(b).clamp(this.min,this.max)
},distanceToPoint:function(){var a=new THREE.Vector3();return function(b){var c=a.copy(b).clamp(this.min,this.max);
return c.sub(b).length()}}(),getBoundingSphere:function(){var a=new THREE.Vector3();
return function(c){var b=c||new THREE.Sphere();b.center=this.center();b.radius=this.size(a).length()*0.5;
return b}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this
},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},applyMatrix4:function(){var a=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()];
return function(b){a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b);a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b);
a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b);a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b);
a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b);a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b);
a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b);a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b);
this.makeEmpty();this.setFromPoints(a);return this}}(),translate:function(a){this.min.add(a);
this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)
},clone:function(){return new THREE.Box3().copy(this)}};THREE.Matrix3=function(){this.elements=new Float32Array([1,0,0,0,1,0,0,0,1]);
if(arguments.length>0){THREE.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
}};THREE.Matrix3.prototype={constructor:THREE.Matrix3,set:function(h,g,f,e,d,c,a,j,i){var b=this.elements;
b[0]=h;b[3]=g;b[6]=f;b[1]=e;b[4]=d;b[7]=c;b[2]=a;b[5]=j;b[8]=i;return this},identity:function(){this.set(1,0,0,0,1,0,0,0,1);
return this},copy:function(a){var b=a.elements;this.set(b[0],b[3],b[6],b[1],b[4],b[7],b[2],b[5],b[8]);
return this},multiplyVector3:function(a){THREE.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
return a.applyMatrix3(this)},multiplyVector3Array:function(b){THREE.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
return this.applyToVector3Array(b)},applyToVector3Array:function(){var a=new THREE.Vector3();
return function(f,e,d){if(e===undefined){e=0}if(d===undefined){d=f.length}for(var c=0,b=e;
c<d;c+=3,b+=3){a.x=f[b];a.y=f[b+1];a.z=f[b+2];a.applyMatrix3(this);f[b]=a.x;f[b+1]=a.y;
f[b+2]=a.z}return f}}(),multiplyScalar:function(a){var b=this.elements;b[0]*=a;
b[3]*=a;b[6]*=a;b[1]*=a;b[4]*=a;b[7]*=a;b[2]*=a;b[5]*=a;b[8]*=a;return this},determinant:function(){var j=this.elements;
var s=j[0],r=j[1],q=j[2],p=j[3],o=j[4],n=j[5],m=j[6],l=j[7],k=j[8];return s*o*k-s*n*l-r*p*k+r*n*m+q*p*l-q*o*m
},getInverse:function(b,a){var d=b.elements;var f=this.elements;f[0]=d[10]*d[5]-d[6]*d[9];
f[1]=-d[10]*d[1]+d[2]*d[9];f[2]=d[6]*d[1]-d[2]*d[5];f[3]=-d[10]*d[4]+d[6]*d[8];
f[4]=d[10]*d[0]-d[2]*d[8];f[5]=-d[6]*d[0]+d[2]*d[4];f[6]=d[9]*d[4]-d[5]*d[8];f[7]=-d[9]*d[0]+d[1]*d[8];
f[8]=d[5]*d[0]-d[1]*d[4];var c=d[0]*f[0]+d[1]*f[3]+d[2]*f[6];if(c===0){var e="Matrix3.getInverse(): can't invert matrix, determinant is 0";
if(a||false){throw new Error(e)}else{THREE.warn(e)}this.identity();return this}this.multiplyScalar(1/c);
return this},transpose:function(){var b,a=this.elements;b=a[1];a[1]=a[3];a[3]=b;
b=a[2];a[2]=a[6];a[6]=b;b=a[5];a[5]=a[7];a[7]=b;return this},flattenToArrayOffset:function(c,b){var a=this.elements;
c[b]=a[0];c[b+1]=a[1];c[b+2]=a[2];c[b+3]=a[3];c[b+4]=a[4];c[b+5]=a[5];c[b+6]=a[6];
c[b+7]=a[7];c[b+8]=a[8];return c},getNormalMatrix:function(a){this.getInverse(a).transpose();
return this},transposeIntoArray:function(b){var a=this.elements;b[0]=a[0];b[1]=a[3];
b[2]=a[6];b[3]=a[1];b[4]=a[4];b[5]=a[7];b[6]=a[2];b[7]=a[5];b[8]=a[8];return this
},fromArray:function(a){this.elements.set(a);return this},toArray:function(){var a=this.elements;
return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]]},clone:function(){return new THREE.Matrix3().fromArray(this.elements)
}};THREE.Matrix4=function(){this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
if(arguments.length>0){THREE.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
}};THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(n,m,k,i,f,e,d,c,a,q,p,o,l,j,h,g){var b=this.elements;
b[0]=n;b[4]=m;b[8]=k;b[12]=i;b[1]=f;b[5]=e;b[9]=d;b[13]=c;b[2]=a;b[6]=q;b[10]=p;
b[14]=o;b[3]=l;b[7]=j;b[11]=h;b[15]=g;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
return this},copy:function(a){this.elements.set(a.elements);return this},extractPosition:function(a){THREE.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
return this.copyPosition(a)},copyPosition:function(a){var c=this.elements;var b=a.elements;
c[12]=b[12];c[13]=b[13];c[14]=b[14];return this},extractBasis:function(b,a,c){var d=this.elements;
b.set(d[0],d[1],d[2]);a.set(d[4],d[5],d[6]);c.set(d[8],d[9],d[10]);return this},makeBasis:function(b,a,c){this.set(b.x,a.x,c.x,0,b.y,a.y,c.y,0,b.z,a.z,c.z,0,0,0,0,1);
return this},extractRotation:function(){var a=new THREE.Vector3();return function(b){var g=this.elements;
var f=b.elements;var e=1/a.set(f[0],f[1],f[2]).length();var d=1/a.set(f[4],f[5],f[6]).length();
var c=1/a.set(f[8],f[9],f[10]).length();g[0]=f[0]*e;g[1]=f[1]*e;g[2]=f[2]*e;g[4]=f[4]*d;
g[5]=f[5]*d;g[6]=f[6]*d;g[8]=f[8]*c;g[9]=f[9]*c;g[10]=f[10]*c;return this}}(),makeRotationFromEuler:function(o){if(o instanceof THREE.Euler===false){THREE.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.")
}var k=this.elements;var n=o.x,m=o.y,l=o.z;var G=Math.cos(n),F=Math.sin(n);var D=Math.cos(m),A=Math.sin(m);
var t=Math.cos(l),r=Math.sin(l);if(o.order==="XYZ"){var v=G*t,s=G*r,h=F*t,g=F*r;
k[0]=D*t;k[4]=-D*r;k[8]=A;k[1]=s+h*A;k[5]=v-g*A;k[9]=-F*D;k[2]=g-v*A;k[6]=h+s*A;
k[10]=G*D}else{if(o.order==="YXZ"){var q=D*t,p=D*r,C=A*t,u=A*r;k[0]=q+u*F;k[4]=C*F-p;
k[8]=G*A;k[1]=G*r;k[5]=G*t;k[9]=-F;k[2]=p*F-C;k[6]=u+q*F;k[10]=G*D}else{if(o.order==="ZXY"){var q=D*t,p=D*r,C=A*t,u=A*r;
k[0]=q-u*F;k[4]=-G*r;k[8]=C+p*F;k[1]=p+C*F;k[5]=G*t;k[9]=u-q*F;k[2]=-G*A;k[6]=F;
k[10]=G*D}else{if(o.order==="ZYX"){var v=G*t,s=G*r,h=F*t,g=F*r;k[0]=D*t;k[4]=h*A-s;
k[8]=v*A+g;k[1]=D*r;k[5]=g*A+v;k[9]=s*A-h;k[2]=-A;k[6]=F*D;k[10]=G*D}else{if(o.order==="YZX"){var E=G*D,B=G*A,j=F*D,i=F*A;
k[0]=D*t;k[4]=i-E*r;k[8]=j*r+B;k[1]=r;k[5]=G*t;k[9]=-F*t;k[2]=-A*t;k[6]=B*r+j;k[10]=E-i*r
}else{if(o.order==="XZY"){var E=G*D,B=G*A,j=F*D,i=F*A;k[0]=D*t;k[4]=-r;k[8]=A*t;
k[1]=E*r+i;k[5]=G*t;k[9]=B*r-j;k[2]=j*r-B;k[6]=F*t;k[10]=i*r+E}}}}}}k[3]=0;k[7]=0;
k[11]=0;k[12]=0;k[13]=0;k[14]=0;k[15]=1;return this},setRotationFromQuaternion:function(a){THREE.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
return this.makeRotationFromQuaternion(a)},makeRotationFromQuaternion:function(l){var e=this.elements;
var h=l.x,g=l.y,f=l.z,i=l.w;var n=h+h,a=g+g,j=f+f;var d=h*n,c=h*a,b=h*j;var m=g*a,k=g*j,r=f*j;
var s=i*n,p=i*a,o=i*j;e[0]=1-(m+r);e[4]=c-o;e[8]=b+p;e[1]=c+o;e[5]=1-(d+r);e[9]=k-s;
e[2]=b-p;e[6]=k+s;e[10]=1-(d+m);e[3]=0;e[7]=0;e[11]=0;e[12]=0;e[13]=0;e[14]=0;e[15]=1;
return this},lookAt:function(){var a=new THREE.Vector3();var c=new THREE.Vector3();
var b=new THREE.Vector3();return function(e,f,d){var g=this.elements;b.subVectors(e,f).normalize();
if(b.length()===0){b.z=1}a.crossVectors(d,b).normalize();if(a.length()===0){b.x+=0.0001;
a.crossVectors(d,b).normalize()}c.crossVectors(b,a);g[0]=a.x;g[4]=c.x;g[8]=b.x;
g[1]=a.y;g[5]=c.y;g[9]=b.y;g[2]=a.z;g[6]=c.z;g[10]=b.z;return this}}(),multiply:function(a,b){if(b!==undefined){THREE.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");
return this.multiplyMatrices(a,b)}return this.multiplyMatrices(this,a)},multiplyMatrices:function(Q,P){var s=Q.elements;
var O=P.elements;var c=this.elements;var p=s[0],n=s[4],m=s[8],l=s[12];var N=s[1],M=s[5],L=s[9],K=s[13];
var F=s[2],E=s[6],D=s[10],C=s[14];var t=s[3],r=s[7],q=s[11],o=s[15];var i=O[0],g=O[4],e=O[8],d=O[12];
var J=O[1],I=O[5],H=O[9],G=O[13];var B=O[2],A=O[6],v=O[10],u=O[14];var k=O[3],j=O[7],h=O[11],f=O[15];
c[0]=p*i+n*J+m*B+l*k;c[4]=p*g+n*I+m*A+l*j;c[8]=p*e+n*H+m*v+l*h;c[12]=p*d+n*G+m*u+l*f;
c[1]=N*i+M*J+L*B+K*k;c[5]=N*g+M*I+L*A+K*j;c[9]=N*e+M*H+L*v+K*h;c[13]=N*d+M*G+L*u+K*f;
c[2]=F*i+E*J+D*B+C*k;c[6]=F*g+E*I+D*A+C*j;c[10]=F*e+E*H+D*v+C*h;c[14]=F*d+E*G+D*u+C*f;
c[3]=t*i+r*J+q*B+o*k;c[7]=t*g+r*I+q*A+o*j;c[11]=t*e+r*H+q*v+o*h;c[15]=t*d+r*G+q*u+o*f;
return this},multiplyToArray:function(d,c,e){var f=this.elements;this.multiplyMatrices(d,c);
e[0]=f[0];e[1]=f[1];e[2]=f[2];e[3]=f[3];e[4]=f[4];e[5]=f[5];e[6]=f[6];e[7]=f[7];
e[8]=f[8];e[9]=f[9];e[10]=f[10];e[11]=f[11];e[12]=f[12];e[13]=f[13];e[14]=f[14];
e[15]=f[15];return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;
b[4]*=a;b[8]*=a;b[12]*=a;b[1]*=a;b[5]*=a;b[9]*=a;b[13]*=a;b[2]*=a;b[6]*=a;b[10]*=a;
b[14]*=a;b[3]*=a;b[7]*=a;b[11]*=a;b[15]*=a;return this},multiplyVector3:function(a){THREE.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
return a.applyProjection(this)},multiplyVector4:function(a){THREE.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
return a.applyMatrix4(this)},multiplyVector3Array:function(b){THREE.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
return this.applyToVector3Array(b)},applyToVector3Array:function(){var a=new THREE.Vector3();
return function(f,e,d){if(e===undefined){e=0}if(d===undefined){d=f.length}for(var c=0,b=e;
c<d;c+=3,b+=3){a.x=f[b];a.y=f[b+1];a.z=f[b+2];a.applyMatrix4(this);f[b]=a.x;f[b+1]=a.y;
f[b+2]=a.z}return f}}(),rotateAxis:function(a){THREE.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
a.transformDirection(this)},crossVector:function(a){THREE.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
return a.applyMatrix4(this)},determinant:function(){var c=this.elements;var n=c[0],m=c[4],k=c[8],i=c[12];
var f=c[1],e=c[5],d=c[9],b=c[13];var a=c[2],q=c[6],p=c[10],o=c[14];var l=c[3],j=c[7],h=c[11],g=c[15];
return(l*(+i*d*q-k*b*q-i*e*p+m*b*p+k*e*o-m*d*o)+j*(+n*d*o-n*b*p+i*f*p-k*f*o+k*b*a-i*d*a)+h*(+n*b*q-n*e*o-i*f*q+m*f*o+i*e*a-m*b*a)+g*(-k*e*a-n*d*q+n*e*p+k*f*q-m*f*p+m*d*a))
},transpose:function(){var b=this.elements;var a;a=b[1];b[1]=b[4];b[4]=a;a=b[2];
b[2]=b[8];b[8]=a;a=b[6];b[6]=b[9];b[9]=a;a=b[3];b[3]=b[12];b[12]=a;a=b[7];b[7]=b[13];
b[13]=a;a=b[11];b[11]=b[14];b[14]=a;return this},flattenToArrayOffset:function(c,b){var a=this.elements;
c[b]=a[0];c[b+1]=a[1];c[b+2]=a[2];c[b+3]=a[3];c[b+4]=a[4];c[b+5]=a[5];c[b+6]=a[6];
c[b+7]=a[7];c[b+8]=a[8];c[b+9]=a[9];c[b+10]=a[10];c[b+11]=a[11];c[b+12]=a[12];c[b+13]=a[13];
c[b+14]=a[14];c[b+15]=a[15];return c},getPosition:function(){var a=new THREE.Vector3();
return function(){THREE.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
var b=this.elements;return a.set(b[12],b[13],b[14])}}(),setPosition:function(a){var b=this.elements;
b[12]=a.x;b[13]=a.y;b[14]=a.z;return this},getInverse:function(r,h){var g=this.elements;
var A=r.elements;var p=A[0],n=A[4],k=A[8],i=A[12];var v=A[1],u=A[5],t=A[9],s=A[13];
var d=A[2],c=A[6],b=A[10],a=A[14];var q=A[3],o=A[7],l=A[11],j=A[15];g[0]=t*a*o-s*b*o+s*c*l-u*a*l-t*c*j+u*b*j;
g[4]=i*b*o-k*a*o-i*c*l+n*a*l+k*c*j-n*b*j;g[8]=k*s*o-i*t*o+i*u*l-n*s*l-k*u*j+n*t*j;
g[12]=i*t*c-k*s*c-i*u*b+n*s*b+k*u*a-n*t*a;g[1]=s*b*q-t*a*q-s*d*l+v*a*l+t*d*j-v*b*j;
g[5]=k*a*q-i*b*q+i*d*l-p*a*l-k*d*j+p*b*j;g[9]=i*t*q-k*s*q-i*v*l+p*s*l+k*v*j-p*t*j;
g[13]=k*s*d-i*t*d+i*v*b-p*s*b-k*v*a+p*t*a;g[2]=u*a*q-s*c*q+s*d*o-v*a*o-u*d*j+v*c*j;
g[6]=i*c*q-n*a*q-i*d*o+p*a*o+n*d*j-p*c*j;g[10]=n*s*q-i*u*q+i*v*o-p*s*o-n*v*j+p*u*j;
g[14]=i*u*d-n*s*d-i*v*c+p*s*c+n*v*a-p*u*a;g[3]=t*c*q-u*b*q-t*d*o+v*b*o+u*d*l-v*c*l;
g[7]=n*b*q-k*c*q+k*d*o-p*b*o-n*d*l+p*c*l;g[11]=k*u*q-n*t*q-k*v*o+p*t*o+n*v*l-p*u*l;
g[15]=n*t*d-k*u*d+k*v*c-p*t*c-n*v*b+p*u*b;var e=p*g[0]+v*g[4]+d*g[8]+q*g[12];if(e==0){var f="THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
if(h||false){throw new Error(f)}else{THREE.warn(f)}this.identity();return this}this.multiplyScalar(1/e);
return this},translate:function(a){THREE.error("THREE.Matrix4: .translate() has been removed.")
},rotateX:function(a){THREE.error("THREE.Matrix4: .rotateX() has been removed.")
},rotateY:function(a){THREE.error("THREE.Matrix4: .rotateY() has been removed.")
},rotateZ:function(a){THREE.error("THREE.Matrix4: .rotateZ() has been removed.")
},rotateByAxis:function(a,b){THREE.error("THREE.Matrix4: .rotateByAxis() has been removed.")
},scale:function(b){var d=this.elements;var a=b.x,e=b.y,c=b.z;d[0]*=a;d[4]*=e;d[8]*=c;
d[1]*=a;d[5]*=e;d[9]*=c;d[2]*=a;d[6]*=e;d[10]*=c;d[3]*=a;d[7]*=e;d[11]*=c;return this
},getMaxScaleOnAxis:function(){var c=this.elements;var d=c[0]*c[0]+c[1]*c[1]+c[2]*c[2];
var b=c[4]*c[4]+c[5]*c[5]+c[6]*c[6];var a=c[8]*c[8]+c[9]*c[9]+c[10]*c[10];return Math.sqrt(Math.max(d,Math.max(b,a)))
},makeTranslation:function(a,c,b){this.set(1,0,0,a,0,1,0,c,0,0,1,b,0,0,0,1);return this
},makeRotationX:function(a){var d=Math.cos(a),b=Math.sin(a);this.set(1,0,0,0,0,d,-b,0,0,b,d,0,0,0,0,1);
return this},makeRotationY:function(a){var d=Math.cos(a),b=Math.sin(a);this.set(d,0,b,0,0,1,0,0,-b,0,d,0,0,0,0,1);
return this},makeRotationZ:function(a){var d=Math.cos(a),b=Math.sin(a);this.set(d,-b,0,0,b,d,0,0,0,0,1,0,0,0,0,1);
return this},makeRotationAxis:function(a,b){var f=Math.cos(b);var k=Math.sin(b);
var j=1-f;var i=a.x,h=a.y,g=a.z;var e=j*i,d=j*h;this.set(e*i+f,e*h-k*g,e*g+k*h,0,e*h+k*g,d*h+f,d*g-k*i,0,e*g-k*h,d*g+k*i,j*g*g+f,0,0,0,0,1);
return this},makeScale:function(a,c,b){this.set(a,0,0,0,0,c,0,0,0,0,b,0,0,0,0,1);
return this},compose:function(a,b,c){this.makeRotationFromQuaternion(b);this.scale(c);
this.setPosition(a);return this},decompose:function(){var a=new THREE.Vector3();
var b=new THREE.Matrix4();return function(i,h,g){var f=this.elements;var m=a.set(f[0],f[1],f[2]).length();
var l=a.set(f[4],f[5],f[6]).length();var k=a.set(f[8],f[9],f[10]).length();var j=this.determinant();
if(j<0){m=-m}i.x=f[12];i.y=f[13];i.z=f[14];b.elements.set(this.elements);var e=1/m;
var d=1/l;var c=1/k;b.elements[0]*=e;b.elements[1]*=e;b.elements[2]*=e;b.elements[4]*=d;
b.elements[5]*=d;b.elements[6]*=d;b.elements[8]*=c;b.elements[9]*=c;b.elements[10]*=c;
h.setFromRotationMatrix(b);g.x=m;g.y=l;g.z=k;return this}}(),makeFrustum:function(g,q,e,n,i,h){var f=this.elements;
var p=2*i/(q-g);var m=2*i/(n-e);var o=(q+g)/(q-g);var l=(n+e)/(n-e);var k=-(h+i)/(h-i);
var j=-2*h*i/(h-i);f[0]=p;f[4]=0;f[8]=o;f[12]=0;f[1]=0;f[5]=m;f[9]=l;f[13]=0;f[2]=0;
f[6]=0;f[10]=k;f[14]=j;f[3]=0;f[7]=0;f[11]=-1;f[15]=0;return this},makePerspective:function(e,c,g,b){var a=g*Math.tan(THREE.Math.degToRad(e*0.5));
var f=-a;var h=f*c;var d=a*c;return this.makeFrustum(h,d,f,a,g,b)},makeOrthographic:function(d,n,k,a,g,f){var c=this.elements;
var m=n-d;var e=k-a;var b=f-g;var l=(n+d)/m;var j=(k+a)/e;var i=(f+g)/b;c[0]=2/m;
c[4]=0;c[8]=0;c[12]=-l;c[1]=0;c[5]=2/e;c[9]=0;c[13]=-j;c[2]=0;c[6]=0;c[10]=-2/b;
c[14]=-i;c[3]=0;c[7]=0;c[11]=0;c[15]=1;return this},fromArray:function(a){this.elements.set(a);
return this},toArray:function(){var a=this.elements;return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]]
},clone:function(){return new THREE.Matrix4().fromArray(this.elements)}};THREE.Ray=function(a,b){this.origin=(a!==undefined)?a:new THREE.Vector3();
this.direction=(b!==undefined)?b:new THREE.Vector3()};THREE.Ray.prototype={constructor:THREE.Ray,set:function(a,b){this.origin.copy(a);
this.direction.copy(b);return this},copy:function(a){this.origin.copy(a.origin);
this.direction.copy(a.direction);return this},at:function(c,b){var a=b||new THREE.Vector3();
return a.copy(this.direction).multiplyScalar(c).add(this.origin)},recast:function(){var a=new THREE.Vector3();
return function(b){this.origin.copy(this.at(b,a));return this}}(),closestPointToPoint:function(b,c){var a=c||new THREE.Vector3();
a.subVectors(b,this.origin);var d=a.dot(this.direction);if(d<0){return a.copy(this.origin)
}return a.copy(this.direction).multiplyScalar(d).add(this.origin)},distanceToPoint:function(){var a=new THREE.Vector3();
return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);if(c<0){return this.origin.distanceTo(b)
}a.copy(this.direction).multiplyScalar(c).add(this.origin);return a.distanceTo(b)
}}(),distanceSqToSegment:function(){var b=new THREE.Vector3();var a=new THREE.Vector3();
var c=new THREE.Vector3();return function(p,l,m,f){b.copy(p).add(l).multiplyScalar(0.5);
a.copy(l).sub(p).normalize();c.copy(this.origin).sub(b);var h=p.distanceTo(l)*0.5;
var d=-this.direction.dot(a);var n=c.dot(this.direction);var k=-c.dot(a);var j=c.lengthSq();
var i=Math.abs(1-d*d);var r,o,e,q;if(i>0){r=d*k-n;o=d*n-k;q=h*i;if(r>=0){if(o>=-q){if(o<=q){var g=1/i;
r*=g;o*=g;e=r*(r+d*o+2*n)+o*(d*r+o+2*k)+j}else{o=h;r=Math.max(0,-(d*o+n));e=-r*r+o*(o+2*k)+j
}}else{o=-h;r=Math.max(0,-(d*o+n));e=-r*r+o*(o+2*k)+j}}else{if(o<=-q){r=Math.max(0,-(-d*h+n));
o=(r>0)?-h:Math.min(Math.max(-h,-k),h);e=-r*r+o*(o+2*k)+j}else{if(o<=q){r=0;o=Math.min(Math.max(-h,-k),h);
e=o*(o+2*k)+j}else{r=Math.max(0,-(d*h+n));o=(r>0)?h:Math.min(Math.max(-h,-k),h);
e=-r*r+o*(o+2*k)+j}}}}else{o=(d>0)?-h:h;r=Math.max(0,-(d*o+n));e=-r*r+o*(o+2*k)+j
}if(m){m.copy(this.direction).multiplyScalar(r).add(this.origin)}if(f){f.copy(a).multiplyScalar(o).add(b)
}return e}}(),isIntersectionSphere:function(a){return this.distanceToPoint(a.center)<=a.radius
},intersectSphere:function(){var a=new THREE.Vector3();return function(b,d){a.subVectors(b.center,this.origin);
var i=a.dot(this.direction);var f=a.dot(a)-i*i;var c=b.radius*b.radius;if(f>c){return null
}var h=Math.sqrt(c-f);var g=i-h;var e=i+h;if(g<0&&e<0){return null}if(g<0){return this.at(e,d)
}return this.at(g,d)}}(),isIntersectionPlane:function(a){var b=a.distanceToPoint(this.origin);
if(b===0){return true}var c=a.normal.dot(this.direction);if(c*b<0){return true}return false
},distanceToPlane:function(a){var c=a.normal.dot(this.direction);if(c==0){if(a.distanceToPoint(this.origin)==0){return 0
}return null}var b=-(this.origin.dot(a.normal)+a.constant)/c;return b>=0?b:null
},intersectPlane:function(a,c){var b=this.distanceToPlane(a);if(b===null){return null
}return this.at(b,c)},isIntersectionBox:function(){var a=new THREE.Vector3();return function(b){return this.intersectBox(b,a)!==null
}}(),intersectBox:function(f,l){var c,g,i,a,h,k;var e=1/this.direction.x,d=1/this.direction.y,b=1/this.direction.z;
var j=this.origin;if(e>=0){c=(f.min.x-j.x)*e;g=(f.max.x-j.x)*e}else{c=(f.max.x-j.x)*e;
g=(f.min.x-j.x)*e}if(d>=0){i=(f.min.y-j.y)*d;a=(f.max.y-j.y)*d}else{i=(f.max.y-j.y)*d;
a=(f.min.y-j.y)*d}if((c>a)||(i>g)){return null}if(i>c||c!==c){c=i}if(a<g||g!==g){g=a
}if(b>=0){h=(f.min.z-j.z)*b;k=(f.max.z-j.z)*b}else{h=(f.max.z-j.z)*b;k=(f.min.z-j.z)*b
}if((c>k)||(h>g)){return null}if(h>c||c!==c){c=h}if(k<g||g!==g){g=k}if(g<0){return null
}return this.at(c>=0?c:g,l)},intersectTriangle:function(){var d=new THREE.Vector3();
var b=new THREE.Vector3();var a=new THREE.Vector3();var c=new THREE.Vector3();return function(m,k,j,e,n){b.subVectors(k,m);
a.subVectors(j,m);c.crossVectors(b,a);var i=this.direction.dot(c);var f;if(i>0){if(e){return null
}f=1}else{if(i<0){f=-1;i=-i}else{return null}}d.subVectors(this.origin,m);var l=f*this.direction.dot(a.crossVectors(d,a));
if(l<0){return null}var g=f*this.direction.dot(b.cross(d));if(g<0){return null}if(l+g>i){return null
}var h=-f*d.dot(c);if(h<0){return null}return this.at(h/i,n)}}(),applyMatrix4:function(a){this.direction.add(this.origin).applyMatrix4(a);
this.origin.applyMatrix4(a);this.direction.sub(this.origin);this.direction.normalize();
return this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)
},clone:function(){return new THREE.Ray().copy(this)}};THREE.Sphere=function(b,a){this.center=(b!==undefined)?b:new THREE.Vector3();
this.radius=(a!==undefined)?a:0};THREE.Sphere.prototype={constructor:THREE.Sphere,set:function(b,a){this.center.copy(b);
this.radius=a;return this},setFromPoints:function(){var a=new THREE.Box3();return function(f,g){var b=this.center;
if(g!==undefined){b.copy(g)}else{a.setFromPoints(f).center(b)}var c=0;for(var e=0,d=f.length;
e<d;e++){c=Math.max(c,b.distanceToSquared(f[e]))}this.radius=Math.sqrt(c);return this
}}(),copy:function(a){this.center.copy(a.center);this.radius=a.radius;return this
},empty:function(){return(this.radius<=0)},containsPoint:function(a){return(a.distanceToSquared(this.center)<=(this.radius*this.radius))
},distanceToPoint:function(a){return(a.distanceTo(this.center)-this.radius)},intersectsSphere:function(a){var b=this.radius+a.radius;
return a.center.distanceToSquared(this.center)<=(b*b)},clampPoint:function(b,d){var c=this.center.distanceToSquared(b);
var a=d||new THREE.Vector3();a.copy(b);if(c>(this.radius*this.radius)){a.sub(this.center).normalize();
a.multiplyScalar(this.radius).add(this.center)}return a},getBoundingBox:function(a){var b=a||new THREE.Box3();
b.set(this.center,this.center);b.expandByScalar(this.radius);return b},applyMatrix4:function(a){this.center.applyMatrix4(a);
this.radius=this.radius*a.getMaxScaleOnAxis();return this},translate:function(a){this.center.add(a);
return this},equals:function(a){return a.center.equals(this.center)&&(a.radius===this.radius)
},clone:function(){return new THREE.Sphere().copy(this)}};THREE.Frustum=function(f,e,d,c,b,a){this.planes=[(f!==undefined)?f:new THREE.Plane(),(e!==undefined)?e:new THREE.Plane(),(d!==undefined)?d:new THREE.Plane(),(c!==undefined)?c:new THREE.Plane(),(b!==undefined)?b:new THREE.Plane(),(a!==undefined)?a:new THREE.Plane()]
};THREE.Frustum.prototype={constructor:THREE.Frustum,set:function(g,f,e,d,c,b){var a=this.planes;
a[0].copy(g);a[1].copy(f);a[2].copy(e);a[3].copy(d);a[4].copy(c);a[5].copy(b);return this
},copy:function(c){var a=this.planes;for(var b=0;b<6;b++){a[b].copy(c.planes[b])
}return this},setFromMatrix:function(o){var h=this.planes;var t=o.elements;var l=t[0],j=t[1],i=t[2],g=t[3];
var f=t[4],e=t[5],d=t[6],c=t[7];var b=t[8],a=t[9],s=t[10],r=t[11];var q=t[12],p=t[13],n=t[14],k=t[15];
h[0].setComponents(g-l,c-f,r-b,k-q).normalize();h[1].setComponents(g+l,c+f,r+b,k+q).normalize();
h[2].setComponents(g+j,c+e,r+a,k+p).normalize();h[3].setComponents(g-j,c-e,r-a,k-p).normalize();
h[4].setComponents(g-i,c-d,r-s,k-n).normalize();h[5].setComponents(g+i,c+d,r+s,k+n).normalize();
return this},intersectsObject:function(){var a=new THREE.Sphere();return function(b){var c=b.geometry;
if(c.boundingSphere===null){c.computeBoundingSphere()}a.copy(c.boundingSphere);
a.applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),intersectsSphere:function(c){var d=this.planes;
var a=c.center;var b=-c.radius;for(var e=0;e<6;e++){var f=d[e].distanceToPoint(a);
if(f<b){return false}}return true},intersectsBox:function(){var b=new THREE.Vector3(),a=new THREE.Vector3();
return function(g){var d=this.planes;for(var e=0;e<6;e++){var c=d[e];b.x=c.normal.x>0?g.min.x:g.max.x;
a.x=c.normal.x>0?g.max.x:g.min.x;b.y=c.normal.y>0?g.min.y:g.max.y;a.y=c.normal.y>0?g.max.y:g.min.y;
b.z=c.normal.z>0?g.min.z:g.max.z;a.z=c.normal.z>0?g.max.z:g.min.z;var h=c.distanceToPoint(b);
var f=c.distanceToPoint(a);if(h<0&&f<0){return false}}return true}}(),containsPoint:function(a){var b=this.planes;
for(var c=0;c<6;c++){if(b[c].distanceToPoint(a)<0){return false}}return true},clone:function(){return new THREE.Frustum().copy(this)
}};THREE.Plane=function(b,a){this.normal=(b!==undefined)?b:new THREE.Vector3(1,0,0);
this.constant=(a!==undefined)?a:0};THREE.Plane.prototype={constructor:THREE.Plane,set:function(b,a){this.normal.copy(b);
this.constant=a;return this},setComponents:function(a,d,c,b){this.normal.set(a,d,c);
this.constant=b;return this},setFromNormalAndCoplanarPoint:function(b,a){this.normal.copy(b);
this.constant=-a.dot(this.normal);return this},setFromCoplanarPoints:function(){var b=new THREE.Vector3();
var a=new THREE.Vector3();return function(e,d,g){var f=b.subVectors(g,d).cross(a.subVectors(e,d)).normalize();
this.setFromNormalAndCoplanarPoint(f,e);return this}}(),copy:function(a){this.normal.copy(a.normal);
this.constant=a.constant;return this},normalize:function(){var a=1/this.normal.length();
this.normal.multiplyScalar(a);this.constant*=a;return this},negate:function(){this.constant*=-1;
this.normal.negate();return this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant
},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return this.orthoPoint(a,b).sub(a).negate()
},orthoPoint:function(b,d){var c=this.distanceToPoint(b);var a=d||new THREE.Vector3();
return a.copy(this.normal).multiplyScalar(c)},isIntersectionLine:function(a){var c=this.distanceToPoint(a.start);
var b=this.distanceToPoint(a.end);return(c<0&&b>0)||(b<0&&c>0)},intersectLine:function(){var a=new THREE.Vector3();
return function(c,e){var b=e||new THREE.Vector3();var f=c.delta(a);var g=this.normal.dot(f);
if(g==0){if(this.distanceToPoint(c.start)==0){return b.copy(c.start)}return undefined
}var d=-(c.start.dot(this.normal)+this.constant)/g;if(d<0||d>1){return undefined
}return b.copy(f).multiplyScalar(d).add(c.start)}}(),coplanarPoint:function(b){var a=b||new THREE.Vector3();
return a.copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var c=new THREE.Vector3();
var b=new THREE.Vector3();var a=new THREE.Matrix3();return function(e,f){var h=f||a.getNormalMatrix(e);
var g=c.copy(this.normal).applyMatrix3(h);var d=this.coplanarPoint(b);d.applyMatrix4(e);
this.setFromNormalAndCoplanarPoint(g,d);return this}}(),translate:function(a){this.constant=this.constant-a.dot(this.normal);
return this},equals:function(a){return a.normal.equals(this.normal)&&(a.constant==this.constant)
},clone:function(){return new THREE.Plane().copy(this)}};THREE.Math={generateUUID:function(){var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var b=new Array(36);var a=0,c;return function(){for(var e=0;e<36;e++){if(e==8||e==13||e==18||e==23){b[e]="-"
}else{if(e==14){b[e]="4"}else{if(a<=2){a=33554432+(Math.random()*16777216)|0}c=a&15;
a=a>>4;b[e]=d[(e==19)?(c&3)|8:c]}}}return b.join("")}}(),clamp:function(d,e,c){return(d<e)?e:((d>c)?c:d)
},clampBottom:function(b,c){return b<c?c:b},mapLinear:function(b,c,a,e,d){return e+(b-c)*(d-e)/(a-c)
},smoothstep:function(b,c,a){if(b<=c){return 0}if(b>=a){return 1}b=(b-c)/(a-c);
return b*b*(3-2*b)},smootherstep:function(b,c,a){if(b<=c){return 0}if(b>=a){return 1
}b=(b-c)/(a-c);return b*b*b*(b*(b*6-15)+10)},random16:function(){return(65280*Math.random()+255*Math.random())/65535
},randInt:function(a,b){return Math.floor(this.randFloat(a,b))},randFloat:function(a,b){return a+Math.random()*(b-a)
},randFloatSpread:function(a){return a*(0.5-Math.random())},degToRad:function(){var a=Math.PI/180;
return function(b){return b*a}}(),radToDeg:function(){var a=180/Math.PI;return function(b){return b*a
}}(),isPowerOfTwo:function(a){return(a&(a-1))===0&&a!==0},nextPowerOfTwo:function(a){a--;
a|=a>>1;a|=a>>2;a|=a>>4;a|=a>>8;a|=a>>16;a++;return a}};THREE.Spline=function(n){this.points=n;
var h=[],j={x:0,y:0,z:0},m,a,e,d,b,l,k,i,g;this.initFromArray=function(c){this.points=[];
for(var o=0;o<c.length;o++){this.points[o]={x:c[o][0],y:c[o][1],z:c[o][2]}}};this.getPoint=function(c){m=(this.points.length-1)*c;
a=Math.floor(m);e=m-a;h[0]=a===0?a:a-1;h[1]=a;h[2]=a>this.points.length-2?this.points.length-1:a+1;
h[3]=a>this.points.length-3?this.points.length-1:a+2;l=this.points[h[0]];k=this.points[h[1]];
i=this.points[h[2]];g=this.points[h[3]];d=e*e;b=e*d;j.x=f(l.x,k.x,i.x,g.x,e,d,b);
j.y=f(l.y,k.y,i.y,g.y,e,d,b);j.z=f(l.z,k.z,i.z,g.z,e,d,b);return j};this.getControlPointsArray=function(){var o,r,c=this.points.length,q=[];
for(o=0;o<c;o++){r=this.points[o];q[o]=[r.x,r.y,r.z]}return q};this.getLength=function(p){var r,t,u,s,B=0,c=0,q=0,A=new THREE.Vector3(),o=new THREE.Vector3(),v=[],C=0;
v[0]=0;if(!p){p=100}u=this.points.length*p;A.copy(this.points[0]);for(r=1;r<u;r++){t=r/u;
s=this.getPoint(t);o.copy(s);C+=o.distanceTo(A);A.copy(s);B=(this.points.length-1)*t;
c=Math.floor(B);if(c!=q){v[c]=C;q=c}}v[v.length]=C;return{chunks:v,total:C}};this.reparametrizeByArcLength=function(o){var s,r,v,A,p,B,u,t,C=[],c=new THREE.Vector3(),q=this.getLength();
C.push(c.copy(this.points[0]).clone());for(s=1;s<this.points.length;s++){B=q.chunks[s]-q.chunks[s-1];
u=Math.ceil(o*B/q.total);A=(s-1)/(this.points.length-1);p=s/(this.points.length-1);
for(r=1;r<u-1;r++){v=A+r*(1/u)*(p-A);t=this.getPoint(v);C.push(c.copy(t).clone())
}C.push(c.copy(this.points[s]).clone())}this.points=C};function f(v,u,r,q,A,o,c){var s=(r-v)*0.5,p=(q-u)*0.5;
return(2*(u-r)+s+p)*c+(-3*(u-r)-2*s-p)*o+s*A+u}};THREE.Triangle=function(e,d,f){this.a=(e!==undefined)?e:new THREE.Vector3();
this.b=(d!==undefined)?d:new THREE.Vector3();this.c=(f!==undefined)?f:new THREE.Vector3()
};THREE.Triangle.normal=function(){var a=new THREE.Vector3();return function(g,e,i,h){var d=h||new THREE.Vector3();
d.subVectors(i,e);a.subVectors(g,e);d.cross(a);var f=d.lengthSq();if(f>0){return d.multiplyScalar(1/Math.sqrt(f))
}return d.set(0,0,0)}}();THREE.Triangle.barycoordFromPoint=function(){var a=new THREE.Vector3();
var c=new THREE.Vector3();var b=new THREE.Vector3();return function(n,m,k,h,r){a.subVectors(h,m);
c.subVectors(k,m);b.subVectors(n,m);var l=a.dot(a);var j=a.dot(c);var i=a.dot(b);
var f=c.dot(c);var d=c.dot(b);var g=(l*f-j*j);var q=r||new THREE.Vector3();if(g==0){return q.set(-2,-1,-1)
}var e=1/g;var p=(f*i-j*d)*e;var o=(l*d-j*i)*e;return q.set(1-p-o,o,p)}}();THREE.Triangle.containsPoint=function(){var a=new THREE.Vector3();
return function(f,g,e,h){var d=THREE.Triangle.barycoordFromPoint(f,g,e,h,a);return(d.x>=0)&&(d.y>=0)&&((d.x+d.y)<=1)
}}();THREE.Triangle.prototype={constructor:THREE.Triangle,set:function(e,d,f){this.a.copy(e);
this.b.copy(d);this.c.copy(f);return this},setFromPointsAndIndices:function(b,d,c,a){this.a.copy(b[d]);
this.b.copy(b[c]);this.c.copy(b[a]);return this},copy:function(a){this.a.copy(a.a);
this.b.copy(a.b);this.c.copy(a.c);return this},area:function(){var a=new THREE.Vector3();
var b=new THREE.Vector3();return function(){a.subVectors(this.c,this.b);b.subVectors(this.a,this.b);
return a.cross(b).length()*0.5}}(),midpoint:function(b){var a=b||new THREE.Vector3();
return a.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return THREE.Triangle.normal(this.a,this.b,this.c,a)
},plane:function(b){var a=b||new THREE.Plane();return a.setFromCoplanarPoints(this.a,this.b,this.c)
},barycoordFromPoint:function(a,b){return THREE.Triangle.barycoordFromPoint(a,this.a,this.b,this.c,b)
},containsPoint:function(a){return THREE.Triangle.containsPoint(a,this.a,this.b,this.c)
},equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)
},clone:function(){return new THREE.Triangle().copy(this)}};THREE.Clock=function(a){this.autoStart=(a!==undefined)?a:true;
this.startTime=0;this.oldTime=0;this.elapsedTime=0;this.running=false};THREE.Clock.prototype={constructor:THREE.Clock,start:function(){this.startTime=self.performance!==undefined&&self.performance.now!==undefined?self.performance.now():Date.now();
this.oldTime=this.startTime;this.running=true},stop:function(){this.getElapsedTime();
this.running=false},getElapsedTime:function(){this.getDelta();return this.elapsedTime
},getDelta:function(){var b=0;if(this.autoStart&&!this.running){this.start()}if(this.running){var a=self.performance!==undefined&&self.performance.now!==undefined?self.performance.now():Date.now();
b=0.001*(a-this.oldTime);this.oldTime=a;this.elapsedTime+=b}return b}};THREE.EventDispatcher=function(){};
THREE.EventDispatcher.prototype={constructor:THREE.EventDispatcher,apply:function(a){a.addEventListener=THREE.EventDispatcher.prototype.addEventListener;
a.hasEventListener=THREE.EventDispatcher.prototype.hasEventListener;a.removeEventListener=THREE.EventDispatcher.prototype.removeEventListener;
a.dispatchEvent=THREE.EventDispatcher.prototype.dispatchEvent},addEventListener:function(b,c){if(this._listeners===undefined){this._listeners={}
}var a=this._listeners;if(a[b]===undefined){a[b]=[]}if(a[b].indexOf(c)===-1){a[b].push(c)
}},hasEventListener:function(b,c){if(this._listeners===undefined){return false}var a=this._listeners;
if(a[b]!==undefined&&a[b].indexOf(c)!==-1){return true}return false},removeEventListener:function(d,e){if(this._listeners===undefined){return
}var c=this._listeners;var a=c[d];if(a!==undefined){var b=a.indexOf(e);if(b!==-1){a.splice(b,1)
}}},dispatchEvent:function(e){if(this._listeners===undefined){return}var c=this._listeners;
var a=c[e.type];if(a!==undefined){e.target=this;var f=[];var d=a.length;for(var b=0;
b<d;b++){f[b]=a[b]}for(var b=0;b<d;b++){f[b].call(this,e)}}}};(function(c){c.Raycaster=function(e,g,f,d){this.ray=new c.Ray(e,g);
this.near=f||0;this.far=d||Infinity;this.params={Sprite:{},Mesh:{},PointCloud:{threshold:1},LOD:{},Line:{}}
};var b=function(e,d){return e.distance-d.distance};var a=function(g,e,k,f){g.raycast(e,k);
if(f===true){var j=g.children;for(var h=0,d=j.length;h<d;h++){a(j[h],e,k,true)}}};
c.Raycaster.prototype={constructor:c.Raycaster,precision:0.0001,linePrecision:1,set:function(d,e){this.ray.set(d,e)
},setFromCamera:function(e,d){if(d instanceof c.PerspectiveCamera){this.ray.origin.copy(d.position);
this.ray.direction.set(e.x,e.y,0.5).unproject(d).sub(d.position).normalize()}else{if(d instanceof c.OrthographicCamera){this.ray.origin.set(e.x,e.y,-1).unproject(d);
this.ray.direction.set(0,0,-1).transformDirection(d.matrixWorld)}else{c.error("THREE.Raycaster: Unsupported camera type.")
}}},intersectObject:function(e,d){var f=[];a(e,this,f,d);f.sort(b);return f},intersectObjects:function(h,e){var g=[];
if(h instanceof Array===false){c.warn("THREE.Raycaster.intersectObjects: objects is not an Array.");
return g}for(var f=0,d=h.length;f<d;f++){a(h[f],this,g,e)}g.sort(b);return g}}}(THREE));
THREE.Object3D=function(){Object.defineProperty(this,"id",{value:THREE.Object3DIdCount++});
this.uuid=THREE.Math.generateUUID();this.name="";this.type="Object3D";this.parent=undefined;
this.children=[];this.up=THREE.Object3D.DefaultUp.clone();var a=new THREE.Vector3();
var c=new THREE.Euler();var e=new THREE.Quaternion();var f=new THREE.Vector3(1,1,1);
var d=function(){e.setFromEuler(c,false)};var b=function(){c.setFromQuaternion(e,undefined,false)
};c.onChange(d);e.onChange(b);Object.defineProperties(this,{position:{enumerable:true,value:a},rotation:{enumerable:true,value:c},quaternion:{enumerable:true,value:e},scale:{enumerable:true,value:f}});
this.rotationAutoUpdate=true;this.matrix=new THREE.Matrix4();this.matrixWorld=new THREE.Matrix4();
this.matrixAutoUpdate=true;this.matrixWorldNeedsUpdate=false;this.visible=true;
this.castShadow=false;this.receiveShadow=false;this.frustumCulled=true;this.renderOrder=0;
this.userData={}};THREE.Object3D.DefaultUp=new THREE.Vector3(0,1,0);THREE.Object3D.prototype={constructor:THREE.Object3D,get eulerOrder(){THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order.");
return this.rotation.order},set eulerOrder(a){THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order.");
this.rotation.order=a},get useQuaternion(){THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
},set useQuaternion(a){THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
},applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix);this.matrix.decompose(this.position,this.quaternion,this.scale)
},setRotationFromAxisAngle:function(a,b){this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,true)
},setRotationFromMatrix:function(a){this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){this.quaternion.copy(a)
},rotateOnAxis:function(){var a=new THREE.Quaternion();return function(b,c){a.setFromAxisAngle(b,c);
this.quaternion.multiply(a);return this}}(),rotateX:function(){var a=new THREE.Vector3(1,0,0);
return function(b){return this.rotateOnAxis(a,b)}}(),rotateY:function(){var a=new THREE.Vector3(0,1,0);
return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new THREE.Vector3(0,0,1);
return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){var a=new THREE.Vector3();
return function(b,c){a.copy(b).applyQuaternion(this.quaternion);this.position.add(a.multiplyScalar(c));
return this}}(),translate:function(b,a){THREE.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
return this.translateOnAxis(a,b)},translateX:function(){var a=new THREE.Vector3(1,0,0);
return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new THREE.Vector3(0,1,0);
return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new THREE.Vector3(0,0,1);
return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)
},worldToLocal:function(){var a=new THREE.Matrix4();return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))
}}(),lookAt:function(){var a=new THREE.Matrix4();return function(b){a.lookAt(b,this.position,this.up);
this.quaternion.setFromRotationMatrix(a)}}(),add:function(a){if(arguments.length>1){for(var b=0;
b<arguments.length;b++){this.add(arguments[b])}return this}if(a===this){THREE.error("THREE.Object3D.add: object can't be added as a child of itself.",a);
return this}if(a instanceof THREE.Object3D){if(a.parent!==undefined){a.parent.remove(a)
}a.parent=this;a.dispatchEvent({type:"added"});this.children.push(a)}else{THREE.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",a)
}return this},remove:function(b){if(arguments.length>1){for(var c=0;c<arguments.length;
c++){this.remove(arguments[c])}}var a=this.children.indexOf(b);if(a!==-1){b.parent=undefined;
b.dispatchEvent({type:"removed"});this.children.splice(a,1)}},getChildByName:function(a){THREE.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
return this.getObjectByName(a)},getObjectById:function(a){return this.getObjectByProperty("id",a)
},getObjectByName:function(a){return this.getObjectByProperty("name",a)},getObjectByProperty:function(c,e){if(this[c]===e){return this
}for(var d=0,a=this.children.length;d<a;d++){var f=this.children[d];var b=f.getObjectByProperty(c,e);
if(b!==undefined){return b}}return undefined},getWorldPosition:function(b){var a=b||new THREE.Vector3();
this.updateMatrixWorld(true);return a.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(){var a=new THREE.Vector3();
var b=new THREE.Vector3();return function(d){var c=d||new THREE.Quaternion();this.updateMatrixWorld(true);
this.matrixWorld.decompose(a,c,b);return c}}(),getWorldRotation:function(){var a=new THREE.Quaternion();
return function(c){var b=c||new THREE.Euler();this.getWorldQuaternion(a);return b.setFromQuaternion(a,this.rotation.order,false)
}}(),getWorldScale:function(){var a=new THREE.Vector3();var b=new THREE.Quaternion();
return function(d){var c=d||new THREE.Vector3();this.updateMatrixWorld(true);this.matrixWorld.decompose(a,b,c);
return c}}(),getWorldDirection:function(){var a=new THREE.Quaternion();return function(c){var b=c||new THREE.Vector3();
this.getWorldQuaternion(a);return b.set(0,0,1).applyQuaternion(a)}}(),raycast:function(){},traverse:function(c){c(this);
for(var b=0,a=this.children.length;b<a;b++){this.children[b].traverse(c)}},traverseVisible:function(c){if(this.visible===false){return
}c(this);for(var b=0,a=this.children.length;b<a;b++){this.children[b].traverseVisible(c)
}},traverseAncestors:function(a){if(this.parent){a(this.parent);this.parent.traverseAncestors(a)
}},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale);
this.matrixWorldNeedsUpdate=true},updateMatrixWorld:function(c){if(this.matrixAutoUpdate===true){this.updateMatrix()
}if(this.matrixWorldNeedsUpdate===true||c===true){if(this.parent===undefined){this.matrixWorld.copy(this.matrix)
}else{this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)}this.matrixWorldNeedsUpdate=false;
c=true}for(var b=0,a=this.children.length;b<a;b++){this.children[b].updateMatrixWorld(c)
}},toJSON:function(){var d={metadata:{version:4.3,type:"Object",generator:"ObjectExporter"}};
var e={};var f=function(h){if(d.geometries===undefined){d.geometries=[]}if(e[h.uuid]===undefined){var g=h.toJSON();
delete g.metadata;e[h.uuid]=g;d.geometries.push(g)}return h.uuid};var c={};var a=function(h){if(d.materials===undefined){d.materials=[]
}if(c[h.uuid]===undefined){var g=h.toJSON();delete g.metadata;c[h.uuid]=g;d.materials.push(g)
}return h.uuid};var b=function(g){var j={};j.uuid=g.uuid;j.type=g.type;if(g.name!==""){j.name=g.name
}if(JSON.stringify(g.userData)!=="{}"){j.userData=g.userData}if(g.visible!==true){j.visible=g.visible
}if(g instanceof THREE.PerspectiveCamera){j.fov=g.fov;j.aspect=g.aspect;j.near=g.near;
j.far=g.far}else{if(g instanceof THREE.OrthographicCamera){j.left=g.left;j.right=g.right;
j.top=g.top;j.bottom=g.bottom;j.near=g.near;j.far=g.far}else{if(g instanceof THREE.AmbientLight){j.color=g.color.getHex()
}else{if(g instanceof THREE.DirectionalLight){j.color=g.color.getHex();j.intensity=g.intensity
}else{if(g instanceof THREE.PointLight){j.color=g.color.getHex();j.intensity=g.intensity;
j.distance=g.distance;j.decay=g.decay}else{if(g instanceof THREE.SpotLight){j.color=g.color.getHex();
j.intensity=g.intensity;j.distance=g.distance;j.angle=g.angle;j.exponent=g.exponent;
j.decay=g.decay}else{if(g instanceof THREE.HemisphereLight){j.color=g.color.getHex();
j.groundColor=g.groundColor.getHex()}else{if(g instanceof THREE.Mesh||g instanceof THREE.Line||g instanceof THREE.PointCloud){j.geometry=f(g.geometry);
j.material=a(g.material);if(g instanceof THREE.Line){j.mode=g.mode}}else{if(g instanceof THREE.Sprite){j.material=a(g.material)
}}}}}}}}}j.matrix=g.matrix.toArray();if(g.children.length>0){j.children=[];for(var h=0;
h<g.children.length;h++){j.children.push(b(g.children[h]))}}return j};d.object=b(this);
return d},clone:function(b,a){if(b===undefined){b=new THREE.Object3D()}if(a===undefined){a=true
}b.name=this.name;b.up.copy(this.up);b.position.copy(this.position);b.quaternion.copy(this.quaternion);
b.scale.copy(this.scale);b.rotationAutoUpdate=this.rotationAutoUpdate;b.matrix.copy(this.matrix);
b.matrixWorld.copy(this.matrixWorld);b.matrixAutoUpdate=this.matrixAutoUpdate;b.matrixWorldNeedsUpdate=this.matrixWorldNeedsUpdate;
b.visible=this.visible;b.castShadow=this.castShadow;b.receiveShadow=this.receiveShadow;
b.frustumCulled=this.frustumCulled;b.userData=JSON.parse(JSON.stringify(this.userData));
if(a===true){for(var c=0;c<this.children.length;c++){var d=this.children[c];b.add(d.clone())
}}return b}};THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);THREE.Object3DIdCount=0;
THREE.Face3=function(f,e,i,h,g,d){this.a=f;this.b=e;this.c=i;this.normal=h instanceof THREE.Vector3?h:new THREE.Vector3();
this.vertexNormals=h instanceof Array?h:[];this.color=g instanceof THREE.Color?g:new THREE.Color();
this.vertexColors=g instanceof Array?g:[];this.vertexTangents=[];this.materialIndex=d!==undefined?d:0
};THREE.Face3.prototype={constructor:THREE.Face3,clone:function(){var c=new THREE.Face3(this.a,this.b,this.c);
c.normal.copy(this.normal);c.color.copy(this.color);c.materialIndex=this.materialIndex;
for(var b=0,a=this.vertexNormals.length;b<a;b++){c.vertexNormals[b]=this.vertexNormals[b].clone()
}for(var b=0,a=this.vertexColors.length;b<a;b++){c.vertexColors[b]=this.vertexColors[b].clone()
}for(var b=0,a=this.vertexTangents.length;b<a;b++){c.vertexTangents[b]=this.vertexTangents[b].clone()
}return c}};THREE.Face4=function(g,f,k,j,i,h,e){THREE.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
return new THREE.Face3(g,f,k,i,h,e)};THREE.BufferAttribute=function(b,a){this.array=b;
this.itemSize=a;this.needsUpdate=false};THREE.BufferAttribute.prototype={constructor:THREE.BufferAttribute,get length(){return this.array.length
},copyAt:function(e,c,d){e*=this.itemSize;d*=c.itemSize;for(var b=0,a=this.itemSize;
b<a;b++){this.array[e+b]=c.array[d+b]}return this},set:function(a,b){if(b===undefined){b=0
}this.array.set(a,b);return this},setX:function(b,a){this.array[b*this.itemSize]=a;
return this},setY:function(a,b){this.array[a*this.itemSize+1]=b;return this},setZ:function(a,b){this.array[a*this.itemSize+2]=b;
return this},setXY:function(b,a,c){b*=this.itemSize;this.array[b]=a;this.array[b+1]=c;
return this},setXYZ:function(b,a,d,c){b*=this.itemSize;this.array[b]=a;this.array[b+1]=d;
this.array[b+2]=c;return this},setXYZW:function(c,a,e,d,b){c*=this.itemSize;this.array[c]=a;
this.array[c+1]=e;this.array[c+2]=d;this.array[c+3]=b;return this},clone:function(){return new THREE.BufferAttribute(new this.array.constructor(this.array),this.itemSize)
}};THREE.Int8Attribute=function(a,b){THREE.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Uint8Attribute=function(a,b){THREE.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Uint8ClampedAttribute=function(a,b){THREE.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Int16Attribute=function(a,b){THREE.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Uint16Attribute=function(a,b){THREE.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Int32Attribute=function(a,b){THREE.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Uint32Attribute=function(a,b){THREE.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Float32Attribute=function(a,b){THREE.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.Float64Attribute=function(a,b){THREE.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
return new THREE.BufferAttribute(a,b)};THREE.DynamicBufferAttribute=function(b,a){THREE.BufferAttribute.call(this,b,a);
this.updateRange={offset:0,count:-1}};THREE.DynamicBufferAttribute.prototype=Object.create(THREE.BufferAttribute.prototype);
THREE.DynamicBufferAttribute.prototype.constructor=THREE.DynamicBufferAttribute;
THREE.DynamicBufferAttribute.prototype.clone=function(){return new THREE.DynamicBufferAttribute(new this.array.constructor(this.array),this.itemSize)
};THREE.BufferGeometry=function(){Object.defineProperty(this,"id",{value:THREE.GeometryIdCount++});
this.uuid=THREE.Math.generateUUID();this.name="";this.type="BufferGeometry";this.attributes={};
this.attributesKeys=[];this.drawcalls=[];this.offsets=this.drawcalls;this.boundingBox=null;
this.boundingSphere=null};THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,addAttribute:function(a,b){if(b instanceof THREE.BufferAttribute===false){THREE.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).");
this.attributes[a]={array:arguments[1],itemSize:arguments[2]};return}this.attributes[a]=b;
this.attributesKeys=Object.keys(this.attributes)},getAttribute:function(a){return this.attributes[a]
},addDrawCall:function(c,a,b){this.drawcalls.push({start:c,count:a,index:b!==undefined?b:0})
},applyMatrix:function(b){var a=this.attributes.position;if(a!==undefined){b.applyToVector3Array(a.array);
a.needsUpdate=true}var c=this.attributes.normal;if(c!==undefined){var d=new THREE.Matrix3().getNormalMatrix(b);
d.applyToVector3Array(c.array);c.needsUpdate=true}if(this.boundingBox!==null){this.computeBoundingBox()
}if(this.boundingSphere!==null){this.computeBoundingSphere()}},center:function(){this.computeBoundingBox();
var a=this.boundingBox.center().negate();this.applyMatrix(new THREE.Matrix4().setPosition(a));
return a},fromGeometry:function(f,F){F=F||{vertexColors:THREE.NoColors};var g=f.vertices;
var e=f.faces;var E=f.faceVertexUvs;var s=F.vertexColors;var d=E[0].length>0;var M=e[0].vertexNormals.length==3;
var k=new Float32Array(e.length*3*3);this.addAttribute("position",new THREE.BufferAttribute(k,3));
var q=new Float32Array(e.length*3*3);this.addAttribute("normal",new THREE.BufferAttribute(q,3));
if(s!==THREE.NoColors){var o=new Float32Array(e.length*3*3);this.addAttribute("color",new THREE.BufferAttribute(o,3))
}if(d===true){var p=new Float32Array(e.length*3*2);this.addAttribute("uv",new THREE.BufferAttribute(p,2))
}for(var A=0,v=0,u=0;A<e.length;A++,v+=6,u+=9){var m=e[A];var L=g[m.a];var K=g[m.b];
var I=g[m.c];k[u]=L.x;k[u+1]=L.y;k[u+2]=L.z;k[u+3]=K.x;k[u+4]=K.y;k[u+5]=K.z;k[u+6]=I.x;
k[u+7]=I.y;k[u+8]=I.z;if(M===true){var l=m.vertexNormals[0];var j=m.vertexNormals[1];
var h=m.vertexNormals[2];q[u]=l.x;q[u+1]=l.y;q[u+2]=l.z;q[u+3]=j.x;q[u+4]=j.y;q[u+5]=j.z;
q[u+6]=h.x;q[u+7]=h.y;q[u+8]=h.z}else{var t=m.normal;q[u]=t.x;q[u+1]=t.y;q[u+2]=t.z;
q[u+3]=t.x;q[u+4]=t.y;q[u+5]=t.z;q[u+6]=t.x;q[u+7]=t.y;q[u+8]=t.z}if(s===THREE.FaceColors){var r=m.color;
o[u]=r.r;o[u+1]=r.g;o[u+2]=r.b;o[u+3]=r.r;o[u+4]=r.g;o[u+5]=r.b;o[u+6]=r.r;o[u+7]=r.g;
o[u+8]=r.b}else{if(s===THREE.VertexColors){var J=m.vertexColors[0];var H=m.vertexColors[1];
var G=m.vertexColors[2];o[u]=J.r;o[u+1]=J.g;o[u+2]=J.b;o[u+3]=H.r;o[u+4]=H.g;o[u+5]=H.b;
o[u+6]=G.r;o[u+7]=G.g;o[u+8]=G.b}}if(d===true){var D=E[0][A][0];var C=E[0][A][1];
var B=E[0][A][2];p[v]=D.x;p[v+1]=D.y;p[v+2]=C.x;p[v+3]=C.y;p[v+4]=B.x;p[v+5]=B.y
}}this.computeBoundingSphere();return this},computeBoundingBox:function(){var a=new THREE.Vector3();
return function(){if(this.boundingBox===null){this.boundingBox=new THREE.Box3()
}var b=this.attributes.position.array;if(b){var e=this.boundingBox;e.makeEmpty();
for(var d=0,c=b.length;d<c;d+=3){a.set(b[d],b[d+1],b[d+2]);e.expandByPoint(a)}}if(b===undefined||b.length===0){this.boundingBox.min.set(0,0,0);
this.boundingBox.max.set(0,0,0)}if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)){THREE.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
}}}(),computeBoundingSphere:function(){var b=new THREE.Box3();var a=new THREE.Vector3();
return function(){if(this.boundingSphere===null){this.boundingSphere=new THREE.Sphere()
}var e=this.attributes.position.array;if(e){b.makeEmpty();var c=this.boundingSphere.center;
for(var g=0,f=e.length;g<f;g+=3){a.set(e[g],e[g+1],e[g+2]);b.expandByPoint(a)}b.center(c);
var d=0;for(var g=0,f=e.length;g<f;g+=3){a.set(e[g],e[g+1],e[g+2]);d=Math.max(d,c.distanceToSquared(a))
}this.boundingSphere.radius=Math.sqrt(d);if(isNaN(this.boundingSphere.radius)){THREE.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
}}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var g=this.attributes;
if(g.position){var f=g.position.array;if(g.normal===undefined){this.addAttribute("normal",new THREE.BufferAttribute(new Float32Array(f.length),3))
}else{var k=g.normal.array;for(var r=0,h=k.length;r<h;r++){k[r]=0}}var k=g.normal.array;
var u,s,q,p=new THREE.Vector3(),n=new THREE.Vector3(),m=new THREE.Vector3(),l=new THREE.Vector3(),v=new THREE.Vector3();
if(g.index){var b=g.index.array;var c=(this.offsets.length>0?this.offsets:[{start:0,count:b.length,index:0}]);
for(var o=0,t=c.length;o<t;++o){var a=c[o].start;var e=c[o].count;var d=c[o].index;
for(var r=a,h=a+e;r<h;r+=3){u=(d+b[r])*3;s=(d+b[r+1])*3;q=(d+b[r+2])*3;p.fromArray(f,u);
n.fromArray(f,s);m.fromArray(f,q);l.subVectors(m,n);v.subVectors(p,n);l.cross(v);
k[u]+=l.x;k[u+1]+=l.y;k[u+2]+=l.z;k[s]+=l.x;k[s+1]+=l.y;k[s+2]+=l.z;k[q]+=l.x;k[q+1]+=l.y;
k[q+2]+=l.z}}}else{for(var r=0,h=f.length;r<h;r+=9){p.fromArray(f,r);n.fromArray(f,r+3);
m.fromArray(f,r+6);l.subVectors(m,n);v.subVectors(p,n);l.cross(v);k[r]=l.x;k[r+1]=l.y;
k[r+2]=l.z;k[r+3]=l.x;k[r+4]=l.y;k[r+5]=l.z;k[r+6]=l.x;k[r+7]=l.y;k[r+8]=l.z}}this.normalizeNormals();
g.normal.needsUpdate=true}},computeTangents:function(){if(this.attributes.index===undefined||this.attributes.position===undefined||this.attributes.normal===undefined||this.attributes.uv===undefined){THREE.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
return}var d=this.attributes.index.array;var o=this.attributes.position.array;var u=this.attributes.normal.array;
var L=this.attributes.uv.array;var s=o.length/3;if(this.attributes.tangent===undefined){this.addAttribute("tangent",new THREE.BufferAttribute(new Float32Array(4*s),4))
}var B=this.attributes.tangent.array;var ad=[],ac=[];for(var V=0;V<s;V++){ad[V]=new THREE.Vector3();
ac[V]=new THREE.Vector3()}var S=new THREE.Vector3(),P=new THREE.Vector3(),O=new THREE.Vector3(),l=new THREE.Vector2(),h=new THREE.Vector2(),g=new THREE.Vector2(),q,p,af,ae,J,I,aa,Z,H,G,Q;
var e=new THREE.Vector3(),D=new THREE.Vector3();function K(j,i,k){S.fromArray(o,j*3);
P.fromArray(o,i*3);O.fromArray(o,k*3);l.fromArray(L,j*2);h.fromArray(L,i*2);g.fromArray(L,k*2);
q=P.x-S.x;p=O.x-S.x;af=P.y-S.y;ae=O.y-S.y;J=P.z-S.z;I=O.z-S.z;aa=h.x-l.x;Z=g.x-l.x;
H=h.y-l.y;G=g.y-l.y;Q=1/(aa*G-Z*H);e.set((G*q-H*p)*Q,(G*af-H*ae)*Q,(G*J-H*I)*Q);
D.set((aa*p-Z*q)*Q,(aa*ae-Z*af)*Q,(aa*I-Z*J)*Q);ad[j].add(e);ad[i].add(e);ad[k].add(e);
ac[j].add(D);ac[i].add(D);ac[k].add(D)}var X,E;var W,m;var c,b,a;if(this.drawcalls.length===0){this.addDrawCall(0,d.length,0)
}var ab=this.drawcalls;for(W=0,m=ab.length;W<m;++W){var A=ab[W].start;var R=ab[W].count;
var F=ab[W].index;for(X=A,E=A+R;X<E;X+=3){c=F+d[X];b=F+d[X+1];a=F+d[X+2];K(c,b,a)
}}var T=new THREE.Vector3(),Y=new THREE.Vector3();var U=new THREE.Vector3(),C=new THREE.Vector3();
var M,N,f;function v(i){U.fromArray(u,i*3);C.copy(U);N=ad[i];T.copy(N);T.sub(U.multiplyScalar(U.dot(N))).normalize();
Y.crossVectors(C,N);f=Y.dot(ac[i]);M=(f<0)?-1:1;B[i*4]=T.x;B[i*4+1]=T.y;B[i*4+2]=T.z;
B[i*4+3]=M}for(W=0,m=ab.length;W<m;++W){var A=ab[W].start;var R=ab[W].count;var F=ab[W].index;
for(X=A,E=A+R;X<E;X+=3){c=F+d[X];b=F+d[X+1];a=F+d[X+2];v(c);v(b);v(a)}}},computeOffsets:function(n){if(n===undefined){n=65535
}var f=this.attributes.index.array;var i=this.attributes.position.array;var m=(f.length/3);
var o=new Uint16Array(f.length);var a=0;var c=0;var h=[{start:0,count:0,index:0}];
var g=h[0];var b=0;var e=0;var q=new Int32Array(6);var B=new Int32Array(i.length);
var A=new Int32Array(i.length);for(var r=0;r<i.length;r++){B[r]=-1;A[r]=-1}for(var s=0;
s<m;s++){e=0;for(var t=0;t<3;t++){var u=f[s*3+t];if(B[u]==-1){q[t*2]=u;q[t*2+1]=-1;
e++}else{if(B[u]<g.index){q[t*2]=u;q[t*2+1]=-1;b++}else{q[t*2]=u;q[t*2+1]=B[u]}}}var k=c+e;
if(k>(g.index+n)){var p={start:a,count:0,index:c};h.push(p);g=p;for(var l=0;l<6;
l+=2){var d=q[l+1];if(d>-1&&d<g.index){q[l+1]=-1}}}for(var l=0;l<6;l+=2){var u=q[l];
var d=q[l+1];if(d===-1){d=c++}B[u]=d;A[d]=u;o[a++]=d-g.index;g.count++}}this.reorderBuffers(o,A,c);
this.offsets=h;this.drawcalls=h;return h},merge:function(l,f){if(l instanceof THREE.BufferGeometry===false){THREE.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",l);
return}if(f===undefined){f=0}var g=this.attributes;for(var m in g){if(l.attributes[m]===undefined){continue
}var d=g[m];var b=d.array;var c=l.attributes[m];var a=c.array;var k=c.itemSize;
for(var h=0,e=k*f;h<a.length;h++,e++){b[e]=a[h]}}return this},normalizeNormals:function(){var d=this.attributes.normal.array;
var a,g,e,f;for(var c=0,b=d.length;c<b;c+=3){a=d[c];g=d[c+1];e=d[c+2];f=1/Math.sqrt(a*a+g*g+e*e);
d[c]*=f;d[c+1]*=f;d[c+2]*=f}},reorderBuffers:function(f,j,a){var e={};for(var i in this.attributes){if(i=="index"){continue
}var h=this.attributes[i].array;e[i]=new h.constructor(this.attributes[i].itemSize*a)
}for(var b=0;b<a;b++){var l=j[b];for(var i in this.attributes){if(i=="index"){continue
}var c=this.attributes[i].array;var g=this.attributes[i].itemSize;var m=e[i];for(var d=0;
d<g;d++){m[b*g+d]=c[l*g+d]}}}this.attributes.index.array=f;for(var i in this.attributes){if(i=="index"){continue
}this.attributes[i].array=e[i];this.attributes[i].numItems=this.attributes[i].itemSize*a
}},toJSON:function(){var b={metadata:{version:4,type:"BufferGeometry",generator:"BufferGeometryExporter"},uuid:this.uuid,type:this.type,data:{attributes:{}}};
var a=this.attributes;var f=this.offsets;var d=this.boundingSphere;for(var c in a){var e=a[c];
var g=Array.prototype.slice.call(e.array);b.data.attributes[c]={itemSize:e.itemSize,type:e.array.constructor.name,array:g}
}if(f.length>0){b.data.offsets=JSON.parse(JSON.stringify(f))}if(d!==null){b.data.boundingSphere={center:d.center.toArray(),radius:d.radius}
}return b},clone:function(){var e=new THREE.BufferGeometry();for(var a in this.attributes){var f=this.attributes[a];
e.addAttribute(a,f.clone())}for(var c=0,b=this.offsets.length;c<b;c++){var d=this.offsets[c];
e.offsets.push({start:d.start,index:d.index,count:d.count})}return e},dispose:function(){this.dispatchEvent({type:"dispose"})
}};THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);THREE.Geometry=function(){Object.defineProperty(this,"id",{value:THREE.GeometryIdCount++});
this.uuid=THREE.Math.generateUUID();this.name="";this.type="Geometry";this.vertices=[];
this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];
this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];
this.boundingBox=null;this.boundingSphere=null;this.hasTangents=false;this.dynamic=true;
this.verticesNeedUpdate=false;this.elementsNeedUpdate=false;this.uvsNeedUpdate=false;
this.normalsNeedUpdate=false;this.tangentsNeedUpdate=false;this.colorsNeedUpdate=false;
this.lineDistancesNeedUpdate=false;this.groupsNeedUpdate=false};THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(b){var h=new THREE.Matrix3().getNormalMatrix(b);
for(var e=0,a=this.vertices.length;e<a;e++){var g=this.vertices[e];g.applyMatrix4(b)
}for(var e=0,a=this.faces.length;e<a;e++){var f=this.faces[e];f.normal.applyMatrix3(h).normalize();
for(var c=0,d=f.vertexNormals.length;c<d;c++){f.vertexNormals[c].applyMatrix3(h).normalize()
}}if(this.boundingBox!==null){this.computeBoundingBox()}if(this.boundingSphere!==null){this.computeBoundingSphere()
}this.verticesNeedUpdate=true;this.normalsNeedUpdate=true},fromBufferGeometry:function(d){var b=this;
var l=d.attributes;var f=l.position.array;var e=l.index!==undefined?l.index.array:undefined;
var p=l.normal!==undefined?l.normal.array:undefined;var m=l.color!==undefined?l.color.array:undefined;
var n=l.uv!==undefined?l.uv.array:undefined;var a=[];var q=[];for(var t=0,s=0;t<f.length;
t+=3,s+=2){b.vertices.push(new THREE.Vector3(f[t],f[t+1],f[t+2]));if(p!==undefined){a.push(new THREE.Vector3(p[t],p[t+1],p[t+2]))
}if(m!==undefined){b.colors.push(new THREE.Color(m[t],m[t+1],m[t+2]))}if(n!==undefined){q.push(new THREE.Vector2(n[s],n[s+1]))
}}var g=function(j,i,B){var v=p!==undefined?[a[j].clone(),a[i].clone(),a[B].clone()]:[];
var A=m!==undefined?[b.colors[j].clone(),b.colors[i].clone(),b.colors[B].clone()]:[];
b.faces.push(new THREE.Face3(j,i,B,v,A));if(n!==undefined){b.faceVertexUvs[0].push([q[j].clone(),q[i].clone(),q[B].clone()])
}};if(e!==undefined){var o=d.drawcalls;if(o.length>0){for(var t=0;t<o.length;t++){var r=o[t];
var c=r.start;var k=r.count;var h=r.index;for(var s=c,u=c+k;s<u;s+=3){g(h+e[s],h+e[s+1],h+e[s+2])
}}}else{for(var t=0;t<e.length;t+=3){g(e[t],e[t+1],e[t+2])}}}else{for(var t=0;t<f.length/3;
t+=3){g(t,t+1,t+2)}}this.computeFaceNormals();if(d.boundingBox!==null){this.boundingBox=d.boundingBox.clone()
}if(d.boundingSphere!==null){this.boundingSphere=d.boundingSphere.clone()}return this
},center:function(){this.computeBoundingBox();var a=this.boundingBox.center().negate();
this.applyMatrix(new THREE.Matrix4().setPosition(a));return a},computeFaceNormals:function(){var a=new THREE.Vector3(),i=new THREE.Vector3();
for(var h=0,g=this.faces.length;h<g;h++){var e=this.faces[h];var d=this.vertices[e.a];
var c=this.vertices[e.b];var b=this.vertices[e.c];a.subVectors(b,c);i.subVectors(d,c);
a.cross(i);a.normalize();e.normal.copy(a)}},computeVertexNormals:function(g){var l,d,h,k,j,i;
i=new Array(this.vertices.length);for(l=0,d=this.vertices.length;l<d;l++){i[l]=new THREE.Vector3()
}if(g){var c,b,a;var e=new THREE.Vector3(),m=new THREE.Vector3();for(h=0,k=this.faces.length;
h<k;h++){j=this.faces[h];c=this.vertices[j.a];b=this.vertices[j.b];a=this.vertices[j.c];
e.subVectors(a,b);m.subVectors(c,b);e.cross(m);i[j.a].add(e);i[j.b].add(e);i[j.c].add(e)
}}else{for(h=0,k=this.faces.length;h<k;h++){j=this.faces[h];i[j.a].add(j.normal);
i[j.b].add(j.normal);i[j.c].add(j.normal)}}for(l=0,d=this.vertices.length;l<d;l++){i[l].normalize()
}for(h=0,k=this.faces.length;h<k;h++){j=this.faces[h];j.vertexNormals[0]=i[j.a].clone();
j.vertexNormals[1]=i[j.b].clone();j.vertexNormals[2]=i[j.c].clone()}},computeMorphNormals:function(){var e,l,g,m,h;
for(g=0,m=this.faces.length;g<m;g++){h=this.faces[g];if(!h.__originalFaceNormal){h.__originalFaceNormal=h.normal.clone()
}else{h.__originalFaceNormal.copy(h.normal)}if(!h.__originalVertexNormals){h.__originalVertexNormals=[]
}for(e=0,l=h.vertexNormals.length;e<l;e++){if(!h.__originalVertexNormals[e]){h.__originalVertexNormals[e]=h.vertexNormals[e].clone()
}else{h.__originalVertexNormals[e].copy(h.vertexNormals[e])}}}var c=new THREE.Geometry();
c.faces=this.faces;for(e=0,l=this.morphTargets.length;e<l;e++){if(!this.morphNormals[e]){this.morphNormals[e]={};
this.morphNormals[e].faceNormals=[];this.morphNormals[e].vertexNormals=[];var d=this.morphNormals[e].faceNormals;
var a=this.morphNormals[e].vertexNormals;var k,b;for(g=0,m=this.faces.length;g<m;
g++){k=new THREE.Vector3();b={a:new THREE.Vector3(),b:new THREE.Vector3(),c:new THREE.Vector3()};
d.push(k);a.push(b)}}var j=this.morphNormals[e];c.vertices=this.morphTargets[e].vertices;
c.computeFaceNormals();c.computeVertexNormals();var k,b;for(g=0,m=this.faces.length;
g<m;g++){h=this.faces[g];k=j.faceNormals[g];b=j.vertexNormals[g];k.copy(h.normal);
b.a.copy(h.vertexNormals[0]);b.b.copy(h.vertexNormals[1]);b.c.copy(h.vertexNormals[2])
}}for(g=0,m=this.faces.length;g<m;g++){h=this.faces[g];h.normal=h.__originalFaceNormal;
h.vertexNormals=h.__originalVertexNormals}},computeTangents:function(){var N,m,D,k,M,B,g,o,J,G,F,e,d,c,j,h,U,T,u,s,Q,P,q,p,H,E,b,S=[],R=[],a=new THREE.Vector3(),l=new THREE.Vector3(),K=new THREE.Vector3(),O=new THREE.Vector3(),L=new THREE.Vector3(),C;
for(D=0,k=this.vertices.length;D<k;D++){S[D]=new THREE.Vector3();R[D]=new THREE.Vector3()
}function A(v,i,f,V,t,r,n){J=v.vertices[i];G=v.vertices[f];F=v.vertices[V];e=o[t];
d=o[r];c=o[n];j=G.x-J.x;h=F.x-J.x;U=G.y-J.y;T=F.y-J.y;u=G.z-J.z;s=F.z-J.z;Q=d.x-e.x;
P=c.x-e.x;q=d.y-e.y;p=c.y-e.y;H=1/(Q*p-P*q);a.set((p*j-q*h)*H,(p*U-q*T)*H,(p*u-q*s)*H);
l.set((Q*h-P*j)*H,(Q*T-P*U)*H,(Q*s-P*u)*H);S[i].add(a);S[f].add(a);S[V].add(a);
R[i].add(l);R[f].add(l);R[V].add(l)}for(N=0,m=this.faces.length;N<m;N++){g=this.faces[N];
o=this.faceVertexUvs[0][N];A(this,g.a,g.b,g.c,0,1,2)}var I=["a","b","c","d"];for(N=0,m=this.faces.length;
N<m;N++){g=this.faces[N];for(M=0;M<Math.min(g.vertexNormals.length,3);M++){L.copy(g.vertexNormals[M]);
B=g[I[M]];E=S[B];K.copy(E);K.sub(L.multiplyScalar(L.dot(E))).normalize();O.crossVectors(g.vertexNormals[M],E);
b=O.dot(R[B]);C=(b<0)?-1:1;g.vertexTangents[M]=new THREE.Vector4(K.x,K.y,K.z,C)
}}this.hasTangents=true},computeLineDistances:function(){var e=0;var b=this.vertices;
for(var c=0,a=b.length;c<a;c++){if(c>0){e+=b[c].distanceTo(b[c-1])}this.lineDistances[c]=e
}},computeBoundingBox:function(){if(this.boundingBox===null){this.boundingBox=new THREE.Box3()
}this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){if(this.boundingSphere===null){this.boundingSphere=new THREE.Sphere()
}this.boundingSphere.setFromPoints(this.vertices)},merge:function(f,s,E){if(f instanceof THREE.Geometry===false){THREE.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",f);
return}var k,m=this.vertices.length,d=this.vertices,c=f.vertices,b=this.faces,a=f.faces,B=this.faceVertexUvs[0],A=f.faceVertexUvs[0];
if(E===undefined){E=0}if(s!==undefined){k=new THREE.Matrix3().getNormalMatrix(s)
}for(var t=0,l=c.length;t<l;t++){var C=c[t];var p=C.clone();if(s!==undefined){p.applyMatrix4(s)
}d.push(p)}for(t=0,l=a.length;t<l;t++){var h=a[t],o,D,q,n=h.vertexNormals,v=h.vertexColors;
o=new THREE.Face3(h.a+m,h.b+m,h.c+m);o.normal.copy(h.normal);if(k!==undefined){o.normal.applyMatrix3(k).normalize()
}for(var r=0,u=n.length;r<u;r++){D=n[r].clone();if(k!==undefined){D.applyMatrix3(k).normalize()
}o.vertexNormals.push(D)}o.color.copy(h.color);for(var r=0,u=v.length;r<u;r++){q=v[r];
o.vertexColors.push(q.clone())}o.materialIndex=h.materialIndex+E;b.push(o)}for(t=0,l=A.length;
t<l;t++){var g=A[t],e=[];if(g===undefined){continue}for(var r=0,u=g.length;r<u;
r++){e.push(g[r].clone())}B.push(e)}},mergeMesh:function(a){if(a instanceof THREE.Mesh===false){THREE.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",a);
return}a.matrixAutoUpdate&&a.updateMatrix();this.merge(a.geometry,a.matrix)},mergeVertices:function(){var b={};
var a=[],t=[];var f,u;var g=4;var s=Math.pow(10,g);var q,e,d;var c,p,r;for(q=0,e=this.vertices.length;
q<e;q++){f=this.vertices[q];u=Math.round(f.x*s)+"_"+Math.round(f.y*s)+"_"+Math.round(f.z*s);
if(b[u]===undefined){b[u]=q;a.push(this.vertices[q]);t[q]=a.length-1}else{t[q]=t[b[u]]
}}var l=[];for(q=0,e=this.faces.length;q<e;q++){d=this.faces[q];d.a=t[d.a];d.b=t[d.b];
d.c=t[d.c];c=[d.a,d.b,d.c];var o=-1;for(var m=0;m<3;m++){if(c[m]==c[(m+1)%3]){o=m;
l.push(q);break}}}for(q=l.length-1;q>=0;q--){var k=l[q];this.faces.splice(k,1);
for(p=0,r=this.faceVertexUvs.length;p<r;p++){this.faceVertexUvs[p].splice(k,1)}}var h=this.vertices.length-a.length;
this.vertices=a;return h},toJSON:function(){var h={metadata:{version:4,type:"BufferGeometry",generator:"BufferGeometryExporter"},uuid:this.uuid,type:this.type};
if(this.name!==""){h.name=this.name}if(this.parameters!==undefined){var f=this.parameters;
for(var H in f){if(f[H]!==undefined){h[H]=f[H]}}return h}var e=[];for(var v=0;v<this.vertices.length;
v++){var B=this.vertices[v];e.push(B.x,B.y,B.z)}var b=[];var q=[];var n={};var j=[];
var E={};var k=[];var d={};for(var v=0;v<this.faces.length;v++){var g=this.faces[v];
var o=false;var D=false;var a=this.faceVertexUvs[0][v]!==undefined;var A=g.normal.length()>0;
var u=g.vertexNormals.length>0;var s=g.color.r!==1||g.color.g!==1||g.color.b!==1;
var p=g.vertexColors.length>0;var G=0;G=m(G,0,0);G=m(G,1,o);G=m(G,2,D);G=m(G,3,a);
G=m(G,4,A);G=m(G,5,u);G=m(G,6,s);G=m(G,7,p);b.push(G);b.push(g.a,g.b,g.c);if(a){var C=this.faceVertexUvs[0][v];
b.push(c(C[0]),c(C[1]),c(C[2]))}if(A){b.push(F(g.normal))}if(u){var t=g.vertexNormals;
b.push(F(t[0]),F(t[1]),F(t[2]))}if(s){b.push(l(g.color))}if(p){var r=g.vertexColors;
b.push(l(r[0]),l(r[1]),l(r[2]))}}function m(J,i,I){return I?J|(1<<i):J&(~(1<<i))
}function F(I){var i=I.x.toString()+I.y.toString()+I.z.toString();if(n[i]!==undefined){return n[i]
}n[i]=q.length/3;q.push(I.x,I.y,I.z);return n[i]}function l(i){var I=i.r.toString()+i.g.toString()+i.b.toString();
if(E[I]!==undefined){return E[I]}E[I]=j.length;j.push(i.getHex());return E[I]}function c(i){var I=i.x.toString()+i.y.toString();
if(d[I]!==undefined){return d[I]}d[I]=k.length/2;k.push(i.x,i.y);return d[I]}h.data={};
h.data.vertices=e;h.data.normals=q;if(j.length>0){h.data.colors=j}if(k.length>0){h.data.uvs=[k]
}h.data.faces=b;return h},clone:function(){var n=new THREE.Geometry();var m=this.vertices;
for(var g=0,o=m.length;g<o;g++){n.vertices.push(m[g].clone())}var c=this.faces;
for(var g=0,o=c.length;g<o;g++){n.faces.push(c[g].clone())}for(var g=0,o=this.faceVertexUvs.length;
g<o;g++){var l=this.faceVertexUvs[g];if(n.faceVertexUvs[g]===undefined){n.faceVertexUvs[g]=[]
}for(var f=0,h=l.length;f<h;f++){var e=l[f],p=[];for(var d=0,a=e.length;d<a;d++){var b=e[d];
p.push(b.clone())}n.faceVertexUvs[g].push(p)}}return n},dispose:function(){this.dispatchEvent({type:"dispose"})
}};THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);THREE.GeometryIdCount=0;
THREE.Camera=function(){THREE.Object3D.call(this);this.type="Camera";this.matrixWorldInverse=new THREE.Matrix4();
this.projectionMatrix=new THREE.Matrix4()};THREE.Camera.prototype=Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.getWorldDirection=function(){var a=new THREE.Quaternion();
return function(c){var b=c||new THREE.Vector3();this.getWorldQuaternion(a);return b.set(0,0,-1).applyQuaternion(a)
}}();THREE.Camera.prototype.lookAt=function(){var a=new THREE.Matrix4();return function(b){a.lookAt(this.position,b,this.up);
this.quaternion.setFromRotationMatrix(a)}}();THREE.Camera.prototype.clone=function(a){if(a===undefined){a=new THREE.Camera()
}THREE.Object3D.prototype.clone.call(this,a);a.matrixWorldInverse.copy(this.matrixWorldInverse);
a.projectionMatrix.copy(this.projectionMatrix);return a};THREE.CubeCamera=function(f,e,g){THREE.Object3D.call(this);
this.type="CubeCamera";var d=90,b=1;var c=new THREE.PerspectiveCamera(d,b,f,e);
c.up.set(0,-1,0);c.lookAt(new THREE.Vector3(1,0,0));this.add(c);var j=new THREE.PerspectiveCamera(d,b,f,e);
j.up.set(0,-1,0);j.lookAt(new THREE.Vector3(-1,0,0));this.add(j);var a=new THREE.PerspectiveCamera(d,b,f,e);
a.up.set(0,0,1);a.lookAt(new THREE.Vector3(0,1,0));this.add(a);var i=new THREE.PerspectiveCamera(d,b,f,e);
i.up.set(0,0,-1);i.lookAt(new THREE.Vector3(0,-1,0));this.add(i);var k=new THREE.PerspectiveCamera(d,b,f,e);
k.up.set(0,-1,0);k.lookAt(new THREE.Vector3(0,0,1));this.add(k);var h=new THREE.PerspectiveCamera(d,b,f,e);
h.up.set(0,-1,0);h.lookAt(new THREE.Vector3(0,0,-1));this.add(h);this.renderTarget=new THREE.WebGLRenderTargetCube(g,g,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});
this.updateCubeMap=function(n,o){var m=this.renderTarget;var l=m.generateMipmaps;
m.generateMipmaps=false;m.activeCubeFace=0;n.render(o,c,m);m.activeCubeFace=1;n.render(o,j,m);
m.activeCubeFace=2;n.render(o,a,m);m.activeCubeFace=3;n.render(o,i,m);m.activeCubeFace=4;
n.render(o,k,m);m.generateMipmaps=l;m.activeCubeFace=5;n.render(o,h,m)}};THREE.CubeCamera.prototype=Object.create(THREE.Object3D.prototype);
THREE.CubeCamera.prototype.constructor=THREE.CubeCamera;THREE.OrthographicCamera=function(f,c,e,b,d,a){THREE.Camera.call(this);
this.type="OrthographicCamera";this.zoom=1;this.left=f;this.right=c;this.top=e;
this.bottom=b;this.near=(d!==undefined)?d:0.1;this.far=(a!==undefined)?a:2000;this.updateProjectionMatrix()
};THREE.OrthographicCamera.prototype=Object.create(THREE.Camera.prototype);THREE.OrthographicCamera.prototype.constructor=THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){var c=(this.right-this.left)/(2*this.zoom);
var b=(this.top-this.bottom)/(2*this.zoom);var a=(this.right+this.left)/2;var d=(this.top+this.bottom)/2;
this.projectionMatrix.makeOrthographic(a-c,a+c,d+b,d-b,this.near,this.far)};THREE.OrthographicCamera.prototype.clone=function(){var a=new THREE.OrthographicCamera();
THREE.Camera.prototype.clone.call(this,a);a.zoom=this.zoom;a.left=this.left;a.right=this.right;
a.top=this.top;a.bottom=this.bottom;a.near=this.near;a.far=this.far;a.projectionMatrix.copy(this.projectionMatrix);
return a};THREE.PerspectiveCamera=function(c,b,d,a){THREE.Camera.call(this);this.type="PerspectiveCamera";
this.zoom=1;this.fov=c!==undefined?c:50;this.aspect=b!==undefined?b:1;this.near=d!==undefined?d:0.1;
this.far=a!==undefined?a:2000;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.constructor=THREE.PerspectiveCamera;THREE.PerspectiveCamera.prototype.setLens=function(b,a){if(a===undefined){a=24
}this.fov=2*THREE.Math.radToDeg(Math.atan(a/(b*2)));this.updateProjectionMatrix()
};THREE.PerspectiveCamera.prototype.setViewOffset=function(e,c,b,f,d,a){this.fullWidth=e;
this.fullHeight=c;this.x=b;this.y=f;this.width=d;this.height=a;this.updateProjectionMatrix()
};THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){var d=THREE.Math.radToDeg(2*Math.atan(Math.tan(THREE.Math.degToRad(this.fov)*0.5)/this.zoom));
if(this.fullWidth){var c=this.fullWidth/this.fullHeight;var h=Math.tan(THREE.Math.degToRad(d*0.5))*this.near;
var b=-h;var g=c*b;var e=c*h;var f=Math.abs(e-g);var a=Math.abs(h-b);this.projectionMatrix.makeFrustum(g+this.x*f/this.fullWidth,g+(this.x+this.width)*f/this.fullWidth,h-(this.y+this.height)*a/this.fullHeight,h-this.y*a/this.fullHeight,this.near,this.far)
}else{this.projectionMatrix.makePerspective(d,this.aspect,this.near,this.far)}};
THREE.PerspectiveCamera.prototype.clone=function(){var a=new THREE.PerspectiveCamera();
THREE.Camera.prototype.clone.call(this,a);a.zoom=this.zoom;a.fov=this.fov;a.aspect=this.aspect;
a.near=this.near;a.far=this.far;a.projectionMatrix.copy(this.projectionMatrix);
return a};THREE.Light=function(a){THREE.Object3D.call(this);this.type="Light";this.color=new THREE.Color(a)
};THREE.Light.prototype=Object.create(THREE.Object3D.prototype);THREE.Light.prototype.constructor=THREE.Light;
THREE.Light.prototype.clone=function(a){if(a===undefined){a=new THREE.Light()}THREE.Object3D.prototype.clone.call(this,a);
a.color.copy(this.color);return a};THREE.AmbientLight=function(a){THREE.Light.call(this,a);
this.type="AmbientLight"};THREE.AmbientLight.prototype=Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.AmbientLight.prototype.clone=function(){var a=new THREE.AmbientLight();
THREE.Light.prototype.clone.call(this,a);return a};THREE.AreaLight=function(b,a){THREE.Light.call(this,b);
this.type="AreaLight";this.normal=new THREE.Vector3(0,-1,0);this.right=new THREE.Vector3(1,0,0);
this.intensity=(a!==undefined)?a:1;this.width=1;this.height=1;this.constantAttenuation=1.5;
this.linearAttenuation=0.5;this.quadraticAttenuation=0.1};THREE.AreaLight.prototype=Object.create(THREE.Light.prototype);
THREE.AreaLight.prototype.constructor=THREE.AreaLight;THREE.DirectionalLight=function(b,a){THREE.Light.call(this,b);
this.type="DirectionalLight";this.position.set(0,1,0);this.target=new THREE.Object3D();
this.intensity=(a!==undefined)?a:1;this.castShadow=false;this.onlyShadow=false;
this.shadowCameraNear=50;this.shadowCameraFar=5000;this.shadowCameraLeft=-500;this.shadowCameraRight=500;
this.shadowCameraTop=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=false;
this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapWidth=512;this.shadowMapHeight=512;
this.shadowCascade=false;this.shadowCascadeOffset=new THREE.Vector3(0,0,-1000);
this.shadowCascadeCount=2;this.shadowCascadeBias=[0,0,0];this.shadowCascadeWidth=[512,512,512];
this.shadowCascadeHeight=[512,512,512];this.shadowCascadeNearZ=[-1,0.99,0.998];
this.shadowCascadeFarZ=[0.99,0.998,1];this.shadowCascadeArray=[];this.shadowMap=null;
this.shadowMapSize=null;this.shadowCamera=null;this.shadowMatrix=null};THREE.DirectionalLight.prototype=Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.DirectionalLight.prototype.clone=function(){var a=new THREE.DirectionalLight();
THREE.Light.prototype.clone.call(this,a);a.target=this.target.clone();a.intensity=this.intensity;
a.castShadow=this.castShadow;a.onlyShadow=this.onlyShadow;a.shadowCameraNear=this.shadowCameraNear;
a.shadowCameraFar=this.shadowCameraFar;a.shadowCameraLeft=this.shadowCameraLeft;
a.shadowCameraRight=this.shadowCameraRight;a.shadowCameraTop=this.shadowCameraTop;
a.shadowCameraBottom=this.shadowCameraBottom;a.shadowCameraVisible=this.shadowCameraVisible;
a.shadowBias=this.shadowBias;a.shadowDarkness=this.shadowDarkness;a.shadowMapWidth=this.shadowMapWidth;
a.shadowMapHeight=this.shadowMapHeight;a.shadowCascade=this.shadowCascade;a.shadowCascadeOffset.copy(this.shadowCascadeOffset);
a.shadowCascadeCount=this.shadowCascadeCount;a.shadowCascadeBias=this.shadowCascadeBias.slice(0);
a.shadowCascadeWidth=this.shadowCascadeWidth.slice(0);a.shadowCascadeHeight=this.shadowCascadeHeight.slice(0);
a.shadowCascadeNearZ=this.shadowCascadeNearZ.slice(0);a.shadowCascadeFarZ=this.shadowCascadeFarZ.slice(0);
return a};THREE.HemisphereLight=function(b,c,a){THREE.Light.call(this,b);this.type="HemisphereLight";
this.position.set(0,100,0);this.groundColor=new THREE.Color(c);this.intensity=(a!==undefined)?a:1
};THREE.HemisphereLight.prototype=Object.create(THREE.Light.prototype);THREE.HemisphereLight.prototype.constructor=THREE.HemisphereLight;
THREE.HemisphereLight.prototype.clone=function(){var a=new THREE.HemisphereLight();
THREE.Light.prototype.clone.call(this,a);a.groundColor.copy(this.groundColor);a.intensity=this.intensity;
return a};THREE.PointLight=function(b,a,d,c){THREE.Light.call(this,b);this.type="PointLight";
this.intensity=(a!==undefined)?a:1;this.distance=(d!==undefined)?d:0;this.decay=(c!==undefined)?c:1
};THREE.PointLight.prototype=Object.create(THREE.Light.prototype);THREE.PointLight.prototype.constructor=THREE.PointLight;
THREE.PointLight.prototype.clone=function(){var a=new THREE.PointLight();THREE.Light.prototype.clone.call(this,a);
a.intensity=this.intensity;a.distance=this.distance;a.decay=this.decay;return a
};THREE.SpotLight=function(b,a,f,e,d,c){THREE.Light.call(this,b);this.type="SpotLight";
this.position.set(0,1,0);this.target=new THREE.Object3D();this.intensity=(a!==undefined)?a:1;
this.distance=(f!==undefined)?f:0;this.angle=(e!==undefined)?e:Math.PI/3;this.exponent=(d!==undefined)?d:10;
this.decay=(c!==undefined)?c:1;this.castShadow=false;this.onlyShadow=false;this.shadowCameraNear=50;
this.shadowCameraFar=5000;this.shadowCameraFov=50;this.shadowCameraVisible=false;
this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapWidth=512;this.shadowMapHeight=512;
this.shadowMap=null;this.shadowMapSize=null;this.shadowCamera=null;this.shadowMatrix=null
};THREE.SpotLight.prototype=Object.create(THREE.Light.prototype);THREE.SpotLight.prototype.constructor=THREE.SpotLight;
THREE.SpotLight.prototype.clone=function(){var a=new THREE.SpotLight();THREE.Light.prototype.clone.call(this,a);
a.target=this.target.clone();a.intensity=this.intensity;a.distance=this.distance;
a.angle=this.angle;a.exponent=this.exponent;a.decay=this.decay;a.castShadow=this.castShadow;
a.onlyShadow=this.onlyShadow;a.shadowCameraNear=this.shadowCameraNear;a.shadowCameraFar=this.shadowCameraFar;
a.shadowCameraFov=this.shadowCameraFov;a.shadowCameraVisible=this.shadowCameraVisible;
a.shadowBias=this.shadowBias;a.shadowDarkness=this.shadowDarkness;a.shadowMapWidth=this.shadowMapWidth;
a.shadowMapHeight=this.shadowMapHeight;return a};THREE.Cache={files:{},add:function(b,a){this.files[b]=a
},get:function(a){return this.files[a]},remove:function(a){delete this.files[a]
},clear:function(){this.files={}}};THREE.Loader=function(a){this.showStatus=a;this.statusDomElement=a?THREE.Loader.prototype.addStatusElement():null;
this.imageLoader=new THREE.ImageLoader();this.onLoadStart=function(){};this.onLoadProgress=function(){};
this.onLoadComplete=function(){}};THREE.Loader.prototype={constructor:THREE.Loader,crossOrigin:undefined,addStatusElement:function(){var a=document.createElement("div");
a.style.position="absolute";a.style.right="0px";a.style.top="0px";a.style.fontSize="0.8em";
a.style.textAlign="left";a.style.background="rgba(0,0,0,0.25)";a.style.color="#fff";
a.style.width="120px";a.style.padding="0.5em 0.5em 0.5em 0.5em";a.style.zIndex=1000;
a.innerHTML="Loading ...";return a},updateProgress:function(a){var b="Loaded ";
if(a.total){b+=(100*a.loaded/a.total).toFixed(0)+"%"}else{b+=(a.loaded/1024).toFixed(2)+" KB"
}this.statusDomElement.innerHTML=b},extractUrlBase:function(a){var b=a.split("/");
if(b.length===1){return"./"}b.pop();return b.join("/")+"/"},initMaterials:function(a,c){var d=[];
for(var b=0;b<a.length;++b){d[b]=this.createMaterial(a[b],c)}return d},needsTangents:function(b){for(var d=0,c=b.length;
d<c;d++){var a=b[d];if(a instanceof THREE.ShaderMaterial){return true}}return false
},createMaterial:function(e,c){var j=this;function a(m){var k=Math.log(m)/Math.LN2;
return Math.pow(2,Math.round(k))}function g(r,l,p,m,q,n,k){var o=c+p;var s;var t=THREE.Loader.Handlers.get(o);
if(t!==null){s=t.load(o)}else{s=new THREE.Texture();t=j.imageLoader;t.crossOrigin=j.crossOrigin;
t.load(o,function(D){if(THREE.Math.isPowerOfTwo(D.width)===false||THREE.Math.isPowerOfTwo(D.height)===false){var C=a(D.width);
var v=a(D.height);var A=document.createElement("canvas");A.width=C;A.height=v;var B=A.getContext("2d");
B.drawImage(D,0,0,C,v);s.image=A}else{s.image=D}s.needsUpdate=true})}s.sourceFile=p;
if(m){s.repeat.set(m[0],m[1]);if(m[0]!==1){s.wrapS=THREE.RepeatWrapping}if(m[1]!==1){s.wrapT=THREE.RepeatWrapping
}}if(q){s.offset.set(q[0],q[1])}if(n){var u={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping};
if(u[n[0]]!==undefined){s.wrapS=u[n[0]]}if(u[n[1]]!==undefined){s.wrapT=u[n[1]]
}}if(k){s.anisotropy=k}r[l]=s}function b(k){return(k[0]*255<<16)+(k[1]*255<<8)+k[2]*255
}var d="MeshLambertMaterial";var i={color:15658734,opacity:1,map:null,lightMap:null,normalMap:null,bumpMap:null,wireframe:false};
if(e.shading){var h=e.shading.toLowerCase();if(h==="phong"){d="MeshPhongMaterial"
}else{if(h==="basic"){d="MeshBasicMaterial"}}}if(e.blending!==undefined&&THREE[e.blending]!==undefined){i.blending=THREE[e.blending]
}if(e.transparent!==undefined){i.transparent=e.transparent}if(e.opacity!==undefined&&e.opacity<1){i.transparent=true
}if(e.depthTest!==undefined){i.depthTest=e.depthTest}if(e.depthWrite!==undefined){i.depthWrite=e.depthWrite
}if(e.visible!==undefined){i.visible=e.visible}if(e.flipSided!==undefined){i.side=THREE.BackSide
}if(e.doubleSided!==undefined){i.side=THREE.DoubleSide}if(e.wireframe!==undefined){i.wireframe=e.wireframe
}if(e.vertexColors!==undefined){if(e.vertexColors==="face"){i.vertexColors=THREE.FaceColors
}else{if(e.vertexColors){i.vertexColors=THREE.VertexColors}}}if(e.colorDiffuse){i.color=b(e.colorDiffuse)
}else{if(e.DbgColor){i.color=e.DbgColor}}if(e.colorSpecular){i.specular=b(e.colorSpecular)
}if(e.colorEmissive){i.emissive=b(e.colorEmissive)}if(e.transparency!==undefined){console.warn("THREE.Loader: transparency has been renamed to opacity");
e.opacity=e.transparency}if(e.opacity!==undefined){i.opacity=e.opacity}if(e.specularCoef){i.shininess=e.specularCoef
}if(e.mapDiffuse&&c){g(i,"map",e.mapDiffuse,e.mapDiffuseRepeat,e.mapDiffuseOffset,e.mapDiffuseWrap,e.mapDiffuseAnisotropy)
}if(e.mapLight&&c){g(i,"lightMap",e.mapLight,e.mapLightRepeat,e.mapLightOffset,e.mapLightWrap,e.mapLightAnisotropy)
}if(e.mapBump&&c){g(i,"bumpMap",e.mapBump,e.mapBumpRepeat,e.mapBumpOffset,e.mapBumpWrap,e.mapBumpAnisotropy)
}if(e.mapNormal&&c){g(i,"normalMap",e.mapNormal,e.mapNormalRepeat,e.mapNormalOffset,e.mapNormalWrap,e.mapNormalAnisotropy)
}if(e.mapSpecular&&c){g(i,"specularMap",e.mapSpecular,e.mapSpecularRepeat,e.mapSpecularOffset,e.mapSpecularWrap,e.mapSpecularAnisotropy)
}if(e.mapAlpha&&c){g(i,"alphaMap",e.mapAlpha,e.mapAlphaRepeat,e.mapAlphaOffset,e.mapAlphaWrap,e.mapAlphaAnisotropy)
}if(e.mapBumpScale){i.bumpScale=e.mapBumpScale}if(e.mapNormalFactor){i.normalScale=new THREE.Vector2(e.mapNormalFactor,e.mapNormalFactor)
}var f=new THREE[d](i);if(e.DbgName!==undefined){f.name=e.DbgName}return f}};THREE.Loader.Handlers={handlers:[],add:function(b,a){this.handlers.push(b,a)
},get:function(d){for(var c=0,b=this.handlers.length;c<b;c+=2){var e=this.handlers[c];
var a=this.handlers[c+1];if(e.test(d)){return a}}return null}};THREE.XHRLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager
};THREE.XHRLoader.prototype={constructor:THREE.XHRLoader,load:function(a,d,g,f){var c=this;
var b=THREE.Cache.get(a);if(b!==undefined){if(d){d(b)}return}var e=new XMLHttpRequest();
e.open("GET",a,true);e.addEventListener("load",function(h){THREE.Cache.add(a,this.response);
if(d){d(this.response)}c.manager.itemEnd(a)},false);if(g!==undefined){e.addEventListener("progress",function(h){g(h)
},false)}if(f!==undefined){e.addEventListener("error",function(h){f(h)},false)}if(this.crossOrigin!==undefined){e.crossOrigin=this.crossOrigin
}if(this.responseType!==undefined){e.responseType=this.responseType}e.send(null);
c.manager.itemStart(a)},setResponseType:function(a){this.responseType=a},setCrossOrigin:function(a){this.crossOrigin=a
}};THREE.ImageLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager
};THREE.ImageLoader.prototype={constructor:THREE.ImageLoader,load:function(a,d,g,e){var c=this;
var b=THREE.Cache.get(a);if(b!==undefined){d(b);return}var f=document.createElement("img");
f.addEventListener("load",function(h){THREE.Cache.add(a,this);if(d){d(this)}c.manager.itemEnd(a)
},false);if(g!==undefined){f.addEventListener("progress",function(h){g(h)},false)
}if(e!==undefined){f.addEventListener("error",function(h){e(h)},false)}if(this.crossOrigin!==undefined){f.crossOrigin=this.crossOrigin
}f.src=a;c.manager.itemStart(a);return f},setCrossOrigin:function(a){this.crossOrigin=a
}};THREE.JSONLoader=function(a){THREE.Loader.call(this,a);this.withCredentials=false
};THREE.JSONLoader.prototype=Object.create(THREE.Loader.prototype);THREE.JSONLoader.prototype.constructor=THREE.JSONLoader;
THREE.JSONLoader.prototype.load=function(a,c,b){b=b&&(typeof b==="string")?b:this.extractUrlBase(a);
this.onLoadStart();this.loadAjaxJSON(this,a,c,b)};THREE.JSONLoader.prototype.loadAjaxJSON=function(b,a,g,e,d){var f=new XMLHttpRequest();
var c=0;f.onreadystatechange=function(){if(f.readyState===f.DONE){if(f.status===200||f.status===0){if(f.responseText){var j=JSON.parse(f.responseText);
var i=j.metadata;if(i!==undefined){if(i.type==="object"){THREE.error("THREE.JSONLoader: "+a+" should be loaded with THREE.ObjectLoader instead.");
return}if(i.type==="scene"){THREE.error("THREE.JSONLoader: "+a+" seems to be a Scene. Use THREE.SceneLoader instead.");
return}}var h=b.parse(j,e);g(h.geometry,h.materials)}else{THREE.error("THREE.JSONLoader: "+a+" seems to be unreachable or the file is empty.")
}b.onLoadComplete()}else{THREE.error("THREE.JSONLoader: Couldn't load "+a+" ("+f.status+")")
}}else{if(f.readyState===f.LOADING){if(d){if(c===0){c=f.getResponseHeader("Content-Length")
}d({total:c,loaded:f.responseText.length})}}else{if(f.readyState===f.HEADERS_RECEIVED){if(d!==undefined){c=f.getResponseHeader("Content-Length")
}}}}};f.open("GET",a,true);f.withCredentials=this.withCredentials;f.send(null)};
THREE.JSONLoader.prototype.parse=function(d,e){var h=new THREE.Geometry(),g=(d.scale!==undefined)?1/d.scale:1;
f(g);c();b(g);h.computeFaceNormals();h.computeBoundingSphere();function f(W){function B(j,i){return j&(1<<i)
}var R,Q,H,s,r,q,U,K,D,o,I,L,k,T,P,O,M,S,E,n,m,C,V,p,A,J,G,l=d.faces,t=d.vertices,N=d.normals,F=d.colors,X=0;
if(d.uvs!==undefined){for(R=0;R<d.uvs.length;R++){if(d.uvs[R].length){X++}}for(R=0;
R<X;R++){h.faceVertexUvs[R]=[]}}s=0;r=t.length;while(s<r){S=new THREE.Vector3();
S.x=t[s++]*W;S.y=t[s++]*W;S.z=t[s++]*W;h.vertices.push(S)}s=0;r=l.length;while(s<r){o=l[s++];
I=B(o,0);L=B(o,1);k=B(o,3);T=B(o,4);P=B(o,5);O=B(o,6);M=B(o,7);if(I){n=new THREE.Face3();
n.a=l[s];n.b=l[s+1];n.c=l[s+3];m=new THREE.Face3();m.a=l[s+1];m.b=l[s+2];m.c=l[s+3];
s+=4;if(L){D=l[s++];n.materialIndex=D;m.materialIndex=D}H=h.faces.length;if(k){for(R=0;
R<X;R++){p=d.uvs[R];h.faceVertexUvs[R][H]=[];h.faceVertexUvs[R][H+1]=[];for(Q=0;
Q<4;Q++){K=l[s++];J=p[K*2];G=p[K*2+1];A=new THREE.Vector2(J,G);if(Q!==2){h.faceVertexUvs[R][H].push(A)
}if(Q!==0){h.faceVertexUvs[R][H+1].push(A)}}}}if(T){U=l[s++]*3;n.normal.set(N[U++],N[U++],N[U]);
m.normal.copy(n.normal)}if(P){for(R=0;R<4;R++){U=l[s++]*3;V=new THREE.Vector3(N[U++],N[U++],N[U]);
if(R!==2){n.vertexNormals.push(V)}if(R!==0){m.vertexNormals.push(V)}}}if(O){q=l[s++];
C=F[q];n.color.setHex(C);m.color.setHex(C)}if(M){for(R=0;R<4;R++){q=l[s++];C=F[q];
if(R!==2){n.vertexColors.push(new THREE.Color(C))}if(R!==0){m.vertexColors.push(new THREE.Color(C))
}}}h.faces.push(n);h.faces.push(m)}else{E=new THREE.Face3();E.a=l[s++];E.b=l[s++];
E.c=l[s++];if(L){D=l[s++];E.materialIndex=D}H=h.faces.length;if(k){for(R=0;R<X;
R++){p=d.uvs[R];h.faceVertexUvs[R][H]=[];for(Q=0;Q<3;Q++){K=l[s++];J=p[K*2];G=p[K*2+1];
A=new THREE.Vector2(J,G);h.faceVertexUvs[R][H].push(A)}}}if(T){U=l[s++]*3;E.normal.set(N[U++],N[U++],N[U])
}if(P){for(R=0;R<3;R++){U=l[s++]*3;V=new THREE.Vector3(N[U++],N[U++],N[U]);E.vertexNormals.push(V)
}}if(O){q=l[s++];E.color.setHex(F[q])}if(M){for(R=0;R<3;R++){q=l[s++];E.vertexColors.push(new THREE.Color(F[q]))
}}h.faces.push(E)}}}function c(){var j=(d.influencesPerVertex!==undefined)?d.influencesPerVertex:2;
if(d.skinWeights){for(var m=0,k=d.skinWeights.length;m<k;m+=j){var t=d.skinWeights[m];
var r=(j>1)?d.skinWeights[m+1]:0;var p=(j>2)?d.skinWeights[m+2]:0;var u=(j>3)?d.skinWeights[m+3]:0;
h.skinWeights.push(new THREE.Vector4(t,r,p,u))}}if(d.skinIndices){for(var m=0,k=d.skinIndices.length;
m<k;m+=j){var s=d.skinIndices[m];var q=(j>1)?d.skinIndices[m+1]:0;var o=(j>2)?d.skinIndices[m+2]:0;
var n=(j>3)?d.skinIndices[m+3]:0;h.skinIndices.push(new THREE.Vector4(s,q,o,n))
}}h.bones=d.bones;if(h.bones&&h.bones.length>0&&(h.skinWeights.length!==h.skinIndices.length||h.skinIndices.length!==h.vertices.length)){THREE.warn("THREE.JSONLoader: When skinning, number of vertices ("+h.vertices.length+"), skinIndices ("+h.skinIndices.length+"), and skinWeights ("+h.skinWeights.length+") should match.")
}h.animation=d.animation;h.animations=d.animations}function b(m){if(d.morphTargets!==undefined){var p,n,A,k,r,B;
for(p=0,n=d.morphTargets.length;p<n;p++){h.morphTargets[p]={};h.morphTargets[p].name=d.morphTargets[p].name;
h.morphTargets[p].vertices=[];r=h.morphTargets[p].vertices;B=d.morphTargets[p].vertices;
for(A=0,k=B.length;A<k;A+=3){var q=new THREE.Vector3();q.x=B[A]*m;q.y=B[A+1]*m;
q.z=B[A+2]*m;r.push(q)}}}if(d.morphColors!==undefined){var p,n,s,u,t,j,o;for(p=0,n=d.morphColors.length;
p<n;p++){h.morphColors[p]={};h.morphColors[p].name=d.morphColors[p].name;h.morphColors[p].colors=[];
t=h.morphColors[p].colors;j=d.morphColors[p].colors;for(s=0,u=j.length;s<u;s+=3){o=new THREE.Color(16755200);
o.setRGB(j[s],j[s+1],j[s+2]);t.push(o)}}}}if(d.materials===undefined||d.materials.length===0){return{geometry:h}
}else{var a=this.initMaterials(d.materials,e);if(this.needsTangents(a)){h.computeTangents()
}return{geometry:h,materials:a}}};THREE.LoadingManager=function(c,f,e){var b=this;
var a=0,d=0;this.onLoad=c;this.onProgress=f;this.onError=e;this.itemStart=function(g){d++
};this.itemEnd=function(g){a++;if(b.onProgress!==undefined){b.onProgress(g,a,d)
}if(a===d&&b.onLoad!==undefined){b.onLoad()}}};THREE.DefaultLoadingManager=new THREE.LoadingManager();
THREE.BufferGeometryLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager
};THREE.BufferGeometryLoader.prototype={constructor:THREE.BufferGeometryLoader,load:function(b,d,f,e){var c=this;
var a=new THREE.XHRLoader(c.manager);a.setCrossOrigin(this.crossOrigin);a.load(b,function(g){d(c.parse(JSON.parse(g)))
},f,e)},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(i){var e=new THREE.BufferGeometry();
var d=i.data.attributes;for(var h in d){var b=d[h];var f=new self[b.type](b.array);
e.addAttribute(h,new THREE.BufferAttribute(f,b.itemSize))}var c=i.data.offsets;
if(c!==undefined){e.offsets=JSON.parse(JSON.stringify(c))}var g=i.data.boundingSphere;
if(g!==undefined){var a=new THREE.Vector3();if(g.center!==undefined){a.fromArray(g.center)
}e.boundingSphere=new THREE.Sphere(a,g.radius)}return e}};THREE.MaterialLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager
};THREE.MaterialLoader.prototype={constructor:THREE.MaterialLoader,load:function(b,d,f,e){var c=this;
var a=new THREE.XHRLoader(c.manager);a.setCrossOrigin(this.crossOrigin);a.load(b,function(g){d(c.parse(JSON.parse(g)))
},f,e)},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(c){var d=new THREE[c.type];
if(c.color!==undefined){d.color.setHex(c.color)}if(c.emissive!==undefined){d.emissive.setHex(c.emissive)
}if(c.specular!==undefined){d.specular.setHex(c.specular)}if(c.shininess!==undefined){d.shininess=c.shininess
}if(c.uniforms!==undefined){d.uniforms=c.uniforms}if(c.vertexShader!==undefined){d.vertexShader=c.vertexShader
}if(c.fragmentShader!==undefined){d.fragmentShader=c.fragmentShader}if(c.vertexColors!==undefined){d.vertexColors=c.vertexColors
}if(c.shading!==undefined){d.shading=c.shading}if(c.blending!==undefined){d.blending=c.blending
}if(c.side!==undefined){d.side=c.side}if(c.opacity!==undefined){d.opacity=c.opacity
}if(c.transparent!==undefined){d.transparent=c.transparent}if(c.wireframe!==undefined){d.wireframe=c.wireframe
}if(c.size!==undefined){d.size=c.size}if(c.sizeAttenuation!==undefined){d.sizeAttenuation=c.sizeAttenuation
}if(c.materials!==undefined){for(var b=0,a=c.materials.length;b<a;b++){d.materials.push(this.parse(c.materials[b]))
}}return d}};THREE.ObjectLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager;
this.texturePath=""};THREE.ObjectLoader.prototype={constructor:THREE.ObjectLoader,load:function(b,d,f,e){if(this.texturePath===""){this.texturePath=b.substring(0,b.lastIndexOf("/")+1)
}var c=this;var a=new THREE.XHRLoader(c.manager);a.setCrossOrigin(this.crossOrigin);
a.load(b,function(g){c.parse(JSON.parse(g),d)},f,e)},setTexturePath:function(a){this.texturePath=a
},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(e,g){var f=this.parseGeometries(e.geometries);
var b=this.parseImages(e.images,function(){if(g!==undefined){g(d)}});var a=this.parseTextures(e.textures,b);
var c=this.parseMaterials(e.materials,a);var d=this.parseObject(e.object,f,c);if(e.images===undefined||e.images.length===0){if(g!==undefined){g(d)
}}return d},parseGeometries:function(d){var e={};if(d!==undefined){var b=new THREE.JSONLoader();
var g=new THREE.BufferGeometryLoader();for(var c=0,a=d.length;c<a;c++){var h;var f=d[c];
switch(f.type){case"PlaneGeometry":case"PlaneBufferGeometry":h=new THREE[f.type](f.width,f.height,f.widthSegments,f.heightSegments);
break;case"BoxGeometry":case"CubeGeometry":h=new THREE.BoxGeometry(f.width,f.height,f.depth,f.widthSegments,f.heightSegments,f.depthSegments);
break;case"CircleGeometry":h=new THREE.CircleGeometry(f.radius,f.segments);break;
case"CylinderGeometry":h=new THREE.CylinderGeometry(f.radiusTop,f.radiusBottom,f.height,f.radialSegments,f.heightSegments,f.openEnded);
break;case"SphereGeometry":h=new THREE.SphereGeometry(f.radius,f.widthSegments,f.heightSegments,f.phiStart,f.phiLength,f.thetaStart,f.thetaLength);
break;case"IcosahedronGeometry":h=new THREE.IcosahedronGeometry(f.radius,f.detail);
break;case"TorusGeometry":h=new THREE.TorusGeometry(f.radius,f.tube,f.radialSegments,f.tubularSegments,f.arc);
break;case"TorusKnotGeometry":h=new THREE.TorusKnotGeometry(f.radius,f.tube,f.radialSegments,f.tubularSegments,f.p,f.q,f.heightScale);
break;case"BufferGeometry":h=g.parse(f);break;case"Geometry":h=b.parse(f.data).geometry;
break}h.uuid=f.uuid;if(f.name!==undefined){h.name=f.name}e[f.uuid]=h}}return e},parseMaterials:function(j,f){var h={};
if(j!==undefined){var b=function(i){if(f[i]===undefined){THREE.warn("THREE.ObjectLoader: Undefined texture",i)
}return f[i]};var g=new THREE.MaterialLoader();for(var d=0,a=j.length;d<a;d++){var c=j[d];
var e=g.parse(c);e.uuid=c.uuid;if(c.name!==undefined){e.name=c.name}if(c.map!==undefined){e.map=b(c.map)
}if(c.bumpMap!==undefined){e.bumpMap=b(c.bumpMap);if(c.bumpScale){e.bumpScale=new THREE.Vector2(c.bumpScale,c.bumpScale)
}}if(c.alphaMap!==undefined){e.alphaMap=b(c.alphaMap)}if(c.envMap!==undefined){e.envMap=b(c.envMap)
}if(c.normalMap!==undefined){e.normalMap=b(c.normalMap);if(c.normalScale){e.normalScale=new THREE.Vector2(c.normalScale,c.normalScale)
}}if(c.lightMap!==undefined){e.lightMap=b(c.lightMap)}if(c.specularMap!==undefined){e.specularMap=b(c.specularMap)
}h[c.uuid]=e}}return h},parseImages:function(k,f){var j=this;var g={};if(k!==undefined&&k.length>0){var d=new THREE.LoadingManager(f);
var h=new THREE.ImageLoader(d);h.setCrossOrigin(this.crossOrigin);var a=function(i){j.manager.itemStart(i);
return h.load(i,function(){j.manager.itemEnd(i)})};for(var e=0,c=k.length;e<c;e++){var b=k[e];
var m=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(b.url)?b.url:j.texturePath+b.url;g[b.uuid]=a(m)
}}return g},parseTextures:function(e,b){var a={};if(e!==undefined){for(var d=0,c=e.length;
d<c;d++){var g=e[d];if(g.image===undefined){THREE.warn('THREE.ObjectLoader: No "image" speficied for',g.uuid)
}if(b[g.image]===undefined){THREE.warn("THREE.ObjectLoader: Undefined image",g.image)
}var f=new THREE.Texture(b[g.image]);f.needsUpdate=true;f.uuid=g.uuid;if(g.name!==undefined){f.name=g.name
}if(g.repeat!==undefined){f.repeat=new THREE.Vector2(g.repeat[0],g.repeat[1])}if(g.minFilter!==undefined){f.minFilter=THREE[g.minFilter]
}if(g.magFilter!==undefined){f.magFilter=THREE[g.magFilter]}if(g.anisotropy!==undefined){f.anisotropy=g.anisotropy
}if(g.wrap instanceof Array){f.wrapS=THREE[g.wrap[0]];f.wrapT=THREE[g.wrap[1]]}a[g.uuid]=f
}}return a},parseObject:function(){var a=new THREE.Matrix4();return function(g,f,c){var d;
var e=function(i){if(f[i]===undefined){THREE.warn("THREE.ObjectLoader: Undefined geometry",i)
}return f[i]};var b=function(i){if(c[i]===undefined){THREE.warn("THREE.ObjectLoader: Undefined material",i)
}return c[i]};switch(g.type){case"Scene":d=new THREE.Scene();break;case"PerspectiveCamera":d=new THREE.PerspectiveCamera(g.fov,g.aspect,g.near,g.far);
break;case"OrthographicCamera":d=new THREE.OrthographicCamera(g.left,g.right,g.top,g.bottom,g.near,g.far);
break;case"AmbientLight":d=new THREE.AmbientLight(g.color);break;case"DirectionalLight":d=new THREE.DirectionalLight(g.color,g.intensity);
break;case"PointLight":d=new THREE.PointLight(g.color,g.intensity,g.distance,g.decay);
break;case"SpotLight":d=new THREE.SpotLight(g.color,g.intensity,g.distance,g.angle,g.exponent,g.decay);
break;case"HemisphereLight":d=new THREE.HemisphereLight(g.color,g.groundColor,g.intensity);
break;case"Mesh":d=new THREE.Mesh(e(g.geometry),b(g.material));break;case"Line":d=new THREE.Line(e(g.geometry),b(g.material),g.mode);
break;case"PointCloud":d=new THREE.PointCloud(e(g.geometry),b(g.material));break;
case"Sprite":d=new THREE.Sprite(b(g.material));break;case"Group":d=new THREE.Group();
break;default:d=new THREE.Object3D()}d.uuid=g.uuid;if(g.name!==undefined){d.name=g.name
}if(g.matrix!==undefined){a.fromArray(g.matrix);a.decompose(d.position,d.quaternion,d.scale)
}else{if(g.position!==undefined){d.position.fromArray(g.position)}if(g.rotation!==undefined){d.rotation.fromArray(g.rotation)
}if(g.scale!==undefined){d.scale.fromArray(g.scale)}}if(g.visible!==undefined){d.visible=g.visible
}if(g.userData!==undefined){d.userData=g.userData}if(g.children!==undefined){for(var h in g.children){d.add(this.parseObject(g.children[h],f,c))
}}return d}}()};THREE.TextureLoader=function(a){this.manager=(a!==undefined)?a:THREE.DefaultLoadingManager
};THREE.TextureLoader.prototype={constructor:THREE.TextureLoader,load:function(b,d,f,e){var c=this;
var a=new THREE.ImageLoader(c.manager);a.setCrossOrigin(this.crossOrigin);a.load(b,function(h){var g=new THREE.Texture(h);
g.needsUpdate=true;if(d!==undefined){d(g)}},f,e)},setCrossOrigin:function(a){this.crossOrigin=a
}};THREE.DataTextureLoader=THREE.BinaryTextureLoader=function(){this._parser=null
};THREE.BinaryTextureLoader.prototype={constructor:THREE.BinaryTextureLoader,load:function(b,d,g,f){var c=this;
var e=new THREE.DataTexture();var a=new THREE.XHRLoader();a.setResponseType("arraybuffer");
a.load(b,function(h){var i=c._parser(h);if(!i){return}if(undefined!==i.image){e.image=i.image
}else{if(undefined!==i.data){e.image.width=i.width;e.image.height=i.height;e.image.data=i.data
}}e.wrapS=undefined!==i.wrapS?i.wrapS:THREE.ClampToEdgeWrapping;e.wrapT=undefined!==i.wrapT?i.wrapT:THREE.ClampToEdgeWrapping;
e.magFilter=undefined!==i.magFilter?i.magFilter:THREE.LinearFilter;e.minFilter=undefined!==i.minFilter?i.minFilter:THREE.LinearMipMapLinearFilter;
e.anisotropy=undefined!==i.anisotropy?i.anisotropy:1;if(undefined!==i.format){e.format=i.format
}if(undefined!==i.type){e.type=i.type}if(undefined!==i.mipmaps){e.mipmaps=i.mipmaps
}if(1===i.mipmapCount){e.minFilter=THREE.LinearFilter}e.needsUpdate=true;if(d){d(e,i)
}},g,f);return e}};THREE.CompressedTextureLoader=function(){this._parser=null};
THREE.CompressedTextureLoader.prototype={constructor:THREE.CompressedTextureLoader,load:function(a,g,d){var l=this;
var h=[];var e=new THREE.CompressedTexture();e.image=h;var k=new THREE.XHRLoader();
k.setResponseType("arraybuffer");if(a instanceof Array){var c=0;var f=function(m){k.load(a[m],function(i){var n=l._parser(i,true);
h[m]={width:n.width,height:n.height,format:n.format,mipmaps:n.mipmaps};c+=1;if(c===6){if(n.mipmapCount==1){e.minFilter=THREE.LinearFilter
}e.format=n.format;e.needsUpdate=true;if(g){g(e)}}})};for(var b=0,j=a.length;b<j;
++b){f(b)}}else{k.load(a,function(n){var q=l._parser(n,true);if(q.isCubemap){var m=q.mipmaps.length/q.mipmapCount;
for(var p=0;p<m;p++){h[p]={mipmaps:[]};for(var o=0;o<q.mipmapCount;o++){h[p].mipmaps.push(q.mipmaps[p*q.mipmapCount+o]);
h[p].format=q.format;h[p].width=q.width;h[p].height=q.height}}}else{e.image.width=q.width;
e.image.height=q.height;e.mipmaps=q.mipmaps}if(q.mipmapCount===1){e.minFilter=THREE.LinearFilter
}e.format=q.format;e.needsUpdate=true;if(g){g(e)}})}return e}};THREE.Material=function(){Object.defineProperty(this,"id",{value:THREE.MaterialIdCount++});
this.uuid=THREE.Math.generateUUID();this.name="";this.type="Material";this.side=THREE.FrontSide;
this.opacity=1;this.transparent=false;this.blending=THREE.NormalBlending;this.blendSrc=THREE.SrcAlphaFactor;
this.blendDst=THREE.OneMinusSrcAlphaFactor;this.blendEquation=THREE.AddEquation;
this.blendSrcAlpha=null;this.blendDstAlpha=null;this.blendEquationAlpha=null;this.depthTest=true;
this.depthWrite=true;this.colorWrite=true;this.polygonOffset=false;this.polygonOffsetFactor=0;
this.polygonOffsetUnits=0;this.alphaTest=0;this.overdraw=0;this.visible=true;this._needsUpdate=true
};THREE.Material.prototype={constructor:THREE.Material,get needsUpdate(){return this._needsUpdate
},set needsUpdate(a){if(a===true){this.update()}this._needsUpdate=a},setValues:function(a){if(a===undefined){return
}for(var b in a){var d=a[b];if(d===undefined){THREE.warn("THREE.Material: '"+b+"' parameter is undefined.");
continue}if(b in this){var c=this[b];if(c instanceof THREE.Color){c.set(d)}else{if(c instanceof THREE.Vector3&&d instanceof THREE.Vector3){c.copy(d)
}else{if(b=="overdraw"){this[b]=Number(d)}else{this[b]=d}}}}}},toJSON:function(){var a={metadata:{version:4.2,type:"material",generator:"MaterialExporter"},uuid:this.uuid,type:this.type};
if(this.name!==""){a.name=this.name}if(this instanceof THREE.MeshBasicMaterial){a.color=this.color.getHex();
if(this.vertexColors!==THREE.NoColors){a.vertexColors=this.vertexColors}if(this.blending!==THREE.NormalBlending){a.blending=this.blending
}if(this.side!==THREE.FrontSide){a.side=this.side}}else{if(this instanceof THREE.MeshLambertMaterial){a.color=this.color.getHex();
a.emissive=this.emissive.getHex();if(this.vertexColors!==THREE.NoColors){a.vertexColors=this.vertexColors
}if(this.shading!==THREE.SmoothShading){a.shading=this.shading}if(this.blending!==THREE.NormalBlending){a.blending=this.blending
}if(this.side!==THREE.FrontSide){a.side=this.side}}else{if(this instanceof THREE.MeshPhongMaterial){a.color=this.color.getHex();
a.emissive=this.emissive.getHex();a.specular=this.specular.getHex();a.shininess=this.shininess;
if(this.vertexColors!==THREE.NoColors){a.vertexColors=this.vertexColors}if(this.shading!==THREE.SmoothShading){a.shading=this.shading
}if(this.blending!==THREE.NormalBlending){a.blending=this.blending}if(this.side!==THREE.FrontSide){a.side=this.side
}}else{if(this instanceof THREE.MeshNormalMaterial){if(this.blending!==THREE.NormalBlending){a.blending=this.blending
}if(this.side!==THREE.FrontSide){a.side=this.side}}else{if(this instanceof THREE.MeshDepthMaterial){if(this.blending!==THREE.NormalBlending){a.blending=this.blending
}if(this.side!==THREE.FrontSide){a.side=this.side}}else{if(this instanceof THREE.PointCloudMaterial){a.size=this.size;
a.sizeAttenuation=this.sizeAttenuation;a.color=this.color.getHex();if(this.vertexColors!==THREE.NoColors){a.vertexColors=this.vertexColors
}if(this.blending!==THREE.NormalBlending){a.blending=this.blending}}else{if(this instanceof THREE.ShaderMaterial){a.uniforms=this.uniforms;
a.vertexShader=this.vertexShader;a.fragmentShader=this.fragmentShader}else{if(this instanceof THREE.SpriteMaterial){a.color=this.color.getHex()
}}}}}}}}if(this.opacity<1){a.opacity=this.opacity}if(this.transparent!==false){a.transparent=this.transparent
}if(this.wireframe!==false){a.wireframe=this.wireframe}return a},clone:function(a){if(a===undefined){a=new THREE.Material()
}a.name=this.name;a.side=this.side;a.opacity=this.opacity;a.transparent=this.transparent;
a.blending=this.blending;a.blendSrc=this.blendSrc;a.blendDst=this.blendDst;a.blendEquation=this.blendEquation;
a.blendSrcAlpha=this.blendSrcAlpha;a.blendDstAlpha=this.blendDstAlpha;a.blendEquationAlpha=this.blendEquationAlpha;
a.depthTest=this.depthTest;a.depthWrite=this.depthWrite;a.polygonOffset=this.polygonOffset;
a.polygonOffsetFactor=this.polygonOffsetFactor;a.polygonOffsetUnits=this.polygonOffsetUnits;
a.alphaTest=this.alphaTest;a.overdraw=this.overdraw;a.visible=this.visible;return a
},update:function(){this.dispatchEvent({type:"update"})},dispose:function(){this.dispatchEvent({type:"dispose"})
}};THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);THREE.MaterialIdCount=0;
THREE.LineBasicMaterial=function(a){THREE.Material.call(this);this.type="LineBasicMaterial";
this.color=new THREE.Color(16777215);this.linewidth=1;this.linecap="round";this.linejoin="round";
this.vertexColors=THREE.NoColors;this.fog=true;this.setValues(a)};THREE.LineBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;THREE.LineBasicMaterial.prototype.clone=function(){var a=new THREE.LineBasicMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;
a.linecap=this.linecap;a.linejoin=this.linejoin;a.vertexColors=this.vertexColors;
a.fog=this.fog;return a};THREE.LineDashedMaterial=function(a){THREE.Material.call(this);
this.type="LineDashedMaterial";this.color=new THREE.Color(16777215);this.linewidth=1;
this.scale=1;this.dashSize=3;this.gapSize=1;this.vertexColors=false;this.fog=true;
this.setValues(a)};THREE.LineDashedMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.constructor=THREE.LineDashedMaterial;THREE.LineDashedMaterial.prototype.clone=function(){var a=new THREE.LineDashedMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;
a.scale=this.scale;a.dashSize=this.dashSize;a.gapSize=this.gapSize;a.vertexColors=this.vertexColors;
a.fog=this.fog;return a};THREE.MeshBasicMaterial=function(a){THREE.Material.call(this);
this.type="MeshBasicMaterial";this.color=new THREE.Color(16777215);this.map=null;
this.lightMap=null;this.specularMap=null;this.alphaMap=null;this.envMap=null;this.combine=THREE.MultiplyOperation;
this.reflectivity=1;this.refractionRatio=0.98;this.fog=true;this.shading=THREE.SmoothShading;
this.wireframe=false;this.wireframeLinewidth=1;this.wireframeLinecap="round";this.wireframeLinejoin="round";
this.vertexColors=THREE.NoColors;this.skinning=false;this.morphTargets=false;this.setValues(a)
};THREE.MeshBasicMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;
THREE.MeshBasicMaterial.prototype.clone=function(){var a=new THREE.MeshBasicMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;
a.lightMap=this.lightMap;a.specularMap=this.specularMap;a.alphaMap=this.alphaMap;
a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;
a.fog=this.fog;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;
a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;
a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;
return a};THREE.MeshLambertMaterial=function(a){THREE.Material.call(this);this.type="MeshLambertMaterial";
this.color=new THREE.Color(16777215);this.emissive=new THREE.Color(0);this.wrapAround=false;
this.wrapRGB=new THREE.Vector3(1,1,1);this.map=null;this.lightMap=null;this.specularMap=null;
this.alphaMap=null;this.envMap=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;
this.refractionRatio=0.98;this.fog=true;this.shading=THREE.SmoothShading;this.wireframe=false;
this.wireframeLinewidth=1;this.wireframeLinecap="round";this.wireframeLinejoin="round";
this.vertexColors=THREE.NoColors;this.skinning=false;this.morphTargets=false;this.morphNormals=false;
this.setValues(a)};THREE.MeshLambertMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;THREE.MeshLambertMaterial.prototype.clone=function(){var a=new THREE.MeshLambertMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.emissive.copy(this.emissive);
a.wrapAround=this.wrapAround;a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;
a.specularMap=this.specularMap;a.alphaMap=this.alphaMap;a.envMap=this.envMap;a.combine=this.combine;
a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;
a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;
a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;
a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;
a.morphNormals=this.morphNormals;return a};THREE.MeshPhongMaterial=function(a){THREE.Material.call(this);
this.type="MeshPhongMaterial";this.color=new THREE.Color(16777215);this.emissive=new THREE.Color(0);
this.specular=new THREE.Color(1118481);this.shininess=30;this.metal=false;this.wrapAround=false;
this.wrapRGB=new THREE.Vector3(1,1,1);this.map=null;this.lightMap=null;this.bumpMap=null;
this.bumpScale=1;this.normalMap=null;this.normalScale=new THREE.Vector2(1,1);this.specularMap=null;
this.alphaMap=null;this.envMap=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;
this.refractionRatio=0.98;this.fog=true;this.shading=THREE.SmoothShading;this.wireframe=false;
this.wireframeLinewidth=1;this.wireframeLinecap="round";this.wireframeLinejoin="round";
this.vertexColors=THREE.NoColors;this.skinning=false;this.morphTargets=false;this.morphNormals=false;
this.setValues(a)};THREE.MeshPhongMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;THREE.MeshPhongMaterial.prototype.clone=function(){var a=new THREE.MeshPhongMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.emissive.copy(this.emissive);
a.specular.copy(this.specular);a.shininess=this.shininess;a.metal=this.metal;a.wrapAround=this.wrapAround;
a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;a.bumpMap=this.bumpMap;
a.bumpScale=this.bumpScale;a.normalMap=this.normalMap;a.normalScale.copy(this.normalScale);
a.specularMap=this.specularMap;a.alphaMap=this.alphaMap;a.envMap=this.envMap;a.combine=this.combine;
a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;
a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;
a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;
a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;
a.morphNormals=this.morphNormals;return a};THREE.MeshDepthMaterial=function(a){THREE.Material.call(this);
this.type="MeshDepthMaterial";this.morphTargets=false;this.wireframe=false;this.wireframeLinewidth=1;
this.setValues(a)};THREE.MeshDepthMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;THREE.MeshDepthMaterial.prototype.clone=function(){var a=new THREE.MeshDepthMaterial();
THREE.Material.prototype.clone.call(this,a);a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;
return a};THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);this.type="MeshNormalMaterial";
this.wireframe=false;this.wireframeLinewidth=1;this.morphTargets=false;this.setValues(a)
};THREE.MeshNormalMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;
THREE.MeshNormalMaterial.prototype.clone=function(){var a=new THREE.MeshNormalMaterial();
THREE.Material.prototype.clone.call(this,a);a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;
return a};THREE.MeshFaceMaterial=function(a){this.uuid=THREE.Math.generateUUID();
this.type="MeshFaceMaterial";this.materials=a instanceof Array?a:[]};THREE.MeshFaceMaterial.prototype={constructor:THREE.MeshFaceMaterial,toJSON:function(){var b={metadata:{version:4.2,type:"material",generator:"MaterialExporter"},uuid:this.uuid,type:this.type,materials:[]};
for(var c=0,a=this.materials.length;c<a;c++){b.materials.push(this.materials[c].toJSON())
}return b},clone:function(){var b=new THREE.MeshFaceMaterial();for(var a=0;a<this.materials.length;
a++){b.materials.push(this.materials[a].clone())}return b}};THREE.PointCloudMaterial=function(a){THREE.Material.call(this);
this.type="PointCloudMaterial";this.color=new THREE.Color(16777215);this.map=null;
this.size=1;this.sizeAttenuation=true;this.vertexColors=THREE.NoColors;this.fog=true;
this.setValues(a)};THREE.PointCloudMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.PointCloudMaterial.prototype.constructor=THREE.PointCloudMaterial;THREE.PointCloudMaterial.prototype.clone=function(){var a=new THREE.PointCloudMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;
a.size=this.size;a.sizeAttenuation=this.sizeAttenuation;a.vertexColors=this.vertexColors;
a.fog=this.fog;return a};THREE.ParticleBasicMaterial=function(a){THREE.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial.");
return new THREE.PointCloudMaterial(a)};THREE.ParticleSystemMaterial=function(a){THREE.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial.");
return new THREE.PointCloudMaterial(a)};THREE.ShaderMaterial=function(a){THREE.Material.call(this);
this.type="ShaderMaterial";this.defines={};this.uniforms={};this.attributes=null;
this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
this.shading=THREE.SmoothShading;this.linewidth=1;this.wireframe=false;this.wireframeLinewidth=1;
this.fog=false;this.lights=false;this.vertexColors=THREE.NoColors;this.skinning=false;
this.morphTargets=false;this.morphNormals=false;this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]};
this.index0AttributeName=undefined;this.setValues(a)};THREE.ShaderMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.constructor=THREE.ShaderMaterial;THREE.ShaderMaterial.prototype.clone=function(){var a=new THREE.ShaderMaterial();
THREE.Material.prototype.clone.call(this,a);a.fragmentShader=this.fragmentShader;
a.vertexShader=this.vertexShader;a.uniforms=THREE.UniformsUtils.clone(this.uniforms);
a.attributes=this.attributes;a.defines=this.defines;a.shading=this.shading;a.wireframe=this.wireframe;
a.wireframeLinewidth=this.wireframeLinewidth;a.fog=this.fog;a.lights=this.lights;
a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;
a.morphNormals=this.morphNormals;return a};THREE.RawShaderMaterial=function(a){THREE.ShaderMaterial.call(this,a);
this.type="RawShaderMaterial"};THREE.RawShaderMaterial.prototype=Object.create(THREE.ShaderMaterial.prototype);
THREE.RawShaderMaterial.prototype.constructor=THREE.RawShaderMaterial;THREE.RawShaderMaterial.prototype.clone=function(){var a=new THREE.RawShaderMaterial();
THREE.ShaderMaterial.prototype.clone.call(this,a);return a};THREE.SpriteMaterial=function(a){THREE.Material.call(this);
this.type="SpriteMaterial";this.color=new THREE.Color(16777215);this.map=null;this.rotation=0;
this.fog=false;this.setValues(a)};THREE.SpriteMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.constructor=THREE.SpriteMaterial;THREE.SpriteMaterial.prototype.clone=function(){var a=new THREE.SpriteMaterial();
THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;
a.rotation=this.rotation;a.fog=this.fog;return a};THREE.Texture=function(d,b,f,e,i,c,h,g,a){Object.defineProperty(this,"id",{value:THREE.TextureIdCount++});
this.uuid=THREE.Math.generateUUID();this.name="";this.sourceFile="";this.image=d!==undefined?d:THREE.Texture.DEFAULT_IMAGE;
this.mipmaps=[];this.mapping=b!==undefined?b:THREE.Texture.DEFAULT_MAPPING;this.wrapS=f!==undefined?f:THREE.ClampToEdgeWrapping;
this.wrapT=e!==undefined?e:THREE.ClampToEdgeWrapping;this.magFilter=i!==undefined?i:THREE.LinearFilter;
this.minFilter=c!==undefined?c:THREE.LinearMipMapLinearFilter;this.anisotropy=a!==undefined?a:1;
this.format=h!==undefined?h:THREE.RGBAFormat;this.type=g!==undefined?g:THREE.UnsignedByteType;
this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.generateMipmaps=true;
this.premultiplyAlpha=false;this.flipY=true;this.unpackAlignment=4;this._needsUpdate=false;
this.onUpdate=null};THREE.Texture.DEFAULT_IMAGE=undefined;THREE.Texture.DEFAULT_MAPPING=THREE.UVMapping;
THREE.Texture.prototype={constructor:THREE.Texture,get needsUpdate(){return this._needsUpdate
},set needsUpdate(a){if(a===true){this.update()}this._needsUpdate=a},clone:function(a){if(a===undefined){a=new THREE.Texture()
}a.image=this.image;a.mipmaps=this.mipmaps.slice(0);a.mapping=this.mapping;a.wrapS=this.wrapS;
a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;a.anisotropy=this.anisotropy;
a.format=this.format;a.type=this.type;a.offset.copy(this.offset);a.repeat.copy(this.repeat);
a.generateMipmaps=this.generateMipmaps;a.premultiplyAlpha=this.premultiplyAlpha;
a.flipY=this.flipY;a.unpackAlignment=this.unpackAlignment;return a},update:function(){this.dispatchEvent({type:"update"})
},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);
THREE.TextureIdCount=0;THREE.CubeTexture=function(g,b,e,d,i,c,h,f,a){b=b!==undefined?b:THREE.CubeReflectionMapping;
THREE.Texture.call(this,g,b,e,d,i,c,h,f,a);this.images=g};THREE.CubeTexture.prototype=Object.create(THREE.Texture.prototype);
THREE.CubeTexture.prototype.constructor=THREE.CubeTexture;THREE.CubeTexture.clone=function(a){if(a===undefined){a=new THREE.CubeTexture()
}THREE.Texture.prototype.clone.call(this,a);a.images=this.images;return a};THREE.CompressedTexture=function(e,d,k,i,h,b,g,f,j,c,a){THREE.Texture.call(this,null,b,g,f,j,c,i,h,a);
this.image={width:d,height:k};this.mipmaps=e;this.flipY=false;this.generateMipmaps=false
};THREE.CompressedTexture.prototype=Object.create(THREE.Texture.prototype);THREE.CompressedTexture.prototype.constructor=THREE.CompressedTexture;
THREE.CompressedTexture.prototype.clone=function(){var a=new THREE.CompressedTexture();
THREE.Texture.prototype.clone.call(this,a);return a};THREE.DataTexture=function(f,d,k,i,h,b,g,e,j,c,a){THREE.Texture.call(this,null,b,g,e,j,c,i,h,a);
this.image={data:f,width:d,height:k}};THREE.DataTexture.prototype=Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.constructor=THREE.DataTexture;THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture();
THREE.Texture.prototype.clone.call(this,a);return a};THREE.VideoTexture=function(c,b,g,f,j,d,i,h,a){THREE.Texture.call(this,c,b,g,f,j,d,i,h,a);
this.generateMipmaps=false;var k=this;var e=function(){requestAnimationFrame(e);
if(c.readyState===c.HAVE_ENOUGH_DATA){k.needsUpdate=true}};e()};THREE.VideoTexture.prototype=Object.create(THREE.Texture.prototype);
THREE.VideoTexture.prototype.constructor=THREE.VideoTexture;THREE.Group=function(){THREE.Object3D.call(this);
this.type="Group"};THREE.Group.prototype=Object.create(THREE.Object3D.prototype);
THREE.Group.prototype.constructor=THREE.Group;THREE.PointCloud=function(b,a){THREE.Object3D.call(this);
this.type="PointCloud";this.geometry=b!==undefined?b:new THREE.Geometry();this.material=a!==undefined?a:new THREE.PointCloudMaterial({color:Math.random()*16777215})
};THREE.PointCloud.prototype=Object.create(THREE.Object3D.prototype);THREE.PointCloud.prototype.constructor=THREE.PointCloud;
THREE.PointCloud.prototype.raycast=(function(){var b=new THREE.Matrix4();var a=new THREE.Ray();
return function(u,c){var D=this;var g=D.geometry;var e=u.params.PointCloud.threshold;
b.getInverse(this.matrixWorld);a.copy(u.ray).applyMatrix4(b);if(g.boundingBox!==null){if(a.isIntersectionBox(g.boundingBox)===false){return
}}var d=e/((this.scale.x+this.scale.y+this.scale.z)/3);var C=new THREE.Vector3();
var s=function(i,F){var H=a.distanceToPoint(i);if(H<d){var E=a.closestPointToPoint(i);
E.applyMatrix4(D.matrixWorld);var G=u.ray.origin.distanceTo(E);c.push({distance:G,distanceToRay:H,point:E.clone(),index:F,face:null,object:D})
}};if(g instanceof THREE.BufferGeometry){var p=g.attributes;var o=p.position.array;
if(p.index!==undefined){var h=p.index.array;var k=g.offsets;if(k.length===0){var j={start:0,count:h.length,index:0};
k=[j]}for(var t=0,r=k.length;t<r;++t){var f=k[t].start;var n=k[t].count;var m=k[t].index;
for(var v=f,q=f+n;v<q;v++){var B=m+h[v];C.fromArray(o,B*3);s(C,B)}}}else{var A=o.length/3;
for(var v=0;v<A;v++){C.set(o[3*v],o[3*v+1],o[3*v+2]);s(C,v)}}}else{var l=this.geometry.vertices;
for(var v=0;v<l.length;v++){s(l[v],v)}}}}());THREE.PointCloud.prototype.clone=function(a){if(a===undefined){a=new THREE.PointCloud(this.geometry,this.material)
}THREE.Object3D.prototype.clone.call(this,a);return a};THREE.ParticleSystem=function(b,a){THREE.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud.");
return new THREE.PointCloud(b,a)};THREE.Line=function(c,a,b){THREE.Object3D.call(this);
this.type="Line";this.geometry=c!==undefined?c:new THREE.Geometry();this.material=a!==undefined?a:new THREE.LineBasicMaterial({color:Math.random()*16777215});
this.mode=b!==undefined?b:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;
THREE.Line.prototype=Object.create(THREE.Object3D.prototype);THREE.Line.prototype.constructor=THREE.Line;
THREE.Line.prototype.raycast=(function(){var c=new THREE.Matrix4();var a=new THREE.Ray();
var b=new THREE.Sphere();return function(u,e){var B=u.linePrecision;var F=B*B;var j=this.geometry;
if(j.boundingSphere===null){j.computeBoundingSphere()}b.copy(j.boundingSphere);
b.applyMatrix4(this.matrixWorld);if(u.ray.isIntersectionSphere(b)===false){return
}c.getInverse(this.matrixWorld);a.copy(u.ray).applyMatrix4(c);var G=new THREE.Vector3();
var d=new THREE.Vector3();var k=new THREE.Vector3();var v=new THREE.Vector3();var o=this.mode===THREE.LineStrip?1:2;
if(j instanceof THREE.BufferGeometry){var s=j.attributes;if(s.index!==undefined){var l=s.index.array;
var r=s.position.array;var m=j.offsets;if(m.length===0){m=[{start:0,count:l.length,index:0}]
}for(var t=0;t<m.length;t++){var h=m[t].start;var q=m[t].count;var p=m[t].index;
for(var A=h;A<h+q-1;A+=o){var D=p+l[A];var C=p+l[A+1];G.fromArray(r,D*3);d.fromArray(r,C*3);
var f=a.distanceSqToSegment(G,d,v,k);if(f>F){continue}var g=a.origin.distanceTo(v);
if(g<u.near||g>u.far){continue}e.push({distance:g,point:k.clone().applyMatrix4(this.matrixWorld),index:A,offsetIndex:t,face:null,faceIndex:null,object:this})
}}}else{var r=s.position.array;for(var A=0;A<r.length/3-1;A+=o){G.fromArray(r,3*A);
d.fromArray(r,3*A+3);var f=a.distanceSqToSegment(G,d,v,k);if(f>F){continue}var g=a.origin.distanceTo(v);
if(g<u.near||g>u.far){continue}e.push({distance:g,point:k.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})
}}}else{if(j instanceof THREE.Geometry){var n=j.vertices;var E=n.length;for(var A=0;
A<E-1;A+=o){var f=a.distanceSqToSegment(n[A],n[A+1],v,k);if(f>F){continue}var g=a.origin.distanceTo(v);
if(g<u.near||g>u.far){continue}e.push({distance:g,point:k.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})
}}}}}());THREE.Line.prototype.clone=function(a){if(a===undefined){a=new THREE.Line(this.geometry,this.material,this.mode)
}THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Mesh=function(b,a){THREE.Object3D.call(this);
this.type="Mesh";this.geometry=b!==undefined?b:new THREE.Geometry();this.material=a!==undefined?a:new THREE.MeshBasicMaterial({color:Math.random()*16777215});
this.updateMorphTargets()};THREE.Mesh.prototype=Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.updateMorphTargets=function(){if(this.geometry.morphTargets!==undefined&&this.geometry.morphTargets.length>0){this.morphTargetBase=-1;
this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};
for(var a=0,b=this.geometry.morphTargets.length;a<b;a++){this.morphTargetInfluences.push(0);
this.morphTargetDictionary[this.geometry.morphTargets[a].name]=a}}};THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(this.morphTargetDictionary[a]!==undefined){return this.morphTargetDictionary[a]
}THREE.warn("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");
return 0};THREE.Mesh.prototype.raycast=(function(){var f=new THREE.Matrix4();var a=new THREE.Ray();
var b=new THREE.Sphere();var e=new THREE.Vector3();var d=new THREE.Vector3();var c=new THREE.Vector3();
return function(J,g){var n=this.geometry;if(n.boundingSphere===null){n.computeBoundingSphere()
}b.copy(n.boundingSphere);b.applyMatrix4(this.matrixWorld);if(J.ray.isIntersectionSphere(b)===false){return
}f.getInverse(this.matrixWorld);a.copy(J.ray).applyMatrix4(f);if(n.boundingBox!==null){if(a.isIntersectionBox(n.boundingBox)===false){return
}}if(n instanceof THREE.BufferGeometry){var F=this.material;if(F===undefined){return
}var v=n.attributes;var U,S,R;var P=J.precision;if(v.index!==undefined){var o=v.index.array;
var u=v.position.array;var p=n.offsets;if(p.length===0){p=[{start:0,count:o.length,index:0}]
}for(var I=0,E=p.length;I<E;++I){var m=p[I].start;var r=p[I].count;var s=p[I].index;
for(var O=m,D=m+r;O<D;O+=3){U=s+o[O];S=s+o[O+1];R=s+o[O+2];e.fromArray(u,U*3);d.fromArray(u,S*3);
c.fromArray(u,R*3);if(F.side===THREE.BackSide){var N=a.intersectTriangle(c,d,e,true)
}else{var N=a.intersectTriangle(e,d,c,F.side!==THREE.DoubleSide)}if(N===null){continue
}N.applyMatrix4(this.matrixWorld);var l=J.ray.origin.distanceTo(N);if(l<P||l<J.near||l>J.far){continue
}g.push({distance:l,point:N,face:new THREE.Face3(U,S,R,THREE.Triangle.normal(e,d,c)),faceIndex:null,object:this})
}}}else{var u=v.position.array;for(var O=0,M=0,D=u.length;O<D;O+=3,M+=9){U=O;S=O+1;
R=O+2;e.fromArray(u,M);d.fromArray(u,M+3);c.fromArray(u,M+6);if(F.side===THREE.BackSide){var N=a.intersectTriangle(c,d,e,true)
}else{var N=a.intersectTriangle(e,d,c,F.side!==THREE.DoubleSide)}if(N===null){continue
}N.applyMatrix4(this.matrixWorld);var l=J.ray.origin.distanceTo(N);if(l<P||l<J.near||l>J.far){continue
}g.push({distance:l,point:N,face:new THREE.Face3(U,S,R,THREE.Triangle.normal(e,d,c)),faceIndex:null,object:this})
}}}else{if(n instanceof THREE.Geometry){var h=this.material instanceof THREE.MeshFaceMaterial;
var K=h===true?this.material.materials:null;var U,S,R;var P=J.precision;var q=n.vertices;
for(var Q=0,B=n.faces.length;Q<B;Q++){var A=n.faces[Q];var F=h===true?K[A.materialIndex]:this.material;
if(F===undefined){continue}U=q[A.a];S=q[A.b];R=q[A.c];if(F.morphTargets===true){var C=n.morphTargets;
var H=this.morphTargetInfluences;e.set(0,0,0);d.set(0,0,0);c.set(0,0,0);for(var G=0,k=C.length;
G<k;G++){var L=H[G];if(L===0){continue}var T=C[G].vertices;e.x+=(T[A.a].x-U.x)*L;
e.y+=(T[A.a].y-U.y)*L;e.z+=(T[A.a].z-U.z)*L;d.x+=(T[A.b].x-S.x)*L;d.y+=(T[A.b].y-S.y)*L;
d.z+=(T[A.b].z-S.z)*L;c.x+=(T[A.c].x-R.x)*L;c.y+=(T[A.c].y-R.y)*L;c.z+=(T[A.c].z-R.z)*L
}e.add(U);d.add(S);c.add(R);U=e;S=d;R=c}if(F.side===THREE.BackSide){var N=a.intersectTriangle(R,S,U,true)
}else{var N=a.intersectTriangle(U,S,R,F.side!==THREE.DoubleSide)}if(N===null){continue
}N.applyMatrix4(this.matrixWorld);var l=J.ray.origin.distanceTo(N);if(l<P||l<J.near||l>J.far){continue
}g.push({distance:l,point:N,face:A,faceIndex:Q,object:this})}}}}}());THREE.Mesh.prototype.clone=function(b,a){if(b===undefined){b=new THREE.Mesh(this.geometry,this.material)
}THREE.Object3D.prototype.clone.call(this,b,a);return b};THREE.Bone=function(a){THREE.Object3D.call(this);
this.type="Bone";this.skin=a};THREE.Bone.prototype=Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.constructor=THREE.Bone;THREE.Skeleton=function(c,e,f){this.useVertexTexture=f!==undefined?f:true;
this.identityMatrix=new THREE.Matrix4();c=c||[];this.bones=c.slice(0);if(this.useVertexTexture){var d;
if(this.bones.length>256){d=64}else{if(this.bones.length>64){d=32}else{if(this.bones.length>16){d=16
}else{d=8}}}this.boneTextureWidth=d;this.boneTextureHeight=d;this.boneMatrices=new Float32Array(this.boneTextureWidth*this.boneTextureHeight*4);
this.boneTexture=new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType);
this.boneTexture.minFilter=THREE.NearestFilter;this.boneTexture.magFilter=THREE.NearestFilter;
this.boneTexture.generateMipmaps=false;this.boneTexture.flipY=false}else{this.boneMatrices=new Float32Array(16*this.bones.length)
}if(e===undefined){this.calculateInverses()}else{if(this.bones.length===e.length){this.boneInverses=e.slice(0)
}else{THREE.warn("THREE.Skeleton bonInverses is the wrong length.");this.boneInverses=[];
for(var a=0,g=this.bones.length;a<g;a++){this.boneInverses.push(new THREE.Matrix4())
}}}};THREE.Skeleton.prototype.calculateInverses=function(){this.boneInverses=[];
for(var a=0,d=this.bones.length;a<d;a++){var c=new THREE.Matrix4();if(this.bones[a]){c.getInverse(this.bones[a].matrixWorld)
}this.boneInverses.push(c)}};THREE.Skeleton.prototype.pose=function(){var c;for(var a=0,d=this.bones.length;
a<d;a++){c=this.bones[a];if(c){c.matrixWorld.getInverse(this.boneInverses[a])}}for(var a=0,d=this.bones.length;
a<d;a++){c=this.bones[a];if(c){if(c.parent){c.matrix.getInverse(c.parent.matrixWorld);
c.matrix.multiply(c.matrixWorld)}else{c.matrix.copy(c.matrixWorld)}c.matrix.decompose(c.position,c.quaternion,c.scale)
}}};THREE.Skeleton.prototype.update=(function(){var a=new THREE.Matrix4();return function(){for(var c=0,e=this.bones.length;
c<e;c++){var d=this.bones[c]?this.bones[c].matrixWorld:this.identityMatrix;a.multiplyMatrices(d,this.boneInverses[c]);
a.flattenToArrayOffset(this.boneMatrices,c*16)}if(this.useVertexTexture){this.boneTexture.needsUpdate=true
}}})();THREE.SkinnedMesh=function(i,g,f){THREE.Mesh.call(this,i,g);this.type="SkinnedMesh";
this.bindMode="attached";this.bindMatrix=new THREE.Matrix4();this.bindMatrixInverse=new THREE.Matrix4();
var e=[];if(this.geometry&&this.geometry.bones!==undefined){var j,k,c,a,l;for(var h=0,d=this.geometry.bones.length;
h<d;++h){k=this.geometry.bones[h];c=k.pos;a=k.rotq;l=k.scl;j=new THREE.Bone(this);
e.push(j);j.name=k.name;j.position.set(c[0],c[1],c[2]);j.quaternion.set(a[0],a[1],a[2],a[3]);
if(l!==undefined){j.scale.set(l[0],l[1],l[2])}else{j.scale.set(1,1,1)}}for(var h=0,d=this.geometry.bones.length;
h<d;++h){k=this.geometry.bones[h];if(k.parent!==-1){e[k.parent].add(e[h])}else{this.add(e[h])
}}}this.normalizeSkinWeights();this.updateMatrixWorld(true);this.bind(new THREE.Skeleton(e,undefined,f))
};THREE.SkinnedMesh.prototype=Object.create(THREE.Mesh.prototype);THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.bind=function(b,a){this.skeleton=b;if(a===undefined){this.updateMatrixWorld(true);
a=this.matrixWorld}this.bindMatrix.copy(a);this.bindMatrixInverse.getInverse(a)
};THREE.SkinnedMesh.prototype.pose=function(){this.skeleton.pose()};THREE.SkinnedMesh.prototype.normalizeSkinWeights=function(){if(this.geometry instanceof THREE.Geometry){for(var b=0;
b<this.geometry.skinIndices.length;b++){var a=this.geometry.skinWeights[b];var c=1/a.lengthManhattan();
if(c!==Infinity){a.multiplyScalar(c)}else{a.set(1)}}}else{}};THREE.SkinnedMesh.prototype.updateMatrixWorld=function(a){THREE.Mesh.prototype.updateMatrixWorld.call(this,true);
if(this.bindMode==="attached"){this.bindMatrixInverse.getInverse(this.matrixWorld)
}else{if(this.bindMode==="detached"){this.bindMatrixInverse.getInverse(this.bindMatrix)
}else{THREE.warn("THREE.SkinnedMesh unreckognized bindMode: "+this.bindMode)}}};
THREE.SkinnedMesh.prototype.clone=function(a){if(a===undefined){a=new THREE.SkinnedMesh(this.geometry,this.material,this.useVertexTexture)
}THREE.Mesh.prototype.clone.call(this,a);return a};THREE.MorphAnimMesh=function(b,a){THREE.Mesh.call(this,b,a);
this.type="MorphAnimMesh";this.duration=1000;this.mirroredLoop=false;this.time=0;
this.lastKeyframe=0;this.currentKeyframe=0;this.direction=1;this.directionBackwards=false;
this.setFrameRange(0,this.geometry.morphTargets.length-1)};THREE.MorphAnimMesh.prototype=Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.constructor=THREE.MorphAnimMesh;THREE.MorphAnimMesh.prototype.setFrameRange=function(b,a){this.startKeyframe=b;
this.endKeyframe=a;this.length=this.endKeyframe-this.startKeyframe+1};THREE.MorphAnimMesh.prototype.setDirectionForward=function(){this.direction=1;
this.directionBackwards=false};THREE.MorphAnimMesh.prototype.setDirectionBackward=function(){this.direction=-1;
this.directionBackwards=true};THREE.MorphAnimMesh.prototype.parseAnimations=function(){var f=this.geometry;
if(!f.animations){f.animations={}}var a,k=f.animations;var e=/([a-z]+)_?(\d+)/;
for(var d=0,h=f.morphTargets.length;d<h;d++){var j=f.morphTargets[d];var c=j.name.match(e);
if(c&&c.length>1){var g=c[1];if(!k[g]){k[g]={start:Infinity,end:-Infinity}}var b=k[g];
if(d<b.start){b.start=d}if(d>b.end){b.end=d}if(!a){a=g}}}f.firstAnimation=a};THREE.MorphAnimMesh.prototype.setAnimationLabel=function(b,c,a){if(!this.geometry.animations){this.geometry.animations={}
}this.geometry.animations[b]={start:c,end:a}};THREE.MorphAnimMesh.prototype.playAnimation=function(a,c){var b=this.geometry.animations[a];
if(b){this.setFrameRange(b.start,b.end);this.duration=1000*((b.end-b.start)/c);
this.time=0}else{THREE.warn("THREE.MorphAnimMesh: animation["+a+"] undefined in .playAnimation()")
}};THREE.MorphAnimMesh.prototype.updateAnimation=function(d){var c=this.duration/this.length;
this.time+=this.direction*d;if(this.mirroredLoop){if(this.time>this.duration||this.time<0){this.direction*=-1;
if(this.time>this.duration){this.time=this.duration;this.directionBackwards=true
}if(this.time<0){this.time=0;this.directionBackwards=false}}}else{this.time=this.time%this.duration;
if(this.time<0){this.time+=this.duration}}var a=this.startKeyframe+THREE.Math.clamp(Math.floor(this.time/c),0,this.length-1);
if(a!==this.currentKeyframe){this.morphTargetInfluences[this.lastKeyframe]=0;this.morphTargetInfluences[this.currentKeyframe]=1;
this.morphTargetInfluences[a]=0;this.lastKeyframe=this.currentKeyframe;this.currentKeyframe=a
}var b=(this.time%c)/c;if(this.directionBackwards){b=1-b}this.morphTargetInfluences[this.currentKeyframe]=b;
this.morphTargetInfluences[this.lastKeyframe]=1-b};THREE.MorphAnimMesh.prototype.interpolateTargets=function(e,c,g){var h=this.morphTargetInfluences;
for(var f=0,d=h.length;f<d;f++){h[f]=0}if(e>-1){h[e]=1-g}if(c>-1){h[c]=g}};THREE.MorphAnimMesh.prototype.clone=function(a){if(a===undefined){a=new THREE.MorphAnimMesh(this.geometry,this.material)
}a.duration=this.duration;a.mirroredLoop=this.mirroredLoop;a.time=this.time;a.lastKeyframe=this.lastKeyframe;
a.currentKeyframe=this.currentKeyframe;a.direction=this.direction;a.directionBackwards=this.directionBackwards;
THREE.Mesh.prototype.clone.call(this,a);return a};THREE.LOD=function(){THREE.Object3D.call(this);
this.objects=[]};THREE.LOD.prototype=Object.create(THREE.Object3D.prototype);THREE.LOD.prototype.constructor=THREE.LOD;
THREE.LOD.prototype.addLevel=function(b,c){if(c===undefined){c=0}c=Math.abs(c);
for(var a=0;a<this.objects.length;a++){if(c<this.objects[a].distance){break}}this.objects.splice(a,0,{distance:c,object:b});
this.add(b)};THREE.LOD.prototype.getObjectForDistance=function(c){for(var b=1,a=this.objects.length;
b<a;b++){if(c<this.objects[b].distance){break}}return this.objects[b-1].object};
THREE.LOD.prototype.raycast=(function(){var a=new THREE.Vector3();return function(b,c){a.setFromMatrixPosition(this.matrixWorld);
var d=b.ray.origin.distanceTo(a);this.getObjectForDistance(d).raycast(b,c)}}());
THREE.LOD.prototype.update=function(){var b=new THREE.Vector3();var a=new THREE.Vector3();
return function(e){if(this.objects.length>1){b.setFromMatrixPosition(e.matrixWorld);
a.setFromMatrixPosition(this.matrixWorld);var f=b.distanceTo(a);this.objects[0].object.visible=true;
for(var d=1,c=this.objects.length;d<c;d++){if(f>=this.objects[d].distance){this.objects[d-1].object.visible=false;
this.objects[d].object.visible=true}else{break}}for(;d<c;d++){this.objects[d].object.visible=false
}}}}();THREE.LOD.prototype.clone=function(c){if(c===undefined){c=new THREE.LOD()
}THREE.Object3D.prototype.clone.call(this,c);for(var d=0,b=this.objects.length;
d<b;d++){var a=this.objects[d].object.clone();a.visible=d===0;c.addLevel(a,this.objects[d].distance)
}return c};THREE.Sprite=(function(){var d=new Uint16Array([0,1,2,0,2,3]);var a=new Float32Array([-0.5,-0.5,0,0.5,-0.5,0,0.5,0.5,0,-0.5,0.5,0]);
var b=new Float32Array([0,0,1,0,1,1,0,1]);var c=new THREE.BufferGeometry();c.addAttribute("index",new THREE.BufferAttribute(d,1));
c.addAttribute("position",new THREE.BufferAttribute(a,3));c.addAttribute("uv",new THREE.BufferAttribute(b,2));
return function(e){THREE.Object3D.call(this);this.type="Sprite";this.geometry=c;
this.material=(e!==undefined)?e:new THREE.SpriteMaterial()}})();THREE.Sprite.prototype=Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.raycast=(function(){var a=new THREE.Vector3();
return function(b,c){a.setFromMatrixPosition(this.matrixWorld);var d=b.ray.distanceToPoint(a);
if(d>this.scale.x){return}c.push({distance:d,point:this.position,face:null,object:this})
}}());THREE.Sprite.prototype.clone=function(a){if(a===undefined){a=new THREE.Sprite(this.material)
}THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Particle=THREE.Sprite;
THREE.LensFlare=function(d,b,e,c,a){THREE.Object3D.call(this);this.lensFlares=[];
this.positionScreen=new THREE.Vector3();this.customUpdateCallback=undefined;if(d!==undefined){this.add(d,b,e,c,a)
}};THREE.LensFlare.prototype=Object.create(THREE.Object3D.prototype);THREE.LensFlare.prototype.constructor=THREE.LensFlare;
THREE.LensFlare.prototype.add=function(e,c,f,d,a,b){if(c===undefined){c=-1}if(f===undefined){f=0
}if(b===undefined){b=1}if(a===undefined){a=new THREE.Color(16777215)}if(d===undefined){d=THREE.NormalBlending
}f=Math.min(f,Math.max(0,f));this.lensFlares.push({texture:e,size:c,distance:f,x:0,y:0,z:0,scale:1,rotation:1,opacity:b,color:a,blending:d})
};THREE.LensFlare.prototype.updateLensFlares=function(){var d,c=this.lensFlares.length;
var b;var a=-this.positionScreen.x*2;var e=-this.positionScreen.y*2;for(d=0;d<c;
d++){b=this.lensFlares[d];b.x=this.positionScreen.x+a*b.distance;b.y=this.positionScreen.y+e*b.distance;
b.wantedRotation=b.x*Math.PI*0.25;b.rotation+=(b.wantedRotation-b.rotation)*0.25
}};THREE.Scene=function(){THREE.Object3D.call(this);this.type="Scene";this.fog=null;
this.overrideMaterial=null;this.autoUpdate=true};THREE.Scene.prototype=Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.clone=function(a){if(a===undefined){a=new THREE.Scene()
}THREE.Object3D.prototype.clone.call(this,a);if(this.fog!==null){a.fog=this.fog.clone()
}if(this.overrideMaterial!==null){a.overrideMaterial=this.overrideMaterial.clone()
}a.autoUpdate=this.autoUpdate;a.matrixAutoUpdate=this.matrixAutoUpdate;return a
};THREE.Fog=function(b,c,a){this.name="";this.color=new THREE.Color(b);this.near=(c!==undefined)?c:1;
this.far=(a!==undefined)?a:1000};THREE.Fog.prototype.clone=function(){return new THREE.Fog(this.color.getHex(),this.near,this.far)
};THREE.FogExp2=function(b,a){this.name="";this.color=new THREE.Color(b);this.density=(a!==undefined)?a:0.00025
};THREE.FogExp2.prototype.clone=function(){return new THREE.FogExp2(this.color.getHex(),this.density)
};THREE.ShaderChunk={};THREE.ShaderChunk.common="#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n	float distance = dot( planeNormal, point-pointOnPlane );\n	return point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n	if ( decayExponent > 0.0 ) {\n	  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n	}\n	return 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n	return pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n	return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\n";
THREE.ShaderChunk.alphatest_fragment="#ifdef ALPHATEST\n\n	if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
THREE.ShaderChunk.lights_lambert_vertex="vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack += ambientLightColor;\n\n#endif\n";
THREE.ShaderChunk.map_particle_pars_fragment="#ifdef USE_MAP\n\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n\n#endif\n";
THREE.ShaderChunk.default_vertex="#ifdef USE_SKINNING\n\n	vec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n	vec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n";
THREE.ShaderChunk.map_pars_fragment="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif";
THREE.ShaderChunk.skinnormal_vertex="#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_vertex="#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif";
THREE.ShaderChunk.lightmap_pars_vertex="#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif";
THREE.ShaderChunk.lights_phong_fragment="#ifndef FLAT_SHADED\n\n	vec3 normal = normalize( vNormal );\n\n	#ifdef DOUBLE_SIDED\n\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n	#endif\n\n#else\n\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			totalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n			// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			totalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		totalDiffuseLight += hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		totalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\n#ifdef METAL\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n";
THREE.ShaderChunk.fog_pars_fragment="#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif";
THREE.ShaderChunk.morphnormal_vertex="#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif";
THREE.ShaderChunk.envmap_pars_fragment="#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_fragment="#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif";
THREE.ShaderChunk.normalmap_pars_fragment="#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n	// Per-Pixel Tangent Space Normal Mapping\n	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n";
THREE.ShaderChunk.lights_phong_pars_vertex="#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n";
THREE.ShaderChunk.lightmap_pars_fragment="#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif";
THREE.ShaderChunk.shadowmap_vertex="#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif";
THREE.ShaderChunk.lights_phong_vertex="#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif";
THREE.ShaderChunk.map_fragment="#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	texelColor.xyz = inputToLinear( texelColor.xyz );\n\n	diffuseColor *= texelColor;\n\n#endif";
THREE.ShaderChunk.lightmap_vertex="#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif";
THREE.ShaderChunk.map_particle_fragment="#ifdef USE_MAP\n\n	diffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n";
THREE.ShaderChunk.color_pars_fragment="#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n";
THREE.ShaderChunk.color_vertex="#ifdef USE_COLOR\n\n	vColor.xyz = inputToLinear( color.xyz );\n\n#endif";
THREE.ShaderChunk.skinning_vertex="#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n";
THREE.ShaderChunk.envmap_pars_vertex="#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n\n#endif\n";
THREE.ShaderChunk.linear_to_gamma_fragment="\n	outgoingLight = linearToOutput( outgoingLight );\n";
THREE.ShaderChunk.color_pars_vertex="#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif";
THREE.ShaderChunk.lights_lambert_pars_vertex="uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n";
THREE.ShaderChunk.map_pars_vertex="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n";
THREE.ShaderChunk.envmap_fragment="#ifdef USE_ENVMAP\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// Transforming Normal Vectors with the Inverse Transformation\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n		#ifdef ENVMAP_MODE_REFLECTION\n\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n		#else\n\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		#endif\n\n	#else\n\n		vec3 reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n	#else\n		float flipNormal = 1.0;\n	#endif\n\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n\n	envColor.xyz = inputToLinear( envColor.xyz );\n\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_MIX )\n\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_ADD )\n\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.specularmap_pars_fragment="#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif";
THREE.ShaderChunk.logdepthbuf_vertex="#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif";
THREE.ShaderChunk.morphtarget_pars_vertex="#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif";
THREE.ShaderChunk.specularmap_fragment="float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif";
THREE.ShaderChunk.fog_fragment="#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		float fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n		fogFactor = whiteCompliment( fogFactor );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	outgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif";
THREE.ShaderChunk.bumpmap_pars_fragment="#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n	// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n	// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif\n";
THREE.ShaderChunk.defaultnormal_vertex="#ifdef USE_SKINNING\n\n	vec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n	vec3 objectNormal = morphedNormal;\n\n#else\n\n	vec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n";
THREE.ShaderChunk.lights_phong_pars_fragment="uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n	varying vec3 vNormal;\n\n#endif\n";
THREE.ShaderChunk.skinbase_vertex="#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif";
THREE.ShaderChunk.map_vertex="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif";
THREE.ShaderChunk.lightmap_fragment="#ifdef USE_LIGHTMAP\n\n	outgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif";
THREE.ShaderChunk.shadowmap_pars_vertex="#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif";
THREE.ShaderChunk.color_fragment="#ifdef USE_COLOR\n\n	diffuseColor.rgb *= vColor;\n\n#endif";
THREE.ShaderChunk.morphtarget_vertex="#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif";
THREE.ShaderChunk.envmap_vertex="#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	#ifdef ENVMAP_MODE_REFLECTION\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	#else\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_fragment="#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n	shadowColor = inputToLinear( shadowColor );\n\n	outgoingLight = outgoingLight * shadowColor;\n\n#endif\n";
THREE.ShaderChunk.worldpos_vertex="#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#elif defined( USE_MORPHTARGETS )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_pars_fragment="#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif";
THREE.ShaderChunk.skinning_pars_vertex="#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_fragment="#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif";
THREE.ShaderChunk.alphamap_fragment="#ifdef USE_ALPHAMAP\n\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
THREE.ShaderChunk.alphamap_pars_fragment="#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n";
THREE.UniformsUtils={merge:function(b){var a={};for(var c=0;c<b.length;c++){var d=this.clone(b[c]);
for(var e in d){a[e]=d[e]}}return a},clone:function(a){var c={};for(var d in a){c[d]={};
for(var e in a[d]){var b=a[d][e];if(b instanceof THREE.Color||b instanceof THREE.Vector2||b instanceof THREE.Vector3||b instanceof THREE.Vector4||b instanceof THREE.Matrix4||b instanceof THREE.Texture){c[d][e]=b.clone()
}else{if(b instanceof Array){c[d][e]=b.slice()}else{c[d][e]=b}}}}return c}};THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:null},specularMap:{type:"t",value:null},alphaMap:{type:"t",value:null},envMap:{type:"t",value:null},flipEnvMap:{type:"f",value:-1},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},morphTargetInfluences:{type:"f",value:0}},bump:{bumpMap:{type:"t",value:null},bumpScale:{type:"f",value:1}},normalmap:{normalMap:{type:"t",value:null},normalScale:{type:"v2",value:new THREE.Vector2(1,1)}},fog:{fogDensity:{type:"f",value:0.00025},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2000},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},hemisphereLightDirection:{type:"fv",value:[]},hemisphereLightSkyColor:{type:"fv",value:[]},hemisphereLightGroundColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]},pointLightDecay:{type:"fv1",value:[]},spotLightColor:{type:"fv",value:[]},spotLightPosition:{type:"fv",value:[]},spotLightDirection:{type:"fv",value:[]},spotLightDistance:{type:"fv1",value:[]},spotLightAngleCos:{type:"fv1",value:[]},spotLightExponent:{type:"fv1",value:[]},spotLightDecay:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",value:1},map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},fogDensity:{type:"f",value:0.00025},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2000},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}};
THREE.ShaderLib={basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.common,THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinbase_vertex,"	#ifdef USE_ENVMAP",THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"	#endif",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,"	outgoingLight = diffuseColor.rgb;",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{emissive:{type:"c",value:new THREE.Color(0)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define LAMBERT","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk.common,THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform vec3 emissive;","uniform float opacity;","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,"	#ifdef DOUBLE_SIDED","		if ( gl_FrontFacing )","			outgoingLight += diffuseColor.rgb * vLightFront + emissive;","		else","			outgoingLight += diffuseColor.rgb * vLightBack + emissive;","	#else","		outgoingLight += diffuseColor.rgb * vLightFront + emissive;","	#endif",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{emissive:{type:"c",value:new THREE.Color(0)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define PHONG","varying vec3 vViewPosition;","#ifndef FLAT_SHADED","	varying vec3 vNormal;","#endif",THREE.ShaderChunk.common,THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"#ifndef FLAT_SHADED","	vNormal = normalize( transformedNormal );","#endif",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"	vViewPosition = -mvPosition.xyz;",THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["#define PHONG","uniform vec3 diffuse;","uniform vec3 emissive;","uniform vec3 specular;","uniform float shininess;","uniform float opacity;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.bumpmap_pars_fragment,THREE.ShaderChunk.normalmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;","uniform float scale;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	#ifdef USE_SIZEATTENUATION","		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );","	#else","		gl_PointSize = size;","	#endif","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;","uniform float opacity;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( psColor, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.alphatest_fragment,"	outgoingLight = diffuseColor.rgb;",THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},dashed:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,{scale:{type:"f",value:1},dashSize:{type:"f",value:1},totalSize:{type:"f",value:2}}]),vertexShader:["uniform float scale;","attribute float lineDistance;","varying float vLineDistance;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"	vLineDistance = scale * lineDistance;","	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;","uniform float dashSize;","uniform float totalSize;","varying float vLineDistance;",THREE.ShaderChunk.common,THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	if ( mod( vLineDistance, totalSize ) > dashSize ) {","		discard;","	}","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.color_fragment,"	outgoingLight = diffuseColor.rgb;",THREE.ShaderChunk.fog_fragment,"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2000},opacity:{type:"f",value:1}},vertexShader:[THREE.ShaderChunk.common,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float mNear;","uniform float mFar;","uniform float opacity;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"	#ifdef USE_LOGDEPTHBUF_EXT","		float depth = gl_FragDepthEXT / gl_FragCoord.w;","	#else","		float depth = gl_FragCoord.z / gl_FragCoord.w;","	#endif","	float color = 1.0 - smoothstep( mNear, mFar, depth );","	gl_FragColor = vec4( vec3( color ), opacity );","}"].join("\n")},normal:{uniforms:{opacity:{type:"f",value:1}},vertexShader:["varying vec3 vNormal;",THREE.ShaderChunk.common,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {","	vNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;","varying vec3 vNormal;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},cube:{uniforms:{tCube:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {","	vWorldPosition = transformDirection( position, modelMatrix );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform samplerCube tCube;","uniform float tFlip;","varying vec3 vWorldPosition;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},equirect:{uniforms:{tEquirect:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {","	vWorldPosition = transformDirection( position, modelMatrix );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform sampler2D tEquirect;","uniform float tFlip;","varying vec3 vWorldPosition;",THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","vec3 direction = normalize( vWorldPosition );","vec2 sampleUV;","sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );","sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;","gl_FragColor = texture2D( tEquirect, sampleUV );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.common,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:[THREE.ShaderChunk.common,THREE.ShaderChunk.logdepthbuf_pars_fragment,"vec4 pack_depth( const in float depth ) {","	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );","	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );","	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );","	res -= res.xxyz * bit_mask;","	return res;","}","void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"	#ifdef USE_LOGDEPTHBUF_EXT","		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );","	#else","		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );","	#endif","}"].join("\n")}};
THREE.WebGLRenderer=function(X){X=X||{};var i=X.canvas!==undefined?X.canvas:document.createElement("canvas"),h=X.context!==undefined?X.context:null,H=1,a0=X.precision!==undefined?X.precision:"highp",ao=X.alpha!==undefined?X.alpha:false,a1=X.depth!==undefined?X.depth:true,bF=X.stencil!==undefined?X.stencil:true,aJ=X.antialias!==undefined?X.antialias:false,bx=X.premultipliedAlpha!==undefined?X.premultipliedAlpha:true,aO=X.preserveDrawingBuffer!==undefined?X.preserveDrawingBuffer:false,aj=X.logarithmicDepthBuffer!==undefined?X.logarithmicDepthBuffer:false,ac=new THREE.Color(0),a4=0;
var o=[];var at={};var aT=[];var n=[];var aF=[];var az=[];var bm=[];this.domElement=i;
this.context=null;this.autoClear=true;this.autoClearColor=true;this.autoClearDepth=true;
this.autoClearStencil=true;this.sortObjects=true;this.gammaFactor=2;this.gammaInput=false;
this.gammaOutput=false;this.shadowMapEnabled=false;this.shadowMapType=THREE.PCFShadowMap;
this.shadowMapCullFace=THREE.CullFaceFront;this.shadowMapDebug=false;this.shadowMapCascade=false;
this.maxMorphTargets=8;this.maxMorphNormals=4;this.autoScaleCubemaps=true;this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};
var R=this,b=[],L=null,bo=null,aB=-1,Z="",T=null,bp=0,e=0,c=0,bh=i.width,U=i.height,af=0,aM=0,aX=new THREE.Frustum(),aG=new THREE.Matrix4(),D=new THREE.Vector3(),l=new THREE.Vector3(),bE=true,E={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[],decays:[]},spot:{length:0,colors:[],positions:[],distances:[],directions:[],anglesCos:[],exponents:[],decays:[]},hemi:{length:0,skyColors:[],groundColors:[],positions:[]}};
var a5;try{var a8={alpha:ao,depth:a1,stencil:bF,antialias:aJ,premultipliedAlpha:bx,preserveDrawingBuffer:aO};
a5=h||i.getContext("webgl",a8)||i.getContext("experimental-webgl",a8);if(a5===null){if(i.getContext("webgl")!==null){throw"Error creating WebGL context with your selected attributes."
}else{throw"Error creating WebGL context."}}i.addEventListener("webglcontextlost",function(bG){bG.preventDefault();
aK();bb();at={}},false)}catch(a7){THREE.error("THREE.WebGLRenderer: "+a7)}var by=new THREE.WebGLState(a5,aC);
if(a5.getShaderPrecisionFormat===undefined){a5.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}
}}var d=new THREE.WebGLExtensions(a5);d.get("OES_texture_float");d.get("OES_texture_float_linear");
d.get("OES_texture_half_float");d.get("OES_texture_half_float_linear");d.get("OES_standard_derivatives");
if(aj){d.get("EXT_frag_depth")}var O=function(bJ,bI,bG,bH){if(bx===true){bJ*=bH;
bI*=bH;bG*=bH}a5.clearColor(bJ,bI,bG,bH)};var bb=function(){a5.clearColor(0,0,0,1);
a5.clearDepth(1);a5.clearStencil(0);a5.enable(a5.DEPTH_TEST);a5.depthFunc(a5.LEQUAL);
a5.frontFace(a5.CCW);a5.cullFace(a5.BACK);a5.enable(a5.CULL_FACE);a5.enable(a5.BLEND);
a5.blendEquation(a5.FUNC_ADD);a5.blendFunc(a5.SRC_ALPHA,a5.ONE_MINUS_SRC_ALPHA);
a5.viewport(e,c,bh,U);O(ac.r,ac.g,ac.b,a4)};var aK=function(){L=null;T=null;Z="";
aB=-1;bE=true;by.reset()};bb();this.context=a5;this.state=by;var bc=a5.getParameter(a5.MAX_TEXTURE_IMAGE_UNITS);
var ar=a5.getParameter(a5.MAX_VERTEX_TEXTURE_IMAGE_UNITS);var ak=a5.getParameter(a5.MAX_TEXTURE_SIZE);
var ax=a5.getParameter(a5.MAX_CUBE_MAP_TEXTURE_SIZE);var aH=ar>0;var a9=aH&&d.get("OES_texture_float");
var bn=a5.getShaderPrecisionFormat(a5.VERTEX_SHADER,a5.HIGH_FLOAT);var bl=a5.getShaderPrecisionFormat(a5.VERTEX_SHADER,a5.MEDIUM_FLOAT);
var bu=a5.getShaderPrecisionFormat(a5.FRAGMENT_SHADER,a5.HIGH_FLOAT);var aY=a5.getShaderPrecisionFormat(a5.FRAGMENT_SHADER,a5.MEDIUM_FLOAT);
var aa=(function(){var bG;return function(){if(bG!==undefined){return bG}bG=[];
if(d.get("WEBGL_compressed_texture_pvrtc")||d.get("WEBGL_compressed_texture_s3tc")){var bH=a5.getParameter(a5.COMPRESSED_TEXTURE_FORMATS);
for(var bI=0;bI<bH.length;bI++){bG.push(bH[bI])}}return bG}})();var aL=bn.precision>0&&bu.precision>0;
var m=bl.precision>0&&aY.precision>0;if(a0==="highp"&&!aL){if(m){a0="mediump";THREE.warn("THREE.WebGLRenderer: highp not supported, using mediump.")
}else{a0="lowp";THREE.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp.")
}}if(a0==="mediump"&&!m){a0="lowp";THREE.warn("THREE.WebGLRenderer: mediump not supported, using lowp.")
}var bi=new THREE.ShadowMapPlugin(this,o,at,aT);var aV=new THREE.SpritePlugin(this,az);
var bD=new THREE.LensFlarePlugin(this,bm);this.getContext=function(){return a5};
this.forceContextLoss=function(){d.get("WEBGL_lose_context").loseContext()};this.supportsVertexTextures=function(){return aH
};this.supportsFloatTextures=function(){return d.get("OES_texture_float")};this.supportsHalfFloatTextures=function(){return d.get("OES_texture_half_float")
};this.supportsStandardDerivatives=function(){return d.get("OES_standard_derivatives")
};this.supportsCompressedTextureS3TC=function(){return d.get("WEBGL_compressed_texture_s3tc")
};this.supportsCompressedTexturePVRTC=function(){return d.get("WEBGL_compressed_texture_pvrtc")
};this.supportsBlendMinMax=function(){return d.get("EXT_blend_minmax")};this.getMaxAnisotropy=(function(){var bG;
return function(){if(bG!==undefined){return bG}var bH=d.get("EXT_texture_filter_anisotropic");
bG=bH!==null?a5.getParameter(bH.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0;return bG}})();
this.getPrecision=function(){return a0};this.getPixelRatio=function(){return H};
this.setPixelRatio=function(bG){H=bG};this.setSize=function(bH,bG,bI){i.width=bH*H;
i.height=bG*H;if(bI!==false){i.style.width=bH+"px";i.style.height=bG+"px"}this.setViewport(0,0,bH,bG)
};this.setViewport=function(bH,bJ,bI,bG){e=bH*H;c=bJ*H;bh=bI*H;U=bG*H;a5.viewport(e,c,bh,U)
};this.setScissor=function(bH,bJ,bI,bG){a5.scissor(bH*H,bJ*H,bI*H,bG*H)};this.enableScissorTest=function(bG){bG?a5.enable(a5.SCISSOR_TEST):a5.disable(a5.SCISSOR_TEST)
};this.getClearColor=function(){return ac};this.setClearColor=function(bG,bH){ac.set(bG);
a4=bH!==undefined?bH:1;O(ac.r,ac.g,ac.b,a4)};this.getClearAlpha=function(){return a4
};this.setClearAlpha=function(bG){a4=bG;O(ac.r,ac.g,ac.b,a4)};this.clear=function(bG,bJ,bH){var bI=0;
if(bG===undefined||bG){bI|=a5.COLOR_BUFFER_BIT}if(bJ===undefined||bJ){bI|=a5.DEPTH_BUFFER_BIT
}if(bH===undefined||bH){bI|=a5.STENCIL_BUFFER_BIT}a5.clear(bI)};this.clearColor=function(){a5.clear(a5.COLOR_BUFFER_BIT)
};this.clearDepth=function(){a5.clear(a5.DEPTH_BUFFER_BIT)};this.clearStencil=function(){a5.clear(a5.STENCIL_BUFFER_BIT)
};this.clearTarget=function(bI,bG,bJ,bH){this.setRenderTarget(bI);this.clear(bG,bJ,bH)
};this.resetGLState=aK;function ag(bG){bG.__webglVertexBuffer=a5.createBuffer();
bG.__webglColorBuffer=a5.createBuffer();R.info.memory.geometries++}function bC(bG){bG.__webglVertexBuffer=a5.createBuffer();
bG.__webglColorBuffer=a5.createBuffer();bG.__webglLineDistanceBuffer=a5.createBuffer();
R.info.memory.geometries++}function bB(bH){bH.__webglVertexBuffer=a5.createBuffer();
bH.__webglNormalBuffer=a5.createBuffer();bH.__webglTangentBuffer=a5.createBuffer();
bH.__webglColorBuffer=a5.createBuffer();bH.__webglUVBuffer=a5.createBuffer();bH.__webglUV2Buffer=a5.createBuffer();
bH.__webglSkinIndicesBuffer=a5.createBuffer();bH.__webglSkinWeightsBuffer=a5.createBuffer();
bH.__webglFaceBuffer=a5.createBuffer();bH.__webglLineBuffer=a5.createBuffer();var bK=bH.numMorphTargets;
if(bK){bH.__webglMorphTargetsBuffers=[];for(var bG=0,bJ=bK;bG<bJ;bG++){bH.__webglMorphTargetsBuffers.push(a5.createBuffer())
}}var bI=bH.numMorphNormals;if(bI){bH.__webglMorphNormalsBuffers=[];for(var bG=0,bJ=bI;
bG<bJ;bG++){bH.__webglMorphNormalsBuffers.push(a5.createBuffer())}}R.info.memory.geometries++
}var bz=function(bH){var bG=bH.target;bG.traverse(function(bI){bI.removeEventListener("remove",bz);
aS(bI)})};var aZ=function(bG){var bH=bG.target;bH.removeEventListener("dispose",aZ);
a3(bH)};var ah=function(bH){var bG=bH.target;bG.removeEventListener("dispose",ah);
aE(bG);R.info.memory.textures--};var br=function(bG){var bH=bG.target;bH.removeEventListener("dispose",br);
ab(bH);R.info.memory.textures--};var bt=function(bH){var bG=bH.target;bG.removeEventListener("dispose",bt);
p(bG)};var aU=function(bK){var bH=["__webglVertexBuffer","__webglNormalBuffer","__webglTangentBuffer","__webglColorBuffer","__webglUVBuffer","__webglUV2Buffer","__webglSkinIndicesBuffer","__webglSkinWeightsBuffer","__webglFaceBuffer","__webglLineBuffer","__webglLineDistanceBuffer"];
for(var bJ=0,bG=bH.length;bJ<bG;bJ++){var bI=bH[bJ];if(bK[bI]!==undefined){a5.deleteBuffer(bK[bI]);
delete bK[bI]}}if(bK.__webglCustomAttributesList!==undefined){for(var bI in bK.__webglCustomAttributesList){a5.deleteBuffer(bK.__webglCustomAttributesList[bI].buffer)
}delete bK.__webglCustomAttributesList}R.info.memory.geometries--};var a3=function(bO){delete bO.__webglInit;
if(bO instanceof THREE.BufferGeometry){for(var bG in bO.attributes){var bH=bO.attributes[bG];
if(bH.buffer!==undefined){a5.deleteBuffer(bH.buffer);delete bH.buffer}}R.info.memory.geometries--
}else{var bN=ay[bO.id];if(bN!==undefined){for(var bM=0,bJ=bN.length;bM<bJ;bM++){var bK=bN[bM];
if(bK.numMorphTargets!==undefined){for(var bI=0,bL=bK.numMorphTargets;bI<bL;bI++){a5.deleteBuffer(bK.__webglMorphTargetsBuffers[bI])
}delete bK.__webglMorphTargetsBuffers}if(bK.numMorphNormals!==undefined){for(var bI=0,bL=bK.numMorphNormals;
bI<bL;bI++){a5.deleteBuffer(bK.__webglMorphNormalsBuffers[bI])}delete bK.__webglMorphNormalsBuffers
}aU(bK)}delete ay[bO.id]}else{aU(bO)}}Z=""};var aE=function(bG){if(bG.image&&bG.image.__webglTextureCube){a5.deleteTexture(bG.image.__webglTextureCube);
delete bG.image.__webglTextureCube}else{if(bG.__webglInit===undefined){return}a5.deleteTexture(bG.__webglTexture);
delete bG.__webglTexture;delete bG.__webglInit}};var ab=function(bH){if(!bH||bH.__webglTexture===undefined){return
}a5.deleteTexture(bH.__webglTexture);delete bH.__webglTexture;if(bH instanceof THREE.WebGLRenderTargetCube){for(var bG=0;
bG<6;bG++){a5.deleteFramebuffer(bH.__webglFramebuffer[bG]);a5.deleteRenderbuffer(bH.__webglRenderbuffer[bG])
}}else{a5.deleteFramebuffer(bH.__webglFramebuffer);a5.deleteRenderbuffer(bH.__webglRenderbuffer)
}delete bH.__webglFramebuffer;delete bH.__webglRenderbuffer};var p=function(bM){var bI=bM.program.program;
if(bI===undefined){return}bM.program=undefined;var bJ,bH,bL;var bK=false;for(bJ=0,bH=b.length;
bJ<bH;bJ++){bL=b[bJ];if(bL.program===bI){bL.usedTimes--;if(bL.usedTimes===0){bK=true
}break}}if(bK===true){var bG=[];for(bJ=0,bH=b.length;bJ<bH;bJ++){bL=b[bJ];if(bL.program!==bI){bG.push(bL)
}}b=bG;a5.deleteProgram(bI);R.info.memory.programs--}};function V(bH){var bM=bH.geometry;
var bK=bH.material;var bJ=bM.vertices.length;if(bK.attributes){if(bM.__webglCustomAttributesList===undefined){bM.__webglCustomAttributesList=[]
}for(var bG in bK.attributes){var bL=bK.attributes[bG];if(!bL.__webglInitialized||bL.createUniqueBuffers){bL.__webglInitialized=true;
var bI=1;if(bL.type==="v2"){bI=2}else{if(bL.type==="v3"){bI=3}else{if(bL.type==="v4"){bI=4
}else{if(bL.type==="c"){bI=3}}}}bL.size=bI;bL.array=new Float32Array(bJ*bI);bL.buffer=a5.createBuffer();
bL.buffer.belongsToAttribute=bG;bL.needsUpdate=true}bM.__webglCustomAttributesList.push(bL)
}}}function bf(bI,bG){var bH=bI.vertices.length;bI.__vertexArray=new Float32Array(bH*3);
bI.__colorArray=new Float32Array(bH*3);bI.__webglParticleCount=bH;V(bG)}function N(bI,bG){var bH=bI.vertices.length;
bI.__vertexArray=new Float32Array(bH*3);bI.__colorArray=new Float32Array(bH*3);
bI.__lineDistanceArray=new Float32Array(bH*1);bI.__webglLineCount=bH;V(bG)}function K(bQ,bV){var bI=bV.geometry,bW=bQ.faces3,bS=bW.length*3,bL=bW.length*1,bN=bW.length*3,bK=aN(bV,bQ);
bQ.__vertexArray=new Float32Array(bS*3);bQ.__normalArray=new Float32Array(bS*3);
bQ.__colorArray=new Float32Array(bS*3);bQ.__uvArray=new Float32Array(bS*2);if(bI.faceVertexUvs.length>1){bQ.__uv2Array=new Float32Array(bS*2)
}if(bI.hasTangents){bQ.__tangentArray=new Float32Array(bS*4)}if(bV.geometry.skinWeights.length&&bV.geometry.skinIndices.length){bQ.__skinIndexArray=new Float32Array(bS*4);
bQ.__skinWeightArray=new Float32Array(bS*4)}var bO=d.get("OES_element_index_uint")!==null&&bL>21845?Uint32Array:Uint16Array;
bQ.__typeArray=bO;bQ.__faceArray=new bO(bL*3);bQ.__lineArray=new bO(bN*2);var bG=bQ.numMorphTargets;
if(bG){bQ.__morphTargetsArrays=[];for(var bR=0,bU=bG;bR<bU;bR++){bQ.__morphTargetsArrays.push(new Float32Array(bS*3))
}}var bH=bQ.numMorphNormals;if(bH){bQ.__morphNormalsArrays=[];for(var bR=0,bU=bH;
bR<bU;bR++){bQ.__morphNormalsArrays.push(new Float32Array(bS*3))}}bQ.__webglFaceCount=bL*3;
bQ.__webglLineCount=bN*2;if(bK.attributes){if(bQ.__webglCustomAttributesList===undefined){bQ.__webglCustomAttributesList=[]
}for(var bX in bK.attributes){var bT=bK.attributes[bX];var bM={};for(var bJ in bT){bM[bJ]=bT[bJ]
}if(!bM.__webglInitialized||bM.createUniqueBuffers){bM.__webglInitialized=true;
var bP=1;if(bM.type==="v2"){bP=2}else{if(bM.type==="v3"){bP=3}else{if(bM.type==="v4"){bP=4
}else{if(bM.type==="c"){bP=3}}}}bM.size=bP;bM.array=new Float32Array(bS*bP);bM.buffer=a5.createBuffer();
bM.buffer.belongsToAttribute=bX;bT.needsUpdate=true;bM.__original=bT}bQ.__webglCustomAttributesList.push(bM)
}}bQ.__inittedArrays=true}function aN(bH,bG){return bH.material instanceof THREE.MeshFaceMaterial?bH.material.materials[bG.materialIndex]:bH.material
}function Y(bG){return bG instanceof THREE.MeshPhongMaterial===false&&bG.shading===THREE.FlatShading
}function W(bH,bQ,b2){var bO,b1,bZ,bI,bW,bJ=bH.vertices,b0=bJ.length,bL=bH.colors,bK=bL.length,bP=bH.__vertexArray,bG=bH.__colorArray,bU=bH.verticesNeedUpdate,bR=bH.colorsNeedUpdate,bT=bH.__webglCustomAttributesList,bX,bM,bS,bN,bV,bY;
if(bU){for(bO=0;bO<b0;bO++){bZ=bJ[bO];bI=bO*3;bP[bI]=bZ.x;bP[bI+1]=bZ.y;bP[bI+2]=bZ.z
}a5.bindBuffer(a5.ARRAY_BUFFER,bH.__webglVertexBuffer);a5.bufferData(a5.ARRAY_BUFFER,bP,bQ)
}if(bR){for(b1=0;b1<bK;b1++){bW=bL[b1];bI=b1*3;bG[bI]=bW.r;bG[bI+1]=bW.g;bG[bI+2]=bW.b
}a5.bindBuffer(a5.ARRAY_BUFFER,bH.__webglColorBuffer);a5.bufferData(a5.ARRAY_BUFFER,bG,bQ)
}if(bT){for(bX=0,bM=bT.length;bX<bM;bX++){bY=bT[bX];if(bY.needsUpdate&&(bY.boundTo===undefined||bY.boundTo==="vertices")){bN=bY.value.length;
bI=0;if(bY.size===1){for(bS=0;bS<bN;bS++){bY.array[bS]=bY.value[bS]}}else{if(bY.size===2){for(bS=0;
bS<bN;bS++){bV=bY.value[bS];bY.array[bI]=bV.x;bY.array[bI+1]=bV.y;bI+=2}}else{if(bY.size===3){if(bY.type==="c"){for(bS=0;
bS<bN;bS++){bV=bY.value[bS];bY.array[bI]=bV.r;bY.array[bI+1]=bV.g;bY.array[bI+2]=bV.b;
bI+=3}}else{for(bS=0;bS<bN;bS++){bV=bY.value[bS];bY.array[bI]=bV.x;bY.array[bI+1]=bV.y;
bY.array[bI+2]=bV.z;bI+=3}}}else{if(bY.size===4){for(bS=0;bS<bN;bS++){bV=bY.value[bS];
bY.array[bI]=bV.x;bY.array[bI+1]=bV.y;bY.array[bI+2]=bV.z;bY.array[bI+3]=bV.w;bI+=4
}}}}}}a5.bindBuffer(a5.ARRAY_BUFFER,bY.buffer);a5.bufferData(a5.ARRAY_BUFFER,bY.array,bQ);
bY.needsUpdate=false}}}function bA(bJ,bT){var bQ,b6,b4,b3,bK,bZ,bL=bJ.vertices,bN=bJ.colors,bS=bJ.lineDistances,b5=bL.length,bM=bN.length,b0=bS.length,bR=bJ.__vertexArray,bI=bJ.__colorArray,bG=bJ.__lineDistanceArray,bX=bJ.verticesNeedUpdate,bU=bJ.colorsNeedUpdate,bH=bJ.lineDistancesNeedUpdate,bW=bJ.__webglCustomAttributesList,b1,bO,bV,bP,bY,b2;
if(bX){for(bQ=0;bQ<b5;bQ++){b3=bL[bQ];bK=bQ*3;bR[bK]=b3.x;bR[bK+1]=b3.y;bR[bK+2]=b3.z
}a5.bindBuffer(a5.ARRAY_BUFFER,bJ.__webglVertexBuffer);a5.bufferData(a5.ARRAY_BUFFER,bR,bT)
}if(bU){for(b6=0;b6<bM;b6++){bZ=bN[b6];bK=b6*3;bI[bK]=bZ.r;bI[bK+1]=bZ.g;bI[bK+2]=bZ.b
}a5.bindBuffer(a5.ARRAY_BUFFER,bJ.__webglColorBuffer);a5.bufferData(a5.ARRAY_BUFFER,bI,bT)
}if(bH){for(b4=0;b4<b0;b4++){bG[b4]=bS[b4]}a5.bindBuffer(a5.ARRAY_BUFFER,bJ.__webglLineDistanceBuffer);
a5.bufferData(a5.ARRAY_BUFFER,bG,bT)}if(bW){for(b1=0,bO=bW.length;b1<bO;b1++){b2=bW[b1];
if(b2.needsUpdate&&(b2.boundTo===undefined||b2.boundTo==="vertices")){bK=0;bP=b2.value.length;
if(b2.size===1){for(bV=0;bV<bP;bV++){b2.array[bV]=b2.value[bV]}}else{if(b2.size===2){for(bV=0;
bV<bP;bV++){bY=b2.value[bV];b2.array[bK]=bY.x;b2.array[bK+1]=bY.y;bK+=2}}else{if(b2.size===3){if(b2.type==="c"){for(bV=0;
bV<bP;bV++){bY=b2.value[bV];b2.array[bK]=bY.r;b2.array[bK+1]=bY.g;b2.array[bK+2]=bY.b;
bK+=3}}else{for(bV=0;bV<bP;bV++){bY=b2.value[bV];b2.array[bK]=bY.x;b2.array[bK+1]=bY.y;
b2.array[bK+2]=bY.z;bK+=3}}}else{if(b2.size===4){for(bV=0;bV<bP;bV++){bY=b2.value[bV];
b2.array[bK]=bY.x;b2.array[bK+1]=bY.y;b2.array[bK+2]=bY.z;b2.array[bK+3]=bY.w;bK+=4
}}}}}a5.bindBuffer(a5.ARRAY_BUFFER,b2.buffer);a5.bufferData(a5.ARRAY_BUFFER,b2.array,bT);
b2.needsUpdate=false}}}}function v(cD,cH,da,bR,c8){if(!cD.__inittedArrays){return
}var b4=Y(c8);var ck,cR,cX,bH,bV,bM,bX,cf,bI,ce,c5,cv,cu,ct,c6,c4,cZ,cU,cT,cS,cB,cA,cy,cO,cN,cK,bP,bO,bN,ci,cd,b2,cx,cC,b3,ca,cg,cz,cl,cw,bZ=0,bT=0,cF=0,c0=0,ch=0,b8=0,bW=0,cs=0,bU=0,cj=0,bG=0,bQ=0,cb,bL=cD.__vertexArray,b9=cD.__uvArray,bS=cD.__uv2Array,cJ=cD.__normalArray,cM=cD.__tangentArray,cp=cD.__colorArray,cI=cD.__skinIndexArray,cW=cD.__skinWeightArray,cV=cD.__morphTargetsArrays,b5=cD.__morphNormalsArrays,b7=cD.__webglCustomAttributesList,bK,cY=cD.__faceArray,cn=cD.__lineArray,cE=cH.geometry,b1=cE.verticesNeedUpdate,cm=cE.elementsNeedUpdate,cq=cE.uvsNeedUpdate,bJ=cE.normalsNeedUpdate,c7=cE.tangentsNeedUpdate,cL=cE.colorsNeedUpdate,db=cE.morphTargetsNeedUpdate,cr=cE.vertices,bY=cD.faces3,cP=cE.faces,co=cE.faceVertexUvs[0],b6=cE.faceVertexUvs[1],cc=cE.skinIndices,cQ=cE.skinWeights,c9=cE.morphTargets,cG=cE.morphNormals;
if(b1){for(ck=0,cR=bY.length;ck<cR;ck++){bH=cP[bY[ck]];cv=cr[bH.a];cu=cr[bH.b];
ct=cr[bH.c];bL[bT]=cv.x;bL[bT+1]=cv.y;bL[bT+2]=cv.z;bL[bT+3]=cu.x;bL[bT+4]=cu.y;
bL[bT+5]=cu.z;bL[bT+6]=ct.x;bL[bT+7]=ct.y;bL[bT+8]=ct.z;bT+=9}a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglVertexBuffer);
a5.bufferData(a5.ARRAY_BUFFER,bL,da)}if(db){for(b3=0,ca=c9.length;b3<ca;b3++){bG=0;
for(ck=0,cR=bY.length;ck<cR;ck++){cl=bY[ck];bH=cP[cl];cv=c9[b3].vertices[bH.a];
cu=c9[b3].vertices[bH.b];ct=c9[b3].vertices[bH.c];cg=cV[b3];cg[bG]=cv.x;cg[bG+1]=cv.y;
cg[bG+2]=cv.z;cg[bG+3]=cu.x;cg[bG+4]=cu.y;cg[bG+5]=cu.z;cg[bG+6]=ct.x;cg[bG+7]=ct.y;
cg[bG+8]=ct.z;if(c8.morphNormals){if(b4){cU=cG[b3].faceNormals[cl];cT=cU;cS=cU}else{cw=cG[b3].vertexNormals[cl];
cU=cw.a;cT=cw.b;cS=cw.c}cz=b5[b3];cz[bG]=cU.x;cz[bG+1]=cU.y;cz[bG+2]=cU.z;cz[bG+3]=cT.x;
cz[bG+4]=cT.y;cz[bG+5]=cT.z;cz[bG+6]=cS.x;cz[bG+7]=cS.y;cz[bG+8]=cS.z}bG+=9}a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglMorphTargetsBuffers[b3]);
a5.bufferData(a5.ARRAY_BUFFER,cV[b3],da);if(c8.morphNormals){a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglMorphNormalsBuffers[b3]);
a5.bufferData(a5.ARRAY_BUFFER,b5[b3],da)}}}if(cQ.length){for(ck=0,cR=bY.length;
ck<cR;ck++){bH=cP[bY[ck]];cO=cQ[bH.a];cN=cQ[bH.b];cK=cQ[bH.c];cW[cj]=cO.x;cW[cj+1]=cO.y;
cW[cj+2]=cO.z;cW[cj+3]=cO.w;cW[cj+4]=cN.x;cW[cj+5]=cN.y;cW[cj+6]=cN.z;cW[cj+7]=cN.w;
cW[cj+8]=cK.x;cW[cj+9]=cK.y;cW[cj+10]=cK.z;cW[cj+11]=cK.w;bP=cc[bH.a];bO=cc[bH.b];
bN=cc[bH.c];cI[cj]=bP.x;cI[cj+1]=bP.y;cI[cj+2]=bP.z;cI[cj+3]=bP.w;cI[cj+4]=bO.x;
cI[cj+5]=bO.y;cI[cj+6]=bO.z;cI[cj+7]=bO.w;cI[cj+8]=bN.x;cI[cj+9]=bN.y;cI[cj+10]=bN.z;
cI[cj+11]=bN.w;cj+=12}if(cj>0){a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglSkinIndicesBuffer);
a5.bufferData(a5.ARRAY_BUFFER,cI,da);a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglSkinWeightsBuffer);
a5.bufferData(a5.ARRAY_BUFFER,cW,da)}}if(cL){for(ck=0,cR=bY.length;ck<cR;ck++){bH=cP[bY[ck]];
bX=bH.vertexColors;cf=bH.color;if(bX.length===3&&c8.vertexColors===THREE.VertexColors){cB=bX[0];
cA=bX[1];cy=bX[2]}else{cB=cf;cA=cf;cy=cf}cp[bU]=cB.r;cp[bU+1]=cB.g;cp[bU+2]=cB.b;
cp[bU+3]=cA.r;cp[bU+4]=cA.g;cp[bU+5]=cA.b;cp[bU+6]=cy.r;cp[bU+7]=cy.g;cp[bU+8]=cy.b;
bU+=9}if(bU>0){a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglColorBuffer);a5.bufferData(a5.ARRAY_BUFFER,cp,da)
}}if(c7&&cE.hasTangents){for(ck=0,cR=bY.length;ck<cR;ck++){bH=cP[bY[ck]];bI=bH.vertexTangents;
c6=bI[0];c4=bI[1];cZ=bI[2];cM[bW]=c6.x;cM[bW+1]=c6.y;cM[bW+2]=c6.z;cM[bW+3]=c6.w;
cM[bW+4]=c4.x;cM[bW+5]=c4.y;cM[bW+6]=c4.z;cM[bW+7]=c4.w;cM[bW+8]=cZ.x;cM[bW+9]=cZ.y;
cM[bW+10]=cZ.z;cM[bW+11]=cZ.w;bW+=12}a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglTangentBuffer);
a5.bufferData(a5.ARRAY_BUFFER,cM,da)}if(bJ){for(ck=0,cR=bY.length;ck<cR;ck++){bH=cP[bY[ck]];
bV=bH.vertexNormals;bM=bH.normal;if(bV.length===3&&b4===false){for(ci=0;ci<3;ci++){b2=bV[ci];
cJ[b8]=b2.x;cJ[b8+1]=b2.y;cJ[b8+2]=b2.z;b8+=3}}else{for(ci=0;ci<3;ci++){cJ[b8]=bM.x;
cJ[b8+1]=bM.y;cJ[b8+2]=bM.z;b8+=3}}}a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglNormalBuffer);
a5.bufferData(a5.ARRAY_BUFFER,cJ,da)}if(cq&&co){for(ck=0,cR=bY.length;ck<cR;ck++){cX=bY[ck];
ce=co[cX];if(ce===undefined){continue}for(ci=0;ci<3;ci++){cx=ce[ci];b9[cF]=cx.x;
b9[cF+1]=cx.y;cF+=2}}if(cF>0){a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglUVBuffer);
a5.bufferData(a5.ARRAY_BUFFER,b9,da)}}if(cq&&b6){for(ck=0,cR=bY.length;ck<cR;ck++){cX=bY[ck];
c5=b6[cX];if(c5===undefined){continue}for(ci=0;ci<3;ci++){cC=c5[ci];bS[c0]=cC.x;
bS[c0+1]=cC.y;c0+=2}}if(c0>0){a5.bindBuffer(a5.ARRAY_BUFFER,cD.__webglUV2Buffer);
a5.bufferData(a5.ARRAY_BUFFER,bS,da)}}if(cm){for(ck=0,cR=bY.length;ck<cR;ck++){cY[ch]=bZ;
cY[ch+1]=bZ+1;cY[ch+2]=bZ+2;ch+=3;cn[cs]=bZ;cn[cs+1]=bZ+1;cn[cs+2]=bZ;cn[cs+3]=bZ+2;
cn[cs+4]=bZ+1;cn[cs+5]=bZ+2;cs+=6;bZ+=3}a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,cD.__webglFaceBuffer);
a5.bufferData(a5.ELEMENT_ARRAY_BUFFER,cY,da);a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,cD.__webglLineBuffer);
a5.bufferData(a5.ELEMENT_ARRAY_BUFFER,cn,da)}if(b7){for(ci=0,cd=b7.length;ci<cd;
ci++){bK=b7[ci];if(!bK.__original.needsUpdate){continue}bQ=0;if(bK.size===1){if(bK.boundTo===undefined||bK.boundTo==="vertices"){for(ck=0,cR=bY.length;
ck<cR;ck++){bH=cP[bY[ck]];bK.array[bQ]=bK.value[bH.a];bK.array[bQ+1]=bK.value[bH.b];
bK.array[bQ+2]=bK.value[bH.c];bQ+=3}}else{if(bK.boundTo==="faces"){for(ck=0,cR=bY.length;
ck<cR;ck++){cb=bK.value[bY[ck]];bK.array[bQ]=cb;bK.array[bQ+1]=cb;bK.array[bQ+2]=cb;
bQ+=3}}}}else{if(bK.size===2){if(bK.boundTo===undefined||bK.boundTo==="vertices"){for(ck=0,cR=bY.length;
ck<cR;ck++){bH=cP[bY[ck]];cv=bK.value[bH.a];cu=bK.value[bH.b];ct=bK.value[bH.c];
bK.array[bQ]=cv.x;bK.array[bQ+1]=cv.y;bK.array[bQ+2]=cu.x;bK.array[bQ+3]=cu.y;bK.array[bQ+4]=ct.x;
bK.array[bQ+5]=ct.y;bQ+=6}}else{if(bK.boundTo==="faces"){for(ck=0,cR=bY.length;
ck<cR;ck++){cb=bK.value[bY[ck]];cv=cb;cu=cb;ct=cb;bK.array[bQ]=cv.x;bK.array[bQ+1]=cv.y;
bK.array[bQ+2]=cu.x;bK.array[bQ+3]=cu.y;bK.array[bQ+4]=ct.x;bK.array[bQ+5]=ct.y;
bQ+=6}}}}else{if(bK.size===3){var b0;if(bK.type==="c"){b0=["r","g","b"]}else{b0=["x","y","z"]
}if(bK.boundTo===undefined||bK.boundTo==="vertices"){for(ck=0,cR=bY.length;ck<cR;
ck++){bH=cP[bY[ck]];cv=bK.value[bH.a];cu=bK.value[bH.b];ct=bK.value[bH.c];bK.array[bQ]=cv[b0[0]];
bK.array[bQ+1]=cv[b0[1]];bK.array[bQ+2]=cv[b0[2]];bK.array[bQ+3]=cu[b0[0]];bK.array[bQ+4]=cu[b0[1]];
bK.array[bQ+5]=cu[b0[2]];bK.array[bQ+6]=ct[b0[0]];bK.array[bQ+7]=ct[b0[1]];bK.array[bQ+8]=ct[b0[2]];
bQ+=9}}else{if(bK.boundTo==="faces"){for(ck=0,cR=bY.length;ck<cR;ck++){cb=bK.value[bY[ck]];
cv=cb;cu=cb;ct=cb;bK.array[bQ]=cv[b0[0]];bK.array[bQ+1]=cv[b0[1]];bK.array[bQ+2]=cv[b0[2]];
bK.array[bQ+3]=cu[b0[0]];bK.array[bQ+4]=cu[b0[1]];bK.array[bQ+5]=cu[b0[2]];bK.array[bQ+6]=ct[b0[0]];
bK.array[bQ+7]=ct[b0[1]];bK.array[bQ+8]=ct[b0[2]];bQ+=9}}else{if(bK.boundTo==="faceVertices"){for(ck=0,cR=bY.length;
ck<cR;ck++){cb=bK.value[bY[ck]];cv=cb[0];cu=cb[1];ct=cb[2];bK.array[bQ]=cv[b0[0]];
bK.array[bQ+1]=cv[b0[1]];bK.array[bQ+2]=cv[b0[2]];bK.array[bQ+3]=cu[b0[0]];bK.array[bQ+4]=cu[b0[1]];
bK.array[bQ+5]=cu[b0[2]];bK.array[bQ+6]=ct[b0[0]];bK.array[bQ+7]=ct[b0[1]];bK.array[bQ+8]=ct[b0[2]];
bQ+=9}}}}}else{if(bK.size===4){if(bK.boundTo===undefined||bK.boundTo==="vertices"){for(ck=0,cR=bY.length;
ck<cR;ck++){bH=cP[bY[ck]];cv=bK.value[bH.a];cu=bK.value[bH.b];ct=bK.value[bH.c];
bK.array[bQ]=cv.x;bK.array[bQ+1]=cv.y;bK.array[bQ+2]=cv.z;bK.array[bQ+3]=cv.w;bK.array[bQ+4]=cu.x;
bK.array[bQ+5]=cu.y;bK.array[bQ+6]=cu.z;bK.array[bQ+7]=cu.w;bK.array[bQ+8]=ct.x;
bK.array[bQ+9]=ct.y;bK.array[bQ+10]=ct.z;bK.array[bQ+11]=ct.w;bQ+=12}}else{if(bK.boundTo==="faces"){for(ck=0,cR=bY.length;
ck<cR;ck++){cb=bK.value[bY[ck]];cv=cb;cu=cb;ct=cb;bK.array[bQ]=cv.x;bK.array[bQ+1]=cv.y;
bK.array[bQ+2]=cv.z;bK.array[bQ+3]=cv.w;bK.array[bQ+4]=cu.x;bK.array[bQ+5]=cu.y;
bK.array[bQ+6]=cu.z;bK.array[bQ+7]=cu.w;bK.array[bQ+8]=ct.x;bK.array[bQ+9]=ct.y;
bK.array[bQ+10]=ct.z;bK.array[bQ+11]=ct.w;bQ+=12}}else{if(bK.boundTo==="faceVertices"){for(ck=0,cR=bY.length;
ck<cR;ck++){cb=bK.value[bY[ck]];cv=cb[0];cu=cb[1];ct=cb[2];bK.array[bQ]=cv.x;bK.array[bQ+1]=cv.y;
bK.array[bQ+2]=cv.z;bK.array[bQ+3]=cv.w;bK.array[bQ+4]=cu.x;bK.array[bQ+5]=cu.y;
bK.array[bQ+6]=cu.z;bK.array[bQ+7]=cu.w;bK.array[bQ+8]=ct.x;bK.array[bQ+9]=ct.y;
bK.array[bQ+10]=ct.z;bK.array[bQ+11]=ct.w;bQ+=12}}}}}}}}a5.bindBuffer(a5.ARRAY_BUFFER,bK.buffer);
a5.bufferData(a5.ARRAY_BUFFER,bK.array,da)}}if(bR){delete cD.__inittedArrays;delete cD.__colorArray;
delete cD.__normalArray;delete cD.__tangentArray;delete cD.__uvArray;delete cD.__uv2Array;
delete cD.__faceArray;delete cD.__vertexArray;delete cD.__lineArray;delete cD.__skinIndexArray;
delete cD.__skinWeightArray}}this.renderBufferImmediate=function(bV,bJ,bL){by.initAttributes();
if(bV.hasPositions&&!bV.__webglVertexBuffer){bV.__webglVertexBuffer=a5.createBuffer()
}if(bV.hasNormals&&!bV.__webglNormalBuffer){bV.__webglNormalBuffer=a5.createBuffer()
}if(bV.hasUvs&&!bV.__webglUvBuffer){bV.__webglUvBuffer=a5.createBuffer()}if(bV.hasColors&&!bV.__webglColorBuffer){bV.__webglColorBuffer=a5.createBuffer()
}if(bV.hasPositions){a5.bindBuffer(a5.ARRAY_BUFFER,bV.__webglVertexBuffer);a5.bufferData(a5.ARRAY_BUFFER,bV.positionArray,a5.DYNAMIC_DRAW);
by.enableAttribute(bJ.attributes.position);a5.vertexAttribPointer(bJ.attributes.position,3,a5.FLOAT,false,0,0)
}if(bV.hasNormals){a5.bindBuffer(a5.ARRAY_BUFFER,bV.__webglNormalBuffer);if(bL instanceof THREE.MeshPhongMaterial===false&&bL.shading===THREE.FlatShading){var bT,bS,bQ,bI,bO,bX,bH,bN,bW,bG,bM,bU,bR,bP,bK=bV.count*3;
for(bP=0;bP<bK;bP+=9){bR=bV.normalArray;bI=bR[bP];bH=bR[bP+1];bG=bR[bP+2];bO=bR[bP+3];
bN=bR[bP+4];bM=bR[bP+5];bX=bR[bP+6];bW=bR[bP+7];bU=bR[bP+8];bT=(bI+bO+bX)/3;bS=(bH+bN+bW)/3;
bQ=(bG+bM+bU)/3;bR[bP]=bT;bR[bP+1]=bS;bR[bP+2]=bQ;bR[bP+3]=bT;bR[bP+4]=bS;bR[bP+5]=bQ;
bR[bP+6]=bT;bR[bP+7]=bS;bR[bP+8]=bQ}}a5.bufferData(a5.ARRAY_BUFFER,bV.normalArray,a5.DYNAMIC_DRAW);
by.enableAttribute(bJ.attributes.normal);a5.vertexAttribPointer(bJ.attributes.normal,3,a5.FLOAT,false,0,0)
}if(bV.hasUvs&&bL.map){a5.bindBuffer(a5.ARRAY_BUFFER,bV.__webglUvBuffer);a5.bufferData(a5.ARRAY_BUFFER,bV.uvArray,a5.DYNAMIC_DRAW);
by.enableAttribute(bJ.attributes.uv);a5.vertexAttribPointer(bJ.attributes.uv,2,a5.FLOAT,false,0,0)
}if(bV.hasColors&&bL.vertexColors!==THREE.NoColors){a5.bindBuffer(a5.ARRAY_BUFFER,bV.__webglColorBuffer);
a5.bufferData(a5.ARRAY_BUFFER,bV.colorArray,a5.DYNAMIC_DRAW);by.enableAttribute(bJ.attributes.color);
a5.vertexAttribPointer(bJ.attributes.color,3,a5.FLOAT,false,0,0)}by.disableUnusedAttributes();
a5.drawArrays(a5.TRIANGLES,0,bV.count);bV.count=0};function u(bM,bK,bN,bQ){var bL=bN.attributes;
var bG=bK.attributes;var bP=bK.attributesKeys;for(var bJ=0,bH=bP.length;bJ<bH;bJ++){var bO=bP[bJ];
var bI=bG[bO];if(bI>=0){var bS=bL[bO];if(bS!==undefined){var bR=bS.itemSize;a5.bindBuffer(a5.ARRAY_BUFFER,bS.buffer);
by.enableAttribute(bI);a5.vertexAttribPointer(bI,bR,a5.FLOAT,false,0,bQ*bR*4)}else{if(bM.defaultAttributeValues!==undefined){if(bM.defaultAttributeValues[bO].length===2){a5.vertexAttrib2fv(bI,bM.defaultAttributeValues[bO])
}else{if(bM.defaultAttributeValues[bO].length===3){a5.vertexAttrib3fv(bI,bM.defaultAttributeValues[bO])
}}}}}}by.disableUnusedAttributes()}this.renderBufferDirect=function(bV,bW,bG,bO,bJ,bY){if(bO.visible===false){return
}ap(bY);var bM=aP(bV,bW,bG,bO,bY);var bR=false,bT=bO.wireframe?1:0,bS="direct_"+bJ.id+"_"+bM.id+"_"+bT;
if(bS!==Z){Z=bS;bR=true}if(bR){by.initAttributes()}if(bY instanceof THREE.Mesh){var bP=bO.wireframe===true?a5.LINES:a5.TRIANGLES;
var bL=bJ.attributes.index;if(bL){var bH,bQ;if(bL.array instanceof Uint32Array&&d.get("OES_element_index_uint")){bH=a5.UNSIGNED_INT;
bQ=4}else{bH=a5.UNSIGNED_SHORT;bQ=2}var bK=bJ.offsets;if(bK.length===0){if(bR){u(bO,bM,bJ,0);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bL.array.length,bH,0);
R.info.render.calls++;R.info.render.vertices+=bL.array.length;R.info.render.faces+=bL.array.length/3
}else{bR=true;for(var bU=0,bN=bK.length;bU<bN;bU++){var bI=bK[bU].index;if(bR){u(bO,bM,bJ,bI);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bK[bU].count,bH,bK[bU].start*bQ);
R.info.render.calls++;R.info.render.vertices+=bK[bU].count;R.info.render.faces+=bK[bU].count/3
}}}else{if(bR){u(bO,bM,bJ,0)}var bX=bJ.attributes.position;a5.drawArrays(bP,0,bX.array.length/bX.itemSize);
R.info.render.calls++;R.info.render.vertices+=bX.array.length/bX.itemSize;R.info.render.faces+=bX.array.length/(3*bX.itemSize)
}}else{if(bY instanceof THREE.PointCloud){var bP=a5.POINTS;var bL=bJ.attributes.index;
if(bL){var bH,bQ;if(bL.array instanceof Uint32Array&&d.get("OES_element_index_uint")){bH=a5.UNSIGNED_INT;
bQ=4}else{bH=a5.UNSIGNED_SHORT;bQ=2}var bK=bJ.offsets;if(bK.length===0){if(bR){u(bO,bM,bJ,0);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bL.array.length,bH,0);
R.info.render.calls++;R.info.render.points+=bL.array.length}else{if(bK.length>1){bR=true
}for(var bU=0,bN=bK.length;bU<bN;bU++){var bI=bK[bU].index;if(bR){u(bO,bM,bJ,bI);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bK[bU].count,bH,bK[bU].start*bQ);
R.info.render.calls++;R.info.render.points+=bK[bU].count}}}else{if(bR){u(bO,bM,bJ,0)
}var bX=bJ.attributes.position;var bK=bJ.offsets;if(bK.length===0){a5.drawArrays(bP,0,bX.array.length/3);
R.info.render.calls++;R.info.render.points+=bX.array.length/3}else{for(var bU=0,bN=bK.length;
bU<bN;bU++){a5.drawArrays(bP,bK[bU].index,bK[bU].count);R.info.render.calls++;R.info.render.points+=bK[bU].count
}}}}else{if(bY instanceof THREE.Line){var bP=(bY.mode===THREE.LineStrip)?a5.LINE_STRIP:a5.LINES;
by.setLineWidth(bO.linewidth*H);var bL=bJ.attributes.index;if(bL){var bH,bQ;if(bL.array instanceof Uint32Array){bH=a5.UNSIGNED_INT;
bQ=4}else{bH=a5.UNSIGNED_SHORT;bQ=2}var bK=bJ.offsets;if(bK.length===0){if(bR){u(bO,bM,bJ,0);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bL.array.length,bH,0);
R.info.render.calls++;R.info.render.vertices+=bL.array.length}else{if(bK.length>1){bR=true
}for(var bU=0,bN=bK.length;bU<bN;bU++){var bI=bK[bU].index;if(bR){u(bO,bM,bJ,bI);
a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.buffer)}a5.drawElements(bP,bK[bU].count,bH,bK[bU].start*bQ);
R.info.render.calls++;R.info.render.vertices+=bK[bU].count}}}else{if(bR){u(bO,bM,bJ,0)
}var bX=bJ.attributes.position;var bK=bJ.offsets;if(bK.length===0){a5.drawArrays(bP,0,bX.array.length/3);
R.info.render.calls++;R.info.render.vertices+=bX.array.length/3}else{for(var bU=0,bN=bK.length;
bU<bN;bU++){a5.drawArrays(bP,bK[bU].index,bK[bU].count);R.info.render.calls++;R.info.render.vertices+=bK[bU].count
}}}}}}};this.renderBuffer=function(bR,bM,bG,bS,bL,bK){if(bS.visible===false){return
}ap(bK);var bP=aP(bR,bM,bG,bS,bK);var bN=bP.attributes;var bJ=false,bU=bS.wireframe?1:0,bI=bL.id+"_"+bP.id+"_"+bU;
if(bI!==Z){Z=bI;bJ=true}if(bJ){by.initAttributes()}if(!bS.morphTargets&&bN.position>=0){if(bJ){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglVertexBuffer);
by.enableAttribute(bN.position);a5.vertexAttribPointer(bN.position,3,a5.FLOAT,false,0,0)
}}else{if(bK.morphTargetBase){ai(bS,bL,bK)}}if(bJ){if(bL.__webglCustomAttributesList){for(var bO=0,bV=bL.__webglCustomAttributesList.length;
bO<bV;bO++){var bH=bL.__webglCustomAttributesList[bO];if(bN[bH.buffer.belongsToAttribute]>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bH.buffer);
by.enableAttribute(bN[bH.buffer.belongsToAttribute]);a5.vertexAttribPointer(bN[bH.buffer.belongsToAttribute],bH.size,a5.FLOAT,false,0,0)
}}}if(bN.color>=0){if(bK.geometry.colors.length>0||bK.geometry.faces.length>0){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglColorBuffer);
by.enableAttribute(bN.color);a5.vertexAttribPointer(bN.color,3,a5.FLOAT,false,0,0)
}else{if(bS.defaultAttributeValues!==undefined){a5.vertexAttrib3fv(bN.color,bS.defaultAttributeValues.color)
}}}if(bN.normal>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglNormalBuffer);by.enableAttribute(bN.normal);
a5.vertexAttribPointer(bN.normal,3,a5.FLOAT,false,0,0)}if(bN.tangent>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglTangentBuffer);
by.enableAttribute(bN.tangent);a5.vertexAttribPointer(bN.tangent,4,a5.FLOAT,false,0,0)
}if(bN.uv>=0){if(bK.geometry.faceVertexUvs[0]){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglUVBuffer);
by.enableAttribute(bN.uv);a5.vertexAttribPointer(bN.uv,2,a5.FLOAT,false,0,0)}else{if(bS.defaultAttributeValues!==undefined){a5.vertexAttrib2fv(bN.uv,bS.defaultAttributeValues.uv)
}}}if(bN.uv2>=0){if(bK.geometry.faceVertexUvs[1]){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglUV2Buffer);
by.enableAttribute(bN.uv2);a5.vertexAttribPointer(bN.uv2,2,a5.FLOAT,false,0,0)}else{if(bS.defaultAttributeValues!==undefined){a5.vertexAttrib2fv(bN.uv2,bS.defaultAttributeValues.uv2)
}}}if(bS.skinning&&bN.skinIndex>=0&&bN.skinWeight>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglSkinIndicesBuffer);
by.enableAttribute(bN.skinIndex);a5.vertexAttribPointer(bN.skinIndex,4,a5.FLOAT,false,0,0);
a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglSkinWeightsBuffer);by.enableAttribute(bN.skinWeight);
a5.vertexAttribPointer(bN.skinWeight,4,a5.FLOAT,false,0,0)}if(bN.lineDistance>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bL.__webglLineDistanceBuffer);
by.enableAttribute(bN.lineDistance);a5.vertexAttribPointer(bN.lineDistance,1,a5.FLOAT,false,0,0)
}}by.disableUnusedAttributes();if(bK instanceof THREE.Mesh){var bT=bL.__typeArray===Uint32Array?a5.UNSIGNED_INT:a5.UNSIGNED_SHORT;
if(bS.wireframe){by.setLineWidth(bS.wireframeLinewidth*H);if(bJ){a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.__webglLineBuffer)
}a5.drawElements(a5.LINES,bL.__webglLineCount,bT,0)}else{if(bJ){a5.bindBuffer(a5.ELEMENT_ARRAY_BUFFER,bL.__webglFaceBuffer)
}a5.drawElements(a5.TRIANGLES,bL.__webglFaceCount,bT,0)}R.info.render.calls++;R.info.render.vertices+=bL.__webglFaceCount;
R.info.render.faces+=bL.__webglFaceCount/3}else{if(bK instanceof THREE.Line){var bQ=(bK.mode===THREE.LineStrip)?a5.LINE_STRIP:a5.LINES;
by.setLineWidth(bS.linewidth*H);a5.drawArrays(bQ,0,bL.__webglLineCount);R.info.render.calls++
}else{if(bK instanceof THREE.PointCloud){a5.drawArrays(a5.POINTS,0,bL.__webglParticleCount);
R.info.render.calls++;R.info.render.points+=bL.__webglParticleCount}}}};function ai(bR,bM,bL){var bP=bR.program.attributes;
if(bL.morphTargetBase!==-1&&bP.position>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglMorphTargetsBuffers[bL.morphTargetBase]);
by.enableAttribute(bP.position);a5.vertexAttribPointer(bP.position,3,a5.FLOAT,false,0,0)
}else{if(bP.position>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglVertexBuffer);
by.enableAttribute(bP.position);a5.vertexAttribPointer(bP.position,3,a5.FLOAT,false,0,0)
}}if(bL.morphTargetForcedOrder.length){var bI=0;var bJ=bL.morphTargetForcedOrder;
var bT=bL.morphTargetInfluences;var bG;while(bI<bR.numSupportedMorphTargets&&bI<bJ.length){bG=bP["morphTarget"+bI];
if(bG>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglMorphTargetsBuffers[bJ[bI]]);
by.enableAttribute(bG);a5.vertexAttribPointer(bG,3,a5.FLOAT,false,0,0)}bG=bP["morphNormal"+bI];
if(bG>=0&&bR.morphNormals){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglMorphNormalsBuffers[bJ[bI]]);
by.enableAttribute(bG);a5.vertexAttribPointer(bG,3,a5.FLOAT,false,0,0)}bL.__webglMorphTargetInfluences[bI]=bT[bJ[bI]];
bI++}}else{var bK=[];var bT=bL.morphTargetInfluences;var bH=bL.geometry.morphTargets;
if(bT.length>bH.length){console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array.");
bT.length=bH.length}for(var bQ=0,bU=bT.length;bQ<bU;bQ++){var bS=bT[bQ];bK.push([bS,bQ])
}if(bK.length>bR.numSupportedMorphTargets){bK.sort(a);bK.length=bR.numSupportedMorphTargets
}else{if(bK.length>bR.numSupportedMorphNormals){bK.sort(a)}else{if(bK.length===0){bK.push([0,0])
}}}var bG;for(var bI=0,bO=bR.numSupportedMorphTargets;bI<bO;bI++){if(bK[bI]){var bN=bK[bI][1];
bG=bP["morphTarget"+bI];if(bG>=0){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglMorphTargetsBuffers[bN]);
by.enableAttribute(bG);a5.vertexAttribPointer(bG,3,a5.FLOAT,false,0,0)}bG=bP["morphNormal"+bI];
if(bG>=0&&bR.morphNormals){a5.bindBuffer(a5.ARRAY_BUFFER,bM.__webglMorphNormalsBuffers[bN]);
by.enableAttribute(bG);a5.vertexAttribPointer(bG,3,a5.FLOAT,false,0,0)}bL.__webglMorphTargetInfluences[bI]=bT[bN]
}else{bL.__webglMorphTargetInfluences[bI]=0}}}if(bR.program.uniforms.morphTargetInfluences!==null){a5.uniform1fv(bR.program.uniforms.morphTargetInfluences,bL.__webglMorphTargetInfluences)
}}function aI(bH,bG){if(bH.object.renderOrder!==bG.object.renderOrder){return bH.object.renderOrder-bG.object.renderOrder
}else{if(bH.material.id!==bG.material.id){return bH.material.id-bG.material.id}else{if(bH.z!==bG.z){return bH.z-bG.z
}else{return bH.id-bG.id}}}}function k(bH,bG){if(bH.object.renderOrder!==bG.object.renderOrder){return bH.object.renderOrder-bG.object.renderOrder
}if(bH.z!==bG.z){return bG.z-bH.z}else{return bH.id-bG.id}}function a(bH,bG){return bG[0]-bH[0]
}this.render=function(bK,bO,bL,bM){if(bO instanceof THREE.Camera===false){THREE.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
return}var bG=bK.fog;Z="";aB=-1;T=null;bE=true;if(bK.autoUpdate===true){bK.updateMatrixWorld()
}if(bO.parent===undefined){bO.updateMatrixWorld()}bK.traverse(function(bQ){if(bQ instanceof THREE.SkinnedMesh){bQ.skeleton.update()
}});bO.matrixWorldInverse.getInverse(bO.matrixWorld);aG.multiplyMatrices(bO.projectionMatrix,bO.matrixWorldInverse);
aX.setFromMatrix(aG);o.length=0;n.length=0;aF.length=0;az.length=0;bm.length=0;
t(bK);if(R.sortObjects===true){n.sort(aI);aF.sort(k)}bi.render(bK,bO);R.info.render.calls=0;
R.info.render.vertices=0;R.info.render.faces=0;R.info.render.points=0;this.setRenderTarget(bL);
if(this.autoClear||bM){this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil)
}for(var bI=0,bP=aT.length;bI<bP;bI++){var bJ=aT[bI];var bH=bJ.object;if(bH.visible){ba(bH,bO);
ad(bJ)}}if(bK.overrideMaterial){var bN=bK.overrideMaterial;M(bN);aA(n,bO,o,bG,bN);
aA(aF,bO,o,bG,bN);bw(aT,"",bO,o,bG,bN)}else{by.setBlending(THREE.NoBlending);aA(n,bO,o,bG,null);
bw(aT,"opaque",bO,o,bG,null);aA(aF,bO,o,bG,null);bw(aT,"transparent",bO,o,bG,null)
}aV.render(bK,bO);bD.render(bK,bO,af,aM);if(bL&&bL.generateMipmaps&&bL.minFilter!==THREE.NearestFilter&&bL.minFilter!==THREE.LinearFilter){g(bL)
}by.setDepthTest(true);by.setDepthWrite(true);by.setColorWrite(true)};function t(bH){if(bH.visible===false){return
}if(bH instanceof THREE.Scene||bH instanceof THREE.Group){}else{C(bH);if(bH instanceof THREE.Light){o.push(bH)
}else{if(bH instanceof THREE.Sprite){az.push(bH)}else{if(bH instanceof THREE.LensFlare){bm.push(bH)
}else{var bJ=at[bH.id];if(bJ&&(bH.frustumCulled===false||aX.intersectsObject(bH)===true)){for(var bI=0,bG=bJ.length;
bI<bG;bI++){var bK=bJ[bI];q(bK);bK.render=true;if(R.sortObjects===true){D.setFromMatrixPosition(bH.matrixWorld);
D.applyProjection(aG);bK.z=D.z}}}}}}}for(var bI=0,bG=bH.children.length;bI<bG;bI++){t(bH.children[bI])
}}function aA(bG,bO,bL,bH,bQ){var bP;for(var bM=0,bI=bG.length;bM<bI;bM++){var bN=bG[bM];
var bJ=bN.object;var bK=bN.buffer;ba(bJ,bO);if(bQ){bP=bQ}else{bP=bN.material;if(!bP){continue
}M(bP)}R.setMaterialFaces(bP);if(bK instanceof THREE.BufferGeometry){R.renderBufferDirect(bO,bL,bH,bP,bK,bJ)
}else{R.renderBuffer(bO,bL,bH,bP,bK,bJ)}}}function bw(bG,bN,bO,bK,bH,bQ){var bP;
for(var bL=0,bI=bG.length;bL<bI;bL++){var bM=bG[bL];var bJ=bM.object;if(bJ.visible){if(bQ){bP=bQ
}else{bP=bM[bN];if(!bP){continue}M(bP)}R.renderImmediateObject(bO,bK,bH,bP,bJ)}}}this.renderImmediateObject=function(bK,bI,bL,bJ,bH){var bG=aP(bK,bI,bL,bJ,bH);
Z="";R.setMaterialFaces(bJ);if(bH.immediateRenderCallback){bH.immediateRenderCallback(bG,a5,aX)
}else{bH.render(function(bM){R.renderBufferImmediate(bM,bG,bJ)})}};function ad(bI){var bG=bI.object,bH=bG.material;
if(bH.transparent){bI.transparent=bH;bI.opaque=null}else{bI.opaque=bH;bI.transparent=null
}}function q(bK){var bI=bK.object;var bH=bK.buffer;var bL=bI.geometry;var bJ=bI.material;
if(bJ instanceof THREE.MeshFaceMaterial){var bG=bL instanceof THREE.BufferGeometry?0:bH.materialIndex;
bJ=bJ.materials[bG];bK.material=bJ;if(bJ.transparent){aF.push(bK)}else{n.push(bK)
}}else{if(bJ){bK.material=bJ;if(bJ.transparent){aF.push(bK)}else{n.push(bK)}}}}function C(bI){if(bI.__webglInit===undefined){bI.__webglInit=true;
bI._modelViewMatrix=new THREE.Matrix4();bI._normalMatrix=new THREE.Matrix3();bI.addEventListener("removed",bz)
}var bK=bI.geometry;if(bK===undefined){}else{if(bK.__webglInit===undefined){bK.__webglInit=true;
bK.addEventListener("dispose",aZ);if(bK instanceof THREE.BufferGeometry){R.info.memory.geometries++
}else{if(bI instanceof THREE.Mesh){bs(bI,bK)}else{if(bI instanceof THREE.Line){if(bK.__webglVertexBuffer===undefined){bC(bK);
N(bK,bI);bK.verticesNeedUpdate=true;bK.colorsNeedUpdate=true;bK.lineDistancesNeedUpdate=true
}}else{if(bI instanceof THREE.PointCloud){if(bK.__webglVertexBuffer===undefined){ag(bK);
bf(bK,bI);bK.verticesNeedUpdate=true;bK.colorsNeedUpdate=true}}}}}}}if(bI.__webglActive===undefined){bI.__webglActive=true;
if(bI instanceof THREE.Mesh){if(bK instanceof THREE.BufferGeometry){j(at,bK,bI)
}else{if(bK instanceof THREE.Geometry){var bG=ay[bK.id];for(var bJ=0,bH=bG.length;
bJ<bH;bJ++){j(at,bG[bJ],bI)}}}}else{if(bI instanceof THREE.Line||bI instanceof THREE.PointCloud){j(at,bK,bI)
}else{if(bI instanceof THREE.ImmediateRenderObject||bI.immediateRenderCallback){S(aT,bI)
}}}}}var ay={};var au=0;function B(bO,bT){var bL=d.get("OES_element_index_uint")?4294967296:65535;
var bI,bM={};var bR=bO.morphTargets.length;var bH=bO.morphNormals.length;var bS;
var bG={};var bJ=[];for(var bK=0,bQ=bO.faces.length;bK<bQ;bK++){var bN=bO.faces[bK];
var bP=bT?bN.materialIndex:0;if(!(bP in bM)){bM[bP]={hash:bP,counter:0}}bI=bM[bP].hash+"_"+bM[bP].counter;
if(!(bI in bG)){bS={id:au++,faces3:[],materialIndex:bP,vertices:0,numMorphTargets:bR,numMorphNormals:bH};
bG[bI]=bS;bJ.push(bS)}if(bG[bI].vertices+3>bL){bM[bP].counter+=1;bI=bM[bP].hash+"_"+bM[bP].counter;
if(!(bI in bG)){bS={id:au++,faces3:[],materialIndex:bP,vertices:0,numMorphTargets:bR,numMorphNormals:bH};
bG[bI]=bS;bJ.push(bS)}}bG[bI].faces3.push(bK);bG[bI].vertices+=3}return bJ}function bs(bK,bN){var bM=bK.material,bJ=false;
if(ay[bN.id]===undefined||bN.groupsNeedUpdate===true){delete at[bK.id];ay[bN.id]=B(bN,bM instanceof THREE.MeshFaceMaterial);
bN.groupsNeedUpdate=false}var bG=ay[bN.id];for(var bL=0,bI=bG.length;bL<bI;bL++){var bH=bG[bL];
if(bH.__webglVertexBuffer===undefined){bB(bH);K(bH,bK);bN.verticesNeedUpdate=true;
bN.morphTargetsNeedUpdate=true;bN.elementsNeedUpdate=true;bN.uvsNeedUpdate=true;
bN.normalsNeedUpdate=true;bN.tangentsNeedUpdate=true;bN.colorsNeedUpdate=true;bJ=true
}else{bJ=false}if(bJ||bK.__webglActive===undefined){j(at,bH,bK)}}bK.__webglActive=true
}function j(bI,bG,bH){var bJ=bH.id;bI[bJ]=bI[bJ]||[];bI[bJ].push({id:bJ,buffer:bG,object:bH,material:null,z:0})
}function S(bH,bG){bH.push({id:null,object:bG,opaque:null,transparent:null,z:0})
}function ap(bJ){var bO=bJ.geometry;if(bO instanceof THREE.BufferGeometry){var bK=bO.attributes;
var bT=bO.attributesKeys;for(var bL=0,bH=bT.length;bL<bH;bL++){var bR=bT[bL];var bG=bK[bR];
var bS=(bR==="index")?a5.ELEMENT_ARRAY_BUFFER:a5.ARRAY_BUFFER;if(bG.buffer===undefined){bG.buffer=a5.createBuffer();
a5.bindBuffer(bS,bG.buffer);a5.bufferData(bS,bG.array,(bG instanceof THREE.DynamicBufferAttribute)?a5.DYNAMIC_DRAW:a5.STATIC_DRAW);
bG.needsUpdate=false}else{if(bG.needsUpdate===true){a5.bindBuffer(bS,bG.buffer);
if(bG.updateRange===undefined||bG.updateRange.count===-1){a5.bufferSubData(bS,0,bG.array)
}else{if(bG.updateRange.count===0){console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.")
}else{a5.bufferSubData(bS,bG.updateRange.offset*bG.array.BYTES_PER_ELEMENT,bG.array.subarray(bG.updateRange.offset,bG.updateRange.offset+bG.updateRange.count));
bG.updateRange.count=0}}bG.needsUpdate=false}}}}else{if(bJ instanceof THREE.Mesh){if(bO.groupsNeedUpdate===true){bs(bJ,bO)
}var bN=ay[bO.id];for(var bL=0,bP=bN.length;bL<bP;bL++){var bI=bN[bL];var bM=aN(bJ,bI);
var bQ=bM.attributes&&aR(bM);if(bO.verticesNeedUpdate||bO.morphTargetsNeedUpdate||bO.elementsNeedUpdate||bO.uvsNeedUpdate||bO.normalsNeedUpdate||bO.colorsNeedUpdate||bO.tangentsNeedUpdate||bQ){v(bI,bJ,a5.DYNAMIC_DRAW,!bO.dynamic,bM)
}}bO.verticesNeedUpdate=false;bO.morphTargetsNeedUpdate=false;bO.elementsNeedUpdate=false;
bO.uvsNeedUpdate=false;bO.normalsNeedUpdate=false;bO.colorsNeedUpdate=false;bO.tangentsNeedUpdate=false;
bM.attributes&&am(bM)}else{if(bJ instanceof THREE.Line){var bM=aN(bJ,bO);var bQ=bM.attributes&&aR(bM);
if(bO.verticesNeedUpdate||bO.colorsNeedUpdate||bO.lineDistancesNeedUpdate||bQ){bA(bO,a5.DYNAMIC_DRAW)
}bO.verticesNeedUpdate=false;bO.colorsNeedUpdate=false;bO.lineDistancesNeedUpdate=false;
bM.attributes&&am(bM)}else{if(bJ instanceof THREE.PointCloud){var bM=aN(bJ,bO);
var bQ=bM.attributes&&aR(bM);if(bO.verticesNeedUpdate||bO.colorsNeedUpdate||bQ){W(bO,a5.DYNAMIC_DRAW,bJ)
}bO.verticesNeedUpdate=false;bO.colorsNeedUpdate=false;bM.attributes&&am(bM)}}}}}function aR(bH){for(var bG in bH.attributes){if(bH.attributes[bG].needsUpdate){return true
}}return false}function am(bH){for(var bG in bH.attributes){bH.attributes[bG].needsUpdate=false
}}function aS(bG){if(bG instanceof THREE.Mesh||bG instanceof THREE.PointCloud||bG instanceof THREE.Line){delete at[bG.id]
}else{if(bG instanceof THREE.ImmediateRenderObject||bG.immediateRenderCallback){aQ(aT,bG)
}}delete bG.__webglInit;delete bG._modelViewMatrix;delete bG._normalMatrix;delete bG.__webglActive
}function aQ(bH,bG){for(var bI=bH.length-1;bI>=0;bI--){if(bH[bI].object===bG){bH.splice(bI,1)
}}}var aW={MeshDepthMaterial:"depth",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointCloudMaterial:"particle_basic"};
function aq(bS,bZ,bH,b1){bS.addEventListener("dispose",bt);var bN=aW[bS.type];if(bN){var bG=THREE.ShaderLib[bN];
bS.__webglShader={uniforms:THREE.UniformsUtils.clone(bG.uniforms),vertexShader:bG.vertexShader,fragmentShader:bG.fragmentShader}
}else{bS.__webglShader={uniforms:bS.uniforms,vertexShader:bS.vertexShader,fragmentShader:bS.fragmentShader}
}var bV=F(bZ);var bM=bv(bZ);var b0=f(b1);var bO={precision:a0,supportsVertexTextures:aH,map:!!bS.map,envMap:!!bS.envMap,envMapMode:bS.envMap&&bS.envMap.mapping,lightMap:!!bS.lightMap,bumpMap:!!bS.bumpMap,normalMap:!!bS.normalMap,specularMap:!!bS.specularMap,alphaMap:!!bS.alphaMap,combine:bS.combine,vertexColors:bS.vertexColors,fog:bH,useFog:bS.fog,fogExp:bH instanceof THREE.FogExp2,flatShading:bS.shading===THREE.FlatShading,sizeAttenuation:bS.sizeAttenuation,logarithmicDepthBuffer:aj,skinning:bS.skinning,maxBones:b0,useVertexTexture:a9&&b1&&b1.skeleton&&b1.skeleton.useVertexTexture,morphTargets:bS.morphTargets,morphNormals:bS.morphNormals,maxMorphTargets:R.maxMorphTargets,maxMorphNormals:R.maxMorphNormals,maxDirLights:bV.directional,maxPointLights:bV.point,maxSpotLights:bV.spot,maxHemiLights:bV.hemi,maxShadows:bM,shadowMapEnabled:R.shadowMapEnabled&&b1.receiveShadow&&bM>0,shadowMapType:R.shadowMapType,shadowMapDebug:R.shadowMapDebug,shadowMapCascade:R.shadowMapCascade,alphaTest:bS.alphaTest,metal:bS.metal,wrapAround:bS.wrapAround,doubleSided:bS.side===THREE.DoubleSide,flipSided:bS.side===THREE.BackSide};
var bT=[];if(bN){bT.push(bN)}else{bT.push(bS.fragmentShader);bT.push(bS.vertexShader)
}if(bS.defines!==undefined){for(var b2 in bS.defines){bT.push(b2);bT.push(bS.defines[b2])
}}for(var b2 in bO){bT.push(b2);bT.push(bO[b2])}var bJ=bT.join();var bQ;for(var bW=0,bY=b.length;
bW<bY;bW++){var bL=b[bW];if(bL.code===bJ){bQ=bL;bQ.usedTimes++;break}}if(bQ===undefined){bQ=new THREE.WebGLProgram(R,bJ,bS,bO);
b.push(bQ);R.info.memory.programs=b.length}bS.program=bQ;var bP=bQ.attributes;if(bS.morphTargets){bS.numSupportedMorphTargets=0;
var bU,bK="morphTarget";for(var bX=0;bX<R.maxMorphTargets;bX++){bU=bK+bX;if(bP[bU]>=0){bS.numSupportedMorphTargets++
}}}if(bS.morphNormals){bS.numSupportedMorphNormals=0;var bU,bK="morphNormal";for(bX=0;
bX<R.maxMorphNormals;bX++){bU=bK+bX;if(bP[bU]>=0){bS.numSupportedMorphNormals++
}}}bS.uniformsList=[];for(var bR in bS.__webglShader.uniforms){var bI=bS.program.uniforms[bR];
if(bI){bS.uniformsList.push([bS.__webglShader.uniforms[bR],bI])}}}function M(bG){if(bG.transparent===true){by.setBlending(bG.blending,bG.blendEquation,bG.blendSrc,bG.blendDst,bG.blendEquationAlpha,bG.blendSrcAlpha,bG.blendDstAlpha)
}else{by.setBlending(THREE.NoBlending)}by.setDepthTest(bG.depthTest);by.setDepthWrite(bG.depthWrite);
by.setColorWrite(bG.colorWrite);by.setPolygonOffset(bG.polygonOffset,bG.polygonOffsetFactor,bG.polygonOffsetUnits)
}function aP(bN,bK,bG,bO,bJ){bp=0;if(bO.needsUpdate){if(bO.program){p(bO)}aq(bO,bK,bG,bJ);
bO.needsUpdate=false}if(bO.morphTargets){if(!bJ.__webglMorphTargetInfluences){bJ.__webglMorphTargetInfluences=new Float32Array(R.maxMorphTargets)
}}var bI=false;var bM=false;var bH=false;var bL=bO.program,bR=bL.uniforms,bP=bO.__webglShader.uniforms;
if(bL.id!==L){a5.useProgram(bL.program);L=bL.id;bI=true;bM=true;bH=true}if(bO.id!==aB){if(aB===-1){bH=true
}aB=bO.id;bM=true}if(bI||bN!==T){a5.uniformMatrix4fv(bR.projectionMatrix,false,bN.projectionMatrix.elements);
if(aj){a5.uniform1f(bR.logDepthBufFC,2/(Math.log(bN.far+1)/Math.LN2))}if(bN!==T){T=bN
}if(bO instanceof THREE.ShaderMaterial||bO instanceof THREE.MeshPhongMaterial||bO.envMap){if(bR.cameraPosition!==null){D.setFromMatrixPosition(bN.matrixWorld);
a5.uniform3f(bR.cameraPosition,D.x,D.y,D.z)}}if(bO instanceof THREE.MeshPhongMaterial||bO instanceof THREE.MeshLambertMaterial||bO instanceof THREE.MeshBasicMaterial||bO instanceof THREE.ShaderMaterial||bO.skinning){if(bR.viewMatrix!==null){a5.uniformMatrix4fv(bR.viewMatrix,false,bN.matrixWorldInverse.elements)
}}}if(bO.skinning){if(bJ.bindMatrix&&bR.bindMatrix!==null){a5.uniformMatrix4fv(bR.bindMatrix,false,bJ.bindMatrix.elements)
}if(bJ.bindMatrixInverse&&bR.bindMatrixInverse!==null){a5.uniformMatrix4fv(bR.bindMatrixInverse,false,bJ.bindMatrixInverse.elements)
}if(a9&&bJ.skeleton&&bJ.skeleton.useVertexTexture){if(bR.boneTexture!==null){var bQ=Q();
a5.uniform1i(bR.boneTexture,bQ);R.setTexture(bJ.skeleton.boneTexture,bQ)}if(bR.boneTextureWidth!==null){a5.uniform1i(bR.boneTextureWidth,bJ.skeleton.boneTextureWidth)
}if(bR.boneTextureHeight!==null){a5.uniform1i(bR.boneTextureHeight,bJ.skeleton.boneTextureHeight)
}}else{if(bJ.skeleton&&bJ.skeleton.boneMatrices){if(bR.boneGlobalMatrices!==null){a5.uniformMatrix4fv(bR.boneGlobalMatrices,false,bJ.skeleton.boneMatrices)
}}}}if(bM){if(bG&&bO.fog){a6(bP,bG)}if(bO instanceof THREE.MeshPhongMaterial||bO instanceof THREE.MeshLambertMaterial||bO.lights){if(bE){bH=true;
bj(bK);bE=false}if(bH){J(bP,E);bk(bP,true)}else{bk(bP,false)}}if(bO instanceof THREE.MeshBasicMaterial||bO instanceof THREE.MeshLambertMaterial||bO instanceof THREE.MeshPhongMaterial){an(bP,bO)
}if(bO instanceof THREE.LineBasicMaterial){aw(bP,bO)}else{if(bO instanceof THREE.LineDashedMaterial){aw(bP,bO);
a2(bP,bO)}else{if(bO instanceof THREE.PointCloudMaterial){al(bP,bO)}else{if(bO instanceof THREE.MeshPhongMaterial){av(bP,bO)
}else{if(bO instanceof THREE.MeshLambertMaterial){bg(bP,bO)}else{if(bO instanceof THREE.MeshDepthMaterial){bP.mNear.value=bN.near;
bP.mFar.value=bN.far;bP.opacity.value=bO.opacity}else{if(bO instanceof THREE.MeshNormalMaterial){bP.opacity.value=bO.opacity
}}}}}}}if(bJ.receiveShadow&&!bO._shadowPass){P(bP,bK)}be(bO.uniformsList)}I(bR,bJ);
if(bR.modelMatrix!==null){a5.uniformMatrix4fv(bR.modelMatrix,false,bJ.matrixWorld.elements)
}return bL}function an(bH,bI){bH.opacity.value=bI.opacity;bH.diffuse.value=bI.color;
bH.map.value=bI.map;bH.lightMap.value=bI.lightMap;bH.specularMap.value=bI.specularMap;
bH.alphaMap.value=bI.alphaMap;if(bI.bumpMap){bH.bumpMap.value=bI.bumpMap;bH.bumpScale.value=bI.bumpScale
}if(bI.normalMap){bH.normalMap.value=bI.normalMap;bH.normalScale.value.copy(bI.normalScale)
}var bG;if(bI.map){bG=bI.map}else{if(bI.specularMap){bG=bI.specularMap}else{if(bI.normalMap){bG=bI.normalMap
}else{if(bI.bumpMap){bG=bI.bumpMap}else{if(bI.alphaMap){bG=bI.alphaMap}}}}}if(bG!==undefined){var bK=bG.offset;
var bJ=bG.repeat;bH.offsetRepeat.value.set(bK.x,bK.y,bJ.x,bJ.y)}bH.envMap.value=bI.envMap;
bH.flipEnvMap.value=(bI.envMap instanceof THREE.WebGLRenderTargetCube)?1:-1;bH.reflectivity.value=bI.reflectivity;
bH.refractionRatio.value=bI.refractionRatio}function aw(bG,bH){bG.diffuse.value=bH.color;
bG.opacity.value=bH.opacity}function a2(bG,bH){bG.dashSize.value=bH.dashSize;bG.totalSize.value=bH.dashSize+bH.gapSize;
bG.scale.value=bH.scale}function al(bG,bH){bG.psColor.value=bH.color;bG.opacity.value=bH.opacity;
bG.size.value=bH.size;bG.scale.value=i.height/2;bG.map.value=bH.map;if(bH.map!==null){var bJ=bH.map.offset;
var bI=bH.map.repeat;bG.offsetRepeat.value.set(bJ.x,bJ.y,bI.x,bI.y)}}function a6(bG,bH){bG.fogColor.value=bH.color;
if(bH instanceof THREE.Fog){bG.fogNear.value=bH.near;bG.fogFar.value=bH.far}else{if(bH instanceof THREE.FogExp2){bG.fogDensity.value=bH.density
}}}function av(bG,bH){bG.shininess.value=bH.shininess;bG.emissive.value=bH.emissive;
bG.specular.value=bH.specular;if(bH.wrapAround){bG.wrapRGB.value.copy(bH.wrapRGB)
}}function bg(bG,bH){bG.emissive.value=bH.emissive;if(bH.wrapAround){bG.wrapRGB.value.copy(bH.wrapRGB)
}}function J(bG,bH){bG.ambientLightColor.value=bH.ambient;bG.directionalLightColor.value=bH.directional.colors;
bG.directionalLightDirection.value=bH.directional.positions;bG.pointLightColor.value=bH.point.colors;
bG.pointLightPosition.value=bH.point.positions;bG.pointLightDistance.value=bH.point.distances;
bG.pointLightDecay.value=bH.point.decays;bG.spotLightColor.value=bH.spot.colors;
bG.spotLightPosition.value=bH.spot.positions;bG.spotLightDistance.value=bH.spot.distances;
bG.spotLightDirection.value=bH.spot.directions;bG.spotLightAngleCos.value=bH.spot.anglesCos;
bG.spotLightExponent.value=bH.spot.exponents;bG.spotLightDecay.value=bH.spot.decays;
bG.hemisphereLightSkyColor.value=bH.hemi.skyColors;bG.hemisphereLightGroundColor.value=bH.hemi.groundColors;
bG.hemisphereLightDirection.value=bH.hemi.positions}function bk(bG,bH){bG.ambientLightColor.needsUpdate=bH;
bG.directionalLightColor.needsUpdate=bH;bG.directionalLightDirection.needsUpdate=bH;
bG.pointLightColor.needsUpdate=bH;bG.pointLightPosition.needsUpdate=bH;bG.pointLightDistance.needsUpdate=bH;
bG.pointLightDecay.needsUpdate=bH;bG.spotLightColor.needsUpdate=bH;bG.spotLightPosition.needsUpdate=bH;
bG.spotLightDistance.needsUpdate=bH;bG.spotLightDirection.needsUpdate=bH;bG.spotLightAngleCos.needsUpdate=bH;
bG.spotLightExponent.needsUpdate=bH;bG.spotLightDecay.needsUpdate=bH;bG.hemisphereLightSkyColor.needsUpdate=bH;
bG.hemisphereLightGroundColor.needsUpdate=bH;bG.hemisphereLightDirection.needsUpdate=bH
}function P(bG,bK){if(bG.shadowMatrix){var bJ=0;for(var bL=0,bI=bK.length;bL<bI;
bL++){var bH=bK[bL];if(!bH.castShadow){continue}if(bH instanceof THREE.SpotLight||(bH instanceof THREE.DirectionalLight&&!bH.shadowCascade)){bG.shadowMap.value[bJ]=bH.shadowMap;
bG.shadowMapSize.value[bJ]=bH.shadowMapSize;bG.shadowMatrix.value[bJ]=bH.shadowMatrix;
bG.shadowDarkness.value[bJ]=bH.shadowDarkness;bG.shadowBias.value[bJ]=bH.shadowBias;
bJ++}}}}function I(bG,bH){a5.uniformMatrix4fv(bG.modelViewMatrix,false,bH._modelViewMatrix.elements);
if(bG.normalMatrix){a5.uniformMatrix3fv(bG.normalMatrix,false,bH._normalMatrix.elements)
}}function Q(){var bG=bp;if(bG>=bc){THREE.warn("WebGLRenderer: trying to use "+bG+" texture units while this GPU supports only "+bc)
}bp+=1;return bG}function be(bQ){var bL,bR,bH;for(var bI=0,bK=bQ.length;bI<bK;bI++){var bG=bQ[bI][0];
if(bG.needsUpdate===false){continue}var bM=bG.type;var bP=bG.value;var bO=bQ[bI][1];
switch(bM){case"1i":a5.uniform1i(bO,bP);break;case"1f":a5.uniform1f(bO,bP);break;
case"2f":a5.uniform2f(bO,bP[0],bP[1]);break;case"3f":a5.uniform3f(bO,bP[0],bP[1],bP[2]);
break;case"4f":a5.uniform4f(bO,bP[0],bP[1],bP[2],bP[3]);break;case"1iv":a5.uniform1iv(bO,bP);
break;case"3iv":a5.uniform3iv(bO,bP);break;case"1fv":a5.uniform1fv(bO,bP);break;
case"2fv":a5.uniform2fv(bO,bP);break;case"3fv":a5.uniform3fv(bO,bP);break;case"4fv":a5.uniform4fv(bO,bP);
break;case"Matrix3fv":a5.uniformMatrix3fv(bO,false,bP);break;case"Matrix4fv":a5.uniformMatrix4fv(bO,false,bP);
break;case"i":a5.uniform1i(bO,bP);break;case"f":a5.uniform1f(bO,bP);break;case"v2":a5.uniform2f(bO,bP.x,bP.y);
break;case"v3":a5.uniform3f(bO,bP.x,bP.y,bP.z);break;case"v4":a5.uniform4f(bO,bP.x,bP.y,bP.z,bP.w);
break;case"c":a5.uniform3f(bO,bP.r,bP.g,bP.b);break;case"iv1":a5.uniform1iv(bO,bP);
break;case"iv":a5.uniform3iv(bO,bP);break;case"fv1":a5.uniform1fv(bO,bP);break;
case"fv":a5.uniform3fv(bO,bP);break;case"v2v":if(bG._array===undefined){bG._array=new Float32Array(2*bP.length)
}for(var bJ=0,bN=bP.length;bJ<bN;bJ++){bH=bJ*2;bG._array[bH]=bP[bJ].x;bG._array[bH+1]=bP[bJ].y
}a5.uniform2fv(bO,bG._array);break;case"v3v":if(bG._array===undefined){bG._array=new Float32Array(3*bP.length)
}for(var bJ=0,bN=bP.length;bJ<bN;bJ++){bH=bJ*3;bG._array[bH]=bP[bJ].x;bG._array[bH+1]=bP[bJ].y;
bG._array[bH+2]=bP[bJ].z}a5.uniform3fv(bO,bG._array);break;case"v4v":if(bG._array===undefined){bG._array=new Float32Array(4*bP.length)
}for(var bJ=0,bN=bP.length;bJ<bN;bJ++){bH=bJ*4;bG._array[bH]=bP[bJ].x;bG._array[bH+1]=bP[bJ].y;
bG._array[bH+2]=bP[bJ].z;bG._array[bH+3]=bP[bJ].w}a5.uniform4fv(bO,bG._array);break;
case"m3":a5.uniformMatrix3fv(bO,false,bP.elements);break;case"m3v":if(bG._array===undefined){bG._array=new Float32Array(9*bP.length)
}for(var bJ=0,bN=bP.length;bJ<bN;bJ++){bP[bJ].flattenToArrayOffset(bG._array,bJ*9)
}a5.uniformMatrix3fv(bO,false,bG._array);break;case"m4":a5.uniformMatrix4fv(bO,false,bP.elements);
break;case"m4v":if(bG._array===undefined){bG._array=new Float32Array(16*bP.length)
}for(var bJ=0,bN=bP.length;bJ<bN;bJ++){bP[bJ].flattenToArrayOffset(bG._array,bJ*16)
}a5.uniformMatrix4fv(bO,false,bG._array);break;case"t":bL=bP;bR=Q();a5.uniform1i(bO,bR);
if(!bL){continue}if(bL instanceof THREE.CubeTexture||(bL.image instanceof Array&&bL.image.length===6)){s(bL,bR)
}else{if(bL instanceof THREE.WebGLRenderTargetCube){bq(bL,bR)}else{R.setTexture(bL,bR)
}}break;case"tv":if(bG._array===undefined){bG._array=[]}for(var bJ=0,bN=bG.value.length;
bJ<bN;bJ++){bG._array[bJ]=Q()}a5.uniform1iv(bO,bG._array);for(var bJ=0,bN=bG.value.length;
bJ<bN;bJ++){bL=bG.value[bJ];bR=bG._array[bJ];if(!bL){continue}R.setTexture(bL,bR)
}break;default:THREE.warn("THREE.WebGLRenderer: Unknown uniform type: "+bM)}}}function ba(bG,bH){bG._modelViewMatrix.multiplyMatrices(bH.matrixWorldInverse,bG.matrixWorld);
bG._normalMatrix.getNormalMatrix(bG._modelViewMatrix)}function bd(bJ,bI,bH,bG){bJ[bI]=bH.r*bG;
bJ[bI+1]=bH.g*bG;bJ[bI+2]=bH.b*bG}function bj(bK){var ch,b5,bW,b9=0,ci=0,cj=0,b3,bH,bN,b4,bU,b0=E,bS=b0.directional.colors,bI=b0.directional.positions,ce=b0.point.colors,cb=b0.point.positions,b2=b0.point.distances,b7=b0.point.decays,cf=b0.spot.colors,bJ=b0.spot.positions,cc=b0.spot.distances,bR=b0.spot.directions,bL=b0.spot.anglesCos,bT=b0.spot.exponents,b8=b0.spot.decays,bG=b0.hemi.skyColors,cg=b0.hemi.groundColors,bQ=b0.hemi.positions,ck=0,bY=0,bV=0,bO=0,b1=0,bZ=0,bX=0,bM=0,bP=0,cd=0,ca=0,b6=0;
for(ch=0,b5=bK.length;ch<b5;ch++){bW=bK[ch];if(bW.onlyShadow){continue}b3=bW.color;
b4=bW.intensity;bU=bW.distance;if(bW instanceof THREE.AmbientLight){if(!bW.visible){continue
}b9+=b3.r;ci+=b3.g;cj+=b3.b}else{if(bW instanceof THREE.DirectionalLight){b1+=1;
if(!bW.visible){continue}l.setFromMatrixPosition(bW.matrixWorld);D.setFromMatrixPosition(bW.target.matrixWorld);
l.sub(D);l.normalize();bP=ck*3;bI[bP]=l.x;bI[bP+1]=l.y;bI[bP+2]=l.z;bd(bS,bP,b3,b4);
ck+=1}else{if(bW instanceof THREE.PointLight){bZ+=1;if(!bW.visible){continue}cd=bY*3;
bd(ce,cd,b3,b4);D.setFromMatrixPosition(bW.matrixWorld);cb[cd]=D.x;cb[cd+1]=D.y;
cb[cd+2]=D.z;b2[bY]=bU;b7[bY]=(bW.distance===0)?0:bW.decay;bY+=1}else{if(bW instanceof THREE.SpotLight){bX+=1;
if(!bW.visible){continue}ca=bV*3;bd(cf,ca,b3,b4);l.setFromMatrixPosition(bW.matrixWorld);
bJ[ca]=l.x;bJ[ca+1]=l.y;bJ[ca+2]=l.z;cc[bV]=bU;D.setFromMatrixPosition(bW.target.matrixWorld);
l.sub(D);l.normalize();bR[ca]=l.x;bR[ca+1]=l.y;bR[ca+2]=l.z;bL[bV]=Math.cos(bW.angle);
bT[bV]=bW.exponent;b8[bV]=(bW.distance===0)?0:bW.decay;bV+=1}else{if(bW instanceof THREE.HemisphereLight){bM+=1;
if(!bW.visible){continue}l.setFromMatrixPosition(bW.matrixWorld);l.normalize();
b6=bO*3;bQ[b6]=l.x;bQ[b6+1]=l.y;bQ[b6+2]=l.z;bH=bW.color;bN=bW.groundColor;bd(bG,b6,bH,b4);
bd(cg,b6,bN,b4);bO+=1}}}}}}for(ch=ck*3,b5=Math.max(bS.length,b1*3);ch<b5;ch++){bS[ch]=0
}for(ch=bY*3,b5=Math.max(ce.length,bZ*3);ch<b5;ch++){ce[ch]=0}for(ch=bV*3,b5=Math.max(cf.length,bX*3);
ch<b5;ch++){cf[ch]=0}for(ch=bO*3,b5=Math.max(bG.length,bM*3);ch<b5;ch++){bG[ch]=0
}for(ch=bO*3,b5=Math.max(cg.length,bM*3);ch<b5;ch++){cg[ch]=0}b0.directional.length=ck;
b0.point.length=bY;b0.spot.length=bV;b0.hemi.length=bO;b0.ambient[0]=b9;b0.ambient[1]=ci;
b0.ambient[2]=cj}this.setFaceCulling=function(bH,bG){if(bH===THREE.CullFaceNone){a5.disable(a5.CULL_FACE)
}else{if(bG===THREE.FrontFaceDirectionCW){a5.frontFace(a5.CW)}else{a5.frontFace(a5.CCW)
}if(bH===THREE.CullFaceBack){a5.cullFace(a5.BACK)}else{if(bH===THREE.CullFaceFront){a5.cullFace(a5.FRONT)
}else{a5.cullFace(a5.FRONT_AND_BACK)}}a5.enable(a5.CULL_FACE)}};this.setMaterialFaces=function(bG){by.setDoubleSided(bG.side===THREE.DoubleSide);
by.setFlipSided(bG.side===THREE.BackSide)};function ae(bG,bH,bI){var bJ;if(bI){a5.texParameteri(bG,a5.TEXTURE_WRAP_S,aC(bH.wrapS));
a5.texParameteri(bG,a5.TEXTURE_WRAP_T,aC(bH.wrapT));a5.texParameteri(bG,a5.TEXTURE_MAG_FILTER,aC(bH.magFilter));
a5.texParameteri(bG,a5.TEXTURE_MIN_FILTER,aC(bH.minFilter))}else{a5.texParameteri(bG,a5.TEXTURE_WRAP_S,a5.CLAMP_TO_EDGE);
a5.texParameteri(bG,a5.TEXTURE_WRAP_T,a5.CLAMP_TO_EDGE);if(bH.wrapS!==THREE.ClampToEdgeWrapping||bH.wrapT!==THREE.ClampToEdgeWrapping){THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( "+bH.sourceFile+" )")
}a5.texParameteri(bG,a5.TEXTURE_MAG_FILTER,aD(bH.magFilter));a5.texParameteri(bG,a5.TEXTURE_MIN_FILTER,aD(bH.minFilter));
if(bH.minFilter!==THREE.NearestFilter&&bH.minFilter!==THREE.LinearFilter){THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( "+bH.sourceFile+" )")
}}bJ=d.get("EXT_texture_filter_anisotropic");if(bJ&&bH.type!==THREE.FloatType&&bH.type!==THREE.HalfFloatType){if(bH.anisotropy>1||bH.__currentAnisotropy){a5.texParameterf(bG,bJ.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(bH.anisotropy,R.getMaxAnisotropy()));
bH.__currentAnisotropy=bH.anisotropy}}}this.uploadTexture=function(bN){if(bN.__webglInit===undefined){bN.__webglInit=true;
bN.addEventListener("dispose",ah);bN.__webglTexture=a5.createTexture();R.info.memory.textures++
}a5.bindTexture(a5.TEXTURE_2D,bN.__webglTexture);a5.pixelStorei(a5.UNPACK_FLIP_Y_WEBGL,bN.flipY);
a5.pixelStorei(a5.UNPACK_PREMULTIPLY_ALPHA_WEBGL,bN.premultiplyAlpha);a5.pixelStorei(a5.UNPACK_ALIGNMENT,bN.unpackAlignment);
bN.image=G(bN.image,ak);var bJ=bN.image,bM=THREE.Math.isPowerOfTwo(bJ.width)&&THREE.Math.isPowerOfTwo(bJ.height),bG=aC(bN.format),bI=aC(bN.type);
ae(a5.TEXTURE_2D,bN,bM);var bH,bK=bN.mipmaps;if(bN instanceof THREE.DataTexture){if(bK.length>0&&bM){for(var bL=0,bO=bK.length;
bL<bO;bL++){bH=bK[bL];a5.texImage2D(a5.TEXTURE_2D,bL,bG,bH.width,bH.height,0,bG,bI,bH.data)
}bN.generateMipmaps=false}else{a5.texImage2D(a5.TEXTURE_2D,0,bG,bJ.width,bJ.height,0,bG,bI,bJ.data)
}}else{if(bN instanceof THREE.CompressedTexture){for(var bL=0,bO=bK.length;bL<bO;
bL++){bH=bK[bL];if(bN.format!==THREE.RGBAFormat&&bN.format!==THREE.RGBFormat){if(aa().indexOf(bG)>-1){a5.compressedTexImage2D(a5.TEXTURE_2D,bL,bG,bH.width,bH.height,0,bH.data)
}else{THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
}}else{a5.texImage2D(a5.TEXTURE_2D,bL,bG,bH.width,bH.height,0,bG,bI,bH.data)}}}else{if(bK.length>0&&bM){for(var bL=0,bO=bK.length;
bL<bO;bL++){bH=bK[bL];a5.texImage2D(a5.TEXTURE_2D,bL,bG,bG,bI,bH)}bN.generateMipmaps=false
}else{a5.texImage2D(a5.TEXTURE_2D,0,bG,bG,bI,bN.image)}}}if(bN.generateMipmaps&&bM){a5.generateMipmap(a5.TEXTURE_2D)
}bN.needsUpdate=false;if(bN.onUpdate){bN.onUpdate()}};this.setTexture=function(bG,bH){a5.activeTexture(a5.TEXTURE0+bH);
if(bG.needsUpdate){R.uploadTexture(bG)}else{a5.bindTexture(a5.TEXTURE_2D,bG.__webglTexture)
}};function G(bI,bK){if(bI.width>bK||bI.height>bK){var bJ=bK/Math.max(bI.width,bI.height);
var bG=document.createElement("canvas");bG.width=Math.floor(bI.width*bJ);bG.height=Math.floor(bI.height*bJ);
var bH=bG.getContext("2d");bH.drawImage(bI,0,0,bI.width,bI.height,0,0,bG.width,bG.height);
THREE.warn("THREE.WebGLRenderer: image is too big ("+bI.width+"x"+bI.height+"). Resized to "+bG.width+"x"+bG.height,bI);
return bG}return bI}function s(bS,bT){if(bS.image.length===6){if(bS.needsUpdate){if(!bS.image.__webglTextureCube){bS.addEventListener("dispose",ah);
bS.image.__webglTextureCube=a5.createTexture();R.info.memory.textures++}a5.activeTexture(a5.TEXTURE0+bT);
a5.bindTexture(a5.TEXTURE_CUBE_MAP,bS.image.__webglTextureCube);a5.pixelStorei(a5.UNPACK_FLIP_Y_WEBGL,bS.flipY);
var bK=bS instanceof THREE.CompressedTexture;var bJ=bS.image[0] instanceof THREE.DataTexture;
var bG=[];for(var bQ=0;bQ<6;bQ++){if(R.autoScaleCubemaps&&!bK&&!bJ){bG[bQ]=G(bS.image[bQ],ax)
}else{bG[bQ]=bJ?bS.image[bQ].image:bS.image[bQ]}}var bN=bG[0],bR=THREE.Math.isPowerOfTwo(bN.width)&&THREE.Math.isPowerOfTwo(bN.height),bH=aC(bS.format),bL=aC(bS.type);
ae(a5.TEXTURE_CUBE_MAP,bS,bR);for(var bQ=0;bQ<6;bQ++){if(!bK){if(bJ){a5.texImage2D(a5.TEXTURE_CUBE_MAP_POSITIVE_X+bQ,0,bH,bG[bQ].width,bG[bQ].height,0,bH,bL,bG[bQ].data)
}else{a5.texImage2D(a5.TEXTURE_CUBE_MAP_POSITIVE_X+bQ,0,bH,bH,bL,bG[bQ])}}else{var bI,bM=bG[bQ].mipmaps;
for(var bO=0,bP=bM.length;bO<bP;bO++){bI=bM[bO];if(bS.format!==THREE.RGBAFormat&&bS.format!==THREE.RGBFormat){if(aa().indexOf(bH)>-1){a5.compressedTexImage2D(a5.TEXTURE_CUBE_MAP_POSITIVE_X+bQ,bO,bH,bI.width,bI.height,0,bI.data)
}else{THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()")
}}else{a5.texImage2D(a5.TEXTURE_CUBE_MAP_POSITIVE_X+bQ,bO,bH,bI.width,bI.height,0,bH,bL,bI.data)
}}}}if(bS.generateMipmaps&&bR){a5.generateMipmap(a5.TEXTURE_CUBE_MAP)}bS.needsUpdate=false;
if(bS.onUpdate){bS.onUpdate()}}else{a5.activeTexture(a5.TEXTURE0+bT);a5.bindTexture(a5.TEXTURE_CUBE_MAP,bS.image.__webglTextureCube)
}}}function bq(bG,bH){a5.activeTexture(a5.TEXTURE0+bH);a5.bindTexture(a5.TEXTURE_CUBE_MAP,bG.__webglTexture)
}function r(bI,bH,bG){a5.bindFramebuffer(a5.FRAMEBUFFER,bI);a5.framebufferTexture2D(a5.FRAMEBUFFER,a5.COLOR_ATTACHMENT0,bG,bH.__webglTexture,0)
}function A(bG,bH){a5.bindRenderbuffer(a5.RENDERBUFFER,bG);if(bH.depthBuffer&&!bH.stencilBuffer){a5.renderbufferStorage(a5.RENDERBUFFER,a5.DEPTH_COMPONENT16,bH.width,bH.height);
a5.framebufferRenderbuffer(a5.FRAMEBUFFER,a5.DEPTH_ATTACHMENT,a5.RENDERBUFFER,bG)
}else{if(bH.depthBuffer&&bH.stencilBuffer){a5.renderbufferStorage(a5.RENDERBUFFER,a5.DEPTH_STENCIL,bH.width,bH.height);
a5.framebufferRenderbuffer(a5.FRAMEBUFFER,a5.DEPTH_STENCIL_ATTACHMENT,a5.RENDERBUFFER,bG)
}else{a5.renderbufferStorage(a5.RENDERBUFFER,a5.RGBA4,bH.width,bH.height)}}}this.setRenderTarget=function(bK){var bM=(bK instanceof THREE.WebGLRenderTargetCube);
if(bK&&bK.__webglFramebuffer===undefined){if(bK.depthBuffer===undefined){bK.depthBuffer=true
}if(bK.stencilBuffer===undefined){bK.stencilBuffer=true}bK.addEventListener("dispose",br);
bK.__webglTexture=a5.createTexture();R.info.memory.textures++;var bN=THREE.Math.isPowerOfTwo(bK.width)&&THREE.Math.isPowerOfTwo(bK.height),bG=aC(bK.format),bI=aC(bK.type);
if(bM){bK.__webglFramebuffer=[];bK.__webglRenderbuffer=[];a5.bindTexture(a5.TEXTURE_CUBE_MAP,bK.__webglTexture);
ae(a5.TEXTURE_CUBE_MAP,bK,bN);for(var bJ=0;bJ<6;bJ++){bK.__webglFramebuffer[bJ]=a5.createFramebuffer();
bK.__webglRenderbuffer[bJ]=a5.createRenderbuffer();a5.texImage2D(a5.TEXTURE_CUBE_MAP_POSITIVE_X+bJ,0,bG,bK.width,bK.height,0,bG,bI,null);
r(bK.__webglFramebuffer[bJ],bK,a5.TEXTURE_CUBE_MAP_POSITIVE_X+bJ);A(bK.__webglRenderbuffer[bJ],bK)
}if(bN){a5.generateMipmap(a5.TEXTURE_CUBE_MAP)}}else{bK.__webglFramebuffer=a5.createFramebuffer();
if(bK.shareDepthFrom){bK.__webglRenderbuffer=bK.shareDepthFrom.__webglRenderbuffer
}else{bK.__webglRenderbuffer=a5.createRenderbuffer()}a5.bindTexture(a5.TEXTURE_2D,bK.__webglTexture);
ae(a5.TEXTURE_2D,bK,bN);a5.texImage2D(a5.TEXTURE_2D,0,bG,bK.width,bK.height,0,bG,bI,null);
r(bK.__webglFramebuffer,bK,a5.TEXTURE_2D);if(bK.shareDepthFrom){if(bK.depthBuffer&&!bK.stencilBuffer){a5.framebufferRenderbuffer(a5.FRAMEBUFFER,a5.DEPTH_ATTACHMENT,a5.RENDERBUFFER,bK.__webglRenderbuffer)
}else{if(bK.depthBuffer&&bK.stencilBuffer){a5.framebufferRenderbuffer(a5.FRAMEBUFFER,a5.DEPTH_STENCIL_ATTACHMENT,a5.RENDERBUFFER,bK.__webglRenderbuffer)
}}}else{A(bK.__webglRenderbuffer,bK)}if(bN){a5.generateMipmap(a5.TEXTURE_2D)}}if(bM){a5.bindTexture(a5.TEXTURE_CUBE_MAP,null)
}else{a5.bindTexture(a5.TEXTURE_2D,null)}a5.bindRenderbuffer(a5.RENDERBUFFER,null);
a5.bindFramebuffer(a5.FRAMEBUFFER,null)}var bP,bH,bQ,bO,bL;if(bK){if(bM){bP=bK.__webglFramebuffer[bK.activeCubeFace]
}else{bP=bK.__webglFramebuffer}bH=bK.width;bQ=bK.height;bO=0;bL=0}else{bP=null;
bH=bh;bQ=U;bO=e;bL=c}if(bP!==bo){a5.bindFramebuffer(a5.FRAMEBUFFER,bP);a5.viewport(bO,bL,bH,bQ);
bo=bP}af=bH;aM=bQ};this.readRenderTargetPixels=function(bL,bH,bM,bK,bG,bI){if(!(bL instanceof THREE.WebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
return}if(bL.__webglFramebuffer){if(bL.format!==THREE.RGBAFormat){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
return}var bJ=false;if(bL.__webglFramebuffer!==bo){a5.bindFramebuffer(a5.FRAMEBUFFER,bL.__webglFramebuffer);
bJ=true}if(a5.checkFramebufferStatus(a5.FRAMEBUFFER)===a5.FRAMEBUFFER_COMPLETE){a5.readPixels(bH,bM,bK,bG,a5.RGBA,a5.UNSIGNED_BYTE,bI)
}else{console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
}if(bJ){a5.bindFramebuffer(a5.FRAMEBUFFER,bo)}}};function g(bG){if(bG instanceof THREE.WebGLRenderTargetCube){a5.bindTexture(a5.TEXTURE_CUBE_MAP,bG.__webglTexture);
a5.generateMipmap(a5.TEXTURE_CUBE_MAP);a5.bindTexture(a5.TEXTURE_CUBE_MAP,null)
}else{a5.bindTexture(a5.TEXTURE_2D,bG.__webglTexture);a5.generateMipmap(a5.TEXTURE_2D);
a5.bindTexture(a5.TEXTURE_2D,null)}}function aD(bG){if(bG===THREE.NearestFilter||bG===THREE.NearestMipMapNearestFilter||bG===THREE.NearestMipMapLinearFilter){return a5.NEAREST
}return a5.LINEAR}function aC(bG){var bH;if(bG===THREE.RepeatWrapping){return a5.REPEAT
}if(bG===THREE.ClampToEdgeWrapping){return a5.CLAMP_TO_EDGE}if(bG===THREE.MirroredRepeatWrapping){return a5.MIRRORED_REPEAT
}if(bG===THREE.NearestFilter){return a5.NEAREST}if(bG===THREE.NearestMipMapNearestFilter){return a5.NEAREST_MIPMAP_NEAREST
}if(bG===THREE.NearestMipMapLinearFilter){return a5.NEAREST_MIPMAP_LINEAR}if(bG===THREE.LinearFilter){return a5.LINEAR
}if(bG===THREE.LinearMipMapNearestFilter){return a5.LINEAR_MIPMAP_NEAREST}if(bG===THREE.LinearMipMapLinearFilter){return a5.LINEAR_MIPMAP_LINEAR
}if(bG===THREE.UnsignedByteType){return a5.UNSIGNED_BYTE}if(bG===THREE.UnsignedShort4444Type){return a5.UNSIGNED_SHORT_4_4_4_4
}if(bG===THREE.UnsignedShort5551Type){return a5.UNSIGNED_SHORT_5_5_5_1}if(bG===THREE.UnsignedShort565Type){return a5.UNSIGNED_SHORT_5_6_5
}if(bG===THREE.ByteType){return a5.BYTE}if(bG===THREE.ShortType){return a5.SHORT
}if(bG===THREE.UnsignedShortType){return a5.UNSIGNED_SHORT}if(bG===THREE.IntType){return a5.INT
}if(bG===THREE.UnsignedIntType){return a5.UNSIGNED_INT}if(bG===THREE.FloatType){return a5.FLOAT
}bH=d.get("OES_texture_half_float");if(bH!==null){if(bG===THREE.HalfFloatType){return bH.HALF_FLOAT_OES
}}if(bG===THREE.AlphaFormat){return a5.ALPHA}if(bG===THREE.RGBFormat){return a5.RGB
}if(bG===THREE.RGBAFormat){return a5.RGBA}if(bG===THREE.LuminanceFormat){return a5.LUMINANCE
}if(bG===THREE.LuminanceAlphaFormat){return a5.LUMINANCE_ALPHA}if(bG===THREE.AddEquation){return a5.FUNC_ADD
}if(bG===THREE.SubtractEquation){return a5.FUNC_SUBTRACT}if(bG===THREE.ReverseSubtractEquation){return a5.FUNC_REVERSE_SUBTRACT
}if(bG===THREE.ZeroFactor){return a5.ZERO}if(bG===THREE.OneFactor){return a5.ONE
}if(bG===THREE.SrcColorFactor){return a5.SRC_COLOR}if(bG===THREE.OneMinusSrcColorFactor){return a5.ONE_MINUS_SRC_COLOR
}if(bG===THREE.SrcAlphaFactor){return a5.SRC_ALPHA}if(bG===THREE.OneMinusSrcAlphaFactor){return a5.ONE_MINUS_SRC_ALPHA
}if(bG===THREE.DstAlphaFactor){return a5.DST_ALPHA}if(bG===THREE.OneMinusDstAlphaFactor){return a5.ONE_MINUS_DST_ALPHA
}if(bG===THREE.DstColorFactor){return a5.DST_COLOR}if(bG===THREE.OneMinusDstColorFactor){return a5.ONE_MINUS_DST_COLOR
}if(bG===THREE.SrcAlphaSaturateFactor){return a5.SRC_ALPHA_SATURATE}bH=d.get("WEBGL_compressed_texture_s3tc");
if(bH!==null){if(bG===THREE.RGB_S3TC_DXT1_Format){return bH.COMPRESSED_RGB_S3TC_DXT1_EXT
}if(bG===THREE.RGBA_S3TC_DXT1_Format){return bH.COMPRESSED_RGBA_S3TC_DXT1_EXT}if(bG===THREE.RGBA_S3TC_DXT3_Format){return bH.COMPRESSED_RGBA_S3TC_DXT3_EXT
}if(bG===THREE.RGBA_S3TC_DXT5_Format){return bH.COMPRESSED_RGBA_S3TC_DXT5_EXT}}bH=d.get("WEBGL_compressed_texture_pvrtc");
if(bH!==null){if(bG===THREE.RGB_PVRTC_4BPPV1_Format){return bH.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
}if(bG===THREE.RGB_PVRTC_2BPPV1_Format){return bH.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
}if(bG===THREE.RGBA_PVRTC_4BPPV1_Format){return bH.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
}if(bG===THREE.RGBA_PVRTC_2BPPV1_Format){return bH.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
}}bH=d.get("EXT_blend_minmax");if(bH!==null){if(bG===THREE.MinEquation){return bH.MIN_EXT
}if(bG===THREE.MaxEquation){return bH.MAX_EXT}}return 0}function f(bJ){if(a9&&bJ&&bJ.skeleton&&bJ.skeleton.useVertexTexture){return 1024
}else{var bH=a5.getParameter(a5.MAX_VERTEX_UNIFORM_VECTORS);var bI=Math.floor((bH-20)/4);
var bG=bI;if(bJ!==undefined&&bJ instanceof THREE.SkinnedMesh){bG=Math.min(bJ.skeleton.bones.length,bG);
if(bG<bJ.skeleton.bones.length){THREE.warn("WebGLRenderer: too many bones - "+bJ.skeleton.bones.length+", this GPU supports just "+bG+" (try OpenGL instead of ANGLE)")
}}return bG}}function F(bI){var bJ=0;var bN=0;var bL=0;var bM=0;for(var bH=0,bK=bI.length;
bH<bK;bH++){var bG=bI[bH];if(bG.onlyShadow||bG.visible===false){continue}if(bG instanceof THREE.DirectionalLight){bJ++
}if(bG instanceof THREE.PointLight){bN++}if(bG instanceof THREE.SpotLight){bL++
}if(bG instanceof THREE.HemisphereLight){bM++}}return{directional:bJ,point:bN,spot:bL,hemi:bM}
}function bv(bI){var bJ=0;for(var bH=0,bK=bI.length;bH<bK;bH++){var bG=bI[bH];if(!bG.castShadow){continue
}if(bG instanceof THREE.SpotLight){bJ++}if(bG instanceof THREE.DirectionalLight&&!bG.shadowCascade){bJ++
}}return bJ}this.initMaterial=function(){THREE.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
};this.addPrePlugin=function(){THREE.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
};this.addPostPlugin=function(){THREE.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
};this.updateShadowMap=function(){THREE.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
}};THREE.WebGLRenderTarget=function(c,a,b){this.width=c;this.height=a;b=b||{};this.wrapS=b.wrapS!==undefined?b.wrapS:THREE.ClampToEdgeWrapping;
this.wrapT=b.wrapT!==undefined?b.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=b.magFilter!==undefined?b.magFilter:THREE.LinearFilter;
this.minFilter=b.minFilter!==undefined?b.minFilter:THREE.LinearMipMapLinearFilter;
this.anisotropy=b.anisotropy!==undefined?b.anisotropy:1;this.offset=new THREE.Vector2(0,0);
this.repeat=new THREE.Vector2(1,1);this.format=b.format!==undefined?b.format:THREE.RGBAFormat;
this.type=b.type!==undefined?b.type:THREE.UnsignedByteType;this.depthBuffer=b.depthBuffer!==undefined?b.depthBuffer:true;
this.stencilBuffer=b.stencilBuffer!==undefined?b.stencilBuffer:true;this.generateMipmaps=true;
this.shareDepthFrom=b.shareDepthFrom!==undefined?b.shareDepthFrom:null};THREE.WebGLRenderTarget.prototype={constructor:THREE.WebGLRenderTarget,setSize:function(b,a){this.width=b;
this.height=a},clone:function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);
a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;
a.anisotropy=this.anisotropy;a.offset.copy(this.offset);a.repeat.copy(this.repeat);
a.format=this.format;a.type=this.type;a.depthBuffer=this.depthBuffer;a.stencilBuffer=this.stencilBuffer;
a.generateMipmaps=this.generateMipmaps;a.shareDepthFrom=this.shareDepthFrom;return a
},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube=function(c,a,b){THREE.WebGLRenderTarget.call(this,c,a,b);
this.activeCubeFace=0};THREE.WebGLRenderTargetCube.prototype=Object.create(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube.prototype.constructor=THREE.WebGLRenderTargetCube;THREE.WebGLExtensions=function(b){var a={};
this.get=function(c){if(a[c]!==undefined){return a[c]}var d;switch(c){case"EXT_texture_filter_anisotropic":d=b.getExtension("EXT_texture_filter_anisotropic")||b.getExtension("MOZ_EXT_texture_filter_anisotropic")||b.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
break;case"WEBGL_compressed_texture_s3tc":d=b.getExtension("WEBGL_compressed_texture_s3tc")||b.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||b.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
break;case"WEBGL_compressed_texture_pvrtc":d=b.getExtension("WEBGL_compressed_texture_pvrtc")||b.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
break;default:d=b.getExtension(c)}if(d===null){THREE.warn("THREE.WebGLRenderer: "+c+" extension not supported.")
}a[c]=d;return d}};THREE.WebGLProgram=(function(){var b=0;var c=function(f){var g,e,i=[];
for(var h in f){g=f[h];if(g===false){continue}e="#define "+h+" "+g;i.push(e)}return i.join("\n")
};var d=function(k,h,f){var e={};for(var j=0,g=f.length;j<g;j++){var m=f[j];e[m]=k.getUniformLocation(h,m)
}return e};var a=function(k,h,e){var g={};for(var j=0,f=e.length;j<f;j++){var m=e[j];
g[m]=k.getAttribLocation(h,m)}return g};return function(C,f,B,q){var E=C;var r=E.context;
var H=B.defines;var K=B.__webglShader.uniforms;var t=B.attributes;var l=B.__webglShader.vertexShader;
var e=B.__webglShader.fragmentShader;var I=B.index0AttributeName;if(I===undefined&&q.morphTargets===true){I="position"
}var h="SHADOWMAP_TYPE_BASIC";if(q.shadowMapType===THREE.PCFShadowMap){h="SHADOWMAP_TYPE_PCF"
}else{if(q.shadowMapType===THREE.PCFSoftShadowMap){h="SHADOWMAP_TYPE_PCF_SOFT"}}var J="ENVMAP_TYPE_CUBE";
var D="ENVMAP_MODE_REFLECTION";var g="ENVMAP_BLENDING_MULTIPLY";if(q.envMap){switch(B.envMap.mapping){case THREE.CubeReflectionMapping:case THREE.CubeRefractionMapping:J="ENVMAP_TYPE_CUBE";
break;case THREE.EquirectangularReflectionMapping:case THREE.EquirectangularRefractionMapping:J="ENVMAP_TYPE_EQUIREC";
break;case THREE.SphericalReflectionMapping:J="ENVMAP_TYPE_SPHERE";break}switch(B.envMap.mapping){case THREE.CubeRefractionMapping:case THREE.EquirectangularRefractionMapping:D="ENVMAP_MODE_REFRACTION";
break}switch(B.combine){case THREE.MultiplyOperation:g="ENVMAP_BLENDING_MULTIPLY";
break;case THREE.MixOperation:g="ENVMAP_BLENDING_MIX";break;case THREE.AddOperation:g="ENVMAP_BLENDING_ADD";
break}}var o=(C.gammaFactor>0)?C.gammaFactor:1;var k=c(H);var s=r.createProgram();
var j,n;if(B instanceof THREE.RawShaderMaterial){j="";n=""}else{j=["precision "+q.precision+" float;","precision "+q.precision+" int;",k,q.supportsVertexTextures?"#define VERTEX_TEXTURES":"",E.gammaInput?"#define GAMMA_INPUT":"",E.gammaOutput?"#define GAMMA_OUTPUT":"","#define GAMMA_FACTOR "+o,"#define MAX_DIR_LIGHTS "+q.maxDirLights,"#define MAX_POINT_LIGHTS "+q.maxPointLights,"#define MAX_SPOT_LIGHTS "+q.maxSpotLights,"#define MAX_HEMI_LIGHTS "+q.maxHemiLights,"#define MAX_SHADOWS "+q.maxShadows,"#define MAX_BONES "+q.maxBones,q.map?"#define USE_MAP":"",q.envMap?"#define USE_ENVMAP":"",q.envMap?"#define "+D:"",q.lightMap?"#define USE_LIGHTMAP":"",q.bumpMap?"#define USE_BUMPMAP":"",q.normalMap?"#define USE_NORMALMAP":"",q.specularMap?"#define USE_SPECULARMAP":"",q.alphaMap?"#define USE_ALPHAMAP":"",q.vertexColors?"#define USE_COLOR":"",q.flatShading?"#define FLAT_SHADED":"",q.skinning?"#define USE_SKINNING":"",q.useVertexTexture?"#define BONE_TEXTURE":"",q.morphTargets?"#define USE_MORPHTARGETS":"",q.morphNormals?"#define USE_MORPHNORMALS":"",q.wrapAround?"#define WRAP_AROUND":"",q.doubleSided?"#define DOUBLE_SIDED":"",q.flipSided?"#define FLIP_SIDED":"",q.shadowMapEnabled?"#define USE_SHADOWMAP":"",q.shadowMapEnabled?"#define "+h:"",q.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",q.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","attribute vec2 uv2;","#ifdef USE_COLOR","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",""].join("\n");
n=["precision "+q.precision+" float;","precision "+q.precision+" int;",(q.bumpMap||q.normalMap||q.flatShading)?"#extension GL_OES_standard_derivatives : enable":"",k,"#define MAX_DIR_LIGHTS "+q.maxDirLights,"#define MAX_POINT_LIGHTS "+q.maxPointLights,"#define MAX_SPOT_LIGHTS "+q.maxSpotLights,"#define MAX_HEMI_LIGHTS "+q.maxHemiLights,"#define MAX_SHADOWS "+q.maxShadows,q.alphaTest?"#define ALPHATEST "+q.alphaTest:"",E.gammaInput?"#define GAMMA_INPUT":"",E.gammaOutput?"#define GAMMA_OUTPUT":"","#define GAMMA_FACTOR "+o,(q.useFog&&q.fog)?"#define USE_FOG":"",(q.useFog&&q.fogExp)?"#define FOG_EXP2":"",q.map?"#define USE_MAP":"",q.envMap?"#define USE_ENVMAP":"",q.envMap?"#define "+J:"",q.envMap?"#define "+D:"",q.envMap?"#define "+g:"",q.lightMap?"#define USE_LIGHTMAP":"",q.bumpMap?"#define USE_BUMPMAP":"",q.normalMap?"#define USE_NORMALMAP":"",q.specularMap?"#define USE_SPECULARMAP":"",q.alphaMap?"#define USE_ALPHAMAP":"",q.vertexColors?"#define USE_COLOR":"",q.flatShading?"#define FLAT_SHADED":"",q.metal?"#define METAL":"",q.wrapAround?"#define WRAP_AROUND":"",q.doubleSided?"#define DOUBLE_SIDED":"",q.flipSided?"#define FLIP_SIDED":"",q.shadowMapEnabled?"#define USE_SHADOWMAP":"",q.shadowMapEnabled?"#define "+h:"",q.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",q.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",""].join("\n")
}var m=new THREE.WebGLShader(r,r.VERTEX_SHADER,j+l);var F=new THREE.WebGLShader(r,r.FRAGMENT_SHADER,n+e);
r.attachShader(s,m);r.attachShader(s,F);if(I!==undefined){r.bindAttribLocation(s,0,I)
}r.linkProgram(s);var v=r.getProgramInfoLog(s);if(r.getProgramParameter(s,r.LINK_STATUS)===false){THREE.error("THREE.WebGLProgram: shader error: "+r.getError(),"gl.VALIDATE_STATUS",r.getProgramParameter(s,r.VALIDATE_STATUS),"gl.getPRogramInfoLog",v)
}if(v!==""){THREE.warn("THREE.WebGLProgram: gl.getProgramInfoLog()"+v)}r.deleteShader(m);
r.deleteShader(F);var p=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","modelMatrix","cameraPosition","morphTargetInfluences","bindMatrix","bindMatrixInverse"];
if(q.useVertexTexture){p.push("boneTexture");p.push("boneTextureWidth");p.push("boneTextureHeight")
}else{p.push("boneGlobalMatrices")}if(q.logarithmicDepthBuffer){p.push("logDepthBufFC")
}for(var A in K){p.push(A)}this.uniforms=d(r,s,p);p=["position","normal","uv","uv2","tangent","color","skinIndex","skinWeight","lineDistance"];
for(var G=0;G<q.maxMorphTargets;G++){p.push("morphTarget"+G)}for(var G=0;G<q.maxMorphNormals;
G++){p.push("morphNormal"+G)}for(var L in t){p.push(L)}this.attributes=a(r,s,p);
this.attributesKeys=Object.keys(this.attributes);this.id=b++;this.code=f;this.usedTimes=1;
this.program=s;this.vertexShader=m;this.fragmentShader=F;return this}})();THREE.WebGLShader=(function(){var a=function(c){var b=c.split("\n");
for(var d=0;d<b.length;d++){b[d]=(d+1)+": "+b[d]}return b.join("\n")};return function(e,c,b){var d=e.createShader(c);
e.shaderSource(d,b);e.compileShader(d);if(e.getShaderParameter(d,e.COMPILE_STATUS)===false){THREE.error("THREE.WebGLShader: Shader couldn't compile.")
}if(e.getShaderInfoLog(d)!==""){THREE.warn("THREE.WebGLShader: gl.getShaderInfoLog()",e.getShaderInfoLog(d),a(b))
}return d}})();THREE.WebGLState=function(i,o){var s=new Uint8Array(16);var m=new Uint8Array(16);
var t=null;var g=null;var d=null;var p=null;var c=null;var l=null;var r=null;var f=null;
var e=null;var k=null;var a=null;var q=null;var h=null;var n=null;var b=null;var j=null;
this.initAttributes=function(){for(var v=0,u=s.length;v<u;v++){s[v]=0}};this.enableAttribute=function(u){s[u]=1;
if(m[u]===0){i.enableVertexAttribArray(u);m[u]=1}};this.disableUnusedAttributes=function(){for(var v=0,u=m.length;
v<u;v++){if(m[v]!==s[v]){i.disableVertexAttribArray(v);m[v]=0}}};this.setBlending=function(A,v,B,C,E,D,u){if(A!==t){if(A===THREE.NoBlending){i.disable(i.BLEND)
}else{if(A===THREE.AdditiveBlending){i.enable(i.BLEND);i.blendEquation(i.FUNC_ADD);
i.blendFunc(i.SRC_ALPHA,i.ONE)}else{if(A===THREE.SubtractiveBlending){i.enable(i.BLEND);
i.blendEquation(i.FUNC_ADD);i.blendFunc(i.ZERO,i.ONE_MINUS_SRC_COLOR)}else{if(A===THREE.MultiplyBlending){i.enable(i.BLEND);
i.blendEquation(i.FUNC_ADD);i.blendFunc(i.ZERO,i.SRC_COLOR)}else{if(A===THREE.CustomBlending){i.enable(i.BLEND)
}else{i.enable(i.BLEND);i.blendEquationSeparate(i.FUNC_ADD,i.FUNC_ADD);i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA)
}}}}}t=A}if(A===THREE.CustomBlending){E=E||v;D=D||B;u=u||C;if(v!==g||E!==c){i.blendEquationSeparate(o(v),o(E));
g=v;c=E}if(B!==d||C!==p||D!==l||u!==r){i.blendFuncSeparate(o(B),o(C),o(D),o(u));
d=B;p=C;l=D;r=u}}else{g=null;d=null;p=null;c=null;l=null;r=null}};this.setDepthTest=function(u){if(f!==u){if(u){i.enable(i.DEPTH_TEST)
}else{i.disable(i.DEPTH_TEST)}f=u}};this.setDepthWrite=function(u){if(e!==u){i.depthMask(u);
e=u}};this.setColorWrite=function(u){if(k!==u){i.colorMask(u,u,u,u);k=u}};this.setDoubleSided=function(u){if(a!==u){if(u){i.disable(i.CULL_FACE)
}else{i.enable(i.CULL_FACE)}a=u}};this.setFlipSided=function(u){if(q!==u){if(u){i.frontFace(i.CW)
}else{i.frontFace(i.CCW)}q=u}};this.setLineWidth=function(u){if(u!==h){i.lineWidth(u);
h=u}};this.setPolygonOffset=function(A,v,u){if(n!==A){if(A){i.enable(i.POLYGON_OFFSET_FILL)
}else{i.disable(i.POLYGON_OFFSET_FILL)}n=A}if(A&&(b!==v||j!==u)){i.polygonOffset(v,u);
b=v;j=u}};this.reset=function(){for(var u=0;u<m.length;u++){m[u]=0}t=null;f=null;
e=null;k=null;a=null;q=null}};THREE.LensFlarePlugin=function(j,c){var i=j.context;
var k,a;var g,f,l;var h;var d,e;var m=function(){var o=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1]);
var n=new Uint16Array([0,1,2,0,2,3]);k=i.createBuffer();a=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,k);
i.bufferData(i.ARRAY_BUFFER,o,i.STATIC_DRAW);i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,a);
i.bufferData(i.ELEMENT_ARRAY_BUFFER,n,i.STATIC_DRAW);d=i.createTexture();e=i.createTexture();
i.bindTexture(i.TEXTURE_2D,d);i.texImage2D(i.TEXTURE_2D,0,i.RGB,16,16,0,i.RGB,i.UNSIGNED_BYTE,null);
i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);
i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST);
i.bindTexture(i.TEXTURE_2D,e);i.texImage2D(i.TEXTURE_2D,0,i.RGBA,16,16,0,i.RGBA,i.UNSIGNED_BYTE,null);
i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);
i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST);
h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0;var p;if(h){p={vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","uniform sampler2D occlusionMap;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float vVisibility;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );","vVisibility =        visibility.r / 9.0;","vVisibility *= 1.0 - visibility.g / 9.0;","vVisibility *=       visibility.b / 9.0;","vVisibility *= 1.0 - visibility.a / 9.0;","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["uniform lowp int renderType;","uniform sampler2D map;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","varying float vVisibility;","void main() {","if( renderType == 0 ) {","gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );","} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );","} else {","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * vVisibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")}
}else{p={vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["precision mediump float;","uniform lowp int renderType;","uniform sampler2D map;","uniform sampler2D occlusionMap;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","void main() {","if( renderType == 0 ) {","gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );","} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );","} else {","float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;","visibility = ( 1.0 - visibility / 4.0 );","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * visibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")}
}g=b(p);f={vertex:i.getAttribLocation(g,"position"),uv:i.getAttribLocation(g,"uv")};
l={renderType:i.getUniformLocation(g,"renderType"),map:i.getUniformLocation(g,"map"),occlusionMap:i.getUniformLocation(g,"occlusionMap"),opacity:i.getUniformLocation(g,"opacity"),color:i.getUniformLocation(g,"color"),scale:i.getUniformLocation(g,"scale"),rotation:i.getUniformLocation(g,"rotation"),screenPosition:i.getUniformLocation(g,"screenPosition")}
};this.render=function(H,D,A,n){if(c.length===0){return}var F=new THREE.Vector3();
var p=n/A,G=A*0.5,v=n*0.5;var s=16/n,I=new THREE.Vector2(s*p,s);var r=new THREE.Vector3(1,1,0),q=new THREE.Vector2(1,1);
if(g===undefined){m()}i.useProgram(g);i.enableVertexAttribArray(f.vertex);i.enableVertexAttribArray(f.uv);
i.uniform1i(l.occlusionMap,0);i.uniform1i(l.map,1);i.bindBuffer(i.ARRAY_BUFFER,k);
i.vertexAttribPointer(f.vertex,2,i.FLOAT,false,2*8,0);i.vertexAttribPointer(f.uv,2,i.FLOAT,false,2*8,8);
i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,a);i.disable(i.CULL_FACE);i.depthMask(false);
for(var C=0,u=c.length;C<u;C++){s=16/n;I.set(s*p,s);var o=c[C];F.set(o.matrixWorld.elements[12],o.matrixWorld.elements[13],o.matrixWorld.elements[14]);
F.applyMatrix4(D.matrixWorldInverse);F.applyProjection(D.projectionMatrix);r.copy(F);
q.x=r.x*G+G;q.y=r.y*v+v;if(h||(q.x>0&&q.x<A&&q.y>0&&q.y<n)){i.activeTexture(i.TEXTURE1);
i.bindTexture(i.TEXTURE_2D,d);i.copyTexImage2D(i.TEXTURE_2D,0,i.RGB,q.x-8,q.y-8,16,16,0);
i.uniform1i(l.renderType,0);i.uniform2f(l.scale,I.x,I.y);i.uniform3f(l.screenPosition,r.x,r.y,r.z);
i.disable(i.BLEND);i.enable(i.DEPTH_TEST);i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0);
i.activeTexture(i.TEXTURE0);i.bindTexture(i.TEXTURE_2D,e);i.copyTexImage2D(i.TEXTURE_2D,0,i.RGBA,q.x-8,q.y-8,16,16,0);
i.uniform1i(l.renderType,1);i.disable(i.DEPTH_TEST);i.activeTexture(i.TEXTURE1);
i.bindTexture(i.TEXTURE_2D,d);i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0);
o.positionScreen.copy(r);if(o.customUpdateCallback){o.customUpdateCallback(o)}else{o.updateLensFlares()
}i.uniform1i(l.renderType,2);i.enable(i.BLEND);for(var B=0,E=o.lensFlares.length;
B<E;B++){var t=o.lensFlares[B];if(t.opacity>0.001&&t.scale>0.001){r.x=t.x;r.y=t.y;
r.z=t.z;s=t.size*t.scale/n;I.x=s*p;I.y=s;i.uniform3f(l.screenPosition,r.x,r.y,r.z);
i.uniform2f(l.scale,I.x,I.y);i.uniform1f(l.rotation,t.rotation);i.uniform1f(l.opacity,t.opacity);
i.uniform3f(l.color,t.color.r,t.color.g,t.color.b);j.state.setBlending(t.blending,t.blendEquation,t.blendSrc,t.blendDst);
j.setTexture(t.texture,1);i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0)}}}}i.enable(i.CULL_FACE);
i.enable(i.DEPTH_TEST);i.depthMask(true);j.resetGLState()};function b(p){var o=i.createProgram();
var n=i.createShader(i.FRAGMENT_SHADER);var r=i.createShader(i.VERTEX_SHADER);var q="precision "+j.getPrecision()+" float;\n";
i.shaderSource(n,q+p.fragmentShader);i.shaderSource(r,q+p.vertexShader);i.compileShader(n);
i.compileShader(r);i.attachShader(o,n);i.attachShader(o,r);i.linkProgram(o);return o
}};THREE.ShadowMapPlugin=function(q,e,r,h){var f=q.context;var m,u,a,c,p=new THREE.Frustum(),b=new THREE.Matrix4(),o=new THREE.Vector3(),s=new THREE.Vector3(),g=new THREE.Vector3(),n=[];
var j=THREE.ShaderLib.depthRGBA;var t=THREE.UniformsUtils.clone(j.uniforms);m=new THREE.ShaderMaterial({uniforms:t,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader});
u=new THREE.ShaderMaterial({uniforms:t,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,morphTargets:true});
a=new THREE.ShaderMaterial({uniforms:t,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,skinning:true});
c=new THREE.ShaderMaterial({uniforms:t,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,morphTargets:true,skinning:true});
m._shadowPass=true;u._shadowPass=true;a._shadowPass=true;c._shadowPass=true;this.render=function(W,U){if(q.shadowMapEnabled===false){return
}var T,I,S,V,N,E,X,Z,Q,K,B,aa,G,Y=[],R=0,A=null;f.clearColor(1,1,1,1);f.disable(f.BLEND);
f.enable(f.CULL_FACE);f.frontFace(f.CCW);if(q.shadowMapCullFace===THREE.CullFaceFront){f.cullFace(f.FRONT)
}else{f.cullFace(f.BACK)}q.state.setDepthTest(true);for(T=0,I=e.length;T<I;T++){G=e[T];
if(!G.castShadow){continue}if((G instanceof THREE.DirectionalLight)&&G.shadowCascade){for(N=0;
N<G.shadowCascadeCount;N++){var F;if(!G.shadowCascadeArray[N]){F=l(G,N);F.originalCamera=U;
var P=new THREE.Gyroscope();P.position.copy(G.shadowCascadeOffset);P.add(F);P.add(F.target);
U.add(P);G.shadowCascadeArray[N]=F}else{F=G.shadowCascadeArray[N]}v(G,N);Y[R]=F;
R++}}else{Y[R]=G;R++}}for(T=0,I=Y.length;T<I;T++){G=Y[T];if(!G.shadowMap){var M=THREE.LinearFilter;
if(q.shadowMapType===THREE.PCFSoftShadowMap){M=THREE.NearestFilter}var O={minFilter:M,magFilter:M,format:THREE.RGBAFormat};
G.shadowMap=new THREE.WebGLRenderTarget(G.shadowMapWidth,G.shadowMapHeight,O);G.shadowMapSize=new THREE.Vector2(G.shadowMapWidth,G.shadowMapHeight);
G.shadowMatrix=new THREE.Matrix4()}if(!G.shadowCamera){if(G instanceof THREE.SpotLight){G.shadowCamera=new THREE.PerspectiveCamera(G.shadowCameraFov,G.shadowMapWidth/G.shadowMapHeight,G.shadowCameraNear,G.shadowCameraFar)
}else{if(G instanceof THREE.DirectionalLight){G.shadowCamera=new THREE.OrthographicCamera(G.shadowCameraLeft,G.shadowCameraRight,G.shadowCameraTop,G.shadowCameraBottom,G.shadowCameraNear,G.shadowCameraFar)
}else{THREE.error("THREE.ShadowMapPlugin: Unsupported light type for shadow",G);
continue}}W.add(G.shadowCamera);if(W.autoUpdate===true){W.updateMatrixWorld()}}if(G.shadowCameraVisible&&!G.cameraHelper){G.cameraHelper=new THREE.CameraHelper(G.shadowCamera);
W.add(G.cameraHelper)}if(G.isVirtual&&F.originalCamera==U){d(U,G)}E=G.shadowMap;
X=G.shadowMatrix;Z=G.shadowCamera;Z.position.setFromMatrixPosition(G.matrixWorld);
g.setFromMatrixPosition(G.target.matrixWorld);Z.lookAt(g);Z.updateMatrixWorld();
Z.matrixWorldInverse.getInverse(Z.matrixWorld);if(G.cameraHelper){G.cameraHelper.visible=G.shadowCameraVisible
}if(G.shadowCameraVisible){G.cameraHelper.update()}X.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);
X.multiply(Z.projectionMatrix);X.multiply(Z.matrixWorldInverse);b.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse);
p.setFromMatrix(b);q.setRenderTarget(E);q.clear();n.length=0;i(W,W,Z);var D,H,J;
for(S=0,V=n.length;S<V;S++){B=n[S];aa=B.object;Q=B.buffer;D=k(aa);H=aa.geometry.morphTargets!==undefined&&aa.geometry.morphTargets.length>0&&D.morphTargets;
J=aa instanceof THREE.SkinnedMesh&&D.skinning;if(aa.customDepthMaterial){K=aa.customDepthMaterial
}else{if(J){K=H?c:a}else{if(H){K=u}else{K=m}}}q.setMaterialFaces(D);if(Q instanceof THREE.BufferGeometry){q.renderBufferDirect(Z,e,A,K,Q,aa)
}else{q.renderBuffer(Z,e,A,K,Q,aa)}}for(S=0,V=h.length;S<V;S++){B=h[S];aa=B.object;
if(aa.visible&&aa.castShadow){aa._modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,aa.matrixWorld);
q.renderImmediateObject(Z,e,A,m,aa)}}}var C=q.getClearColor(),L=q.getClearAlpha();
f.clearColor(C.r,C.g,C.b,L);f.enable(f.BLEND);if(q.shadowMapCullFace===THREE.CullFaceFront){f.cullFace(f.BACK)
}q.resetGLState()};function i(F,B,E){if(B.visible){var D=r[B.id];if(D&&B.castShadow&&(B.frustumCulled===false||p.intersectsObject(B)===true)){for(var C=0,A=D.length;
C<A;C++){var G=D[C];B._modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,B.matrixWorld);
n.push(G)}}for(var C=0,A=B.children.length;C<A;C++){i(F,B.children[C],E)}}}function l(B,D){var A=new THREE.DirectionalLight();
A.isVirtual=true;A.onlyShadow=true;A.castShadow=true;A.shadowCameraNear=B.shadowCameraNear;
A.shadowCameraFar=B.shadowCameraFar;A.shadowCameraLeft=B.shadowCameraLeft;A.shadowCameraRight=B.shadowCameraRight;
A.shadowCameraBottom=B.shadowCameraBottom;A.shadowCameraTop=B.shadowCameraTop;A.shadowCameraVisible=B.shadowCameraVisible;
A.shadowDarkness=B.shadowDarkness;A.shadowBias=B.shadowCascadeBias[D];A.shadowMapWidth=B.shadowCascadeWidth[D];
A.shadowMapHeight=B.shadowCascadeHeight[D];A.pointsWorld=[];A.pointsFrustum=[];
var G=A.pointsWorld,C=A.pointsFrustum;for(var F=0;F<8;F++){G[F]=new THREE.Vector3();
C[F]=new THREE.Vector3()}var H=B.shadowCascadeNearZ[D];var E=B.shadowCascadeFarZ[D];
C[0].set(-1,-1,H);C[1].set(1,-1,H);C[2].set(-1,1,H);C[3].set(1,1,H);C[4].set(-1,-1,E);
C[5].set(1,-1,E);C[6].set(-1,1,E);C[7].set(1,1,E);return A}function v(B,D){var A=B.shadowCascadeArray[D];
A.position.copy(B.position);A.target.position.copy(B.target.position);A.lookAt(A.target);
A.shadowCameraVisible=B.shadowCameraVisible;A.shadowDarkness=B.shadowDarkness;A.shadowBias=B.shadowCascadeBias[D];
var F=B.shadowCascadeNearZ[D];var E=B.shadowCascadeFarZ[D];var C=A.pointsFrustum;
C[0].z=F;C[1].z=F;C[2].z=F;C[3].z=F;C[4].z=E;C[5].z=E;C[6].z=E;C[7].z=E}function d(D,A){var F=A.shadowCamera,B=A.pointsFrustum,E=A.pointsWorld;
o.set(Infinity,Infinity,Infinity);s.set(-Infinity,-Infinity,-Infinity);for(var C=0;
C<8;C++){var G=E[C];G.copy(B[C]);G.unproject(D);G.applyMatrix4(F.matrixWorldInverse);
if(G.x<o.x){o.x=G.x}if(G.x>s.x){s.x=G.x}if(G.y<o.y){o.y=G.y}if(G.y>s.y){s.y=G.y
}if(G.z<o.z){o.z=G.z}if(G.z>s.z){s.z=G.z}}F.left=o.x;F.right=s.x;F.top=s.y;F.bottom=o.y;
F.updateProjectionMatrix()}function k(A){return A.material instanceof THREE.MeshFaceMaterial?A.material.materials[0]:A.material
}};THREE.SpritePlugin=function(k,j){var g=k.context;var l,a;var e,d,n;var i;var h=new THREE.Vector3();
var c=new THREE.Quaternion();var f=new THREE.Vector3();var o=function(){var r=new Float32Array([-0.5,-0.5,0,0,0.5,-0.5,1,0,0.5,0.5,1,1,-0.5,0.5,0,1]);
var p=new Uint16Array([0,1,2,0,2,3]);l=g.createBuffer();a=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,l);
g.bufferData(g.ARRAY_BUFFER,r,g.STATIC_DRAW);g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,a);
g.bufferData(g.ELEMENT_ARRAY_BUFFER,p,g.STATIC_DRAW);e=b();d={position:g.getAttribLocation(e,"position"),uv:g.getAttribLocation(e,"uv")};
n={uvOffset:g.getUniformLocation(e,"uvOffset"),uvScale:g.getUniformLocation(e,"uvScale"),rotation:g.getUniformLocation(e,"rotation"),scale:g.getUniformLocation(e,"scale"),color:g.getUniformLocation(e,"color"),map:g.getUniformLocation(e,"map"),opacity:g.getUniformLocation(e,"opacity"),modelViewMatrix:g.getUniformLocation(e,"modelViewMatrix"),projectionMatrix:g.getUniformLocation(e,"projectionMatrix"),fogType:g.getUniformLocation(e,"fogType"),fogDensity:g.getUniformLocation(e,"fogDensity"),fogNear:g.getUniformLocation(e,"fogNear"),fogFar:g.getUniformLocation(e,"fogFar"),fogColor:g.getUniformLocation(e,"fogColor"),alphaTest:g.getUniformLocation(e,"alphaTest")};
var q=document.createElement("canvas");q.width=8;q.height=8;var s=q.getContext("2d");
s.fillStyle="white";s.fillRect(0,0,8,8);i=new THREE.Texture(q);i.needsUpdate=true
};this.render=function(u,B){if(j.length===0){return}if(e===undefined){o()}g.useProgram(e);
g.enableVertexAttribArray(d.position);g.enableVertexAttribArray(d.uv);g.disable(g.CULL_FACE);
g.enable(g.BLEND);g.bindBuffer(g.ARRAY_BUFFER,l);g.vertexAttribPointer(d.position,2,g.FLOAT,false,2*8,0);
g.vertexAttribPointer(d.uv,2,g.FLOAT,false,2*8,8);g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,a);
g.uniformMatrix4fv(n.projectionMatrix,false,B.projectionMatrix.elements);g.activeTexture(g.TEXTURE0);
g.uniform1i(n.map,0);var v=0;var D=0;var p=u.fog;if(p){g.uniform3f(n.fogColor,p.color.r,p.color.g,p.color.b);
if(p instanceof THREE.Fog){g.uniform1f(n.fogNear,p.near);g.uniform1f(n.fogFar,p.far);
g.uniform1i(n.fogType,1);v=1;D=1}else{if(p instanceof THREE.FogExp2){g.uniform1f(n.fogDensity,p.density);
g.uniform1i(n.fogType,2);v=2;D=2}}}else{g.uniform1i(n.fogType,0);v=0;D=0}for(var t=0,r=j.length;
t<r;t++){var C=j[t];C._modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,C.matrixWorld);
C.z=-C._modelViewMatrix.elements[14]}j.sort(m);var q=[];for(var t=0,r=j.length;
t<r;t++){var C=j[t];var A=C.material;g.uniform1f(n.alphaTest,A.alphaTest);g.uniformMatrix4fv(n.modelViewMatrix,false,C._modelViewMatrix.elements);
C.matrixWorld.decompose(h,c,f);q[0]=f.x;q[1]=f.y;var s=0;if(u.fog&&A.fog){s=D}if(v!==s){g.uniform1i(n.fogType,s);
v=s}if(A.map!==null){g.uniform2f(n.uvOffset,A.map.offset.x,A.map.offset.y);g.uniform2f(n.uvScale,A.map.repeat.x,A.map.repeat.y)
}else{g.uniform2f(n.uvOffset,0,0);g.uniform2f(n.uvScale,1,1)}g.uniform1f(n.opacity,A.opacity);
g.uniform3f(n.color,A.color.r,A.color.g,A.color.b);g.uniform1f(n.rotation,A.rotation);
g.uniform2fv(n.scale,q);k.state.setBlending(A.blending,A.blendEquation,A.blendSrc,A.blendDst);
k.state.setDepthTest(A.depthTest);k.state.setDepthWrite(A.depthWrite);if(A.map&&A.map.image&&A.map.image.width){k.setTexture(A.map,0)
}else{k.setTexture(i,0)}g.drawElements(g.TRIANGLES,6,g.UNSIGNED_SHORT,0)}g.enable(g.CULL_FACE);
k.resetGLState()};function b(){var q=g.createProgram();var r=g.createShader(g.VERTEX_SHADER);
var p=g.createShader(g.FRAGMENT_SHADER);g.shaderSource(r,["precision "+k.getPrecision()+" float;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform float rotation;","uniform vec2 scale;","uniform vec2 uvOffset;","uniform vec2 uvScale;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uvOffset + uv * uvScale;","vec2 alignedPosition = position * scale;","vec2 rotatedPosition;","rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;","rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;","vec4 finalPosition;","finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );","finalPosition.xy += rotatedPosition;","finalPosition = projectionMatrix * finalPosition;","gl_Position = finalPosition;","}"].join("\n"));
g.shaderSource(p,["precision "+k.getPrecision()+" float;","uniform vec3 color;","uniform sampler2D map;","uniform float opacity;","uniform int fogType;","uniform vec3 fogColor;","uniform float fogDensity;","uniform float fogNear;","uniform float fogFar;","uniform float alphaTest;","varying vec2 vUV;","void main() {","vec4 texture = texture2D( map, vUV );","if ( texture.a < alphaTest ) discard;","gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );","if ( fogType > 0 ) {","float depth = gl_FragCoord.z / gl_FragCoord.w;","float fogFactor = 0.0;","if ( fogType == 1 ) {","fogFactor = smoothstep( fogNear, fogFar, depth );","} else {","const float LOG2 = 1.442695;","float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );","fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","}","gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );","}","}"].join("\n"));
g.compileShader(r);g.compileShader(p);g.attachShader(q,r);g.attachShader(q,p);g.linkProgram(q);
return q}function m(q,p){if(q.z!==p.z){return p.z-q.z}else{return p.id-q.id}}};
THREE.GeometryUtils={merge:function(c,b,d){THREE.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
var a;if(b instanceof THREE.Mesh){b.matrixAutoUpdate&&b.updateMatrix();a=b.matrix;
b=b.geometry}c.merge(b,a,d)},center:function(a){THREE.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
return a.center()}};THREE.ImageUtils={crossOrigin:undefined,loadTexture:function(c,b,d,f){var a=new THREE.ImageLoader();
a.crossOrigin=this.crossOrigin;var e=new THREE.Texture(undefined,b);a.load(c,function(g){e.image=g;
e.needsUpdate=true;if(d){d(e)}},undefined,function(g){if(f){f(g)}});e.sourceFile=c;
return e},loadTextureCube:function(e,a,h,d){var j=[];var l=new THREE.ImageLoader();
l.crossOrigin=this.crossOrigin;var f=new THREE.CubeTexture(j,a);f.flipY=false;var c=0;
var g=function(m){l.load(e[m],function(i){f.images[m]=i;c+=1;if(c===6){f.needsUpdate=true;
if(h){h(f)}}},undefined,d)};for(var b=0,k=e.length;b<k;++b){g(b)}return f},loadCompressedTexture:function(){THREE.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
},loadCompressedTextureCube:function(){THREE.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
},getNormalMap:function(q,E){var d=function(G,i){return[G[1]*i[2]-G[2]*i[1],G[2]*i[0]-G[0]*i[2],G[0]*i[1]-G[1]*i[0]]
};var v=function(G,i){return[G[0]-i[0],G[1]-i[1],G[2]-i[2]]};var s=function(G){var i=Math.sqrt(G[0]*G[0]+G[1]*G[1]+G[2]*G[2]);
return[G[0]/i,G[1]/i,G[2]/i]};E=E|1;var r=q.width;var p=q.height;var e=document.createElement("canvas");
e.width=r;e.height=p;var c=e.getContext("2d");c.drawImage(q,0,0);var F=c.getImageData(0,0,r,p).data;
var A=c.createImageData(r,p);var k=A.data;for(var m=0;m<r;m++){for(var l=0;l<p;
l++){var f=l-1<0?0:l-1;var h=l+1>p-1?p-1:l+1;var g=m-1<0?0:m-1;var j=m+1>r-1?r-1:m+1;
var u=[];var D=[0,0,F[(l*r+m)*4]/255*E];u.push([-1,0,F[(l*r+g)*4]/255*E]);u.push([-1,-1,F[(f*r+g)*4]/255*E]);
u.push([0,-1,F[(f*r+m)*4]/255*E]);u.push([1,-1,F[(f*r+j)*4]/255*E]);u.push([1,0,F[(l*r+j)*4]/255*E]);
u.push([1,1,F[(h*r+j)*4]/255*E]);u.push([0,1,F[(h*r+m)*4]/255*E]);u.push([-1,1,F[(h*r+g)*4]/255*E]);
var o=[];var B=u.length;for(var t=0;t<B;t++){var b=u[t];var a=u[(t+1)%B];b=v(b,D);
a=v(a,D);o.push(s(d(b,a)))}var C=[0,0,0];for(var t=0;t<o.length;t++){C[0]+=o[t][0];
C[1]+=o[t][1];C[2]+=o[t][2]}C[0]/=o.length;C[1]/=o.length;C[2]/=o.length;var n=(l*r+m)*4;
k[n]=((C[0]+1)/2*255)|0;k[n+1]=((C[1]+1)/2*255)|0;k[n+2]=(C[2]*255)|0;k[n+3]=255
}}c.putImageData(A,0,0);return e},generateDataTexture:function(c,l,d){var m=c*l;
var f=new Uint8Array(3*m);var a=Math.floor(d.r*255);var h=Math.floor(d.g*255);var k=Math.floor(d.b*255);
for(var e=0;e<m;e++){f[e*3]=a;f[e*3+1]=h;f[e*3+2]=k}var j=new THREE.DataTexture(f,c,l,THREE.RGBFormat);
j.needsUpdate=true;return j}};THREE.SceneUtils={createMultiMaterialObject:function(e,b){var d=new THREE.Object3D();
for(var c=0,a=b.length;c<a;c++){d.add(new THREE.Mesh(e,b[c]))}return d},detach:function(c,a,b){c.applyMatrix(a.matrixWorld);
a.remove(c);b.add(c)},attach:function(d,c,a){var b=new THREE.Matrix4();b.getInverse(a.matrixWorld);
d.applyMatrix(b);c.remove(d);a.add(d)}};THREE.FontUtils={faces:{},face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){try{return this.faces[this.face][this.weight][this.style]
}catch(a){throw"The font "+this.face+" with "+this.weight+" weight and "+this.style+" style is missing."
}},loadFace:function(c){var a=c.familyName.toLowerCase();var b=this;b.faces[a]=b.faces[a]||{};
b.faces[a][c.cssFontWeight]=b.faces[a][c.cssFontWeight]||{};b.faces[a][c.cssFontWeight][c.cssFontStyle]=c;
b.faces[a][c.cssFontWeight][c.cssFontStyle]=c;return c},drawText:function(k){var f,h=this.getFace(),c=this.size/h.resolution,e=0,j=String(k).split(""),b=j.length;
var d=[];for(f=0;f<b;f++){var l=new THREE.Path();var g=this.extractGlyphPoints(j[f],h,c,e,l);
e+=g.offset;d.push(g.path)}var a=e/2;return{paths:d,offset:a}},extractGlyphPoints:function(E,j,G,f,r){var H=[];
var v,s,d,e,u,b,F,D,l,k,h,g,q,C,o,B,n,A,a,m=j.glyphs[E]||j.glyphs["?"];if(!m){return
}if(m.o){e=m._cachedOutline||(m._cachedOutline=m.o.split(" "));b=e.length;F=G;D=G;
for(v=0;v<b;){u=e[v++];switch(u){case"m":l=e[v++]*F+f;k=e[v++]*D;r.moveTo(l,k);
break;case"l":l=e[v++]*F+f;k=e[v++]*D;r.lineTo(l,k);break;case"q":h=e[v++]*F+f;
g=e[v++]*D;o=e[v++]*F+f;B=e[v++]*D;r.quadraticCurveTo(o,B,h,g);a=H[H.length-1];
if(a){q=a.x;C=a.y;for(s=1,d=this.divisions;s<=d;s++){var p=s/d;THREE.Shape.Utils.b2(p,q,o,h);
THREE.Shape.Utils.b2(p,C,B,g)}}break;case"b":h=e[v++]*F+f;g=e[v++]*D;o=e[v++]*F+f;
B=e[v++]*D;n=e[v++]*F+f;A=e[v++]*D;r.bezierCurveTo(o,B,n,A,h,g);a=H[H.length-1];
if(a){q=a.x;C=a.y;for(s=1,d=this.divisions;s<=d;s++){var p=s/d;THREE.Shape.Utils.b3(p,q,o,n,h);
THREE.Shape.Utils.b3(p,C,B,A,g)}}break}}}return{offset:m.ha*G,path:r}}};THREE.FontUtils.generateShapes=function(i,j){j=j||{};
var l=j.size!==undefined?j.size:100;var h=j.curveSegments!==undefined?j.curveSegments:4;
var d=j.font!==undefined?j.font:"helvetiker";var g=j.weight!==undefined?j.weight:"normal";
var a=j.style!==undefined?j.style:"normal";THREE.FontUtils.size=l;THREE.FontUtils.divisions=h;
THREE.FontUtils.face=d;THREE.FontUtils.weight=g;THREE.FontUtils.style=a;var f=THREE.FontUtils.drawText(i);
var k=f.paths;var c=[];for(var b=0,e=k.length;b<e;b++){Array.prototype.push.apply(c,k[b].toShapes())
}return c};(function(c){var b=1e-10;var e=function(g,r){var f=g.length;if(f<3){return null
}var D=[],p=[],j=[];var A,q,o;if(d(g)>0){for(q=0;q<f;q++){p[q]=q}}else{for(q=0;
q<f;q++){p[q]=(f-1)-q}}var i=f;var h=2*i;for(q=i-1;i>2;){if((h--)<=0){THREE.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()");
if(r){return j}return D}A=q;if(i<=A){A=0}q=A+1;if(i<=q){q=0}o=q+1;if(i<=o){o=0}if(a(g,A,q,o,i,p)){var m,l,k,C,B;
m=p[A];l=p[q];k=p[o];D.push([g[m],g[l],g[k]]);j.push([p[A],p[q],p[o]]);for(C=q,B=q+1;
B<i;C++,B++){p[C]=p[B]}i--;h=2*i}}if(r){return j}return D};var d=function(g){var j=g.length;
var f=0;for(var i=j-1,h=0;h<j;i=h++){f+=g[i].x*g[h].y-g[h].x*g[i].y}return f*0.5
};var a=function(J,D,C,t,I,Q){var H;var A,r,O,M;var i,g,G,F;A=J[Q[D]].x;r=J[Q[D]].y;
O=J[Q[C]].x;M=J[Q[C]].y;i=J[Q[t]].x;g=J[Q[t]].y;if(b>(((O-A)*(g-r))-((M-r)*(i-A)))){return false
}var h,f,B,s,P,N;var l,k,L,K,o,m;var j,q,E;h=i-O;f=g-M;B=A-i;s=r-g;P=O-A;N=M-r;
for(H=0;H<I;H++){G=J[Q[H]].x;F=J[Q[H]].y;if(((G===A)&&(F===r))||((G===O)&&(F===M))||((G===i)&&(F===g))){continue
}l=G-A;k=F-r;L=G-O;K=F-M;o=G-i;m=F-g;E=h*K-f*L;j=P*k-N*l;q=B*m-s*o;if((E>=-b)&&(q>=-b)&&(j>=-b)){return false
}}return true};c.Triangulate=e;c.Triangulate.area=d;return c})(THREE.FontUtils);
self._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};
THREE.typeface_js=self._typeface_js;THREE.Audio=function(a){THREE.Object3D.call(this);
this.type="Audio";this.context=a.context;this.source=this.context.createBufferSource();
this.source.onended=this.onEnded.bind(this);this.gain=this.context.createGain();
this.gain.connect(this.context.destination);this.panner=this.context.createPanner();
this.panner.connect(this.gain);this.autoplay=false;this.startTime=0;this.isPlaying=false
};THREE.Audio.prototype=Object.create(THREE.Object3D.prototype);THREE.Audio.prototype.constructor=THREE.Audio;
THREE.Audio.prototype.load=function(a){var b=this;var c=new XMLHttpRequest();c.open("GET",a,true);
c.responseType="arraybuffer";c.onload=function(d){b.context.decodeAudioData(this.response,function(e){b.source.buffer=e;
if(b.autoplay){b.play()}})};c.send();return this};THREE.Audio.prototype.play=function(){if(this.isPlaying===true){THREE.warn("THREE.Audio: Audio is already playing.");
return}var a=this.context.createBufferSource();a.buffer=this.source.buffer;a.loop=this.source.loop;
a.onended=this.source.onended;a.connect(this.panner);a.start(0,this.startTime);
this.isPlaying=true;this.source=a};THREE.Audio.prototype.pause=function(){this.source.stop();
this.startTime=this.context.currentTime};THREE.Audio.prototype.stop=function(){this.source.stop();
this.startTime=0};THREE.Audio.prototype.onEnded=function(){this.isPlaying=false
};THREE.Audio.prototype.setLoop=function(a){this.source.loop=a};THREE.Audio.prototype.setRefDistance=function(a){this.panner.refDistance=a
};THREE.Audio.prototype.setRolloffFactor=function(a){this.panner.rolloffFactor=a
};THREE.Audio.prototype.setVolume=function(a){this.gain.gain.value=a};THREE.Audio.prototype.updateMatrixWorld=(function(){var a=new THREE.Vector3();
return function(b){THREE.Object3D.prototype.updateMatrixWorld.call(this,b);a.setFromMatrixPosition(this.matrixWorld);
this.panner.setPosition(a.x,a.y,a.z)}})();THREE.AudioListener=function(){THREE.Object3D.call(this);
this.type="AudioListener";this.context=new (window.AudioContext||window.webkitAudioContext)()
};THREE.AudioListener.prototype=Object.create(THREE.Object3D.prototype);THREE.AudioListener.prototype.constructor=THREE.AudioListener;
THREE.AudioListener.prototype.updateMatrixWorld=(function(){var b=new THREE.Vector3();
var e=new THREE.Quaternion();var f=new THREE.Vector3();var c=new THREE.Vector3();
var d=new THREE.Vector3();var a=new THREE.Vector3();return function(i){THREE.Object3D.prototype.updateMatrixWorld.call(this,i);
var h=this.context.listener;var g=this.up;this.matrixWorld.decompose(b,e,f);c.set(0,0,-1).applyQuaternion(e);
d.subVectors(b,a);h.setPosition(b.x,b.y,b.z);h.setOrientation(c.x,c.y,c.z,g.x,g.y,g.z);
h.setVelocity(d.x,d.y,d.z);a.copy(b)}})();THREE.Curve=function(){};THREE.Curve.prototype.getPoint=function(a){THREE.warn("THREE.Curve: Warning, getPoint() not implemented!");
return null};THREE.Curve.prototype.getPointAt=function(a){var b=this.getUtoTmapping(a);
return this.getPoint(b)};THREE.Curve.prototype.getPoints=function(a){if(!a){a=5
}var c,b=[];for(c=0;c<=a;c++){b.push(this.getPoint(c/a))}return b};THREE.Curve.prototype.getSpacedPoints=function(a){if(!a){a=5
}var c,b=[];for(c=0;c<=a;c++){b.push(this.getPointAt(c/a))}return b};THREE.Curve.prototype.getLength=function(){var a=this.getLengths();
return a[a.length-1]};THREE.Curve.prototype.getLengths=function(b){if(!b){b=(this.__arcLengthDivisions)?(this.__arcLengthDivisions):200
}if(this.cacheArcLengths&&(this.cacheArcLengths.length==b+1)&&!this.needsUpdate){return this.cacheArcLengths
}this.needsUpdate=false;var a=[];var f,d=this.getPoint(0);var e,c=0;a.push(0);for(e=1;
e<=b;e++){f=this.getPoint(e/b);c+=f.distanceTo(d);a.push(c);d=f}this.cacheArcLengths=a;
return a};THREE.Curve.prototype.updateArcLengths=function(){this.needsUpdate=true;
this.getLengths()};THREE.Curve.prototype.getUtoTmapping=function(m,a){var b=this.getLengths();
var e=0,j=b.length;var k;if(a){k=a}else{k=m*b[j-1]}var h=0,d=j-1,l;while(h<=d){e=Math.floor(h+(d-h)/2);
l=b[e]-k;if(l<0){h=e+1}else{if(l>0){d=e-1}else{d=e;break}}}e=d;if(b[e]==k){var o=e/(j-1);
return o}var f=b[e];var n=b[e+1];var c=n-f;var g=(k-f)/c;var o=(e+g)/(j-1);return o
};THREE.Curve.prototype.getTangent=function(b){var g=0.0001;var d=b-g;var c=b+g;
if(d<0){d=0}if(c>1){c=1}var f=this.getPoint(d);var e=this.getPoint(c);var a=e.clone().sub(f);
return a.normalize()};THREE.Curve.prototype.getTangentAt=function(a){var b=this.getUtoTmapping(a);
return this.getTangent(b)};THREE.Curve.Utils={tangentQuadraticBezier:function(a,d,c,b){return 2*(1-a)*(c-d)+2*a*(b-c)
},tangentCubicBezier:function(a,e,d,c,b){return -3*e*(1-a)*(1-a)+3*d*(1-a)*(1-a)-6*a*d*(1-a)+6*a*c*(1-a)-3*a*a*c+3*a*a*b
},tangentSpline:function(i,h,g,f,d){var e=6*i*i-6*i;var b=3*i*i-4*i+1;var c=-6*i*i+6*i;
var a=3*i*i-2*i;return e+b+c+a},interpolate:function(h,g,e,d,i){var f=(e-h)*0.5;
var c=(d-g)*0.5;var b=i*i;var a=i*b;return(2*g-2*e+f+c)*a+(-3*g+3*e-2*f-c)*b+f*i+g
}};THREE.Curve.create=function(a,b){a.prototype=Object.create(THREE.Curve.prototype);
a.prototype.constructor=a;a.prototype.getPoint=b;return a};THREE.CurvePath=function(){this.curves=[];
this.bends=[];this.autoClose=false};THREE.CurvePath.prototype=Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.constructor=THREE.CurvePath;THREE.CurvePath.prototype.add=function(a){this.curves.push(a)
};THREE.CurvePath.prototype.checkConnection=function(){};THREE.CurvePath.prototype.closePath=function(){var b=this.curves[0].getPoint(0);
var a=this.curves[this.curves.length-1].getPoint(1);if(!b.equals(a)){this.curves.push(new THREE.LineCurve(a,b))
}};THREE.CurvePath.prototype.getPoint=function(c){var h=c*this.getLength();var g=this.getCurveLengths();
var b=0,e,f;while(b<g.length){if(g[b]>=h){e=g[b]-h;f=this.curves[b];var a=1-e/f.getLength();
return f.getPointAt(a)}b++}return null};THREE.CurvePath.prototype.getLength=function(){var a=this.getCurveLengths();
return a[a.length-1]};THREE.CurvePath.prototype.getCurveLengths=function(){if(this.cacheLengths&&this.cacheLengths.length==this.curves.length){return this.cacheLengths
}var d=[],c=0;var b,a=this.curves.length;for(b=0;b<a;b++){c+=this.curves[b].getLength();
d.push(c)}this.cacheLengths=d;return d};THREE.CurvePath.prototype.getBoundingBox=function(){var m=this.getPoints();
var b,a,n;var f,e,d;b=a=Number.NEGATIVE_INFINITY;f=e=Number.POSITIVE_INFINITY;var c,g,l,h;
var k=m[0] instanceof THREE.Vector3;h=k?new THREE.Vector3():new THREE.Vector2();
for(g=0,l=m.length;g<l;g++){c=m[g];if(c.x>b){b=c.x}else{if(c.x<f){f=c.x}}if(c.y>a){a=c.y
}else{if(c.y<e){e=c.y}}if(k){if(c.z>n){n=c.z}else{if(c.z<d){d=c.z}}}h.add(c)}var j={minX:f,minY:e,maxX:b,maxY:a};
if(k){j.maxZ=n;j.minZ=d}return j};THREE.CurvePath.prototype.createPointsGeometry=function(a){var b=this.getPoints(a,true);
return this.createGeometry(b)};THREE.CurvePath.prototype.createSpacedPointsGeometry=function(a){var b=this.getSpacedPoints(a,true);
return this.createGeometry(b)};THREE.CurvePath.prototype.createGeometry=function(b){var c=new THREE.Geometry();
for(var a=0;a<b.length;a++){c.vertices.push(new THREE.Vector3(b[a].x,b[a].y,b[a].z||0))
}return c};THREE.CurvePath.prototype.addWrapPath=function(a){this.bends.push(a)
};THREE.CurvePath.prototype.getTransformedPoints=function(c,e){var b=this.getPoints(c);
var d,a;if(!e){e=this.bends}for(d=0,a=e.length;d<a;d++){b=this.getWrapPoints(b,e[d])
}return b};THREE.CurvePath.prototype.getTransformedSpacedPoints=function(c,e){var b=this.getSpacedPoints(c);
var d,a;if(!e){e=this.bends}for(d=0,a=e.length;d<a;d++){b=this.getWrapPoints(b,e[d])
}return b};THREE.CurvePath.prototype.getWrapPoints=function(f,l){var a=this.getBoundingBox();
var d,g,b,j,h,k;for(d=0,g=f.length;d<g;d++){b=f[d];j=b.x;h=b.y;k=j/a.maxX;k=l.getUtoTmapping(k,j);
var c=l.getPoint(k);var e=l.getTangent(k);e.set(-e.y,e.x).multiplyScalar(h);b.x=c.x+e.x;
b.y=c.y+e.y}return f};THREE.Gyroscope=function(){THREE.Object3D.call(this)};THREE.Gyroscope.prototype=Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.constructor=THREE.Gyroscope;THREE.Gyroscope.prototype.updateMatrixWorld=(function(){var d=new THREE.Vector3();
var f=new THREE.Quaternion();var c=new THREE.Vector3();var b=new THREE.Vector3();
var a=new THREE.Quaternion();var e=new THREE.Vector3();return function(j){this.matrixAutoUpdate&&this.updateMatrix();
if(this.matrixWorldNeedsUpdate||j){if(this.parent){this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);
this.matrixWorld.decompose(b,a,e);this.matrix.decompose(d,f,c);this.matrixWorld.compose(b,f,e)
}else{this.matrixWorld.copy(this.matrix)}this.matrixWorldNeedsUpdate=false;j=true
}for(var h=0,g=this.children.length;h<g;h++){this.children[h].updateMatrixWorld(j)
}}}());THREE.Path=function(a){THREE.CurvePath.call(this);this.actions=[];if(a){this.fromPoints(a)
}};THREE.Path.prototype=Object.create(THREE.CurvePath.prototype);THREE.Path.prototype.constructor=THREE.Path;
THREE.PathActions={MOVE_TO:"moveTo",LINE_TO:"lineTo",QUADRATIC_CURVE_TO:"quadraticCurveTo",BEZIER_CURVE_TO:"bezierCurveTo",CSPLINE_THRU:"splineThru",ARC:"arc",ELLIPSE:"ellipse"};
THREE.Path.prototype.fromPoints=function(b){this.moveTo(b[0].x,b[0].y);for(var a=1,c=b.length;
a<c;a++){this.lineTo(b[a].x,b[a].y)}};THREE.Path.prototype.moveTo=function(a,c){var b=Array.prototype.slice.call(arguments);
this.actions.push({action:THREE.PathActions.MOVE_TO,args:b})};THREE.Path.prototype.lineTo=function(a,g){var b=Array.prototype.slice.call(arguments);
var e=this.actions[this.actions.length-1].args;var c=e[e.length-2];var d=e[e.length-1];
var f=new THREE.LineCurve(new THREE.Vector2(c,d),new THREE.Vector2(a,g));this.curves.push(f);
this.actions.push({action:THREE.PathActions.LINE_TO,args:b})};THREE.Path.prototype.quadraticCurveTo=function(e,b,g,f){var h=Array.prototype.slice.call(arguments);
var a=this.actions[this.actions.length-1].args;var c=a[a.length-2];var i=a[a.length-1];
var d=new THREE.QuadraticBezierCurve(new THREE.Vector2(c,i),new THREE.Vector2(e,b),new THREE.Vector2(g,f));
this.curves.push(d);this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:h})
};THREE.Path.prototype.bezierCurveTo=function(e,c,k,j,g,f){var h=Array.prototype.slice.call(arguments);
var a=this.actions[this.actions.length-1].args;var b=a[a.length-2];var i=a[a.length-1];
var d=new THREE.CubicBezierCurve(new THREE.Vector2(b,i),new THREE.Vector2(e,c),new THREE.Vector2(k,j),new THREE.Vector2(g,f));
this.curves.push(d);this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:h})
};THREE.Path.prototype.splineThru=function(g){var a=Array.prototype.slice.call(arguments);
var d=this.actions[this.actions.length-1].args;var b=d[d.length-2];var c=d[d.length-1];
var f=[new THREE.Vector2(b,c)];Array.prototype.push.apply(f,g);var e=new THREE.SplineCurve(f);
this.curves.push(e);this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:a})
};THREE.Path.prototype.arc=function(h,f,g,d,a,b){var c=this.actions[this.actions.length-1].args;
var e=c[c.length-2];var i=c[c.length-1];this.absarc(h+e,f+i,g,d,a,b)};THREE.Path.prototype.absarc=function(e,d,f,c,b,a){this.absellipse(e,d,f,f,c,b,a)
};THREE.Path.prototype.ellipse=function(g,f,i,h,d,a,b){var c=this.actions[this.actions.length-1].args;
var e=c[c.length-2];var j=c[c.length-1];this.absellipse(g+e,f+j,i,h,d,a,b)};THREE.Path.prototype.absellipse=function(f,e,j,g,c,a,b){var h=Array.prototype.slice.call(arguments);
var d=new THREE.EllipseCurve(f,e,j,g,c,a,b);this.curves.push(d);var i=d.getPoint(1);
h.push(i.x);h.push(i.y);this.actions.push({action:THREE.PathActions.ELLIPSE,args:h})
};THREE.Path.prototype.getSpacedPoints=function(b,d){if(!b){b=40}var c=[];for(var a=0;
a<b;a++){c.push(this.getPoint(a/b))}return c};THREE.Path.prototype.getPoints=function(S,Q){if(this.useSpacedPoints){return this.getSpacedPoints(S,Q)
}S=S||12;var E=[];var N,u,r,c,I;var F,C,R,v,T,A,a,B,b,M,H,L,K;for(N=0,u=this.actions.length;
N<u;N++){r=this.actions[N];c=r.action;I=r.args;switch(c){case THREE.PathActions.MOVE_TO:E.push(new THREE.Vector2(I[0],I[1]));
break;case THREE.PathActions.LINE_TO:E.push(new THREE.Vector2(I[0],I[1]));break;
case THREE.PathActions.QUADRATIC_CURVE_TO:F=I[2];C=I[3];T=I[0];A=I[1];if(E.length>0){b=E[E.length-1];
a=b.x;B=b.y}else{b=this.actions[N-1].args;a=b[b.length-2];B=b[b.length-1]}for(M=1;
M<=S;M++){H=M/S;L=THREE.Shape.Utils.b2(H,a,T,F);K=THREE.Shape.Utils.b2(H,B,A,C);
E.push(new THREE.Vector2(L,K))}break;case THREE.PathActions.BEZIER_CURVE_TO:F=I[4];
C=I[5];T=I[0];A=I[1];R=I[2];v=I[3];if(E.length>0){b=E[E.length-1];a=b.x;B=b.y}else{b=this.actions[N-1].args;
a=b[b.length-2];B=b[b.length-1]}for(M=1;M<=S;M++){H=M/S;L=THREE.Shape.Utils.b3(H,a,T,R,F);
K=THREE.Shape.Utils.b3(H,B,A,v,C);E.push(new THREE.Vector2(L,K))}break;case THREE.PathActions.CSPLINE_THRU:b=this.actions[N-1].args;
var k=new THREE.Vector2(b[b.length-2],b[b.length-1]);var f=[k];var J=S*I[0].length;
f=f.concat(I[0]);var P=new THREE.SplineCurve(f);for(M=1;M<=J;M++){E.push(P.getPointAt(M/J))
}break;case THREE.PathActions.ARC:var o=I[0],m=I[1],p=I[2],O=I[3],G=I[4],h=!!I[5];
var D=G-O;var l;var d=S*2;for(M=1;M<=d;M++){H=M/d;if(!h){H=1-H}l=O+H*D;L=o+p*Math.cos(l);
K=m+p*Math.sin(l);E.push(new THREE.Vector2(L,K))}break;case THREE.PathActions.ELLIPSE:var o=I[0],m=I[1],q=I[2],s=I[3],O=I[4],G=I[5],h=!!I[6];
var D=G-O;var l;var d=S*2;for(M=1;M<=d;M++){H=M/d;if(!h){H=1-H}l=O+H*D;L=o+q*Math.cos(l);
K=m+s*Math.sin(l);E.push(new THREE.Vector2(L,K))}break}}var e=E[E.length-1];var g=1e-10;
if(Math.abs(e.x-E[0].x)<g&&Math.abs(e.y-E[0].y)<g){E.splice(E.length-1,1)}if(Q){E.push(E[0])
}return E};THREE.Path.prototype.toShapes=function(I,t){function k(M){var L,j,N,O,K;
var Q=[],P=new THREE.Path();for(L=0,j=M.length;L<j;L++){N=M[L];K=N.args;O=N.action;
if(O==THREE.PathActions.MOVE_TO){if(P.actions.length!=0){Q.push(P);P=new THREE.Path()
}}P[O].apply(P,K)}if(P.actions.length!=0){Q.push(P)}return Q}function m(L){var j=[];
for(var M=0,K=L.length;M<K;M++){var N=L[M];var O=new THREE.Shape();O.actions=N.actions;
O.curves=N.curves;j.push(O)}return j}function q(S,L){var M=1e-10;var O=L.length;
var N=false;for(var j=O-1,i=0;i<O;j=i++){var K=L[j];var T=L[i];var R=T.x-K.x;var P=T.y-K.y;
if(Math.abs(P)>M){if(P<0){K=L[i];R=-R;T=L[j];P=-P}if((S.y<K.y)||(S.y>T.y)){continue
}if(S.y==K.y){if(S.x==K.x){return true}}else{var Q=P*(S.x-K.x)-R*(S.y-K.y);if(Q==0){return true
}if(Q<0){continue}N=!N}}else{if(S.y!=K.y){continue}if(((T.x<=S.x)&&(S.x<=K.x))||((K.x<=S.x)&&(S.x<=T.x))){return true
}}}return N}var e=k(this.actions);if(e.length==0){return[]}if(t===true){return m(e)
}var H,F,o,r=[];if(e.length==1){F=e[0];o=new THREE.Shape();o.actions=F.actions;
o.curves=F.curves;r.push(o);return r}var a=!THREE.Shape.Utils.isClockWise(e[0].getPoints());
a=I?!a:a;var p=[];var B=[];var G=[];var h=0;var u;B[h]=undefined;G[h]=[];var C,n;
for(C=0,n=e.length;C<n;C++){F=e[C];u=F.getPoints();H=THREE.Shape.Utils.isClockWise(u);
H=I?!H:H;if(H){if((!a)&&(B[h])){h++}B[h]={s:new THREE.Shape(),p:u};B[h].s.actions=F.actions;
B[h].s.curves=F.curves;if(a){h++}G[h]=[]}else{G[h].push({h:F,p:u[0]})}}if(!B[0]){return m(e)
}if(B.length>1){var c=false;var v=[];for(var J=0,d=B.length;J<d;J++){p[J]=[]}for(var J=0,d=B.length;
J<d;J++){var s=G[J];for(var l=0;l<s.length;l++){var b=s[l];var g=true;for(var f=0;
f<B.length;f++){if(q(b.p,B[f].p)){if(J!=f){v.push({froms:J,tos:f,hole:l})}if(g){g=false;
p[f].push(b)}else{c=true}}}if(g){p[J].push(b)}}}if(v.length>0){if(!c){G=p}}}var E,A,D;
for(C=0,n=B.length;C<n;C++){o=B[C].s;r.push(o);E=G[C];for(A=0,D=E.length;A<D;A++){o.holes.push(E[A].h)
}}return r};THREE.Shape=function(){THREE.Path.apply(this,arguments);this.holes=[]
};THREE.Shape.prototype=Object.create(THREE.Path.prototype);THREE.Shape.prototype.constructor=THREE.Shape;
THREE.Shape.prototype.extrude=function(b){var a=new THREE.ExtrudeGeometry(this,b);
return a};THREE.Shape.prototype.makeGeometry=function(a){var b=new THREE.ShapeGeometry(this,a);
return b};THREE.Shape.prototype.getPointsHoles=function(c){var b,a=this.holes.length,d=[];
for(b=0;b<a;b++){d[b]=this.holes[b].getTransformedPoints(c,this.bends)}return d
};THREE.Shape.prototype.getSpacedPointsHoles=function(c){var b,a=this.holes.length,d=[];
for(b=0;b<a;b++){d[b]=this.holes[b].getTransformedSpacedPoints(c,this.bends)}return d
};THREE.Shape.prototype.extractAllPoints=function(a){return{shape:this.getTransformedPoints(a),holes:this.getPointsHoles(a)}
};THREE.Shape.prototype.extractPoints=function(a){if(this.useSpacedPoints){return this.extractAllSpacedPoints(a)
}return this.extractAllPoints(a)};THREE.Shape.prototype.extractAllSpacedPoints=function(a){return{shape:this.getTransformedSpacedPoints(a),holes:this.getSpacedPointsHoles(a)}
};THREE.Shape.Utils={triangulateShape:function(p,j){function e(i,h,f){if(i.x!=h.x){if(i.x<h.x){return((i.x<=f.x)&&(f.x<=h.x))
}else{return((h.x<=f.x)&&(f.x<=i.x))}}else{if(i.y<h.y){return((i.y<=f.y)&&(f.y<=h.y))
}else{return((h.y<=f.y)&&(f.y<=i.y))}}}function m(U,T,v,i,Q){var J=1e-10;var I=T.x-U.x,H=T.y-U.y;
var S=i.x-v.x,R=i.y-v.y;var O=U.x-v.x;var N=U.y-v.y;var P=H*S-I*R;var F=H*O-I*N;
if(Math.abs(P)>J){var E;if(P>0){if((F<0)||(F>P)){return[]}E=R*O-S*N;if((E<0)||(E>P)){return[]
}}else{if((F>0)||(F<P)){return[]}E=R*O-S*N;if((E>0)||(E<P)){return[]}}if(E==0){if((Q)&&((F==0)||(F==P))){return[]
}return[U]}if(E==P){if((Q)&&((F==0)||(F==P))){return[]}return[T]}if(F==0){return[v]
}if(F==P){return[i]}var h=E/P;return[{x:U.x+h*I,y:U.y+h*H}]}else{if((F!=0)||(R*O!=S*N)){return[]
}var K=((I==0)&&(H==0));var D=((S==0)&&(R==0));if(K&&D){if((U.x!=v.x)||(U.y!=v.y)){return[]
}return[U]}if(K){if(!e(v,i,U)){return[]}return[U]}if(D){if(!e(U,T,v)){return[]}return[v]
}var V,f,M,G;var B,C,A,L;if(I!=0){if(U.x<T.x){V=U;M=U.x;f=T;G=T.x}else{V=T;M=T.x;
f=U;G=U.x}if(v.x<i.x){B=v;A=v.x;C=i;L=i.x}else{B=i;A=i.x;C=v;L=v.x}}else{if(U.y<T.y){V=U;
M=U.y;f=T;G=T.y}else{V=T;M=T.y;f=U;G=U.y}if(v.y<i.y){B=v;A=v.y;C=i;L=i.y}else{B=i;
A=i.y;C=v;L=v.y}}if(M<=A){if(G<A){return[]}if(G==A){if(Q){return[]}return[B]}if(G<=L){return[B,f]
}return[B,C]}else{if(M>L){return[]}if(M==L){if(Q){return[]}return[V]}if(G<=L){return[V,f]
}return[V,C]}}}function s(A,F,i,H){var v=1e-10;var G=F.x-A.x,E=F.y-A.y;var J=i.x-A.x,I=i.y-A.y;
var D=H.x-A.x,C=H.y-A.y;var h=G*I-E*J;var f=G*C-E*D;if(Math.abs(h)>v){var B=D*I-C*J;
if(h>0){return((f>=0)&&(B>=0))}else{return((f>=0)||(B>=0))}}else{return(f>0)}}function k(L,H){var i=L.concat();
var K;function M(Y,ab){var X=i.length-1;var aa=Y-1;if(aa<0){aa=X}var W=Y+1;if(W>X){W=0
}var ac=s(i[Y],i[aa],i[W],K[ab]);if(!ac){return false}var Z=K.length-1;var V=ab-1;
if(V<0){V=Z}var h=ab+1;if(h>Z){h=0}ac=s(K[ab],K[V],K[h],i[Y]);if(!ac){return false
}return true}function f(V,W){var h,X,Y;for(h=0;h<i.length;h++){X=h+1;X%=i.length;
Y=m(V,W,i[h],i[X],true);if(Y.length>0){return true}}return false}var C=[];function O(V,W){var X,aa,h,Y,Z;
for(X=0;X<C.length;X++){aa=H[C[X]];for(h=0;h<aa.length;h++){Y=h+1;Y%=aa.length;
Z=m(V,W,aa[h],aa[Y],true);if(Z.length>0){return true}}}return false}var I,F,U,R,S,P,B=[],T,Q,E,D;
for(var N=0,A=H.length;N<A;N++){C.push(N)}var v=0;var J=C.length*2;while(C.length>0){J--;
if(J<0){break}for(F=v;F<i.length;F++){U=i[F];I=-1;for(var N=0;N<C.length;N++){S=C[N];
P=U.x+":"+U.y+":"+S;if(B[P]!==undefined){continue}K=H[S];for(var G=0;G<K.length;
G++){R=K[G];if(!M(F,G)){continue}if(f(U,R)){continue}if(O(U,R)){continue}I=G;C.splice(N,1);
T=i.slice(0,F+1);Q=i.slice(F);E=K.slice(I);D=K.slice(0,I+1);i=T.concat(E).concat(D).concat(Q);
v=F;break}if(I>=0){break}B[P]=true}if(I>=0){break}}}return i}var q,n,t,l,u,d,c={};
var g=p.concat();for(var r=0,b=j.length;r<b;r++){Array.prototype.push.apply(g,j[r])
}for(q=0,n=g.length;q<n;q++){u=g[q].x+":"+g[q].y;if(c[u]!==undefined){THREE.warn("THREE.Shape: Duplicate point",u)
}c[u]=q}var a=k(p,j);var o=THREE.FontUtils.Triangulate(a,false);for(q=0,n=o.length;
q<n;q++){l=o[q];for(t=0;t<3;t++){u=l[t].x+":"+l[t].y;d=c[u];if(d!==undefined){l[t]=d
}}}return o.concat()},isClockWise:function(a){return THREE.FontUtils.Triangulate.area(a)<0
},b2p0:function(b,c){var a=1-b;return a*a*c},b2p1:function(a,b){return 2*(1-a)*a*b
},b2p2:function(a,b){return a*a*b},b2:function(a,d,c,b){return this.b2p0(a,d)+this.b2p1(a,c)+this.b2p2(a,b)
},b3p0:function(b,c){var a=1-b;return a*a*a*c},b3p1:function(b,c){var a=1-b;return 3*a*a*b*c
},b3p2:function(b,c){var a=1-b;return 3*a*b*b*c},b3p3:function(a,b){return a*a*a*b
},b3:function(a,e,d,c,b){return this.b3p0(a,e)+this.b3p1(a,d)+this.b3p2(a,c)+this.b3p3(a,b)
}};THREE.LineCurve=function(b,a){this.v1=b;this.v2=a};THREE.LineCurve.prototype=Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.constructor=THREE.LineCurve;THREE.LineCurve.prototype.getPoint=function(b){var a=this.v2.clone().sub(this.v1);
a.multiplyScalar(b).add(this.v1);return a};THREE.LineCurve.prototype.getPointAt=function(a){return this.getPoint(a)
};THREE.LineCurve.prototype.getTangent=function(a){var b=this.v2.clone().sub(this.v1);
return b.normalize()};THREE.QuadraticBezierCurve=function(a,c,b){this.v0=a;this.v1=c;
this.v2=b};THREE.QuadraticBezierCurve.prototype=Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.constructor=THREE.QuadraticBezierCurve;THREE.QuadraticBezierCurve.prototype.getPoint=function(b){var a=new THREE.Vector2();
a.x=THREE.Shape.Utils.b2(b,this.v0.x,this.v1.x,this.v2.x);a.y=THREE.Shape.Utils.b2(b,this.v0.y,this.v1.y,this.v2.y);
return a};THREE.QuadraticBezierCurve.prototype.getTangent=function(b){var a=new THREE.Vector2();
a.x=THREE.Curve.Utils.tangentQuadraticBezier(b,this.v0.x,this.v1.x,this.v2.x);a.y=THREE.Curve.Utils.tangentQuadraticBezier(b,this.v0.y,this.v1.y,this.v2.y);
return a.normalize()};THREE.CubicBezierCurve=function(a,d,c,b){this.v0=a;this.v1=d;
this.v2=c;this.v3=b};THREE.CubicBezierCurve.prototype=Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.constructor=THREE.CubicBezierCurve;THREE.CubicBezierCurve.prototype.getPoint=function(c){var b,a;
b=THREE.Shape.Utils.b3(c,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Shape.Utils.b3(c,this.v0.y,this.v1.y,this.v2.y,this.v3.y);
return new THREE.Vector2(b,a)};THREE.CubicBezierCurve.prototype.getTangent=function(c){var b,a;
b=THREE.Curve.Utils.tangentCubicBezier(c,this.v0.x,this.v1.x,this.v2.x,this.v3.x);
a=THREE.Curve.Utils.tangentCubicBezier(c,this.v0.y,this.v1.y,this.v2.y,this.v3.y);
var d=new THREE.Vector2(b,a);d.normalize();return d};THREE.SplineCurve=function(a){this.points=(a==undefined)?[]:a
};THREE.SplineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.SplineCurve.prototype.constructor=THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint=function(j){var i=this.points;var h=(i.length-1)*j;
var a=Math.floor(h);var c=h-a;var g=i[a==0?a:a-1];var f=i[a];var e=i[a>i.length-2?i.length-1:a+1];
var d=i[a>i.length-3?i.length-1:a+2];var b=new THREE.Vector2();b.x=THREE.Curve.Utils.interpolate(g.x,f.x,e.x,d.x,c);
b.y=THREE.Curve.Utils.interpolate(g.y,f.y,e.y,d.y,c);return b};THREE.EllipseCurve=function(f,e,g,a,d,c,b){this.aX=f;
this.aY=e;this.xRadius=g;this.yRadius=a;this.aStartAngle=d;this.aEndAngle=c;this.aClockwise=b
};THREE.EllipseCurve.prototype=Object.create(THREE.Curve.prototype);THREE.EllipseCurve.prototype.constructor=THREE.EllipseCurve;
THREE.EllipseCurve.prototype.getPoint=function(b){var d=this.aEndAngle-this.aStartAngle;
if(d<0){d+=Math.PI*2}if(d>Math.PI*2){d-=Math.PI*2}var c;if(this.aClockwise===true){c=this.aEndAngle+(1-b)*(Math.PI*2-d)
}else{c=this.aStartAngle+b*d}var a=new THREE.Vector2();a.x=this.aX+this.xRadius*Math.cos(c);
a.y=this.aY+this.yRadius*Math.sin(c);return a};THREE.ArcCurve=function(e,d,f,c,b,a){THREE.EllipseCurve.call(this,e,d,f,f,c,b,a)
};THREE.ArcCurve.prototype=Object.create(THREE.EllipseCurve.prototype);THREE.ArcCurve.prototype.constructor=THREE.ArcCurve;
THREE.LineCurve3=THREE.Curve.create(function(b,a){this.v1=b;this.v2=a},function(b){var a=new THREE.Vector3();
a.subVectors(this.v2,this.v1);a.multiplyScalar(b);a.add(this.v1);return a});THREE.QuadraticBezierCurve3=THREE.Curve.create(function(a,c,b){this.v0=a;
this.v1=c;this.v2=b},function(b){var a=new THREE.Vector3();a.x=THREE.Shape.Utils.b2(b,this.v0.x,this.v1.x,this.v2.x);
a.y=THREE.Shape.Utils.b2(b,this.v0.y,this.v1.y,this.v2.y);a.z=THREE.Shape.Utils.b2(b,this.v0.z,this.v1.z,this.v2.z);
return a});THREE.CubicBezierCurve3=THREE.Curve.create(function(a,d,c,b){this.v0=a;
this.v1=d;this.v2=c;this.v3=b},function(b){var a=new THREE.Vector3();a.x=THREE.Shape.Utils.b3(b,this.v0.x,this.v1.x,this.v2.x,this.v3.x);
a.y=THREE.Shape.Utils.b3(b,this.v0.y,this.v1.y,this.v2.y,this.v3.y);a.z=THREE.Shape.Utils.b3(b,this.v0.z,this.v1.z,this.v2.z,this.v3.z);
return a});THREE.SplineCurve3=THREE.Curve.create(function(a){this.points=(a==undefined)?[]:a
},function(j){var i=this.points;var h=(i.length-1)*j;var a=Math.floor(h);var c=h-a;
var g=i[a==0?a:a-1];var f=i[a];var e=i[a>i.length-2?i.length-1:a+1];var d=i[a>i.length-3?i.length-1:a+2];
var b=new THREE.Vector3();b.x=THREE.Curve.Utils.interpolate(g.x,f.x,e.x,d.x,c);
b.y=THREE.Curve.Utils.interpolate(g.y,f.y,e.y,d.y,c);b.z=THREE.Curve.Utils.interpolate(g.z,f.z,e.z,d.z,c);
return b});THREE.ClosedSplineCurve3=THREE.Curve.create(function(a){this.points=(a==undefined)?[]:a
},function(j){var i=this.points;var h=(i.length-0)*j;var a=Math.floor(h);var c=h-a;
a+=a>0?0:(Math.floor(Math.abs(a)/i.length)+1)*i.length;var g=i[(a-1)%i.length];
var f=i[(a)%i.length];var e=i[(a+1)%i.length];var d=i[(a+2)%i.length];var b=new THREE.Vector3();
b.x=THREE.Curve.Utils.interpolate(g.x,f.x,e.x,d.x,c);b.y=THREE.Curve.Utils.interpolate(g.y,f.y,e.y,d.y,c);
b.z=THREE.Curve.Utils.interpolate(g.z,f.z,e.z,d.z,c);return b});THREE.AnimationHandler={LINEAR:0,CATMULLROM:1,CATMULLROM_FORWARD:2,add:function(){THREE.warn("THREE.AnimationHandler.add() has been deprecated.")
},get:function(){THREE.warn("THREE.AnimationHandler.get() has been deprecated.")
},remove:function(){THREE.warn("THREE.AnimationHandler.remove() has been deprecated.")
},animations:[],init:function(g){if(g.initialized===true){return g}for(var c=0;
c<g.hierarchy.length;c++){for(var b=0;b<g.hierarchy[c].keys.length;b++){if(g.hierarchy[c].keys[b].time<0){g.hierarchy[c].keys[b].time=0
}if(g.hierarchy[c].keys[b].rot!==undefined&&!(g.hierarchy[c].keys[b].rot instanceof THREE.Quaternion)){var f=g.hierarchy[c].keys[b].rot;
g.hierarchy[c].keys[b].rot=new THREE.Quaternion().fromArray(f)}}if(g.hierarchy[c].keys.length&&g.hierarchy[c].keys[0].morphTargets!==undefined){var e={};
for(var b=0;b<g.hierarchy[c].keys.length;b++){for(var a=0;a<g.hierarchy[c].keys[b].morphTargets.length;
a++){var i=g.hierarchy[c].keys[b].morphTargets[a];e[i]=-1}}g.hierarchy[c].usedMorphTargets=e;
for(var b=0;b<g.hierarchy[c].keys.length;b++){var d={};for(var i in e){for(var a=0;
a<g.hierarchy[c].keys[b].morphTargets.length;a++){if(g.hierarchy[c].keys[b].morphTargets[a]===i){d[i]=g.hierarchy[c].keys[b].morphTargetsInfluences[a];
break}}if(a===g.hierarchy[c].keys[b].morphTargets.length){d[i]=0}}g.hierarchy[c].keys[b].morphTargetsInfluences=d
}}for(var b=1;b<g.hierarchy[c].keys.length;b++){if(g.hierarchy[c].keys[b].time===g.hierarchy[c].keys[b-1].time){g.hierarchy[c].keys.splice(b,1);
b--}}for(var b=0;b<g.hierarchy[c].keys.length;b++){g.hierarchy[c].keys[b].index=b
}}g.initialized=true;return g},parse:function(c){var e=function(b,f){f.push(b);
for(var g=0;g<b.children.length;g++){e(b.children[g],f)}};var d=[];if(c instanceof THREE.SkinnedMesh){for(var a=0;
a<c.skeleton.bones.length;a++){d.push(c.skeleton.bones[a])}}else{e(c,d)}return d
},play:function(a){if(this.animations.indexOf(a)===-1){this.animations.push(a)}},stop:function(b){var a=this.animations.indexOf(b);
if(a!==-1){this.animations.splice(a,1)}},update:function(b){for(var a=0;a<this.animations.length;
a++){this.animations[a].resetBlendWeights()}for(var a=0;a<this.animations.length;
a++){this.animations[a].update(b)}}};THREE.Animation=function(a,b){this.root=a;
this.data=THREE.AnimationHandler.init(b);this.hierarchy=THREE.AnimationHandler.parse(a);
this.currentTime=0;this.timeScale=1;this.isPlaying=false;this.loop=true;this.weight=0;
this.interpolationType=THREE.AnimationHandler.LINEAR};THREE.Animation.prototype={constructor:THREE.Animation,keyTypes:["pos","rot","scl"],play:function(a,b){this.currentTime=a!==undefined?a:0;
this.weight=b!==undefined?b:1;this.isPlaying=true;this.reset();THREE.AnimationHandler.play(this)
},stop:function(){this.isPlaying=false;THREE.AnimationHandler.stop(this)},reset:function(){for(var e=0,c=this.hierarchy.length;
e<c;e++){var d=this.hierarchy[e];if(d.animationCache===undefined){d.animationCache={animations:{},blending:{positionWeight:0,quaternionWeight:0,scaleWeight:0}}
}var a=this.data.name;var i=d.animationCache.animations;var b=i[a];if(b===undefined){b={prevKey:{pos:0,rot:0,scl:0},nextKey:{pos:0,rot:0,scl:0},originalMatrix:d.matrix};
i[a]=b}for(var j=0;j<3;j++){var f=this.keyTypes[j];var k=this.data.hierarchy[e].keys[0];
var g=this.getNextKeyWith(f,e,1);while(g.time<this.currentTime&&g.index>k.index){k=g;
g=this.getNextKeyWith(f,e,g.index+1)}b.prevKey[f]=k;b.nextKey[f]=g}}},resetBlendWeights:function(){for(var e=0,a=this.hierarchy.length;
e<a;e++){var c=this.hierarchy[e];var b=c.animationCache;if(b!==undefined){var d=b.blending;
d.positionWeight=0;d.quaternionWeight=0;d.scaleWeight=0}}},update:(function(){var d=[];
var f=new THREE.Vector3();var a=new THREE.Vector3();var c=new THREE.Quaternion();
var e=function(s,h){var m=[],o=[],r,g,k,j,i,q,p,n,l;r=(s.length-1)*h;g=Math.floor(r);
k=r-g;m[0]=g===0?g:g-1;m[1]=g;m[2]=g>s.length-2?g:g+1;m[3]=g>s.length-3?g:g+2;q=s[m[0]];
p=s[m[1]];n=s[m[2]];l=s[m[3]];j=k*k;i=k*j;o[0]=b(q[0],p[0],n[0],l[0],k,j,i);o[1]=b(q[1],p[1],n[1],l[1],k,j,i);
o[2]=b(q[2],p[2],n[2],l[2],k,j,i);return o};var b=function(n,m,k,j,o,h,g){var l=(k-n)*0.5,i=(j-m)*0.5;
return(2*(m-k)+l+i)*g+(-3*(m-k)-2*l-i)*h+l*o+m};return function(A){if(this.isPlaying===false){return
}this.currentTime+=A*this.timeScale;if(this.weight===0){return}var g=this.data.length;
if(this.currentTime>g||this.currentTime<0){if(this.loop){this.currentTime%=g;if(this.currentTime<0){this.currentTime+=g
}this.reset()}else{this.stop()}}for(var u=0,j=this.hierarchy.length;u<j;u++){var D=this.hierarchy[u];
var q=D.animationCache.animations[this.data.name];var n=D.animationCache.blending;
for(var p=0;p<3;p++){var l=this.keyTypes[p];var C=q.prevKey[l];var m=q.nextKey[l];
if((this.timeScale>0&&m.time<=this.currentTime)||(this.timeScale<0&&C.time>=this.currentTime)){C=this.data.hierarchy[u].keys[0];
m=this.getNextKeyWith(l,u,1);while(m.time<this.currentTime&&m.index>C.index){C=m;
m=this.getNextKeyWith(l,u,m.index+1)}q.prevKey[l]=C;q.nextKey[l]=m}var E=(this.currentTime-C.time)/(m.time-C.time);
var r=C[l];var k=m[l];if(E<0){E=0}if(E>1){E=1}if(l==="pos"){if(this.interpolationType===THREE.AnimationHandler.LINEAR){a.x=r[0]+(k[0]-r[0])*E;
a.y=r[1]+(k[1]-r[1])*E;a.z=r[2]+(k[2]-r[2])*E;var s=this.weight/(this.weight+n.positionWeight);
D.position.lerp(a,s);n.positionWeight+=this.weight}else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){d[0]=this.getPrevKeyWith("pos",u,C.index-1)["pos"];
d[1]=r;d[2]=k;d[3]=this.getNextKeyWith("pos",u,m.index+1)["pos"];E=E*0.33+0.33;
var o=e(d,E);var s=this.weight/(this.weight+n.positionWeight);n.positionWeight+=this.weight;
var i=D.position;i.x=i.x+(o[0]-i.x)*s;i.y=i.y+(o[1]-i.y)*s;i.z=i.z+(o[2]-i.z)*s;
if(this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){var B=e(d,E*1.01);
f.set(B[0],B[1],B[2]);f.sub(i);f.y=0;f.normalize();var v=Math.atan2(f.x,f.z);D.rotation.set(0,v,0)
}}}}else{if(l==="rot"){THREE.Quaternion.slerp(r,k,c,E);if(n.quaternionWeight===0){D.quaternion.copy(c);
n.quaternionWeight=this.weight}else{var s=this.weight/(this.weight+n.quaternionWeight);
THREE.Quaternion.slerp(D.quaternion,c,D.quaternion,s);n.quaternionWeight+=this.weight
}}else{if(l==="scl"){a.x=r[0]+(k[0]-r[0])*E;a.y=r[1]+(k[1]-r[1])*E;a.z=r[2]+(k[2]-r[2])*E;
var s=this.weight/(this.weight+n.scaleWeight);D.scale.lerp(a,s);n.scaleWeight+=this.weight
}}}}}return true}})(),getNextKeyWith:function(c,b,a){var d=this.data.hierarchy[b].keys;
if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){a=a<d.length-1?a:d.length-1
}else{a=a%d.length}for(;a<d.length;a++){if(d[a][c]!==undefined){return d[a]}}return this.data.hierarchy[b].keys[0]
},getPrevKeyWith:function(c,b,a){var d=this.data.hierarchy[b].keys;if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){a=a>0?a:0
}else{a=a>=0?a:a+d.length}for(;a>=0;a--){if(d[a][c]!==undefined){return d[a]}}return this.data.hierarchy[b].keys[d.length-1]
}};THREE.KeyFrameAnimation=function(e){this.root=e.node;this.data=THREE.AnimationHandler.init(e);
this.hierarchy=THREE.AnimationHandler.parse(this.root);this.currentTime=0;this.timeScale=0.001;
this.isPlaying=false;this.isPaused=true;this.loop=true;for(var g=0,c=this.hierarchy.length;
g<c;g++){var i=this.data.hierarchy[g].keys,a=this.data.hierarchy[g].sids,d=this.hierarchy[g];
if(i.length&&a){for(var j=0;j<a.length;j++){var b=a[j],f=this.getNextKeyWith(b,g,0);
if(f){f.apply(b)}}d.matrixAutoUpdate=false;this.data.hierarchy[g].node.updateMatrix();
d.matrixWorldNeedsUpdate=true}}};THREE.KeyFrameAnimation.prototype={constructor:THREE.KeyFrameAnimation,play:function(d){this.currentTime=d!==undefined?d:0;
if(this.isPlaying===false){this.isPlaying=true;var c,a=this.hierarchy.length,b,f;
for(c=0;c<a;c++){b=this.hierarchy[c];f=this.data.hierarchy[c];if(f.animationCache===undefined){f.animationCache={};
f.animationCache.prevKey=null;f.animationCache.nextKey=null;f.animationCache.originalMatrix=b.matrix
}var e=this.data.hierarchy[c].keys;if(e.length){f.animationCache.prevKey=e[0];f.animationCache.nextKey=e[1];
this.startTime=Math.min(e[0].time,this.startTime);this.endTime=Math.max(e[e.length-1].time,this.endTime)
}}this.update(0)}this.isPaused=false;THREE.AnimationHandler.play(this)},stop:function(){this.isPlaying=false;
this.isPaused=false;THREE.AnimationHandler.stop(this);for(var b=0;b<this.data.hierarchy.length;
b++){var d=this.hierarchy[b];var c=this.data.hierarchy[b];if(c.animationCache!==undefined){var a=c.animationCache.originalMatrix;
a.copy(d.matrix);d.matrix=a;delete c.animationCache}}},update:function(i){if(this.isPlaying===false){return
}this.currentTime+=i*this.timeScale;var d=this.data.length;if(this.loop===true&&this.currentTime>d){this.currentTime%=d
}this.currentTime=Math.min(this.currentTime,d);for(var f=0,b=this.hierarchy.length;
f<b;f++){var e=this.hierarchy[f];var c=this.data.hierarchy[f];var j=c.keys,a=c.animationCache;
if(j.length){var k=a.prevKey;var g=a.nextKey;if(g.time<=this.currentTime){while(g.time<this.currentTime&&g.index>k.index){k=g;
g=j[k.index+1]}a.prevKey=k;a.nextKey=g}if(g.time>=this.currentTime){k.interpolate(g,this.currentTime)
}else{k.interpolate(g,g.time)}this.data.hierarchy[f].node.updateMatrix();e.matrixWorldNeedsUpdate=true
}}},getNextKeyWith:function(a,c,b){var d=this.data.hierarchy[c].keys;b=b%d.length;
for(;b<d.length;b++){if(d[b].hasTarget(a)){return d[b]}}return d[0]},getPrevKeyWith:function(a,c,b){var d=this.data.hierarchy[c].keys;
b=b>=0?b:b+d.length;for(;b>=0;b--){if(d[b].hasTarget(a)){return d[b]}}return d[d.length-1]
}};THREE.MorphAnimation=function(a){this.mesh=a;this.frames=a.morphTargetInfluences.length;
this.currentTime=0;this.duration=1000;this.loop=true;this.lastFrame=0;this.currentFrame=0;
this.isPlaying=false};THREE.MorphAnimation.prototype={constructor:THREE.MorphAnimation,play:function(){this.isPlaying=true
},pause:function(){this.isPlaying=false},update:function(d){if(this.isPlaying===false){return
}this.currentTime+=d;if(this.loop===true&&this.currentTime>this.duration){this.currentTime%=this.duration
}this.currentTime=Math.min(this.currentTime,this.duration);var a=this.duration/this.frames;
var c=Math.floor(this.currentTime/a);var b=this.mesh.morphTargetInfluences;if(c!=this.currentFrame){b[this.lastFrame]=0;
b[this.currentFrame]=1;b[c]=0;this.lastFrame=this.currentFrame;this.currentFrame=c
}b[c]=(this.currentTime%a)/a;b[this.lastFrame]=1-b[c]}};THREE.BoxGeometry=function(a,i,e,b,h,d){THREE.Geometry.call(this);
this.type="BoxGeometry";this.parameters={width:a,height:i,depth:e,widthSegments:b,heightSegments:h,depthSegments:d};
this.widthSegments=b||1;this.heightSegments=h||1;this.depthSegments=d||1;var k=this;
var j=a/2;var g=i/2;var c=e/2;f("z","y",-1,-1,e,i,j,0);f("z","y",1,-1,e,i,-j,1);
f("x","z",1,1,a,e,g,2);f("x","z",1,-1,a,e,-g,3);f("x","y",1,-1,a,i,c,4);f("x","y",-1,-1,a,i,-c,5);
function f(E,D,l,s,G,F,V,A){var C,q,p,K=k.widthSegments,I=k.heightSegments,r=G/2,o=F/2,t=k.vertices.length;
if((E==="x"&&D==="y")||(E==="y"&&D==="x")){C="z"}else{if((E==="x"&&D==="z")||(E==="z"&&D==="x")){C="y";
I=k.depthSegments}else{if((E==="z"&&D==="y")||(E==="y"&&D==="z")){C="x";K=k.depthSegments
}}}var M=K+1,n=I+1,U=G/K,P=F/I,T=new THREE.Vector3();T[C]=V>0?1:-1;for(p=0;p<n;
p++){for(q=0;q<M;q++){var m=new THREE.Vector3();m[E]=(q*U-r)*l;m[D]=(p*P-o)*s;m[C]=V;
k.vertices.push(m)}}for(p=0;p<I;p++){for(q=0;q<K;q++){var S=q+M*p;var R=q+M*(p+1);
var Q=(q+1)+M*(p+1);var O=(q+1)+M*p;var N=new THREE.Vector2(q/K,1-p/I);var L=new THREE.Vector2(q/K,1-(p+1)/I);
var J=new THREE.Vector2((q+1)/K,1-(p+1)/I);var H=new THREE.Vector2((q+1)/K,1-p/I);
var B=new THREE.Face3(S+t,R+t,O+t);B.normal.copy(T);B.vertexNormals.push(T.clone(),T.clone(),T.clone());
B.materialIndex=A;k.faces.push(B);k.faceVertexUvs[0].push([N,L,H]);B=new THREE.Face3(R+t,Q+t,O+t);
B.normal.copy(T);B.vertexNormals.push(T.clone(),T.clone(),T.clone());B.materialIndex=A;
k.faces.push(B);k.faceVertexUvs[0].push([L.clone(),J,H.clone()])}}}this.mergeVertices()
};THREE.BoxGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.BoxGeometry.prototype.constructor=THREE.BoxGeometry;
THREE.CircleGeometry=function(k,g,d,b){THREE.Geometry.call(this);this.type="CircleGeometry";
this.parameters={radius:k,segments:g,thetaStart:d,thetaLength:b};k=k||50;g=g!==undefined?Math.max(3,g):8;
d=d!==undefined?d:0;b=b!==undefined?b:Math.PI*2;var f,e=[],a=new THREE.Vector3(),l=new THREE.Vector2(0.5,0.5);
this.vertices.push(a);e.push(l);for(f=0;f<=g;f++){var j=new THREE.Vector3();var h=d+f/g*b;
j.x=k*Math.cos(h);j.y=k*Math.sin(h);this.vertices.push(j);e.push(new THREE.Vector2((j.x/k+1)/2,(j.y/k+1)/2))
}var c=new THREE.Vector3(0,0,1);for(f=1;f<=g;f++){this.faces.push(new THREE.Face3(f,f+1,0,[c.clone(),c.clone(),c.clone()]));
this.faceVertexUvs[0].push([e[f].clone(),e[f+1].clone(),l.clone()])}this.computeFaceNormals();
this.boundingSphere=new THREE.Sphere(new THREE.Vector3(),k)};THREE.CircleGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry.prototype.constructor=THREE.CircleGeometry;THREE.CubeGeometry=function(c,a,f,e,d,b){THREE.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry.");
return new THREE.BoxGeometry(c,a,f,e,d,b)};THREE.CylinderGeometry=function(l,N,C,e,A,K,g,D){THREE.Geometry.call(this);
this.type="CylinderGeometry";this.parameters={radiusTop:l,radiusBottom:N,height:C,radialSegments:e,heightSegments:A,openEnded:K,thetaStart:g,thetaLength:D};
l=l!==undefined?l:20;N=N!==undefined?N:20;C=C!==undefined?C:100;e=e||8;A=A||1;K=K!==undefined?K:false;
g=g!==undefined?g:0;D=D!==undefined?D:2*Math.PI;var E=C/2;var q,p,h=[],r=[];for(p=0;
p<=A;p++){var B=[];var M=[];var s=p/A;var f=s*(N-l)+l;for(q=0;q<=e;q++){var t=q/e;
var I=new THREE.Vector3();I.x=f*Math.sin(t*D+g);I.y=-s*C+E;I.z=f*Math.cos(t*D+g);
this.vertices.push(I);B.push(this.vertices.length-1);M.push(new THREE.Vector2(t,1-s))
}h.push(B);r.push(M)}var G=(N-l)/C;var n,k;for(q=0;q<e;q++){if(l!==0){n=this.vertices[h[0][q]].clone();
k=this.vertices[h[0][q+1]].clone()}else{n=this.vertices[h[1][q]].clone();k=this.vertices[h[1][q+1]].clone()
}n.setY(Math.sqrt(n.x*n.x+n.z*n.z)*G).normalize();k.setY(Math.sqrt(k.x*k.x+k.z*k.z)*G).normalize();
for(p=0;p<A;p++){var d=h[p][q];var c=h[p+1][q];var b=h[p+1][q+1];var a=h[p][q+1];
var o=n.clone();var m=n.clone();var j=k.clone();var i=k.clone();var L=r[p][q].clone();
var J=r[p+1][q].clone();var H=r[p+1][q+1].clone();var F=r[p][q+1].clone();this.faces.push(new THREE.Face3(d,c,a,[o,m,i]));
this.faceVertexUvs[0].push([L,J,F]);this.faces.push(new THREE.Face3(c,b,a,[m.clone(),j,i.clone()]));
this.faceVertexUvs[0].push([J.clone(),H,F.clone()])}}if(K===false&&l>0){this.vertices.push(new THREE.Vector3(0,E,0));
for(q=0;q<e;q++){var d=h[0][q];var c=h[0][q+1];var b=this.vertices.length-1;var o=new THREE.Vector3(0,1,0);
var m=new THREE.Vector3(0,1,0);var j=new THREE.Vector3(0,1,0);var L=r[0][q].clone();
var J=r[0][q+1].clone();var H=new THREE.Vector2(J.x,0);this.faces.push(new THREE.Face3(d,c,b,[o,m,j]));
this.faceVertexUvs[0].push([L,J,H])}}if(K===false&&N>0){this.vertices.push(new THREE.Vector3(0,-E,0));
for(q=0;q<e;q++){var d=h[A][q+1];var c=h[A][q];var b=this.vertices.length-1;var o=new THREE.Vector3(0,-1,0);
var m=new THREE.Vector3(0,-1,0);var j=new THREE.Vector3(0,-1,0);var L=r[A][q+1].clone();
var J=r[A][q].clone();var H=new THREE.Vector2(J.x,1);this.faces.push(new THREE.Face3(d,c,b,[o,m,j]));
this.faceVertexUvs[0].push([L,J,H])}}this.computeFaceNormals()};THREE.CylinderGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry.prototype.constructor=THREE.CylinderGeometry;THREE.ExtrudeGeometry=function(a,b){if(typeof(a)==="undefined"){a=[];
return}THREE.Geometry.call(this);this.type="ExtrudeGeometry";a=a instanceof Array?a:[a];
this.addShapeList(a,b);this.computeFaceNormals()};THREE.ExtrudeGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.constructor=THREE.ExtrudeGeometry;THREE.ExtrudeGeometry.prototype.addShapeList=function(b,d){var a=b.length;
for(var e=0;e<a;e++){var c=b[e];this.addShape(c,d)}};THREE.ExtrudeGeometry.prototype.addShape=function(E,J){var f=J.amount!==undefined?J.amount:100;
var e=J.bevelThickness!==undefined?J.bevelThickness:6;var K=J.bevelSize!==undefined?J.bevelSize:e-2;
var B=J.bevelSegments!==undefined?J.bevelSegments:3;var a=J.bevelEnabled!==undefined?J.bevelEnabled:true;
var I=J.curveSegments!==undefined?J.curveSegments:12;var Q=J.steps!==undefined?J.steps:1;
var q=J.extrudePath;var O,r=false;var ad=J.material;var n=J.extrudeMaterial;var D=J.UVGenerator!==undefined?J.UVGenerator:THREE.ExtrudeGeometry.WorldUVGenerator;
var A,S,W,al;if(q){O=q.getSpacedPoints(Q);r=true;a=false;A=J.frames!==undefined?J.frames:new THREE.TubeGeometry.FrenetFrames(q,Q,false);
S=new THREE.Vector3();W=new THREE.Vector3();al=new THREE.Vector3()}if(!a){B=0;e=0;
K=0}var ao,aj,ak;var R=this;var P=this.vertices.length;var C=E.extractPoints(I);
var c=C.shape;var G=C.holes;var Z=!THREE.Shape.Utils.isClockWise(c);if(Z){c=c.reverse();
for(aj=0,ak=G.length;aj<ak;aj++){ao=G[aj];if(THREE.Shape.Utils.isClockWise(ao)){G[aj]=ao.reverse()
}}Z=false}var p=THREE.Shape.Utils.triangulateShape(c,G);var ac=c;for(aj=0,ak=G.length;
aj<ak;aj++){ao=G[aj];c=c.concat(ao)}function L(i,h,b){if(!h){THREE.error("THREE.ExtrudeGeometry: vec does not exist")
}return h.clone().multiplyScalar(b).add(i)}var an,aa,X,T,u,ab=c.length,o,m=p.length;
function F(j,ar,at){var au=1e-10;var az,ax,aA=1;var aq=j.x-ar.x,ap=j.y-ar.y;var aC=at.x-j.x,aB=at.y-j.y;
var v=(aq*aq+ap*ap);var ay=(aq*aB-ap*aC);if(Math.abs(ay)>au){var av=Math.sqrt(v);
var b=Math.sqrt(aC*aC+aB*aB);var t=(ar.x-ap/av);var s=(ar.y+aq/av);var i=(at.x-aB/b);
var h=(at.y+aC/b);var aD=((i-t)*aB-(h-s)*aC)/(aq*aB-ap*aC);az=(t+aq*aD-j.x);ax=(s+ap*aD-j.y);
var aw=(az*az+ax*ax);if(aw<=2){return new THREE.Vector2(az,ax)}else{aA=Math.sqrt(aw/2)
}}else{var k=false;if(aq>au){if(aC>au){k=true}}else{if(aq<-au){if(aC<-au){k=true
}}else{if(Math.sign(ap)==Math.sign(aB)){k=true}}}if(k){az=-ap;ax=aq;aA=Math.sqrt(v)
}else{az=aq;ax=ap;aA=Math.sqrt(v/2)}}return new THREE.Vector2(az/aA,ax/aA)}var ag=[];
for(var ai=0,N=ac.length,af=N-1,ae=ai+1;ai<N;ai++,af++,ae++){if(af===N){af=0}if(ae===N){ae=0
}ag[ai]=F(ac[ai],ac[af],ac[ae])}var M=[],V,d=ag.concat();for(aj=0,ak=G.length;aj<ak;
aj++){ao=G[aj];V=[];for(ai=0,N=ao.length,af=N-1,ae=ai+1;ai<N;ai++,af++,ae++){if(af===N){af=0
}if(ae===N){ae=0}V[ai]=F(ao[ai],ao[af],ao[ae])}M.push(V);d=d.concat(V)}for(an=0;
an<B;an++){X=an/B;T=e*(1-X);aa=K*(Math.sin(X*Math.PI/2));for(ai=0,N=ac.length;ai<N;
ai++){u=L(ac[ai],ag[ai],aa);U(u.x,u.y,-T)}for(aj=0,ak=G.length;aj<ak;aj++){ao=G[aj];
V=M[aj];for(ai=0,N=ao.length;ai<N;ai++){u=L(ao[ai],V[ai],aa);U(u.x,u.y,-T)}}}aa=K;
for(ai=0;ai<ab;ai++){u=a?L(c[ai],d[ai],aa):c[ai];if(!r){U(u.x,u.y,0)}else{W.copy(A.normals[0]).multiplyScalar(u.x);
S.copy(A.binormals[0]).multiplyScalar(u.y);al.copy(O[0]).add(W).add(S);U(al.x,al.y,al.z)
}}var Y;for(Y=1;Y<=Q;Y++){for(ai=0;ai<ab;ai++){u=a?L(c[ai],d[ai],aa):c[ai];if(!r){U(u.x,u.y,f/Q*Y)
}else{W.copy(A.normals[Y]).multiplyScalar(u.x);S.copy(A.binormals[Y]).multiplyScalar(u.y);
al.copy(O[Y]).add(W).add(S);U(al.x,al.y,al.z)}}}for(an=B-1;an>=0;an--){X=an/B;T=e*(1-X);
aa=K*Math.sin(X*Math.PI/2);for(ai=0,N=ac.length;ai<N;ai++){u=L(ac[ai],ag[ai],aa);
U(u.x,u.y,f+T)}for(aj=0,ak=G.length;aj<ak;aj++){ao=G[aj];V=M[aj];for(ai=0,N=ao.length;
ai<N;ai++){u=L(ao[ai],V[ai],aa);if(!r){U(u.x,u.y,f+T)}else{U(u.x,u.y+O[Q-1].y,O[Q-1].x+T)
}}}}H();am();function H(){if(a){var b=0;var h=ab*b;for(ai=0;ai<m;ai++){o=p[ai];
l(o[2]+h,o[1]+h,o[0]+h)}b=Q+B*2;h=ab*b;for(ai=0;ai<m;ai++){o=p[ai];l(o[0]+h,o[1]+h,o[2]+h)
}}else{for(ai=0;ai<m;ai++){o=p[ai];l(o[2],o[1],o[0])}for(ai=0;ai<m;ai++){o=p[ai];
l(o[0]+ab*Q,o[1]+ab*Q,o[2]+ab*Q)}}}function am(){var b=0;ah(ac,b);b+=ac.length;
for(aj=0,ak=G.length;aj<ak;aj++){ao=G[aj];ah(ao,b);b+=ao.length}}function ah(ar,h){var ap,v;
ai=ar.length;while(--ai>=0){ap=ai;v=ai-1;if(v<0){v=ar.length-1}var ax=0,i=Q+B*2;
for(ax=0;ax<i;ax++){var aq=ab*ax;var t=ab*(ax+1);var aw=h+ap+aq,av=h+v+aq,au=h+v+t,at=h+ap+t;
g(aw,av,au,at,ar,ax,i,ap,v)}}}function U(b,i,h){R.vertices.push(new THREE.Vector3(b,i,h))
}function l(i,h,k){i+=P;h+=P;k+=P;R.faces.push(new THREE.Face3(i,h,k,null,null,ad));
var j=D.generateTopUV(R,i,h,k);R.faceVertexUvs[0].push(j)}function g(aq,ap,t,s,h,j,ar,v,k){aq+=P;
ap+=P;t+=P;s+=P;R.faces.push(new THREE.Face3(aq,ap,s,null,null,n));R.faces.push(new THREE.Face3(ap,t,s,null,null,n));
var i=D.generateSideWallUV(R,aq,ap,t,s);R.faceVertexUvs[0].push([i[0],i[1],i[3]]);
R.faceVertexUvs[0].push([i[1],i[2],i[3]])}};THREE.ExtrudeGeometry.WorldUVGenerator={generateTopUV:function(j,i,h,g){var f=j.vertices;
var e=f[i];var d=f[h];var k=f[g];return[new THREE.Vector2(e.x,e.y),new THREE.Vector2(d.x,d.y),new THREE.Vector2(k.x,k.y)]
},generateSideWallUV:function(h,n,m,l,k){var e=h.vertices;var j=e[n];var i=e[m];
var g=e[l];var f=e[k];if(Math.abs(j.y-i.y)<0.01){return[new THREE.Vector2(j.x,1-j.z),new THREE.Vector2(i.x,1-i.z),new THREE.Vector2(g.x,1-g.z),new THREE.Vector2(f.x,1-f.z)]
}else{return[new THREE.Vector2(j.y,1-j.z),new THREE.Vector2(i.y,1-i.z),new THREE.Vector2(g.y,1-g.z),new THREE.Vector2(f.y,1-f.z)]
}}};THREE.ShapeGeometry=function(a,b){THREE.Geometry.call(this);this.type="ShapeGeometry";
if(a instanceof Array===false){a=[a]}this.addShapeList(a,b);this.computeFaceNormals()
};THREE.ShapeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ShapeGeometry.prototype.constructor=THREE.ShapeGeometry;
THREE.ShapeGeometry.prototype.addShapeList=function(b,c){for(var d=0,a=b.length;
d<a;d++){this.addShape(b[d],c)}return this};THREE.ShapeGeometry.prototype.addShape=function(e,g){if(g===undefined){g={}
}var d=g.curveSegments!==undefined?g.curveSegments:12;var p=g.material;var u=g.UVGenerator===undefined?THREE.ExtrudeGeometry.WorldUVGenerator:g.UVGenerator;
var t,s,q;var o=this.vertices.length;var A=e.extractPoints(d);var h=A.shape;var k=A.holes;
var n=!THREE.Shape.Utils.isClockWise(h);if(n){h=h.reverse();for(t=0,s=k.length;
t<s;t++){q=k[t];if(THREE.Shape.Utils.isClockWise(q)){k[t]=q.reverse()}}n=false}var f=THREE.Shape.Utils.triangulateShape(h,k);
var r=h;for(t=0,s=k.length;t<s;t++){q=k[t];h=h.concat(q)}var v,j=h.length;var m,E=f.length;
for(t=0;t<j;t++){v=h[t];this.vertices.push(new THREE.Vector3(v.x,v.y,0))}for(t=0;
t<E;t++){m=f[t];var D=m[0]+o;var C=m[1]+o;var B=m[2]+o;this.faces.push(new THREE.Face3(D,C,B,null,null,p));
this.faceVertexUvs[0].push(u.generateTopUV(this,D,C,B))}};THREE.LatheGeometry=function(t,q,n,p){THREE.Geometry.call(this);
this.type="LatheGeometry";this.parameters={points:t,segments:q,phiStart:n,phiLength:p};
q=q||12;n=n||0;p=p||2*Math.PI;var E=1/(t.length-1);var D=1/q;for(var u=0,l=q;u<=l;
u++){var g=n+u*D*p;var G=Math.cos(g),m=Math.sin(g);for(var r=0,A=t.length;r<A;r++){var o=t[r];
var C=new THREE.Vector3();C.x=G*o.x-m*o.y;C.y=m*o.x+G*o.y;C.z=o.z;this.vertices.push(C)
}}var e=t.length;for(var u=0,l=q;u<l;u++){for(var r=0,A=t.length-1;r<A;r++){var k=r+e*u;
var I=k;var H=k+e;var G=k+1+e;var F=k+1;var B=u*D;var h=r*E;var v=B+D;var f=h+E;
this.faces.push(new THREE.Face3(I,H,F));this.faceVertexUvs[0].push([new THREE.Vector2(B,h),new THREE.Vector2(v,h),new THREE.Vector2(B,f)]);
this.faces.push(new THREE.Face3(H,G,F));this.faceVertexUvs[0].push([new THREE.Vector2(v,h),new THREE.Vector2(v,f),new THREE.Vector2(B,f)])
}}this.mergeVertices();this.computeFaceNormals();this.computeVertexNormals()};THREE.LatheGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.LatheGeometry.prototype.constructor=THREE.LatheGeometry;THREE.PlaneGeometry=function(b,a,d,c){THREE.Geometry.call(this);
this.type="PlaneGeometry";this.parameters={width:b,height:a,widthSegments:d,heightSegments:c};
this.fromBufferGeometry(new THREE.PlaneBufferGeometry(b,a,d,c))};THREE.PlaneGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry.prototype.constructor=THREE.PlaneGeometry;THREE.PlaneBufferGeometry=function(t,r,f,q){THREE.BufferGeometry.call(this);
this.type="PlaneBufferGeometry";this.parameters={width:t,height:r,widthSegments:f,heightSegments:q};
var j=t/2;var h=r/2;var A=f||1;var v=q||1;var B=A+1;var e=v+1;var H=t/A;var D=r/v;
var m=new Float32Array(B*e*3);var s=new Float32Array(B*e*3);var p=new Float32Array(B*e*2);
var l=0;var u=0;for(var g=0;g<e;g++){var n=g*D-h;for(var i=0;i<B;i++){var o=i*H-j;
m[l]=o;m[l+1]=-n;s[l+2]=1;p[u]=i/A;p[u+1]=1-(g/v);l+=3;u+=2}}l=0;var k=new ((m.length/3)>65535?Uint32Array:Uint16Array)(A*v*6);
for(var g=0;g<v;g++){for(var i=0;i<A;i++){var G=i+B*g;var F=i+B*(g+1);var E=(i+1)+B*(g+1);
var C=(i+1)+B*g;k[l]=G;k[l+1]=F;k[l+2]=C;k[l+3]=F;k[l+4]=E;k[l+5]=C;l+=6}}this.addAttribute("index",new THREE.BufferAttribute(k,1));
this.addAttribute("position",new THREE.BufferAttribute(m,3));this.addAttribute("normal",new THREE.BufferAttribute(s,3));
this.addAttribute("uv",new THREE.BufferAttribute(p,2))};THREE.PlaneBufferGeometry.prototype=Object.create(THREE.BufferGeometry.prototype);
THREE.PlaneBufferGeometry.prototype.constructor=THREE.PlaneBufferGeometry;THREE.RingGeometry=function(k,r,g,s,h,p){THREE.Geometry.call(this);
this.type="RingGeometry";this.parameters={innerRadius:k,outerRadius:r,thetaSegments:g,phiSegments:s,thetaStart:h,thetaLength:p};
k=k||0;r=r||50;h=h!==undefined?h:0;p=p!==undefined?p:Math.PI*2;g=g!==undefined?Math.max(3,g):8;
s=s!==undefined?Math.max(1,s):8;var t,m,l=[],f=k,j=((r-k)/s);for(t=0;t<s+1;t++){for(m=0;
m<g+1;m++){var u=new THREE.Vector3();var c=h+m/g*p;u.x=f*Math.cos(c);u.y=f*Math.sin(c);
this.vertices.push(u);l.push(new THREE.Vector2((u.x/r+1)/2,(u.y/r+1)/2))}f+=j}var q=new THREE.Vector3(0,0,1);
for(t=0;t<s;t++){var a=t*(g+1);for(m=0;m<g;m++){var c=m+a;var e=c;var d=c+g+1;var b=c+g+2;
this.faces.push(new THREE.Face3(e,d,b,[q.clone(),q.clone(),q.clone()]));this.faceVertexUvs[0].push([l[e].clone(),l[d].clone(),l[b].clone()]);
e=c;d=c+g+2;b=c+1;this.faces.push(new THREE.Face3(e,d,b,[q.clone(),q.clone(),q.clone()]));
this.faceVertexUvs[0].push([l[e].clone(),l[d].clone(),l[b].clone()])}}this.computeFaceNormals();
this.boundingSphere=new THREE.Sphere(new THREE.Vector3(),f)};THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.RingGeometry.prototype.constructor=THREE.RingGeometry;THREE.SphereGeometry=function(f,e,r,t,B,g,A){THREE.Geometry.call(this);
this.type="SphereGeometry";this.parameters={radius:f,widthSegments:e,heightSegments:r,phiStart:t,phiLength:B,thetaStart:g,thetaLength:A};
f=f||50;e=Math.max(3,Math.floor(e)||8);r=Math.max(2,Math.floor(r)||6);t=t!==undefined?t:0;
B=B!==undefined?B:Math.PI*2;g=g!==undefined?g:0;A=A!==undefined?A:Math.PI;var n,m,h=[],o=[];
for(m=0;m<=r;m++){var s=[];var H=[];for(n=0;n<=e;n++){var q=n/e;var p=m/r;var E=new THREE.Vector3();
E.x=-f*Math.cos(t+q*B)*Math.sin(g+p*A);E.y=f*Math.cos(g+p*A);E.z=f*Math.sin(t+q*B)*Math.sin(g+p*A);
this.vertices.push(E);s.push(this.vertices.length-1);H.push(new THREE.Vector2(q,1-p))
}h.push(s);o.push(H)}for(m=0;m<r;m++){for(n=0;n<e;n++){var d=h[m][n+1];var c=h[m][n];
var b=h[m+1][n];var a=h[m+1][n+1];var l=this.vertices[d].clone().normalize();var k=this.vertices[c].clone().normalize();
var j=this.vertices[b].clone().normalize();var i=this.vertices[a].clone().normalize();
var G=o[m][n+1].clone();var F=o[m][n].clone();var D=o[m+1][n].clone();var C=o[m+1][n+1].clone();
if(Math.abs(this.vertices[d].y)===f){G.x=(G.x+F.x)/2;this.faces.push(new THREE.Face3(d,b,a,[l,j,i]));
this.faceVertexUvs[0].push([G,D,C])}else{if(Math.abs(this.vertices[b].y)===f){D.x=(D.x+C.x)/2;
this.faces.push(new THREE.Face3(d,c,b,[l,k,j]));this.faceVertexUvs[0].push([G,F,D])
}else{this.faces.push(new THREE.Face3(d,c,a,[l,k,i]));this.faceVertexUvs[0].push([G,F,C]);
this.faces.push(new THREE.Face3(c,b,a,[k.clone(),j,i.clone()]));this.faceVertexUvs[0].push([F.clone(),D,C.clone()])
}}}}this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3(),f)
};THREE.SphereGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.SphereGeometry.prototype.constructor=THREE.SphereGeometry;
THREE.TextGeometry=function(b,a){a=a||{};var c=THREE.FontUtils.generateShapes(b,a);
a.amount=a.height!==undefined?a.height:50;if(a.bevelThickness===undefined){a.bevelThickness=10
}if(a.bevelSize===undefined){a.bevelSize=8}if(a.bevelEnabled===undefined){a.bevelEnabled=false
}THREE.ExtrudeGeometry.call(this,c,a);this.type="TextGeometry"};THREE.TextGeometry.prototype=Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TextGeometry.prototype.constructor=THREE.TextGeometry;THREE.TorusGeometry=function(g,f,e,l,h){THREE.Geometry.call(this);
this.type="TorusGeometry";this.parameters={radius:g,tube:f,radialSegments:e,tubularSegments:l,arc:h};
g=g||100;f=f||40;e=e||8;l=l||6;h=h||Math.PI*2;var C=new THREE.Vector3(),m=[],p=[];
for(var q=0;q<=e;q++){for(var r=0;r<=l;r++){var o=r/l*h;var n=q/e*Math.PI*2;C.x=g*Math.cos(o);
C.y=g*Math.sin(o);var s=new THREE.Vector3();s.x=(g+f*Math.cos(n))*Math.cos(o);s.y=(g+f*Math.cos(n))*Math.sin(o);
s.z=f*Math.sin(n);this.vertices.push(s);m.push(new THREE.Vector2(r/l,q/e));p.push(s.clone().sub(C).normalize())
}}for(var q=1;q<=e;q++){for(var r=1;r<=l;r++){var D=(l+1)*q+r-1;var B=(l+1)*(q-1)+r-1;
var A=(l+1)*(q-1)+r;var t=(l+1)*q+r;var k=new THREE.Face3(D,B,t,[p[D].clone(),p[B].clone(),p[t].clone()]);
this.faces.push(k);this.faceVertexUvs[0].push([m[D].clone(),m[B].clone(),m[t].clone()]);
k=new THREE.Face3(B,A,t,[p[B].clone(),p[A].clone(),p[t].clone()]);this.faces.push(k);
this.faceVertexUvs[0].push([m[B].clone(),m[A].clone(),m[t].clone()])}}this.computeFaceNormals()
};THREE.TorusGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TorusGeometry.prototype.constructor=THREE.TorusGeometry;
THREE.TorusKnotGeometry=function(s,r,m,B,F,E,f){THREE.Geometry.call(this);this.type="TorusKnotGeometry";
this.parameters={radius:s,tube:r,radialSegments:m,tubularSegments:B,p:F,q:E,heightScale:f};
s=s||100;r=r||40;m=m||64;B=B||8;F=F||2;E=E||3;f=f||1;var e=new Array(m);var o=new THREE.Vector3();
var G=new THREE.Vector3();var T=new THREE.Vector3();for(var K=0;K<m;++K){e[K]=new Array(B);
var D=K/m*2*F*Math.PI;var h=L(D,E,F,s,f);var g=L(D+0.01,E,F,s,f);o.subVectors(g,h);
G.addVectors(g,h);T.crossVectors(o,G);G.crossVectors(T,o);T.normalize();G.normalize();
for(var I=0;I<B;++I){var C=I/B*2*Math.PI;var l=-r*Math.cos(C);var k=r*Math.sin(C);
var t=new THREE.Vector3();t.x=h.x+l*G.x+k*T.x;t.y=h.y+l*G.y+k*T.y;t.z=h.z+l*G.z+k*T.z;
e[K][I]=this.vertices.push(t)-1}}for(var K=0;K<m;++K){for(var I=0;I<B;++I){var A=(K+1)%m;
var H=(I+1)%B;var S=e[K][I];var R=e[A][I];var Q=e[A][H];var P=e[K][H];var O=new THREE.Vector2(K/m,I/B);
var N=new THREE.Vector2((K+1)/m,I/B);var M=new THREE.Vector2((K+1)/m,(I+1)/B);var J=new THREE.Vector2(K/m,(I+1)/B);
this.faces.push(new THREE.Face3(S,R,P));this.faceVertexUvs[0].push([O,N,J]);this.faces.push(new THREE.Face3(R,Q,P));
this.faceVertexUvs[0].push([N.clone(),M,J.clone()])}}this.computeFaceNormals();
this.computeVertexNormals();function L(U,p,v,q,a){var j=Math.cos(U);var V=Math.sin(U);
var i=p/v*U;var n=Math.cos(i);var d=q*(2+n)*0.5*j;var c=q*(2+n)*V*0.5;var b=a*q*Math.sin(i)*0.5;
return new THREE.Vector3(d,c,b)}};THREE.TorusKnotGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry.prototype.constructor=THREE.TorusKnotGeometry;THREE.TubeGeometry=function(K,h,J,E,I,S){THREE.Geometry.call(this);
this.type="TubeGeometry";this.parameters={path:K,segments:h,radius:J,radialSegments:E,closed:I};
h=h||64;J=J||1;E=E||8;I=I||false;S=S||THREE.TubeGeometry.NoTaper;var G=[];var A=this,C,H,B,e=h+1,F,D,L,o,n,t,f=new THREE.Vector3(),N,M,s,g,W,V,U,T,R,Q,P,O;
var p=new THREE.TubeGeometry.FrenetFrames(K,h,I),q=p.tangents,m=p.normals,l=p.binormals;
this.tangents=q;this.normals=m;this.binormals=l;function k(a,c,b){return A.vertices.push(new THREE.Vector3(a,c,b))-1
}for(N=0;N<e;N++){G[N]=[];F=N/(e-1);t=K.getPointAt(F);C=q[N];H=m[N];B=l[N];L=J*S(F);
for(M=0;M<E;M++){D=M/E*2*Math.PI;o=-L*Math.cos(D);n=L*Math.sin(D);f.copy(t);f.x+=o*H.x+n*B.x;
f.y+=o*H.y+n*B.y;f.z+=o*H.z+n*B.z;G[N][M]=k(f.x,f.y,f.z)}}for(N=0;N<h;N++){for(M=0;
M<E;M++){s=(I)?(N+1)%h:N+1;g=(M+1)%E;W=G[N][M];V=G[s][M];U=G[s][g];T=G[N][g];R=new THREE.Vector2(N/h,M/E);
Q=new THREE.Vector2((N+1)/h,M/E);P=new THREE.Vector2((N+1)/h,(M+1)/E);O=new THREE.Vector2(N/h,(M+1)/E);
this.faces.push(new THREE.Face3(W,V,T));this.faceVertexUvs[0].push([R,Q,O]);this.faces.push(new THREE.Face3(V,U,T));
this.faceVertexUvs[0].push([Q.clone(),P,O.clone()])}}this.computeFaceNormals();
this.computeVertexNormals()};THREE.TubeGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.prototype.constructor=THREE.TubeGeometry;THREE.TubeGeometry.NoTaper=function(a){return 1
};THREE.TubeGeometry.SinusoidalTaper=function(a){return Math.sin(Math.PI*a)};THREE.TubeGeometry.FrenetFrames=function(k,m,c){var s=new THREE.Vector3(),l=[],j=[],d=[],h=new THREE.Vector3(),o=new THREE.Matrix4(),b=m+1,e,t=0.0001,a,r,q,p,n,g;
this.tangents=l;this.normals=j;this.binormals=d;for(n=0;n<b;n++){g=n/(b-1);l[n]=k.getTangentAt(g);
l[n].normalize()}f();function f(){j[0]=new THREE.Vector3();d[0]=new THREE.Vector3();
a=Number.MAX_VALUE;r=Math.abs(l[0].x);q=Math.abs(l[0].y);p=Math.abs(l[0].z);if(r<=a){a=r;
s.set(1,0,0)}if(q<=a){a=q;s.set(0,1,0)}if(p<=a){s.set(0,0,1)}h.crossVectors(l[0],s).normalize();
j[0].crossVectors(l[0],h);d[0].crossVectors(l[0],j[0])}for(n=1;n<b;n++){j[n]=j[n-1].clone();
d[n]=d[n-1].clone();h.crossVectors(l[n-1],l[n]);if(h.length()>t){h.normalize();
e=Math.acos(THREE.Math.clamp(l[n-1].dot(l[n]),-1,1));j[n].applyMatrix4(o.makeRotationAxis(h,e))
}d[n].crossVectors(l[n],j[n])}if(c){e=Math.acos(THREE.Math.clamp(j[0].dot(j[b-1]),-1,1));
e/=(b-1);if(l[0].dot(h.crossVectors(j[0],j[b-1]))>0){e=-e}for(n=1;n<b;n++){j[n].applyMatrix4(o.makeRotationAxis(l[n],e*n));
d[n].crossVectors(l[n],j[n])}}};THREE.PolyhedronGeometry=function(n,m,k,H){THREE.Geometry.call(this);
this.type="PolyhedronGeometry";this.parameters={vertices:n,indices:m,radius:k,detail:H};
k=k||1;H=H||0;var o=this;for(var C=0,v=n.length;C<v;C+=3){e(new THREE.Vector3(n[C],n[C+1],n[C+2]))
}var t=this.vertices;var c=[];for(var C=0,A=0,v=m.length;C<v;C+=3,A++){var g=t[m[C]];
var f=t[m[C+1]];var b=t[m[C+2]];c[A]=new THREE.Face3(g.index,f.index,b.index,[g.clone(),f.clone(),b.clone()])
}var s=new THREE.Vector3();for(var C=0,v=c.length;C<v;C++){q(c[C],H)}for(var C=0,v=this.faceVertexUvs[0].length;
C<v;C++){var r=this.faceVertexUvs[0][C];var G=r[0].x;var F=r[1].x;var E=r[2].x;
var B=Math.max(G,Math.max(F,E));var u=Math.min(G,Math.min(F,E));if(B>0.9&&u<0.1){if(G<0.2){r[0].x+=1
}if(F<0.2){r[1].x+=1}if(E<0.2){r[2].x+=1}}}for(var C=0,v=this.vertices.length;C<v;
C++){this.vertices[C].multiplyScalar(k)}this.mergeVertices();this.computeFaceNormals();
this.boundingSphere=new THREE.Sphere(new THREE.Vector3(),k);function e(i){var p=i.normalize().clone();
p.index=o.vertices.push(p)-1;var l=D(i)/2/Math.PI+0.5;var j=d(i)/Math.PI+0.5;p.uv=new THREE.Vector2(l,1-j);
return p}function h(I,p,l){var j=new THREE.Face3(I.index,p.index,l.index,[I.clone(),p.clone(),l.clone()]);
o.faces.push(j);s.copy(I).add(p).add(l).divideScalar(3);var i=D(s);o.faceVertexUvs[0].push([a(I.uv,I,i),a(p.uv,p,i),a(l.uv,l,i)])
}function q(M,K){var O=Math.pow(2,K);var Q=e(o.vertices[M.a]);var P=e(o.vertices[M.b]);
var N=e(o.vertices[M.c]);var R=[];for(var J=0;J<=O;J++){R[J]=[];var L=e(Q.clone().lerp(N,J/O));
var l=e(P.clone().lerp(N,J/O));var S=O-J;for(var I=0;I<=S;I++){if(I==0&&J==O){R[J][I]=L
}else{R[J][I]=e(L.clone().lerp(l,I/S))}}}for(var J=0;J<O;J++){for(var I=0;I<2*(O-J)-1;
I++){var p=Math.floor(I/2);if(I%2==0){h(R[J][p+1],R[J+1][p],R[J][p])}else{h(R[J][p+1],R[J+1][p+1],R[J+1][p])
}}}}function D(i){return Math.atan2(i.z,-i.x)}function d(i){return Math.atan2(-i.y,Math.sqrt((i.x*i.x)+(i.z*i.z)))
}function a(j,i,l){if((l<0)&&(j.x===1)){j=new THREE.Vector2(j.x-1,j.y)}if((i.x===0)&&(i.z===0)){j=new THREE.Vector2(l/2/Math.PI+0.5,j.y)
}return j.clone()}};THREE.PolyhedronGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.PolyhedronGeometry.prototype.constructor=THREE.PolyhedronGeometry;THREE.DodecahedronGeometry=function(a,d){this.parameters={radius:a,detail:d};
var c=(1+Math.sqrt(5))/2;var e=1/c;var b=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-e,-c,0,-e,c,0,e,-c,0,e,c,-e,-c,0,-e,c,0,e,-c,0,e,c,0,-c,0,-e,c,0,-e,-c,0,e,c,0,e];
var f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];
THREE.PolyhedronGeometry.call(this,b,f,a,d)};THREE.DodecahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.DodecahedronGeometry.prototype.constructor=THREE.DodecahedronGeometry;THREE.IcosahedronGeometry=function(a,d){var c=(1+Math.sqrt(5))/2;
var b=[-1,c,0,1,c,0,-1,-c,0,1,-c,0,0,-1,c,0,1,c,0,-1,-c,0,1,-c,c,0,-1,c,0,1,-c,0,-1,-c,0,1];
var e=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];
THREE.PolyhedronGeometry.call(this,b,e,a,d);this.type="IcosahedronGeometry";this.parameters={radius:a,detail:d}
};THREE.IcosahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.IcosahedronGeometry.prototype.constructor=THREE.IcosahedronGeometry;
THREE.OctahedronGeometry=function(a,c){this.parameters={radius:a,detail:c};var b=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1];
var d=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];THREE.PolyhedronGeometry.call(this,b,d,a,c);
this.type="OctahedronGeometry";this.parameters={radius:a,detail:c}};THREE.OctahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry.prototype.constructor=THREE.OctahedronGeometry;THREE.TetrahedronGeometry=function(a,c){var b=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1];
var d=[2,1,0,0,3,2,1,3,0,2,3,1];THREE.PolyhedronGeometry.call(this,b,d,a,c);this.type="TetrahedronGeometry";
this.parameters={radius:a,detail:c}};THREE.TetrahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry.prototype.constructor=THREE.TetrahedronGeometry;THREE.ParametricGeometry=function(g,f,C){THREE.Geometry.call(this);
this.type="ParametricGeometry";this.parameters={func:g,slices:f,stacks:C};var G=this.vertices;
var e=this.faces;var h=this.faceVertexUvs[0];var q,n,m;var l,k;var F=f+1;for(q=0;
q<=C;q++){k=q/C;for(n=0;n<=f;n++){l=n/f;m=g(l,k);G.push(m)}}var E,D,B,A;var t,s,r,o;
for(q=0;q<C;q++){for(n=0;n<f;n++){E=q*F+n;D=q*F+n+1;B=(q+1)*F+n+1;A=(q+1)*F+n;t=new THREE.Vector2(n/f,q/C);
s=new THREE.Vector2((n+1)/f,q/C);r=new THREE.Vector2((n+1)/f,(q+1)/C);o=new THREE.Vector2(n/f,(q+1)/C);
e.push(new THREE.Face3(E,D,A));h.push([t,s,o]);e.push(new THREE.Face3(D,B,A));h.push([s.clone(),r,o.clone()])
}}this.computeFaceNormals();this.computeVertexNormals()};THREE.ParametricGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry.prototype.constructor=THREE.ParametricGeometry;THREE.AxisHelper=function(c){c=c||1;
var b=new Float32Array([0,0,0,c,0,0,0,0,0,0,c,0,0,0,0,0,0,c]);var a=new Float32Array([1,0,0,1,0.6,0,0,1,0,0.6,1,0,0,0,1,0,0.6,1]);
var e=new THREE.BufferGeometry();e.addAttribute("position",new THREE.BufferAttribute(b,3));
e.addAttribute("color",new THREE.BufferAttribute(a,3));var d=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});
THREE.Line.call(this,e,d,THREE.LinePieces)};THREE.AxisHelper.prototype=Object.create(THREE.Line.prototype);
THREE.AxisHelper.prototype.constructor=THREE.AxisHelper;THREE.ArrowHelper=(function(){var a=new THREE.Geometry();
a.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0));var b=new THREE.CylinderGeometry(0,0.5,1,5,1);
b.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.5,0));return function(g,f,h,e,d,c){THREE.Object3D.call(this);
if(e===undefined){e=16776960}if(h===undefined){h=1}if(d===undefined){d=0.2*h}if(c===undefined){c=0.2*d
}this.position.copy(f);this.line=new THREE.Line(a,new THREE.LineBasicMaterial({color:e}));
this.line.matrixAutoUpdate=false;this.add(this.line);this.cone=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:e}));
this.cone.matrixAutoUpdate=false;this.add(this.cone);this.setDirection(g);this.setLength(h,d,c)
}}());THREE.ArrowHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.ArrowHelper.prototype.constructor=THREE.ArrowHelper;
THREE.ArrowHelper.prototype.setDirection=(function(){var a=new THREE.Vector3();
var b;return function(c){if(c.y>0.99999){this.quaternion.set(0,0,0,1)}else{if(c.y<-0.99999){this.quaternion.set(1,0,0,0)
}else{a.set(c.z,0,-c.x).normalize();b=Math.acos(c.y);this.quaternion.setFromAxisAngle(a,b)
}}}}());THREE.ArrowHelper.prototype.setLength=function(c,b,a){if(b===undefined){b=0.2*c
}if(a===undefined){a=0.2*b}this.line.scale.set(1,c-b,1);this.line.updateMatrix();
this.cone.scale.set(a,b,a);this.cone.position.y=c;this.cone.updateMatrix()};THREE.ArrowHelper.prototype.setColor=function(a){this.line.material.color.set(a);
this.cone.material.color.set(a)};THREE.BoxHelper=function(a){var b=new THREE.BufferGeometry();
b.addAttribute("position",new THREE.BufferAttribute(new Float32Array(72),3));THREE.Line.call(this,b,new THREE.LineBasicMaterial({color:16776960}),THREE.LinePieces);
if(a!==undefined){this.update(a)}};THREE.BoxHelper.prototype=Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.constructor=THREE.BoxHelper;THREE.BoxHelper.prototype.update=function(c){var e=c.geometry;
if(e.boundingBox===null){e.computeBoundingBox()}var d=e.boundingBox.min;var a=e.boundingBox.max;
var b=this.geometry.attributes.position.array;b[0]=a.x;b[1]=a.y;b[2]=a.z;b[3]=d.x;
b[4]=a.y;b[5]=a.z;b[6]=d.x;b[7]=a.y;b[8]=a.z;b[9]=d.x;b[10]=d.y;b[11]=a.z;b[12]=d.x;
b[13]=d.y;b[14]=a.z;b[15]=a.x;b[16]=d.y;b[17]=a.z;b[18]=a.x;b[19]=d.y;b[20]=a.z;
b[21]=a.x;b[22]=a.y;b[23]=a.z;b[24]=a.x;b[25]=a.y;b[26]=d.z;b[27]=d.x;b[28]=a.y;
b[29]=d.z;b[30]=d.x;b[31]=a.y;b[32]=d.z;b[33]=d.x;b[34]=d.y;b[35]=d.z;b[36]=d.x;
b[37]=d.y;b[38]=d.z;b[39]=a.x;b[40]=d.y;b[41]=d.z;b[42]=a.x;b[43]=d.y;b[44]=d.z;
b[45]=a.x;b[46]=a.y;b[47]=d.z;b[48]=a.x;b[49]=a.y;b[50]=a.z;b[51]=a.x;b[52]=a.y;
b[53]=d.z;b[54]=d.x;b[55]=a.y;b[56]=a.z;b[57]=d.x;b[58]=a.y;b[59]=d.z;b[60]=d.x;
b[61]=d.y;b[62]=a.z;b[63]=d.x;b[64]=d.y;b[65]=d.z;b[66]=a.x;b[67]=d.y;b[68]=a.z;
b[69]=a.x;b[70]=d.y;b[71]=d.z;this.geometry.attributes.position.needsUpdate=true;
this.geometry.computeBoundingSphere();this.matrix=c.matrixWorld;this.matrixAutoUpdate=false
};THREE.BoundingBoxHelper=function(b,c){var a=(c!==undefined)?c:8947848;this.object=b;
this.box=new THREE.Box3();THREE.Mesh.call(this,new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:a,wireframe:true}))
};THREE.BoundingBoxHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.BoundingBoxHelper.prototype.constructor=THREE.BoundingBoxHelper;
THREE.BoundingBoxHelper.prototype.update=function(){this.box.setFromObject(this.object);
this.box.size(this.scale);this.box.center(this.position)};THREE.CameraHelper=function(e){var h=new THREE.Geometry();
var f=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors});
var g={};var d=16755200;var k=16711680;var b=43775;var i=16777215;var c=3355443;
j("n1","n2",d);j("n2","n4",d);j("n4","n3",d);j("n3","n1",d);j("f1","f2",d);j("f2","f4",d);
j("f4","f3",d);j("f3","f1",d);j("n1","f1",d);j("n2","f2",d);j("n3","f3",d);j("n4","f4",d);
j("p","n1",k);j("p","n2",k);j("p","n3",k);j("p","n4",k);j("u1","u2",b);j("u2","u3",b);
j("u3","u1",b);j("c","t",i);j("p","c",c);j("cn1","cn2",c);j("cn3","cn4",c);j("cf1","cf2",c);
j("cf3","cf4",c);function j(m,l,n){a(m,n);a(l,n)}function a(m,l){h.vertices.push(new THREE.Vector3());
h.colors.push(new THREE.Color(l));if(g[m]===undefined){g[m]=[]}g[m].push(h.vertices.length-1)
}THREE.Line.call(this,h,f,THREE.LinePieces);this.camera=e;this.matrix=e.matrixWorld;
this.matrixAutoUpdate=false;this.pointMap=g;this.update()};THREE.CameraHelper.prototype=Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.constructor=THREE.CameraHelper;THREE.CameraHelper.prototype.update=function(){var e,b;
var a=new THREE.Vector3();var d=new THREE.Camera();var c=function(g,f,m,l){a.set(f,m,l).unproject(d);
var k=b[g];if(k!==undefined){for(var j=0,h=k.length;j<h;j++){e.vertices[k[j]].copy(a)
}}};return function(){e=this.geometry;b=this.pointMap;var f=1,g=1;d.projectionMatrix.copy(this.camera.projectionMatrix);
c("c",0,0,-1);c("t",0,0,1);c("n1",-f,-g,-1);c("n2",f,-g,-1);c("n3",-f,g,-1);c("n4",f,g,-1);
c("f1",-f,-g,1);c("f2",f,-g,1);c("f3",-f,g,1);c("f4",f,g,1);c("u1",f*0.7,g*1.1,-1);
c("u2",-f*0.7,g*1.1,-1);c("u3",0,g*2,-1);c("cf1",-f,0,1);c("cf2",f,0,1);c("cf3",0,-g,1);
c("cf4",0,g,1);c("cn1",-f,0,-1);c("cn2",f,0,-1);c("cn3",0,-g,-1);c("cn4",0,g,-1);
e.verticesNeedUpdate=true}}();THREE.DirectionalLightHelper=function(a,b){THREE.Object3D.call(this);
this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=false;
b=b||1;var d=new THREE.Geometry();d.vertices.push(new THREE.Vector3(-b,b,0),new THREE.Vector3(b,b,0),new THREE.Vector3(b,-b,0),new THREE.Vector3(-b,-b,0),new THREE.Vector3(-b,b,0));
var c=new THREE.LineBasicMaterial({fog:false});c.color.copy(this.light.color).multiplyScalar(this.light.intensity);
this.lightPlane=new THREE.Line(d,c);this.add(this.lightPlane);d=new THREE.Geometry();
d.vertices.push(new THREE.Vector3(),new THREE.Vector3());c=new THREE.LineBasicMaterial({fog:false});
c.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine=new THREE.Line(d,c);
this.add(this.targetLine);this.update()};THREE.DirectionalLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.constructor=THREE.DirectionalLightHelper;
THREE.DirectionalLightHelper.prototype.dispose=function(){this.lightPlane.geometry.dispose();
this.lightPlane.material.dispose();this.targetLine.geometry.dispose();this.targetLine.material.dispose()
};THREE.DirectionalLightHelper.prototype.update=function(){var c=new THREE.Vector3();
var b=new THREE.Vector3();var a=new THREE.Vector3();return function(){c.setFromMatrixPosition(this.light.matrixWorld);
b.setFromMatrixPosition(this.light.target.matrixWorld);a.subVectors(b,c);this.lightPlane.lookAt(a);
this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
this.targetLine.geometry.vertices[1].copy(a);this.targetLine.geometry.verticesNeedUpdate=true;
this.targetLine.material.color.copy(this.lightPlane.material.color)}}();THREE.EdgesHelper=function(D,k,o){var s=(k!==undefined)?k:16777215;
o=(o!==undefined)?o:1;var C=Math.cos(THREE.Math.degToRad(o));var e=[0,0],a={};var r=function(i,h){return i-h
};var p=["a","b","c"];var d=new THREE.BufferGeometry();var n;if(D.geometry instanceof THREE.BufferGeometry){n=new THREE.Geometry();
n.fromBufferGeometry(D.geometry)}else{n=D.geometry.clone()}n.mergeVertices();n.computeFaceNormals();
var f=n.vertices;var b=n.faces;var c=0;for(var v=0,q=b.length;v<q;v++){var m=b[v];
for(var t=0;t<3;t++){e[0]=m[p[t]];e[1]=m[p[(t+1)%3]];e.sort(r);var E=e.toString();
if(a[E]===undefined){a[E]={vert1:e[0],vert2:e[1],face1:v,face2:undefined};c++}else{a[E].face2=v
}}}var u=new Float32Array(c*2*3);var g=0;for(var E in a){var A=a[E];if(A.face2===undefined||b[A.face1].normal.dot(b[A.face2].normal)<=C){var B=f[A.vert1];
u[g++]=B.x;u[g++]=B.y;u[g++]=B.z;B=f[A.vert2];u[g++]=B.x;u[g++]=B.y;u[g++]=B.z}}d.addAttribute("position",new THREE.BufferAttribute(u,3));
THREE.Line.call(this,d,new THREE.LineBasicMaterial({color:s}),THREE.LinePieces);
this.matrix=D.matrixWorld;this.matrixAutoUpdate=false};THREE.EdgesHelper.prototype=Object.create(THREE.Line.prototype);
THREE.EdgesHelper.prototype.constructor=THREE.EdgesHelper;THREE.FaceNormalsHelper=function(e,k,c,j){this.object=e;
this.size=(k!==undefined)?k:1;var f=(c!==undefined)?c:16776960;var a=(j!==undefined)?j:1;
var h=new THREE.Geometry();var b=this.object.geometry.faces;for(var g=0,d=b.length;
g<d;g++){h.vertices.push(new THREE.Vector3(),new THREE.Vector3())}THREE.Line.call(this,h,new THREE.LineBasicMaterial({color:f,linewidth:a}),THREE.LinePieces);
this.matrixAutoUpdate=false;this.normalMatrix=new THREE.Matrix3();this.update()
};THREE.FaceNormalsHelper.prototype=Object.create(THREE.Line.prototype);THREE.FaceNormalsHelper.prototype.constructor=THREE.FaceNormalsHelper;
THREE.FaceNormalsHelper.prototype.update=function(){var g=this.geometry.vertices;
var e=this.object;var j=e.geometry.vertices;var b=e.geometry.faces;var a=e.matrixWorld;
e.updateMatrixWorld(true);this.normalMatrix.getNormalMatrix(a);for(var f=0,c=0,d=b.length;
f<d;f++,c+=2){var h=b[f];g[c].copy(j[h.a]).add(j[h.b]).add(j[h.c]).divideScalar(3).applyMatrix4(a);
g[c+1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(g[c])
}this.geometry.verticesNeedUpdate=true;return this};THREE.GridHelper=function(c,e){var f=new THREE.Geometry();
var d=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1=new THREE.Color(4473924);
this.color2=new THREE.Color(8947848);for(var b=-c;b<=c;b+=e){f.vertices.push(new THREE.Vector3(-c,0,b),new THREE.Vector3(c,0,b),new THREE.Vector3(b,0,-c),new THREE.Vector3(b,0,c));
var a=b===0?this.color1:this.color2;f.colors.push(a,a,a,a)}THREE.Line.call(this,f,d,THREE.LinePieces)
};THREE.GridHelper.prototype=Object.create(THREE.Line.prototype);THREE.GridHelper.prototype.constructor=THREE.GridHelper;
THREE.GridHelper.prototype.setColors=function(b,a){this.color1.set(b);this.color2.set(a);
this.geometry.colorsNeedUpdate=true};THREE.HemisphereLightHelper=function(a,f){THREE.Object3D.call(this);
this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=false;
this.colors=[new THREE.Color(),new THREE.Color()];var e=new THREE.SphereGeometry(f,4,2);
e.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));for(var c=0,b=8;c<b;
c++){e.faces[c].color=this.colors[c<4?0:1]}var d=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors,wireframe:true});
this.lightSphere=new THREE.Mesh(e,d);this.add(this.lightSphere);this.update()};
THREE.HemisphereLightHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.HemisphereLightHelper.prototype.constructor=THREE.HemisphereLightHelper;
THREE.HemisphereLightHelper.prototype.dispose=function(){this.lightSphere.geometry.dispose();
this.lightSphere.material.dispose()};THREE.HemisphereLightHelper.prototype.update=function(){var a=new THREE.Vector3();
return function(){this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());
this.lightSphere.geometry.colorsNeedUpdate=true}}();THREE.PointLightHelper=function(a,d){this.light=a;
this.light.updateMatrixWorld();var c=new THREE.SphereGeometry(d,4,2);var b=new THREE.MeshBasicMaterial({wireframe:true,fog:false});
b.color.copy(this.light.color).multiplyScalar(this.light.intensity);THREE.Mesh.call(this,c,b);
this.matrix=this.light.matrixWorld;this.matrixAutoUpdate=false};THREE.PointLightHelper.prototype=Object.create(THREE.Mesh.prototype);
THREE.PointLightHelper.prototype.constructor=THREE.PointLightHelper;THREE.PointLightHelper.prototype.dispose=function(){this.geometry.dispose();
this.material.dispose()};THREE.PointLightHelper.prototype.update=function(){this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};THREE.SkeletonHelper=function(a){this.bones=this.getBoneList(a);var e=new THREE.Geometry();
for(var b=0;b<this.bones.length;b++){var d=this.bones[b];if(d.parent instanceof THREE.Bone){e.vertices.push(new THREE.Vector3());
e.vertices.push(new THREE.Vector3());e.colors.push(new THREE.Color(0,0,1));e.colors.push(new THREE.Color(0,1,0))
}}var c=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors,depthTest:false,depthWrite:false,transparent:true});
THREE.Line.call(this,e,c,THREE.LinePieces);this.root=a;this.matrix=a.matrixWorld;
this.matrixAutoUpdate=false;this.update()};THREE.SkeletonHelper.prototype=Object.create(THREE.Line.prototype);
THREE.SkeletonHelper.prototype.constructor=THREE.SkeletonHelper;THREE.SkeletonHelper.prototype.getBoneList=function(a){var c=[];
if(a instanceof THREE.Bone){c.push(a)}for(var b=0;b<a.children.length;b++){c.push.apply(c,this.getBoneList(a.children[b]))
}return c};THREE.SkeletonHelper.prototype.update=function(){var f=this.geometry;
var e=new THREE.Matrix4().getInverse(this.root.matrixWorld);var c=new THREE.Matrix4();
var a=0;for(var b=0;b<this.bones.length;b++){var d=this.bones[b];if(d.parent instanceof THREE.Bone){c.multiplyMatrices(e,d.matrixWorld);
f.vertices[a].setFromMatrixPosition(c);c.multiplyMatrices(e,d.parent.matrixWorld);
f.vertices[a+1].setFromMatrixPosition(c);a+=2}}f.verticesNeedUpdate=true;f.computeBoundingSphere()
};THREE.SpotLightHelper=function(a){THREE.Object3D.call(this);this.light=a;this.light.updateMatrixWorld();
this.matrix=a.matrixWorld;this.matrixAutoUpdate=false;var c=new THREE.CylinderGeometry(0,1,1,8,1,true);
c.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.5,0));c.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
var b=new THREE.MeshBasicMaterial({wireframe:true,fog:false});this.cone=new THREE.Mesh(c,b);
this.add(this.cone);this.update()};THREE.SpotLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.constructor=THREE.SpotLightHelper;THREE.SpotLightHelper.prototype.dispose=function(){this.cone.geometry.dispose();
this.cone.material.dispose()};THREE.SpotLightHelper.prototype.update=function(){var a=new THREE.Vector3();
var b=new THREE.Vector3();return function(){var c=this.light.distance?this.light.distance:10000;
var d=c*Math.tan(this.light.angle);this.cone.scale.set(d,d,c);a.setFromMatrixPosition(this.light.matrixWorld);
b.setFromMatrixPosition(this.light.target.matrixWorld);this.cone.lookAt(b.sub(a));
this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}}();THREE.VertexNormalsHelper=function(e,p,c,o){this.object=e;this.size=(p!==undefined)?p:1;
var f=(c!==undefined)?c:16711680;var a=(o!==undefined)?o:1;var n=new THREE.Geometry();
var b=e.geometry.faces;for(var k=0,d=b.length;k<d;k++){var m=b[k];for(var g=0,h=m.vertexNormals.length;
g<h;g++){n.vertices.push(new THREE.Vector3(),new THREE.Vector3())}}THREE.Line.call(this,n,new THREE.LineBasicMaterial({color:f,linewidth:a}),THREE.LinePieces);
this.matrixAutoUpdate=false;this.normalMatrix=new THREE.Matrix3();this.update()
};THREE.VertexNormalsHelper.prototype=Object.create(THREE.Line.prototype);THREE.VertexNormalsHelper.prototype.constructor=THREE.VertexNormalsHelper;
THREE.VertexNormalsHelper.prototype.update=(function(a){var b=new THREE.Vector3();
return function(e){var t=["a","b","c","d"];this.object.updateMatrixWorld(true);
this.normalMatrix.getNormalMatrix(this.object.matrixWorld);var o=this.geometry.vertices;
var r=this.object.geometry.vertices;var c=this.object.geometry.faces;var p=this.object.matrixWorld;
var s=0;for(var h=0,d=c.length;h<d;h++){var q=c[h];for(var f=0,g=q.vertexNormals.length;
f<g;f++){var n=q[t[f]];var k=r[n];var m=q.vertexNormals[f];o[s].copy(k).applyMatrix4(p);
b.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
b.add(o[s]);s=s+1;o[s].copy(b);s=s+1}}this.geometry.verticesNeedUpdate=true;return this
}}());THREE.VertexTangentsHelper=function(e,p,c,o){this.object=e;this.size=(p!==undefined)?p:1;
var f=(c!==undefined)?c:255;var a=(o!==undefined)?o:1;var n=new THREE.Geometry();
var b=e.geometry.faces;for(var k=0,d=b.length;k<d;k++){var m=b[k];for(var g=0,h=m.vertexTangents.length;
g<h;g++){n.vertices.push(new THREE.Vector3());n.vertices.push(new THREE.Vector3())
}}THREE.Line.call(this,n,new THREE.LineBasicMaterial({color:f,linewidth:a}),THREE.LinePieces);
this.matrixAutoUpdate=false;this.update()};THREE.VertexTangentsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.constructor=THREE.VertexTangentsHelper;THREE.VertexTangentsHelper.prototype.update=(function(a){var b=new THREE.Vector3();
return function(e){var t=["a","b","c","d"];this.object.updateMatrixWorld(true);
var n=this.geometry.vertices;var q=this.object.geometry.vertices;var c=this.object.geometry.faces;
var o=this.object.matrixWorld;var r=0;for(var h=0,d=c.length;h<d;h++){var p=c[h];
for(var f=0,g=p.vertexTangents.length;f<g;f++){var m=p[t[f]];var k=q[m];var s=p.vertexTangents[f];
n[r].copy(k).applyMatrix4(o);b.copy(s).transformDirection(o).multiplyScalar(this.size);
b.add(n[r]);r=r+1;n[r].copy(b);r=r+1}}this.geometry.verticesNeedUpdate=true;return this
}}());THREE.WireframeHelper=function(K,r){var F=(r!==undefined)?r:16777215;var k=[0,0],a={};
var E=function(j,i){return j-i};var B=["a","b","c"];var f=new THREE.BufferGeometry();
if(K.geometry instanceof THREE.Geometry){var n=K.geometry.vertices;var b=K.geometry.faces;
var c=0;var d=new Uint32Array(6*b.length);for(var I=0,D=b.length;I<D;I++){var t=b[I];
for(var G=0;G<3;G++){k[0]=t[B[G]];k[1]=t[B[(G+1)%3]];k.sort(E);var L=k.toString();
if(a[L]===undefined){d[2*c]=k[0];d[2*c+1]=k[1];a[L]=true;c++}}}var H=new Float32Array(c*2*3);
for(var I=0,D=c;I<D;I++){for(var G=0;G<2;G++){var J=n[d[2*I+G]];var q=6*I+3*G;H[q+0]=J.x;
H[q+1]=J.y;H[q+2]=J.z}}f.addAttribute("position",new THREE.BufferAttribute(H,3))
}else{if(K.geometry instanceof THREE.BufferGeometry){if(K.geometry.attributes.index!==undefined){var n=K.geometry.attributes.position.array;
var h=K.geometry.attributes.index.array;var v=K.geometry.drawcalls;var c=0;if(v.length===0){v=[{count:h.length,index:0,start:0}]
}var d=new Uint32Array(2*h.length);for(var C=0,A=v.length;C<A;++C){var e=v[C].start;
var p=v[C].count;var q=v[C].index;for(var I=e,u=e+p;I<u;I+=3){for(var G=0;G<3;G++){k[0]=q+h[I+G];
k[1]=q+h[I+(G+1)%3];k.sort(E);var L=k.toString();if(a[L]===undefined){d[2*c]=k[0];
d[2*c+1]=k[1];a[L]=true;c++}}}}var H=new Float32Array(c*2*3);for(var I=0,D=c;I<D;
I++){for(var G=0;G<2;G++){var q=6*I+3*G;var g=3*d[2*I+G];H[q+0]=n[g];H[q+1]=n[g+1];
H[q+2]=n[g+2]}}f.addAttribute("position",new THREE.BufferAttribute(H,3))}else{var n=K.geometry.attributes.position.array;
var c=n.length/3;var s=c/3;var H=new Float32Array(c*2*3);for(var I=0,D=s;I<D;I++){for(var G=0;
G<3;G++){var q=18*I+6*G;var m=9*I+3*G;H[q+0]=n[m];H[q+1]=n[m+1];H[q+2]=n[m+2];var g=9*I+3*((G+1)%3);
H[q+3]=n[g];H[q+4]=n[g+1];H[q+5]=n[g+2]}}f.addAttribute("position",new THREE.BufferAttribute(H,3))
}}}THREE.Line.call(this,f,new THREE.LineBasicMaterial({color:F}),THREE.LinePieces);
this.matrix=K.matrixWorld;this.matrixAutoUpdate=false};THREE.WireframeHelper.prototype=Object.create(THREE.Line.prototype);
THREE.WireframeHelper.prototype.constructor=THREE.WireframeHelper;THREE.ImmediateRenderObject=function(){THREE.Object3D.call(this);
this.render=function(a){}};THREE.ImmediateRenderObject.prototype=Object.create(THREE.Object3D.prototype);
THREE.ImmediateRenderObject.prototype.constructor=THREE.ImmediateRenderObject;THREE.MorphBlendMesh=function(g,d){THREE.Mesh.call(this,g,d);
this.animationsMap={};this.animationsList=[];var f=this.geometry.morphTargets.length;
var b="__default";var c=0;var a=f-1;var e=f/1;this.createAnimation(b,c,a,e);this.setAnimationWeight(b,1)
};THREE.MorphBlendMesh.prototype=Object.create(THREE.Mesh.prototype);THREE.MorphBlendMesh.prototype.constructor=THREE.MorphBlendMesh;
THREE.MorphBlendMesh.prototype.createAnimation=function(b,e,a,d){var c={startFrame:e,endFrame:a,length:a-e+1,fps:d,duration:(a-e)/d,lastFrame:0,currentFrame:0,active:false,time:0,direction:1,weight:1,directionBackwards:false,mirroredLoop:false};
this.animationsMap[b]=c;this.animationsList.push(c)};THREE.MorphBlendMesh.prototype.autoCreateAnimations=function(c){var h=/([a-z]+)_?(\d+)/;
var b,f={};var j=this.geometry;for(var d=0,k=j.morphTargets.length;d<k;d++){var l=j.morphTargets[d];
var g=l.name.match(h);if(g&&g.length>1){var a=g[1];if(!f[a]){f[a]={start:Infinity,end:-Infinity}
}var e=f[a];if(d<e.start){e.start=d}if(d>e.end){e.end=d}if(!b){b=a}}}for(var a in f){var e=f[a];
this.createAnimation(a,e.start,e.end,c)}this.firstAnimation=b};THREE.MorphBlendMesh.prototype.setAnimationDirectionForward=function(a){var b=this.animationsMap[a];
if(b){b.direction=1;b.directionBackwards=false}};THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward=function(a){var b=this.animationsMap[a];
if(b){b.direction=-1;b.directionBackwards=true}};THREE.MorphBlendMesh.prototype.setAnimationFPS=function(a,c){var b=this.animationsMap[a];
if(b){b.fps=c;b.duration=(b.end-b.start)/b.fps}};THREE.MorphBlendMesh.prototype.setAnimationDuration=function(a,c){var b=this.animationsMap[a];
if(b){b.duration=c;b.fps=(b.end-b.start)/b.duration}};THREE.MorphBlendMesh.prototype.setAnimationWeight=function(a,c){var b=this.animationsMap[a];
if(b){b.weight=c}};THREE.MorphBlendMesh.prototype.setAnimationTime=function(a,c){var b=this.animationsMap[a];
if(b){b.time=c}};THREE.MorphBlendMesh.prototype.getAnimationTime=function(a){var c=0;
var b=this.animationsMap[a];if(b){c=b.time}return c};THREE.MorphBlendMesh.prototype.getAnimationDuration=function(a){var c=-1;
var b=this.animationsMap[a];if(b){c=b.duration}return c};THREE.MorphBlendMesh.prototype.playAnimation=function(a){var b=this.animationsMap[a];
if(b){b.time=0;b.active=true}else{THREE.warn("THREE.MorphBlendMesh: animation["+a+"] undefined in .playAnimation()")
}};THREE.MorphBlendMesh.prototype.stopAnimation=function(a){var b=this.animationsMap[a];
if(b){b.active=false}};THREE.MorphBlendMesh.prototype.update=function(h){for(var c=0,a=this.animationsList.length;
c<a;c++){var g=this.animationsList[c];if(!g.active){continue}var e=g.duration/g.length;
g.time+=g.direction*h;if(g.mirroredLoop){if(g.time>g.duration||g.time<0){g.direction*=-1;
if(g.time>g.duration){g.time=g.duration;g.directionBackwards=true}if(g.time<0){g.time=0;
g.directionBackwards=false}}}else{g.time=g.time%g.duration;if(g.time<0){g.time+=g.duration
}}var b=g.startFrame+THREE.Math.clamp(Math.floor(g.time/e),0,g.length-1);var f=g.weight;
if(b!==g.currentFrame){this.morphTargetInfluences[g.lastFrame]=0;this.morphTargetInfluences[g.currentFrame]=1*f;
this.morphTargetInfluences[b]=0;g.lastFrame=g.currentFrame;g.currentFrame=b}var d=(g.time%e)/e;
if(g.directionBackwards){d=1-d}this.morphTargetInfluences[g.currentFrame]=d*f;this.morphTargetInfluences[g.lastFrame]=(1-d)*f
}};