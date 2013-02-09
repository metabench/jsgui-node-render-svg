if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['jsgui-lang-essentials', 'fs', '../jsgui-node-render-svg'], 
    function(jsgui, fs, rendersvg) {
        
        // load svg from disk, get png stream from it.
        //  will want to stream into a PNG object too.
        
        //var filename = './svg/axe.svg';
        
        //var filename = __dirname + req.url;
        
          // This line opens the file as a readable stream
          
        var svg_to_png = function(svg_path, png_path, callback) {
            
            
            var readStream = fs.createReadStream(svg_path);
            var writeStream = fs.createWriteStream(png_path);
            
            rendersvg(readStream, writeStream, null, function() {
                //console.log('rendering callback');
                callback();
                
            });
            
        }
        
        
        var fns = [];
        
        fns.push([svg_to_png, ['./svg/axe.svg', './png/axe.png']]);
        fns.push([svg_to_png, ['./svg/bike.svg', './png/bike.png']]);
        fns.push([svg_to_png, ['./svg/dice.svg', './png/dice.png']]);
        fns.push([svg_to_png, ['./svg/knife.svg', './png/knife.png']]);
        fns.push([svg_to_png, ['./svg/pliers.svg', './png/pliers.png']]);
        
        
        var slow_test = function() {
            console.log('begin initial waiting');
            setTimeout(function() {
                console.log('end initial waiting');
                jsgui.call_multiple_callback_functions(fns, function() {
                    console.log('converted multiple svgs to pngs');
                    
                    process.exit();
                    
                    //setTimeout(function() {
                    //    console.log('and 30s later');
                    
                    //}, 30000)
                    
                });
            }, 1);
        }
        slow_test();
        // slow test to look at memory usage
        
        
        
        
        /*
        rendersvg(readStream, writeStream, null, function() {
            console.log('rendering callback');
            
            
            
            var readStream = fs.createReadStream('./svg/bike.svg');
            var writeStream = fs.createWriteStream('./png/bike.png');
            
            
            rendersvg(readStream, writeStream, null, function() {
                console.log('rendering callback');
                
            });
            
        });
        */
        
    }
);
