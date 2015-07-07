var src = {};
src.base = 'src/';
src.script = src.base + 'script/';
src.html = src.base + 'html/';
var dest = {};
dest.base = 'dest/';
dest.script = dest.base + 'script/';
dest.html = dest.base + 'html/';

// export module
module.exports = {
    src: src,
    dest: dest
};