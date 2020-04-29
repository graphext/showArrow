// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/flatbuffers/js/flatbuffers.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatbuffers = void 0;
/// @file
/// @addtogroup flatbuffers_javascript_api
/// @{
/// @cond FLATBUFFERS_INTERNAL

/**
 * @fileoverview
 *
 * Need to suppress 'global this' error so the Node.js export line doesn't cause
 * closure compile to error out.
 * @suppress {globalThis}
 */

/**
 * @const
 * @namespace
 */
var flatbuffers = {};
/**
 * @typedef {number}
 */

exports.flatbuffers = flatbuffers;
flatbuffers.Offset;
/**
 * @typedef {{
 *   bb: flatbuffers.ByteBuffer,
 *   bb_pos: number
 * }}
 */

flatbuffers.Table;
/**
 * @type {number}
 * @const
 */

flatbuffers.SIZEOF_SHORT = 2;
/**
 * @type {number}
 * @const
 */

flatbuffers.SIZEOF_INT = 4;
/**
 * @type {number}
 * @const
 */

flatbuffers.FILE_IDENTIFIER_LENGTH = 4;
/**
 * @enum {number}
 */

flatbuffers.Encoding = {
  UTF8_BYTES: 1,
  UTF16_STRING: 2
};
/**
 * @type {Int32Array}
 * @const
 */

flatbuffers.int32 = new Int32Array(2);
/**
 * @type {Float32Array}
 * @const
 */

flatbuffers.float32 = new Float32Array(flatbuffers.int32.buffer);
/**
 * @type {Float64Array}
 * @const
 */

flatbuffers.float64 = new Float64Array(flatbuffers.int32.buffer);
/**
 * @type {boolean}
 * @const
 */

flatbuffers.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1; ////////////////////////////////////////////////////////////////////////////////

/**
 * @constructor
 * @param {number} low
 * @param {number} high
 */

flatbuffers.Long = function (low, high) {
  /**
   * @type {number}
   * @const
   */
  this.low = low | 0;
  /**
   * @type {number}
   * @const
   */

  this.high = high | 0;
};
/**
 * @param {number} low
 * @param {number} high
 * @returns {flatbuffers.Long}
 */


flatbuffers.Long.create = function (low, high) {
  // Special-case zero to avoid GC overhead for default values
  return low == 0 && high == 0 ? flatbuffers.Long.ZERO : new flatbuffers.Long(low, high);
};
/**
 * @returns {number}
 */


flatbuffers.Long.prototype.toFloat64 = function () {
  return (this.low >>> 0) + this.high * 0x100000000;
};
/**
 * @param {flatbuffers.Long} other
 * @returns {boolean}
 */


flatbuffers.Long.prototype.equals = function (other) {
  return this.low == other.low && this.high == other.high;
};
/**
 * @type {flatbuffers.Long}
 * @const
 */


flatbuffers.Long.ZERO = new flatbuffers.Long(0, 0); /// @endcond
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a FlatBufferBuilder.
 *
 * @constructor
 * @param {number=} opt_initial_size
 */

flatbuffers.Builder = function (opt_initial_size) {
  if (!opt_initial_size) {
    var initial_size = 1024;
  } else {
    var initial_size = opt_initial_size;
  }
  /**
   * @type {flatbuffers.ByteBuffer}
   * @private
   */


  this.bb = flatbuffers.ByteBuffer.allocate(initial_size);
  /**
   * Remaining space in the ByteBuffer.
   *
   * @type {number}
   * @private
   */

  this.space = initial_size;
  /**
   * Minimum alignment encountered so far.
   *
   * @type {number}
   * @private
   */

  this.minalign = 1;
  /**
   * The vtable for the current table.
   *
   * @type {Array.<number>}
   * @private
   */

  this.vtable = null;
  /**
   * The amount of fields we're actually using.
   *
   * @type {number}
   * @private
   */

  this.vtable_in_use = 0;
  /**
   * Whether we are currently serializing a table.
   *
   * @type {boolean}
   * @private
   */

  this.isNested = false;
  /**
   * Starting offset of the current struct/table.
   *
   * @type {number}
   * @private
   */

  this.object_start = 0;
  /**
   * List of offsets of all vtables.
   *
   * @type {Array.<number>}
   * @private
   */

  this.vtables = [];
  /**
   * For the current vector being built.
   *
   * @type {number}
   * @private
   */

  this.vector_num_elems = 0;
  /**
   * False omits default values from the serialized data
   *
   * @type {boolean}
   * @private
   */

  this.force_defaults = false;
};

flatbuffers.Builder.prototype.clear = function () {
  this.bb.clear();
  this.space = this.bb.capacity();
  this.minalign = 1;
  this.vtable = null;
  this.vtable_in_use = 0;
  this.isNested = false;
  this.object_start = 0;
  this.vtables = [];
  this.vector_num_elems = 0;
  this.force_defaults = false;
};
/**
 * In order to save space, fields that are set to their default value
 * don't get serialized into the buffer. Forcing defaults provides a
 * way to manually disable this optimization.
 *
 * @param {boolean} forceDefaults true always serializes default values
 */


flatbuffers.Builder.prototype.forceDefaults = function (forceDefaults) {
  this.force_defaults = forceDefaults;
};
/**
 * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
 * called finish(). The actual data starts at the ByteBuffer's current position,
 * not necessarily at 0.
 *
 * @returns {flatbuffers.ByteBuffer}
 */


flatbuffers.Builder.prototype.dataBuffer = function () {
  return this.bb;
};
/**
 * Get the bytes representing the FlatBuffer. Only call this after you've
 * called finish().
 *
 * @returns {Uint8Array}
 */


flatbuffers.Builder.prototype.asUint8Array = function () {
  return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
}; /// @cond FLATBUFFERS_INTERNAL

/**
 * Prepare to write an element of `size` after `additional_bytes` have been
 * written, e.g. if you write a string, you need to align such the int length
 * field is aligned to 4 bytes, and the string data follows it directly. If all
 * you need to do is alignment, `additional_bytes` will be 0.
 *
 * @param {number} size This is the of the new element to write
 * @param {number} additional_bytes The padding size
 */


flatbuffers.Builder.prototype.prep = function (size, additional_bytes) {
  // Track the biggest thing we've ever aligned to.
  if (size > this.minalign) {
    this.minalign = size;
  } // Find the amount of alignment needed such that `size` is properly
  // aligned after `additional_bytes`


  var align_size = ~(this.bb.capacity() - this.space + additional_bytes) + 1 & size - 1; // Reallocate the buffer if needed.

  while (this.space < align_size + size + additional_bytes) {
    var old_buf_size = this.bb.capacity();
    this.bb = flatbuffers.Builder.growByteBuffer(this.bb);
    this.space += this.bb.capacity() - old_buf_size;
  }

  this.pad(align_size);
};
/**
 * @param {number} byte_size
 */


flatbuffers.Builder.prototype.pad = function (byte_size) {
  for (var i = 0; i < byte_size; i++) {
    this.bb.writeInt8(--this.space, 0);
  }
};
/**
 * @param {number} value
 */


flatbuffers.Builder.prototype.writeInt8 = function (value) {
  this.bb.writeInt8(this.space -= 1, value);
};
/**
 * @param {number} value
 */


flatbuffers.Builder.prototype.writeInt16 = function (value) {
  this.bb.writeInt16(this.space -= 2, value);
};
/**
 * @param {number} value
 */


flatbuffers.Builder.prototype.writeInt32 = function (value) {
  this.bb.writeInt32(this.space -= 4, value);
};
/**
 * @param {flatbuffers.Long} value
 */


flatbuffers.Builder.prototype.writeInt64 = function (value) {
  this.bb.writeInt64(this.space -= 8, value);
};
/**
 * @param {number} value
 */


flatbuffers.Builder.prototype.writeFloat32 = function (value) {
  this.bb.writeFloat32(this.space -= 4, value);
};
/**
 * @param {number} value
 */


flatbuffers.Builder.prototype.writeFloat64 = function (value) {
  this.bb.writeFloat64(this.space -= 8, value);
}; /// @endcond

/**
 * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int8` to add the the buffer.
 */


flatbuffers.Builder.prototype.addInt8 = function (value) {
  this.prep(1, 0);
  this.writeInt8(value);
};
/**
 * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int16` to add the the buffer.
 */


flatbuffers.Builder.prototype.addInt16 = function (value) {
  this.prep(2, 0);
  this.writeInt16(value);
};
/**
 * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int32` to add the the buffer.
 */


flatbuffers.Builder.prototype.addInt32 = function (value) {
  this.prep(4, 0);
  this.writeInt32(value);
};
/**
 * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {flatbuffers.Long} value The `int64` to add the the buffer.
 */


flatbuffers.Builder.prototype.addInt64 = function (value) {
  this.prep(8, 0);
  this.writeInt64(value);
};
/**
 * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float32` to add the the buffer.
 */


flatbuffers.Builder.prototype.addFloat32 = function (value) {
  this.prep(4, 0);
  this.writeFloat32(value);
};
/**
 * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float64` to add the the buffer.
 */


flatbuffers.Builder.prototype.addFloat64 = function (value) {
  this.prep(8, 0);
  this.writeFloat64(value);
}; /// @cond FLATBUFFERS_INTERNAL

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */


flatbuffers.Builder.prototype.addFieldInt8 = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt8(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */


flatbuffers.Builder.prototype.addFieldInt16 = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt16(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */


flatbuffers.Builder.prototype.addFieldInt32 = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt32(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {flatbuffers.Long} value
 * @param {flatbuffers.Long} defaultValue
 */


flatbuffers.Builder.prototype.addFieldInt64 = function (voffset, value, defaultValue) {
  if (this.force_defaults || !value.equals(defaultValue)) {
    this.addInt64(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */


flatbuffers.Builder.prototype.addFieldFloat32 = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat32(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */


flatbuffers.Builder.prototype.addFieldFloat64 = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat64(value);
    this.slot(voffset);
  }
};
/**
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */


flatbuffers.Builder.prototype.addFieldOffset = function (voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addOffset(value);
    this.slot(voffset);
  }
};
/**
 * Structs are stored inline, so nothing additional is being added. `d` is always 0.
 *
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */


flatbuffers.Builder.prototype.addFieldStruct = function (voffset, value, defaultValue) {
  if (value != defaultValue) {
    this.nested(value);
    this.slot(voffset);
  }
};
/**
 * Structures are always stored inline, they need to be created right
 * where they're used.  You'll get this assertion failure if you
 * created it elsewhere.
 *
 * @param {flatbuffers.Offset} obj The offset of the created object
 */


flatbuffers.Builder.prototype.nested = function (obj) {
  if (obj != this.offset()) {
    throw new Error('FlatBuffers: struct must be serialized inline.');
  }
};
/**
 * Should not be creating any other object, string or vector
 * while an object is being constructed
 */


flatbuffers.Builder.prototype.notNested = function () {
  if (this.isNested) {
    throw new Error('FlatBuffers: object serialization must not be nested.');
  }
};
/**
 * Set the current vtable at `voffset` to the current location in the buffer.
 *
 * @param {number} voffset
 */


flatbuffers.Builder.prototype.slot = function (voffset) {
  this.vtable[voffset] = this.offset();
};
/**
 * @returns {flatbuffers.Offset} Offset relative to the end of the buffer.
 */


flatbuffers.Builder.prototype.offset = function () {
  return this.bb.capacity() - this.space;
};
/**
 * Doubles the size of the backing ByteBuffer and copies the old data towards
 * the end of the new buffer (since we build the buffer backwards).
 *
 * @param {flatbuffers.ByteBuffer} bb The current buffer with the existing data
 * @returns {flatbuffers.ByteBuffer} A new byte buffer with the old data copied
 * to it. The data is located at the end of the buffer.
 *
 * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
 * it a uint8Array we need to suppress the type check:
 * @suppress {checkTypes}
 */


flatbuffers.Builder.growByteBuffer = function (bb) {
  var old_buf_size = bb.capacity(); // Ensure we don't grow beyond what fits in an int.

  if (old_buf_size & 0xC0000000) {
    throw new Error('FlatBuffers: cannot grow buffer beyond 2 gigabytes.');
  }

  var new_buf_size = old_buf_size << 1;
  var nbb = flatbuffers.ByteBuffer.allocate(new_buf_size);
  nbb.setPosition(new_buf_size - old_buf_size);
  nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
  return nbb;
}; /// @endcond

/**
 * Adds on offset, relative to where it will be written.
 *
 * @param {flatbuffers.Offset} offset The offset to add.
 */


flatbuffers.Builder.prototype.addOffset = function (offset) {
  this.prep(flatbuffers.SIZEOF_INT, 0); // Ensure alignment is already done.

  this.writeInt32(this.offset() - offset + flatbuffers.SIZEOF_INT);
}; /// @cond FLATBUFFERS_INTERNAL

/**
 * Start encoding a new object in the buffer.  Users will not usually need to
 * call this directly. The FlatBuffers compiler will generate helper methods
 * that call this method internally.
 *
 * @param {number} numfields
 */


flatbuffers.Builder.prototype.startObject = function (numfields) {
  this.notNested();

  if (this.vtable == null) {
    this.vtable = [];
  }

  this.vtable_in_use = numfields;

  for (var i = 0; i < numfields; i++) {
    this.vtable[i] = 0; // This will push additional elements as needed
  }

  this.isNested = true;
  this.object_start = this.offset();
};
/**
 * Finish off writing the object that is under construction.
 *
 * @returns {flatbuffers.Offset} The offset to the object inside `dataBuffer`
 */


flatbuffers.Builder.prototype.endObject = function () {
  if (this.vtable == null || !this.isNested) {
    throw new Error('FlatBuffers: endObject called without startObject');
  }

  this.addInt32(0);
  var vtableloc = this.offset(); // Trim trailing zeroes.

  var i = this.vtable_in_use - 1;

  for (; i >= 0 && this.vtable[i] == 0; i--) {}

  var trimmed_size = i + 1; // Write out the current vtable.

  for (; i >= 0; i--) {
    // Offset relative to the start of the table.
    this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
  }

  var standard_fields = 2; // The fields below:

  this.addInt16(vtableloc - this.object_start);
  var len = (trimmed_size + standard_fields) * flatbuffers.SIZEOF_SHORT;
  this.addInt16(len); // Search for an existing vtable that matches the current one.

  var existing_vtable = 0;
  var vt1 = this.space;

  outer_loop: for (i = 0; i < this.vtables.length; i++) {
    var vt2 = this.bb.capacity() - this.vtables[i];

    if (len == this.bb.readInt16(vt2)) {
      for (var j = flatbuffers.SIZEOF_SHORT; j < len; j += flatbuffers.SIZEOF_SHORT) {
        if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
          continue outer_loop;
        }
      }

      existing_vtable = this.vtables[i];
      break;
    }
  }

  if (existing_vtable) {
    // Found a match:
    // Remove the current vtable.
    this.space = this.bb.capacity() - vtableloc; // Point table to existing vtable.

    this.bb.writeInt32(this.space, existing_vtable - vtableloc);
  } else {
    // No match:
    // Add the location of the current vtable to the list of vtables.
    this.vtables.push(this.offset()); // Point table to current vtable.

    this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
  }

  this.isNested = false;
  return vtableloc;
}; /// @endcond

/**
 * Finalize a buffer, poiting to the given `root_table`.
 *
 * @param {flatbuffers.Offset} root_table
 * @param {string=} opt_file_identifier
 */


flatbuffers.Builder.prototype.finish = function (root_table, opt_file_identifier) {
  if (opt_file_identifier) {
    var file_identifier = opt_file_identifier;
    this.prep(this.minalign, flatbuffers.SIZEOF_INT + flatbuffers.FILE_IDENTIFIER_LENGTH);

    if (file_identifier.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
      throw new Error('FlatBuffers: file identifier must be length ' + flatbuffers.FILE_IDENTIFIER_LENGTH);
    }

    for (var i = flatbuffers.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
      this.writeInt8(file_identifier.charCodeAt(i));
    }
  }

  this.prep(this.minalign, flatbuffers.SIZEOF_INT);
  this.addOffset(root_table);
  this.bb.setPosition(this.space);
}; /// @cond FLATBUFFERS_INTERNAL

/**
 * This checks a required field has been set in a given table that has
 * just been constructed.
 *
 * @param {flatbuffers.Offset} table
 * @param {number} field
 */


flatbuffers.Builder.prototype.requiredField = function (table, field) {
  var table_start = this.bb.capacity() - table;
  var vtable_start = table_start - this.bb.readInt32(table_start);
  var ok = this.bb.readInt16(vtable_start + field) != 0; // If this fails, the caller will show what field needs to be set.

  if (!ok) {
    throw new Error('FlatBuffers: field ' + field + ' must be set');
  }
};
/**
 * Start a new array/vector of objects.  Users usually will not call
 * this directly. The FlatBuffers compiler will create a start/end
 * method for vector types in generated code.
 *
 * @param {number} elem_size The size of each element in the array
 * @param {number} num_elems The number of elements in the array
 * @param {number} alignment The alignment of the array
 */


flatbuffers.Builder.prototype.startVector = function (elem_size, num_elems, alignment) {
  this.notNested();
  this.vector_num_elems = num_elems;
  this.prep(flatbuffers.SIZEOF_INT, elem_size * num_elems);
  this.prep(alignment, elem_size * num_elems); // Just in case alignment > int.
};
/**
 * Finish off the creation of an array and all its elements. The array must be
 * created with `startVector`.
 *
 * @returns {flatbuffers.Offset} The offset at which the newly created array
 * starts.
 */


flatbuffers.Builder.prototype.endVector = function () {
  this.writeInt32(this.vector_num_elems);
  return this.offset();
}; /// @endcond

/**
 * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
 * instead of a string, it is assumed to contain valid UTF-8 encoded data.
 *
 * @param {string|Uint8Array} s The string to encode
 * @return {flatbuffers.Offset} The offset in the buffer where the encoded string starts
 */


flatbuffers.Builder.prototype.createString = function (s) {
  if (s instanceof Uint8Array) {
    var utf8 = s;
  } else {
    var utf8 = [];
    var i = 0;

    while (i < s.length) {
      var codePoint; // Decode UTF-16

      var a = s.charCodeAt(i++);

      if (a < 0xD800 || a >= 0xDC00) {
        codePoint = a;
      } else {
        var b = s.charCodeAt(i++);
        codePoint = (a << 10) + b + (0x10000 - (0xD800 << 10) - 0xDC00);
      } // Encode UTF-8


      if (codePoint < 0x80) {
        utf8.push(codePoint);
      } else {
        if (codePoint < 0x800) {
          utf8.push(codePoint >> 6 & 0x1F | 0xC0);
        } else {
          if (codePoint < 0x10000) {
            utf8.push(codePoint >> 12 & 0x0F | 0xE0);
          } else {
            utf8.push(codePoint >> 18 & 0x07 | 0xF0, codePoint >> 12 & 0x3F | 0x80);
          }

          utf8.push(codePoint >> 6 & 0x3F | 0x80);
        }

        utf8.push(codePoint & 0x3F | 0x80);
      }
    }
  }

  this.addInt8(0);
  this.startVector(1, utf8.length, 1);
  this.bb.setPosition(this.space -= utf8.length);

  for (var i = 0, offset = this.space, bytes = this.bb.bytes(); i < utf8.length; i++) {
    bytes[offset++] = utf8[i];
  }

  return this.endVector();
};
/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {flatbuffers.Long}
 */


flatbuffers.Builder.prototype.createLong = function (low, high) {
  return flatbuffers.Long.create(low, high);
}; ////////////////////////////////////////////////////////////////////////////////
/// @cond FLATBUFFERS_INTERNAL

/**
 * Create a new ByteBuffer with a given array of bytes (`Uint8Array`).
 *
 * @constructor
 * @param {Uint8Array} bytes
 */


flatbuffers.ByteBuffer = function (bytes) {
  /**
   * @type {Uint8Array}
   * @private
   */
  this.bytes_ = bytes;
  /**
   * @type {number}
   * @private
   */

  this.position_ = 0;
};
/**
 * Create and allocate a new ByteBuffer with a given size.
 *
 * @param {number} byte_size
 * @returns {flatbuffers.ByteBuffer}
 */


flatbuffers.ByteBuffer.allocate = function (byte_size) {
  return new flatbuffers.ByteBuffer(new Uint8Array(byte_size));
};

flatbuffers.ByteBuffer.prototype.clear = function () {
  this.position_ = 0;
};
/**
 * Get the underlying `Uint8Array`.
 *
 * @returns {Uint8Array}
 */


flatbuffers.ByteBuffer.prototype.bytes = function () {
  return this.bytes_;
};
/**
 * Get the buffer's position.
 *
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.position = function () {
  return this.position_;
};
/**
 * Set the buffer's position.
 *
 * @param {number} position
 */


flatbuffers.ByteBuffer.prototype.setPosition = function (position) {
  this.position_ = position;
};
/**
 * Get the buffer's capacity.
 *
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.capacity = function () {
  return this.bytes_.length;
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readInt8 = function (offset) {
  return this.readUint8(offset) << 24 >> 24;
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readUint8 = function (offset) {
  return this.bytes_[offset];
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readInt16 = function (offset) {
  return this.readUint16(offset) << 16 >> 16;
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readUint16 = function (offset) {
  return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readInt32 = function (offset) {
  return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readUint32 = function (offset) {
  return this.readInt32(offset) >>> 0;
};
/**
 * @param {number} offset
 * @returns {flatbuffers.Long}
 */


flatbuffers.ByteBuffer.prototype.readInt64 = function (offset) {
  return new flatbuffers.Long(this.readInt32(offset), this.readInt32(offset + 4));
};
/**
 * @param {number} offset
 * @returns {flatbuffers.Long}
 */


flatbuffers.ByteBuffer.prototype.readUint64 = function (offset) {
  return new flatbuffers.Long(this.readUint32(offset), this.readUint32(offset + 4));
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readFloat32 = function (offset) {
  flatbuffers.int32[0] = this.readInt32(offset);
  return flatbuffers.float32[0];
};
/**
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.readFloat64 = function (offset) {
  flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1] = this.readInt32(offset);
  flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
  return flatbuffers.float64[0];
};
/**
 * @param {number} offset
 * @param {number|boolean} value
 */


flatbuffers.ByteBuffer.prototype.writeInt8 = function (offset, value) {
  this.bytes_[offset] =
  /** @type {number} */
  value;
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeUint8 = function (offset, value) {
  this.bytes_[offset] = value;
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeInt16 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeUint16 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeInt32 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
  this.bytes_[offset + 2] = value >> 16;
  this.bytes_[offset + 3] = value >> 24;
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeUint32 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
  this.bytes_[offset + 2] = value >> 16;
  this.bytes_[offset + 3] = value >> 24;
};
/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */


flatbuffers.ByteBuffer.prototype.writeInt64 = function (offset, value) {
  this.writeInt32(offset, value.low);
  this.writeInt32(offset + 4, value.high);
};
/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */


flatbuffers.ByteBuffer.prototype.writeUint64 = function (offset, value) {
  this.writeUint32(offset, value.low);
  this.writeUint32(offset + 4, value.high);
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeFloat32 = function (offset, value) {
  flatbuffers.float32[0] = value;
  this.writeInt32(offset, flatbuffers.int32[0]);
};
/**
 * @param {number} offset
 * @param {number} value
 */


flatbuffers.ByteBuffer.prototype.writeFloat64 = function (offset, value) {
  flatbuffers.float64[0] = value;
  this.writeInt32(offset, flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1]);
  this.writeInt32(offset + 4, flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0]);
};
/**
 * Return the file identifier.   Behavior is undefined for FlatBuffers whose
 * schema does not include a file_identifier (likely points at padding or the
 * start of a the root vtable).
 * @returns {string}
 */


flatbuffers.ByteBuffer.prototype.getBufferIdentifier = function () {
  if (this.bytes_.length < this.position_ + flatbuffers.SIZEOF_INT + flatbuffers.FILE_IDENTIFIER_LENGTH) {
    throw new Error('FlatBuffers: ByteBuffer is too short to contain an identifier.');
  }

  var result = "";

  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    result += String.fromCharCode(this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i));
  }

  return result;
};
/**
 * Look up a field in the vtable, return an offset into the object, or 0 if the
 * field is not present.
 *
 * @param {number} bb_pos
 * @param {number} vtable_offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.__offset = function (bb_pos, vtable_offset) {
  var vtable = bb_pos - this.readInt32(bb_pos);
  return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
};
/**
 * Initialize any Table-derived type to point to the union at the given offset.
 *
 * @param {flatbuffers.Table} t
 * @param {number} offset
 * @returns {flatbuffers.Table}
 */


flatbuffers.ByteBuffer.prototype.__union = function (t, offset) {
  t.bb_pos = offset + this.readInt32(offset);
  t.bb = this;
  return t;
};
/**
 * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
 * This allocates a new string and converts to wide chars upon each access.
 *
 * To avoid the conversion to UTF-16, pass flatbuffers.Encoding.UTF8_BYTES as
 * the "optionalEncoding" argument. This is useful for avoiding conversion to
 * and from UTF-16 when the data will just be packaged back up in another
 * FlatBuffer later on.
 *
 * @param {number} offset
 * @param {flatbuffers.Encoding=} opt_encoding Defaults to UTF16_STRING
 * @returns {string|Uint8Array}
 */


flatbuffers.ByteBuffer.prototype.__string = function (offset, opt_encoding) {
  offset += this.readInt32(offset);
  var length = this.readInt32(offset);
  var result = '';
  var i = 0;
  offset += flatbuffers.SIZEOF_INT;

  if (opt_encoding === flatbuffers.Encoding.UTF8_BYTES) {
    return this.bytes_.subarray(offset, offset + length);
  }

  while (i < length) {
    var codePoint; // Decode UTF-8

    var a = this.readUint8(offset + i++);

    if (a < 0xC0) {
      codePoint = a;
    } else {
      var b = this.readUint8(offset + i++);

      if (a < 0xE0) {
        codePoint = (a & 0x1F) << 6 | b & 0x3F;
      } else {
        var c = this.readUint8(offset + i++);

        if (a < 0xF0) {
          codePoint = (a & 0x0F) << 12 | (b & 0x3F) << 6 | c & 0x3F;
        } else {
          var d = this.readUint8(offset + i++);
          codePoint = (a & 0x07) << 18 | (b & 0x3F) << 12 | (c & 0x3F) << 6 | d & 0x3F;
        }
      }
    } // Encode UTF-16


    if (codePoint < 0x10000) {
      result += String.fromCharCode(codePoint);
    } else {
      codePoint -= 0x10000;
      result += String.fromCharCode((codePoint >> 10) + 0xD800, (codePoint & (1 << 10) - 1) + 0xDC00);
    }
  }

  return result;
};
/**
 * Retrieve the relative offset stored at "offset"
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.__indirect = function (offset) {
  return offset + this.readInt32(offset);
};
/**
 * Get the start of data of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.__vector = function (offset) {
  return offset + this.readInt32(offset) + flatbuffers.SIZEOF_INT; // data starts after the length
};
/**
 * Get the length of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */


flatbuffers.ByteBuffer.prototype.__vector_len = function (offset) {
  return this.readInt32(offset + this.readInt32(offset));
};
/**
 * @param {string} ident
 * @returns {boolean}
 */


flatbuffers.ByteBuffer.prototype.__has_identifier = function (ident) {
  if (ident.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
    throw new Error('FlatBuffers: file identifier must be length ' + flatbuffers.FILE_IDENTIFIER_LENGTH);
  }

  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    if (ident.charCodeAt(i) != this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i)) {
      return false;
    }
  }

  return true;
};
/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {flatbuffers.Long}
 */


flatbuffers.ByteBuffer.prototype.createLong = function (low, high) {
  return flatbuffers.Long.create(low, high);
}; // Exports for Node.js and RequireJS
/// @endcond
/// @}
},{}],"node_modules/text-encoding-utf-8/lib/encoding.lib.js":[function(require,module,exports) {
'use strict';

// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

//
// Utilities
//

/**
 * @param {number} a The number to test.
 * @param {number} min The minimum value in the range, inclusive.
 * @param {number} max The maximum value in the range, inclusive.
 * @return {boolean} True if a >= min and a <= max.
 */
function inRange(a, min, max) {
  return min <= a && a <= max;
}

/**
 * @param {*} o
 * @return {Object}
 */
function ToDictionary(o) {
  if (o === undefined) return {};
  if (o === Object(o)) return o;
  throw TypeError('Could not convert argument to dictionary');
}

/**
 * @param {string} string Input string of UTF-16 code units.
 * @return {!Array.<number>} Code points.
 */
function stringToCodePoints(string) {
  // https://heycam.github.io/webidl/#dfn-obtain-unicode

  // 1. Let S be the DOMString value.
  var s = String(string);

  // 2. Let n be the length of S.
  var n = s.length;

  // 3. Initialize i to 0.
  var i = 0;

  // 4. Initialize U to be an empty sequence of Unicode characters.
  var u = [];

  // 5. While i < n:
  while (i < n) {

    // 1. Let c be the code unit in S at index i.
    var c = s.charCodeAt(i);

    // 2. Depending on the value of c:

    // c < 0xD800 or c > 0xDFFF
    if (c < 0xD800 || c > 0xDFFF) {
      // Append to U the Unicode character with code point c.
      u.push(c);
    }

    // 0xDC00 ≤ c ≤ 0xDFFF
    else if (0xDC00 <= c && c <= 0xDFFF) {
      // Append to U a U+FFFD REPLACEMENT CHARACTER.
      u.push(0xFFFD);
    }

    // 0xD800 ≤ c ≤ 0xDBFF
    else if (0xD800 <= c && c <= 0xDBFF) {
      // 1. If i = n−1, then append to U a U+FFFD REPLACEMENT
      // CHARACTER.
      if (i === n - 1) {
        u.push(0xFFFD);
      }
      // 2. Otherwise, i < n−1:
      else {
        // 1. Let d be the code unit in S at index i+1.
        var d = string.charCodeAt(i + 1);

        // 2. If 0xDC00 ≤ d ≤ 0xDFFF, then:
        if (0xDC00 <= d && d <= 0xDFFF) {
          // 1. Let a be c & 0x3FF.
          var a = c & 0x3FF;

          // 2. Let b be d & 0x3FF.
          var b = d & 0x3FF;

          // 3. Append to U the Unicode character with code point
          // 2^16+2^10*a+b.
          u.push(0x10000 + (a << 10) + b);

          // 4. Set i to i+1.
          i += 1;
        }

        // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
        // U+FFFD REPLACEMENT CHARACTER.
        else  {
          u.push(0xFFFD);
        }
      }
    }

    // 3. Set i to i+1.
    i += 1;
  }

  // 6. Return U.
  return u;
}

/**
 * @param {!Array.<number>} code_points Array of code points.
 * @return {string} string String of UTF-16 code units.
 */
function codePointsToString(code_points) {
  var s = '';
  for (var i = 0; i < code_points.length; ++i) {
    var cp = code_points[i];
    if (cp <= 0xFFFF) {
      s += String.fromCharCode(cp);
    } else {
      cp -= 0x10000;
      s += String.fromCharCode((cp >> 10) + 0xD800,
                               (cp & 0x3FF) + 0xDC00);
    }
  }
  return s;
}


//
// Implementation of Encoding specification
// https://encoding.spec.whatwg.org/
//

//
// 3. Terminology
//

/**
 * End-of-stream is a special token that signifies no more tokens
 * are in the stream.
 * @const
 */ var end_of_stream = -1;

/**
 * A stream represents an ordered sequence of tokens.
 *
 * @constructor
 * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide the
 * stream.
 */
function Stream(tokens) {
  /** @type {!Array.<number>} */
  this.tokens = [].slice.call(tokens);
}

Stream.prototype = {
  /**
   * @return {boolean} True if end-of-stream has been hit.
   */
  endOfStream: function() {
    return !this.tokens.length;
  },

  /**
   * When a token is read from a stream, the first token in the
   * stream must be returned and subsequently removed, and
   * end-of-stream must be returned otherwise.
   *
   * @return {number} Get the next token from the stream, or
   * end_of_stream.
   */
   read: function() {
    if (!this.tokens.length)
      return end_of_stream;
     return this.tokens.shift();
   },

  /**
   * When one or more tokens are prepended to a stream, those tokens
   * must be inserted, in given order, before the first token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
   */
  prepend: function(token) {
    if (Array.isArray(token)) {
      var tokens = /**@type {!Array.<number>}*/(token);
      while (tokens.length)
        this.tokens.unshift(tokens.pop());
    } else {
      this.tokens.unshift(token);
    }
  },

  /**
   * When one or more tokens are pushed to a stream, those tokens
   * must be inserted, in given order, after the last token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
   */
  push: function(token) {
    if (Array.isArray(token)) {
      var tokens = /**@type {!Array.<number>}*/(token);
      while (tokens.length)
        this.tokens.push(tokens.shift());
    } else {
      this.tokens.push(token);
    }
  }
};

//
// 4. Encodings
//

// 4.1 Encoders and decoders

/** @const */
var finished = -1;

/**
 * @param {boolean} fatal If true, decoding errors raise an exception.
 * @param {number=} opt_code_point Override the standard fallback code point.
 * @return {number} The code point to insert on a decoding error.
 */
function decoderError(fatal, opt_code_point) {
  if (fatal)
    throw TypeError('Decoder error');
  return opt_code_point || 0xFFFD;
}

//
// 7. API
//

/** @const */ var DEFAULT_ENCODING = 'utf-8';

// 7.1 Interface TextDecoder

/**
 * @constructor
 * @param {string=} encoding The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
function TextDecoder(encoding, options) {
  if (!(this instanceof TextDecoder)) {
    return new TextDecoder(encoding, options);
  }
  encoding = encoding !== undefined ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error('Encoding not supported. Only utf-8 is supported');
  }
  options = ToDictionary(options);

  /** @private @type {boolean} */
  this._streaming = false;
  /** @private @type {boolean} */
  this._BOMseen = false;
  /** @private @type {?Decoder} */
  this._decoder = null;
  /** @private @type {boolean} */
  this._fatal = Boolean(options['fatal']);
  /** @private @type {boolean} */
  this._ignoreBOM = Boolean(options['ignoreBOM']);

  Object.defineProperty(this, 'encoding', {value: 'utf-8'});
  Object.defineProperty(this, 'fatal', {value: this._fatal});
  Object.defineProperty(this, 'ignoreBOM', {value: this._ignoreBOM});
}

TextDecoder.prototype = {
  /**
   * @param {ArrayBufferView=} input The buffer of bytes to decode.
   * @param {Object=} options
   * @return {string} The decoded string.
   */
  decode: function decode(input, options) {
    var bytes;
    if (typeof input === 'object' && input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (typeof input === 'object' && 'buffer' in input &&
               input.buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(input.buffer,
                             input.byteOffset,
                             input.byteLength);
    } else {
      bytes = new Uint8Array(0);
    }

    options = ToDictionary(options);

    if (!this._streaming) {
      this._decoder = new UTF8Decoder({fatal: this._fatal});
      this._BOMseen = false;
    }
    this._streaming = Boolean(options['stream']);

    var input_stream = new Stream(bytes);

    var code_points = [];

    /** @type {?(number|!Array.<number>)} */
    var result;

    while (!input_stream.endOfStream()) {
      result = this._decoder.handler(input_stream, input_stream.read());
      if (result === finished)
        break;
      if (result === null)
        continue;
      if (Array.isArray(result))
        code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
      else
        code_points.push(result);
    }
    if (!this._streaming) {
      do {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (result === null)
          continue;
        if (Array.isArray(result))
          code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
        else
          code_points.push(result);
      } while (!input_stream.endOfStream());
      this._decoder = null;
    }

    if (code_points.length) {
      // If encoding is one of utf-8, utf-16be, and utf-16le, and
      // ignore BOM flag and BOM seen flag are unset, run these
      // subsubsteps:
      if (['utf-8'].indexOf(this.encoding) !== -1 &&
          !this._ignoreBOM && !this._BOMseen) {
        // If token is U+FEFF, set BOM seen flag.
        if (code_points[0] === 0xFEFF) {
          this._BOMseen = true;
          code_points.shift();
        } else {
          // Otherwise, if token is not end-of-stream, set BOM seen
          // flag and append token to output.
          this._BOMseen = true;
        }
      }
    }

    return codePointsToString(code_points);
  }
};

// 7.2 Interface TextEncoder

/**
 * @constructor
 * @param {string=} encoding The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
function TextEncoder(encoding, options) {
  if (!(this instanceof TextEncoder))
    return new TextEncoder(encoding, options);
  encoding = encoding !== undefined ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error('Encoding not supported. Only utf-8 is supported');
  }
  options = ToDictionary(options);

  /** @private @type {boolean} */
  this._streaming = false;
  /** @private @type {?Encoder} */
  this._encoder = null;
  /** @private @type {{fatal: boolean}} */
  this._options = {fatal: Boolean(options['fatal'])};

  Object.defineProperty(this, 'encoding', {value: 'utf-8'});
}

TextEncoder.prototype = {
  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {Uint8Array} Encoded bytes, as a Uint8Array.
   */
  encode: function encode(opt_string, options) {
    opt_string = opt_string ? String(opt_string) : '';
    options = ToDictionary(options);

    // NOTE: This option is nonstandard. None of the encodings
    // permitted for encoding (i.e. UTF-8, UTF-16) are stateful,
    // so streaming is not necessary.
    if (!this._streaming)
      this._encoder = new UTF8Encoder(this._options);
    this._streaming = Boolean(options['stream']);

    var bytes = [];
    var input_stream = new Stream(stringToCodePoints(opt_string));
    /** @type {?(number|!Array.<number>)} */
    var result;
    while (!input_stream.endOfStream()) {
      result = this._encoder.handler(input_stream, input_stream.read());
      if (result === finished)
        break;
      if (Array.isArray(result))
        bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
      else
        bytes.push(result);
    }
    if (!this._streaming) {
      while (true) {
        result = this._encoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (Array.isArray(result))
          bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
        else
          bytes.push(result);
      }
      this._encoder = null;
    }
    return new Uint8Array(bytes);
  }
};

//
// 8. The encoding
//

// 8.1 utf-8

/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
function UTF8Decoder(options) {
  var fatal = options.fatal;

  // utf-8's decoder's has an associated utf-8 code point, utf-8
  // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
  // lower boundary (initially 0x80), and a utf-8 upper boundary
  // (initially 0xBF).
  var /** @type {number} */ utf8_code_point = 0,
      /** @type {number} */ utf8_bytes_seen = 0,
      /** @type {number} */ utf8_bytes_needed = 0,
      /** @type {number} */ utf8_lower_boundary = 0x80,
      /** @type {number} */ utf8_upper_boundary = 0xBF;

  /**
   * @param {Stream} stream The stream of bytes being decoded.
   * @param {number} bite The next byte read from the stream.
   * @return {?(number|!Array.<number>)} The next code point(s)
   *     decoded, or null if not enough data exists in the input
   *     stream to decode a complete code point.
   */
  this.handler = function(stream, bite) {
    // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
    // set utf-8 bytes needed to 0 and return error.
    if (bite === end_of_stream && utf8_bytes_needed !== 0) {
      utf8_bytes_needed = 0;
      return decoderError(fatal);
    }

    // 2. If byte is end-of-stream, return finished.
    if (bite === end_of_stream)
      return finished;

    // 3. If utf-8 bytes needed is 0, based on byte:
    if (utf8_bytes_needed === 0) {

      // 0x00 to 0x7F
      if (inRange(bite, 0x00, 0x7F)) {
        // Return a code point whose value is byte.
        return bite;
      }

      // 0xC2 to 0xDF
      if (inRange(bite, 0xC2, 0xDF)) {
        // Set utf-8 bytes needed to 1 and utf-8 code point to byte
        // − 0xC0.
        utf8_bytes_needed = 1;
        utf8_code_point = bite - 0xC0;
      }

      // 0xE0 to 0xEF
      else if (inRange(bite, 0xE0, 0xEF)) {
        // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
        if (bite === 0xE0)
          utf8_lower_boundary = 0xA0;
        // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
        if (bite === 0xED)
          utf8_upper_boundary = 0x9F;
        // 3. Set utf-8 bytes needed to 2 and utf-8 code point to
        // byte − 0xE0.
        utf8_bytes_needed = 2;
        utf8_code_point = bite - 0xE0;
      }

      // 0xF0 to 0xF4
      else if (inRange(bite, 0xF0, 0xF4)) {
        // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
        if (bite === 0xF0)
          utf8_lower_boundary = 0x90;
        // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
        if (bite === 0xF4)
          utf8_upper_boundary = 0x8F;
        // 3. Set utf-8 bytes needed to 3 and utf-8 code point to
        // byte − 0xF0.
        utf8_bytes_needed = 3;
        utf8_code_point = bite - 0xF0;
      }

      // Otherwise
      else {
        // Return error.
        return decoderError(fatal);
      }

      // Then (byte is in the range 0xC2 to 0xF4) set utf-8 code
      // point to utf-8 code point << (6 × utf-8 bytes needed) and
      // return continue.
      utf8_code_point = utf8_code_point << (6 * utf8_bytes_needed);
      return null;
    }

    // 4. If byte is not in the range utf-8 lower boundary to utf-8
    // upper boundary, run these substeps:
    if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {

      // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
      // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
      // utf-8 upper boundary to 0xBF.
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xBF;

      // 2. Prepend byte to stream.
      stream.prepend(bite);

      // 3. Return error.
      return decoderError(fatal);
    }

    // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
    // to 0xBF.
    utf8_lower_boundary = 0x80;
    utf8_upper_boundary = 0xBF;

    // 6. Increase utf-8 bytes seen by one and set utf-8 code point
    // to utf-8 code point + (byte − 0x80) << (6 × (utf-8 bytes
    // needed − utf-8 bytes seen)).
    utf8_bytes_seen += 1;
    utf8_code_point += (bite - 0x80) << (6 * (utf8_bytes_needed - utf8_bytes_seen));

    // 7. If utf-8 bytes seen is not equal to utf-8 bytes needed,
    // continue.
    if (utf8_bytes_seen !== utf8_bytes_needed)
      return null;

    // 8. Let code point be utf-8 code point.
    var code_point = utf8_code_point;

    // 9. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
    // seen to 0.
    utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;

    // 10. Return a code point whose value is code point.
    return code_point;
  };
}

/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
function UTF8Encoder(options) {
  var fatal = options.fatal;
  /**
   * @param {Stream} stream Input stream.
   * @param {number} code_point Next code point read from the stream.
   * @return {(number|!Array.<number>)} Byte(s) to emit.
   */
  this.handler = function(stream, code_point) {
    // 1. If code point is end-of-stream, return finished.
    if (code_point === end_of_stream)
      return finished;

    // 2. If code point is in the range U+0000 to U+007F, return a
    // byte whose value is code point.
    if (inRange(code_point, 0x0000, 0x007f))
      return code_point;

    // 3. Set count and offset based on the range code point is in:
    var count, offset;
    // U+0080 to U+07FF:    1 and 0xC0
    if (inRange(code_point, 0x0080, 0x07FF)) {
      count = 1;
      offset = 0xC0;
    }
    // U+0800 to U+FFFF:    2 and 0xE0
    else if (inRange(code_point, 0x0800, 0xFFFF)) {
      count = 2;
      offset = 0xE0;
    }
    // U+10000 to U+10FFFF: 3 and 0xF0
    else if (inRange(code_point, 0x10000, 0x10FFFF)) {
      count = 3;
      offset = 0xF0;
    }

    // 4.Let bytes be a byte sequence whose first byte is (code
    // point >> (6 × count)) + offset.
    var bytes = [(code_point >> (6 * count)) + offset];

    // 5. Run these substeps while count is greater than 0:
    while (count > 0) {

      // 1. Set temp to code point >> (6 × (count − 1)).
      var temp = code_point >> (6 * (count - 1));

      // 2. Append to bytes 0x80 | (temp & 0x3F).
      bytes.push(0x80 | (temp & 0x3F));

      // 3. Decrease count by one.
      count -= 1;
    }

    // 6. Return bytes bytes, in order.
    return bytes;
  };
}

exports.TextEncoder = TextEncoder;
exports.TextDecoder = TextDecoder;
},{}],"node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"node_modules/base64-js/index.js","ieee754":"node_modules/ieee754/index.js","isarray":"node_modules/isarray/index.js","buffer":"node_modules/buffer/index.js"}],"node_modules/apache-arrow/util/utf8.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("./buffer");
const text_encoding_utf_8_1 = require("text-encoding-utf-8");
/** @ignore @suppress {missingRequire} */
const _Buffer = typeof Buffer === 'function' ? Buffer : null;
/** @ignore */
const useNativeEncoders = typeof TextDecoder === 'function' && typeof TextEncoder === 'function';
/** @ignore */
exports.decodeUtf8 = ((TextDecoder) => {
    if (useNativeEncoders || !_Buffer) {
        const decoder = new TextDecoder('utf-8');
        return (buffer) => decoder.decode(buffer);
    }
    return (input) => {
        const { buffer, byteOffset, length } = buffer_1.toUint8Array(input);
        return _Buffer.from(buffer, byteOffset, length).toString();
    };
})(typeof TextDecoder !== 'undefined' ? TextDecoder : text_encoding_utf_8_1.TextDecoder);
/** @ignore */
exports.encodeUtf8 = ((TextEncoder) => {
    if (useNativeEncoders || !_Buffer) {
        const encoder = new TextEncoder();
        return (value) => encoder.encode(value);
    }
    return (input = '') => buffer_1.toUint8Array(_Buffer.from(input, 'utf8'));
})(typeof TextEncoder !== 'undefined' ? TextEncoder : text_encoding_utf_8_1.TextEncoder);



},{"./buffer":"node_modules/apache-arrow/util/buffer.js","text-encoding-utf-8":"node_modules/text-encoding-utf-8/lib/encoding.lib.js","buffer":"node_modules/buffer/index.js"}],"node_modules/apache-arrow/io/interfaces.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./adapters");
/** @ignore */
exports.ITERATOR_DONE = Object.freeze({ done: true, value: void (0) });
/** @ignore */
class ArrowJSON {
    // @ts-ignore
    constructor(_json) {
        this._json = _json;
    }
    get schema() { return this._json['schema']; }
    get batches() { return (this._json['batches'] || []); }
    get dictionaries() { return (this._json['dictionaries'] || []); }
}
exports.ArrowJSON = ArrowJSON;
/** @ignore */
class ReadableInterop {
    tee() {
        return this._getDOMStream().tee();
    }
    pipe(writable, options) {
        return this._getNodeStream().pipe(writable, options);
    }
    pipeTo(writable, options) { return this._getDOMStream().pipeTo(writable, options); }
    pipeThrough(duplex, options) {
        return this._getDOMStream().pipeThrough(duplex, options);
    }
    _getDOMStream() {
        return this._DOMStream || (this._DOMStream = this.toDOMStream());
    }
    _getNodeStream() {
        return this._nodeStream || (this._nodeStream = this.toNodeStream());
    }
}
exports.ReadableInterop = ReadableInterop;
/** @ignore */
class AsyncQueue extends ReadableInterop {
    constructor() {
        super();
        this._values = [];
        this.resolvers = [];
        this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
    }
    get closed() { return this._closedPromise; }
    async cancel(reason) { await this.return(reason); }
    write(value) {
        if (this._ensureOpen()) {
            this.resolvers.length <= 0
                ? (this._values.push(value))
                : (this.resolvers.shift().resolve({ done: false, value }));
        }
    }
    abort(value) {
        if (this._closedPromiseResolve) {
            this.resolvers.length <= 0
                ? (this._error = { error: value })
                : (this.resolvers.shift().reject({ done: true, value }));
        }
    }
    close() {
        if (this._closedPromiseResolve) {
            const { resolvers } = this;
            while (resolvers.length > 0) {
                resolvers.shift().resolve(exports.ITERATOR_DONE);
            }
            this._closedPromiseResolve();
            this._closedPromiseResolve = undefined;
        }
    }
    [Symbol.asyncIterator]() { return this; }
    toDOMStream(options) {
        return adapters_1.default.toDOMStream((this._closedPromiseResolve || this._error)
            ? this
            : this._values, options);
    }
    toNodeStream(options) {
        return adapters_1.default.toNodeStream((this._closedPromiseResolve || this._error)
            ? this
            : this._values, options);
    }
    async throw(_) { await this.abort(_); return exports.ITERATOR_DONE; }
    async return(_) { await this.close(); return exports.ITERATOR_DONE; }
    async read(size) { return (await this.next(size, 'read')).value; }
    async peek(size) { return (await this.next(size, 'peek')).value; }
    next(..._args) {
        if (this._values.length > 0) {
            return Promise.resolve({ done: false, value: this._values.shift() });
        }
        else if (this._error) {
            return Promise.reject({ done: true, value: this._error.error });
        }
        else if (!this._closedPromiseResolve) {
            return Promise.resolve(exports.ITERATOR_DONE);
        }
        else {
            return new Promise((resolve, reject) => {
                this.resolvers.push({ resolve, reject });
            });
        }
    }
    _ensureOpen() {
        if (this._closedPromiseResolve) {
            return true;
        }
        throw new Error(`${this} is closed`);
    }
}
exports.AsyncQueue = AsyncQueue;



},{"./adapters":"node_modules/apache-arrow/io/adapters.js"}],"node_modules/apache-arrow/util/compat.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../io/interfaces");
/** @ignore */
const [BigIntCtor, BigIntAvailable] = (() => {
    const BigIntUnavailableError = () => { throw new Error('BigInt is not available in this environment'); };
    function BigIntUnavailable() { throw BigIntUnavailableError(); }
    BigIntUnavailable.asIntN = () => { throw BigIntUnavailableError(); };
    BigIntUnavailable.asUintN = () => { throw BigIntUnavailableError(); };
    return typeof BigInt !== 'undefined' ? [BigInt, true] : [BigIntUnavailable, false];
})();
exports.BigInt = BigIntCtor;
exports.BigIntAvailable = BigIntAvailable;
/** @ignore */
const [BigInt64ArrayCtor, BigInt64ArrayAvailable] = (() => {
    const BigInt64ArrayUnavailableError = () => { throw new Error('BigInt64Array is not available in this environment'); };
    class BigInt64ArrayUnavailable {
        static get BYTES_PER_ELEMENT() { return 8; }
        static of() { throw BigInt64ArrayUnavailableError(); }
        static from() { throw BigInt64ArrayUnavailableError(); }
        constructor() { throw BigInt64ArrayUnavailableError(); }
    }
    return typeof BigInt64Array !== 'undefined' ? [BigInt64Array, true] : [BigInt64ArrayUnavailable, false];
})();
exports.BigInt64Array = BigInt64ArrayCtor;
exports.BigInt64ArrayAvailable = BigInt64ArrayAvailable;
/** @ignore */
const [BigUint64ArrayCtor, BigUint64ArrayAvailable] = (() => {
    const BigUint64ArrayUnavailableError = () => { throw new Error('BigUint64Array is not available in this environment'); };
    class BigUint64ArrayUnavailable {
        static get BYTES_PER_ELEMENT() { return 8; }
        static of() { throw BigUint64ArrayUnavailableError(); }
        static from() { throw BigUint64ArrayUnavailableError(); }
        constructor() { throw BigUint64ArrayUnavailableError(); }
    }
    return typeof BigUint64Array !== 'undefined' ? [BigUint64Array, true] : [BigUint64ArrayUnavailable, false];
})();
exports.BigUint64Array = BigUint64ArrayCtor;
exports.BigUint64ArrayAvailable = BigUint64ArrayAvailable;
/** @ignore */ const isNumber = (x) => typeof x === 'number';
/** @ignore */ const isBoolean = (x) => typeof x === 'boolean';
/** @ignore */ const isFunction = (x) => typeof x === 'function';
/** @ignore */
exports.isObject = (x) => x != null && Object(x) === x;
/** @ignore */
exports.isPromise = (x) => {
    return exports.isObject(x) && isFunction(x.then);
};
/** @ignore */
exports.isObservable = (x) => {
    return exports.isObject(x) && isFunction(x.subscribe);
};
/** @ignore */
exports.isIterable = (x) => {
    return exports.isObject(x) && isFunction(x[Symbol.iterator]);
};
/** @ignore */
exports.isAsyncIterable = (x) => {
    return exports.isObject(x) && isFunction(x[Symbol.asyncIterator]);
};
/** @ignore */
exports.isArrowJSON = (x) => {
    return exports.isObject(x) && exports.isObject(x['schema']);
};
/** @ignore */
exports.isArrayLike = (x) => {
    return exports.isObject(x) && isNumber(x['length']);
};
/** @ignore */
exports.isIteratorResult = (x) => {
    return exports.isObject(x) && ('done' in x) && ('value' in x);
};
/** @ignore */
exports.isUnderlyingSink = (x) => {
    return exports.isObject(x) &&
        isFunction(x['abort']) &&
        isFunction(x['close']) &&
        isFunction(x['start']) &&
        isFunction(x['write']);
};
/** @ignore */
exports.isFileHandle = (x) => {
    return exports.isObject(x) && isFunction(x['stat']) && isNumber(x['fd']);
};
/** @ignore */
exports.isFSReadStream = (x) => {
    return exports.isReadableNodeStream(x) && isNumber(x['bytesRead']);
};
/** @ignore */
exports.isFetchResponse = (x) => {
    return exports.isObject(x) && exports.isReadableDOMStream(x['body']);
};
/** @ignore */
exports.isWritableDOMStream = (x) => {
    return exports.isObject(x) &&
        isFunction(x['abort']) &&
        isFunction(x['getWriter']) &&
        !(x instanceof interfaces_1.ReadableInterop);
};
/** @ignore */
exports.isReadableDOMStream = (x) => {
    return exports.isObject(x) &&
        isFunction(x['cancel']) &&
        isFunction(x['getReader']) &&
        !(x instanceof interfaces_1.ReadableInterop);
};
/** @ignore */
exports.isWritableNodeStream = (x) => {
    return exports.isObject(x) &&
        isFunction(x['end']) &&
        isFunction(x['write']) &&
        isBoolean(x['writable']) &&
        !(x instanceof interfaces_1.ReadableInterop);
};
/** @ignore */
exports.isReadableNodeStream = (x) => {
    return exports.isObject(x) &&
        isFunction(x['read']) &&
        isFunction(x['pipe']) &&
        isBoolean(x['readable']) &&
        !(x instanceof interfaces_1.ReadableInterop);
};



},{"../io/interfaces":"node_modules/apache-arrow/io/interfaces.js"}],"node_modules/apache-arrow/util/buffer.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const flatbuffers_1 = require("flatbuffers");
const utf8_1 = require("../util/utf8");
var ByteBuffer = flatbuffers_1.flatbuffers.ByteBuffer;
const compat_1 = require("./compat");
/** @ignore */
const SharedArrayBuf = (typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : ArrayBuffer);
/** @ignore */
function collapseContiguousByteRanges(chunks) {
    let result = chunks[0] ? [chunks[0]] : [];
    let xOffset, yOffset, xLen, yLen;
    for (let x, y, i = 0, j = 0, n = chunks.length; ++i < n;) {
        x = result[j];
        y = chunks[i];
        // continue if x and y don't share the same underlying ArrayBuffer, or if x isn't before y
        if (!x || !y || x.buffer !== y.buffer || y.byteOffset < x.byteOffset) {
            y && (result[++j] = y);
            continue;
        }
        ({ byteOffset: xOffset, byteLength: xLen } = x);
        ({ byteOffset: yOffset, byteLength: yLen } = y);
        // continue if the byte ranges of x and y aren't contiguous
        if ((xOffset + xLen) < yOffset || (yOffset + yLen) < xOffset) {
            y && (result[++j] = y);
            continue;
        }
        result[j] = new Uint8Array(x.buffer, xOffset, yOffset - xOffset + yLen);
    }
    return result;
}
/** @ignore */
function memcpy(target, source, targetByteOffset = 0, sourceByteLength = source.byteLength) {
    const targetByteLength = target.byteLength;
    const dst = new Uint8Array(target.buffer, target.byteOffset, targetByteLength);
    const src = new Uint8Array(source.buffer, source.byteOffset, Math.min(sourceByteLength, targetByteLength));
    dst.set(src, targetByteOffset);
    return target;
}
exports.memcpy = memcpy;
/** @ignore */
function joinUint8Arrays(chunks, size) {
    // collapse chunks that share the same underlying ArrayBuffer and whose byte ranges overlap,
    // to avoid unnecessarily copying the bytes to do this buffer join. This is a common case during
    // streaming, where we may be reading partial byte ranges out of the same underlying ArrayBuffer
    let result = collapseContiguousByteRanges(chunks);
    let byteLength = result.reduce((x, b) => x + b.byteLength, 0);
    let source, sliced, buffer;
    let offset = 0, index = -1, length = Math.min(size || Infinity, byteLength);
    for (let n = result.length; ++index < n;) {
        source = result[index];
        sliced = source.subarray(0, Math.min(source.length, length - offset));
        if (length <= (offset + sliced.length)) {
            if (sliced.length < source.length) {
                result[index] = source.subarray(sliced.length);
            }
            else if (sliced.length === source.length) {
                index++;
            }
            buffer ? memcpy(buffer, sliced, offset) : (buffer = sliced);
            break;
        }
        memcpy(buffer || (buffer = new Uint8Array(length)), sliced, offset);
        offset += sliced.length;
    }
    return [buffer || new Uint8Array(0), result.slice(index), byteLength - (buffer ? buffer.byteLength : 0)];
}
exports.joinUint8Arrays = joinUint8Arrays;
function toArrayBufferView(ArrayBufferViewCtor, input) {
    let value = compat_1.isIteratorResult(input) ? input.value : input;
    if (value instanceof ArrayBufferViewCtor) {
        if (ArrayBufferViewCtor === Uint8Array) {
            // Node's `Buffer` class passes the `instanceof Uint8Array` check, but we need
            // a real Uint8Array, since Buffer#slice isn't the same as Uint8Array#slice :/
            return new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength);
        }
        return value;
    }
    if (!value) {
        return new ArrayBufferViewCtor(0);
    }
    if (typeof value === 'string') {
        value = utf8_1.encodeUtf8(value);
    }
    if (value instanceof ArrayBuffer) {
        return new ArrayBufferViewCtor(value);
    }
    if (value instanceof SharedArrayBuf) {
        return new ArrayBufferViewCtor(value);
    }
    if (value instanceof ByteBuffer) {
        return toArrayBufferView(ArrayBufferViewCtor, value.bytes());
    }
    return !ArrayBuffer.isView(value) ? ArrayBufferViewCtor.from(value) : value.byteLength <= 0 ? new ArrayBufferViewCtor(0)
        : new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength / ArrayBufferViewCtor.BYTES_PER_ELEMENT);
}
exports.toArrayBufferView = toArrayBufferView;
/** @ignore */ exports.toInt8Array = (input) => toArrayBufferView(Int8Array, input);
/** @ignore */ exports.toInt16Array = (input) => toArrayBufferView(Int16Array, input);
/** @ignore */ exports.toInt32Array = (input) => toArrayBufferView(Int32Array, input);
/** @ignore */ exports.toBigInt64Array = (input) => toArrayBufferView(compat_1.BigInt64Array, input);
/** @ignore */ exports.toUint8Array = (input) => toArrayBufferView(Uint8Array, input);
/** @ignore */ exports.toUint16Array = (input) => toArrayBufferView(Uint16Array, input);
/** @ignore */ exports.toUint32Array = (input) => toArrayBufferView(Uint32Array, input);
/** @ignore */ exports.toBigUint64Array = (input) => toArrayBufferView(compat_1.BigUint64Array, input);
/** @ignore */ exports.toFloat32Array = (input) => toArrayBufferView(Float32Array, input);
/** @ignore */ exports.toFloat64Array = (input) => toArrayBufferView(Float64Array, input);
/** @ignore */ exports.toUint8ClampedArray = (input) => toArrayBufferView(Uint8ClampedArray, input);
/** @ignore */
const pump = (iterator) => { iterator.next(); return iterator; };
/** @ignore */
function* toArrayBufferViewIterator(ArrayCtor, source) {
    const wrap = function* (x) { yield x; };
    const buffers = (typeof source === 'string') ? wrap(source)
        : (ArrayBuffer.isView(source)) ? wrap(source)
            : (source instanceof ArrayBuffer) ? wrap(source)
                : (source instanceof SharedArrayBuf) ? wrap(source)
                    : !compat_1.isIterable(source) ? wrap(source) : source;
    yield* pump((function* (it) {
        let r = null;
        do {
            r = it.next(yield toArrayBufferView(ArrayCtor, r));
        } while (!r.done);
    })(buffers[Symbol.iterator]()));
}
exports.toArrayBufferViewIterator = toArrayBufferViewIterator;
/** @ignore */ exports.toInt8ArrayIterator = (input) => toArrayBufferViewIterator(Int8Array, input);
/** @ignore */ exports.toInt16ArrayIterator = (input) => toArrayBufferViewIterator(Int16Array, input);
/** @ignore */ exports.toInt32ArrayIterator = (input) => toArrayBufferViewIterator(Int32Array, input);
/** @ignore */ exports.toUint8ArrayIterator = (input) => toArrayBufferViewIterator(Uint8Array, input);
/** @ignore */ exports.toUint16ArrayIterator = (input) => toArrayBufferViewIterator(Uint16Array, input);
/** @ignore */ exports.toUint32ArrayIterator = (input) => toArrayBufferViewIterator(Uint32Array, input);
/** @ignore */ exports.toFloat32ArrayIterator = (input) => toArrayBufferViewIterator(Float32Array, input);
/** @ignore */ exports.toFloat64ArrayIterator = (input) => toArrayBufferViewIterator(Float64Array, input);
/** @ignore */ exports.toUint8ClampedArrayIterator = (input) => toArrayBufferViewIterator(Uint8ClampedArray, input);
/** @ignore */
async function* toArrayBufferViewAsyncIterator(ArrayCtor, source) {
    // if a Promise, unwrap the Promise and iterate the resolved value
    if (compat_1.isPromise(source)) {
        return yield* toArrayBufferViewAsyncIterator(ArrayCtor, await source);
    }
    const wrap = async function* (x) { yield await x; };
    const emit = async function* (source) {
        yield* pump((function* (it) {
            let r = null;
            do {
                r = it.next(yield r && r.value);
            } while (!r.done);
        })(source[Symbol.iterator]()));
    };
    const buffers = (typeof source === 'string') ? wrap(source) // if string, wrap in an AsyncIterableIterator
        : (ArrayBuffer.isView(source)) ? wrap(source) // if TypedArray, wrap in an AsyncIterableIterator
            : (source instanceof ArrayBuffer) ? wrap(source) // if ArrayBuffer, wrap in an AsyncIterableIterator
                : (source instanceof SharedArrayBuf) ? wrap(source) // if SharedArrayBuffer, wrap in an AsyncIterableIterator
                    : compat_1.isIterable(source) ? emit(source) // If Iterable, wrap in an AsyncIterableIterator and compose the `next` values
                        : !compat_1.isAsyncIterable(source) ? wrap(source) // If not an AsyncIterable, treat as a sentinel and wrap in an AsyncIterableIterator
                            : source; // otherwise if AsyncIterable, use it
    yield* pump((async function* (it) {
        let r = null;
        do {
            r = await it.next(yield toArrayBufferView(ArrayCtor, r));
        } while (!r.done);
    })(buffers[Symbol.asyncIterator]()));
}
exports.toArrayBufferViewAsyncIterator = toArrayBufferViewAsyncIterator;
/** @ignore */ exports.toInt8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int8Array, input);
/** @ignore */ exports.toInt16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int16Array, input);
/** @ignore */ exports.toInt32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int32Array, input);
/** @ignore */ exports.toUint8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8Array, input);
/** @ignore */ exports.toUint16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint16Array, input);
/** @ignore */ exports.toUint32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint32Array, input);
/** @ignore */ exports.toFloat32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float32Array, input);
/** @ignore */ exports.toFloat64ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float64Array, input);
/** @ignore */ exports.toUint8ClampedArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8ClampedArray, input);
/** @ignore */
function rebaseValueOffsets(offset, length, valueOffsets) {
    // If we have a non-zero offset, create a new offsets array with the values
    // shifted by the start offset, such that the new start offset is 0
    if (offset !== 0) {
        valueOffsets = valueOffsets.slice(0, length + 1);
        for (let i = -1; ++i <= length;) {
            valueOffsets[i] += offset;
        }
    }
    return valueOffsets;
}
exports.rebaseValueOffsets = rebaseValueOffsets;
/** @ignore */
function compareArrayLike(a, b) {
    let i = 0, n = a.length;
    if (n !== b.length) {
        return false;
    }
    if (n > 0) {
        do {
            if (a[i] !== b[i]) {
                return false;
            }
        } while (++i < n);
    }
    return true;
}
exports.compareArrayLike = compareArrayLike;



},{"flatbuffers":"node_modules/flatbuffers/js/flatbuffers.mjs","../util/utf8":"node_modules/apache-arrow/util/utf8.js","./compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/io/adapters.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../util/buffer");
/** @ignore */
exports.default = {
    fromIterable(source) {
        return pump(fromIterable(source));
    },
    fromAsyncIterable(source) {
        return pump(fromAsyncIterable(source));
    },
    fromDOMStream(source) {
        return pump(fromDOMStream(source));
    },
    fromNodeStream(stream) {
        return pump(fromNodeStream(stream));
    },
    // @ts-ignore
    toDOMStream(source, options) {
        throw new Error(`"toDOMStream" not available in this environment`);
    },
    // @ts-ignore
    toNodeStream(source, options) {
        throw new Error(`"toNodeStream" not available in this environment`);
    },
};
/** @ignore */
const pump = (iterator) => { iterator.next(); return iterator; };
/** @ignore */
function* fromIterable(source) {
    let done, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
        if (cmd === 'peek') {
            return buffer_1.joinUint8Arrays(buffers, size)[0];
        }
        [buffer, buffers, bufferLength] = buffer_1.joinUint8Arrays(buffers, size);
        return buffer;
    }
    // Yield so the caller can inject the read command before creating the source Iterator
    ({ cmd, size } = yield null);
    // initialize the iterator
    let it = buffer_1.toUint8ArrayIterator(source)[Symbol.iterator]();
    try {
        do {
            // read the next value
            ({ done, value: buffer } = isNaN(size - bufferLength) ?
                it.next(undefined) : it.next(size - bufferLength));
            // if chunk is not null or empty, push it onto the queue
            if (!done && buffer.byteLength > 0) {
                buffers.push(buffer);
                bufferLength += buffer.byteLength;
            }
            // If we have enough bytes in our buffer, yield chunks until we don't
            if (done || size <= bufferLength) {
                do {
                    ({ cmd, size } = yield byteRange());
                } while (size < bufferLength);
            }
        } while (!done);
    }
    catch (e) {
        (threw = true) && (typeof it.throw === 'function') && (it.throw(e));
    }
    finally {
        (threw === false) && (typeof it.return === 'function') && (it.return());
    }
}
/** @ignore */
async function* fromAsyncIterable(source) {
    let done, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
        if (cmd === 'peek') {
            return buffer_1.joinUint8Arrays(buffers, size)[0];
        }
        [buffer, buffers, bufferLength] = buffer_1.joinUint8Arrays(buffers, size);
        return buffer;
    }
    // Yield so the caller can inject the read command before creating the source AsyncIterator
    ({ cmd, size } = yield null);
    // initialize the iterator
    let it = buffer_1.toUint8ArrayAsyncIterator(source)[Symbol.asyncIterator]();
    try {
        do {
            // read the next value
            ({ done, value: buffer } = isNaN(size - bufferLength)
                ? await it.next(undefined)
                : await it.next(size - bufferLength));
            // if chunk is not null or empty, push it onto the queue
            if (!done && buffer.byteLength > 0) {
                buffers.push(buffer);
                bufferLength += buffer.byteLength;
            }
            // If we have enough bytes in our buffer, yield chunks until we don't
            if (done || size <= bufferLength) {
                do {
                    ({ cmd, size } = yield byteRange());
                } while (size < bufferLength);
            }
        } while (!done);
    }
    catch (e) {
        (threw = true) && (typeof it.throw === 'function') && (await it.throw(e));
    }
    finally {
        (threw === false) && (typeof it.return === 'function') && (await it.return());
    }
}
// All this manual Uint8Array chunk management can be avoided if/when engines
// add support for ArrayBuffer.transfer() or ArrayBuffer.prototype.realloc():
// https://github.com/domenic/proposal-arraybuffer-transfer
/** @ignore */
async function* fromDOMStream(source) {
    let done = false, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
        if (cmd === 'peek') {
            return buffer_1.joinUint8Arrays(buffers, size)[0];
        }
        [buffer, buffers, bufferLength] = buffer_1.joinUint8Arrays(buffers, size);
        return buffer;
    }
    // Yield so the caller can inject the read command before we establish the ReadableStream lock
    ({ cmd, size } = yield null);
    // initialize the reader and lock the stream
    let it = new AdaptiveByteReader(source);
    try {
        do {
            // read the next value
            ({ done, value: buffer } = isNaN(size - bufferLength)
                ? await it['read'](undefined)
                : await it['read'](size - bufferLength));
            // if chunk is not null or empty, push it onto the queue
            if (!done && buffer.byteLength > 0) {
                buffers.push(buffer_1.toUint8Array(buffer));
                bufferLength += buffer.byteLength;
            }
            // If we have enough bytes in our buffer, yield chunks until we don't
            if (done || size <= bufferLength) {
                do {
                    ({ cmd, size } = yield byteRange());
                } while (size < bufferLength);
            }
        } while (!done);
    }
    catch (e) {
        (threw = true) && (await it['cancel'](e));
    }
    finally {
        (threw === false) ? (await it['cancel']())
            : source['locked'] && it.releaseLock();
    }
}
/** @ignore */
class AdaptiveByteReader {
    constructor(source) {
        this.source = source;
        this.byobReader = null;
        this.defaultReader = null;
        try {
            this.supportsBYOB = !!(this.reader = this.getBYOBReader());
        }
        catch (e) {
            this.supportsBYOB = !!!(this.reader = this.getDefaultReader());
        }
    }
    get closed() {
        return this.reader ? this.reader['closed'].catch(() => { }) : Promise.resolve();
    }
    releaseLock() {
        if (this.reader) {
            this.reader.releaseLock();
        }
        this.reader = this.byobReader = this.defaultReader = null;
    }
    async cancel(reason) {
        const { reader, source } = this;
        reader && (await reader['cancel'](reason).catch(() => { }));
        source && (source['locked'] && this.releaseLock());
    }
    async read(size) {
        if (size === 0) {
            return { done: this.reader == null, value: new Uint8Array(0) };
        }
        const result = !this.supportsBYOB || typeof size !== 'number'
            ? await this.getDefaultReader().read()
            : await this.readFromBYOBReader(size);
        !result.done && (result.value = buffer_1.toUint8Array(result));
        return result;
    }
    getDefaultReader() {
        if (this.byobReader) {
            this.releaseLock();
        }
        if (!this.defaultReader) {
            this.defaultReader = this.source['getReader']();
            // We have to catch and swallow errors here to avoid uncaught promise rejection exceptions
            // that seem to be raised when we call `releaseLock()` on this reader. I'm still mystified
            // about why these errors are raised, but I'm sure there's some important spec reason that
            // I haven't considered. I hate to employ such an anti-pattern here, but it seems like the
            // only solution in this case :/
            this.defaultReader['closed'].catch(() => { });
        }
        return (this.reader = this.defaultReader);
    }
    getBYOBReader() {
        if (this.defaultReader) {
            this.releaseLock();
        }
        if (!this.byobReader) {
            this.byobReader = this.source['getReader']({ mode: 'byob' });
            // We have to catch and swallow errors here to avoid uncaught promise rejection exceptions
            // that seem to be raised when we call `releaseLock()` on this reader. I'm still mystified
            // about why these errors are raised, but I'm sure there's some important spec reason that
            // I haven't considered. I hate to employ such an anti-pattern here, but it seems like the
            // only solution in this case :/
            this.byobReader['closed'].catch(() => { });
        }
        return (this.reader = this.byobReader);
    }
    // This strategy plucked from the example in the streams spec:
    // https://streams.spec.whatwg.org/#example-manual-read-bytes
    async readFromBYOBReader(size) {
        return await readInto(this.getBYOBReader(), new ArrayBuffer(size), 0, size);
    }
}
/** @ignore */
async function readInto(reader, buffer, offset, size) {
    if (offset >= size) {
        return { done: false, value: new Uint8Array(buffer, 0, size) };
    }
    const { done, value } = await reader.read(new Uint8Array(buffer, offset, size - offset));
    if (((offset += value.byteLength) < size) && !done) {
        return await readInto(reader, value.buffer, offset, size);
    }
    return { done, value: new Uint8Array(value.buffer, 0, offset) };
}
/** @ignore */
const onEvent = (stream, event) => {
    let handler = (_) => resolve([event, _]);
    let resolve;
    return [event, handler, new Promise((r) => (resolve = r) && stream['once'](event, handler))];
};
/** @ignore */
async function* fromNodeStream(stream) {
    let events = [];
    let event = 'error';
    let done = false, err = null;
    let cmd, size, bufferLength = 0;
    let buffers = [], buffer;
    function byteRange() {
        if (cmd === 'peek') {
            return buffer_1.joinUint8Arrays(buffers, size)[0];
        }
        [buffer, buffers, bufferLength] = buffer_1.joinUint8Arrays(buffers, size);
        return buffer;
    }
    // Yield so the caller can inject the read command before we
    // add the listener for the source stream's 'readable' event.
    ({ cmd, size } = yield null);
    // ignore stdin if it's a TTY
    if (stream['isTTY']) {
        return yield new Uint8Array(0);
    }
    try {
        // initialize the stream event handlers
        events[0] = onEvent(stream, 'end');
        events[1] = onEvent(stream, 'error');
        do {
            events[2] = onEvent(stream, 'readable');
            // wait on the first message event from the stream
            [event, err] = await Promise.race(events.map((x) => x[2]));
            // if the stream emitted an Error, rethrow it
            if (event === 'error') {
                break;
            }
            if (!(done = event === 'end')) {
                // If the size is NaN, request to read everything in the stream's internal buffer
                if (!isFinite(size - bufferLength)) {
                    buffer = buffer_1.toUint8Array(stream['read'](undefined));
                }
                else {
                    buffer = buffer_1.toUint8Array(stream['read'](size - bufferLength));
                    // If the byteLength is 0, then the requested amount is more than the stream has
                    // in its internal buffer. In this case the stream needs a "kick" to tell it to
                    // continue emitting readable events, so request to read everything the stream
                    // has in its internal buffer right now.
                    if (buffer.byteLength < (size - bufferLength)) {
                        buffer = buffer_1.toUint8Array(stream['read'](undefined));
                    }
                }
                // if chunk is not null or empty, push it onto the queue
                if (buffer.byteLength > 0) {
                    buffers.push(buffer);
                    bufferLength += buffer.byteLength;
                }
            }
            // If we have enough bytes in our buffer, yield chunks until we don't
            if (done || size <= bufferLength) {
                do {
                    ({ cmd, size } = yield byteRange());
                } while (size < bufferLength);
            }
        } while (!done);
    }
    finally {
        await cleanup(events, event === 'error' ? err : null);
    }
    function cleanup(events, err) {
        buffer = buffers = null;
        return new Promise(async (resolve, reject) => {
            for (const [evt, fn] of events) {
                stream['off'](evt, fn);
            }
            try {
                // Some stream implementations don't call the destroy callback,
                // because it's really a node-internal API. Just calling `destroy`
                // here should be enough to conform to the ReadableStream contract
                const destroy = stream['destroy'];
                destroy && destroy.call(stream, err);
                err = undefined;
            }
            catch (e) {
                err = e || err;
            }
            finally {
                err != null ? reject(err) : resolve();
            }
        });
    }
}



},{"../util/buffer":"node_modules/apache-arrow/util/buffer.js"}],"node_modules/apache-arrow/vector.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractVector {
}
exports.AbstractVector = AbstractVector;
exports.Vector = AbstractVector;



},{}],"node_modules/apache-arrow/fb/Schema.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";
/* tslint:disable:class-name */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @enum {number}
 */
var org;
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let MetadataVersion;
                (function (MetadataVersion) {
                    /**
                     * 0.1.0
                     */
                    MetadataVersion[MetadataVersion["V1"] = 0] = "V1";
                    /**
                     * 0.2.0
                     */
                    MetadataVersion[MetadataVersion["V2"] = 1] = "V2";
                    /**
                     * 0.3.0 -> 0.7.1
                     */
                    MetadataVersion[MetadataVersion["V3"] = 2] = "V3";
                    /**
                     * >= 0.8.0
                     */
                    MetadataVersion[MetadataVersion["V4"] = 3] = "V4";
                })(MetadataVersion = flatbuf.MetadataVersion || (flatbuf.MetadataVersion = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let UnionMode;
                (function (UnionMode) {
                    UnionMode[UnionMode["Sparse"] = 0] = "Sparse";
                    UnionMode[UnionMode["Dense"] = 1] = "Dense";
                })(UnionMode = flatbuf.UnionMode || (flatbuf.UnionMode = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let Precision;
                (function (Precision) {
                    Precision[Precision["HALF"] = 0] = "HALF";
                    Precision[Precision["SINGLE"] = 1] = "SINGLE";
                    Precision[Precision["DOUBLE"] = 2] = "DOUBLE";
                })(Precision = flatbuf.Precision || (flatbuf.Precision = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let DateUnit;
                (function (DateUnit) {
                    DateUnit[DateUnit["DAY"] = 0] = "DAY";
                    DateUnit[DateUnit["MILLISECOND"] = 1] = "MILLISECOND";
                })(DateUnit = flatbuf.DateUnit || (flatbuf.DateUnit = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let TimeUnit;
                (function (TimeUnit) {
                    TimeUnit[TimeUnit["SECOND"] = 0] = "SECOND";
                    TimeUnit[TimeUnit["MILLISECOND"] = 1] = "MILLISECOND";
                    TimeUnit[TimeUnit["MICROSECOND"] = 2] = "MICROSECOND";
                    TimeUnit[TimeUnit["NANOSECOND"] = 3] = "NANOSECOND";
                })(TimeUnit = flatbuf.TimeUnit || (flatbuf.TimeUnit = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let IntervalUnit;
                (function (IntervalUnit) {
                    IntervalUnit[IntervalUnit["YEAR_MONTH"] = 0] = "YEAR_MONTH";
                    IntervalUnit[IntervalUnit["DAY_TIME"] = 1] = "DAY_TIME";
                })(IntervalUnit = flatbuf.IntervalUnit || (flatbuf.IntervalUnit = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * Top-level Type value, enabling extensible type-specific metadata. We can
 * add new logical types to Type without breaking backwards compatibility
 *
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let Type;
                (function (Type) {
                    Type[Type["NONE"] = 0] = "NONE";
                    Type[Type["Null"] = 1] = "Null";
                    Type[Type["Int"] = 2] = "Int";
                    Type[Type["FloatingPoint"] = 3] = "FloatingPoint";
                    Type[Type["Binary"] = 4] = "Binary";
                    Type[Type["Utf8"] = 5] = "Utf8";
                    Type[Type["Bool"] = 6] = "Bool";
                    Type[Type["Decimal"] = 7] = "Decimal";
                    Type[Type["Date"] = 8] = "Date";
                    Type[Type["Time"] = 9] = "Time";
                    Type[Type["Timestamp"] = 10] = "Timestamp";
                    Type[Type["Interval"] = 11] = "Interval";
                    Type[Type["List"] = 12] = "List";
                    Type[Type["Struct_"] = 13] = "Struct_";
                    Type[Type["Union"] = 14] = "Union";
                    Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
                    Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
                    Type[Type["Map"] = 17] = "Map";
                    Type[Type["Duration"] = 18] = "Duration";
                    Type[Type["LargeBinary"] = 19] = "LargeBinary";
                    Type[Type["LargeUtf8"] = 20] = "LargeUtf8";
                    Type[Type["LargeList"] = 21] = "LargeList";
                })(Type = flatbuf.Type || (flatbuf.Type = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * Endianness of the platform producing the data
 *
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let Endianness;
                (function (Endianness) {
                    Endianness[Endianness["Little"] = 0] = "Little";
                    Endianness[Endianness["Big"] = 1] = "Big";
                })(Endianness = flatbuf.Endianness || (flatbuf.Endianness = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * These are stored in the flatbuffer in the Type union below
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Null {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Null
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Null= obj
                     * @returns Null
                     */
                    static getRootAsNull(bb, obj) {
                        return (obj || new Null).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startNull(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endNull(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createNull(builder) {
                        Null.startNull(builder);
                        return Null.endNull(builder);
                    }
                }
                flatbuf.Null = Null;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * A Struct_ in the flatbuffer metadata is the same as an Arrow Struct
 * (according to the physical memory layout). We used Struct_ here as
 * Struct is a reserved word in Flatbuffers
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Struct_ {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Struct_
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Struct_= obj
                     * @returns Struct_
                     */
                    static getRootAsStruct_(bb, obj) {
                        return (obj || new Struct_).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startStruct_(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endStruct_(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createStruct_(builder) {
                        Struct_.startStruct_(builder);
                        return Struct_.endStruct_(builder);
                    }
                }
                flatbuf.Struct_ = Struct_;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class List {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns List
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param List= obj
                     * @returns List
                     */
                    static getRootAsList(bb, obj) {
                        return (obj || new List).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startList(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endList(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createList(builder) {
                        List.startList(builder);
                        return List.endList(builder);
                    }
                }
                flatbuf.List = List;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Same as List, but with 64-bit offsets, allowing to represent
 * extremely large data values.
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class LargeList {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns LargeList
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param LargeList= obj
                     * @returns LargeList
                     */
                    static getRootAsLargeList(bb, obj) {
                        return (obj || new LargeList).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startLargeList(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endLargeList(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createLargeList(builder) {
                        LargeList.startLargeList(builder);
                        return LargeList.endLargeList(builder);
                    }
                }
                flatbuf.LargeList = LargeList;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class FixedSizeList {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns FixedSizeList
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param FixedSizeList= obj
                     * @returns FixedSizeList
                     */
                    static getRootAsFixedSizeList(bb, obj) {
                        return (obj || new FixedSizeList).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * Number of list items per value
                     *
                     * @returns number
                     */
                    listSize() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startFixedSizeList(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number listSize
                     */
                    static addListSize(builder, listSize) {
                        builder.addFieldInt32(0, listSize, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endFixedSizeList(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createFixedSizeList(builder, listSize) {
                        FixedSizeList.startFixedSizeList(builder);
                        FixedSizeList.addListSize(builder, listSize);
                        return FixedSizeList.endFixedSizeList(builder);
                    }
                }
                flatbuf.FixedSizeList = FixedSizeList;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * A Map is a logical nested type that is represented as
 *
 * List<entry: Struct<key: K, value: V>>
 *
 * In this layout, the keys and values are each respectively contiguous. We do
 * not constrain the key and value types, so the application is responsible
 * for ensuring that the keys are hashable and unique. Whether the keys are sorted
 * may be set in the metadata for this field
 *
 * In a Field with Map type, the Field has a child Struct field, which then
 * has two children: key type and the second the value type. The names of the
 * child fields may be respectively "entry", "key", and "value", but this is
 * not enforced
 *
 * Map
 *   - child[0] entry: Struct
 *     - child[0] key: K
 *     - child[1] value: V
 *
 * Neither the "entry" field nor the "key" field may be nullable.
 *
 * The metadata is structured so that Arrow systems without special handling
 * for Map can make Map an alias for List. The "layout" attribute for the Map
 * field must have the same contents as a List.
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Map {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Map
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Map= obj
                     * @returns Map
                     */
                    static getRootAsMap(bb, obj) {
                        return (obj || new Map).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * Set to true if the keys within each value are sorted
                     *
                     * @returns boolean
                     */
                    keysSorted() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startMap(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean keysSorted
                     */
                    static addKeysSorted(builder, keysSorted) {
                        builder.addFieldInt8(0, +keysSorted, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endMap(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createMap(builder, keysSorted) {
                        Map.startMap(builder);
                        Map.addKeysSorted(builder, keysSorted);
                        return Map.endMap(builder);
                    }
                }
                flatbuf.Map = Map;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * A union is a complex type with children in Field
 * By default ids in the type vector refer to the offsets in the children
 * optionally typeIds provides an indirection between the child offset and the type id
 * for each child typeIds[offset] is the id used in the type vector
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Union {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Union
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Union= obj
                     * @returns Union
                     */
                    static getRootAsUnion(bb, obj) {
                        return (obj || new Union).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.UnionMode
                     */
                    mode() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.UnionMode.Sparse;
                    }
                    /**
                     * @param number index
                     * @returns number
                     */
                    typeIds(index) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
                    }
                    /**
                     * @returns number
                     */
                    typeIdsLength() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @returns Int32Array
                     */
                    typeIdsArray() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startUnion(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.UnionMode mode
                     */
                    static addMode(builder, mode) {
                        builder.addFieldInt16(0, mode, org.apache.arrow.flatbuf.UnionMode.Sparse);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset typeIdsOffset
                     */
                    static addTypeIds(builder, typeIdsOffset) {
                        builder.addFieldOffset(1, typeIdsOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<number> data
                     * @returns flatbuffers.Offset
                     */
                    static createTypeIdsVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addInt32(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startTypeIdsVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endUnion(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createUnion(builder, mode, typeIdsOffset) {
                        Union.startUnion(builder);
                        Union.addMode(builder, mode);
                        Union.addTypeIds(builder, typeIdsOffset);
                        return Union.endUnion(builder);
                    }
                }
                flatbuf.Union = Union;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Int {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Int
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Int= obj
                     * @returns Int
                     */
                    static getRootAsInt(bb, obj) {
                        return (obj || new Int).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns number
                     */
                    bitWidth() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @returns boolean
                     */
                    isSigned() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startInt(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number bitWidth
                     */
                    static addBitWidth(builder, bitWidth) {
                        builder.addFieldInt32(0, bitWidth, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean isSigned
                     */
                    static addIsSigned(builder, isSigned) {
                        builder.addFieldInt8(1, +isSigned, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endInt(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createInt(builder, bitWidth, isSigned) {
                        Int.startInt(builder);
                        Int.addBitWidth(builder, bitWidth);
                        Int.addIsSigned(builder, isSigned);
                        return Int.endInt(builder);
                    }
                }
                flatbuf.Int = Int;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class FloatingPoint {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns FloatingPoint
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param FloatingPoint= obj
                     * @returns FloatingPoint
                     */
                    static getRootAsFloatingPoint(bb, obj) {
                        return (obj || new FloatingPoint).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.Precision
                     */
                    precision() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.Precision.HALF;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startFloatingPoint(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.Precision precision
                     */
                    static addPrecision(builder, precision) {
                        builder.addFieldInt16(0, precision, org.apache.arrow.flatbuf.Precision.HALF);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endFloatingPoint(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createFloatingPoint(builder, precision) {
                        FloatingPoint.startFloatingPoint(builder);
                        FloatingPoint.addPrecision(builder, precision);
                        return FloatingPoint.endFloatingPoint(builder);
                    }
                }
                flatbuf.FloatingPoint = FloatingPoint;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Unicode with UTF-8 encoding
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Utf8 {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Utf8
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Utf8= obj
                     * @returns Utf8
                     */
                    static getRootAsUtf8(bb, obj) {
                        return (obj || new Utf8).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startUtf8(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endUtf8(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createUtf8(builder) {
                        Utf8.startUtf8(builder);
                        return Utf8.endUtf8(builder);
                    }
                }
                flatbuf.Utf8 = Utf8;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Opaque binary data
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Binary {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Binary
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Binary= obj
                     * @returns Binary
                     */
                    static getRootAsBinary(bb, obj) {
                        return (obj || new Binary).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startBinary(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endBinary(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createBinary(builder) {
                        Binary.startBinary(builder);
                        return Binary.endBinary(builder);
                    }
                }
                flatbuf.Binary = Binary;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Same as Utf8, but with 64-bit offsets, allowing to represent
 * extremely large data values.
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class LargeUtf8 {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns LargeUtf8
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param LargeUtf8= obj
                     * @returns LargeUtf8
                     */
                    static getRootAsLargeUtf8(bb, obj) {
                        return (obj || new LargeUtf8).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startLargeUtf8(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endLargeUtf8(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createLargeUtf8(builder) {
                        LargeUtf8.startLargeUtf8(builder);
                        return LargeUtf8.endLargeUtf8(builder);
                    }
                }
                flatbuf.LargeUtf8 = LargeUtf8;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Same as Binary, but with 64-bit offsets, allowing to represent
 * extremely large data values.
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class LargeBinary {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns LargeBinary
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param LargeBinary= obj
                     * @returns LargeBinary
                     */
                    static getRootAsLargeBinary(bb, obj) {
                        return (obj || new LargeBinary).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startLargeBinary(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endLargeBinary(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createLargeBinary(builder) {
                        LargeBinary.startLargeBinary(builder);
                        return LargeBinary.endLargeBinary(builder);
                    }
                }
                flatbuf.LargeBinary = LargeBinary;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class FixedSizeBinary {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns FixedSizeBinary
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param FixedSizeBinary= obj
                     * @returns FixedSizeBinary
                     */
                    static getRootAsFixedSizeBinary(bb, obj) {
                        return (obj || new FixedSizeBinary).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * Number of bytes per value
                     *
                     * @returns number
                     */
                    byteWidth() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startFixedSizeBinary(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number byteWidth
                     */
                    static addByteWidth(builder, byteWidth) {
                        builder.addFieldInt32(0, byteWidth, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endFixedSizeBinary(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createFixedSizeBinary(builder, byteWidth) {
                        FixedSizeBinary.startFixedSizeBinary(builder);
                        FixedSizeBinary.addByteWidth(builder, byteWidth);
                        return FixedSizeBinary.endFixedSizeBinary(builder);
                    }
                }
                flatbuf.FixedSizeBinary = FixedSizeBinary;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Bool {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Bool
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Bool= obj
                     * @returns Bool
                     */
                    static getRootAsBool(bb, obj) {
                        return (obj || new Bool).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startBool(builder) {
                        builder.startObject(0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endBool(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createBool(builder) {
                        Bool.startBool(builder);
                        return Bool.endBool(builder);
                    }
                }
                flatbuf.Bool = Bool;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Decimal {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Decimal
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Decimal= obj
                     * @returns Decimal
                     */
                    static getRootAsDecimal(bb, obj) {
                        return (obj || new Decimal).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * Total number of decimal digits
                     *
                     * @returns number
                     */
                    precision() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
                    }
                    /**
                     * Number of digits after the decimal point "."
                     *
                     * @returns number
                     */
                    scale() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDecimal(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number precision
                     */
                    static addPrecision(builder, precision) {
                        builder.addFieldInt32(0, precision, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number scale
                     */
                    static addScale(builder, scale) {
                        builder.addFieldInt32(1, scale, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDecimal(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDecimal(builder, precision, scale) {
                        Decimal.startDecimal(builder);
                        Decimal.addPrecision(builder, precision);
                        Decimal.addScale(builder, scale);
                        return Decimal.endDecimal(builder);
                    }
                }
                flatbuf.Decimal = Decimal;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Date is either a 32-bit or 64-bit type representing elapsed time since UNIX
 * epoch (1970-01-01), stored in either of two units:
 *
 * * Milliseconds (64 bits) indicating UNIX time elapsed since the epoch (no
 *   leap seconds), where the values are evenly divisible by 86400000
 * * Days (32 bits) since the UNIX epoch
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Date {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Date
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Date= obj
                     * @returns Date
                     */
                    static getRootAsDate(bb, obj) {
                        return (obj || new Date).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.DateUnit
                     */
                    unit() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.DateUnit.MILLISECOND;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDate(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.DateUnit unit
                     */
                    static addUnit(builder, unit) {
                        builder.addFieldInt16(0, unit, org.apache.arrow.flatbuf.DateUnit.MILLISECOND);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDate(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDate(builder, unit) {
                        Date.startDate(builder);
                        Date.addUnit(builder, unit);
                        return Date.endDate(builder);
                    }
                }
                flatbuf.Date = Date;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Time type. The physical storage type depends on the unit
 * - SECOND and MILLISECOND: 32 bits
 * - MICROSECOND and NANOSECOND: 64 bits
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Time {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Time
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Time= obj
                     * @returns Time
                     */
                    static getRootAsTime(bb, obj) {
                        return (obj || new Time).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.TimeUnit
                     */
                    unit() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.TimeUnit.MILLISECOND;
                    }
                    /**
                     * @returns number
                     */
                    bitWidth() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.readInt32(this.bb_pos + offset) : 32;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startTime(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.TimeUnit unit
                     */
                    static addUnit(builder, unit) {
                        builder.addFieldInt16(0, unit, org.apache.arrow.flatbuf.TimeUnit.MILLISECOND);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number bitWidth
                     */
                    static addBitWidth(builder, bitWidth) {
                        builder.addFieldInt32(1, bitWidth, 32);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endTime(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createTime(builder, unit, bitWidth) {
                        Time.startTime(builder);
                        Time.addUnit(builder, unit);
                        Time.addBitWidth(builder, bitWidth);
                        return Time.endTime(builder);
                    }
                }
                flatbuf.Time = Time;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * Time elapsed from the Unix epoch, 00:00:00.000 on 1 January 1970, excluding
 * leap seconds, as a 64-bit integer. Note that UNIX time does not include
 * leap seconds.
 *
 * The Timestamp metadata supports both "time zone naive" and "time zone
 * aware" timestamps. Read about the timezone attribute for more detail
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Timestamp {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Timestamp
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Timestamp= obj
                     * @returns Timestamp
                     */
                    static getRootAsTimestamp(bb, obj) {
                        return (obj || new Timestamp).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.TimeUnit
                     */
                    unit() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.TimeUnit.SECOND;
                    }
                    timezone(optionalEncoding) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startTimestamp(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.TimeUnit unit
                     */
                    static addUnit(builder, unit) {
                        builder.addFieldInt16(0, unit, org.apache.arrow.flatbuf.TimeUnit.SECOND);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset timezoneOffset
                     */
                    static addTimezone(builder, timezoneOffset) {
                        builder.addFieldOffset(1, timezoneOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endTimestamp(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createTimestamp(builder, unit, timezoneOffset) {
                        Timestamp.startTimestamp(builder);
                        Timestamp.addUnit(builder, unit);
                        Timestamp.addTimezone(builder, timezoneOffset);
                        return Timestamp.endTimestamp(builder);
                    }
                }
                flatbuf.Timestamp = Timestamp;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Interval {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Interval
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Interval= obj
                     * @returns Interval
                     */
                    static getRootAsInterval(bb, obj) {
                        return (obj || new Interval).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.IntervalUnit
                     */
                    unit() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.IntervalUnit.YEAR_MONTH;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startInterval(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.IntervalUnit unit
                     */
                    static addUnit(builder, unit) {
                        builder.addFieldInt16(0, unit, org.apache.arrow.flatbuf.IntervalUnit.YEAR_MONTH);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endInterval(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createInterval(builder, unit) {
                        Interval.startInterval(builder);
                        Interval.addUnit(builder, unit);
                        return Interval.endInterval(builder);
                    }
                }
                flatbuf.Interval = Interval;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Duration {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Duration
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Duration= obj
                     * @returns Duration
                     */
                    static getRootAsDuration(bb, obj) {
                        return (obj || new Duration).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.TimeUnit
                     */
                    unit() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.TimeUnit.MILLISECOND;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDuration(builder) {
                        builder.startObject(1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.TimeUnit unit
                     */
                    static addUnit(builder, unit) {
                        builder.addFieldInt16(0, unit, org.apache.arrow.flatbuf.TimeUnit.MILLISECOND);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDuration(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDuration(builder, unit) {
                        Duration.startDuration(builder);
                        Duration.addUnit(builder, unit);
                        return Duration.endDuration(builder);
                    }
                }
                flatbuf.Duration = Duration;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * user defined key value pairs to add custom metadata to arrow
 * key namespacing is the responsibility of the user
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class KeyValue {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns KeyValue
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param KeyValue= obj
                     * @returns KeyValue
                     */
                    static getRootAsKeyValue(bb, obj) {
                        return (obj || new KeyValue).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    key(optionalEncoding) {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
                    }
                    value(optionalEncoding) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startKeyValue(builder) {
                        builder.startObject(2);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset keyOffset
                     */
                    static addKey(builder, keyOffset) {
                        builder.addFieldOffset(0, keyOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset valueOffset
                     */
                    static addValue(builder, valueOffset) {
                        builder.addFieldOffset(1, valueOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endKeyValue(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createKeyValue(builder, keyOffset, valueOffset) {
                        KeyValue.startKeyValue(builder);
                        KeyValue.addKey(builder, keyOffset);
                        KeyValue.addValue(builder, valueOffset);
                        return KeyValue.endKeyValue(builder);
                    }
                }
                flatbuf.KeyValue = KeyValue;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * Dictionary encoding metadata
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class DictionaryEncoding {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns DictionaryEncoding
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param DictionaryEncoding= obj
                     * @returns DictionaryEncoding
                     */
                    static getRootAsDictionaryEncoding(bb, obj) {
                        return (obj || new DictionaryEncoding).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * The known dictionary id in the application where this data is used. In
                     * the file or streaming formats, the dictionary ids are found in the
                     * DictionaryBatch messages
                     *
                     * @returns flatbuffers.Long
                     */
                    id() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * The dictionary indices are constrained to be positive integers. If this
                     * field is null, the indices must be signed int32
                     *
                     * @param org.apache.arrow.flatbuf.Int= obj
                     * @returns org.apache.arrow.flatbuf.Int|null
                     */
                    indexType(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.Int).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
                    }
                    /**
                     * By default, dictionaries are not ordered, or the order does not have
                     * semantic meaning. In some statistical, applications, dictionary-encoding
                     * is used to represent ordered categorical data, and we provide a way to
                     * preserve that metadata here
                     *
                     * @returns boolean
                     */
                    isOrdered() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDictionaryEncoding(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long id
                     */
                    static addId(builder, id) {
                        builder.addFieldInt64(0, id, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset indexTypeOffset
                     */
                    static addIndexType(builder, indexTypeOffset) {
                        builder.addFieldOffset(1, indexTypeOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean isOrdered
                     */
                    static addIsOrdered(builder, isOrdered) {
                        builder.addFieldInt8(2, +isOrdered, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDictionaryEncoding(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDictionaryEncoding(builder, id, indexTypeOffset, isOrdered) {
                        DictionaryEncoding.startDictionaryEncoding(builder);
                        DictionaryEncoding.addId(builder, id);
                        DictionaryEncoding.addIndexType(builder, indexTypeOffset);
                        DictionaryEncoding.addIsOrdered(builder, isOrdered);
                        return DictionaryEncoding.endDictionaryEncoding(builder);
                    }
                }
                flatbuf.DictionaryEncoding = DictionaryEncoding;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * A field represents a named column in a record / row batch or child of a
 * nested type.
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Field {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Field
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Field= obj
                     * @returns Field
                     */
                    static getRootAsField(bb, obj) {
                        return (obj || new Field).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    name(optionalEncoding) {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
                    }
                    /**
                     * Whether or not this field can contain nulls. Should be true in general.
                     *
                     * @returns boolean
                     */
                    nullable() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.Type
                     */
                    typeType() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? /**  */ (this.bb.readUint8(this.bb_pos + offset)) : org.apache.arrow.flatbuf.Type.NONE;
                    }
                    /**
                     * This is the type of the decoded value if the field is dictionary encoded.
                     *
                     * @param flatbuffers.Table obj
                     * @returns ?flatbuffers.Table
                     */
                    type(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 10);
                        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
                    }
                    /**
                     * Present only if the field is dictionary encoded.
                     *
                     * @param org.apache.arrow.flatbuf.DictionaryEncoding= obj
                     * @returns org.apache.arrow.flatbuf.DictionaryEncoding|null
                     */
                    dictionary(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 12);
                        return offset ? (obj || new org.apache.arrow.flatbuf.DictionaryEncoding).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
                    }
                    /**
                     * children apply only to nested data types like Struct, List and Union. For
                     * primitive types children will have length 0.
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Field= obj
                     * @returns org.apache.arrow.flatbuf.Field
                     */
                    children(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 14);
                        return offset ? (obj || new org.apache.arrow.flatbuf.Field).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    childrenLength() {
                        let offset = this.bb.__offset(this.bb_pos, 14);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * User-defined metadata
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.KeyValue= obj
                     * @returns org.apache.arrow.flatbuf.KeyValue
                     */
                    customMetadata(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 16);
                        return offset ? (obj || new org.apache.arrow.flatbuf.KeyValue).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    customMetadataLength() {
                        let offset = this.bb.__offset(this.bb_pos, 16);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startField(builder) {
                        builder.startObject(7);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset nameOffset
                     */
                    static addName(builder, nameOffset) {
                        builder.addFieldOffset(0, nameOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean nullable
                     */
                    static addNullable(builder, nullable) {
                        builder.addFieldInt8(1, +nullable, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.Type typeType
                     */
                    static addTypeType(builder, typeType) {
                        builder.addFieldInt8(2, typeType, org.apache.arrow.flatbuf.Type.NONE);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset typeOffset
                     */
                    static addType(builder, typeOffset) {
                        builder.addFieldOffset(3, typeOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset dictionaryOffset
                     */
                    static addDictionary(builder, dictionaryOffset) {
                        builder.addFieldOffset(4, dictionaryOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset childrenOffset
                     */
                    static addChildren(builder, childrenOffset) {
                        builder.addFieldOffset(5, childrenOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createChildrenVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startChildrenVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset customMetadataOffset
                     */
                    static addCustomMetadata(builder, customMetadataOffset) {
                        builder.addFieldOffset(6, customMetadataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createCustomMetadataVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startCustomMetadataVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endField(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createField(builder, nameOffset, nullable, typeType, typeOffset, dictionaryOffset, childrenOffset, customMetadataOffset) {
                        Field.startField(builder);
                        Field.addName(builder, nameOffset);
                        Field.addNullable(builder, nullable);
                        Field.addTypeType(builder, typeType);
                        Field.addType(builder, typeOffset);
                        Field.addDictionary(builder, dictionaryOffset);
                        Field.addChildren(builder, childrenOffset);
                        Field.addCustomMetadata(builder, customMetadataOffset);
                        return Field.endField(builder);
                    }
                }
                flatbuf.Field = Field;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * A Buffer represents a single contiguous memory segment
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Buffer {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Buffer
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * The relative offset into the shared memory page where the bytes for this
                     * buffer starts
                     *
                     * @returns flatbuffers.Long
                     */
                    offset() {
                        return this.bb.readInt64(this.bb_pos);
                    }
                    /**
                     * The absolute length (in bytes) of the memory buffer. The memory is found
                     * from offset (inclusive) to offset + length (non-inclusive).
                     *
                     * @returns flatbuffers.Long
                     */
                    length() {
                        return this.bb.readInt64(this.bb_pos + 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long offset
                     * @param flatbuffers.Long length
                     * @returns flatbuffers.Offset
                     */
                    static createBuffer(builder, offset, length) {
                        builder.prep(8, 16);
                        builder.writeInt64(length);
                        builder.writeInt64(offset);
                        return builder.offset();
                    }
                }
                flatbuf.Buffer = Buffer;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * A Schema describes the columns in a row batch
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Schema {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Schema
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Schema= obj
                     * @returns Schema
                     */
                    static getRootAsSchema(bb, obj) {
                        return (obj || new Schema).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * endianness of the buffer
                     * it is Little Endian by default
                     * if endianness doesn't match the underlying system then the vectors need to be converted
                     *
                     * @returns org.apache.arrow.flatbuf.Endianness
                     */
                    endianness() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : org.apache.arrow.flatbuf.Endianness.Little;
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Field= obj
                     * @returns org.apache.arrow.flatbuf.Field
                     */
                    fields(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.Field).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    fieldsLength() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.KeyValue= obj
                     * @returns org.apache.arrow.flatbuf.KeyValue
                     */
                    customMetadata(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? (obj || new org.apache.arrow.flatbuf.KeyValue).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    customMetadataLength() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startSchema(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.Endianness endianness
                     */
                    static addEndianness(builder, endianness) {
                        builder.addFieldInt16(0, endianness, org.apache.arrow.flatbuf.Endianness.Little);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset fieldsOffset
                     */
                    static addFields(builder, fieldsOffset) {
                        builder.addFieldOffset(1, fieldsOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createFieldsVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startFieldsVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset customMetadataOffset
                     */
                    static addCustomMetadata(builder, customMetadataOffset) {
                        builder.addFieldOffset(2, customMetadataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createCustomMetadataVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startCustomMetadataVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endSchema(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset offset
                     */
                    static finishSchemaBuffer(builder, offset) {
                        builder.finish(offset);
                    }
                    static createSchema(builder, endianness, fieldsOffset, customMetadataOffset) {
                        Schema.startSchema(builder);
                        Schema.addEndianness(builder, endianness);
                        Schema.addFields(builder, fieldsOffset);
                        Schema.addCustomMetadata(builder, customMetadataOffset);
                        return Schema.endSchema(builder);
                    }
                }
                flatbuf.Schema = Schema;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));



},{"buffer":"node_modules/buffer/index.js"}],"node_modules/apache-arrow/fb/Message.js":[function(require,module,exports) {
"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
const NS7624605610262437867 = require("./Schema");
var org;
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                flatbuf.Schema = NS7624605610262437867.org.apache.arrow.flatbuf.Schema;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * The root Message type
 * This union enables us to easily send different message types without
 * redundant storage, and in the future we can easily add new message types.
 *
 * Arrow implementations do not need to implement all of the message types,
 * which may include experimental metadata types. For maximum compatibility,
 * it is best to send data using RecordBatch
 *
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let MessageHeader;
                (function (MessageHeader) {
                    MessageHeader[MessageHeader["NONE"] = 0] = "NONE";
                    MessageHeader[MessageHeader["Schema"] = 1] = "Schema";
                    MessageHeader[MessageHeader["DictionaryBatch"] = 2] = "DictionaryBatch";
                    MessageHeader[MessageHeader["RecordBatch"] = 3] = "RecordBatch";
                    MessageHeader[MessageHeader["Tensor"] = 4] = "Tensor";
                    MessageHeader[MessageHeader["SparseTensor"] = 5] = "SparseTensor";
                })(MessageHeader = flatbuf.MessageHeader || (flatbuf.MessageHeader = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * Data structures for describing a table row batch (a collection of
 * equal-length Arrow arrays)
 * Metadata about a field at some level of a nested type tree (but not
 * its children).
 *
 * For example, a List<Int16> with values [[1, 2, 3], null, [4], [5, 6], null]
 * would have {length: 5, null_count: 2} for its List node, and {length: 6,
 * null_count: 0} for its Int16 node, as separate FieldNode structs
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class FieldNode {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns FieldNode
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * The number of value slots in the Arrow array at this level of a nested
                     * tree
                     *
                     * @returns flatbuffers.Long
                     */
                    length() {
                        return this.bb.readInt64(this.bb_pos);
                    }
                    /**
                     * The number of observed nulls. Fields with null_count == 0 may choose not
                     * to write their physical validity bitmap out as a materialized buffer,
                     * instead setting the length of the bitmap buffer to 0.
                     *
                     * @returns flatbuffers.Long
                     */
                    nullCount() {
                        return this.bb.readInt64(this.bb_pos + 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long length
                     * @param flatbuffers.Long null_count
                     * @returns flatbuffers.Offset
                     */
                    static createFieldNode(builder, length, null_count) {
                        builder.prep(8, 16);
                        builder.writeInt64(null_count);
                        builder.writeInt64(length);
                        return builder.offset();
                    }
                }
                flatbuf.FieldNode = FieldNode;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * A data header describing the shared memory layout of a "record" or "row"
 * batch. Some systems call this a "row batch" internally and others a "record
 * batch".
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class RecordBatch {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns RecordBatch
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param RecordBatch= obj
                     * @returns RecordBatch
                     */
                    static getRootAsRecordBatch(bb, obj) {
                        return (obj || new RecordBatch).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * number of records / rows. The arrays in the batch should all have this
                     * length
                     *
                     * @returns flatbuffers.Long
                     */
                    length() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * Nodes correspond to the pre-ordered flattened logical schema
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.FieldNode= obj
                     * @returns org.apache.arrow.flatbuf.FieldNode
                     */
                    nodes(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.FieldNode).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    nodesLength() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * Buffers correspond to the pre-ordered flattened buffer tree
                     *
                     * The number of buffers appended to this list depends on the schema. For
                     * example, most primitive arrays will have 2 buffers, 1 for the validity
                     * bitmap and 1 for the values. For struct arrays, there will only be a
                     * single buffer for the validity (nulls) bitmap
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Buffer= obj
                     * @returns org.apache.arrow.flatbuf.Buffer
                     */
                    buffers(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? (obj || new NS7624605610262437867.org.apache.arrow.flatbuf.Buffer).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    buffersLength() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startRecordBatch(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long length
                     */
                    static addLength(builder, length) {
                        builder.addFieldInt64(0, length, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset nodesOffset
                     */
                    static addNodes(builder, nodesOffset) {
                        builder.addFieldOffset(1, nodesOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startNodesVector(builder, numElems) {
                        builder.startVector(16, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset buffersOffset
                     */
                    static addBuffers(builder, buffersOffset) {
                        builder.addFieldOffset(2, buffersOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startBuffersVector(builder, numElems) {
                        builder.startVector(16, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endRecordBatch(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createRecordBatch(builder, length, nodesOffset, buffersOffset) {
                        RecordBatch.startRecordBatch(builder);
                        RecordBatch.addLength(builder, length);
                        RecordBatch.addNodes(builder, nodesOffset);
                        RecordBatch.addBuffers(builder, buffersOffset);
                        return RecordBatch.endRecordBatch(builder);
                    }
                }
                flatbuf.RecordBatch = RecordBatch;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * For sending dictionary encoding information. Any Field can be
 * dictionary-encoded, but in this case none of its children may be
 * dictionary-encoded.
 * There is one vector / column per dictionary, but that vector / column
 * may be spread across multiple dictionary batches by using the isDelta
 * flag
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class DictionaryBatch {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns DictionaryBatch
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param DictionaryBatch= obj
                     * @returns DictionaryBatch
                     */
                    static getRootAsDictionaryBatch(bb, obj) {
                        return (obj || new DictionaryBatch).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns flatbuffers.Long
                     */
                    id() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * @param org.apache.arrow.flatbuf.RecordBatch= obj
                     * @returns org.apache.arrow.flatbuf.RecordBatch|null
                     */
                    data(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.RecordBatch).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
                    }
                    /**
                     * If isDelta is true the values in the dictionary are to be appended to a
                     * dictionary with the indicated id
                     *
                     * @returns boolean
                     */
                    isDelta() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDictionaryBatch(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long id
                     */
                    static addId(builder, id) {
                        builder.addFieldInt64(0, id, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset dataOffset
                     */
                    static addData(builder, dataOffset) {
                        builder.addFieldOffset(1, dataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean isDelta
                     */
                    static addIsDelta(builder, isDelta) {
                        builder.addFieldInt8(2, +isDelta, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDictionaryBatch(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDictionaryBatch(builder, id, dataOffset, isDelta) {
                        DictionaryBatch.startDictionaryBatch(builder);
                        DictionaryBatch.addId(builder, id);
                        DictionaryBatch.addData(builder, dataOffset);
                        DictionaryBatch.addIsDelta(builder, isDelta);
                        return DictionaryBatch.endDictionaryBatch(builder);
                    }
                }
                flatbuf.DictionaryBatch = DictionaryBatch;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Message {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Message
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Message= obj
                     * @returns Message
                     */
                    static getRootAsMessage(bb, obj) {
                        return (obj || new Message).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.MetadataVersion
                     */
                    version() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1;
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.MessageHeader
                     */
                    headerType() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? /**  */ (this.bb.readUint8(this.bb_pos + offset)) : org.apache.arrow.flatbuf.MessageHeader.NONE;
                    }
                    /**
                     * @param flatbuffers.Table obj
                     * @returns ?flatbuffers.Table
                     */
                    header(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
                    }
                    /**
                     * @returns flatbuffers.Long
                     */
                    bodyLength() {
                        let offset = this.bb.__offset(this.bb_pos, 10);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.KeyValue= obj
                     * @returns org.apache.arrow.flatbuf.KeyValue
                     */
                    customMetadata(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 12);
                        return offset ? (obj || new NS7624605610262437867.org.apache.arrow.flatbuf.KeyValue).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    customMetadataLength() {
                        let offset = this.bb.__offset(this.bb_pos, 12);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startMessage(builder) {
                        builder.startObject(5);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.MetadataVersion version
                     */
                    static addVersion(builder, version) {
                        builder.addFieldInt16(0, version, NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.MessageHeader headerType
                     */
                    static addHeaderType(builder, headerType) {
                        builder.addFieldInt8(1, headerType, org.apache.arrow.flatbuf.MessageHeader.NONE);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset headerOffset
                     */
                    static addHeader(builder, headerOffset) {
                        builder.addFieldOffset(2, headerOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long bodyLength
                     */
                    static addBodyLength(builder, bodyLength) {
                        builder.addFieldInt64(3, bodyLength, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset customMetadataOffset
                     */
                    static addCustomMetadata(builder, customMetadataOffset) {
                        builder.addFieldOffset(4, customMetadataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createCustomMetadataVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startCustomMetadataVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endMessage(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset offset
                     */
                    static finishMessageBuffer(builder, offset) {
                        builder.finish(offset);
                    }
                    static createMessage(builder, version, headerType, headerOffset, bodyLength, customMetadataOffset) {
                        Message.startMessage(builder);
                        Message.addVersion(builder, version);
                        Message.addHeaderType(builder, headerType);
                        Message.addHeader(builder, headerOffset);
                        Message.addBodyLength(builder, bodyLength);
                        Message.addCustomMetadata(builder, customMetadataOffset);
                        return Message.endMessage(builder);
                    }
                }
                flatbuf.Message = Message;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));



},{"./Schema":"node_modules/apache-arrow/fb/Schema.js"}],"node_modules/apache-arrow/enum.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_ = require("./fb/Schema");
const Message_ = require("./fb/Message");
exports.ArrowType = Schema_.org.apache.arrow.flatbuf.Type;
exports.DateUnit = Schema_.org.apache.arrow.flatbuf.DateUnit;
exports.TimeUnit = Schema_.org.apache.arrow.flatbuf.TimeUnit;
exports.Precision = Schema_.org.apache.arrow.flatbuf.Precision;
exports.UnionMode = Schema_.org.apache.arrow.flatbuf.UnionMode;
exports.IntervalUnit = Schema_.org.apache.arrow.flatbuf.IntervalUnit;
exports.MessageHeader = Message_.org.apache.arrow.flatbuf.MessageHeader;
exports.MetadataVersion = Schema_.org.apache.arrow.flatbuf.MetadataVersion;
/**
 * Main data type enumeration.
 *
 * Data types in this library are all *logical*. They can be expressed as
 * either a primitive physical type (bytes or bits of some fixed size), a
 * nested type consisting of other data types, or another data type (e.g. a
 * timestamp encoded as an int64).
 *
 * **Note**: Only enum values 0-17 (NONE through Map) are written to an Arrow
 * IPC payload.
 *
 * The rest of the values are specified here so TypeScript can narrow the type
 * signatures further beyond the base Arrow Types. The Arrow DataTypes include
 * metadata like `bitWidth` that impact the type signatures of the values we
 * accept and return.
 *
 * For example, the `Int8Vector` reads 1-byte numbers from an `Int8Array`, an
 * `Int32Vector` reads a 4-byte number from an `Int32Array`, and an `Int64Vector`
 * reads a pair of 4-byte lo, hi 32-bit integers as a zero-copy slice from the
 * underlying `Int32Array`.
 *
 * Library consumers benefit by knowing the narrowest type, since we can ensure
 * the types across all public methods are propagated, and never bail to `any`.
 * These values are _never_ used at runtime, and they will _never_ be written
 * to the flatbuffers metadata of serialized Arrow IPC payloads.
 */
var Type;
(function (Type) {
    /** The default placeholder type */
    Type[Type["NONE"] = 0] = "NONE";
    /** A NULL type having no physical storage */
    Type[Type["Null"] = 1] = "Null";
    /** Signed or unsigned 8, 16, 32, or 64-bit little-endian integer */
    Type[Type["Int"] = 2] = "Int";
    /** 2, 4, or 8-byte floating point value */
    Type[Type["Float"] = 3] = "Float";
    /** Variable-length bytes (no guarantee of UTF8-ness) */
    Type[Type["Binary"] = 4] = "Binary";
    /** UTF8 variable-length string as List<Char> */
    Type[Type["Utf8"] = 5] = "Utf8";
    /** Boolean as 1 bit, LSB bit-packed ordering */
    Type[Type["Bool"] = 6] = "Bool";
    /** Precision-and-scale-based decimal type. Storage type depends on the parameters. */
    Type[Type["Decimal"] = 7] = "Decimal";
    /** int32_t days or int64_t milliseconds since the UNIX epoch */
    Type[Type["Date"] = 8] = "Date";
    /** Time as signed 32 or 64-bit integer, representing either seconds, milliseconds, microseconds, or nanoseconds since midnight since midnight */
    Type[Type["Time"] = 9] = "Time";
    /** Exact timestamp encoded with int64 since UNIX epoch (Default unit millisecond) */
    Type[Type["Timestamp"] = 10] = "Timestamp";
    /** YEAR_MONTH or DAY_TIME interval in SQL style */
    Type[Type["Interval"] = 11] = "Interval";
    /** A list of some logical data type */
    Type[Type["List"] = 12] = "List";
    /** Struct of logical types */
    Type[Type["Struct"] = 13] = "Struct";
    /** Union of logical types */
    Type[Type["Union"] = 14] = "Union";
    /** Fixed-size binary. Each value occupies the same number of bytes */
    Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
    /** Fixed-size list. Each value occupies the same number of bytes */
    Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
    /** Map of named logical types */
    Type[Type["Map"] = 17] = "Map";
    /** Dictionary aka Category type */
    Type[Type["Dictionary"] = -1] = "Dictionary";
    Type[Type["Int8"] = -2] = "Int8";
    Type[Type["Int16"] = -3] = "Int16";
    Type[Type["Int32"] = -4] = "Int32";
    Type[Type["Int64"] = -5] = "Int64";
    Type[Type["Uint8"] = -6] = "Uint8";
    Type[Type["Uint16"] = -7] = "Uint16";
    Type[Type["Uint32"] = -8] = "Uint32";
    Type[Type["Uint64"] = -9] = "Uint64";
    Type[Type["Float16"] = -10] = "Float16";
    Type[Type["Float32"] = -11] = "Float32";
    Type[Type["Float64"] = -12] = "Float64";
    Type[Type["DateDay"] = -13] = "DateDay";
    Type[Type["DateMillisecond"] = -14] = "DateMillisecond";
    Type[Type["TimestampSecond"] = -15] = "TimestampSecond";
    Type[Type["TimestampMillisecond"] = -16] = "TimestampMillisecond";
    Type[Type["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
    Type[Type["TimestampNanosecond"] = -18] = "TimestampNanosecond";
    Type[Type["TimeSecond"] = -19] = "TimeSecond";
    Type[Type["TimeMillisecond"] = -20] = "TimeMillisecond";
    Type[Type["TimeMicrosecond"] = -21] = "TimeMicrosecond";
    Type[Type["TimeNanosecond"] = -22] = "TimeNanosecond";
    Type[Type["DenseUnion"] = -23] = "DenseUnion";
    Type[Type["SparseUnion"] = -24] = "SparseUnion";
    Type[Type["IntervalDayTime"] = -25] = "IntervalDayTime";
    Type[Type["IntervalYearMonth"] = -26] = "IntervalYearMonth";
})(Type = exports.Type || (exports.Type = {}));
var BufferType;
(function (BufferType) {
    /**
     * used in List type, Dense Union and variable length primitive types (String, Binary)
     */
    BufferType[BufferType["OFFSET"] = 0] = "OFFSET";
    /**
     * actual data, either wixed width primitive types in slots or variable width delimited by an OFFSET vector
     */
    BufferType[BufferType["DATA"] = 1] = "DATA";
    /**
     * Bit vector indicating if each value is null
     */
    BufferType[BufferType["VALIDITY"] = 2] = "VALIDITY";
    /**
     * Type vector used in Union type
     */
    BufferType[BufferType["TYPE"] = 3] = "TYPE";
})(BufferType = exports.BufferType || (exports.BufferType = {}));



},{"./fb/Schema":"node_modules/apache-arrow/fb/Schema.js","./fb/Message":"node_modules/apache-arrow/fb/Message.js"}],"node_modules/apache-arrow/util/bit.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */
function getBool(_data, _index, byte, bit) {
    return (byte & 1 << bit) !== 0;
}
exports.getBool = getBool;
/** @ignore */
function getBit(_data, _index, byte, bit) {
    return (byte & 1 << bit) >> bit;
}
exports.getBit = getBit;
/** @ignore */
function setBool(bytes, index, value) {
    return value ?
        !!(bytes[index >> 3] |= (1 << (index % 8))) || true :
        !(bytes[index >> 3] &= ~(1 << (index % 8))) && false;
}
exports.setBool = setBool;
/** @ignore */
function truncateBitmap(offset, length, bitmap) {
    const alignedSize = (bitmap.byteLength + 7) & ~7;
    if (offset > 0 || bitmap.byteLength < alignedSize) {
        const bytes = new Uint8Array(alignedSize);
        // If the offset is a multiple of 8 bits, it's safe to slice the bitmap
        bytes.set(offset % 8 === 0 ? bitmap.subarray(offset >> 3) :
            // Otherwise iterate each bit from the offset and return a new one
            packBools(iterateBits(bitmap, offset, length, null, getBool)).subarray(0, alignedSize));
        return bytes;
    }
    return bitmap;
}
exports.truncateBitmap = truncateBitmap;
/** @ignore */
function packBools(values) {
    let xs = [];
    let i = 0, bit = 0, byte = 0;
    for (const value of values) {
        value && (byte |= 1 << bit);
        if (++bit === 8) {
            xs[i++] = byte;
            byte = bit = 0;
        }
    }
    if (i === 0 || bit > 0) {
        xs[i++] = byte;
    }
    let b = new Uint8Array((xs.length + 7) & ~7);
    b.set(xs);
    return b;
}
exports.packBools = packBools;
/** @ignore */
function* iterateBits(bytes, begin, length, context, get) {
    let bit = begin % 8;
    let byteIndex = begin >> 3;
    let index = 0, remaining = length;
    for (; remaining > 0; bit = 0) {
        let byte = bytes[byteIndex++];
        do {
            yield get(context, index++, byte, bit);
        } while (--remaining > 0 && ++bit < 8);
    }
}
exports.iterateBits = iterateBits;
/**
 * Compute the population count (the number of bits set to 1) for a range of bits in a Uint8Array.
 * @param vector The Uint8Array of bits for which to compute the population count.
 * @param lhs The range's left-hand side (or start) bit
 * @param rhs The range's right-hand side (or end) bit
 */
/** @ignore */
function popcnt_bit_range(data, lhs, rhs) {
    if (rhs - lhs <= 0) {
        return 0;
    }
    // If the bit range is less than one byte, sum the 1 bits in the bit range
    if (rhs - lhs < 8) {
        let sum = 0;
        for (const bit of iterateBits(data, lhs, rhs - lhs, data, getBit)) {
            sum += bit;
        }
        return sum;
    }
    // Get the next lowest multiple of 8 from the right hand side
    const rhsInside = rhs >> 3 << 3;
    // Get the next highest multiple of 8 from the left hand side
    const lhsInside = lhs + (lhs % 8 === 0 ? 0 : 8 - lhs % 8);
    return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    popcnt_bit_range(data, lhs, lhsInside) +
        // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
        popcnt_bit_range(data, rhsInside, rhs) +
        // Get the popcnt of all bits between the left and right hand sides' multiples of 8
        popcnt_array(data, lhsInside >> 3, (rhsInside - lhsInside) >> 3));
}
exports.popcnt_bit_range = popcnt_bit_range;
/** @ignore */
function popcnt_array(arr, byteOffset, byteLength) {
    let cnt = 0, pos = byteOffset | 0;
    const view = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    const len = byteLength === void 0 ? arr.byteLength : pos + byteLength;
    while (len - pos >= 4) {
        cnt += popcnt_uint32(view.getUint32(pos));
        pos += 4;
    }
    while (len - pos >= 2) {
        cnt += popcnt_uint32(view.getUint16(pos));
        pos += 2;
    }
    while (len - pos >= 1) {
        cnt += popcnt_uint32(view.getUint8(pos));
        pos += 1;
    }
    return cnt;
}
exports.popcnt_array = popcnt_array;
/** @ignore */
function popcnt_uint32(uint32) {
    let i = uint32 | 0;
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    return (((i + (i >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
}
exports.popcnt_uint32 = popcnt_uint32;



},{}],"node_modules/apache-arrow/visitor.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const vector_1 = require("./vector");
const enum_1 = require("./enum");
const type_1 = require("./type");
class Visitor {
    visitMany(nodes, ...args) {
        return nodes.map((node, i) => this.visit(node, ...args.map((x) => x[i])));
    }
    visit(...args) {
        return this.getVisitFn(args[0], false).apply(this, args);
    }
    getVisitFn(node, throwIfNotFound = true) {
        return getVisitFn(this, node, throwIfNotFound);
    }
    visitNull(_node, ..._args) { return null; }
    visitBool(_node, ..._args) { return null; }
    visitInt(_node, ..._args) { return null; }
    visitFloat(_node, ..._args) { return null; }
    visitUtf8(_node, ..._args) { return null; }
    visitBinary(_node, ..._args) { return null; }
    visitFixedSizeBinary(_node, ..._args) { return null; }
    visitDate(_node, ..._args) { return null; }
    visitTimestamp(_node, ..._args) { return null; }
    visitTime(_node, ..._args) { return null; }
    visitDecimal(_node, ..._args) { return null; }
    visitList(_node, ..._args) { return null; }
    visitStruct(_node, ..._args) { return null; }
    visitUnion(_node, ..._args) { return null; }
    visitDictionary(_node, ..._args) { return null; }
    visitInterval(_node, ..._args) { return null; }
    visitFixedSizeList(_node, ..._args) { return null; }
    visitMap(_node, ..._args) { return null; }
}
exports.Visitor = Visitor;
/** @ignore */
function getVisitFn(visitor, node, throwIfNotFound = true) {
    let fn = null;
    let dtype = enum_1.Type.NONE;
    // tslint:disable
    if (node instanceof data_1.Data) {
        dtype = inferDType(node.type);
    }
    else if (node instanceof vector_1.Vector) {
        dtype = inferDType(node.type);
    }
    else if (node instanceof type_1.DataType) {
        dtype = inferDType(node);
    }
    else if (typeof (dtype = node) !== 'number') {
        dtype = enum_1.Type[node];
    }
    switch (dtype) {
        case enum_1.Type.Null:
            fn = visitor.visitNull;
            break;
        case enum_1.Type.Bool:
            fn = visitor.visitBool;
            break;
        case enum_1.Type.Int:
            fn = visitor.visitInt;
            break;
        case enum_1.Type.Int8:
            fn = visitor.visitInt8 || visitor.visitInt;
            break;
        case enum_1.Type.Int16:
            fn = visitor.visitInt16 || visitor.visitInt;
            break;
        case enum_1.Type.Int32:
            fn = visitor.visitInt32 || visitor.visitInt;
            break;
        case enum_1.Type.Int64:
            fn = visitor.visitInt64 || visitor.visitInt;
            break;
        case enum_1.Type.Uint8:
            fn = visitor.visitUint8 || visitor.visitInt;
            break;
        case enum_1.Type.Uint16:
            fn = visitor.visitUint16 || visitor.visitInt;
            break;
        case enum_1.Type.Uint32:
            fn = visitor.visitUint32 || visitor.visitInt;
            break;
        case enum_1.Type.Uint64:
            fn = visitor.visitUint64 || visitor.visitInt;
            break;
        case enum_1.Type.Float:
            fn = visitor.visitFloat;
            break;
        case enum_1.Type.Float16:
            fn = visitor.visitFloat16 || visitor.visitFloat;
            break;
        case enum_1.Type.Float32:
            fn = visitor.visitFloat32 || visitor.visitFloat;
            break;
        case enum_1.Type.Float64:
            fn = visitor.visitFloat64 || visitor.visitFloat;
            break;
        case enum_1.Type.Utf8:
            fn = visitor.visitUtf8;
            break;
        case enum_1.Type.Binary:
            fn = visitor.visitBinary;
            break;
        case enum_1.Type.FixedSizeBinary:
            fn = visitor.visitFixedSizeBinary;
            break;
        case enum_1.Type.Date:
            fn = visitor.visitDate;
            break;
        case enum_1.Type.DateDay:
            fn = visitor.visitDateDay || visitor.visitDate;
            break;
        case enum_1.Type.DateMillisecond:
            fn = visitor.visitDateMillisecond || visitor.visitDate;
            break;
        case enum_1.Type.Timestamp:
            fn = visitor.visitTimestamp;
            break;
        case enum_1.Type.TimestampSecond:
            fn = visitor.visitTimestampSecond || visitor.visitTimestamp;
            break;
        case enum_1.Type.TimestampMillisecond:
            fn = visitor.visitTimestampMillisecond || visitor.visitTimestamp;
            break;
        case enum_1.Type.TimestampMicrosecond:
            fn = visitor.visitTimestampMicrosecond || visitor.visitTimestamp;
            break;
        case enum_1.Type.TimestampNanosecond:
            fn = visitor.visitTimestampNanosecond || visitor.visitTimestamp;
            break;
        case enum_1.Type.Time:
            fn = visitor.visitTime;
            break;
        case enum_1.Type.TimeSecond:
            fn = visitor.visitTimeSecond || visitor.visitTime;
            break;
        case enum_1.Type.TimeMillisecond:
            fn = visitor.visitTimeMillisecond || visitor.visitTime;
            break;
        case enum_1.Type.TimeMicrosecond:
            fn = visitor.visitTimeMicrosecond || visitor.visitTime;
            break;
        case enum_1.Type.TimeNanosecond:
            fn = visitor.visitTimeNanosecond || visitor.visitTime;
            break;
        case enum_1.Type.Decimal:
            fn = visitor.visitDecimal;
            break;
        case enum_1.Type.List:
            fn = visitor.visitList;
            break;
        case enum_1.Type.Struct:
            fn = visitor.visitStruct;
            break;
        case enum_1.Type.Union:
            fn = visitor.visitUnion;
            break;
        case enum_1.Type.DenseUnion:
            fn = visitor.visitDenseUnion || visitor.visitUnion;
            break;
        case enum_1.Type.SparseUnion:
            fn = visitor.visitSparseUnion || visitor.visitUnion;
            break;
        case enum_1.Type.Dictionary:
            fn = visitor.visitDictionary;
            break;
        case enum_1.Type.Interval:
            fn = visitor.visitInterval;
            break;
        case enum_1.Type.IntervalDayTime:
            fn = visitor.visitIntervalDayTime || visitor.visitInterval;
            break;
        case enum_1.Type.IntervalYearMonth:
            fn = visitor.visitIntervalYearMonth || visitor.visitInterval;
            break;
        case enum_1.Type.FixedSizeList:
            fn = visitor.visitFixedSizeList;
            break;
        case enum_1.Type.Map:
            fn = visitor.visitMap;
            break;
    }
    if (typeof fn === 'function')
        return fn;
    if (!throwIfNotFound)
        return () => null;
    throw new Error(`Unrecognized type '${enum_1.Type[dtype]}'`);
}
/** @ignore */
function inferDType(type) {
    switch (type.typeId) {
        case enum_1.Type.Null: return enum_1.Type.Null;
        case enum_1.Type.Int:
            const { bitWidth, isSigned } = type;
            switch (bitWidth) {
                case 8: return isSigned ? enum_1.Type.Int8 : enum_1.Type.Uint8;
                case 16: return isSigned ? enum_1.Type.Int16 : enum_1.Type.Uint16;
                case 32: return isSigned ? enum_1.Type.Int32 : enum_1.Type.Uint32;
                case 64: return isSigned ? enum_1.Type.Int64 : enum_1.Type.Uint64;
            }
            return enum_1.Type.Int;
        case enum_1.Type.Float:
            switch (type.precision) {
                case enum_1.Precision.HALF: return enum_1.Type.Float16;
                case enum_1.Precision.SINGLE: return enum_1.Type.Float32;
                case enum_1.Precision.DOUBLE: return enum_1.Type.Float64;
            }
            return enum_1.Type.Float;
        case enum_1.Type.Binary: return enum_1.Type.Binary;
        case enum_1.Type.Utf8: return enum_1.Type.Utf8;
        case enum_1.Type.Bool: return enum_1.Type.Bool;
        case enum_1.Type.Decimal: return enum_1.Type.Decimal;
        case enum_1.Type.Time:
            switch (type.unit) {
                case enum_1.TimeUnit.SECOND: return enum_1.Type.TimeSecond;
                case enum_1.TimeUnit.MILLISECOND: return enum_1.Type.TimeMillisecond;
                case enum_1.TimeUnit.MICROSECOND: return enum_1.Type.TimeMicrosecond;
                case enum_1.TimeUnit.NANOSECOND: return enum_1.Type.TimeNanosecond;
            }
            return enum_1.Type.Time;
        case enum_1.Type.Timestamp:
            switch (type.unit) {
                case enum_1.TimeUnit.SECOND: return enum_1.Type.TimestampSecond;
                case enum_1.TimeUnit.MILLISECOND: return enum_1.Type.TimestampMillisecond;
                case enum_1.TimeUnit.MICROSECOND: return enum_1.Type.TimestampMicrosecond;
                case enum_1.TimeUnit.NANOSECOND: return enum_1.Type.TimestampNanosecond;
            }
            return enum_1.Type.Timestamp;
        case enum_1.Type.Date:
            switch (type.unit) {
                case enum_1.DateUnit.DAY: return enum_1.Type.DateDay;
                case enum_1.DateUnit.MILLISECOND: return enum_1.Type.DateMillisecond;
            }
            return enum_1.Type.Date;
        case enum_1.Type.Interval:
            switch (type.unit) {
                case enum_1.IntervalUnit.DAY_TIME: return enum_1.Type.IntervalDayTime;
                case enum_1.IntervalUnit.YEAR_MONTH: return enum_1.Type.IntervalYearMonth;
            }
            return enum_1.Type.Interval;
        case enum_1.Type.Map: return enum_1.Type.Map;
        case enum_1.Type.List: return enum_1.Type.List;
        case enum_1.Type.Struct: return enum_1.Type.Struct;
        case enum_1.Type.Union:
            switch (type.mode) {
                case enum_1.UnionMode.Dense: return enum_1.Type.DenseUnion;
                case enum_1.UnionMode.Sparse: return enum_1.Type.SparseUnion;
            }
            return enum_1.Type.Union;
        case enum_1.Type.FixedSizeBinary: return enum_1.Type.FixedSizeBinary;
        case enum_1.Type.FixedSizeList: return enum_1.Type.FixedSizeList;
        case enum_1.Type.Dictionary: return enum_1.Type.Dictionary;
    }
    throw new Error(`Unrecognized type '${enum_1.Type[type.typeId]}'`);
}
// Add these here so they're picked up by the externs creator
// in the build, and closure-compiler doesn't minify them away
Visitor.prototype.visitInt8 = null;
Visitor.prototype.visitInt16 = null;
Visitor.prototype.visitInt32 = null;
Visitor.prototype.visitInt64 = null;
Visitor.prototype.visitUint8 = null;
Visitor.prototype.visitUint16 = null;
Visitor.prototype.visitUint32 = null;
Visitor.prototype.visitUint64 = null;
Visitor.prototype.visitFloat16 = null;
Visitor.prototype.visitFloat32 = null;
Visitor.prototype.visitFloat64 = null;
Visitor.prototype.visitDateDay = null;
Visitor.prototype.visitDateMillisecond = null;
Visitor.prototype.visitTimestampSecond = null;
Visitor.prototype.visitTimestampMillisecond = null;
Visitor.prototype.visitTimestampMicrosecond = null;
Visitor.prototype.visitTimestampNanosecond = null;
Visitor.prototype.visitTimeSecond = null;
Visitor.prototype.visitTimeMillisecond = null;
Visitor.prototype.visitTimeMicrosecond = null;
Visitor.prototype.visitTimeNanosecond = null;
Visitor.prototype.visitDenseUnion = null;
Visitor.prototype.visitSparseUnion = null;
Visitor.prototype.visitIntervalDayTime = null;
Visitor.prototype.visitIntervalYearMonth = null;



},{"./data":"node_modules/apache-arrow/data.js","./vector":"node_modules/apache-arrow/vector.js","./enum":"node_modules/apache-arrow/enum.js","./type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/visitor/typecomparator.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
/** @ignore */
class TypeComparator extends visitor_1.Visitor {
    compareSchemas(schema, other) {
        return (schema === other) || (other instanceof schema.constructor &&
            exports.instance.compareFields(schema.fields, other.fields));
    }
    compareFields(fields, others) {
        return (fields === others) || (Array.isArray(fields) &&
            Array.isArray(others) &&
            fields.length === others.length &&
            fields.every((f, i) => exports.instance.compareField(f, others[i])));
    }
    compareField(field, other) {
        return (field === other) || (other instanceof field.constructor &&
            field.name === other.name &&
            field.nullable === other.nullable &&
            exports.instance.visit(field.type, other.type));
    }
}
exports.TypeComparator = TypeComparator;
function compareConstructor(type, other) {
    return other instanceof type.constructor;
}
function compareAny(type, other) {
    return (type === other) || compareConstructor(type, other);
}
function compareInt(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.bitWidth === other.bitWidth &&
        type.isSigned === other.isSigned);
}
function compareFloat(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.precision === other.precision);
}
function compareFixedSizeBinary(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.byteWidth === other.byteWidth);
}
function compareDate(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit);
}
function compareTimestamp(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit &&
        type.timezone === other.timezone);
}
function compareTime(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit &&
        type.bitWidth === other.bitWidth);
}
function compareList(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.children.length === other.children.length &&
        exports.instance.compareFields(type.children, other.children));
}
function compareStruct(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.children.length === other.children.length &&
        exports.instance.compareFields(type.children, other.children));
}
function compareUnion(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.mode === other.mode &&
        type.typeIds.every((x, i) => x === other.typeIds[i]) &&
        exports.instance.compareFields(type.children, other.children));
}
function compareDictionary(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.id === other.id &&
        type.isOrdered === other.isOrdered &&
        exports.instance.visit(type.indices, other.indices) &&
        exports.instance.visit(type.dictionary, other.dictionary));
}
function compareInterval(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit);
}
function compareFixedSizeList(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.listSize === other.listSize &&
        type.children.length === other.children.length &&
        exports.instance.compareFields(type.children, other.children));
}
function compareMap(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.keysSorted === other.keysSorted &&
        type.children.length === other.children.length &&
        exports.instance.compareFields(type.children, other.children));
}
TypeComparator.prototype.visitNull = compareAny;
TypeComparator.prototype.visitBool = compareAny;
TypeComparator.prototype.visitInt = compareInt;
TypeComparator.prototype.visitInt8 = compareInt;
TypeComparator.prototype.visitInt16 = compareInt;
TypeComparator.prototype.visitInt32 = compareInt;
TypeComparator.prototype.visitInt64 = compareInt;
TypeComparator.prototype.visitUint8 = compareInt;
TypeComparator.prototype.visitUint16 = compareInt;
TypeComparator.prototype.visitUint32 = compareInt;
TypeComparator.prototype.visitUint64 = compareInt;
TypeComparator.prototype.visitFloat = compareFloat;
TypeComparator.prototype.visitFloat16 = compareFloat;
TypeComparator.prototype.visitFloat32 = compareFloat;
TypeComparator.prototype.visitFloat64 = compareFloat;
TypeComparator.prototype.visitUtf8 = compareAny;
TypeComparator.prototype.visitBinary = compareAny;
TypeComparator.prototype.visitFixedSizeBinary = compareFixedSizeBinary;
TypeComparator.prototype.visitDate = compareDate;
TypeComparator.prototype.visitDateDay = compareDate;
TypeComparator.prototype.visitDateMillisecond = compareDate;
TypeComparator.prototype.visitTimestamp = compareTimestamp;
TypeComparator.prototype.visitTimestampSecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMillisecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMicrosecond = compareTimestamp;
TypeComparator.prototype.visitTimestampNanosecond = compareTimestamp;
TypeComparator.prototype.visitTime = compareTime;
TypeComparator.prototype.visitTimeSecond = compareTime;
TypeComparator.prototype.visitTimeMillisecond = compareTime;
TypeComparator.prototype.visitTimeMicrosecond = compareTime;
TypeComparator.prototype.visitTimeNanosecond = compareTime;
TypeComparator.prototype.visitDecimal = compareAny;
TypeComparator.prototype.visitList = compareList;
TypeComparator.prototype.visitStruct = compareStruct;
TypeComparator.prototype.visitUnion = compareUnion;
TypeComparator.prototype.visitDenseUnion = compareUnion;
TypeComparator.prototype.visitSparseUnion = compareUnion;
TypeComparator.prototype.visitDictionary = compareDictionary;
TypeComparator.prototype.visitInterval = compareInterval;
TypeComparator.prototype.visitIntervalDayTime = compareInterval;
TypeComparator.prototype.visitIntervalYearMonth = compareInterval;
TypeComparator.prototype.visitFixedSizeList = compareFixedSizeList;
TypeComparator.prototype.visitMap = compareMap;
/** @ignore */
exports.instance = new TypeComparator();



},{"../visitor":"node_modules/apache-arrow/visitor.js"}],"node_modules/apache-arrow/type.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const typecomparator_1 = require("./visitor/typecomparator");
const enum_1 = require("./enum");
/**
 * An abstract base class for classes that encapsulate metadata about each of
 * the logical types that Arrow can represent.
 */
class DataType {
    /** @nocollapse */ static isNull(x) { return x && x.typeId === enum_1.Type.Null; }
    /** @nocollapse */ static isInt(x) { return x && x.typeId === enum_1.Type.Int; }
    /** @nocollapse */ static isFloat(x) { return x && x.typeId === enum_1.Type.Float; }
    /** @nocollapse */ static isBinary(x) { return x && x.typeId === enum_1.Type.Binary; }
    /** @nocollapse */ static isUtf8(x) { return x && x.typeId === enum_1.Type.Utf8; }
    /** @nocollapse */ static isBool(x) { return x && x.typeId === enum_1.Type.Bool; }
    /** @nocollapse */ static isDecimal(x) { return x && x.typeId === enum_1.Type.Decimal; }
    /** @nocollapse */ static isDate(x) { return x && x.typeId === enum_1.Type.Date; }
    /** @nocollapse */ static isTime(x) { return x && x.typeId === enum_1.Type.Time; }
    /** @nocollapse */ static isTimestamp(x) { return x && x.typeId === enum_1.Type.Timestamp; }
    /** @nocollapse */ static isInterval(x) { return x && x.typeId === enum_1.Type.Interval; }
    /** @nocollapse */ static isList(x) { return x && x.typeId === enum_1.Type.List; }
    /** @nocollapse */ static isStruct(x) { return x && x.typeId === enum_1.Type.Struct; }
    /** @nocollapse */ static isUnion(x) { return x && x.typeId === enum_1.Type.Union; }
    /** @nocollapse */ static isFixedSizeBinary(x) { return x && x.typeId === enum_1.Type.FixedSizeBinary; }
    /** @nocollapse */ static isFixedSizeList(x) { return x && x.typeId === enum_1.Type.FixedSizeList; }
    /** @nocollapse */ static isMap(x) { return x && x.typeId === enum_1.Type.Map; }
    /** @nocollapse */ static isDictionary(x) { return x && x.typeId === enum_1.Type.Dictionary; }
    get typeId() { return enum_1.Type.NONE; }
    compareTo(other) {
        return typecomparator_1.instance.visit(this, other);
    }
}
DataType[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.ArrayType = Array;
    return proto[Symbol.toStringTag] = 'DataType';
})(DataType.prototype);
exports.DataType = DataType;
/** @ignore */
class Null extends DataType {
    toString() { return `Null`; }
    get typeId() { return enum_1.Type.Null; }
}
Null[Symbol.toStringTag] = ((proto) => {
    return proto[Symbol.toStringTag] = 'Null';
})(Null.prototype);
exports.Null = Null;
/** @ignore */
class Int_ extends DataType {
    constructor(isSigned, bitWidth) {
        super();
        this.isSigned = isSigned;
        this.bitWidth = bitWidth;
    }
    get typeId() { return enum_1.Type.Int; }
    get ArrayType() {
        switch (this.bitWidth) {
            case 8: return this.isSigned ? Int8Array : Uint8Array;
            case 16: return this.isSigned ? Int16Array : Uint16Array;
            case 32: return this.isSigned ? Int32Array : Uint32Array;
            case 64: return this.isSigned ? Int32Array : Uint32Array;
        }
        throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    }
    toString() { return `${this.isSigned ? `I` : `Ui`}nt${this.bitWidth}`; }
}
Int_[Symbol.toStringTag] = ((proto) => {
    proto.isSigned = null;
    proto.bitWidth = null;
    return proto[Symbol.toStringTag] = 'Int';
})(Int_.prototype);
exports.Int = Int_;
/** @ignore */
class Int8 extends Int_ {
    constructor() { super(true, 8); }
}
exports.Int8 = Int8;
/** @ignore */
class Int16 extends Int_ {
    constructor() { super(true, 16); }
}
exports.Int16 = Int16;
/** @ignore */
class Int32 extends Int_ {
    constructor() { super(true, 32); }
}
exports.Int32 = Int32;
/** @ignore */
class Int64 extends Int_ {
    constructor() { super(true, 64); }
}
exports.Int64 = Int64;
/** @ignore */
class Uint8 extends Int_ {
    constructor() { super(false, 8); }
}
exports.Uint8 = Uint8;
/** @ignore */
class Uint16 extends Int_ {
    constructor() { super(false, 16); }
}
exports.Uint16 = Uint16;
/** @ignore */
class Uint32 extends Int_ {
    constructor() { super(false, 32); }
}
exports.Uint32 = Uint32;
/** @ignore */
class Uint64 extends Int_ {
    constructor() { super(false, 64); }
}
exports.Uint64 = Uint64;
Object.defineProperty(Int8.prototype, 'ArrayType', { value: Int8Array });
Object.defineProperty(Int16.prototype, 'ArrayType', { value: Int16Array });
Object.defineProperty(Int32.prototype, 'ArrayType', { value: Int32Array });
Object.defineProperty(Int64.prototype, 'ArrayType', { value: Int32Array });
Object.defineProperty(Uint8.prototype, 'ArrayType', { value: Uint8Array });
Object.defineProperty(Uint16.prototype, 'ArrayType', { value: Uint16Array });
Object.defineProperty(Uint32.prototype, 'ArrayType', { value: Uint32Array });
Object.defineProperty(Uint64.prototype, 'ArrayType', { value: Uint32Array });
/** @ignore */
class Float extends DataType {
    constructor(precision) {
        super();
        this.precision = precision;
    }
    get typeId() { return enum_1.Type.Float; }
    get ArrayType() {
        switch (this.precision) {
            case enum_1.Precision.HALF: return Uint16Array;
            case enum_1.Precision.SINGLE: return Float32Array;
            case enum_1.Precision.DOUBLE: return Float64Array;
        }
        throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    }
    toString() { return `Float${(this.precision << 5) || 16}`; }
}
Float[Symbol.toStringTag] = ((proto) => {
    proto.precision = null;
    return proto[Symbol.toStringTag] = 'Float';
})(Float.prototype);
exports.Float = Float;
/** @ignore */
class Float16 extends Float {
    constructor() { super(enum_1.Precision.HALF); }
}
exports.Float16 = Float16;
/** @ignore */
class Float32 extends Float {
    constructor() { super(enum_1.Precision.SINGLE); }
}
exports.Float32 = Float32;
/** @ignore */
class Float64 extends Float {
    constructor() { super(enum_1.Precision.DOUBLE); }
}
exports.Float64 = Float64;
Object.defineProperty(Float16.prototype, 'ArrayType', { value: Uint16Array });
Object.defineProperty(Float32.prototype, 'ArrayType', { value: Float32Array });
Object.defineProperty(Float64.prototype, 'ArrayType', { value: Float64Array });
/** @ignore */
class Binary extends DataType {
    constructor() {
        super();
    }
    get typeId() { return enum_1.Type.Binary; }
    toString() { return `Binary`; }
}
Binary[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Binary';
})(Binary.prototype);
exports.Binary = Binary;
/** @ignore */
class Utf8 extends DataType {
    constructor() {
        super();
    }
    get typeId() { return enum_1.Type.Utf8; }
    toString() { return `Utf8`; }
}
Utf8[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Utf8';
})(Utf8.prototype);
exports.Utf8 = Utf8;
/** @ignore */
class Bool extends DataType {
    constructor() {
        super();
    }
    get typeId() { return enum_1.Type.Bool; }
    toString() { return `Bool`; }
}
Bool[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Bool';
})(Bool.prototype);
exports.Bool = Bool;
/** @ignore */
class Decimal extends DataType {
    constructor(scale, precision) {
        super();
        this.scale = scale;
        this.precision = precision;
    }
    get typeId() { return enum_1.Type.Decimal; }
    toString() { return `Decimal[${this.precision}e${this.scale > 0 ? `+` : ``}${this.scale}]`; }
}
Decimal[Symbol.toStringTag] = ((proto) => {
    proto.scale = null;
    proto.precision = null;
    proto.ArrayType = Uint32Array;
    return proto[Symbol.toStringTag] = 'Decimal';
})(Decimal.prototype);
exports.Decimal = Decimal;
/** @ignore */
class Date_ extends DataType {
    constructor(unit) {
        super();
        this.unit = unit;
    }
    get typeId() { return enum_1.Type.Date; }
    toString() { return `Date${(this.unit + 1) * 32}<${enum_1.DateUnit[this.unit]}>`; }
}
Date_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Date';
})(Date_.prototype);
exports.Date_ = Date_;
/** @ignore */
class DateDay extends Date_ {
    constructor() { super(enum_1.DateUnit.DAY); }
}
exports.DateDay = DateDay;
/** @ignore */
class DateMillisecond extends Date_ {
    constructor() { super(enum_1.DateUnit.MILLISECOND); }
}
exports.DateMillisecond = DateMillisecond;
/** @ignore */
class Time_ extends DataType {
    constructor(unit, bitWidth) {
        super();
        this.unit = unit;
        this.bitWidth = bitWidth;
    }
    get typeId() { return enum_1.Type.Time; }
    toString() { return `Time${this.bitWidth}<${enum_1.TimeUnit[this.unit]}>`; }
}
Time_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.bitWidth = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Time';
})(Time_.prototype);
exports.Time = Time_;
/** @ignore */
class TimeSecond extends Time_ {
    constructor() { super(enum_1.TimeUnit.SECOND, 32); }
}
exports.TimeSecond = TimeSecond;
/** @ignore */
class TimeMillisecond extends Time_ {
    constructor() { super(enum_1.TimeUnit.MILLISECOND, 32); }
}
exports.TimeMillisecond = TimeMillisecond;
/** @ignore */
class TimeMicrosecond extends Time_ {
    constructor() { super(enum_1.TimeUnit.MICROSECOND, 64); }
}
exports.TimeMicrosecond = TimeMicrosecond;
/** @ignore */
class TimeNanosecond extends Time_ {
    constructor() { super(enum_1.TimeUnit.NANOSECOND, 64); }
}
exports.TimeNanosecond = TimeNanosecond;
/** @ignore */
class Timestamp_ extends DataType {
    constructor(unit, timezone) {
        super();
        this.unit = unit;
        this.timezone = timezone;
    }
    get typeId() { return enum_1.Type.Timestamp; }
    toString() { return `Timestamp<${enum_1.TimeUnit[this.unit]}${this.timezone ? `, ${this.timezone}` : ``}>`; }
}
Timestamp_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.timezone = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Timestamp';
})(Timestamp_.prototype);
exports.Timestamp = Timestamp_;
/** @ignore */
class TimestampSecond extends Timestamp_ {
    constructor(timezone) { super(enum_1.TimeUnit.SECOND, timezone); }
}
exports.TimestampSecond = TimestampSecond;
/** @ignore */
class TimestampMillisecond extends Timestamp_ {
    constructor(timezone) { super(enum_1.TimeUnit.MILLISECOND, timezone); }
}
exports.TimestampMillisecond = TimestampMillisecond;
/** @ignore */
class TimestampMicrosecond extends Timestamp_ {
    constructor(timezone) { super(enum_1.TimeUnit.MICROSECOND, timezone); }
}
exports.TimestampMicrosecond = TimestampMicrosecond;
/** @ignore */
class TimestampNanosecond extends Timestamp_ {
    constructor(timezone) { super(enum_1.TimeUnit.NANOSECOND, timezone); }
}
exports.TimestampNanosecond = TimestampNanosecond;
/** @ignore */
class Interval_ extends DataType {
    constructor(unit) {
        super();
        this.unit = unit;
    }
    get typeId() { return enum_1.Type.Interval; }
    toString() { return `Interval<${enum_1.IntervalUnit[this.unit]}>`; }
}
Interval_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Interval';
})(Interval_.prototype);
exports.Interval = Interval_;
/** @ignore */
class IntervalDayTime extends Interval_ {
    constructor() { super(enum_1.IntervalUnit.DAY_TIME); }
}
exports.IntervalDayTime = IntervalDayTime;
/** @ignore */
class IntervalYearMonth extends Interval_ {
    constructor() { super(enum_1.IntervalUnit.YEAR_MONTH); }
}
exports.IntervalYearMonth = IntervalYearMonth;
/** @ignore */
class List extends DataType {
    constructor(child) {
        super();
        this.children = [child];
    }
    get typeId() { return enum_1.Type.List; }
    toString() { return `List<${this.valueType}>`; }
    get valueType() { return this.children[0].type; }
    get valueField() { return this.children[0]; }
    get ArrayType() { return this.valueType.ArrayType; }
}
List[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    return proto[Symbol.toStringTag] = 'List';
})(List.prototype);
exports.List = List;
/** @ignore */
class Struct extends DataType {
    constructor(children) {
        super();
        this.children = children;
    }
    get typeId() { return enum_1.Type.Struct; }
    toString() { return `Struct<{${this.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`; }
}
Struct[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    return proto[Symbol.toStringTag] = 'Struct';
})(Struct.prototype);
exports.Struct = Struct;
/** @ignore */
class Union_ extends DataType {
    constructor(mode, typeIds, children) {
        super();
        this.mode = mode;
        this.children = children;
        this.typeIds = typeIds = Int32Array.from(typeIds);
        this.typeIdToChildIndex = typeIds.reduce((typeIdToChildIndex, typeId, idx) => {
            return (typeIdToChildIndex[typeId] = idx) && typeIdToChildIndex || typeIdToChildIndex;
        }, Object.create(null));
    }
    get typeId() { return enum_1.Type.Union; }
    toString() {
        return `${this[Symbol.toStringTag]}<${this.children.map((x) => `${x.type}`).join(` | `)}>`;
    }
}
Union_[Symbol.toStringTag] = ((proto) => {
    proto.mode = null;
    proto.typeIds = null;
    proto.children = null;
    proto.typeIdToChildIndex = null;
    proto.ArrayType = Int8Array;
    return proto[Symbol.toStringTag] = 'Union';
})(Union_.prototype);
exports.Union = Union_;
/** @ignore */
class DenseUnion extends Union_ {
    constructor(typeIds, children) {
        super(enum_1.UnionMode.Dense, typeIds, children);
    }
}
exports.DenseUnion = DenseUnion;
/** @ignore */
class SparseUnion extends Union_ {
    constructor(typeIds, children) {
        super(enum_1.UnionMode.Sparse, typeIds, children);
    }
}
exports.SparseUnion = SparseUnion;
/** @ignore */
class FixedSizeBinary extends DataType {
    constructor(byteWidth) {
        super();
        this.byteWidth = byteWidth;
    }
    get typeId() { return enum_1.Type.FixedSizeBinary; }
    toString() { return `FixedSizeBinary[${this.byteWidth}]`; }
}
FixedSizeBinary[Symbol.toStringTag] = ((proto) => {
    proto.byteWidth = null;
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'FixedSizeBinary';
})(FixedSizeBinary.prototype);
exports.FixedSizeBinary = FixedSizeBinary;
/** @ignore */
class FixedSizeList extends DataType {
    constructor(listSize, child) {
        super();
        this.listSize = listSize;
        this.children = [child];
    }
    get typeId() { return enum_1.Type.FixedSizeList; }
    get valueType() { return this.children[0].type; }
    get valueField() { return this.children[0]; }
    get ArrayType() { return this.valueType.ArrayType; }
    toString() { return `FixedSizeList[${this.listSize}]<${this.valueType}>`; }
}
FixedSizeList[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.listSize = null;
    return proto[Symbol.toStringTag] = 'FixedSizeList';
})(FixedSizeList.prototype);
exports.FixedSizeList = FixedSizeList;
/** @ignore */
class Map_ extends DataType {
    constructor(child, keysSorted = false) {
        super();
        this.children = [child];
        this.keysSorted = keysSorted;
    }
    get typeId() { return enum_1.Type.Map; }
    get keyType() { return this.children[0].type.children[0].type; }
    get valueType() { return this.children[0].type.children[1].type; }
    toString() { return `Map<{${this.children[0].type.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`; }
}
Map_[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.keysSorted = null;
    return proto[Symbol.toStringTag] = 'Map_';
})(Map_.prototype);
exports.Map_ = Map_;
/** @ignore */
const getId = ((atomicDictionaryId) => () => ++atomicDictionaryId)(-1);
/** @ignore */
class Dictionary extends DataType {
    constructor(dictionary, indices, id, isOrdered) {
        super();
        this.indices = indices;
        this.dictionary = dictionary;
        this.isOrdered = isOrdered || false;
        this.id = id == null ? getId() : typeof id === 'number' ? id : id.low;
    }
    get typeId() { return enum_1.Type.Dictionary; }
    get children() { return this.dictionary.children; }
    get valueType() { return this.dictionary; }
    get ArrayType() { return this.dictionary.ArrayType; }
    toString() { return `Dictionary<${this.indices}, ${this.dictionary}>`; }
}
Dictionary[Symbol.toStringTag] = ((proto) => {
    proto.id = null;
    proto.indices = null;
    proto.isOrdered = null;
    proto.dictionary = null;
    return proto[Symbol.toStringTag] = 'Dictionary';
})(Dictionary.prototype);
exports.Dictionary = Dictionary;
/** @ignore */
function strideForType(type) {
    let t = type;
    switch (type.typeId) {
        case enum_1.Type.Decimal: return 4;
        case enum_1.Type.Timestamp: return 2;
        case enum_1.Type.Date: return 1 + t.unit;
        case enum_1.Type.Interval: return 1 + t.unit;
        case enum_1.Type.Int: return 1 + +(t.bitWidth > 32);
        case enum_1.Type.Time: return 1 + +(t.bitWidth > 32);
        case enum_1.Type.FixedSizeList: return t.listSize;
        case enum_1.Type.FixedSizeBinary: return t.byteWidth;
        default: return 1;
    }
}
exports.strideForType = strideForType;



},{"./visitor/typecomparator":"node_modules/apache-arrow/visitor/typecomparator.js","./enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/data.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const bit_1 = require("./util/bit");
const bit_2 = require("./util/bit");
const enum_1 = require("./enum");
const type_1 = require("./type");
const buffer_1 = require("./util/buffer");
/** @ignore */ exports.kUnknownNullCount = -1;
/** @ignore */
class Data {
    constructor(type, offset, length, nullCount, buffers, childData, dictionary) {
        this.type = type;
        this.dictionary = dictionary;
        this.offset = Math.floor(Math.max(offset || 0, 0));
        this.length = Math.floor(Math.max(length || 0, 0));
        this._nullCount = Math.floor(Math.max(nullCount || 0, -1));
        this.childData = (childData || []).map((x) => x instanceof Data ? x : x.data);
        let buffer;
        if (buffers instanceof Data) {
            this.stride = buffers.stride;
            this.values = buffers.values;
            this.typeIds = buffers.typeIds;
            this.nullBitmap = buffers.nullBitmap;
            this.valueOffsets = buffers.valueOffsets;
        }
        else {
            this.stride = type_1.strideForType(type);
            if (buffers) {
                (buffer = buffers[0]) && (this.valueOffsets = buffer);
                (buffer = buffers[1]) && (this.values = buffer);
                (buffer = buffers[2]) && (this.nullBitmap = buffer);
                (buffer = buffers[3]) && (this.typeIds = buffer);
            }
        }
    }
    get typeId() { return this.type.typeId; }
    get ArrayType() { return this.type.ArrayType; }
    get buffers() {
        return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
    }
    get byteLength() {
        let byteLength = 0;
        let { valueOffsets, values, nullBitmap, typeIds } = this;
        valueOffsets && (byteLength += valueOffsets.byteLength);
        values && (byteLength += values.byteLength);
        nullBitmap && (byteLength += nullBitmap.byteLength);
        typeIds && (byteLength += typeIds.byteLength);
        return this.childData.reduce((byteLength, child) => byteLength + child.byteLength, byteLength);
    }
    get nullCount() {
        let nullCount = this._nullCount;
        let nullBitmap;
        if (nullCount <= exports.kUnknownNullCount && (nullBitmap = this.nullBitmap)) {
            this._nullCount = nullCount = this.length - bit_2.popcnt_bit_range(nullBitmap, this.offset, this.offset + this.length);
        }
        return nullCount;
    }
    clone(type, offset = this.offset, length = this.length, nullCount = this._nullCount, buffers = this, childData = this.childData) {
        return new Data(type, offset, length, nullCount, buffers, childData, this.dictionary);
    }
    slice(offset, length) {
        const { stride, typeId, childData } = this;
        // +true === 1, +false === 0, so this means
        // we keep nullCount at 0 if it's already 0,
        // otherwise set to the invalidated flag -1
        const nullCount = +(this._nullCount === 0) - 1;
        const childStride = typeId === 16 /* FixedSizeList */ ? stride : 1;
        const buffers = this._sliceBuffers(offset, length, stride, typeId);
        return this.clone(this.type, this.offset + offset, length, nullCount, buffers, 
        // Don't slice children if we have value offsets (the variable-width types)
        (!childData.length || this.valueOffsets) ? childData : this._sliceChildren(childData, childStride * offset, childStride * length));
    }
    _changeLengthAndBackfillNullBitmap(newLength) {
        if (this.typeId === enum_1.Type.Null) {
            return this.clone(this.type, 0, newLength, 0);
        }
        const { length, nullCount } = this;
        // start initialized with 0s (nulls), then fill from 0 to length with 1s (not null)
        const bitmap = new Uint8Array(((newLength + 63) & ~63) >> 3).fill(255, 0, length >> 3);
        // set all the bits in the last byte (up to bit `length - length % 8`) to 1 (not null)
        bitmap[length >> 3] = (1 << (length - (length & ~7))) - 1;
        // if we have a nullBitmap, truncate + slice and set it over the pre-filled 1s
        if (nullCount > 0) {
            bitmap.set(bit_1.truncateBitmap(this.offset, length, this.nullBitmap), 0);
        }
        const buffers = this.buffers;
        buffers[enum_1.BufferType.VALIDITY] = bitmap;
        return this.clone(this.type, 0, newLength, nullCount + (newLength - length), buffers);
    }
    _sliceBuffers(offset, length, stride, typeId) {
        let arr, { buffers } = this;
        // If typeIds exist, slice the typeIds buffer
        (arr = buffers[enum_1.BufferType.TYPE]) && (buffers[enum_1.BufferType.TYPE] = arr.subarray(offset, offset + length));
        // If offsets exist, only slice the offsets buffer
        (arr = buffers[enum_1.BufferType.OFFSET]) && (buffers[enum_1.BufferType.OFFSET] = arr.subarray(offset, offset + length + 1)) ||
            // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
            (arr = buffers[enum_1.BufferType.DATA]) && (buffers[enum_1.BufferType.DATA] = typeId === 6 ? arr : arr.subarray(stride * offset, stride * (offset + length)));
        return buffers;
    }
    _sliceChildren(childData, offset, length) {
        return childData.map((child) => child.slice(offset, length));
    }
    //
    // Convenience methods for creating Data instances for each of the Arrow Vector types
    //
    /** @nocollapse */
    static new(type, offset, length, nullCount, buffers, childData, dictionary) {
        if (buffers instanceof Data) {
            buffers = buffers.buffers;
        }
        else if (!buffers) {
            buffers = [];
        }
        switch (type.typeId) {
            case enum_1.Type.Null: return Data.Null(type, offset, length);
            case enum_1.Type.Int: return Data.Int(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Dictionary: return Data.Dictionary(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || [], dictionary);
            case enum_1.Type.Float: return Data.Float(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Bool: return Data.Bool(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Decimal: return Data.Decimal(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Date: return Data.Date(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Time: return Data.Time(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Timestamp: return Data.Timestamp(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Interval: return Data.Interval(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.FixedSizeBinary: return Data.FixedSizeBinary(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Binary: return Data.Binary(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.OFFSET] || [], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.Utf8: return Data.Utf8(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.OFFSET] || [], buffers[enum_1.BufferType.DATA] || []);
            case enum_1.Type.List: return Data.List(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.OFFSET] || [], (childData || [])[0]);
            case enum_1.Type.FixedSizeList: return Data.FixedSizeList(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], (childData || [])[0]);
            case enum_1.Type.Struct: return Data.Struct(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], childData || []);
            case enum_1.Type.Map: return Data.Map(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.OFFSET] || [], (childData || [])[0]);
            case enum_1.Type.Union: return Data.Union(type, offset, length, nullCount || 0, buffers[enum_1.BufferType.VALIDITY], buffers[enum_1.BufferType.TYPE] || [], buffers[enum_1.BufferType.OFFSET] || childData, childData);
        }
        throw new Error(`Unrecognized typeId ${type.typeId}`);
    }
    /** @nocollapse */
    static Null(type, offset, length) {
        return new Data(type, offset, length, 0);
    }
    /** @nocollapse */
    static Int(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Dictionary(type, offset, length, nullCount, nullBitmap, data, dictionary) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.indices.ArrayType, data), buffer_1.toUint8Array(nullBitmap)], [], dictionary);
    }
    /** @nocollapse */
    static Float(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Bool(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Decimal(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Date(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Time(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Timestamp(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Interval(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static FixedSizeBinary(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, buffer_1.toArrayBufferView(type.ArrayType, data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Binary(type, offset, length, nullCount, nullBitmap, valueOffsets, data) {
        return new Data(type, offset, length, nullCount, [buffer_1.toInt32Array(valueOffsets), buffer_1.toUint8Array(data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Utf8(type, offset, length, nullCount, nullBitmap, valueOffsets, data) {
        return new Data(type, offset, length, nullCount, [buffer_1.toInt32Array(valueOffsets), buffer_1.toUint8Array(data), buffer_1.toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static List(type, offset, length, nullCount, nullBitmap, valueOffsets, child) {
        return new Data(type, offset, length, nullCount, [buffer_1.toInt32Array(valueOffsets), undefined, buffer_1.toUint8Array(nullBitmap)], [child]);
    }
    /** @nocollapse */
    static FixedSizeList(type, offset, length, nullCount, nullBitmap, child) {
        return new Data(type, offset, length, nullCount, [undefined, undefined, buffer_1.toUint8Array(nullBitmap)], [child]);
    }
    /** @nocollapse */
    static Struct(type, offset, length, nullCount, nullBitmap, children) {
        return new Data(type, offset, length, nullCount, [undefined, undefined, buffer_1.toUint8Array(nullBitmap)], children);
    }
    /** @nocollapse */
    static Map(type, offset, length, nullCount, nullBitmap, valueOffsets, child) {
        return new Data(type, offset, length, nullCount, [buffer_1.toInt32Array(valueOffsets), undefined, buffer_1.toUint8Array(nullBitmap)], [child]);
    }
    /** @nocollapse */
    static Union(type, offset, length, nullCount, nullBitmap, typeIds, valueOffsetsOrChildren, children) {
        const buffers = [
            undefined, undefined,
            buffer_1.toUint8Array(nullBitmap),
            buffer_1.toArrayBufferView(type.ArrayType, typeIds)
        ];
        if (type.mode === enum_1.UnionMode.Sparse) {
            return new Data(type, offset, length, nullCount, buffers, valueOffsetsOrChildren);
        }
        buffers[enum_1.BufferType.OFFSET] = buffer_1.toInt32Array(valueOffsetsOrChildren);
        return new Data(type, offset, length, nullCount, buffers, children);
    }
}
exports.Data = Data;
Data.prototype.childData = Object.freeze([]);



},{"./util/bit":"node_modules/apache-arrow/util/bit.js","./enum":"node_modules/apache-arrow/enum.js","./type":"node_modules/apache-arrow/type.js","./util/buffer":"node_modules/apache-arrow/util/buffer.js"}],"node_modules/apache-arrow/util/pretty.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */ const undf = void (0);
/** @ignore */
function valueToString(x) {
    if (x === null) {
        return 'null';
    }
    if (x === undf) {
        return 'undefined';
    }
    switch (typeof x) {
        case 'number': return `${x}`;
        case 'bigint': return `${x}`;
        case 'string': return `"${x}"`;
    }
    // If [Symbol.toPrimitive] is implemented (like in BN)
    // use it instead of JSON.stringify(). This ensures we
    // print BigInts, Decimals, and Binary in their native
    // representation
    if (typeof x[Symbol.toPrimitive] === 'function') {
        return x[Symbol.toPrimitive]('string');
    }
    return ArrayBuffer.isView(x) ? `[${x}]` : JSON.stringify(x);
}
exports.valueToString = valueToString;



},{}],"node_modules/apache-arrow/builder/valid.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const pretty_1 = require("../util/pretty");
const compat_1 = require("../util/compat");
/**
 * Dynamically compile the null values into an `isValid()` function whose
 * implementation is a switch statement. Microbenchmarks in v8 indicate
 * this approach is 25% faster than using an ES6 Map.
 *
 * @example
 * console.log(createIsValidFunction([null, 'N/A', NaN]));
 * `function (x) {
 *     if (x !== x) return false;
 *     switch (x) {
 *         case null:
 *         case "N/A":
 *             return false;
 *     }
 *     return true;
 * }`
 *
 * @ignore
 * @param nullValues
 */
function createIsValidFunction(nullValues) {
    if (!nullValues || nullValues.length <= 0) {
        // @ts-ignore
        return function isValid(value) { return true; };
    }
    let fnBody = '';
    let noNaNs = nullValues.filter((x) => x === x);
    if (noNaNs.length > 0) {
        fnBody = `
    switch (x) {${noNaNs.map((x) => `
        case ${valueToCase(x)}:`).join('')}
            return false;
    }`;
    }
    // NaN doesn't equal anything including itself, so it doesn't work as a
    // switch case. Instead we must explicitly check for NaN before the switch.
    if (nullValues.length !== noNaNs.length) {
        fnBody = `if (x !== x) return false;\n${fnBody}`;
    }
    return new Function(`x`, `${fnBody}\nreturn true;`);
}
exports.createIsValidFunction = createIsValidFunction;
/** @ignore */
function valueToCase(x) {
    if (typeof x !== 'bigint') {
        return pretty_1.valueToString(x);
    }
    else if (compat_1.BigIntAvailable) {
        return `${pretty_1.valueToString(x)}n`;
    }
    return `"${pretty_1.valueToString(x)}"`;
}



},{"../util/pretty":"node_modules/apache-arrow/util/pretty.js","../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/builder/buffer.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../util/buffer");
const compat_1 = require("../util/compat");
/** @ignore */
const roundLengthUpToNearest64Bytes = (len, BPE) => ((((len * BPE) + 63) & ~63) || 64) / BPE;
/** @ignore */
const sliceOrExtendArray = (arr, len = 0) => (arr.length >= len ? arr.subarray(0, len) : buffer_1.memcpy(new arr.constructor(len), arr, 0));
/** @ignore */
class BufferBuilder {
    constructor(buffer, stride = 1) {
        this.buffer = buffer;
        this.stride = stride;
        this.BYTES_PER_ELEMENT = buffer.BYTES_PER_ELEMENT;
        this.ArrayType = buffer.constructor;
        this._resize(this.length = buffer.length / stride | 0);
    }
    get byteLength() { return this.length * this.stride * this.BYTES_PER_ELEMENT | 0; }
    get reservedLength() { return this.buffer.length / this.stride; }
    get reservedByteLength() { return this.buffer.byteLength; }
    // @ts-ignore
    set(index, value) { return this; }
    append(value) { return this.set(this.length, value); }
    reserve(extra) {
        if (extra > 0) {
            this.length += extra;
            const stride = this.stride;
            const length = this.length * stride;
            const reserved = this.buffer.length;
            if (length >= reserved) {
                this._resize(reserved === 0
                    ? roundLengthUpToNearest64Bytes(length * 1, this.BYTES_PER_ELEMENT)
                    : roundLengthUpToNearest64Bytes(length * 2, this.BYTES_PER_ELEMENT));
            }
        }
        return this;
    }
    flush(length = this.length) {
        length = roundLengthUpToNearest64Bytes(length * this.stride, this.BYTES_PER_ELEMENT);
        const array = sliceOrExtendArray(this.buffer, length);
        this.clear();
        return array;
    }
    clear() {
        this.length = 0;
        this._resize(0);
        return this;
    }
    _resize(newLength) {
        return this.buffer = buffer_1.memcpy(new this.ArrayType(newLength), this.buffer);
    }
}
exports.BufferBuilder = BufferBuilder;
BufferBuilder.prototype.offset = 0;
/** @ignore */
class DataBufferBuilder extends BufferBuilder {
    last() { return this.get(this.length - 1); }
    get(index) { return this.buffer[index]; }
    set(index, value) {
        this.reserve(index - this.length + 1);
        this.buffer[index * this.stride] = value;
        return this;
    }
}
exports.DataBufferBuilder = DataBufferBuilder;
/** @ignore */
class BitmapBufferBuilder extends DataBufferBuilder {
    constructor(data = new Uint8Array(0)) {
        super(data, 1 / 8);
        this.numValid = 0;
    }
    get numInvalid() { return this.length - this.numValid; }
    get(idx) { return this.buffer[idx >> 3] >> idx % 8 & 1; }
    set(idx, val) {
        const { buffer } = this.reserve(idx - this.length + 1);
        const byte = idx >> 3, bit = idx % 8, cur = buffer[byte] >> bit & 1;
        // If `val` is truthy and the current bit is 0, flip it to 1 and increment `numValid`.
        // If `val` is falsey and the current bit is 1, flip it to 0 and decrement `numValid`.
        val ? cur === 0 && ((buffer[byte] |= (1 << bit)), ++this.numValid)
            : cur === 1 && ((buffer[byte] &= ~(1 << bit)), --this.numValid);
        return this;
    }
    clear() {
        this.numValid = 0;
        return super.clear();
    }
}
exports.BitmapBufferBuilder = BitmapBufferBuilder;
/** @ignore */
class OffsetsBufferBuilder extends DataBufferBuilder {
    constructor(data = new Int32Array(1)) { super(data, 1); }
    append(value) {
        return this.set(this.length - 1, value);
    }
    set(index, value) {
        const offset = this.length - 1;
        const buffer = this.reserve(index - offset + 1).buffer;
        if (offset < index++) {
            buffer.fill(buffer[offset], offset, index);
        }
        buffer[index] = buffer[index - 1] + value;
        return this;
    }
    flush(length = this.length - 1) {
        if (length > this.length) {
            this.set(length - 1, 0);
        }
        return super.flush(length + 1);
    }
}
exports.OffsetsBufferBuilder = OffsetsBufferBuilder;
/** @ignore */
class WideBufferBuilder extends BufferBuilder {
    get ArrayType64() {
        return this._ArrayType64 || (this._ArrayType64 = (this.buffer instanceof Int32Array ? compat_1.BigInt64Array : compat_1.BigUint64Array));
    }
    set(index, value) {
        this.reserve(index - this.length + 1);
        switch (typeof value) {
            case 'bigint':
                this.buffer64[index] = value;
                break;
            case 'number':
                this.buffer[index * this.stride] = value;
                break;
            default: this.buffer.set(value, index * this.stride);
        }
        return this;
    }
    _resize(newLength) {
        const data = super._resize(newLength);
        const length = data.byteLength / (this.BYTES_PER_ELEMENT * this.stride);
        if (compat_1.BigIntAvailable) {
            this.buffer64 = new this.ArrayType64(data.buffer, data.byteOffset, length);
        }
        return data;
    }
}
exports.WideBufferBuilder = WideBufferBuilder;



},{"../util/buffer":"node_modules/apache-arrow/util/buffer.js","../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/builder.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("./vector");
const enum_1 = require("./enum");
const data_1 = require("./data");
const valid_1 = require("./builder/valid");
const buffer_1 = require("./builder/buffer");
const type_1 = require("./type");
/**
 * An abstract base class for types that construct Arrow Vectors from arbitrary JavaScript values.
 *
 * A `Builder` is responsible for writing arbitrary JavaScript values
 * to ArrayBuffers and/or child Builders according to the Arrow specification
 * for each DataType, creating or resizing the underlying ArrayBuffers as necessary.
 *
 * The `Builder` for each Arrow `DataType` handles converting and appending
 * values for a given `DataType`. The high-level {@link Builder.new `Builder.new()`} convenience
 * method creates the specific `Builder` subclass for the supplied `DataType`.
 *
 * Once created, `Builder` instances support both appending values to the end
 * of the `Builder`, and random-access writes to specific indices
 * (`Builder.prototype.append(value)` is a convenience method for
 * `builder.set(builder.length, value)`). Appending or setting values beyond the
 * Builder's current length may cause the builder to grow its underlying buffers
 * or child Builders (if applicable) to accommodate the new values.
 *
 * After enough values have been written to a `Builder`, `Builder.prototype.flush()`
 * will commit the values to the underlying ArrayBuffers (or child Builders). The
 * internal Builder state will be reset, and an instance of `Data<T>` is returned.
 * Alternatively, `Builder.prototype.toVector()` will flush the `Builder` and return
 * an instance of `Vector<T>` instead.
 *
 * When there are no more values to write, use `Builder.prototype.finish()` to
 * finalize the `Builder`. This does not reset the internal state, so it is
 * necessary to call `Builder.prototype.flush()` or `toVector()` one last time
 * if there are still values queued to be flushed.
 *
 * Note: calling `Builder.prototype.finish()` is required when using a `DictionaryBuilder`,
 * because this is when it flushes the values that have been enqueued in its internal
 * dictionary's `Builder`, and creates the `dictionaryVector` for the `Dictionary` `DataType`.
 *
 * ```ts
 * import { Builder, Utf8 } from 'apache-arrow';
 *
 * const utf8Builder = Builder.new({
 *     type: new Utf8(),
 *     nullValues: [null, 'n/a']
 * });
 *
 * utf8Builder
 *     .append('hello')
 *     .append('n/a')
 *     .append('world')
 *     .append(null);
 *
 * const utf8Vector = utf8Builder.finish().toVector();
 *
 * console.log(utf8Vector.toJSON());
 * // > ["hello", null, "world", null]
 * ```
 *
 * @typeparam T The `DataType` of this `Builder`.
 * @typeparam TNull The type(s) of values which will be considered null-value sentinels.
 */
class Builder {
    /**
     * Construct a builder with the given Arrow DataType with optional null values,
     * which will be interpreted as "null" when set or appended to the `Builder`.
     * @param {{ type: T, nullValues?: any[] }} options A `BuilderOptions` object used to create this `Builder`.
     */
    constructor({ 'type': type, 'nullValues': nulls }) {
        /**
         * The number of values written to the `Builder` that haven't been flushed yet.
         * @readonly
         */
        this.length = 0;
        /**
         * A boolean indicating whether `Builder.prototype.finish()` has been called on this `Builder`.
         * @readonly
         */
        this.finished = false;
        this.type = type;
        this.children = [];
        this.nullValues = nulls;
        this.stride = type_1.strideForType(type);
        this._nulls = new buffer_1.BitmapBufferBuilder();
        if (nulls && nulls.length > 0) {
            this._isValid = valid_1.createIsValidFunction(nulls);
        }
    }
    /**
     * Create a `Builder` instance based on the `type` property of the supplied `options` object.
     * @param {BuilderOptions<T, TNull>} options An object with a required `DataType` instance
     * and other optional parameters to be passed to the `Builder` subclass for the given `type`.
     *
     * @typeparam T The `DataType` of the `Builder` to create.
     * @typeparam TNull The type(s) of values which will be considered null-value sentinels.
     * @nocollapse
     */
    // @ts-ignore
    static new(options) { }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    // @ts-ignore
    static throughDOM(options) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    /**
     * Transform a synchronous `Iterable` of arbitrary JavaScript values into a
     * sequence of Arrow Vector<T> following the chunking semantics defined in
     * the supplied `options` argument.
     *
     * This function returns a function that accepts an `Iterable` of values to
     * transform. When called, this function returns an Iterator of `Vector<T>`.
     *
     * The resulting `Iterator<Vector<T>>` yields Vectors based on the
     * `queueingStrategy` and `highWaterMark` specified in the `options` argument.
     *
     * * If `queueingStrategy` is `"count"` (or omitted), The `Iterator<Vector<T>>`
     *   will flush the underlying `Builder` (and yield a new `Vector<T>`) once the
     *   Builder's `length` reaches or exceeds the supplied `highWaterMark`.
     * * If `queueingStrategy` is `"bytes"`, the `Iterator<Vector<T>>` will flush
     *   the underlying `Builder` (and yield a new `Vector<T>`) once its `byteLength`
     *   reaches or exceeds the supplied `highWaterMark`.
     *
     * @param {IterableBuilderOptions<T, TNull>} options An object of properties which determine the `Builder` to create and the chunking semantics to use.
     * @returns A function which accepts a JavaScript `Iterable` of values to
     *          write, and returns an `Iterator` that yields Vectors according
     *          to the chunking semantics defined in the `options` argument.
     * @nocollapse
     */
    static throughIterable(options) {
        return throughIterable(options);
    }
    /**
     * Transform an `AsyncIterable` of arbitrary JavaScript values into a
     * sequence of Arrow Vector<T> following the chunking semantics defined in
     * the supplied `options` argument.
     *
     * This function returns a function that accepts an `AsyncIterable` of values to
     * transform. When called, this function returns an AsyncIterator of `Vector<T>`.
     *
     * The resulting `AsyncIterator<Vector<T>>` yields Vectors based on the
     * `queueingStrategy` and `highWaterMark` specified in the `options` argument.
     *
     * * If `queueingStrategy` is `"count"` (or omitted), The `AsyncIterator<Vector<T>>`
     *   will flush the underlying `Builder` (and yield a new `Vector<T>`) once the
     *   Builder's `length` reaches or exceeds the supplied `highWaterMark`.
     * * If `queueingStrategy` is `"bytes"`, the `AsyncIterator<Vector<T>>` will flush
     *   the underlying `Builder` (and yield a new `Vector<T>`) once its `byteLength`
     *   reaches or exceeds the supplied `highWaterMark`.
     *
     * @param {IterableBuilderOptions<T, TNull>} options An object of properties which determine the `Builder` to create and the chunking semantics to use.
     * @returns A function which accepts a JavaScript `AsyncIterable` of values
     *          to write, and returns an `AsyncIterator` that yields Vectors
     *          according to the chunking semantics defined in the `options`
     *          argument.
     * @nocollapse
     */
    static throughAsyncIterable(options) {
        return throughAsyncIterable(options);
    }
    /**
     * Flush the `Builder` and return a `Vector<T>`.
     * @returns {Vector<T>} A `Vector<T>` of the flushed values.
     */
    toVector() { return vector_1.Vector.new(this.flush()); }
    get ArrayType() { return this.type.ArrayType; }
    get nullCount() { return this._nulls.numInvalid; }
    get numChildren() { return this.children.length; }
    /**
     * @returns The aggregate length (in bytes) of the values that have been written.
     */
    get byteLength() {
        let size = 0;
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        this._typeIds && (size += this._typeIds.byteLength);
        return this.children.reduce((size, child) => size + child.byteLength, size);
    }
    /**
     * @returns The aggregate number of rows that have been reserved to write new values.
     */
    get reservedLength() {
        return this._nulls.reservedLength;
    }
    /**
     * @returns The aggregate length (in bytes) that has been reserved to write new values.
     */
    get reservedByteLength() {
        let size = 0;
        this._offsets && (size += this._offsets.reservedByteLength);
        this._values && (size += this._values.reservedByteLength);
        this._nulls && (size += this._nulls.reservedByteLength);
        this._typeIds && (size += this._typeIds.reservedByteLength);
        return this.children.reduce((size, child) => size + child.reservedByteLength, size);
    }
    get valueOffsets() { return this._offsets ? this._offsets.buffer : null; }
    get values() { return this._values ? this._values.buffer : null; }
    get nullBitmap() { return this._nulls ? this._nulls.buffer : null; }
    get typeIds() { return this._typeIds ? this._typeIds.buffer : null; }
    /**
     * Appends a value (or null) to this `Builder`.
     * This is equivalent to `builder.set(builder.length, value)`.
     * @param {T['TValue'] | TNull } value The value to append.
     */
    append(value) { return this.set(this.length, value); }
    /**
     * Validates whether a value is valid (true), or null (false)
     * @param {T['TValue'] | TNull } value The value to compare against null the value representations
     */
    // @ts-ignore
    isValid(value) { return this._isValid(value); }
    /**
     * Write a value (or null-value sentinel) at the supplied index.
     * If the value matches one of the null-value representations, a 1-bit is
     * written to the null `BitmapBufferBuilder`. Otherwise, a 0 is written to
     * the null `BitmapBufferBuilder`, and the value is passed to
     * `Builder.prototype.setValue()`.
     * @param {number} index The index of the value to write.
     * @param {T['TValue'] | TNull } value The value to write at the supplied index.
     * @returns {this} The updated `Builder` instance.
     */
    set(index, value) {
        if (this.setValid(index, this.isValid(value))) {
            this.setValue(index, value);
        }
        return this;
    }
    /**
     * Write a value to the underlying buffers at the supplied index, bypassing
     * the null-value check. This is a low-level method that
     * @param {number} index
     * @param {T['TValue'] | TNull } value
     */
    // @ts-ignore
    setValue(index, value) { this._setValue(this, index, value); }
    setValid(index, valid) {
        this.length = this._nulls.set(index, +valid).length;
        return valid;
    }
    // @ts-ignore
    addChild(child, name = `${this.numChildren}`) {
        throw new Error(`Cannot append children to non-nested type "${this.type}"`);
    }
    /**
     * Retrieve the child `Builder` at the supplied `index`, or null if no child
     * exists at that index.
     * @param {number} index The index of the child `Builder` to retrieve.
     * @returns {Builder | null} The child Builder at the supplied index or null.
     */
    getChildAt(index) {
        return this.children[index] || null;
    }
    /**
     * Commit all the values that have been written to their underlying
     * ArrayBuffers, including any child Builders if applicable, and reset
     * the internal `Builder` state.
     * @returns A `Data<T>` of the buffers and childData representing the values written.
     */
    flush() {
        const buffers = [];
        const values = this._values;
        const offsets = this._offsets;
        const typeIds = this._typeIds;
        const { length, nullCount } = this;
        if (typeIds) { /* Unions */
            buffers[enum_1.BufferType.TYPE] = typeIds.flush(length);
            // DenseUnions
            offsets && (buffers[enum_1.BufferType.OFFSET] = offsets.flush(length));
        }
        else if (offsets) { /* Variable-width primitives (Binary, Utf8) and Lists */
            // Binary, Utf8
            values && (buffers[enum_1.BufferType.DATA] = values.flush(offsets.last()));
            buffers[enum_1.BufferType.OFFSET] = offsets.flush(length);
        }
        else if (values) { /* Fixed-width primitives (Int, Float, Decimal, Time, Timestamp, and Interval) */
            buffers[enum_1.BufferType.DATA] = values.flush(length);
        }
        nullCount > 0 && (buffers[enum_1.BufferType.VALIDITY] = this._nulls.flush(length));
        const data = data_1.Data.new(this.type, 0, length, nullCount, buffers, this.children.map((child) => child.flush()));
        this.clear();
        return data;
    }
    /**
     * Finalize this `Builder`, and child builders if applicable.
     * @returns {this} The finalized `Builder` instance.
     */
    finish() {
        this.finished = true;
        this.children.forEach((child) => child.finish());
        return this;
    }
    /**
     * Clear this Builder's internal state, including child Builders if applicable, and reset the length to 0.
     * @returns {this} The cleared `Builder` instance.
     */
    clear() {
        this.length = 0;
        this._offsets && (this._offsets.clear());
        this._values && (this._values.clear());
        this._nulls && (this._nulls.clear());
        this._typeIds && (this._typeIds.clear());
        this.children.forEach((child) => child.clear());
        return this;
    }
}
exports.Builder = Builder;
Builder.prototype.length = 1;
Builder.prototype.stride = 1;
Builder.prototype.children = null;
Builder.prototype.finished = false;
Builder.prototype.nullValues = null;
Builder.prototype._isValid = () => true;
/** @ignore */
class FixedWidthBuilder extends Builder {
    constructor(opts) {
        super(opts);
        this._values = new buffer_1.DataBufferBuilder(new this.ArrayType(0), this.stride);
    }
    setValue(index, value) {
        const values = this._values;
        values.reserve(index - values.length + 1);
        return super.setValue(index, value);
    }
}
exports.FixedWidthBuilder = FixedWidthBuilder;
/** @ignore */
class VariableWidthBuilder extends Builder {
    constructor(opts) {
        super(opts);
        this._pendingLength = 0;
        this._offsets = new buffer_1.OffsetsBufferBuilder();
    }
    setValue(index, value) {
        const pending = this._pending || (this._pending = new Map());
        const current = pending.get(index);
        current && (this._pendingLength -= current.length);
        this._pendingLength += value.length;
        pending.set(index, value);
    }
    setValid(index, isValid) {
        if (!super.setValid(index, isValid)) {
            (this._pending || (this._pending = new Map())).set(index, undefined);
            return false;
        }
        return true;
    }
    clear() {
        this._pendingLength = 0;
        this._pending = undefined;
        return super.clear();
    }
    flush() {
        this._flush();
        return super.flush();
    }
    finish() {
        this._flush();
        return super.finish();
    }
    _flush() {
        const pending = this._pending;
        const pendingLength = this._pendingLength;
        this._pendingLength = 0;
        this._pending = undefined;
        if (pending && pending.size > 0) {
            this._flushPending(pending, pendingLength);
        }
        return this;
    }
}
exports.VariableWidthBuilder = VariableWidthBuilder;
/** @ignore */
function throughIterable(options) {
    const { ['queueingStrategy']: queueingStrategy = 'count' } = options;
    const { ['highWaterMark']: highWaterMark = queueingStrategy !== 'bytes' ? 1000 : 2 ** 14 } = options;
    const sizeProperty = queueingStrategy !== 'bytes' ? 'length' : 'byteLength';
    return function* (source) {
        let numChunks = 0;
        let builder = Builder.new(options);
        for (const value of source) {
            if (builder.append(value)[sizeProperty] >= highWaterMark) {
                ++numChunks && (yield builder.toVector());
            }
        }
        if (builder.finish().length > 0 || numChunks === 0) {
            yield builder.toVector();
        }
    };
}
/** @ignore */
function throughAsyncIterable(options) {
    const { ['queueingStrategy']: queueingStrategy = 'count' } = options;
    const { ['highWaterMark']: highWaterMark = queueingStrategy !== 'bytes' ? 1000 : 2 ** 14 } = options;
    const sizeProperty = queueingStrategy !== 'bytes' ? 'length' : 'byteLength';
    return async function* (source) {
        let numChunks = 0;
        let builder = Builder.new(options);
        for await (const value of source) {
            if (builder.append(value)[sizeProperty] >= highWaterMark) {
                ++numChunks && (yield builder.toVector());
            }
        }
        if (builder.finish().length > 0 || numChunks === 0) {
            yield builder.toVector();
        }
    };
}



},{"./vector":"node_modules/apache-arrow/vector.js","./enum":"node_modules/apache-arrow/enum.js","./data":"node_modules/apache-arrow/data.js","./builder/valid":"node_modules/apache-arrow/builder/valid.js","./builder/buffer":"node_modules/apache-arrow/builder/buffer.js","./type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/builder/bool.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("./buffer");
const builder_1 = require("../builder");
/** @ignore */
class BoolBuilder extends builder_1.Builder {
    constructor(options) {
        super(options);
        this._values = new buffer_1.BitmapBufferBuilder();
    }
    setValue(index, value) {
        this._values.set(index, +value);
    }
}
exports.BoolBuilder = BoolBuilder;



},{"./buffer":"node_modules/apache-arrow/builder/buffer.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/null.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class NullBuilder extends builder_1.Builder {
    // @ts-ignore
    setValue(index, value) { }
    setValid(index, valid) {
        this.length = Math.max(index + 1, this.length);
        return valid;
    }
}
exports.NullBuilder = NullBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/date.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class DateBuilder extends builder_1.FixedWidthBuilder {
}
exports.DateBuilder = DateBuilder;
/** @ignore */
class DateDayBuilder extends DateBuilder {
}
exports.DateDayBuilder = DateDayBuilder;
/** @ignore */
class DateMillisecondBuilder extends DateBuilder {
}
exports.DateMillisecondBuilder = DateMillisecondBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/decimal.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class DecimalBuilder extends builder_1.FixedWidthBuilder {
}
exports.DecimalBuilder = DecimalBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/dictionary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
const builder_1 = require("../builder");
/** @ignore */
class DictionaryBuilder extends builder_1.Builder {
    constructor({ 'type': type, 'nullValues': nulls, 'dictionaryHashFunction': hashFn }) {
        super({ type: new type_1.Dictionary(type.dictionary, type.indices, type.id, type.isOrdered) });
        this._nulls = null;
        this._dictionaryOffset = 0;
        this._keysToIndices = Object.create(null);
        this.indices = builder_1.Builder.new({ 'type': this.type.indices, 'nullValues': nulls });
        this.dictionary = builder_1.Builder.new({ 'type': this.type.dictionary, 'nullValues': null });
        if (typeof hashFn === 'function') {
            this.valueToKey = hashFn;
        }
    }
    get values() { return this.indices.values; }
    get nullCount() { return this.indices.nullCount; }
    get nullBitmap() { return this.indices.nullBitmap; }
    get byteLength() { return this.indices.byteLength + this.dictionary.byteLength; }
    get reservedLength() { return this.indices.reservedLength + this.dictionary.reservedLength; }
    get reservedByteLength() { return this.indices.reservedByteLength + this.dictionary.reservedByteLength; }
    isValid(value) { return this.indices.isValid(value); }
    setValid(index, valid) {
        const indices = this.indices;
        valid = indices.setValid(index, valid);
        this.length = indices.length;
        return valid;
    }
    setValue(index, value) {
        let keysToIndices = this._keysToIndices;
        let key = this.valueToKey(value);
        let idx = keysToIndices[key];
        if (idx === undefined) {
            keysToIndices[key] = idx = this._dictionaryOffset + this.dictionary.append(value).length - 1;
        }
        return this.indices.setValue(index, idx);
    }
    flush() {
        const type = this.type;
        const prev = this._dictionary;
        const curr = this.dictionary.toVector();
        const data = this.indices.flush().clone(type);
        data.dictionary = prev ? prev.concat(curr) : curr;
        this.finished || (this._dictionaryOffset += curr.length);
        this._dictionary = data.dictionary;
        this.clear();
        return data;
    }
    finish() {
        this.indices.finish();
        this.dictionary.finish();
        this._dictionaryOffset = 0;
        this._keysToIndices = Object.create(null);
        return super.finish();
    }
    clear() {
        this.indices.clear();
        this.dictionary.clear();
        return super.clear();
    }
    valueToKey(val) {
        return typeof val === 'string' ? val : `${val}`;
    }
}
exports.DictionaryBuilder = DictionaryBuilder;



},{"../type":"node_modules/apache-arrow/type.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/fixedsizebinary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class FixedSizeBinaryBuilder extends builder_1.FixedWidthBuilder {
}
exports.FixedSizeBinaryBuilder = FixedSizeBinaryBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/util/math.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const f64 = new Float64Array(1);
const u32 = new Uint32Array(f64.buffer);
/**
 * Convert uint16 (logically a float16) to a JS float64. Inspired by numpy's `npy_half_to_double`:
 * https://github.com/numpy/numpy/blob/5a5987291dc95376bb098be8d8e5391e89e77a2c/numpy/core/src/npymath/halffloat.c#L29
 * @param h {number} the uint16 to convert
 * @private
 * @ignore
 */
function uint16ToFloat64(h) {
    let expo = (h & 0x7C00) >> 10;
    let sigf = (h & 0x03FF) / 1024;
    let sign = (-1) ** ((h & 0x8000) >> 15);
    switch (expo) {
        case 0x1F: return sign * (sigf ? NaN : 1 / 0);
        case 0x00: return sign * (sigf ? 6.103515625e-5 * sigf : 0);
    }
    return sign * (2 ** (expo - 15)) * (1 + sigf);
}
exports.uint16ToFloat64 = uint16ToFloat64;
/**
 * Convert a float64 to uint16 (assuming the float64 is logically a float16). Inspired by numpy's `npy_double_to_half`:
 * https://github.com/numpy/numpy/blob/5a5987291dc95376bb098be8d8e5391e89e77a2c/numpy/core/src/npymath/halffloat.c#L43
 * @param d {number} The float64 to convert
 * @private
 * @ignore
 */
function float64ToUint16(d) {
    if (d !== d) {
        return 0x7E00;
    } // NaN
    f64[0] = d;
    // Magic numbers:
    // 0x80000000 = 10000000 00000000 00000000 00000000 -- masks the 32nd bit
    // 0x7ff00000 = 01111111 11110000 00000000 00000000 -- masks the 21st-31st bits
    // 0x000fffff = 00000000 00001111 11111111 11111111 -- masks the 1st-20th bit
    let sign = (u32[1] & 0x80000000) >> 16 & 0xFFFF;
    let expo = (u32[1] & 0x7ff00000), sigf = 0x0000;
    if (expo >= 0x40f00000) {
        //
        // If exponent overflowed, the float16 is either NaN or Infinity.
        // Rules to propagate the sign bit: mantissa > 0 ? NaN : +/-Infinity
        //
        // Magic numbers:
        // 0x40F00000 = 01000000 11110000 00000000 00000000 -- 6-bit exponent overflow
        // 0x7C000000 = 01111100 00000000 00000000 00000000 -- masks the 27th-31st bits
        //
        // returns:
        // qNaN, aka 32256 decimal, 0x7E00 hex, or 01111110 00000000 binary
        // sNaN, aka 32000 decimal, 0x7D00 hex, or 01111101 00000000 binary
        // +inf, aka 31744 decimal, 0x7C00 hex, or 01111100 00000000 binary
        // -inf, aka 64512 decimal, 0xFC00 hex, or 11111100 00000000 binary
        //
        // If mantissa is greater than 23 bits, set to +Infinity like numpy
        if (u32[0] > 0) {
            expo = 0x7C00;
        }
        else {
            expo = (expo & 0x7C000000) >> 16;
            sigf = (u32[1] & 0x000fffff) >> 10;
        }
    }
    else if (expo <= 0x3f000000) {
        //
        // If exponent underflowed, the float is either signed zero or subnormal.
        //
        // Magic numbers:
        // 0x3F000000 = 00111111 00000000 00000000 00000000 -- 6-bit exponent underflow
        //
        sigf = 0x100000 + (u32[1] & 0x000fffff);
        sigf = 0x100000 + (sigf << ((expo >> 20) - 998)) >> 21;
        expo = 0;
    }
    else {
        //
        // No overflow or underflow, rebase the exponent and round the mantissa
        // Magic numbers:
        // 0x200 = 00000010 00000000 -- masks off the 10th bit
        //
        // Ensure the first mantissa bit (the 10th one) is 1 and round
        expo = (expo - 0x3f000000) >> 10;
        sigf = ((u32[1] & 0x000fffff) + 0x200) >> 10;
    }
    return sign | expo | sigf & 0xFFFF;
}
exports.float64ToUint16 = float64ToUint16;



},{}],"node_modules/apache-arrow/builder/float.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../util/math");
const builder_1 = require("../builder");
/** @ignore */
class FloatBuilder extends builder_1.FixedWidthBuilder {
}
exports.FloatBuilder = FloatBuilder;
/** @ignore */
class Float16Builder extends FloatBuilder {
    setValue(index, value) {
        // convert JS float64 to a uint16
        this._values.set(index, math_1.float64ToUint16(value));
    }
}
exports.Float16Builder = Float16Builder;
/** @ignore */
class Float32Builder extends FloatBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}
exports.Float32Builder = Float32Builder;
/** @ignore */
class Float64Builder extends FloatBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}
exports.Float64Builder = Float64Builder;



},{"../util/math":"node_modules/apache-arrow/util/math.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/util/bn.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("./buffer");
const compat_1 = require("./compat");
/** @ignore */
exports.isArrowBigNumSymbol = Symbol.for('isArrowBigNum');
/** @ignore */
function BigNum(x, ...xs) {
    if (xs.length === 0) {
        return Object.setPrototypeOf(buffer_1.toArrayBufferView(this['TypedArray'], x), this.constructor.prototype);
    }
    return Object.setPrototypeOf(new this['TypedArray'](x, ...xs), this.constructor.prototype);
}
BigNum.prototype[exports.isArrowBigNumSymbol] = true;
BigNum.prototype.toJSON = function () { return `"${exports.bignumToString(this)}"`; };
BigNum.prototype.valueOf = function () { return bignumToNumber(this); };
BigNum.prototype.toString = function () { return exports.bignumToString(this); };
BigNum.prototype[Symbol.toPrimitive] = function (hint = 'default') {
    switch (hint) {
        case 'number': return bignumToNumber(this);
        case 'string': return exports.bignumToString(this);
        case 'default': return exports.bignumToBigInt(this);
    }
    return exports.bignumToString(this);
};
/** @ignore */
function SignedBigNum(...args) { return BigNum.apply(this, args); }
/** @ignore */
function UnsignedBigNum(...args) { return BigNum.apply(this, args); }
/** @ignore */
function DecimalBigNum(...args) { return BigNum.apply(this, args); }
Object.setPrototypeOf(SignedBigNum.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(UnsignedBigNum.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(DecimalBigNum.prototype, Object.create(Uint32Array.prototype));
Object.assign(SignedBigNum.prototype, BigNum.prototype, { 'constructor': SignedBigNum, 'signed': true, 'TypedArray': Int32Array, 'BigIntArray': compat_1.BigInt64Array });
Object.assign(UnsignedBigNum.prototype, BigNum.prototype, { 'constructor': UnsignedBigNum, 'signed': false, 'TypedArray': Uint32Array, 'BigIntArray': compat_1.BigUint64Array });
Object.assign(DecimalBigNum.prototype, BigNum.prototype, { 'constructor': DecimalBigNum, 'signed': true, 'TypedArray': Uint32Array, 'BigIntArray': compat_1.BigUint64Array });
/** @ignore */
function bignumToNumber(bn) {
    let { buffer, byteOffset, length, 'signed': signed } = bn;
    let words = new Int32Array(buffer, byteOffset, length);
    let number = 0, i = 0, n = words.length, hi, lo;
    while (i < n) {
        lo = words[i++];
        hi = words[i++];
        signed || (hi = hi >>> 0);
        number += (lo >>> 0) + (hi * (i ** 32));
    }
    return number;
}
if (!compat_1.BigIntAvailable) {
    exports.bignumToString = decimalToString;
    exports.bignumToBigInt = exports.bignumToString;
}
else {
    exports.bignumToBigInt = ((a) => a.byteLength === 8 ? new a['BigIntArray'](a.buffer, a.byteOffset, 1)[0] : decimalToString(a));
    exports.bignumToString = ((a) => a.byteLength === 8 ? `${new a['BigIntArray'](a.buffer, a.byteOffset, 1)[0]}` : decimalToString(a));
}
/** @ignore */
function decimalToString(a) {
    let digits = '';
    let base64 = new Uint32Array(2);
    let base32 = new Uint16Array(a.buffer, a.byteOffset, a.byteLength / 2);
    let checks = new Uint32Array((base32 = new Uint16Array(base32).reverse()).buffer);
    let i = -1, n = base32.length - 1;
    do {
        for (base64[0] = base32[i = 0]; i < n;) {
            base32[i++] = base64[1] = base64[0] / 10;
            base64[0] = ((base64[0] - base64[1] * 10) << 16) + base32[i];
        }
        base32[i] = base64[1] = base64[0] / 10;
        base64[0] = base64[0] - base64[1] * 10;
        digits = `${base64[0]}${digits}`;
    } while (checks[0] || checks[1] || checks[2] || checks[3]);
    return digits ? digits : `0`;
}
/** @ignore */
class BN {
    constructor(num, isSigned) {
        return BN.new(num, isSigned);
    }
    /** @nocollapse */
    static new(num, isSigned) {
        switch (isSigned) {
            case true: return new SignedBigNum(num);
            case false: return new UnsignedBigNum(num);
        }
        switch (num.constructor) {
            case Int8Array:
            case Int16Array:
            case Int32Array:
            case compat_1.BigInt64Array:
                return new SignedBigNum(num);
        }
        if (num.byteLength === 16) {
            return new DecimalBigNum(num);
        }
        return new UnsignedBigNum(num);
    }
    /** @nocollapse */
    static signed(num) {
        return new SignedBigNum(num);
    }
    /** @nocollapse */
    static unsigned(num) {
        return new UnsignedBigNum(num);
    }
    /** @nocollapse */
    static decimal(num) {
        return new DecimalBigNum(num);
    }
}
exports.BN = BN;



},{"./buffer":"node_modules/apache-arrow/util/buffer.js","./compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/builder/int.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const bn_1 = require("../util/bn");
const buffer_1 = require("./buffer");
const compat_1 = require("../util/compat");
const builder_1 = require("../builder");
/** @ignore */
class IntBuilder extends builder_1.FixedWidthBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}
exports.IntBuilder = IntBuilder;
/** @ignore */
class Int8Builder extends IntBuilder {
}
exports.Int8Builder = Int8Builder;
/** @ignore */
class Int16Builder extends IntBuilder {
}
exports.Int16Builder = Int16Builder;
/** @ignore */
class Int32Builder extends IntBuilder {
}
exports.Int32Builder = Int32Builder;
/** @ignore */
class Int64Builder extends IntBuilder {
    constructor(options) {
        if (options['nullValues']) {
            options['nullValues'] = options['nullValues'].map(toBigInt);
        }
        super(options);
        this._values = new buffer_1.WideBufferBuilder(new Int32Array(0), 2);
    }
    get values64() { return this._values.buffer64; }
    isValid(value) { return super.isValid(toBigInt(value)); }
}
exports.Int64Builder = Int64Builder;
/** @ignore */
class Uint8Builder extends IntBuilder {
}
exports.Uint8Builder = Uint8Builder;
/** @ignore */
class Uint16Builder extends IntBuilder {
}
exports.Uint16Builder = Uint16Builder;
/** @ignore */
class Uint32Builder extends IntBuilder {
}
exports.Uint32Builder = Uint32Builder;
/** @ignore */
class Uint64Builder extends IntBuilder {
    constructor(options) {
        if (options['nullValues']) {
            options['nullValues'] = options['nullValues'].map(toBigInt);
        }
        super(options);
        this._values = new buffer_1.WideBufferBuilder(new Uint32Array(0), 2);
    }
    get values64() { return this._values.buffer64; }
    isValid(value) { return super.isValid(toBigInt(value)); }
}
exports.Uint64Builder = Uint64Builder;
const toBigInt = ((memo) => (value) => {
    if (ArrayBuffer.isView(value)) {
        memo.buffer = value.buffer;
        memo.byteOffset = value.byteOffset;
        memo.byteLength = value.byteLength;
        value = bn_1.bignumToBigInt(memo);
        memo.buffer = null;
    }
    return value;
})({ 'BigIntArray': compat_1.BigInt64Array });



},{"../util/bn":"node_modules/apache-arrow/util/bn.js","./buffer":"node_modules/apache-arrow/builder/buffer.js","../util/compat":"node_modules/apache-arrow/util/compat.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/time.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class TimeBuilder extends builder_1.FixedWidthBuilder {
}
exports.TimeBuilder = TimeBuilder;
/** @ignore */
class TimeSecondBuilder extends TimeBuilder {
}
exports.TimeSecondBuilder = TimeSecondBuilder;
/** @ignore */
class TimeMillisecondBuilder extends TimeBuilder {
}
exports.TimeMillisecondBuilder = TimeMillisecondBuilder;
/** @ignore */
class TimeMicrosecondBuilder extends TimeBuilder {
}
exports.TimeMicrosecondBuilder = TimeMicrosecondBuilder;
/** @ignore */
class TimeNanosecondBuilder extends TimeBuilder {
}
exports.TimeNanosecondBuilder = TimeNanosecondBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/timestamp.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class TimestampBuilder extends builder_1.FixedWidthBuilder {
}
exports.TimestampBuilder = TimestampBuilder;
/** @ignore */
class TimestampSecondBuilder extends TimestampBuilder {
}
exports.TimestampSecondBuilder = TimestampSecondBuilder;
/** @ignore */
class TimestampMillisecondBuilder extends TimestampBuilder {
}
exports.TimestampMillisecondBuilder = TimestampMillisecondBuilder;
/** @ignore */
class TimestampMicrosecondBuilder extends TimestampBuilder {
}
exports.TimestampMicrosecondBuilder = TimestampMicrosecondBuilder;
/** @ignore */
class TimestampNanosecondBuilder extends TimestampBuilder {
}
exports.TimestampNanosecondBuilder = TimestampNanosecondBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/interval.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
/** @ignore */
class IntervalBuilder extends builder_1.FixedWidthBuilder {
}
exports.IntervalBuilder = IntervalBuilder;
/** @ignore */
class IntervalDayTimeBuilder extends IntervalBuilder {
}
exports.IntervalDayTimeBuilder = IntervalDayTimeBuilder;
/** @ignore */
class IntervalYearMonthBuilder extends IntervalBuilder {
}
exports.IntervalYearMonthBuilder = IntervalYearMonthBuilder;



},{"../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/binary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../util/buffer");
const buffer_2 = require("./buffer");
const builder_1 = require("../builder");
/** @ignore */
class BinaryBuilder extends builder_1.VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._values = new buffer_2.BufferBuilder(new Uint8Array(0));
    }
    get byteLength() {
        let size = this._pendingLength + (this.length * 4);
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        return size;
    }
    setValue(index, value) {
        return super.setValue(index, buffer_1.toUint8Array(value));
    }
    _flushPending(pending, pendingLength) {
        const offsets = this._offsets;
        const data = this._values.reserve(pendingLength).buffer;
        let index = 0, length = 0, offset = 0, value;
        for ([index, value] of pending) {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                length = value.length;
                data.set(value, offset);
                offsets.set(index, length);
                offset += length;
            }
        }
    }
}
exports.BinaryBuilder = BinaryBuilder;



},{"../util/buffer":"node_modules/apache-arrow/util/buffer.js","./buffer":"node_modules/apache-arrow/builder/buffer.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/utf8.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../util/utf8");
const binary_1 = require("./binary");
const buffer_1 = require("./buffer");
const builder_1 = require("../builder");
/** @ignore */
class Utf8Builder extends builder_1.VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._values = new buffer_1.BufferBuilder(new Uint8Array(0));
    }
    get byteLength() {
        let size = this._pendingLength + (this.length * 4);
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        return size;
    }
    setValue(index, value) {
        return super.setValue(index, utf8_1.encodeUtf8(value));
    }
    // @ts-ignore
    _flushPending(pending, pendingLength) { }
}
exports.Utf8Builder = Utf8Builder;
Utf8Builder.prototype._flushPending = binary_1.BinaryBuilder.prototype._flushPending;



},{"../util/utf8":"node_modules/apache-arrow/util/utf8.js","./binary":"node_modules/apache-arrow/builder/binary.js","./buffer":"node_modules/apache-arrow/builder/buffer.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/run.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
/** @ignore */
class Run {
    get length() { return this._values.length; }
    get(index) { return this._values[index]; }
    clear() { this._values = null; return this; }
    bind(values) {
        if (values instanceof vector_1.Vector) {
            return values;
        }
        this._values = values;
        return this;
    }
}
exports.Run = Run;



},{"../vector":"node_modules/apache-arrow/vector.js"}],"node_modules/apache-arrow/vector/row.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const pretty_1 = require("../util/pretty");
/** @ignore */ const kParent = Symbol.for('parent');
/** @ignore */ const kRowIndex = Symbol.for('rowIndex');
/** @ignore */ const kKeyToIdx = Symbol.for('keyToIdx');
/** @ignore */ const kIdxToVal = Symbol.for('idxToVal');
/** @ignore */ const kCustomInspect = Symbol.for('nodejs.util.inspect.custom');
class Row {
    constructor(parent, numKeys) {
        this[kParent] = parent;
        this.size = numKeys;
    }
    entries() { return this[Symbol.iterator](); }
    has(key) { return this.get(key) !== undefined; }
    get(key) {
        let val = undefined;
        if (key !== null && key !== undefined) {
            const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
            let idx = ktoi.get(key);
            if (idx !== undefined) {
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                ((val = itov[idx]) !== undefined) || (itov[idx] = val = this.getValue(idx));
            }
            else if ((idx = this.getIndex(key)) > -1) {
                ktoi.set(key, idx);
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                ((val = itov[idx]) !== undefined) || (itov[idx] = val = this.getValue(idx));
            }
        }
        return val;
    }
    set(key, val) {
        if (key !== null && key !== undefined) {
            const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
            let idx = ktoi.get(key);
            if (idx === undefined) {
                ktoi.set(key, idx = this.getIndex(key));
            }
            if (idx > -1) {
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                itov[idx] = this.setValue(idx, val);
            }
        }
        return this;
    }
    clear() { throw new Error(`Clearing ${this[Symbol.toStringTag]} not supported.`); }
    delete(_) { throw new Error(`Deleting ${this[Symbol.toStringTag]} values not supported.`); }
    *[Symbol.iterator]() {
        const ki = this.keys();
        const vi = this.values();
        const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
        const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
        for (let k, v, i = 0, kr, vr; !((kr = ki.next()).done || (vr = vi.next()).done); ++i) {
            k = kr.value;
            v = vr.value;
            itov[i] = v;
            ktoi.has(k) || ktoi.set(k, i);
            yield [k, v];
        }
    }
    forEach(callbackfn, thisArg) {
        const ki = this.keys();
        const vi = this.values();
        const callback = thisArg === undefined ? callbackfn :
            (v, k, m) => callbackfn.call(thisArg, v, k, m);
        const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
        const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
        for (let k, v, i = 0, kr, vr; !((kr = ki.next()).done || (vr = vi.next()).done); ++i) {
            k = kr.value;
            v = vr.value;
            itov[i] = v;
            ktoi.has(k) || ktoi.set(k, i);
            callback(v, k, this);
        }
    }
    toArray() { return [...this.values()]; }
    toJSON() {
        const obj = {};
        this.forEach((val, key) => obj[key] = val);
        return obj;
    }
    inspect() { return this.toString(); }
    [kCustomInspect]() { return this.toString(); }
    toString() {
        const str = [];
        this.forEach((val, key) => {
            key = pretty_1.valueToString(key);
            val = pretty_1.valueToString(val);
            str.push(`${key}: ${val}`);
        });
        return `{ ${str.join(', ')} }`;
    }
}
Row[Symbol.toStringTag] = ((proto) => {
    Object.defineProperties(proto, {
        'size': { writable: true, enumerable: false, configurable: false, value: 0 },
        [kParent]: { writable: true, enumerable: false, configurable: false, value: null },
        [kRowIndex]: { writable: true, enumerable: false, configurable: false, value: -1 },
    });
    return proto[Symbol.toStringTag] = 'Row';
})(Row.prototype);
class MapRow extends Row {
    constructor(slice) {
        super(slice, slice.length);
        return createRowProxy(this);
    }
    keys() {
        return this[kParent].getChildAt(0)[Symbol.iterator]();
    }
    values() {
        return this[kParent].getChildAt(1)[Symbol.iterator]();
    }
    getKey(idx) {
        return this[kParent].getChildAt(0).get(idx);
    }
    getIndex(key) {
        return this[kParent].getChildAt(0).indexOf(key);
    }
    getValue(index) {
        return this[kParent].getChildAt(1).get(index);
    }
    setValue(index, value) {
        this[kParent].getChildAt(1).set(index, value);
    }
}
exports.MapRow = MapRow;
class StructRow extends Row {
    constructor(parent) {
        super(parent, parent.type.children.length);
        return defineRowProxyProperties(this);
    }
    *keys() {
        for (const field of this[kParent].type.children) {
            yield field.name;
        }
    }
    *values() {
        for (const field of this[kParent].type.children) {
            yield this[field.name];
        }
    }
    getKey(idx) {
        return this[kParent].type.children[idx].name;
    }
    getIndex(key) {
        return this[kParent].type.children.findIndex((f) => f.name === key);
    }
    getValue(index) {
        return this[kParent].getChildAt(index).get(this[kRowIndex]);
    }
    setValue(index, value) {
        return this[kParent].getChildAt(index).set(this[kRowIndex], value);
    }
}
exports.StructRow = StructRow;
Object.setPrototypeOf(Row.prototype, Map.prototype);
/** @ignore */
const defineRowProxyProperties = (() => {
    const desc = { enumerable: true, configurable: false, get: null, set: null };
    return (row) => {
        let idx = -1, ktoi = row[kKeyToIdx] || (row[kKeyToIdx] = new Map());
        const getter = (key) => function () { return this.get(key); };
        const setter = (key) => function (val) { return this.set(key, val); };
        for (const key of row.keys()) {
            ktoi.set(key, ++idx);
            desc.get = getter(key);
            desc.set = setter(key);
            row.hasOwnProperty(key) || (desc.enumerable = true, Object.defineProperty(row, key, desc));
            row.hasOwnProperty(idx) || (desc.enumerable = false, Object.defineProperty(row, idx, desc));
        }
        desc.get = desc.set = null;
        return row;
    };
})();
/** @ignore */
const createRowProxy = (() => {
    if (typeof Proxy === 'undefined') {
        return defineRowProxyProperties;
    }
    const has = Row.prototype.has;
    const get = Row.prototype.get;
    const set = Row.prototype.set;
    const getKey = Row.prototype.getKey;
    const RowProxyHandler = {
        isExtensible() { return false; },
        deleteProperty() { return false; },
        preventExtensions() { return true; },
        ownKeys(row) { return [...row.keys()].map((x) => `${x}`); },
        has(row, key) {
            switch (key) {
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                case kParent:
                case kRowIndex:
                case kIdxToVal:
                case kKeyToIdx:
                case kCustomInspect:
                    return true;
            }
            if (typeof key === 'number' && !row.has(key)) {
                key = row.getKey(key);
            }
            return row.has(key);
        },
        get(row, key, receiver) {
            switch (key) {
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                case kParent:
                case kRowIndex:
                case kIdxToVal:
                case kKeyToIdx:
                case kCustomInspect:
                    return Reflect.get(row, key, receiver);
            }
            if (typeof key === 'number' && !has.call(receiver, key)) {
                key = getKey.call(receiver, key);
            }
            return get.call(receiver, key);
        },
        set(row, key, val, receiver) {
            switch (key) {
                case kParent:
                case kRowIndex:
                case kIdxToVal:
                case kKeyToIdx:
                    return Reflect.set(row, key, val, receiver);
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                    return false;
            }
            if (typeof key === 'number' && !has.call(receiver, key)) {
                key = getKey.call(receiver, key);
            }
            return has.call(receiver, key) ? !!set.call(receiver, key, val) : false;
        },
    };
    return (row) => new Proxy(row, RowProxyHandler);
})();



},{"../util/pretty":"node_modules/apache-arrow/util/pretty.js"}],"node_modules/apache-arrow/util/vector.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const row_1 = require("../vector/row");
const buffer_1 = require("../util/buffer");
const compat_1 = require("./compat");
/** @ignore */
function clampIndex(source, index, then) {
    const length = source.length;
    const adjust = index > -1 ? index : (length + (index % length));
    return then ? then(source, adjust) : adjust;
}
exports.clampIndex = clampIndex;
/** @ignore */
let tmp;
/** @ignore */
function clampRange(source, begin, end, then) {
    // Adjust args similar to Array.prototype.slice. Normalize begin/end to
    // clamp between 0 and length, and wrap around on negative indices, e.g.
    // slice(-1, 5) or slice(5, -1)
    let { length: len = 0 } = source;
    let lhs = typeof begin !== 'number' ? 0 : begin;
    let rhs = typeof end !== 'number' ? len : end;
    // wrap around on negative start/end positions
    (lhs < 0) && (lhs = ((lhs % len) + len) % len);
    (rhs < 0) && (rhs = ((rhs % len) + len) % len);
    // ensure lhs <= rhs
    (rhs < lhs) && (tmp = lhs, lhs = rhs, rhs = tmp);
    // ensure rhs <= length
    (rhs > len) && (rhs = len);
    return then ? then(source, lhs, rhs) : [lhs, rhs];
}
exports.clampRange = clampRange;
const big0 = compat_1.BigIntAvailable ? compat_1.BigInt(0) : 0;
const isNaNFast = (value) => value !== value;
/** @ignore */
function createElementComparator(search) {
    let typeofSearch = typeof search;
    // Compare primitives
    if (typeofSearch !== 'object' || search === null) {
        // Compare NaN
        if (isNaNFast(search)) {
            return isNaNFast;
        }
        return typeofSearch !== 'bigint'
            ? (value) => value === search
            : (value) => (big0 + value) === search;
    }
    // Compare Dates
    if (search instanceof Date) {
        const valueOfSearch = search.valueOf();
        return (value) => value instanceof Date ? (value.valueOf() === valueOfSearch) : false;
    }
    // Compare TypedArrays
    if (ArrayBuffer.isView(search)) {
        return (value) => value ? buffer_1.compareArrayLike(search, value) : false;
    }
    // Compare Maps and Rows
    if (search instanceof Map) {
        return creatMapComparator(search);
    }
    // Compare Array-likes
    if (Array.isArray(search)) {
        return createArrayLikeComparator(search);
    }
    // Compare Vectors
    if (search instanceof vector_1.Vector) {
        return createVectorComparator(search);
    }
    // Compare non-empty Objects
    return createObjectComparator(search);
}
exports.createElementComparator = createElementComparator;
/** @ignore */
function createArrayLikeComparator(lhs) {
    const comparators = [];
    for (let i = -1, n = lhs.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs[i]);
    }
    return createSubElementsComparator(comparators);
}
/** @ignore */
function creatMapComparator(lhs) {
    let i = -1;
    const comparators = [];
    lhs.forEach((v) => comparators[++i] = createElementComparator(v));
    return createSubElementsComparator(comparators);
}
/** @ignore */
function createVectorComparator(lhs) {
    const comparators = [];
    for (let i = -1, n = lhs.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs.get(i));
    }
    return createSubElementsComparator(comparators);
}
/** @ignore */
function createObjectComparator(lhs) {
    const keys = Object.keys(lhs);
    // Only compare non-empty Objects
    if (keys.length === 0) {
        return () => false;
    }
    const comparators = [];
    for (let i = -1, n = keys.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs[keys[i]]);
    }
    return createSubElementsComparator(comparators, keys);
}
function createSubElementsComparator(comparators, keys) {
    return (rhs) => {
        if (!rhs || typeof rhs !== 'object') {
            return false;
        }
        switch (rhs.constructor) {
            case Array: return compareArray(comparators, rhs);
            case Map:
            case row_1.MapRow:
            case row_1.StructRow:
                return compareObject(comparators, rhs, rhs.keys());
            case Object:
            case undefined: // support `Object.create(null)` objects
                return compareObject(comparators, rhs, keys || Object.keys(rhs));
        }
        return rhs instanceof vector_1.Vector ? compareVector(comparators, rhs) : false;
    };
}
function compareArray(comparators, arr) {
    const n = comparators.length;
    if (arr.length !== n) {
        return false;
    }
    for (let i = -1; ++i < n;) {
        if (!(comparators[i](arr[i]))) {
            return false;
        }
    }
    return true;
}
function compareVector(comparators, vec) {
    const n = comparators.length;
    if (vec.length !== n) {
        return false;
    }
    for (let i = -1; ++i < n;) {
        if (!(comparators[i](vec.get(i)))) {
            return false;
        }
    }
    return true;
}
function compareObject(comparators, obj, keys) {
    const lKeyItr = keys[Symbol.iterator]();
    const rKeyItr = obj instanceof Map ? obj.keys() : Object.keys(obj)[Symbol.iterator]();
    const rValItr = obj instanceof Map ? obj.values() : Object.values(obj)[Symbol.iterator]();
    let i = 0;
    let n = comparators.length;
    let rVal = rValItr.next();
    let lKey = lKeyItr.next();
    let rKey = rKeyItr.next();
    for (; i < n && !lKey.done && !rKey.done && !rVal.done; ++i, lKey = lKeyItr.next(), rKey = rKeyItr.next(), rVal = rValItr.next()) {
        if (lKey.value !== rKey.value || !comparators[i](rVal.value)) {
            break;
        }
    }
    if (i === n && lKey.done && rKey.done && rVal.done) {
        return true;
    }
    lKeyItr.return && lKeyItr.return();
    rKeyItr.return && rKeyItr.return();
    rValItr.return && rValItr.return();
    return false;
}



},{"../vector":"node_modules/apache-arrow/vector.js","../vector/row":"node_modules/apache-arrow/vector/row.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","./compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/vector/chunked.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../util/vector");
const type_1 = require("../type");
const args_1 = require("../util/args");
const vector_2 = require("../vector");
/** @ignore */
class Chunked extends vector_2.AbstractVector {
    constructor(type, chunks = [], offsets = calculateOffsets(chunks)) {
        super();
        this._nullCount = -1;
        this._type = type;
        this._chunks = chunks;
        this._chunkOffsets = offsets;
        this._length = offsets[offsets.length - 1];
        this._numChildren = (this._type.children || []).length;
    }
    /** @nocollapse */
    static flatten(...vectors) {
        return args_1.selectChunkArgs(vector_2.Vector, vectors);
    }
    /** @nocollapse */
    static concat(...vectors) {
        const chunks = Chunked.flatten(...vectors);
        return new Chunked(chunks[0].type, chunks);
    }
    get type() { return this._type; }
    get length() { return this._length; }
    get chunks() { return this._chunks; }
    get typeId() { return this._type.typeId; }
    get VectorName() { return `Chunked<${this._type}>`; }
    get data() {
        return this._chunks[0] ? this._chunks[0].data : null;
    }
    get ArrayType() { return this._type.ArrayType; }
    get numChildren() { return this._numChildren; }
    get stride() { return this._chunks[0] ? this._chunks[0].stride : 1; }
    get byteLength() {
        return this._chunks.reduce((byteLength, chunk) => byteLength + chunk.byteLength, 0);
    }
    get nullCount() {
        let nullCount = this._nullCount;
        if (nullCount < 0) {
            this._nullCount = nullCount = this._chunks.reduce((x, { nullCount }) => x + nullCount, 0);
        }
        return nullCount;
    }
    get indices() {
        if (type_1.DataType.isDictionary(this._type)) {
            if (!this._indices) {
                const chunks = this._chunks;
                this._indices = (chunks.length === 1
                    ? chunks[0].indices
                    : Chunked.concat(...chunks.map((x) => x.indices)));
            }
            return this._indices;
        }
        return null;
    }
    get dictionary() {
        if (type_1.DataType.isDictionary(this._type)) {
            return this._chunks[this._chunks.length - 1].data.dictionary;
        }
        return null;
    }
    *[Symbol.iterator]() {
        for (const chunk of this._chunks) {
            yield* chunk;
        }
    }
    clone(chunks = this._chunks) {
        return new Chunked(this._type, chunks);
    }
    concat(...others) {
        return this.clone(Chunked.flatten(this, ...others));
    }
    slice(begin, end) {
        return vector_1.clampRange(this, begin, end, this._sliceInternal);
    }
    getChildAt(index) {
        if (index < 0 || index >= this._numChildren) {
            return null;
        }
        let columns = this._children || (this._children = []);
        let child, field, chunks;
        if (child = columns[index]) {
            return child;
        }
        if (field = (this._type.children || [])[index]) {
            chunks = this._chunks
                .map((vector) => vector.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new Chunked(field.type, chunks));
            }
        }
        return null;
    }
    search(index, then) {
        let idx = index;
        // binary search to find the child vector and value indices
        let offsets = this._chunkOffsets, rhs = offsets.length - 1;
        // return early if out of bounds, or if there's just one child
        if (idx < 0) {
            return null;
        }
        if (idx >= offsets[rhs]) {
            return null;
        }
        if (rhs <= 1) {
            return then ? then(this, 0, idx) : [0, idx];
        }
        let lhs = 0, pos = 0, mid = 0;
        do {
            if (lhs + 1 === rhs) {
                return then ? then(this, lhs, idx - pos) : [lhs, idx - pos];
            }
            mid = lhs + ((rhs - lhs) / 2) | 0;
            idx >= offsets[mid] ? (lhs = mid) : (rhs = mid);
        } while (idx < offsets[rhs] && idx >= (pos = offsets[lhs]));
        return null;
    }
    isValid(index) {
        return !!this.search(index, this.isValidInternal);
    }
    get(index) {
        return this.search(index, this.getInternal);
    }
    set(index, value) {
        this.search(index, ({ chunks }, i, j) => chunks[i].set(j, value));
    }
    indexOf(element, offset) {
        if (offset && typeof offset === 'number') {
            return this.search(offset, (self, i, j) => this.indexOfInternal(self, i, j, element));
        }
        return this.indexOfInternal(this, 0, Math.max(0, offset || 0), element);
    }
    toArray() {
        const { chunks } = this;
        const n = chunks.length;
        let ArrayType = this._type.ArrayType;
        if (n <= 0) {
            return new ArrayType(0);
        }
        if (n <= 1) {
            return chunks[0].toArray();
        }
        let len = 0, src = new Array(n);
        for (let i = -1; ++i < n;) {
            len += (src[i] = chunks[i].toArray()).length;
        }
        if (ArrayType !== src[0].constructor) {
            ArrayType = src[0].constructor;
        }
        let dst = new ArrayType(len);
        let set = ArrayType === Array ? arraySet : typedSet;
        for (let i = -1, idx = 0; ++i < n;) {
            idx = set(src[i], dst, idx);
        }
        return dst;
    }
    getInternal({ _chunks }, i, j) { return _chunks[i].get(j); }
    isValidInternal({ _chunks }, i, j) { return _chunks[i].isValid(j); }
    indexOfInternal({ _chunks }, chunkIndex, fromIndex, element) {
        let i = chunkIndex - 1, n = _chunks.length;
        let start = fromIndex, offset = 0, found = -1;
        while (++i < n) {
            if (~(found = _chunks[i].indexOf(element, start))) {
                return offset + found;
            }
            start = 0;
            offset += _chunks[i].length;
        }
        return -1;
    }
    _sliceInternal(self, begin, end) {
        const slices = [];
        const { chunks, _chunkOffsets: chunkOffsets } = self;
        for (let i = -1, n = chunks.length; ++i < n;) {
            const chunk = chunks[i];
            const chunkLength = chunk.length;
            const chunkOffset = chunkOffsets[i];
            // If the child is to the right of the slice boundary, we can stop
            if (chunkOffset >= end) {
                break;
            }
            // If the child is to the left of of the slice boundary, exclude
            if (begin >= chunkOffset + chunkLength) {
                continue;
            }
            // If the child is between both left and right boundaries, include w/o slicing
            if (chunkOffset >= begin && (chunkOffset + chunkLength) <= end) {
                slices.push(chunk);
                continue;
            }
            // If the child overlaps one of the slice boundaries, include that slice
            const from = Math.max(0, begin - chunkOffset);
            const to = Math.min(end - chunkOffset, chunkLength);
            slices.push(chunk.slice(from, to));
        }
        return self.clone(slices);
    }
}
exports.Chunked = Chunked;
/** @ignore */
function calculateOffsets(vectors) {
    let offsets = new Uint32Array((vectors || []).length + 1);
    let offset = offsets[0] = 0, length = offsets.length;
    for (let index = 0; ++index < length;) {
        offsets[index] = (offset += vectors[index - 1].length);
    }
    return offsets;
}
/** @ignore */
const typedSet = (src, dst, offset) => {
    dst.set(src, offset);
    return (offset + src.length);
};
/** @ignore */
const arraySet = (src, dst, offset) => {
    let idx = offset;
    for (let i = -1, n = src.length; ++i < n;) {
        dst[idx++] = src[i];
    }
    return idx;
};



},{"../util/vector":"node_modules/apache-arrow/util/vector.js","../type":"node_modules/apache-arrow/type.js","../util/args":"node_modules/apache-arrow/util/args.js","../vector":"node_modules/apache-arrow/vector.js"}],"node_modules/apache-arrow/column.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const vector_1 = require("./vector");
const chunked_1 = require("./vector/chunked");
class Column extends chunked_1.Chunked {
    constructor(field, vectors = [], offsets) {
        vectors = chunked_1.Chunked.flatten(...vectors);
        super(field.type, vectors, offsets);
        this._field = field;
        if (vectors.length === 1 && !(this instanceof SingleChunkColumn)) {
            return new SingleChunkColumn(field, vectors[0], this._chunkOffsets);
        }
    }
    /** @nocollapse */
    static new(field, data, ...rest) {
        const chunks = chunked_1.Chunked.flatten(Array.isArray(data) ? [...data, ...rest] :
            data instanceof vector_1.Vector ? [data, ...rest] :
                [vector_1.Vector.new(data, ...rest)]);
        if (typeof field === 'string') {
            const type = chunks[0].data.type;
            field = new schema_1.Field(field, type, true);
        }
        else if (!field.nullable && chunks.some(({ nullCount }) => nullCount > 0)) {
            field = field.clone({ nullable: true });
        }
        return new Column(field, chunks);
    }
    get field() { return this._field; }
    get name() { return this._field.name; }
    get nullable() { return this._field.nullable; }
    get metadata() { return this._field.metadata; }
    clone(chunks = this._chunks) {
        return new Column(this._field, chunks);
    }
    getChildAt(index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        let columns = this._children || (this._children = []);
        let column, field, chunks;
        if (column = columns[index]) {
            return column;
        }
        if (field = (this.type.children || [])[index]) {
            chunks = this._chunks
                .map((vector) => vector.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new Column(field, chunks));
            }
        }
        return null;
    }
}
exports.Column = Column;
/** @ignore */
class SingleChunkColumn extends Column {
    constructor(field, vector, offsets) {
        super(field, [vector], offsets);
        this._chunk = vector;
    }
    search(index, then) {
        return then ? then(this, 0, index) : [0, index];
    }
    isValid(index) {
        return this._chunk.isValid(index);
    }
    get(index) {
        return this._chunk.get(index);
    }
    set(index, value) {
        this._chunk.set(index, value);
    }
    indexOf(element, offset) {
        return this._chunk.indexOf(element, offset);
    }
}



},{"./schema":"node_modules/apache-arrow/schema.js","./vector":"node_modules/apache-arrow/vector.js","./vector/chunked":"node_modules/apache-arrow/vector/chunked.js"}],"node_modules/apache-arrow/util/args.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const schema_1 = require("../schema");
const column_1 = require("../column");
const vector_1 = require("../vector");
const type_1 = require("../type");
const chunked_1 = require("../vector/chunked");
const isArray = Array.isArray;
/** @ignore */
exports.selectArgs = (Ctor, vals) => _selectArgs(Ctor, vals, [], 0);
/** @ignore */
exports.selectColumnArgs = (args) => {
    const [fields, values] = _selectFieldArgs(args, [[], []]);
    return values.map((x, i) => x instanceof column_1.Column ? column_1.Column.new(x.field.clone(fields[i]), x) :
        x instanceof vector_1.Vector ? column_1.Column.new(fields[i], x) :
            column_1.Column.new(fields[i], []));
};
/** @ignore */
exports.selectFieldArgs = (args) => _selectFieldArgs(args, [[], []]);
/** @ignore */
exports.selectChunkArgs = (Ctor, vals) => _selectChunkArgs(Ctor, vals, [], 0);
/** @ignore */
exports.selectVectorChildrenArgs = (Ctor, vals) => _selectVectorChildrenArgs(Ctor, vals, [], 0);
/** @ignore */
exports.selectColumnChildrenArgs = (Ctor, vals) => _selectColumnChildrenArgs(Ctor, vals, [], 0);
/** @ignore */
function _selectArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1, n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectChunkArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1, n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectChunkArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof chunked_1.Chunked) {
            j = _selectChunkArgs(Ctor, value.chunks, res, j).length;
        }
        else if (value instanceof Ctor) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectVectorChildrenArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1, n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectVectorChildrenArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            j = _selectArgs(vector_1.Vector, value.schema.fields.map((_, i) => value.getChildAt(i)), res, j).length;
        }
        else if (value instanceof vector_1.Vector) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectColumnChildrenArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1, n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectColumnChildrenArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            j = _selectArgs(column_1.Column, value.schema.fields.map((f, i) => column_1.Column.new(f, value.getChildAt(i))), res, j).length;
        }
        else if (value instanceof column_1.Column) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
const toKeysAndValues = (xs, [k, v], i) => (xs[0][i] = k, xs[1][i] = v, xs);
/** @ignore */
function _selectFieldArgs(vals, ret) {
    let keys, n;
    switch (n = vals.length) {
        case 0: return ret;
        case 1:
            keys = ret[0];
            if (!(vals[0])) {
                return ret;
            }
            if (isArray(vals[0])) {
                return _selectFieldArgs(vals[0], ret);
            }
            if (!(vals[0] instanceof data_1.Data || vals[0] instanceof vector_1.Vector || vals[0] instanceof type_1.DataType)) {
                [keys, vals] = Object.entries(vals[0]).reduce(toKeysAndValues, ret);
            }
            break;
        default:
            !isArray(keys = vals[n - 1])
                ? (vals = isArray(vals[0]) ? vals[0] : vals, keys = [])
                : (vals = isArray(vals[0]) ? vals[0] : vals.slice(0, n - 1));
    }
    let fieldIndex = -1;
    let valueIndex = -1;
    let idx = -1, len = vals.length;
    let field;
    let val;
    let [fields, values] = ret;
    while (++idx < len) {
        val = vals[idx];
        if (val instanceof column_1.Column && (values[++valueIndex] = val)) {
            fields[++fieldIndex] = val.field.clone(keys[idx], val.type, true);
        }
        else {
            ({ [idx]: field = idx } = keys);
            if (val instanceof type_1.DataType && (values[++valueIndex] = val)) {
                fields[++fieldIndex] = schema_1.Field.new(field, val, true);
            }
            else if (val && val.type && (values[++valueIndex] = val)) {
                val instanceof data_1.Data && (values[valueIndex] = val = vector_1.Vector.new(val));
                fields[++fieldIndex] = schema_1.Field.new(field, val.type, true);
            }
        }
    }
    return ret;
}



},{"../data":"node_modules/apache-arrow/data.js","../schema":"node_modules/apache-arrow/schema.js","../column":"node_modules/apache-arrow/column.js","../vector":"node_modules/apache-arrow/vector.js","../type":"node_modules/apache-arrow/type.js","../vector/chunked":"node_modules/apache-arrow/vector/chunked.js"}],"node_modules/apache-arrow/schema.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const args_1 = require("./util/args");
const args_2 = require("./util/args");
const typecomparator_1 = require("./visitor/typecomparator");
class Schema {
    constructor(fields = [], metadata, dictionaries) {
        this.fields = (fields || []);
        this.metadata = metadata || new Map();
        if (!dictionaries) {
            dictionaries = generateDictionaryMap(fields);
        }
        this.dictionaries = dictionaries;
    }
    /** @nocollapse */
    static from(...args) {
        return Schema.new(args[0], args[1]);
    }
    /** @nocollapse */
    static new(...args) {
        return new Schema(args_2.selectFieldArgs(args)[0]);
    }
    get [Symbol.toStringTag]() { return 'Schema'; }
    toString() {
        return `Schema<{ ${this.fields.map((f, i) => `${i}: ${f}`).join(', ')} }>`;
    }
    compareTo(other) {
        return typecomparator_1.instance.compareSchemas(this, other);
    }
    select(...columnNames) {
        const names = columnNames.reduce((xs, x) => (xs[x] = true) && xs, Object.create(null));
        return new Schema(this.fields.filter((f) => names[f.name]), this.metadata);
    }
    selectAt(...columnIndices) {
        return new Schema(columnIndices.map((i) => this.fields[i]).filter(Boolean), this.metadata);
    }
    assign(...args) {
        const other = args[0] instanceof Schema ? args[0]
            : new Schema(args_1.selectArgs(Field, args));
        const curFields = [...this.fields];
        const metadata = mergeMaps(mergeMaps(new Map(), this.metadata), other.metadata);
        const newFields = other.fields.filter((f2) => {
            const i = curFields.findIndex((f) => f.name === f2.name);
            return ~i ? (curFields[i] = f2.clone({
                metadata: mergeMaps(mergeMaps(new Map(), curFields[i].metadata), f2.metadata)
            })) && false : true;
        });
        const newDictionaries = generateDictionaryMap(newFields, new Map());
        return new Schema([...curFields, ...newFields], metadata, new Map([...this.dictionaries, ...newDictionaries]));
    }
}
exports.Schema = Schema;
class Field {
    constructor(name, type, nullable = false, metadata) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.metadata = metadata || new Map();
    }
    /** @nocollapse */
    static new(...args) {
        let [name, type, nullable, metadata] = args;
        if (args[0] && typeof args[0] === 'object') {
            ({ name } = args[0]);
            (type === undefined) && (type = args[0].type);
            (nullable === undefined) && (nullable = args[0].nullable);
            (metadata === undefined) && (metadata = args[0].metadata);
        }
        return new Field(`${name}`, type, nullable, metadata);
    }
    get typeId() { return this.type.typeId; }
    get [Symbol.toStringTag]() { return 'Field'; }
    toString() { return `${this.name}: ${this.type}`; }
    compareTo(other) {
        return typecomparator_1.instance.compareField(this, other);
    }
    clone(...args) {
        let [name, type, nullable, metadata] = args;
        (!args[0] || typeof args[0] !== 'object')
            ? ([name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata] = args)
            : ({ name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata } = args[0]);
        return Field.new(name, type, nullable, metadata);
    }
}
exports.Field = Field;
/** @ignore */
function mergeMaps(m1, m2) {
    return new Map([...(m1 || new Map()), ...(m2 || new Map())]);
}
/** @ignore */
function generateDictionaryMap(fields, dictionaries = new Map()) {
    for (let i = -1, n = fields.length; ++i < n;) {
        const field = fields[i];
        const type = field.type;
        if (type_1.DataType.isDictionary(type)) {
            if (!dictionaries.has(type.id)) {
                dictionaries.set(type.id, type.dictionary);
            }
            else if (dictionaries.get(type.id) !== type.dictionary) {
                throw new Error(`Cannot create Schema containing two different dictionaries with the same Id`);
            }
        }
        if (type.children && type.children.length > 0) {
            generateDictionaryMap(type.children, dictionaries);
        }
    }
    return dictionaries;
}
// Add these here so they're picked up by the externs creator
// in the build, and closure-compiler doesn't minify them away
Schema.prototype.fields = null;
Schema.prototype.metadata = null;
Schema.prototype.dictionaries = null;
Field.prototype.type = null;
Field.prototype.name = null;
Field.prototype.nullable = null;
Field.prototype.metadata = null;



},{"./type":"node_modules/apache-arrow/type.js","./util/args":"node_modules/apache-arrow/util/args.js","./visitor/typecomparator":"node_modules/apache-arrow/visitor/typecomparator.js"}],"node_modules/apache-arrow/builder/list.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("./run");
const schema_1 = require("../schema");
const type_1 = require("../type");
const buffer_1 = require("./buffer");
const builder_1 = require("../builder");
/** @ignore */
class ListBuilder extends builder_1.VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._run = new run_1.Run();
        this._offsets = new buffer_1.OffsetsBufferBuilder();
    }
    addChild(child, name = '0') {
        if (this.numChildren > 0) {
            throw new Error('ListBuilder can only have one child.');
        }
        this.children[this.numChildren] = child;
        this.type = new type_1.List(new schema_1.Field(name, child.type, true));
        return this.numChildren - 1;
    }
    clear() {
        this._run.clear();
        return super.clear();
    }
    _flushPending(pending) {
        const run = this._run;
        const offsets = this._offsets;
        const setValue = this._setValue;
        let index = 0, value;
        for ([index, value] of pending) {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                offsets.set(index, value.length);
                setValue(this, index, run.bind(value));
            }
        }
    }
}
exports.ListBuilder = ListBuilder;



},{"./run":"node_modules/apache-arrow/builder/run.js","../schema":"node_modules/apache-arrow/schema.js","../type":"node_modules/apache-arrow/type.js","./buffer":"node_modules/apache-arrow/builder/buffer.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/fixedsizelist.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("./run");
const schema_1 = require("../schema");
const builder_1 = require("../builder");
const type_1 = require("../type");
/** @ignore */
class FixedSizeListBuilder extends builder_1.Builder {
    constructor() {
        super(...arguments);
        this._run = new run_1.Run();
    }
    setValue(index, value) {
        super.setValue(index, this._run.bind(value));
    }
    addChild(child, name = '0') {
        if (this.numChildren > 0) {
            throw new Error('FixedSizeListBuilder can only have one child.');
        }
        const childIndex = this.children.push(child);
        this.type = new type_1.FixedSizeList(this.type.listSize, new schema_1.Field(name, child.type, true));
        return childIndex;
    }
    clear() {
        this._run.clear();
        return super.clear();
    }
}
exports.FixedSizeListBuilder = FixedSizeListBuilder;



},{"./run":"node_modules/apache-arrow/builder/run.js","../schema":"node_modules/apache-arrow/schema.js","../builder":"node_modules/apache-arrow/builder.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/builder/map.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const type_1 = require("../type");
const builder_1 = require("../builder");
/** @ignore */
class MapBuilder extends builder_1.VariableWidthBuilder {
    set(index, value) {
        return super.set(index, value);
    }
    setValue(index, value) {
        value = value instanceof Map ? value : new Map(Object.entries(value));
        const pending = this._pending || (this._pending = new Map());
        const current = pending.get(index);
        current && (this._pendingLength -= current.size);
        this._pendingLength += value.size;
        pending.set(index, value);
    }
    addChild(child, name = `${this.numChildren}`) {
        if (this.numChildren > 0) {
            throw new Error('ListBuilder can only have one child.');
        }
        this.children[this.numChildren] = child;
        this.type = new type_1.Map_(new schema_1.Field(name, child.type, true), this.type.keysSorted);
        return this.numChildren - 1;
    }
    _flushPending(pending) {
        const offsets = this._offsets;
        const setValue = this._setValue;
        pending.forEach((value, index) => {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                offsets.set(index, value.size);
                setValue(this, index, value);
            }
        });
    }
}
exports.MapBuilder = MapBuilder;



},{"../schema":"node_modules/apache-arrow/schema.js","../type":"node_modules/apache-arrow/type.js","../builder":"node_modules/apache-arrow/builder.js"}],"node_modules/apache-arrow/builder/struct.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const builder_1 = require("../builder");
const type_1 = require("../type");
/** @ignore */
class StructBuilder extends builder_1.Builder {
    addChild(child, name = `${this.numChildren}`) {
        const childIndex = this.children.push(child);
        this.type = new type_1.Struct([...this.type.children, new schema_1.Field(name, child.type, true)]);
        return childIndex;
    }
}
exports.StructBuilder = StructBuilder;



},{"../schema":"node_modules/apache-arrow/schema.js","../builder":"node_modules/apache-arrow/builder.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/builder/union.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const buffer_1 = require("./buffer");
const builder_1 = require("../builder");
const type_1 = require("../type");
/** @ignore */
class UnionBuilder extends builder_1.Builder {
    constructor(options) {
        super(options);
        this._typeIds = new buffer_1.DataBufferBuilder(new Int8Array(0), 1);
        if (typeof options['valueToChildTypeId'] === 'function') {
            this._valueToChildTypeId = options['valueToChildTypeId'];
        }
    }
    get typeIdToChildIndex() { return this.type.typeIdToChildIndex; }
    append(value, childTypeId) {
        return this.set(this.length, value, childTypeId);
    }
    set(index, value, childTypeId) {
        if (childTypeId === undefined) {
            childTypeId = this._valueToChildTypeId(this, value, index);
        }
        if (this.setValid(index, this.isValid(value))) {
            this.setValue(index, value, childTypeId);
        }
        return this;
    }
    // @ts-ignore
    setValue(index, value, childTypeId) {
        this._typeIds.set(index, childTypeId);
        super.setValue(index, value);
    }
    // @ts-ignore
    addChild(child, name = `${this.children.length}`) {
        const childTypeId = this.children.push(child);
        const { type: { children, mode, typeIds } } = this;
        const fields = [...children, new schema_1.Field(name, child.type)];
        this.type = new type_1.Union(mode, [...typeIds, childTypeId], fields);
        return childTypeId;
    }
    /** @ignore */
    // @ts-ignore
    _valueToChildTypeId(builder, value, offset) {
        throw new Error(`Cannot map UnionBuilder value to child typeId. \
Pass the \`childTypeId\` as the second argument to unionBuilder.append(), \
or supply a \`valueToChildTypeId\` function as part of the UnionBuilder constructor options.`);
    }
}
exports.UnionBuilder = UnionBuilder;
/** @ignore */
class SparseUnionBuilder extends UnionBuilder {
}
exports.SparseUnionBuilder = SparseUnionBuilder;
/** @ignore */
class DenseUnionBuilder extends UnionBuilder {
    constructor(options) {
        super(options);
        this._offsets = new buffer_1.DataBufferBuilder(new Int32Array(0));
    }
    /** @ignore */
    setValue(index, value, childTypeId) {
        const childIndex = this.type.typeIdToChildIndex[childTypeId];
        this._offsets.set(index, this.getChildAt(childIndex).length);
        return super.setValue(index, value, childTypeId);
    }
}
exports.DenseUnionBuilder = DenseUnionBuilder;



},{"../schema":"node_modules/apache-arrow/schema.js","./buffer":"node_modules/apache-arrow/builder/buffer.js","../builder":"node_modules/apache-arrow/builder.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/visitor/set.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const visitor_1 = require("../visitor");
const utf8_1 = require("../util/utf8");
const math_1 = require("../util/math");
const buffer_1 = require("../util/buffer");
const enum_1 = require("../enum");
/** @ignore */
class SetVisitor extends visitor_1.Visitor {
}
exports.SetVisitor = SetVisitor;
/** @ignore */
const setEpochMsToDays = (data, index, epochMs) => { data[index] = (epochMs / 86400000) | 0; };
/** @ignore */
const setEpochMsToMillisecondsLong = (data, index, epochMs) => {
    data[index] = (epochMs % 4294967296) | 0;
    data[index + 1] = (epochMs / 4294967296) | 0;
};
/** @ignore */
const setEpochMsToMicrosecondsLong = (data, index, epochMs) => {
    data[index] = ((epochMs * 1000) % 4294967296) | 0;
    data[index + 1] = ((epochMs * 1000) / 4294967296) | 0;
};
/** @ignore */
const setEpochMsToNanosecondsLong = (data, index, epochMs) => {
    data[index] = ((epochMs * 1000000) % 4294967296) | 0;
    data[index + 1] = ((epochMs * 1000000) / 4294967296) | 0;
};
/** @ignore */
const setVariableWidthBytes = (values, valueOffsets, index, value) => {
    const { [index]: x, [index + 1]: y } = valueOffsets;
    if (x != null && y != null) {
        values.set(value.subarray(0, y - x), x);
    }
};
/** @ignore */
const setBool = ({ offset, values }, index, val) => {
    const idx = offset + index;
    val ? (values[idx >> 3] |= (1 << (idx % 8))) // true
        : (values[idx >> 3] &= ~(1 << (idx % 8))); // false
};
/** @ignore */
const setDateDay = ({ values }, index, value) => { setEpochMsToDays(values, index, value.valueOf()); };
/** @ignore */
const setDateMillisecond = ({ values }, index, value) => { setEpochMsToMillisecondsLong(values, index * 2, value.valueOf()); };
/** @ignore */
const setNumeric = ({ stride, values }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setFloat16 = ({ stride, values }, index, value) => { values[stride * index] = math_1.float64ToUint16(value); };
/** @ignore */
const setNumericX2 = (vector, index, value) => {
    switch (typeof value) {
        case 'bigint':
            vector.values64[index] = value;
            break;
        case 'number':
            vector.values[index * vector.stride] = value;
            break;
        default:
            const val = value;
            const { stride, ArrayType } = vector;
            const long = buffer_1.toArrayBufferView(ArrayType, val);
            vector.values.set(long.subarray(0, stride), stride * index);
    }
};
/** @ignore */
const setFixedSizeBinary = ({ stride, values }, index, value) => { values.set(value.subarray(0, stride), stride * index); };
/** @ignore */
const setBinary = ({ values, valueOffsets }, index, value) => setVariableWidthBytes(values, valueOffsets, index, value);
/** @ignore */
const setUtf8 = ({ values, valueOffsets }, index, value) => {
    setVariableWidthBytes(values, valueOffsets, index, utf8_1.encodeUtf8(value));
};
/* istanbul ignore next */
/** @ignore */
const setInt = (vector, index, value) => {
    vector.type.bitWidth < 64
        ? setNumeric(vector, index, value)
        : setNumericX2(vector, index, value);
};
/* istanbul ignore next */
/** @ignore */
const setFloat = (vector, index, value) => {
    vector.type.precision !== enum_1.Precision.HALF
        ? setNumeric(vector, index, value)
        : setFloat16(vector, index, value);
};
/* istanbul ignore next */
const setDate = (vector, index, value) => {
    vector.type.unit === enum_1.DateUnit.DAY
        ? setDateDay(vector, index, value)
        : setDateMillisecond(vector, index, value);
};
/** @ignore */
const setTimestampSecond = ({ values }, index, value) => setEpochMsToMillisecondsLong(values, index * 2, value / 1000);
/** @ignore */
const setTimestampMillisecond = ({ values }, index, value) => setEpochMsToMillisecondsLong(values, index * 2, value);
/** @ignore */
const setTimestampMicrosecond = ({ values }, index, value) => setEpochMsToMicrosecondsLong(values, index * 2, value);
/** @ignore */
const setTimestampNanosecond = ({ values }, index, value) => setEpochMsToNanosecondsLong(values, index * 2, value);
/* istanbul ignore next */
/** @ignore */
const setTimestamp = (vector, index, value) => {
    switch (vector.type.unit) {
        case enum_1.TimeUnit.SECOND: return setTimestampSecond(vector, index, value);
        case enum_1.TimeUnit.MILLISECOND: return setTimestampMillisecond(vector, index, value);
        case enum_1.TimeUnit.MICROSECOND: return setTimestampMicrosecond(vector, index, value);
        case enum_1.TimeUnit.NANOSECOND: return setTimestampNanosecond(vector, index, value);
    }
};
/** @ignore */
const setTimeSecond = ({ values, stride }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setTimeMillisecond = ({ values, stride }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setTimeMicrosecond = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/** @ignore */
const setTimeNanosecond = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/* istanbul ignore next */
/** @ignore */
const setTime = (vector, index, value) => {
    switch (vector.type.unit) {
        case enum_1.TimeUnit.SECOND: return setTimeSecond(vector, index, value);
        case enum_1.TimeUnit.MILLISECOND: return setTimeMillisecond(vector, index, value);
        case enum_1.TimeUnit.MICROSECOND: return setTimeMicrosecond(vector, index, value);
        case enum_1.TimeUnit.NANOSECOND: return setTimeNanosecond(vector, index, value);
    }
};
/** @ignore */
const setDecimal = ({ values }, index, value) => { values.set(value.subarray(0, 4), 4 * index); };
/** @ignore */
const setList = (vector, index, value) => {
    const values = vector.getChildAt(0), valueOffsets = vector.valueOffsets;
    for (let idx = -1, itr = valueOffsets[index], end = valueOffsets[index + 1]; itr < end;) {
        values.set(itr++, value.get(++idx));
    }
};
/** @ignore */
const setMap = (vector, index, value) => {
    const values = vector.getChildAt(0), valueOffsets = vector.valueOffsets;
    const entries = value instanceof Map ? [...value] : Object.entries(value);
    for (let idx = -1, itr = valueOffsets[index], end = valueOffsets[index + 1]; itr < end;) {
        values.set(itr++, entries[++idx]);
    }
};
/** @ignore */ const _setStructArrayValue = (o, v) => (c, _, i) => c && c.set(o, v[i]);
/** @ignore */ const _setStructVectorValue = (o, v) => (c, _, i) => c && c.set(o, v.get(i));
/** @ignore */ const _setStructMapValue = (o, v) => (c, f, _) => c && c.set(o, v.get(f.name));
/** @ignore */ const _setStructObjectValue = (o, v) => (c, f, _) => c && c.set(o, v[f.name]);
/** @ignore */
const setStruct = (vector, index, value) => {
    const setValue = value instanceof Map ? _setStructMapValue(index, value) :
        value instanceof vector_1.Vector ? _setStructVectorValue(index, value) :
            Array.isArray(value) ? _setStructArrayValue(index, value) :
                _setStructObjectValue(index, value);
    vector.type.children.forEach((f, i) => setValue(vector.getChildAt(i), f, i));
};
/* istanbul ignore next */
/** @ignore */
const setUnion = (vector, index, value) => {
    vector.type.mode === enum_1.UnionMode.Dense ?
        setDenseUnion(vector, index, value) :
        setSparseUnion(vector, index, value);
};
/** @ignore */
const setDenseUnion = (vector, index, value) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    child && child.set(vector.valueOffsets[index], value);
};
/** @ignore */
const setSparseUnion = (vector, index, value) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    child && child.set(index, value);
};
/** @ignore */
const setDictionary = (vector, index, value) => {
    const key = vector.getKey(index);
    if (key !== null) {
        vector.setValue(key, value);
    }
};
/* istanbul ignore next */
/** @ignore */
const setIntervalValue = (vector, index, value) => {
    (vector.type.unit === enum_1.IntervalUnit.DAY_TIME)
        ? setIntervalDayTime(vector, index, value)
        : setIntervalYearMonth(vector, index, value);
};
/** @ignore */
const setIntervalDayTime = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/** @ignore */
const setIntervalYearMonth = ({ values }, index, value) => { values[index] = (value[0] * 12) + (value[1] % 12); };
/** @ignore */
const setFixedSizeList = (vector, index, value) => {
    const child = vector.getChildAt(0), { stride } = vector;
    for (let idx = -1, offset = index * stride; ++idx < stride;) {
        child.set(offset + idx, value.get(idx));
    }
};
SetVisitor.prototype.visitBool = setBool;
SetVisitor.prototype.visitInt = setInt;
SetVisitor.prototype.visitInt8 = setNumeric;
SetVisitor.prototype.visitInt16 = setNumeric;
SetVisitor.prototype.visitInt32 = setNumeric;
SetVisitor.prototype.visitInt64 = setNumericX2;
SetVisitor.prototype.visitUint8 = setNumeric;
SetVisitor.prototype.visitUint16 = setNumeric;
SetVisitor.prototype.visitUint32 = setNumeric;
SetVisitor.prototype.visitUint64 = setNumericX2;
SetVisitor.prototype.visitFloat = setFloat;
SetVisitor.prototype.visitFloat16 = setFloat16;
SetVisitor.prototype.visitFloat32 = setNumeric;
SetVisitor.prototype.visitFloat64 = setNumeric;
SetVisitor.prototype.visitUtf8 = setUtf8;
SetVisitor.prototype.visitBinary = setBinary;
SetVisitor.prototype.visitFixedSizeBinary = setFixedSizeBinary;
SetVisitor.prototype.visitDate = setDate;
SetVisitor.prototype.visitDateDay = setDateDay;
SetVisitor.prototype.visitDateMillisecond = setDateMillisecond;
SetVisitor.prototype.visitTimestamp = setTimestamp;
SetVisitor.prototype.visitTimestampSecond = setTimestampSecond;
SetVisitor.prototype.visitTimestampMillisecond = setTimestampMillisecond;
SetVisitor.prototype.visitTimestampMicrosecond = setTimestampMicrosecond;
SetVisitor.prototype.visitTimestampNanosecond = setTimestampNanosecond;
SetVisitor.prototype.visitTime = setTime;
SetVisitor.prototype.visitTimeSecond = setTimeSecond;
SetVisitor.prototype.visitTimeMillisecond = setTimeMillisecond;
SetVisitor.prototype.visitTimeMicrosecond = setTimeMicrosecond;
SetVisitor.prototype.visitTimeNanosecond = setTimeNanosecond;
SetVisitor.prototype.visitDecimal = setDecimal;
SetVisitor.prototype.visitList = setList;
SetVisitor.prototype.visitStruct = setStruct;
SetVisitor.prototype.visitUnion = setUnion;
SetVisitor.prototype.visitDenseUnion = setDenseUnion;
SetVisitor.prototype.visitSparseUnion = setSparseUnion;
SetVisitor.prototype.visitDictionary = setDictionary;
SetVisitor.prototype.visitInterval = setIntervalValue;
SetVisitor.prototype.visitIntervalDayTime = setIntervalDayTime;
SetVisitor.prototype.visitIntervalYearMonth = setIntervalYearMonth;
SetVisitor.prototype.visitFixedSizeList = setFixedSizeList;
SetVisitor.prototype.visitMap = setMap;
/** @ignore */
exports.instance = new SetVisitor();



},{"../vector":"node_modules/apache-arrow/vector.js","../visitor":"node_modules/apache-arrow/visitor.js","../util/utf8":"node_modules/apache-arrow/util/utf8.js","../util/math":"node_modules/apache-arrow/util/math.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/visitor/builderctor.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const binary_1 = require("../builder/binary");
const bool_1 = require("../builder/bool");
const date_1 = require("../builder/date");
const decimal_1 = require("../builder/decimal");
const dictionary_1 = require("../builder/dictionary");
const fixedsizebinary_1 = require("../builder/fixedsizebinary");
const fixedsizelist_1 = require("../builder/fixedsizelist");
const float_1 = require("../builder/float");
const interval_1 = require("../builder/interval");
const int_1 = require("../builder/int");
const list_1 = require("../builder/list");
const map_1 = require("../builder/map");
const null_1 = require("../builder/null");
const struct_1 = require("../builder/struct");
const timestamp_1 = require("../builder/timestamp");
const time_1 = require("../builder/time");
const union_1 = require("../builder/union");
const utf8_1 = require("../builder/utf8");
/** @ignore */
class GetBuilderCtor extends visitor_1.Visitor {
    visitNull() { return null_1.NullBuilder; }
    visitBool() { return bool_1.BoolBuilder; }
    visitInt() { return int_1.IntBuilder; }
    visitInt8() { return int_1.Int8Builder; }
    visitInt16() { return int_1.Int16Builder; }
    visitInt32() { return int_1.Int32Builder; }
    visitInt64() { return int_1.Int64Builder; }
    visitUint8() { return int_1.Uint8Builder; }
    visitUint16() { return int_1.Uint16Builder; }
    visitUint32() { return int_1.Uint32Builder; }
    visitUint64() { return int_1.Uint64Builder; }
    visitFloat() { return float_1.FloatBuilder; }
    visitFloat16() { return float_1.Float16Builder; }
    visitFloat32() { return float_1.Float32Builder; }
    visitFloat64() { return float_1.Float64Builder; }
    visitUtf8() { return utf8_1.Utf8Builder; }
    visitBinary() { return binary_1.BinaryBuilder; }
    visitFixedSizeBinary() { return fixedsizebinary_1.FixedSizeBinaryBuilder; }
    visitDate() { return date_1.DateBuilder; }
    visitDateDay() { return date_1.DateDayBuilder; }
    visitDateMillisecond() { return date_1.DateMillisecondBuilder; }
    visitTimestamp() { return timestamp_1.TimestampBuilder; }
    visitTimestampSecond() { return timestamp_1.TimestampSecondBuilder; }
    visitTimestampMillisecond() { return timestamp_1.TimestampMillisecondBuilder; }
    visitTimestampMicrosecond() { return timestamp_1.TimestampMicrosecondBuilder; }
    visitTimestampNanosecond() { return timestamp_1.TimestampNanosecondBuilder; }
    visitTime() { return time_1.TimeBuilder; }
    visitTimeSecond() { return time_1.TimeSecondBuilder; }
    visitTimeMillisecond() { return time_1.TimeMillisecondBuilder; }
    visitTimeMicrosecond() { return time_1.TimeMicrosecondBuilder; }
    visitTimeNanosecond() { return time_1.TimeNanosecondBuilder; }
    visitDecimal() { return decimal_1.DecimalBuilder; }
    visitList() { return list_1.ListBuilder; }
    visitStruct() { return struct_1.StructBuilder; }
    visitUnion() { return union_1.UnionBuilder; }
    visitDenseUnion() { return union_1.DenseUnionBuilder; }
    visitSparseUnion() { return union_1.SparseUnionBuilder; }
    visitDictionary() { return dictionary_1.DictionaryBuilder; }
    visitInterval() { return interval_1.IntervalBuilder; }
    visitIntervalDayTime() { return interval_1.IntervalDayTimeBuilder; }
    visitIntervalYearMonth() { return interval_1.IntervalYearMonthBuilder; }
    visitFixedSizeList() { return fixedsizelist_1.FixedSizeListBuilder; }
    visitMap() { return map_1.MapBuilder; }
}
exports.GetBuilderCtor = GetBuilderCtor;
/** @ignore */
exports.instance = new GetBuilderCtor();



},{"../visitor":"node_modules/apache-arrow/visitor.js","../builder/binary":"node_modules/apache-arrow/builder/binary.js","../builder/bool":"node_modules/apache-arrow/builder/bool.js","../builder/date":"node_modules/apache-arrow/builder/date.js","../builder/decimal":"node_modules/apache-arrow/builder/decimal.js","../builder/dictionary":"node_modules/apache-arrow/builder/dictionary.js","../builder/fixedsizebinary":"node_modules/apache-arrow/builder/fixedsizebinary.js","../builder/fixedsizelist":"node_modules/apache-arrow/builder/fixedsizelist.js","../builder/float":"node_modules/apache-arrow/builder/float.js","../builder/interval":"node_modules/apache-arrow/builder/interval.js","../builder/int":"node_modules/apache-arrow/builder/int.js","../builder/list":"node_modules/apache-arrow/builder/list.js","../builder/map":"node_modules/apache-arrow/builder/map.js","../builder/null":"node_modules/apache-arrow/builder/null.js","../builder/struct":"node_modules/apache-arrow/builder/struct.js","../builder/timestamp":"node_modules/apache-arrow/builder/timestamp.js","../builder/time":"node_modules/apache-arrow/builder/time.js","../builder/union":"node_modules/apache-arrow/builder/union.js","../builder/utf8":"node_modules/apache-arrow/builder/utf8.js"}],"node_modules/apache-arrow/builder/index.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */
var builder_1 = require("../builder");
exports.Builder = builder_1.Builder;
var bool_1 = require("./bool");
exports.BoolBuilder = bool_1.BoolBuilder;
var null_1 = require("./null");
exports.NullBuilder = null_1.NullBuilder;
var date_1 = require("./date");
exports.DateBuilder = date_1.DateBuilder;
exports.DateDayBuilder = date_1.DateDayBuilder;
exports.DateMillisecondBuilder = date_1.DateMillisecondBuilder;
var decimal_1 = require("./decimal");
exports.DecimalBuilder = decimal_1.DecimalBuilder;
var dictionary_1 = require("./dictionary");
exports.DictionaryBuilder = dictionary_1.DictionaryBuilder;
var fixedsizebinary_1 = require("./fixedsizebinary");
exports.FixedSizeBinaryBuilder = fixedsizebinary_1.FixedSizeBinaryBuilder;
var float_1 = require("./float");
exports.FloatBuilder = float_1.FloatBuilder;
exports.Float16Builder = float_1.Float16Builder;
exports.Float32Builder = float_1.Float32Builder;
exports.Float64Builder = float_1.Float64Builder;
var int_1 = require("./int");
exports.IntBuilder = int_1.IntBuilder;
exports.Int8Builder = int_1.Int8Builder;
exports.Int16Builder = int_1.Int16Builder;
exports.Int32Builder = int_1.Int32Builder;
exports.Int64Builder = int_1.Int64Builder;
exports.Uint8Builder = int_1.Uint8Builder;
exports.Uint16Builder = int_1.Uint16Builder;
exports.Uint32Builder = int_1.Uint32Builder;
exports.Uint64Builder = int_1.Uint64Builder;
var time_1 = require("./time");
exports.TimeBuilder = time_1.TimeBuilder;
exports.TimeSecondBuilder = time_1.TimeSecondBuilder;
exports.TimeMillisecondBuilder = time_1.TimeMillisecondBuilder;
exports.TimeMicrosecondBuilder = time_1.TimeMicrosecondBuilder;
exports.TimeNanosecondBuilder = time_1.TimeNanosecondBuilder;
var timestamp_1 = require("./timestamp");
exports.TimestampBuilder = timestamp_1.TimestampBuilder;
exports.TimestampSecondBuilder = timestamp_1.TimestampSecondBuilder;
exports.TimestampMillisecondBuilder = timestamp_1.TimestampMillisecondBuilder;
exports.TimestampMicrosecondBuilder = timestamp_1.TimestampMicrosecondBuilder;
exports.TimestampNanosecondBuilder = timestamp_1.TimestampNanosecondBuilder;
var interval_1 = require("./interval");
exports.IntervalBuilder = interval_1.IntervalBuilder;
exports.IntervalDayTimeBuilder = interval_1.IntervalDayTimeBuilder;
exports.IntervalYearMonthBuilder = interval_1.IntervalYearMonthBuilder;
var utf8_1 = require("./utf8");
exports.Utf8Builder = utf8_1.Utf8Builder;
var binary_1 = require("./binary");
exports.BinaryBuilder = binary_1.BinaryBuilder;
var list_1 = require("./list");
exports.ListBuilder = list_1.ListBuilder;
var fixedsizelist_1 = require("./fixedsizelist");
exports.FixedSizeListBuilder = fixedsizelist_1.FixedSizeListBuilder;
var map_1 = require("./map");
exports.MapBuilder = map_1.MapBuilder;
var struct_1 = require("./struct");
exports.StructBuilder = struct_1.StructBuilder;
var union_1 = require("./union");
exports.UnionBuilder = union_1.UnionBuilder;
exports.SparseUnionBuilder = union_1.SparseUnionBuilder;
exports.DenseUnionBuilder = union_1.DenseUnionBuilder;
const enum_1 = require("../enum");
const utf8_2 = require("./utf8");
const builder_2 = require("../builder");
const set_1 = require("../visitor/set");
const builderctor_1 = require("../visitor/builderctor");
/** @nocollapse */
builder_2.Builder.new = newBuilder;
function newBuilder(options) {
    const type = options.type;
    const builder = new (builderctor_1.instance.getVisitFn(type)())(options);
    if (type.children && type.children.length > 0) {
        const children = options['children'] || [];
        const defaultOptions = { 'nullValues': options['nullValues'] };
        const getChildOptions = Array.isArray(children)
            ? ((_, i) => children[i] || defaultOptions)
            : (({ name }) => children[name] || defaultOptions);
        type.children.forEach((field, index) => {
            const { type } = field;
            const opts = getChildOptions(field, index);
            builder.children.push(newBuilder({ ...opts, type }));
        });
    }
    return builder;
}
Object.keys(enum_1.Type)
    .map((T) => enum_1.Type[T])
    .filter((T) => typeof T === 'number' && T !== enum_1.Type.NONE)
    .forEach((typeId) => {
    const BuilderCtor = builderctor_1.instance.visit(typeId);
    BuilderCtor.prototype._setValue = set_1.instance.getVisitFn(typeId);
});
utf8_2.Utf8Builder.prototype._setValue = set_1.instance.visitBinary;



},{"../builder":"node_modules/apache-arrow/builder.js","./bool":"node_modules/apache-arrow/builder/bool.js","./null":"node_modules/apache-arrow/builder/null.js","./date":"node_modules/apache-arrow/builder/date.js","./decimal":"node_modules/apache-arrow/builder/decimal.js","./dictionary":"node_modules/apache-arrow/builder/dictionary.js","./fixedsizebinary":"node_modules/apache-arrow/builder/fixedsizebinary.js","./float":"node_modules/apache-arrow/builder/float.js","./int":"node_modules/apache-arrow/builder/int.js","./time":"node_modules/apache-arrow/builder/time.js","./timestamp":"node_modules/apache-arrow/builder/timestamp.js","./interval":"node_modules/apache-arrow/builder/interval.js","./utf8":"node_modules/apache-arrow/builder/utf8.js","./binary":"node_modules/apache-arrow/builder/binary.js","./list":"node_modules/apache-arrow/builder/list.js","./fixedsizelist":"node_modules/apache-arrow/builder/fixedsizelist.js","./map":"node_modules/apache-arrow/builder/map.js","./struct":"node_modules/apache-arrow/builder/struct.js","./union":"node_modules/apache-arrow/builder/union.js","../enum":"node_modules/apache-arrow/enum.js","../visitor/set":"node_modules/apache-arrow/visitor/set.js","../visitor/builderctor":"node_modules/apache-arrow/visitor/builderctor.js"}],"node_modules/apache-arrow/fb/File.js":[function(require,module,exports) {
"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
const NS7624605610262437867 = require("./Schema");
/**
 * ----------------------------------------------------------------------
 * Arrow File metadata
 *
 *
 * @constructor
 */
var org;
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Footer {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Footer
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Footer= obj
                     * @returns Footer
                     */
                    static getRootAsFooter(bb, obj) {
                        return (obj || new Footer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.MetadataVersion
                     */
                    version() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1;
                    }
                    /**
                     * @param org.apache.arrow.flatbuf.Schema= obj
                     * @returns org.apache.arrow.flatbuf.Schema|null
                     */
                    schema(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new NS7624605610262437867.org.apache.arrow.flatbuf.Schema).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Block= obj
                     * @returns org.apache.arrow.flatbuf.Block
                     */
                    dictionaries(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? (obj || new org.apache.arrow.flatbuf.Block).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    dictionariesLength() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Block= obj
                     * @returns org.apache.arrow.flatbuf.Block
                     */
                    recordBatches(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 10);
                        return offset ? (obj || new org.apache.arrow.flatbuf.Block).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    recordBatchesLength() {
                        let offset = this.bb.__offset(this.bb_pos, 10);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startFooter(builder) {
                        builder.startObject(4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.MetadataVersion version
                     */
                    static addVersion(builder, version) {
                        builder.addFieldInt16(0, version, NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset schemaOffset
                     */
                    static addSchema(builder, schemaOffset) {
                        builder.addFieldOffset(1, schemaOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset dictionariesOffset
                     */
                    static addDictionaries(builder, dictionariesOffset) {
                        builder.addFieldOffset(2, dictionariesOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startDictionariesVector(builder, numElems) {
                        builder.startVector(24, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset recordBatchesOffset
                     */
                    static addRecordBatches(builder, recordBatchesOffset) {
                        builder.addFieldOffset(3, recordBatchesOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startRecordBatchesVector(builder, numElems) {
                        builder.startVector(24, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endFooter(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset offset
                     */
                    static finishFooterBuffer(builder, offset) {
                        builder.finish(offset);
                    }
                    static createFooter(builder, version, schemaOffset, dictionariesOffset, recordBatchesOffset) {
                        Footer.startFooter(builder);
                        Footer.addVersion(builder, version);
                        Footer.addSchema(builder, schemaOffset);
                        Footer.addDictionaries(builder, dictionariesOffset);
                        Footer.addRecordBatches(builder, recordBatchesOffset);
                        return Footer.endFooter(builder);
                    }
                }
                flatbuf.Footer = Footer;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Block {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Block
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * Index to the start of the RecordBlock (note this is past the Message header)
                     *
                     * @returns flatbuffers.Long
                     */
                    offset() {
                        return this.bb.readInt64(this.bb_pos);
                    }
                    /**
                     * Length of the metadata
                     *
                     * @returns number
                     */
                    metaDataLength() {
                        return this.bb.readInt32(this.bb_pos + 8);
                    }
                    /**
                     * Length of the data (this is aligned so there can be a gap between this and
                     * the metatdata).
                     *
                     * @returns flatbuffers.Long
                     */
                    bodyLength() {
                        return this.bb.readInt64(this.bb_pos + 16);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long offset
                     * @param number metaDataLength
                     * @param flatbuffers.Long bodyLength
                     * @returns flatbuffers.Offset
                     */
                    static createBlock(builder, offset, metaDataLength, bodyLength) {
                        builder.prep(8, 24);
                        builder.writeInt64(bodyLength);
                        builder.pad(4);
                        builder.writeInt32(metaDataLength);
                        builder.writeInt64(offset);
                        return builder.offset();
                    }
                }
                flatbuf.Block = Block;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));



},{"./Schema":"node_modules/apache-arrow/fb/Schema.js"}],"node_modules/apache-arrow/ipc/metadata/file.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:class-name */
const File_ = require("../../fb/File");
const flatbuffers_1 = require("flatbuffers");
var Long = flatbuffers_1.flatbuffers.Long;
var Builder = flatbuffers_1.flatbuffers.Builder;
var ByteBuffer = flatbuffers_1.flatbuffers.ByteBuffer;
var _Block = File_.org.apache.arrow.flatbuf.Block;
var _Footer = File_.org.apache.arrow.flatbuf.Footer;
const schema_1 = require("../../schema");
const enum_1 = require("../../enum");
const buffer_1 = require("../../util/buffer");
/** @ignore */
class Footer_ {
    constructor(schema, version = enum_1.MetadataVersion.V4, recordBatches, dictionaryBatches) {
        this.schema = schema;
        this.version = version;
        recordBatches && (this._recordBatches = recordBatches);
        dictionaryBatches && (this._dictionaryBatches = dictionaryBatches);
    }
    /** @nocollapse */
    static decode(buf) {
        buf = new ByteBuffer(buffer_1.toUint8Array(buf));
        const footer = _Footer.getRootAsFooter(buf);
        const schema = schema_1.Schema.decode(footer.schema());
        return new OffHeapFooter(schema, footer);
    }
    /** @nocollapse */
    static encode(footer) {
        const b = new Builder();
        const schemaOffset = schema_1.Schema.encode(b, footer.schema);
        _Footer.startRecordBatchesVector(b, footer.numRecordBatches);
        [...footer.recordBatches()].slice().reverse().forEach((rb) => FileBlock.encode(b, rb));
        const recordBatchesOffset = b.endVector();
        _Footer.startDictionariesVector(b, footer.numDictionaries);
        [...footer.dictionaryBatches()].slice().reverse().forEach((db) => FileBlock.encode(b, db));
        const dictionaryBatchesOffset = b.endVector();
        _Footer.startFooter(b);
        _Footer.addSchema(b, schemaOffset);
        _Footer.addVersion(b, enum_1.MetadataVersion.V4);
        _Footer.addRecordBatches(b, recordBatchesOffset);
        _Footer.addDictionaries(b, dictionaryBatchesOffset);
        _Footer.finishFooterBuffer(b, _Footer.endFooter(b));
        return b.asUint8Array();
    }
    get numRecordBatches() { return this._recordBatches.length; }
    get numDictionaries() { return this._dictionaryBatches.length; }
    *recordBatches() {
        for (let block, i = -1, n = this.numRecordBatches; ++i < n;) {
            if (block = this.getRecordBatch(i)) {
                yield block;
            }
        }
    }
    *dictionaryBatches() {
        for (let block, i = -1, n = this.numDictionaries; ++i < n;) {
            if (block = this.getDictionaryBatch(i)) {
                yield block;
            }
        }
    }
    getRecordBatch(index) {
        return index >= 0
            && index < this.numRecordBatches
            && this._recordBatches[index] || null;
    }
    getDictionaryBatch(index) {
        return index >= 0
            && index < this.numDictionaries
            && this._dictionaryBatches[index] || null;
    }
}
exports.Footer = Footer_;
/** @ignore */
class OffHeapFooter extends Footer_ {
    constructor(schema, _footer) {
        super(schema, _footer.version());
        this._footer = _footer;
    }
    get numRecordBatches() { return this._footer.recordBatchesLength(); }
    get numDictionaries() { return this._footer.dictionariesLength(); }
    getRecordBatch(index) {
        if (index >= 0 && index < this.numRecordBatches) {
            const fileBlock = this._footer.recordBatches(index);
            if (fileBlock) {
                return FileBlock.decode(fileBlock);
            }
        }
        return null;
    }
    getDictionaryBatch(index) {
        if (index >= 0 && index < this.numDictionaries) {
            const fileBlock = this._footer.dictionaries(index);
            if (fileBlock) {
                return FileBlock.decode(fileBlock);
            }
        }
        return null;
    }
}
/** @ignore */
class FileBlock {
    /** @nocollapse */
    static decode(block) {
        return new FileBlock(block.metaDataLength(), block.bodyLength(), block.offset());
    }
    /** @nocollapse */
    static encode(b, fileBlock) {
        const { metaDataLength } = fileBlock;
        const offset = new Long(fileBlock.offset, 0);
        const bodyLength = new Long(fileBlock.bodyLength, 0);
        return _Block.createBlock(b, offset, metaDataLength, bodyLength);
    }
    constructor(metaDataLength, bodyLength, offset) {
        this.metaDataLength = metaDataLength;
        this.offset = typeof offset === 'number' ? offset : offset.low;
        this.bodyLength = typeof bodyLength === 'number' ? bodyLength : bodyLength.low;
    }
}
exports.FileBlock = FileBlock;



},{"../../fb/File":"node_modules/apache-arrow/fb/File.js","flatbuffers":"node_modules/flatbuffers/js/flatbuffers.mjs","../../schema":"node_modules/apache-arrow/schema.js","../../enum":"node_modules/apache-arrow/enum.js","../../util/buffer":"node_modules/apache-arrow/util/buffer.js"}],"node_modules/apache-arrow/io/stream.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./adapters");
const utf8_1 = require("../util/utf8");
const interfaces_1 = require("./interfaces");
const buffer_1 = require("../util/buffer");
const compat_1 = require("../util/compat");
/** @ignore */
class AsyncByteQueue extends interfaces_1.AsyncQueue {
    write(value) {
        if ((value = buffer_1.toUint8Array(value)).byteLength > 0) {
            return super.write(value);
        }
    }
    toString(sync = false) {
        return sync
            ? utf8_1.decodeUtf8(this.toUint8Array(true))
            : this.toUint8Array(false).then(utf8_1.decodeUtf8);
    }
    toUint8Array(sync = false) {
        return sync ? buffer_1.joinUint8Arrays(this._values)[0] : (async () => {
            let buffers = [], byteLength = 0;
            for await (const chunk of this) {
                buffers.push(chunk);
                byteLength += chunk.byteLength;
            }
            return buffer_1.joinUint8Arrays(buffers, byteLength)[0];
        })();
    }
}
exports.AsyncByteQueue = AsyncByteQueue;
/** @ignore */
class ByteStream {
    constructor(source) {
        if (source) {
            this.source = new ByteStreamSource(adapters_1.default.fromIterable(source));
        }
    }
    [Symbol.iterator]() { return this; }
    next(value) { return this.source.next(value); }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    peek(size) { return this.source.peek(size); }
    read(size) { return this.source.read(size); }
}
exports.ByteStream = ByteStream;
/** @ignore */
class AsyncByteStream {
    constructor(source) {
        if (source instanceof AsyncByteStream) {
            this.source = source.source;
        }
        else if (source instanceof AsyncByteQueue) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromAsyncIterable(source));
        }
        else if (compat_1.isReadableNodeStream(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromNodeStream(source));
        }
        else if (compat_1.isReadableDOMStream(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromDOMStream(source));
        }
        else if (compat_1.isFetchResponse(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromDOMStream(source.body));
        }
        else if (compat_1.isIterable(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromIterable(source));
        }
        else if (compat_1.isPromise(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromAsyncIterable(source));
        }
        else if (compat_1.isAsyncIterable(source)) {
            this.source = new AsyncByteStreamSource(adapters_1.default.fromAsyncIterable(source));
        }
    }
    [Symbol.asyncIterator]() { return this; }
    next(value) { return this.source.next(value); }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    get closed() { return this.source.closed; }
    cancel(reason) { return this.source.cancel(reason); }
    peek(size) { return this.source.peek(size); }
    read(size) { return this.source.read(size); }
}
exports.AsyncByteStream = AsyncByteStream;
/** @ignore */
class ByteStreamSource {
    constructor(source) {
        this.source = source;
    }
    cancel(reason) { this.return(reason); }
    peek(size) { return this.next(size, 'peek').value; }
    read(size) { return this.next(size, 'read').value; }
    next(size, cmd = 'read') { return this.source.next({ cmd, size }); }
    throw(value) { return Object.create((this.source.throw && this.source.throw(value)) || interfaces_1.ITERATOR_DONE); }
    return(value) { return Object.create((this.source.return && this.source.return(value)) || interfaces_1.ITERATOR_DONE); }
}
/** @ignore */
class AsyncByteStreamSource {
    constructor(source) {
        this.source = source;
        this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
    }
    async cancel(reason) { await this.return(reason); }
    get closed() { return this._closedPromise; }
    async read(size) { return (await this.next(size, 'read')).value; }
    async peek(size) { return (await this.next(size, 'peek')).value; }
    async next(size, cmd = 'read') { return (await this.source.next({ cmd, size })); }
    async throw(value) {
        const result = (this.source.throw && await this.source.throw(value)) || interfaces_1.ITERATOR_DONE;
        this._closedPromiseResolve && this._closedPromiseResolve();
        this._closedPromiseResolve = undefined;
        return Object.create(result);
    }
    async return(value) {
        const result = (this.source.return && await this.source.return(value)) || interfaces_1.ITERATOR_DONE;
        this._closedPromiseResolve && this._closedPromiseResolve();
        this._closedPromiseResolve = undefined;
        return Object.create(result);
    }
}



},{"./adapters":"node_modules/apache-arrow/io/adapters.js","../util/utf8":"node_modules/apache-arrow/util/utf8.js","./interfaces":"node_modules/apache-arrow/io/interfaces.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/io/file.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("./stream");
const buffer_1 = require("../util/buffer");
/** @ignore */
class RandomAccessFile extends stream_1.ByteStream {
    constructor(buffer, byteLength) {
        super();
        this.position = 0;
        this.buffer = buffer_1.toUint8Array(buffer);
        this.size = typeof byteLength === 'undefined' ? this.buffer.byteLength : byteLength;
    }
    readInt32(position) {
        const { buffer, byteOffset } = this.readAt(position, 4);
        return new DataView(buffer, byteOffset).getInt32(0, true);
    }
    seek(position) {
        this.position = Math.min(position, this.size);
        return position < this.size;
    }
    read(nBytes) {
        const { buffer, size, position } = this;
        if (buffer && position < size) {
            if (typeof nBytes !== 'number') {
                nBytes = Infinity;
            }
            this.position = Math.min(size, position + Math.min(size - position, nBytes));
            return buffer.subarray(position, this.position);
        }
        return null;
    }
    readAt(position, nBytes) {
        const buf = this.buffer;
        const end = Math.min(this.size, position + nBytes);
        return buf ? buf.subarray(position, end) : new Uint8Array(nBytes);
    }
    close() { this.buffer && (this.buffer = null); }
    throw(value) { this.close(); return { done: true, value }; }
    return(value) { this.close(); return { done: true, value }; }
}
exports.RandomAccessFile = RandomAccessFile;
/** @ignore */
class AsyncRandomAccessFile extends stream_1.AsyncByteStream {
    constructor(file, byteLength) {
        super();
        this.position = 0;
        this._handle = file;
        if (typeof byteLength === 'number') {
            this.size = byteLength;
        }
        else {
            this._pending = (async () => {
                this.size = (await file.stat()).size;
                delete this._pending;
            })();
        }
    }
    async readInt32(position) {
        const { buffer, byteOffset } = await this.readAt(position, 4);
        return new DataView(buffer, byteOffset).getInt32(0, true);
    }
    async seek(position) {
        this._pending && await this._pending;
        this.position = Math.min(position, this.size);
        return position < this.size;
    }
    async read(nBytes) {
        this._pending && await this._pending;
        const { _handle: file, size, position } = this;
        if (file && position < size) {
            if (typeof nBytes !== 'number') {
                nBytes = Infinity;
            }
            let pos = position, offset = 0, bytesRead = 0;
            let end = Math.min(size, pos + Math.min(size - pos, nBytes));
            let buffer = new Uint8Array(Math.max(0, (this.position = end) - pos));
            while ((pos += bytesRead) < end && (offset += bytesRead) < buffer.byteLength) {
                ({ bytesRead } = await file.read(buffer, offset, buffer.byteLength - offset, pos));
            }
            return buffer;
        }
        return null;
    }
    async readAt(position, nBytes) {
        this._pending && await this._pending;
        const { _handle: file, size } = this;
        if (file && (position + nBytes) < size) {
            const end = Math.min(size, position + nBytes);
            const buffer = new Uint8Array(end - position);
            return (await file.read(buffer, 0, nBytes, position)).buffer;
        }
        return new Uint8Array(nBytes);
    }
    async close() { const f = this._handle; this._handle = null; f && await f.close(); }
    async throw(value) { await this.close(); return { done: true, value }; }
    async return(value) { await this.close(); return { done: true, value }; }
}
exports.AsyncRandomAccessFile = AsyncRandomAccessFile;



},{"./stream":"node_modules/apache-arrow/io/stream.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js"}],"node_modules/apache-arrow/util/int.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */
const carryBit16 = 1 << 16;
/** @ignore */
function intAsHex(value) {
    if (value < 0) {
        value = 0xFFFFFFFF + value + 1;
    }
    return `0x${value.toString(16)}`;
}
/** @ignore */
const kInt32DecimalDigits = 8;
/** @ignore */
const kPowersOfTen = [1,
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    100000000];
/** @ignore */
class BaseInt64 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    high() { return this.buffer[1]; }
    low() { return this.buffer[0]; }
    _times(other) {
        // Break the left and right numbers into 16 bit chunks
        // so that we can multiply them without overflow.
        const L = new Uint32Array([
            this.buffer[1] >>> 16,
            this.buffer[1] & 0xFFFF,
            this.buffer[0] >>> 16,
            this.buffer[0] & 0xFFFF
        ]);
        const R = new Uint32Array([
            other.buffer[1] >>> 16,
            other.buffer[1] & 0xFFFF,
            other.buffer[0] >>> 16,
            other.buffer[0] & 0xFFFF
        ]);
        let product = L[3] * R[3];
        this.buffer[0] = product & 0xFFFF;
        let sum = product >>> 16;
        product = L[2] * R[3];
        sum += product;
        product = (L[3] * R[2]) >>> 0;
        sum += product;
        this.buffer[0] += sum << 16;
        this.buffer[1] = (sum >>> 0 < product ? carryBit16 : 0);
        this.buffer[1] += sum >>> 16;
        this.buffer[1] += L[1] * R[3] + L[2] * R[2] + L[3] * R[1];
        this.buffer[1] += (L[0] * R[3] + L[1] * R[2] + L[2] * R[1] + L[3] * R[0]) << 16;
        return this;
    }
    _plus(other) {
        const sum = (this.buffer[0] + other.buffer[0]) >>> 0;
        this.buffer[1] += other.buffer[1];
        if (sum < (this.buffer[0] >>> 0)) {
            ++this.buffer[1];
        }
        this.buffer[0] = sum;
    }
    lessThan(other) {
        return this.buffer[1] < other.buffer[1] ||
            (this.buffer[1] === other.buffer[1] && this.buffer[0] < other.buffer[0]);
    }
    equals(other) {
        return this.buffer[1] === other.buffer[1] && this.buffer[0] == other.buffer[0];
    }
    greaterThan(other) {
        return other.lessThan(this);
    }
    hex() {
        return `${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
    }
}
exports.BaseInt64 = BaseInt64;
/** @ignore */
class Uint64 extends BaseInt64 {
    times(other) {
        this._times(other);
        return this;
    }
    plus(other) {
        this._plus(other);
        return this;
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(2)) {
        return Uint64.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(2)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Uint64.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(2)) {
        const length = str.length;
        let out = new Uint64(out_buffer);
        for (let posn = 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Uint64(new Uint32Array([parseInt(str.substr(posn, group), 10), 0]));
            const multiple = new Uint64(new Uint32Array([kPowersOfTen[group], 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return out;
    }
    /** @nocollapse */
    static convertArray(values) {
        const data = new Uint32Array(values.length * 2);
        for (let i = -1, n = values.length; ++i < n;) {
            Uint64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
        }
        return data;
    }
    /** @nocollapse */
    static multiply(left, right) {
        let rtrn = new Uint64(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        let rtrn = new Uint64(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
}
exports.Uint64 = Uint64;
/** @ignore */
class Int64 extends BaseInt64 {
    negate() {
        this.buffer[0] = ~this.buffer[0] + 1;
        this.buffer[1] = ~this.buffer[1];
        if (this.buffer[0] == 0) {
            ++this.buffer[1];
        }
        return this;
    }
    times(other) {
        this._times(other);
        return this;
    }
    plus(other) {
        this._plus(other);
        return this;
    }
    lessThan(other) {
        // force high bytes to be signed
        const this_high = this.buffer[1] << 0;
        const other_high = other.buffer[1] << 0;
        return this_high < other_high ||
            (this_high === other_high && this.buffer[0] < other.buffer[0]);
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(2)) {
        return Int64.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(2)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Int64.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(2)) {
        // TODO: Assert that out_buffer is 0 and length = 2
        const negate = str.startsWith('-');
        const length = str.length;
        let out = new Int64(out_buffer);
        for (let posn = negate ? 1 : 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Int64(new Uint32Array([parseInt(str.substr(posn, group), 10), 0]));
            const multiple = new Int64(new Uint32Array([kPowersOfTen[group], 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return negate ? out.negate() : out;
    }
    /** @nocollapse */
    static convertArray(values) {
        const data = new Uint32Array(values.length * 2);
        for (let i = -1, n = values.length; ++i < n;) {
            Int64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
        }
        return data;
    }
    /** @nocollapse */
    static multiply(left, right) {
        let rtrn = new Int64(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        let rtrn = new Int64(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
}
exports.Int64 = Int64;
/** @ignore */
class Int128 {
    constructor(buffer) {
        this.buffer = buffer;
        // buffer[3] MSB (high)
        // buffer[2]
        // buffer[1]
        // buffer[0] LSB (low)
    }
    high() {
        return new Int64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
    }
    low() {
        return new Int64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
    }
    negate() {
        this.buffer[0] = ~this.buffer[0] + 1;
        this.buffer[1] = ~this.buffer[1];
        this.buffer[2] = ~this.buffer[2];
        this.buffer[3] = ~this.buffer[3];
        if (this.buffer[0] == 0) {
            ++this.buffer[1];
        }
        if (this.buffer[1] == 0) {
            ++this.buffer[2];
        }
        if (this.buffer[2] == 0) {
            ++this.buffer[3];
        }
        return this;
    }
    times(other) {
        // Break the left and right numbers into 32 bit chunks
        // so that we can multiply them without overflow.
        const L0 = new Uint64(new Uint32Array([this.buffer[3], 0]));
        const L1 = new Uint64(new Uint32Array([this.buffer[2], 0]));
        const L2 = new Uint64(new Uint32Array([this.buffer[1], 0]));
        const L3 = new Uint64(new Uint32Array([this.buffer[0], 0]));
        const R0 = new Uint64(new Uint32Array([other.buffer[3], 0]));
        const R1 = new Uint64(new Uint32Array([other.buffer[2], 0]));
        const R2 = new Uint64(new Uint32Array([other.buffer[1], 0]));
        const R3 = new Uint64(new Uint32Array([other.buffer[0], 0]));
        let product = Uint64.multiply(L3, R3);
        this.buffer[0] = product.low();
        let sum = new Uint64(new Uint32Array([product.high(), 0]));
        product = Uint64.multiply(L2, R3);
        sum.plus(product);
        product = Uint64.multiply(L3, R2);
        sum.plus(product);
        this.buffer[1] = sum.low();
        this.buffer[3] = (sum.lessThan(product) ? 1 : 0);
        this.buffer[2] = sum.high();
        let high = new Uint64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
        high.plus(Uint64.multiply(L1, R3))
            .plus(Uint64.multiply(L2, R2))
            .plus(Uint64.multiply(L3, R1));
        this.buffer[3] += Uint64.multiply(L0, R3)
            .plus(Uint64.multiply(L1, R2))
            .plus(Uint64.multiply(L2, R1))
            .plus(Uint64.multiply(L3, R0)).low();
        return this;
    }
    plus(other) {
        let sums = new Uint32Array(4);
        sums[3] = (this.buffer[3] + other.buffer[3]) >>> 0;
        sums[2] = (this.buffer[2] + other.buffer[2]) >>> 0;
        sums[1] = (this.buffer[1] + other.buffer[1]) >>> 0;
        sums[0] = (this.buffer[0] + other.buffer[0]) >>> 0;
        if (sums[0] < (this.buffer[0] >>> 0)) {
            ++sums[1];
        }
        if (sums[1] < (this.buffer[1] >>> 0)) {
            ++sums[2];
        }
        if (sums[2] < (this.buffer[2] >>> 0)) {
            ++sums[3];
        }
        this.buffer[3] = sums[3];
        this.buffer[2] = sums[2];
        this.buffer[1] = sums[1];
        this.buffer[0] = sums[0];
        return this;
    }
    hex() {
        return `${intAsHex(this.buffer[3])} ${intAsHex(this.buffer[2])} ${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
    }
    /** @nocollapse */
    static multiply(left, right) {
        let rtrn = new Int128(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        let rtrn = new Int128(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(4)) {
        return Int128.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(4)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Int128.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(4)) {
        // TODO: Assert that out_buffer is 0 and length = 4
        const negate = str.startsWith('-');
        const length = str.length;
        let out = new Int128(out_buffer);
        for (let posn = negate ? 1 : 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Int128(new Uint32Array([parseInt(str.substr(posn, group), 10), 0, 0, 0]));
            const multiple = new Int128(new Uint32Array([kPowersOfTen[group], 0, 0, 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return negate ? out.negate() : out;
    }
    /** @nocollapse */
    static convertArray(values) {
        // TODO: Distinguish between string and number at compile-time
        const data = new Uint32Array(values.length * 4);
        for (let i = -1, n = values.length; ++i < n;) {
            Int128.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 4 * 4 * i, 4));
        }
        return data;
    }
}
exports.Int128 = Int128;



},{}],"node_modules/apache-arrow/visitor/vectorloader.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const schema_1 = require("../schema");
const type_1 = require("../type");
const visitor_1 = require("../visitor");
const bit_1 = require("../util/bit");
const utf8_1 = require("../util/utf8");
const int_1 = require("../util/int");
const enum_1 = require("../enum");
const buffer_1 = require("../util/buffer");
/** @ignore */
class VectorLoader extends visitor_1.Visitor {
    constructor(bytes, nodes, buffers, dictionaries) {
        super();
        this.nodesIndex = -1;
        this.buffersIndex = -1;
        this.bytes = bytes;
        this.nodes = nodes;
        this.buffers = buffers;
        this.dictionaries = dictionaries;
    }
    visit(node) {
        return super.visit(node instanceof schema_1.Field ? node.type : node);
    }
    visitNull(type, { length, } = this.nextFieldNode()) { return data_1.Data.Null(type, 0, length); }
    visitBool(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Bool(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitInt(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Int(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitFloat(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Float(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitUtf8(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Utf8(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.readData(type)); }
    visitBinary(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Binary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.readData(type)); }
    visitFixedSizeBinary(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.FixedSizeBinary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitDate(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Date(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitTimestamp(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Timestamp(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitTime(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Time(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitDecimal(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Decimal(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitList(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.List(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.visit(type.children[0])); }
    visitStruct(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Struct(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.visitMany(type.children)); }
    visitUnion(type) { return type.mode === enum_1.UnionMode.Sparse ? this.visitSparseUnion(type) : this.visitDenseUnion(type); }
    visitDenseUnion(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Union(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readTypeIds(type), this.readOffsets(type), this.visitMany(type.children)); }
    visitSparseUnion(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Union(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readTypeIds(type), this.visitMany(type.children)); }
    visitDictionary(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Dictionary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type.indices), this.readDictionary(type)); }
    visitInterval(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Interval(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitFixedSizeList(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.FixedSizeList(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.visit(type.children[0])); }
    visitMap(type, { length, nullCount } = this.nextFieldNode()) { return data_1.Data.Map(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.visit(type.children[0])); }
    nextFieldNode() { return this.nodes[++this.nodesIndex]; }
    nextBufferRange() { return this.buffers[++this.buffersIndex]; }
    readNullBitmap(type, nullCount, buffer = this.nextBufferRange()) {
        return nullCount > 0 && this.readData(type, buffer) || new Uint8Array(0);
    }
    readOffsets(type, buffer) { return this.readData(type, buffer); }
    readTypeIds(type, buffer) { return this.readData(type, buffer); }
    readData(_type, { length, offset } = this.nextBufferRange()) {
        return this.bytes.subarray(offset, offset + length);
    }
    readDictionary(type) {
        return this.dictionaries.get(type.id);
    }
}
exports.VectorLoader = VectorLoader;
/** @ignore */
class JSONVectorLoader extends VectorLoader {
    constructor(sources, nodes, buffers, dictionaries) {
        super(new Uint8Array(0), nodes, buffers, dictionaries);
        this.sources = sources;
    }
    readNullBitmap(_type, nullCount, { offset } = this.nextBufferRange()) {
        return nullCount <= 0 ? new Uint8Array(0) : bit_1.packBools(this.sources[offset]);
    }
    readOffsets(_type, { offset } = this.nextBufferRange()) {
        return buffer_1.toArrayBufferView(Uint8Array, buffer_1.toArrayBufferView(Int32Array, this.sources[offset]));
    }
    readTypeIds(type, { offset } = this.nextBufferRange()) {
        return buffer_1.toArrayBufferView(Uint8Array, buffer_1.toArrayBufferView(type.ArrayType, this.sources[offset]));
    }
    readData(type, { offset } = this.nextBufferRange()) {
        const { sources } = this;
        if (type_1.DataType.isTimestamp(type)) {
            return buffer_1.toArrayBufferView(Uint8Array, int_1.Int64.convertArray(sources[offset]));
        }
        else if ((type_1.DataType.isInt(type) || type_1.DataType.isTime(type)) && type.bitWidth === 64) {
            return buffer_1.toArrayBufferView(Uint8Array, int_1.Int64.convertArray(sources[offset]));
        }
        else if (type_1.DataType.isDate(type) && type.unit === enum_1.DateUnit.MILLISECOND) {
            return buffer_1.toArrayBufferView(Uint8Array, int_1.Int64.convertArray(sources[offset]));
        }
        else if (type_1.DataType.isDecimal(type)) {
            return buffer_1.toArrayBufferView(Uint8Array, int_1.Int128.convertArray(sources[offset]));
        }
        else if (type_1.DataType.isBinary(type) || type_1.DataType.isFixedSizeBinary(type)) {
            return binaryDataFromJSON(sources[offset]);
        }
        else if (type_1.DataType.isBool(type)) {
            return bit_1.packBools(sources[offset]);
        }
        else if (type_1.DataType.isUtf8(type)) {
            return utf8_1.encodeUtf8(sources[offset].join(''));
        }
        return buffer_1.toArrayBufferView(Uint8Array, buffer_1.toArrayBufferView(type.ArrayType, sources[offset].map((x) => +x)));
    }
}
exports.JSONVectorLoader = JSONVectorLoader;
/** @ignore */
function binaryDataFromJSON(values) {
    // "DATA": ["49BC7D5B6C47D2","3F5FB6D9322026"]
    // There are definitely more efficient ways to do this... but it gets the
    // job done.
    const joined = values.join('');
    const data = new Uint8Array(joined.length / 2);
    for (let i = 0; i < joined.length; i += 2) {
        data[i >> 1] = parseInt(joined.substr(i, 2), 16);
    }
    return data;
}



},{"../data":"node_modules/apache-arrow/data.js","../schema":"node_modules/apache-arrow/schema.js","../type":"node_modules/apache-arrow/type.js","../visitor":"node_modules/apache-arrow/visitor.js","../util/bit":"node_modules/apache-arrow/util/bit.js","../util/utf8":"node_modules/apache-arrow/util/utf8.js","../util/int":"node_modules/apache-arrow/util/int.js","../enum":"node_modules/apache-arrow/enum.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js"}],"node_modules/apache-arrow/visitor/typeassembler.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const flatbuffers_1 = require("flatbuffers");
var Long = flatbuffers_1.flatbuffers.Long;
const Schema_ = require("../fb/Schema");
const visitor_1 = require("../visitor");
var Null = Schema_.org.apache.arrow.flatbuf.Null;
var Int = Schema_.org.apache.arrow.flatbuf.Int;
var FloatingPoint = Schema_.org.apache.arrow.flatbuf.FloatingPoint;
var Binary = Schema_.org.apache.arrow.flatbuf.Binary;
var Bool = Schema_.org.apache.arrow.flatbuf.Bool;
var Utf8 = Schema_.org.apache.arrow.flatbuf.Utf8;
var Decimal = Schema_.org.apache.arrow.flatbuf.Decimal;
var Date = Schema_.org.apache.arrow.flatbuf.Date;
var Time = Schema_.org.apache.arrow.flatbuf.Time;
var Timestamp = Schema_.org.apache.arrow.flatbuf.Timestamp;
var Interval = Schema_.org.apache.arrow.flatbuf.Interval;
var List = Schema_.org.apache.arrow.flatbuf.List;
var Struct = Schema_.org.apache.arrow.flatbuf.Struct_;
var Union = Schema_.org.apache.arrow.flatbuf.Union;
var DictionaryEncoding = Schema_.org.apache.arrow.flatbuf.DictionaryEncoding;
var FixedSizeBinary = Schema_.org.apache.arrow.flatbuf.FixedSizeBinary;
var FixedSizeList = Schema_.org.apache.arrow.flatbuf.FixedSizeList;
var Map_ = Schema_.org.apache.arrow.flatbuf.Map;
/** @ignore */
class TypeAssembler extends visitor_1.Visitor {
    visit(node, builder) {
        return (node == null || builder == null) ? undefined : super.visit(node, builder);
    }
    visitNull(_node, b) {
        Null.startNull(b);
        return Null.endNull(b);
    }
    visitInt(node, b) {
        Int.startInt(b);
        Int.addBitWidth(b, node.bitWidth);
        Int.addIsSigned(b, node.isSigned);
        return Int.endInt(b);
    }
    visitFloat(node, b) {
        FloatingPoint.startFloatingPoint(b);
        FloatingPoint.addPrecision(b, node.precision);
        return FloatingPoint.endFloatingPoint(b);
    }
    visitBinary(_node, b) {
        Binary.startBinary(b);
        return Binary.endBinary(b);
    }
    visitBool(_node, b) {
        Bool.startBool(b);
        return Bool.endBool(b);
    }
    visitUtf8(_node, b) {
        Utf8.startUtf8(b);
        return Utf8.endUtf8(b);
    }
    visitDecimal(node, b) {
        Decimal.startDecimal(b);
        Decimal.addScale(b, node.scale);
        Decimal.addPrecision(b, node.precision);
        return Decimal.endDecimal(b);
    }
    visitDate(node, b) {
        Date.startDate(b);
        Date.addUnit(b, node.unit);
        return Date.endDate(b);
    }
    visitTime(node, b) {
        Time.startTime(b);
        Time.addUnit(b, node.unit);
        Time.addBitWidth(b, node.bitWidth);
        return Time.endTime(b);
    }
    visitTimestamp(node, b) {
        const timezone = (node.timezone && b.createString(node.timezone)) || undefined;
        Timestamp.startTimestamp(b);
        Timestamp.addUnit(b, node.unit);
        if (timezone !== undefined) {
            Timestamp.addTimezone(b, timezone);
        }
        return Timestamp.endTimestamp(b);
    }
    visitInterval(node, b) {
        Interval.startInterval(b);
        Interval.addUnit(b, node.unit);
        return Interval.endInterval(b);
    }
    visitList(_node, b) {
        List.startList(b);
        return List.endList(b);
    }
    visitStruct(_node, b) {
        Struct.startStruct_(b);
        return Struct.endStruct_(b);
    }
    visitUnion(node, b) {
        Union.startTypeIdsVector(b, node.typeIds.length);
        const typeIds = Union.createTypeIdsVector(b, node.typeIds);
        Union.startUnion(b);
        Union.addMode(b, node.mode);
        Union.addTypeIds(b, typeIds);
        return Union.endUnion(b);
    }
    visitDictionary(node, b) {
        const indexType = this.visit(node.indices, b);
        DictionaryEncoding.startDictionaryEncoding(b);
        DictionaryEncoding.addId(b, new Long(node.id, 0));
        DictionaryEncoding.addIsOrdered(b, node.isOrdered);
        if (indexType !== undefined) {
            DictionaryEncoding.addIndexType(b, indexType);
        }
        return DictionaryEncoding.endDictionaryEncoding(b);
    }
    visitFixedSizeBinary(node, b) {
        FixedSizeBinary.startFixedSizeBinary(b);
        FixedSizeBinary.addByteWidth(b, node.byteWidth);
        return FixedSizeBinary.endFixedSizeBinary(b);
    }
    visitFixedSizeList(node, b) {
        FixedSizeList.startFixedSizeList(b);
        FixedSizeList.addListSize(b, node.listSize);
        return FixedSizeList.endFixedSizeList(b);
    }
    visitMap(node, b) {
        Map_.startMap(b);
        Map_.addKeysSorted(b, node.keysSorted);
        return Map_.endMap(b);
    }
}
exports.TypeAssembler = TypeAssembler;
/** @ignore */
exports.instance = new TypeAssembler();



},{"flatbuffers":"node_modules/flatbuffers/js/flatbuffers.mjs","../fb/Schema":"node_modules/apache-arrow/fb/Schema.js","../visitor":"node_modules/apache-arrow/visitor.js"}],"node_modules/apache-arrow/ipc/metadata/json.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../schema");
const type_1 = require("../../type");
const message_1 = require("./message");
const enum_1 = require("../../enum");
/** @ignore */
function schemaFromJSON(_schema, dictionaries = new Map()) {
    return new schema_1.Schema(schemaFieldsFromJSON(_schema, dictionaries), customMetadataFromJSON(_schema['customMetadata']), dictionaries);
}
exports.schemaFromJSON = schemaFromJSON;
/** @ignore */
function recordBatchFromJSON(b) {
    return new message_1.RecordBatch(b['count'], fieldNodesFromJSON(b['columns']), buffersFromJSON(b['columns']));
}
exports.recordBatchFromJSON = recordBatchFromJSON;
/** @ignore */
function dictionaryBatchFromJSON(b) {
    return new message_1.DictionaryBatch(recordBatchFromJSON(b['data']), b['id'], b['isDelta']);
}
exports.dictionaryBatchFromJSON = dictionaryBatchFromJSON;
/** @ignore */
function schemaFieldsFromJSON(_schema, dictionaries) {
    return (_schema['fields'] || []).filter(Boolean).map((f) => schema_1.Field.fromJSON(f, dictionaries));
}
/** @ignore */
function fieldChildrenFromJSON(_field, dictionaries) {
    return (_field['children'] || []).filter(Boolean).map((f) => schema_1.Field.fromJSON(f, dictionaries));
}
/** @ignore */
function fieldNodesFromJSON(xs) {
    return (xs || []).reduce((fieldNodes, column) => [
        ...fieldNodes,
        new message_1.FieldNode(column['count'], nullCountFromJSON(column['VALIDITY'])),
        ...fieldNodesFromJSON(column['children'])
    ], []);
}
/** @ignore */
function buffersFromJSON(xs, buffers = []) {
    for (let i = -1, n = (xs || []).length; ++i < n;) {
        const column = xs[i];
        column['VALIDITY'] && buffers.push(new message_1.BufferRegion(buffers.length, column['VALIDITY'].length));
        column['TYPE'] && buffers.push(new message_1.BufferRegion(buffers.length, column['TYPE'].length));
        column['OFFSET'] && buffers.push(new message_1.BufferRegion(buffers.length, column['OFFSET'].length));
        column['DATA'] && buffers.push(new message_1.BufferRegion(buffers.length, column['DATA'].length));
        buffers = buffersFromJSON(column['children'], buffers);
    }
    return buffers;
}
/** @ignore */
function nullCountFromJSON(validity) {
    return (validity || []).reduce((sum, val) => sum + +(val === 0), 0);
}
/** @ignore */
function fieldFromJSON(_field, dictionaries) {
    let id;
    let keys;
    let field;
    let dictMeta;
    let type;
    let dictType;
    // If no dictionary encoding
    if (!dictionaries || !(dictMeta = _field['dictionary'])) {
        type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries));
        field = new schema_1.Field(_field['name'], type, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    // tslint:disable
    // If dictionary encoded and the first time we've seen this dictionary id, decode
    // the data type and child fields, then wrap in a Dictionary type and insert the
    // data type into the dictionary types map.
    else if (!dictionaries.has(id = dictMeta['id'])) {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta['indexType']) ? indexTypeFromJSON(keys) : new type_1.Int32();
        dictionaries.set(id, type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries)));
        dictType = new type_1.Dictionary(type, keys, id, dictMeta['isOrdered']);
        field = new schema_1.Field(_field['name'], dictType, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    // If dictionary encoded, and have already seen this dictionary Id in the schema, then reuse the
    // data type and wrap in a new Dictionary type and field.
    else {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta['indexType']) ? indexTypeFromJSON(keys) : new type_1.Int32();
        dictType = new type_1.Dictionary(dictionaries.get(id), keys, id, dictMeta['isOrdered']);
        field = new schema_1.Field(_field['name'], dictType, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    return field || null;
}
exports.fieldFromJSON = fieldFromJSON;
/** @ignore */
function customMetadataFromJSON(_metadata) {
    return new Map(Object.entries(_metadata || {}));
}
/** @ignore */
function indexTypeFromJSON(_type) {
    return new type_1.Int(_type['isSigned'], _type['bitWidth']);
}
/** @ignore */
function typeFromJSON(f, children) {
    const typeId = f['type']['name'];
    switch (typeId) {
        case 'NONE': return new type_1.Null();
        case 'null': return new type_1.Null();
        case 'binary': return new type_1.Binary();
        case 'utf8': return new type_1.Utf8();
        case 'bool': return new type_1.Bool();
        case 'list': return new type_1.List((children || [])[0]);
        case 'struct': return new type_1.Struct(children || []);
        case 'struct_': return new type_1.Struct(children || []);
    }
    switch (typeId) {
        case 'int': {
            const t = f['type'];
            return new type_1.Int(t['isSigned'], t['bitWidth']);
        }
        case 'floatingpoint': {
            const t = f['type'];
            return new type_1.Float(enum_1.Precision[t['precision']]);
        }
        case 'decimal': {
            const t = f['type'];
            return new type_1.Decimal(t['scale'], t['precision']);
        }
        case 'date': {
            const t = f['type'];
            return new type_1.Date_(enum_1.DateUnit[t['unit']]);
        }
        case 'time': {
            const t = f['type'];
            return new type_1.Time(enum_1.TimeUnit[t['unit']], t['bitWidth']);
        }
        case 'timestamp': {
            const t = f['type'];
            return new type_1.Timestamp(enum_1.TimeUnit[t['unit']], t['timezone']);
        }
        case 'interval': {
            const t = f['type'];
            return new type_1.Interval(enum_1.IntervalUnit[t['unit']]);
        }
        case 'union': {
            const t = f['type'];
            return new type_1.Union(enum_1.UnionMode[t['mode']], (t['typeIds'] || []), children || []);
        }
        case 'fixedsizebinary': {
            const t = f['type'];
            return new type_1.FixedSizeBinary(t['byteWidth']);
        }
        case 'fixedsizelist': {
            const t = f['type'];
            return new type_1.FixedSizeList(t['listSize'], (children || [])[0]);
        }
        case 'map': {
            const t = f['type'];
            return new type_1.Map_((children || [])[0], t['keysSorted']);
        }
    }
    throw new Error(`Unrecognized type: "${typeId}"`);
}



},{"../../schema":"node_modules/apache-arrow/schema.js","../../type":"node_modules/apache-arrow/type.js","./message":"node_modules/apache-arrow/ipc/metadata/message.js","../../enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/ipc/metadata/message.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const flatbuffers_1 = require("flatbuffers");
const Schema_ = require("../../fb/Schema");
const Message_ = require("../../fb/Message");
const schema_1 = require("../../schema");
const buffer_1 = require("../../util/buffer");
const enum_1 = require("../../enum");
const typeassembler_1 = require("../../visitor/typeassembler");
const json_1 = require("./json");
var Long = flatbuffers_1.flatbuffers.Long;
var Builder = flatbuffers_1.flatbuffers.Builder;
var ByteBuffer = flatbuffers_1.flatbuffers.ByteBuffer;
var Type = Schema_.org.apache.arrow.flatbuf.Type;
var _Field = Schema_.org.apache.arrow.flatbuf.Field;
var _Schema = Schema_.org.apache.arrow.flatbuf.Schema;
var _Buffer = Schema_.org.apache.arrow.flatbuf.Buffer;
var _Message = Message_.org.apache.arrow.flatbuf.Message;
var _KeyValue = Schema_.org.apache.arrow.flatbuf.KeyValue;
var _FieldNode = Message_.org.apache.arrow.flatbuf.FieldNode;
var _Endianness = Schema_.org.apache.arrow.flatbuf.Endianness;
var _RecordBatch = Message_.org.apache.arrow.flatbuf.RecordBatch;
var _DictionaryBatch = Message_.org.apache.arrow.flatbuf.DictionaryBatch;
const type_1 = require("../../type");
/**
 * @ignore
 * @private
 **/
class Message {
    constructor(bodyLength, version, headerType, header) {
        this._version = version;
        this._headerType = headerType;
        this.body = new Uint8Array(0);
        header && (this._createHeader = () => header);
        this._bodyLength = typeof bodyLength === 'number' ? bodyLength : bodyLength.low;
    }
    /** @nocollapse */
    static fromJSON(msg, headerType) {
        const message = new Message(0, enum_1.MetadataVersion.V4, headerType);
        message._createHeader = messageHeaderFromJSON(msg, headerType);
        return message;
    }
    /** @nocollapse */
    static decode(buf) {
        buf = new ByteBuffer(buffer_1.toUint8Array(buf));
        const _message = _Message.getRootAsMessage(buf);
        const bodyLength = _message.bodyLength();
        const version = _message.version();
        const headerType = _message.headerType();
        const message = new Message(bodyLength, version, headerType);
        message._createHeader = decodeMessageHeader(_message, headerType);
        return message;
    }
    /** @nocollapse */
    static encode(message) {
        let b = new Builder(), headerOffset = -1;
        if (message.isSchema()) {
            headerOffset = schema_1.Schema.encode(b, message.header());
        }
        else if (message.isRecordBatch()) {
            headerOffset = RecordBatch.encode(b, message.header());
        }
        else if (message.isDictionaryBatch()) {
            headerOffset = DictionaryBatch.encode(b, message.header());
        }
        _Message.startMessage(b);
        _Message.addVersion(b, enum_1.MetadataVersion.V4);
        _Message.addHeader(b, headerOffset);
        _Message.addHeaderType(b, message.headerType);
        _Message.addBodyLength(b, new Long(message.bodyLength, 0));
        _Message.finishMessageBuffer(b, _Message.endMessage(b));
        return b.asUint8Array();
    }
    /** @nocollapse */
    static from(header, bodyLength = 0) {
        if (header instanceof schema_1.Schema) {
            return new Message(0, enum_1.MetadataVersion.V4, enum_1.MessageHeader.Schema, header);
        }
        if (header instanceof RecordBatch) {
            return new Message(bodyLength, enum_1.MetadataVersion.V4, enum_1.MessageHeader.RecordBatch, header);
        }
        if (header instanceof DictionaryBatch) {
            return new Message(bodyLength, enum_1.MetadataVersion.V4, enum_1.MessageHeader.DictionaryBatch, header);
        }
        throw new Error(`Unrecognized Message header: ${header}`);
    }
    get type() { return this.headerType; }
    get version() { return this._version; }
    get headerType() { return this._headerType; }
    get bodyLength() { return this._bodyLength; }
    header() { return this._createHeader(); }
    isSchema() { return this.headerType === enum_1.MessageHeader.Schema; }
    isRecordBatch() { return this.headerType === enum_1.MessageHeader.RecordBatch; }
    isDictionaryBatch() { return this.headerType === enum_1.MessageHeader.DictionaryBatch; }
}
exports.Message = Message;
/**
 * @ignore
 * @private
 **/
class RecordBatch {
    get nodes() { return this._nodes; }
    get length() { return this._length; }
    get buffers() { return this._buffers; }
    constructor(length, nodes, buffers) {
        this._nodes = nodes;
        this._buffers = buffers;
        this._length = typeof length === 'number' ? length : length.low;
    }
}
exports.RecordBatch = RecordBatch;
/**
 * @ignore
 * @private
 **/
class DictionaryBatch {
    get id() { return this._id; }
    get data() { return this._data; }
    get isDelta() { return this._isDelta; }
    get length() { return this.data.length; }
    get nodes() { return this.data.nodes; }
    get buffers() { return this.data.buffers; }
    constructor(data, id, isDelta = false) {
        this._data = data;
        this._isDelta = isDelta;
        this._id = typeof id === 'number' ? id : id.low;
    }
}
exports.DictionaryBatch = DictionaryBatch;
/**
 * @ignore
 * @private
 **/
class BufferRegion {
    constructor(offset, length) {
        this.offset = typeof offset === 'number' ? offset : offset.low;
        this.length = typeof length === 'number' ? length : length.low;
    }
}
exports.BufferRegion = BufferRegion;
/**
 * @ignore
 * @private
 **/
class FieldNode {
    constructor(length, nullCount) {
        this.length = typeof length === 'number' ? length : length.low;
        this.nullCount = typeof nullCount === 'number' ? nullCount : nullCount.low;
    }
}
exports.FieldNode = FieldNode;
/** @ignore */
function messageHeaderFromJSON(message, type) {
    return (() => {
        switch (type) {
            case enum_1.MessageHeader.Schema: return schema_1.Schema.fromJSON(message);
            case enum_1.MessageHeader.RecordBatch: return RecordBatch.fromJSON(message);
            case enum_1.MessageHeader.DictionaryBatch: return DictionaryBatch.fromJSON(message);
        }
        throw new Error(`Unrecognized Message type: { name: ${enum_1.MessageHeader[type]}, type: ${type} }`);
    });
}
/** @ignore */
function decodeMessageHeader(message, type) {
    return (() => {
        switch (type) {
            case enum_1.MessageHeader.Schema: return schema_1.Schema.decode(message.header(new _Schema()));
            case enum_1.MessageHeader.RecordBatch: return RecordBatch.decode(message.header(new _RecordBatch()), message.version());
            case enum_1.MessageHeader.DictionaryBatch: return DictionaryBatch.decode(message.header(new _DictionaryBatch()), message.version());
        }
        throw new Error(`Unrecognized Message type: { name: ${enum_1.MessageHeader[type]}, type: ${type} }`);
    });
}
schema_1.Field['encode'] = encodeField;
schema_1.Field['decode'] = decodeField;
schema_1.Field['fromJSON'] = json_1.fieldFromJSON;
schema_1.Schema['encode'] = encodeSchema;
schema_1.Schema['decode'] = decodeSchema;
schema_1.Schema['fromJSON'] = json_1.schemaFromJSON;
RecordBatch['encode'] = encodeRecordBatch;
RecordBatch['decode'] = decodeRecordBatch;
RecordBatch['fromJSON'] = json_1.recordBatchFromJSON;
DictionaryBatch['encode'] = encodeDictionaryBatch;
DictionaryBatch['decode'] = decodeDictionaryBatch;
DictionaryBatch['fromJSON'] = json_1.dictionaryBatchFromJSON;
FieldNode['encode'] = encodeFieldNode;
FieldNode['decode'] = decodeFieldNode;
BufferRegion['encode'] = encodeBufferRegion;
BufferRegion['decode'] = decodeBufferRegion;
/** @ignore */
function decodeSchema(_schema, dictionaries = new Map()) {
    const fields = decodeSchemaFields(_schema, dictionaries);
    return new schema_1.Schema(fields, decodeCustomMetadata(_schema), dictionaries);
}
/** @ignore */
function decodeRecordBatch(batch, version = enum_1.MetadataVersion.V4) {
    return new RecordBatch(batch.length(), decodeFieldNodes(batch), decodeBuffers(batch, version));
}
/** @ignore */
function decodeDictionaryBatch(batch, version = enum_1.MetadataVersion.V4) {
    return new DictionaryBatch(RecordBatch.decode(batch.data(), version), batch.id(), batch.isDelta());
}
/** @ignore */
function decodeBufferRegion(b) {
    return new BufferRegion(b.offset(), b.length());
}
/** @ignore */
function decodeFieldNode(f) {
    return new FieldNode(f.length(), f.nullCount());
}
/** @ignore */
function decodeFieldNodes(batch) {
    const nodes = [];
    for (let f, i = -1, j = -1, n = batch.nodesLength(); ++i < n;) {
        if (f = batch.nodes(i)) {
            nodes[++j] = FieldNode.decode(f);
        }
    }
    return nodes;
}
/** @ignore */
function decodeBuffers(batch, version) {
    const bufferRegions = [];
    for (let b, i = -1, j = -1, n = batch.buffersLength(); ++i < n;) {
        if (b = batch.buffers(i)) {
            // If this Arrow buffer was written before version 4,
            // advance the buffer's bb_pos 8 bytes to skip past
            // the now-removed page_id field
            if (version < enum_1.MetadataVersion.V4) {
                b.bb_pos += (8 * (i + 1));
            }
            bufferRegions[++j] = BufferRegion.decode(b);
        }
    }
    return bufferRegions;
}
/** @ignore */
function decodeSchemaFields(schema, dictionaries) {
    const fields = [];
    for (let f, i = -1, j = -1, n = schema.fieldsLength(); ++i < n;) {
        if (f = schema.fields(i)) {
            fields[++j] = schema_1.Field.decode(f, dictionaries);
        }
    }
    return fields;
}
/** @ignore */
function decodeFieldChildren(field, dictionaries) {
    const children = [];
    for (let f, i = -1, j = -1, n = field.childrenLength(); ++i < n;) {
        if (f = field.children(i)) {
            children[++j] = schema_1.Field.decode(f, dictionaries);
        }
    }
    return children;
}
/** @ignore */
function decodeField(f, dictionaries) {
    let id;
    let field;
    let type;
    let keys;
    let dictType;
    let dictMeta;
    // If no dictionary encoding
    if (!dictionaries || !(dictMeta = f.dictionary())) {
        type = decodeFieldType(f, decodeFieldChildren(f, dictionaries));
        field = new schema_1.Field(f.name(), type, f.nullable(), decodeCustomMetadata(f));
    }
    // tslint:disable
    // If dictionary encoded and the first time we've seen this dictionary id, decode
    // the data type and child fields, then wrap in a Dictionary type and insert the
    // data type into the dictionary types map.
    else if (!dictionaries.has(id = dictMeta.id().low)) {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new type_1.Int32();
        dictionaries.set(id, type = decodeFieldType(f, decodeFieldChildren(f, dictionaries)));
        dictType = new type_1.Dictionary(type, keys, id, dictMeta.isOrdered());
        field = new schema_1.Field(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
    }
    // If dictionary encoded, and have already seen this dictionary Id in the schema, then reuse the
    // data type and wrap in a new Dictionary type and field.
    else {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new type_1.Int32();
        dictType = new type_1.Dictionary(dictionaries.get(id), keys, id, dictMeta.isOrdered());
        field = new schema_1.Field(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
    }
    return field || null;
}
/** @ignore */
function decodeCustomMetadata(parent) {
    const data = new Map();
    if (parent) {
        for (let entry, key, i = -1, n = parent.customMetadataLength() | 0; ++i < n;) {
            if ((entry = parent.customMetadata(i)) && (key = entry.key()) != null) {
                data.set(key, entry.value());
            }
        }
    }
    return data;
}
/** @ignore */
function decodeIndexType(_type) {
    return new type_1.Int(_type.isSigned(), _type.bitWidth());
}
/** @ignore */
function decodeFieldType(f, children) {
    const typeId = f.typeType();
    switch (typeId) {
        case Type.NONE: return new type_1.Null();
        case Type.Null: return new type_1.Null();
        case Type.Binary: return new type_1.Binary();
        case Type.Utf8: return new type_1.Utf8();
        case Type.Bool: return new type_1.Bool();
        case Type.List: return new type_1.List((children || [])[0]);
        case Type.Struct_: return new type_1.Struct(children || []);
    }
    switch (typeId) {
        case Type.Int: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Int());
            return new type_1.Int(t.isSigned(), t.bitWidth());
        }
        case Type.FloatingPoint: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.FloatingPoint());
            return new type_1.Float(t.precision());
        }
        case Type.Decimal: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Decimal());
            return new type_1.Decimal(t.scale(), t.precision());
        }
        case Type.Date: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Date());
            return new type_1.Date_(t.unit());
        }
        case Type.Time: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Time());
            return new type_1.Time(t.unit(), t.bitWidth());
        }
        case Type.Timestamp: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Timestamp());
            return new type_1.Timestamp(t.unit(), t.timezone());
        }
        case Type.Interval: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Interval());
            return new type_1.Interval(t.unit());
        }
        case Type.Union: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Union());
            return new type_1.Union(t.mode(), t.typeIdsArray() || [], children || []);
        }
        case Type.FixedSizeBinary: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.FixedSizeBinary());
            return new type_1.FixedSizeBinary(t.byteWidth());
        }
        case Type.FixedSizeList: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.FixedSizeList());
            return new type_1.FixedSizeList(t.listSize(), (children || [])[0]);
        }
        case Type.Map: {
            const t = f.type(new Schema_.org.apache.arrow.flatbuf.Map());
            return new type_1.Map_((children || [])[0], t.keysSorted());
        }
    }
    throw new Error(`Unrecognized type: "${Type[typeId]}" (${typeId})`);
}
/** @ignore */
function encodeSchema(b, schema) {
    const fieldOffsets = schema.fields.map((f) => schema_1.Field.encode(b, f));
    _Schema.startFieldsVector(b, fieldOffsets.length);
    const fieldsVectorOffset = _Schema.createFieldsVector(b, fieldOffsets);
    const metadataOffset = !(schema.metadata && schema.metadata.size > 0) ? -1 :
        _Schema.createCustomMetadataVector(b, [...schema.metadata].map(([k, v]) => {
            const key = b.createString(`${k}`);
            const val = b.createString(`${v}`);
            _KeyValue.startKeyValue(b);
            _KeyValue.addKey(b, key);
            _KeyValue.addValue(b, val);
            return _KeyValue.endKeyValue(b);
        }));
    _Schema.startSchema(b);
    _Schema.addFields(b, fieldsVectorOffset);
    _Schema.addEndianness(b, platformIsLittleEndian ? _Endianness.Little : _Endianness.Big);
    if (metadataOffset !== -1) {
        _Schema.addCustomMetadata(b, metadataOffset);
    }
    return _Schema.endSchema(b);
}
/** @ignore */
function encodeField(b, field) {
    let nameOffset = -1;
    let typeOffset = -1;
    let dictionaryOffset = -1;
    let type = field.type;
    let typeId = field.typeId;
    if (!type_1.DataType.isDictionary(type)) {
        typeOffset = typeassembler_1.instance.visit(type, b);
    }
    else {
        typeId = type.dictionary.typeId;
        dictionaryOffset = typeassembler_1.instance.visit(type, b);
        typeOffset = typeassembler_1.instance.visit(type.dictionary, b);
    }
    const childOffsets = (type.children || []).map((f) => schema_1.Field.encode(b, f));
    const childrenVectorOffset = _Field.createChildrenVector(b, childOffsets);
    const metadataOffset = !(field.metadata && field.metadata.size > 0) ? -1 :
        _Field.createCustomMetadataVector(b, [...field.metadata].map(([k, v]) => {
            const key = b.createString(`${k}`);
            const val = b.createString(`${v}`);
            _KeyValue.startKeyValue(b);
            _KeyValue.addKey(b, key);
            _KeyValue.addValue(b, val);
            return _KeyValue.endKeyValue(b);
        }));
    if (field.name) {
        nameOffset = b.createString(field.name);
    }
    _Field.startField(b);
    _Field.addType(b, typeOffset);
    _Field.addTypeType(b, typeId);
    _Field.addChildren(b, childrenVectorOffset);
    _Field.addNullable(b, !!field.nullable);
    if (nameOffset !== -1) {
        _Field.addName(b, nameOffset);
    }
    if (dictionaryOffset !== -1) {
        _Field.addDictionary(b, dictionaryOffset);
    }
    if (metadataOffset !== -1) {
        _Field.addCustomMetadata(b, metadataOffset);
    }
    return _Field.endField(b);
}
/** @ignore */
function encodeRecordBatch(b, recordBatch) {
    const nodes = recordBatch.nodes || [];
    const buffers = recordBatch.buffers || [];
    _RecordBatch.startNodesVector(b, nodes.length);
    nodes.slice().reverse().forEach((n) => FieldNode.encode(b, n));
    const nodesVectorOffset = b.endVector();
    _RecordBatch.startBuffersVector(b, buffers.length);
    buffers.slice().reverse().forEach((b_) => BufferRegion.encode(b, b_));
    const buffersVectorOffset = b.endVector();
    _RecordBatch.startRecordBatch(b);
    _RecordBatch.addLength(b, new Long(recordBatch.length, 0));
    _RecordBatch.addNodes(b, nodesVectorOffset);
    _RecordBatch.addBuffers(b, buffersVectorOffset);
    return _RecordBatch.endRecordBatch(b);
}
/** @ignore */
function encodeDictionaryBatch(b, dictionaryBatch) {
    const dataOffset = RecordBatch.encode(b, dictionaryBatch.data);
    _DictionaryBatch.startDictionaryBatch(b);
    _DictionaryBatch.addId(b, new Long(dictionaryBatch.id, 0));
    _DictionaryBatch.addIsDelta(b, dictionaryBatch.isDelta);
    _DictionaryBatch.addData(b, dataOffset);
    return _DictionaryBatch.endDictionaryBatch(b);
}
/** @ignore */
function encodeFieldNode(b, node) {
    return _FieldNode.createFieldNode(b, new Long(node.length, 0), new Long(node.nullCount, 0));
}
/** @ignore */
function encodeBufferRegion(b, node) {
    return _Buffer.createBuffer(b, new Long(node.offset, 0), new Long(node.length, 0));
}
/** @ignore */
const platformIsLittleEndian = (function () {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
})();



},{"flatbuffers":"node_modules/flatbuffers/js/flatbuffers.mjs","../../fb/Schema":"node_modules/apache-arrow/fb/Schema.js","../../fb/Message":"node_modules/apache-arrow/fb/Message.js","../../schema":"node_modules/apache-arrow/schema.js","../../util/buffer":"node_modules/apache-arrow/util/buffer.js","../../enum":"node_modules/apache-arrow/enum.js","../../visitor/typeassembler":"node_modules/apache-arrow/visitor/typeassembler.js","./json":"node_modules/apache-arrow/ipc/metadata/json.js","../../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/ipc/message.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const flatbuffers_1 = require("flatbuffers");
var ByteBuffer = flatbuffers_1.flatbuffers.ByteBuffer;
const message_1 = require("./metadata/message");
const compat_1 = require("../util/compat");
const file_1 = require("../io/file");
const buffer_1 = require("../util/buffer");
const stream_1 = require("../io/stream");
const interfaces_1 = require("../io/interfaces");
/** @ignore */ const invalidMessageType = (type) => `Expected ${enum_1.MessageHeader[type]} Message in stream, but was null or length 0.`;
/** @ignore */ const nullMessage = (type) => `Header pointer of flatbuffer-encoded ${enum_1.MessageHeader[type]} Message is null or length 0.`;
/** @ignore */ const invalidMessageMetadata = (expected, actual) => `Expected to read ${expected} metadata bytes, but only read ${actual}.`;
/** @ignore */ const invalidMessageBodyLength = (expected, actual) => `Expected to read ${expected} bytes for message body, but only read ${actual}.`;
/** @ignore */
class MessageReader {
    constructor(source) {
        this.source = source instanceof stream_1.ByteStream ? source : new stream_1.ByteStream(source);
    }
    [Symbol.iterator]() { return this; }
    next() {
        let r;
        if ((r = this.readMetadataLength()).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        // ARROW-6313: If the first 4 bytes are continuation indicator (-1), read
        // the next 4 for the 32-bit metadata length. Otherwise, assume this is a
        // pre-v0.15 message, where the first 4 bytes are the metadata length.
        if ((r.value === -1) &&
            (r = this.readMetadataLength()).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        if ((r = this.readMetadata(r.value)).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        return r;
    }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    readMessage(type) {
        let r;
        if ((r = this.next()).done) {
            return null;
        }
        if ((type != null) && r.value.headerType !== type) {
            throw new Error(invalidMessageType(type));
        }
        return r.value;
    }
    readMessageBody(bodyLength) {
        if (bodyLength <= 0) {
            return new Uint8Array(0);
        }
        const buf = buffer_1.toUint8Array(this.source.read(bodyLength));
        if (buf.byteLength < bodyLength) {
            throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
        }
        // 1. Work around bugs in fs.ReadStream's internal Buffer pooling, see: https://github.com/nodejs/node/issues/24817
        // 2. Work around https://github.com/whatwg/streams/blob/0ebe4b042e467d9876d80ae045de3843092ad797/reference-implementation/lib/helpers.js#L126
        return /* 1. */ (buf.byteOffset % 8 === 0) &&
            /* 2. */ (buf.byteOffset + buf.byteLength) <= buf.buffer.byteLength ? buf : buf.slice();
    }
    readSchema(throwIfNull = false) {
        const type = enum_1.MessageHeader.Schema;
        const message = this.readMessage(type);
        const schema = message && message.header();
        if (throwIfNull && !schema) {
            throw new Error(nullMessage(type));
        }
        return schema;
    }
    readMetadataLength() {
        const buf = this.source.read(exports.PADDING);
        const bb = buf && new ByteBuffer(buf);
        const len = bb && bb.readInt32(0) || 0;
        return { done: len === 0, value: len };
    }
    readMetadata(metadataLength) {
        const buf = this.source.read(metadataLength);
        if (!buf) {
            return interfaces_1.ITERATOR_DONE;
        }
        if (buf.byteLength < metadataLength) {
            throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
        }
        return { done: false, value: message_1.Message.decode(buf) };
    }
}
exports.MessageReader = MessageReader;
/** @ignore */
class AsyncMessageReader {
    constructor(source, byteLength) {
        this.source = source instanceof stream_1.AsyncByteStream ? source
            : compat_1.isFileHandle(source)
                ? new file_1.AsyncRandomAccessFile(source, byteLength)
                : new stream_1.AsyncByteStream(source);
    }
    [Symbol.asyncIterator]() { return this; }
    async next() {
        let r;
        if ((r = await this.readMetadataLength()).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        // ARROW-6313: If the first 4 bytes are continuation indicator (-1), read
        // the next 4 for the 32-bit metadata length. Otherwise, assume this is a
        // pre-v0.15 message, where the first 4 bytes are the metadata length.
        if ((r.value === -1) &&
            (r = await this.readMetadataLength()).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        if ((r = await this.readMetadata(r.value)).done) {
            return interfaces_1.ITERATOR_DONE;
        }
        return r;
    }
    async throw(value) { return await this.source.throw(value); }
    async return(value) { return await this.source.return(value); }
    async readMessage(type) {
        let r;
        if ((r = await this.next()).done) {
            return null;
        }
        if ((type != null) && r.value.headerType !== type) {
            throw new Error(invalidMessageType(type));
        }
        return r.value;
    }
    async readMessageBody(bodyLength) {
        if (bodyLength <= 0) {
            return new Uint8Array(0);
        }
        const buf = buffer_1.toUint8Array(await this.source.read(bodyLength));
        if (buf.byteLength < bodyLength) {
            throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
        }
        // 1. Work around bugs in fs.ReadStream's internal Buffer pooling, see: https://github.com/nodejs/node/issues/24817
        // 2. Work around https://github.com/whatwg/streams/blob/0ebe4b042e467d9876d80ae045de3843092ad797/reference-implementation/lib/helpers.js#L126
        return /* 1. */ (buf.byteOffset % 8 === 0) &&
            /* 2. */ (buf.byteOffset + buf.byteLength) <= buf.buffer.byteLength ? buf : buf.slice();
    }
    async readSchema(throwIfNull = false) {
        const type = enum_1.MessageHeader.Schema;
        const message = await this.readMessage(type);
        const schema = message && message.header();
        if (throwIfNull && !schema) {
            throw new Error(nullMessage(type));
        }
        return schema;
    }
    async readMetadataLength() {
        const buf = await this.source.read(exports.PADDING);
        const bb = buf && new ByteBuffer(buf);
        const len = bb && bb.readInt32(0) || 0;
        return { done: len === 0, value: len };
    }
    async readMetadata(metadataLength) {
        const buf = await this.source.read(metadataLength);
        if (!buf) {
            return interfaces_1.ITERATOR_DONE;
        }
        if (buf.byteLength < metadataLength) {
            throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
        }
        return { done: false, value: message_1.Message.decode(buf) };
    }
}
exports.AsyncMessageReader = AsyncMessageReader;
/** @ignore */
class JSONMessageReader extends MessageReader {
    constructor(source) {
        super(new Uint8Array(0));
        this._schema = false;
        this._body = [];
        this._batchIndex = 0;
        this._dictionaryIndex = 0;
        this._json = source instanceof interfaces_1.ArrowJSON ? source : new interfaces_1.ArrowJSON(source);
    }
    next() {
        const { _json } = this;
        if (!this._schema) {
            this._schema = true;
            const message = message_1.Message.fromJSON(_json.schema, enum_1.MessageHeader.Schema);
            return { done: false, value: message };
        }
        if (this._dictionaryIndex < _json.dictionaries.length) {
            const batch = _json.dictionaries[this._dictionaryIndex++];
            this._body = batch['data']['columns'];
            const message = message_1.Message.fromJSON(batch, enum_1.MessageHeader.DictionaryBatch);
            return { done: false, value: message };
        }
        if (this._batchIndex < _json.batches.length) {
            const batch = _json.batches[this._batchIndex++];
            this._body = batch['columns'];
            const message = message_1.Message.fromJSON(batch, enum_1.MessageHeader.RecordBatch);
            return { done: false, value: message };
        }
        this._body = [];
        return interfaces_1.ITERATOR_DONE;
    }
    readMessageBody(_bodyLength) {
        return flattenDataSources(this._body);
        function flattenDataSources(xs) {
            return (xs || []).reduce((buffers, column) => [
                ...buffers,
                ...(column['VALIDITY'] && [column['VALIDITY']] || []),
                ...(column['TYPE'] && [column['TYPE']] || []),
                ...(column['OFFSET'] && [column['OFFSET']] || []),
                ...(column['DATA'] && [column['DATA']] || []),
                ...flattenDataSources(column['children'])
            ], []);
        }
    }
    readMessage(type) {
        let r;
        if ((r = this.next()).done) {
            return null;
        }
        if ((type != null) && r.value.headerType !== type) {
            throw new Error(invalidMessageType(type));
        }
        return r.value;
    }
    readSchema() {
        const type = enum_1.MessageHeader.Schema;
        const message = this.readMessage(type);
        const schema = message && message.header();
        if (!message || !schema) {
            throw new Error(nullMessage(type));
        }
        return schema;
    }
}
exports.JSONMessageReader = JSONMessageReader;
/** @ignore */
exports.PADDING = 4;
/** @ignore */
exports.MAGIC_STR = 'ARROW1';
/** @ignore */
exports.MAGIC = new Uint8Array(exports.MAGIC_STR.length);
for (let i = 0; i < exports.MAGIC_STR.length; i += 1 | 0) {
    exports.MAGIC[i] = exports.MAGIC_STR.charCodeAt(i);
}
/** @ignore */
function checkForMagicArrowString(buffer, index = 0) {
    for (let i = -1, n = exports.MAGIC.length; ++i < n;) {
        if (exports.MAGIC[i] !== buffer[index + i]) {
            return false;
        }
    }
    return true;
}
exports.checkForMagicArrowString = checkForMagicArrowString;
/** @ignore */
exports.magicLength = exports.MAGIC.length;
/** @ignore */
exports.magicAndPadding = exports.magicLength + exports.PADDING;
/** @ignore */
exports.magicX2AndPadding = exports.magicLength * 2 + exports.PADDING;



},{"../enum":"node_modules/apache-arrow/enum.js","flatbuffers":"node_modules/flatbuffers/js/flatbuffers.mjs","./metadata/message":"node_modules/apache-arrow/ipc/metadata/message.js","../util/compat":"node_modules/apache-arrow/util/compat.js","../io/file":"node_modules/apache-arrow/io/file.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../io/stream":"node_modules/apache-arrow/io/stream.js","../io/interfaces":"node_modules/apache-arrow/io/interfaces.js"}],"node_modules/apache-arrow/visitor/vectorassembler.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const enum_1 = require("../enum");
const recordbatch_1 = require("../recordbatch");
const buffer_1 = require("../util/buffer");
const bit_1 = require("../util/bit");
const args_1 = require("../util/args");
const message_1 = require("../ipc/metadata/message");
const type_1 = require("../type");
/** @ignore */
class VectorAssembler extends visitor_1.Visitor {
    constructor() {
        super();
        this._byteLength = 0;
        this._nodes = [];
        this._buffers = [];
        this._bufferRegions = [];
    }
    /** @nocollapse */
    static assemble(...args) {
        const assembler = new VectorAssembler();
        const vectorChildren = args_1.selectVectorChildrenArgs(recordbatch_1.RecordBatch, args);
        const [assembleResult = assembler] = assembler.visitMany(vectorChildren);
        return assembleResult;
    }
    visit(vector) {
        if (!type_1.DataType.isDictionary(vector.type)) {
            const { data, length, nullCount } = vector;
            if (length > 2147483647) {
                /* istanbul ignore next */
                throw new RangeError('Cannot write arrays larger than 2^31 - 1 in length');
            }
            if (!type_1.DataType.isNull(vector.type)) {
                addBuffer.call(this, nullCount <= 0
                    ? new Uint8Array(0) // placeholder validity buffer
                    : bit_1.truncateBitmap(data.offset, length, data.nullBitmap));
            }
            this.nodes.push(new message_1.FieldNode(length, nullCount));
        }
        return super.visit(vector);
    }
    visitNull(_nullV) {
        return this;
    }
    visitDictionary(vector) {
        // Assemble the indices here, Dictionary assembled separately.
        return this.visit(vector.indices);
    }
    get nodes() { return this._nodes; }
    get buffers() { return this._buffers; }
    get byteLength() { return this._byteLength; }
    get bufferRegions() { return this._bufferRegions; }
}
exports.VectorAssembler = VectorAssembler;
/** @ignore */
function addBuffer(values) {
    const byteLength = (values.byteLength + 7) & ~7; // Round up to a multiple of 8
    this.buffers.push(values);
    this.bufferRegions.push(new message_1.BufferRegion(this._byteLength, byteLength));
    this._byteLength += byteLength;
    return this;
}
/** @ignore */
function assembleUnion(vector) {
    const { type, length, typeIds, valueOffsets } = vector;
    // All Union Vectors have a typeIds buffer
    addBuffer.call(this, typeIds);
    // If this is a Sparse Union, treat it like all other Nested types
    if (type.mode === enum_1.UnionMode.Sparse) {
        return assembleNestedVector.call(this, vector);
    }
    else if (type.mode === enum_1.UnionMode.Dense) {
        // If this is a Dense Union, add the valueOffsets buffer and potentially slice the children
        if (vector.offset <= 0) {
            // If the Vector hasn't been sliced, write the existing valueOffsets
            addBuffer.call(this, valueOffsets);
            // We can treat this like all other Nested types
            return assembleNestedVector.call(this, vector);
        }
        else {
            // A sliced Dense Union is an unpleasant case. Because the offsets are different for
            // each child vector, we need to "rebase" the valueOffsets for each child
            // Union typeIds are not necessary 0-indexed
            const maxChildTypeId = typeIds.reduce((x, y) => Math.max(x, y), typeIds[0]);
            const childLengths = new Int32Array(maxChildTypeId + 1);
            // Set all to -1 to indicate that we haven't observed a first occurrence of a particular child yet
            const childOffsets = new Int32Array(maxChildTypeId + 1).fill(-1);
            const shiftedOffsets = new Int32Array(length);
            // If we have a non-zero offset, then the value offsets do not start at
            // zero. We must a) create a new offsets array with shifted offsets and
            // b) slice the values array accordingly
            const unshiftedOffsets = buffer_1.rebaseValueOffsets(-valueOffsets[0], length, valueOffsets);
            for (let typeId, shift, index = -1; ++index < length;) {
                if ((shift = childOffsets[typeId = typeIds[index]]) === -1) {
                    shift = childOffsets[typeId] = unshiftedOffsets[typeId];
                }
                shiftedOffsets[index] = unshiftedOffsets[index] - shift;
                ++childLengths[typeId];
            }
            addBuffer.call(this, shiftedOffsets);
            // Slice and visit children accordingly
            for (let child, childIndex = -1, numChildren = type.children.length; ++childIndex < numChildren;) {
                if (child = vector.getChildAt(childIndex)) {
                    const typeId = type.typeIds[childIndex];
                    const childLength = Math.min(length, childLengths[typeId]);
                    this.visit(child.slice(childOffsets[typeId], childLength));
                }
            }
        }
    }
    return this;
}
/** @ignore */
function assembleBoolVector(vector) {
    // Bool vector is a special case of FlatVector, as its data buffer needs to stay packed
    let values;
    if (vector.nullCount >= vector.length) {
        // If all values are null, just insert a placeholder empty data buffer (fastest path)
        return addBuffer.call(this, new Uint8Array(0));
    }
    else if ((values = vector.values) instanceof Uint8Array) {
        // If values is already a Uint8Array, slice the bitmap (fast path)
        return addBuffer.call(this, bit_1.truncateBitmap(vector.offset, vector.length, values));
    }
    // Otherwise if the underlying data *isn't* a Uint8Array, enumerate the
    // values as bools and re-pack them into a Uint8Array. This code isn't
    // reachable unless you're trying to manipulate the Data internals,
    // we we're only doing this for safety.
    /* istanbul ignore next */
    return addBuffer.call(this, bit_1.packBools(vector));
}
/** @ignore */
function assembleFlatVector(vector) {
    return addBuffer.call(this, vector.values.subarray(0, vector.length * vector.stride));
}
/** @ignore */
function assembleFlatListVector(vector) {
    const { length, values, valueOffsets } = vector;
    const firstOffset = valueOffsets[0];
    const lastOffset = valueOffsets[length];
    const byteLength = Math.min(lastOffset - firstOffset, values.byteLength - firstOffset);
    // Push in the order FlatList types read their buffers
    addBuffer.call(this, buffer_1.rebaseValueOffsets(-valueOffsets[0], length, valueOffsets)); // valueOffsets buffer first
    addBuffer.call(this, values.subarray(firstOffset, firstOffset + byteLength)); // sliced values buffer second
    return this;
}
/** @ignore */
function assembleListVector(vector) {
    const { length, valueOffsets } = vector;
    // If we have valueOffsets (MapVector, ListVector), push that buffer first
    if (valueOffsets) {
        addBuffer.call(this, buffer_1.rebaseValueOffsets(valueOffsets[0], length, valueOffsets));
    }
    // Then insert the List's values child
    return this.visit(vector.getChildAt(0));
}
/** @ignore */
function assembleNestedVector(vector) {
    return this.visitMany(vector.type.children.map((_, i) => vector.getChildAt(i)).filter(Boolean))[0];
}
VectorAssembler.prototype.visitBool = assembleBoolVector;
VectorAssembler.prototype.visitInt = assembleFlatVector;
VectorAssembler.prototype.visitFloat = assembleFlatVector;
VectorAssembler.prototype.visitUtf8 = assembleFlatListVector;
VectorAssembler.prototype.visitBinary = assembleFlatListVector;
VectorAssembler.prototype.visitFixedSizeBinary = assembleFlatVector;
VectorAssembler.prototype.visitDate = assembleFlatVector;
VectorAssembler.prototype.visitTimestamp = assembleFlatVector;
VectorAssembler.prototype.visitTime = assembleFlatVector;
VectorAssembler.prototype.visitDecimal = assembleFlatVector;
VectorAssembler.prototype.visitList = assembleListVector;
VectorAssembler.prototype.visitStruct = assembleNestedVector;
VectorAssembler.prototype.visitUnion = assembleUnion;
VectorAssembler.prototype.visitInterval = assembleFlatVector;
VectorAssembler.prototype.visitFixedSizeList = assembleListVector;
VectorAssembler.prototype.visitMap = assembleListVector;



},{"../visitor":"node_modules/apache-arrow/visitor.js","../enum":"node_modules/apache-arrow/enum.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../util/bit":"node_modules/apache-arrow/util/bit.js","../util/args":"node_modules/apache-arrow/util/args.js","../ipc/metadata/message":"node_modules/apache-arrow/ipc/metadata/message.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/visitor/jsontypeassembler.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const enum_1 = require("../enum");
/** @ignore */
class JSONTypeAssembler extends visitor_1.Visitor {
    visit(node) {
        return node == null ? undefined : super.visit(node);
    }
    visitNull({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitInt({ typeId, bitWidth, isSigned }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'bitWidth': bitWidth, 'isSigned': isSigned };
    }
    visitFloat({ typeId, precision }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'precision': enum_1.Precision[precision] };
    }
    visitBinary({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitBool({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitUtf8({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitDecimal({ typeId, scale, precision }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'scale': scale, 'precision': precision };
    }
    visitDate({ typeId, unit }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'unit': enum_1.DateUnit[unit] };
    }
    visitTime({ typeId, unit, bitWidth }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'unit': enum_1.TimeUnit[unit], bitWidth };
    }
    visitTimestamp({ typeId, timezone, unit }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'unit': enum_1.TimeUnit[unit], timezone };
    }
    visitInterval({ typeId, unit }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'unit': enum_1.IntervalUnit[unit] };
    }
    visitList({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitStruct({ typeId }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase() };
    }
    visitUnion({ typeId, mode, typeIds }) {
        return {
            'name': enum_1.ArrowType[typeId].toLowerCase(),
            'mode': enum_1.UnionMode[mode],
            'typeIds': [...typeIds]
        };
    }
    visitDictionary(node) {
        return this.visit(node.dictionary);
    }
    visitFixedSizeBinary({ typeId, byteWidth }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'byteWidth': byteWidth };
    }
    visitFixedSizeList({ typeId, listSize }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'listSize': listSize };
    }
    visitMap({ typeId, keysSorted }) {
        return { 'name': enum_1.ArrowType[typeId].toLowerCase(), 'keysSorted': keysSorted };
    }
}
exports.JSONTypeAssembler = JSONTypeAssembler;



},{"../visitor":"node_modules/apache-arrow/visitor.js","../enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/visitor/jsonvectorassembler.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const bn_1 = require("../util/bn");
const column_1 = require("../column");
const vector_1 = require("../vector");
const visitor_1 = require("../visitor");
const enum_1 = require("../enum");
const recordbatch_1 = require("../recordbatch");
const enum_2 = require("../enum");
const bit_1 = require("../util/bit");
const args_1 = require("../util/args");
const type_1 = require("../type");
/** @ignore */
class JSONVectorAssembler extends visitor_1.Visitor {
    /** @nocollapse */
    static assemble(...args) {
        return new JSONVectorAssembler().visitMany(args_1.selectColumnChildrenArgs(recordbatch_1.RecordBatch, args));
    }
    visit(column) {
        const { data, name, length } = column;
        const { offset, nullCount, nullBitmap } = data;
        const type = type_1.DataType.isDictionary(column.type) ? column.type.indices : column.type;
        const buffers = Object.assign([], data.buffers, { [enum_1.BufferType.VALIDITY]: undefined });
        return {
            'name': name,
            'count': length,
            'VALIDITY': type_1.DataType.isNull(type) ? undefined
                : nullCount <= 0 ? Array.from({ length }, () => 1)
                    : [...bit_1.iterateBits(nullBitmap, offset, length, null, bit_1.getBit)],
            ...super.visit(vector_1.Vector.new(data.clone(type, offset, length, 0, buffers)))
        };
    }
    visitNull() { return {}; }
    visitBool({ values, offset, length }) {
        return { 'DATA': [...bit_1.iterateBits(values, offset, length, null, bit_1.getBool)] };
    }
    visitInt(vector) {
        return {
            'DATA': vector.type.bitWidth < 64
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitFloat(vector) {
        return { 'DATA': [...vector.values] };
    }
    visitUtf8(vector) {
        return { 'DATA': [...vector], 'OFFSET': [...vector.valueOffsets] };
    }
    visitBinary(vector) {
        return { 'DATA': [...binaryToString(vector)], OFFSET: [...vector.valueOffsets] };
    }
    visitFixedSizeBinary(vector) {
        return { 'DATA': [...binaryToString(vector)] };
    }
    visitDate(vector) {
        return {
            'DATA': vector.type.unit === enum_2.DateUnit.DAY
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitTimestamp(vector) {
        return { 'DATA': [...bigNumsToStrings(vector.values, 2)] };
    }
    visitTime(vector) {
        return {
            'DATA': vector.type.unit < enum_2.TimeUnit.MICROSECOND
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitDecimal(vector) {
        return { 'DATA': [...bigNumsToStrings(vector.values, 4)] };
    }
    visitList(vector) {
        return {
            'OFFSET': [...vector.valueOffsets],
            'children': vector.type.children.map((f, i) => this.visit(new column_1.Column(f, [vector.getChildAt(i)])))
        };
    }
    visitStruct(vector) {
        return {
            'children': vector.type.children.map((f, i) => this.visit(new column_1.Column(f, [vector.getChildAt(i)])))
        };
    }
    visitUnion(vector) {
        return {
            'TYPE': [...vector.typeIds],
            'OFFSET': vector.type.mode === enum_2.UnionMode.Dense ? [...vector.valueOffsets] : undefined,
            'children': vector.type.children.map((f, i) => this.visit(new column_1.Column(f, [vector.getChildAt(i)])))
        };
    }
    visitInterval(vector) {
        return { 'DATA': [...vector.values] };
    }
    visitFixedSizeList(vector) {
        return {
            'children': vector.type.children.map((f, i) => this.visit(new column_1.Column(f, [vector.getChildAt(i)])))
        };
    }
    visitMap(vector) {
        return {
            'OFFSET': [...vector.valueOffsets],
            'children': vector.type.children.map((f, i) => this.visit(new column_1.Column(f, [vector.getChildAt(i)])))
        };
    }
}
exports.JSONVectorAssembler = JSONVectorAssembler;
/** @ignore */
function* binaryToString(vector) {
    for (const octets of vector) {
        yield octets.reduce((str, byte) => {
            return `${str}${('0' + (byte & 0xFF).toString(16)).slice(-2)}`;
        }, '').toUpperCase();
    }
}
/** @ignore */
function* bigNumsToStrings(values, stride) {
    for (let i = -1, n = values.length / stride; ++i < n;) {
        yield `${bn_1.BN.new(values.subarray((i + 0) * stride, (i + 1) * stride), false)}`;
    }
}



},{"../util/bn":"node_modules/apache-arrow/util/bn.js","../column":"node_modules/apache-arrow/column.js","../vector":"node_modules/apache-arrow/vector.js","../visitor":"node_modules/apache-arrow/visitor.js","../enum":"node_modules/apache-arrow/enum.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js","../util/bit":"node_modules/apache-arrow/util/bit.js","../util/args":"node_modules/apache-arrow/util/args.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/ipc/writer.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const message_1 = require("./message");
const column_1 = require("../column");
const type_1 = require("../type");
const schema_1 = require("../schema");
const message_2 = require("./metadata/message");
const metadata = require("./metadata/message");
const file_1 = require("./metadata/file");
const enum_1 = require("../enum");
const stream_1 = require("../io/stream");
const vectorassembler_1 = require("../visitor/vectorassembler");
const jsontypeassembler_1 = require("../visitor/jsontypeassembler");
const jsonvectorassembler_1 = require("../visitor/jsonvectorassembler");
const buffer_1 = require("../util/buffer");
const recordbatch_1 = require("../recordbatch");
const interfaces_1 = require("../io/interfaces");
const compat_1 = require("../util/compat");
class RecordBatchWriter extends interfaces_1.ReadableInterop {
    constructor(options) {
        super();
        this._position = 0;
        this._started = false;
        // @ts-ignore
        this._sink = new stream_1.AsyncByteQueue();
        this._schema = null;
        this._dictionaryBlocks = [];
        this._recordBatchBlocks = [];
        this._dictionaryDeltaOffsets = new Map();
        compat_1.isObject(options) || (options = { autoDestroy: true, writeLegacyIpcFormat: false });
        this._autoDestroy = (typeof options.autoDestroy === 'boolean') ? options.autoDestroy : true;
        this._writeLegacyIpcFormat = (typeof options.writeLegacyIpcFormat === 'boolean') ? options.writeLegacyIpcFormat : false;
    }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    static throughDOM(
    // @ts-ignore
    writableStrategy, 
    // @ts-ignore
    readableStrategy) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    toString(sync = false) {
        return this._sink.toString(sync);
    }
    toUint8Array(sync = false) {
        return this._sink.toUint8Array(sync);
    }
    writeAll(input) {
        if (compat_1.isPromise(input)) {
            return input.then((x) => this.writeAll(x));
        }
        else if (compat_1.isAsyncIterable(input)) {
            return writeAllAsync(this, input);
        }
        return writeAll(this, input);
    }
    get closed() { return this._sink.closed; }
    [Symbol.asyncIterator]() { return this._sink[Symbol.asyncIterator](); }
    toDOMStream(options) { return this._sink.toDOMStream(options); }
    toNodeStream(options) { return this._sink.toNodeStream(options); }
    close() {
        return this.reset()._sink.close();
    }
    abort(reason) {
        return this.reset()._sink.abort(reason);
    }
    finish() {
        this._autoDestroy ? this.close() : this.reset(this._sink, this._schema);
        return this;
    }
    reset(sink = this._sink, schema = null) {
        if ((sink === this._sink) || (sink instanceof stream_1.AsyncByteQueue)) {
            this._sink = sink;
        }
        else {
            this._sink = new stream_1.AsyncByteQueue();
            if (sink && compat_1.isWritableDOMStream(sink)) {
                this.toDOMStream({ type: 'bytes' }).pipeTo(sink);
            }
            else if (sink && compat_1.isWritableNodeStream(sink)) {
                this.toNodeStream({ objectMode: false }).pipe(sink);
            }
        }
        if (this._started && this._schema) {
            this._writeFooter(this._schema);
        }
        this._started = false;
        this._dictionaryBlocks = [];
        this._recordBatchBlocks = [];
        this._dictionaryDeltaOffsets = new Map();
        if (!schema || !(schema.compareTo(this._schema))) {
            if (schema === null) {
                this._position = 0;
                this._schema = null;
            }
            else {
                this._started = true;
                this._schema = schema;
                this._writeSchema(schema);
            }
        }
        return this;
    }
    write(payload) {
        let schema = null;
        if (!this._sink) {
            throw new Error(`RecordBatchWriter is closed`);
        }
        else if (payload === null || payload === undefined) {
            return this.finish() && undefined;
        }
        else if (payload instanceof table_1.Table && !(schema = payload.schema)) {
            return this.finish() && undefined;
        }
        else if (payload instanceof recordbatch_1.RecordBatch && !(schema = payload.schema)) {
            return this.finish() && undefined;
        }
        if (schema && !schema.compareTo(this._schema)) {
            if (this._started && this._autoDestroy) {
                return this.close();
            }
            this.reset(this._sink, schema);
        }
        if (payload instanceof recordbatch_1.RecordBatch) {
            if (!(payload instanceof recordbatch_1._InternalEmptyPlaceholderRecordBatch)) {
                this._writeRecordBatch(payload);
            }
        }
        else if (payload instanceof table_1.Table) {
            this.writeAll(payload.chunks);
        }
        else if (compat_1.isIterable(payload)) {
            this.writeAll(payload);
        }
    }
    _writeMessage(message, alignment = 8) {
        const a = alignment - 1;
        const buffer = message_2.Message.encode(message);
        const flatbufferSize = buffer.byteLength;
        const prefixSize = !this._writeLegacyIpcFormat ? 8 : 4;
        const alignedSize = (flatbufferSize + prefixSize + a) & ~a;
        const nPaddingBytes = alignedSize - flatbufferSize - prefixSize;
        if (message.headerType === enum_1.MessageHeader.RecordBatch) {
            this._recordBatchBlocks.push(new file_1.FileBlock(alignedSize, message.bodyLength, this._position));
        }
        else if (message.headerType === enum_1.MessageHeader.DictionaryBatch) {
            this._dictionaryBlocks.push(new file_1.FileBlock(alignedSize, message.bodyLength, this._position));
        }
        // If not in legacy pre-0.15.0 mode, write the stream continuation indicator
        if (!this._writeLegacyIpcFormat) {
            this._write(Int32Array.of(-1));
        }
        // Write the flatbuffer size prefix including padding
        this._write(Int32Array.of(alignedSize - prefixSize));
        // Write the flatbuffer
        if (flatbufferSize > 0) {
            this._write(buffer);
        }
        // Write any padding
        return this._writePadding(nPaddingBytes);
    }
    _write(chunk) {
        if (this._started) {
            const buffer = buffer_1.toUint8Array(chunk);
            if (buffer && buffer.byteLength > 0) {
                this._sink.write(buffer);
                this._position += buffer.byteLength;
            }
        }
        return this;
    }
    _writeSchema(schema) {
        return this._writeMessage(message_2.Message.from(schema));
    }
    // @ts-ignore
    _writeFooter(schema) {
        // eos bytes
        return this._writeLegacyIpcFormat
            ? this._write(Int32Array.of(0))
            : this._write(Int32Array.of(-1, 0));
    }
    _writeMagic() {
        return this._write(message_1.MAGIC);
    }
    _writePadding(nBytes) {
        return nBytes > 0 ? this._write(new Uint8Array(nBytes)) : this;
    }
    _writeRecordBatch(batch) {
        const { byteLength, nodes, bufferRegions, buffers } = vectorassembler_1.VectorAssembler.assemble(batch);
        const recordBatch = new metadata.RecordBatch(batch.length, nodes, bufferRegions);
        const message = message_2.Message.from(recordBatch, byteLength);
        return this
            ._writeDictionaries(batch)
            ._writeMessage(message)
            ._writeBodyBuffers(buffers);
    }
    _writeDictionaryBatch(dictionary, id, isDelta = false) {
        this._dictionaryDeltaOffsets.set(id, dictionary.length + (this._dictionaryDeltaOffsets.get(id) || 0));
        const { byteLength, nodes, bufferRegions, buffers } = vectorassembler_1.VectorAssembler.assemble(dictionary);
        const recordBatch = new metadata.RecordBatch(dictionary.length, nodes, bufferRegions);
        const dictionaryBatch = new metadata.DictionaryBatch(recordBatch, id, isDelta);
        const message = message_2.Message.from(dictionaryBatch, byteLength);
        return this
            ._writeMessage(message)
            ._writeBodyBuffers(buffers);
    }
    _writeBodyBuffers(buffers) {
        let buffer;
        let size, padding;
        for (let i = -1, n = buffers.length; ++i < n;) {
            if ((buffer = buffers[i]) && (size = buffer.byteLength) > 0) {
                this._write(buffer);
                if ((padding = ((size + 7) & ~7) - size) > 0) {
                    this._writePadding(padding);
                }
            }
        }
        return this;
    }
    _writeDictionaries(batch) {
        for (let [id, dictionary] of batch.dictionaries) {
            let offset = this._dictionaryDeltaOffsets.get(id) || 0;
            if (offset === 0 || (dictionary = dictionary.slice(offset)).length > 0) {
                const chunks = 'chunks' in dictionary ? dictionary.chunks : [dictionary];
                for (const chunk of chunks) {
                    this._writeDictionaryBatch(chunk, id, offset > 0);
                    offset += chunk.length;
                }
            }
        }
        return this;
    }
}
exports.RecordBatchWriter = RecordBatchWriter;
/** @ignore */
class RecordBatchStreamWriter extends RecordBatchWriter {
    /** @nocollapse */
    static writeAll(input, options) {
        const writer = new RecordBatchStreamWriter(options);
        if (compat_1.isPromise(input)) {
            return input.then((x) => writer.writeAll(x));
        }
        else if (compat_1.isAsyncIterable(input)) {
            return writeAllAsync(writer, input);
        }
        return writeAll(writer, input);
    }
}
exports.RecordBatchStreamWriter = RecordBatchStreamWriter;
/** @ignore */
class RecordBatchFileWriter extends RecordBatchWriter {
    constructor() {
        super();
        this._autoDestroy = true;
    }
    /** @nocollapse */
    static writeAll(input) {
        const writer = new RecordBatchFileWriter();
        if (compat_1.isPromise(input)) {
            return input.then((x) => writer.writeAll(x));
        }
        else if (compat_1.isAsyncIterable(input)) {
            return writeAllAsync(writer, input);
        }
        return writeAll(writer, input);
    }
    // @ts-ignore
    _writeSchema(schema) {
        return this._writeMagic()._writePadding(2);
    }
    _writeFooter(schema) {
        const buffer = file_1.Footer.encode(new file_1.Footer(schema, enum_1.MetadataVersion.V4, this._recordBatchBlocks, this._dictionaryBlocks));
        return super
            ._writeFooter(schema) // EOS bytes for sequential readers
            ._write(buffer) // Write the flatbuffer
            ._write(Int32Array.of(buffer.byteLength)) // then the footer size suffix
            ._writeMagic(); // then the magic suffix
    }
}
exports.RecordBatchFileWriter = RecordBatchFileWriter;
/** @ignore */
class RecordBatchJSONWriter extends RecordBatchWriter {
    constructor() {
        super();
        this._autoDestroy = true;
        this._recordBatches = [];
        this._dictionaries = [];
    }
    /** @nocollapse */
    static writeAll(input) {
        return new RecordBatchJSONWriter().writeAll(input);
    }
    _writeMessage() { return this; }
    // @ts-ignore
    _writeFooter(schema) { return this; }
    _writeSchema(schema) {
        return this._write(`{\n  "schema": ${JSON.stringify({ fields: schema.fields.map(fieldToJSON) }, null, 2)}`);
    }
    _writeDictionaries(batch) {
        if (batch.dictionaries.size > 0) {
            this._dictionaries.push(batch);
        }
        return this;
    }
    _writeDictionaryBatch(dictionary, id, isDelta = false) {
        this._dictionaryDeltaOffsets.set(id, dictionary.length + (this._dictionaryDeltaOffsets.get(id) || 0));
        this._write(this._dictionaryBlocks.length === 0 ? `    ` : `,\n    `);
        this._write(`${dictionaryBatchToJSON(dictionary, id, isDelta)}`);
        this._dictionaryBlocks.push(new file_1.FileBlock(0, 0, 0));
        return this;
    }
    _writeRecordBatch(batch) {
        this._writeDictionaries(batch);
        this._recordBatches.push(batch);
        return this;
    }
    close() {
        if (this._dictionaries.length > 0) {
            this._write(`,\n  "dictionaries": [\n`);
            for (const batch of this._dictionaries) {
                super._writeDictionaries(batch);
            }
            this._write(`\n  ]`);
        }
        if (this._recordBatches.length > 0) {
            for (let i = -1, n = this._recordBatches.length; ++i < n;) {
                this._write(i === 0 ? `,\n  "batches": [\n    ` : `,\n    `);
                this._write(`${recordBatchToJSON(this._recordBatches[i])}`);
                this._recordBatchBlocks.push(new file_1.FileBlock(0, 0, 0));
            }
            this._write(`\n  ]`);
        }
        if (this._schema) {
            this._write(`\n}`);
        }
        this._dictionaries = [];
        this._recordBatches = [];
        return super.close();
    }
}
exports.RecordBatchJSONWriter = RecordBatchJSONWriter;
/** @ignore */
function writeAll(writer, input) {
    let chunks = input;
    if (input instanceof table_1.Table) {
        chunks = input.chunks;
        writer.reset(undefined, input.schema);
    }
    for (const batch of chunks) {
        writer.write(batch);
    }
    return writer.finish();
}
/** @ignore */
async function writeAllAsync(writer, batches) {
    for await (const batch of batches) {
        writer.write(batch);
    }
    return writer.finish();
}
/** @ignore */
function fieldToJSON({ name, type, nullable }) {
    const assembler = new jsontypeassembler_1.JSONTypeAssembler();
    return {
        'name': name, 'nullable': nullable,
        'type': assembler.visit(type),
        'children': (type.children || []).map(fieldToJSON),
        'dictionary': !type_1.DataType.isDictionary(type) ? undefined : {
            'id': type.id,
            'isOrdered': type.isOrdered,
            'indexType': assembler.visit(type.indices)
        }
    };
}
/** @ignore */
function dictionaryBatchToJSON(dictionary, id, isDelta = false) {
    const field = new schema_1.Field(`${id}`, dictionary.type, dictionary.nullCount > 0);
    const columns = jsonvectorassembler_1.JSONVectorAssembler.assemble(new column_1.Column(field, [dictionary]));
    return JSON.stringify({
        'id': id,
        'isDelta': isDelta,
        'data': {
            'count': dictionary.length,
            'columns': columns
        }
    }, null, 2);
}
/** @ignore */
function recordBatchToJSON(records) {
    return JSON.stringify({
        'count': records.length,
        'columns': jsonvectorassembler_1.JSONVectorAssembler.assemble(records)
    }, null, 2);
}



},{"../table":"node_modules/apache-arrow/table.js","./message":"node_modules/apache-arrow/ipc/message.js","../column":"node_modules/apache-arrow/column.js","../type":"node_modules/apache-arrow/type.js","../schema":"node_modules/apache-arrow/schema.js","./metadata/message":"node_modules/apache-arrow/ipc/metadata/message.js","./metadata/file":"node_modules/apache-arrow/ipc/metadata/file.js","../enum":"node_modules/apache-arrow/enum.js","../io/stream":"node_modules/apache-arrow/io/stream.js","../visitor/vectorassembler":"node_modules/apache-arrow/visitor/vectorassembler.js","../visitor/jsontypeassembler":"node_modules/apache-arrow/visitor/jsontypeassembler.js","../visitor/jsonvectorassembler":"node_modules/apache-arrow/visitor/jsonvectorassembler.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js","../io/interfaces":"node_modules/apache-arrow/io/interfaces.js","../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/util/recordbatch.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const schema_1 = require("../schema");
const chunked_1 = require("../vector/chunked");
const recordbatch_1 = require("../recordbatch");
const noopBuf = new Uint8Array(0);
const nullBufs = (bitmapLength) => [
    noopBuf, noopBuf, new Uint8Array(bitmapLength), noopBuf
];
/** @ignore */
function ensureSameLengthData(schema, chunks, batchLength = chunks.reduce((l, c) => Math.max(l, c.length), 0)) {
    let data;
    let field;
    let i = -1, n = chunks.length;
    const fields = [...schema.fields];
    const batchData = [];
    const bitmapLength = ((batchLength + 63) & ~63) >> 3;
    while (++i < n) {
        if ((data = chunks[i]) && data.length === batchLength) {
            batchData[i] = data;
        }
        else {
            (field = fields[i]).nullable || (fields[i] = fields[i].clone({ nullable: true }));
            batchData[i] = data ? data._changeLengthAndBackfillNullBitmap(batchLength)
                : data_1.Data.new(field.type, 0, batchLength, batchLength, nullBufs(bitmapLength));
        }
    }
    return [new schema_1.Schema(fields), batchLength, batchData];
}
exports.ensureSameLengthData = ensureSameLengthData;
/** @ignore */
function distributeColumnsIntoRecordBatches(columns) {
    return distributeVectorsIntoRecordBatches(new schema_1.Schema(columns.map(({ field }) => field)), columns);
}
exports.distributeColumnsIntoRecordBatches = distributeColumnsIntoRecordBatches;
/** @ignore */
function distributeVectorsIntoRecordBatches(schema, vecs) {
    return uniformlyDistributeChunksAcrossRecordBatches(schema, vecs.map((v) => v instanceof chunked_1.Chunked ? v.chunks.map((c) => c.data) : [v.data]));
}
exports.distributeVectorsIntoRecordBatches = distributeVectorsIntoRecordBatches;
/** @ignore */
function uniformlyDistributeChunksAcrossRecordBatches(schema, columns) {
    const fields = [...schema.fields];
    const batchArgs = [];
    const memo = { numBatches: columns.reduce((n, c) => Math.max(n, c.length), 0) };
    let numBatches = 0, batchLength = 0;
    let i = -1, numColumns = columns.length;
    let child, childData = [];
    while (memo.numBatches-- > 0) {
        for (batchLength = Number.POSITIVE_INFINITY, i = -1; ++i < numColumns;) {
            childData[i] = child = columns[i].shift();
            batchLength = Math.min(batchLength, child ? child.length : batchLength);
        }
        if (isFinite(batchLength)) {
            childData = distributeChildData(fields, batchLength, childData, columns, memo);
            if (batchLength > 0) {
                batchArgs[numBatches++] = [batchLength, childData.slice()];
            }
        }
    }
    return [
        schema = new schema_1.Schema(fields, schema.metadata),
        batchArgs.map((xs) => new recordbatch_1.RecordBatch(schema, ...xs))
    ];
}
/** @ignore */
function distributeChildData(fields, batchLength, childData, columns, memo) {
    let data;
    let field;
    let length = 0, i = -1, n = columns.length;
    const bitmapLength = ((batchLength + 63) & ~63) >> 3;
    while (++i < n) {
        if ((data = childData[i]) && ((length = data.length) >= batchLength)) {
            if (length === batchLength) {
                childData[i] = data;
            }
            else {
                childData[i] = data.slice(0, batchLength);
                data = data.slice(batchLength, length - batchLength);
                memo.numBatches = Math.max(memo.numBatches, columns[i].unshift(data));
            }
        }
        else {
            (field = fields[i]).nullable || (fields[i] = field.clone({ nullable: true }));
            childData[i] = data ? data._changeLengthAndBackfillNullBitmap(batchLength)
                : data_1.Data.new(field.type, 0, batchLength, batchLength, nullBufs(bitmapLength));
        }
    }
    return childData;
}



},{"../data":"node_modules/apache-arrow/data.js","../schema":"node_modules/apache-arrow/schema.js","../vector/chunked":"node_modules/apache-arrow/vector/chunked.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js"}],"node_modules/apache-arrow/vector/base.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const chunked_1 = require("./chunked");
const vector_1 = require("../util/vector");
const vector_2 = require("../vector");
/** @ignore */
class BaseVector extends vector_2.AbstractVector {
    constructor(data, children) {
        super();
        this._children = children;
        this.numChildren = data.childData.length;
        this._bindDataAccessors(this.data = data);
    }
    get type() { return this.data.type; }
    get typeId() { return this.data.typeId; }
    get length() { return this.data.length; }
    get offset() { return this.data.offset; }
    get stride() { return this.data.stride; }
    get nullCount() { return this.data.nullCount; }
    get byteLength() { return this.data.byteLength; }
    get VectorName() { return `${enum_1.Type[this.typeId]}Vector`; }
    get ArrayType() { return this.type.ArrayType; }
    get values() { return this.data.values; }
    get typeIds() { return this.data.typeIds; }
    get nullBitmap() { return this.data.nullBitmap; }
    get valueOffsets() { return this.data.valueOffsets; }
    get [Symbol.toStringTag]() { return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`; }
    clone(data, children = this._children) {
        return vector_2.Vector.new(data, children);
    }
    concat(...others) {
        return chunked_1.Chunked.concat(this, ...others);
    }
    slice(begin, end) {
        // Adjust args similar to Array.prototype.slice. Normalize begin/end to
        // clamp between 0 and length, and wrap around on negative indices, e.g.
        // slice(-1, 5) or slice(5, -1)
        return vector_1.clampRange(this, begin, end, this._sliceInternal);
    }
    isValid(index) {
        if (this.nullCount > 0) {
            const idx = this.offset + index;
            const val = this.nullBitmap[idx >> 3];
            const mask = (val & (1 << (idx % 8)));
            return mask !== 0;
        }
        return true;
    }
    getChildAt(index) {
        return index < 0 || index >= this.numChildren ? null : ((this._children || (this._children = []))[index] ||
            (this._children[index] = vector_2.Vector.new(this.data.childData[index])));
    }
    toJSON() { return [...this]; }
    _sliceInternal(self, begin, end) {
        return self.clone(self.data.slice(begin, end - begin), null);
    }
    // @ts-ignore
    _bindDataAccessors(data) {
        // Implementation in src/vectors/index.ts due to circular dependency/packaging shenanigans
    }
}
exports.BaseVector = BaseVector;
BaseVector.prototype[Symbol.isConcatSpreadable] = true;



},{"../enum":"node_modules/apache-arrow/enum.js","./chunked":"node_modules/apache-arrow/vector/chunked.js","../util/vector":"node_modules/apache-arrow/util/vector.js","../vector":"node_modules/apache-arrow/vector.js"}],"node_modules/apache-arrow/vector/binary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const base_1 = require("./base");
const type_1 = require("../type");
/** @ignore */
class BinaryVector extends base_1.BaseVector {
    asUtf8() {
        return vector_1.Vector.new(this.data.clone(new type_1.Utf8()));
    }
}
exports.BinaryVector = BinaryVector;



},{"../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/bool.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
const base_1 = require("./base");
const index_1 = require("./index");
/** @ignore */
class BoolVector extends base_1.BaseVector {
    /** @nocollapse */
    static from(input) {
        return index_1.vectorFromValuesWithType(() => new type_1.Bool(), input);
    }
}
exports.BoolVector = BoolVector;



},{"../type":"node_modules/apache-arrow/type.js","./base":"node_modules/apache-arrow/vector/base.js","./index":"node_modules/apache-arrow/vector/index.js"}],"node_modules/apache-arrow/vector/date.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const base_1 = require("./base");
const index_1 = require("./index");
const type_1 = require("../type");
/** @ignore */
class DateVector extends base_1.BaseVector {
    /** @nocollapse */
    static from(...args) {
        if (args.length === 2) {
            return index_1.vectorFromValuesWithType(() => args[1] === enum_1.DateUnit.DAY ? new type_1.DateDay() : new type_1.DateMillisecond(), args[0]);
        }
        return index_1.vectorFromValuesWithType(() => new type_1.DateMillisecond(), args[0]);
    }
}
exports.DateVector = DateVector;
/** @ignore */
class DateDayVector extends DateVector {
}
exports.DateDayVector = DateDayVector;
/** @ignore */
class DateMillisecondVector extends DateVector {
}
exports.DateMillisecondVector = DateMillisecondVector;



},{"../enum":"node_modules/apache-arrow/enum.js","./base":"node_modules/apache-arrow/vector/base.js","./index":"node_modules/apache-arrow/vector/index.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/decimal.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class DecimalVector extends base_1.BaseVector {
}
exports.DecimalVector = DecimalVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/dictionary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const vector_1 = require("../vector");
const base_1 = require("./base");
const index_1 = require("./index");
const type_1 = require("../type");
/** @ignore */
class DictionaryVector extends base_1.BaseVector {
    constructor(data) {
        super(data);
        this.indices = vector_1.Vector.new(data.clone(this.type.indices));
    }
    /** @nocollapse */
    static from(...args) {
        if (args.length === 3) {
            const [values, indices, keys] = args;
            const type = new type_1.Dictionary(values.type, indices, null, null);
            return vector_1.Vector.new(data_1.Data.Dictionary(type, 0, keys.length, 0, null, keys, values));
        }
        return index_1.vectorFromValuesWithType(() => args[0].type, args[0]);
    }
    get dictionary() { return this.data.dictionary; }
    reverseLookup(value) { return this.dictionary.indexOf(value); }
    getKey(idx) { return this.indices.get(idx); }
    getValue(key) { return this.dictionary.get(key); }
    setKey(idx, key) { return this.indices.set(idx, key); }
    setValue(key, value) { return this.dictionary.set(key, value); }
}
exports.DictionaryVector = DictionaryVector;
DictionaryVector.prototype.indices = null;



},{"../data":"node_modules/apache-arrow/data.js","../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","./index":"node_modules/apache-arrow/vector/index.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/fixedsizebinary.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class FixedSizeBinaryVector extends base_1.BaseVector {
}
exports.FixedSizeBinaryVector = FixedSizeBinaryVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/fixedsizelist.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class FixedSizeListVector extends base_1.BaseVector {
}
exports.FixedSizeListVector = FixedSizeListVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/float.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const vector_1 = require("../vector");
const base_1 = require("./base");
const index_1 = require("./index");
const type_1 = require("../type");
/** @ignore */
class FloatVector extends base_1.BaseVector {
    /** @nocollapse */
    static from(input) {
        let ArrowType = vectorTypeToDataType(this);
        if ((input instanceof ArrayBuffer) || ArrayBuffer.isView(input)) {
            let InputType = arrayTypeToDataType(input.constructor) || ArrowType;
            // Special case, infer the Arrow DataType from the input if calling the base
            // FloatVector.from with a TypedArray, e.g. `FloatVector.from(new Float32Array())`
            if (ArrowType === null) {
                ArrowType = InputType;
            }
            // If the DataType inferred from the Vector constructor matches the
            // DataType inferred from the input arguments, return zero-copy view
            if (ArrowType && ArrowType === InputType) {
                let type = new ArrowType();
                let length = input.byteLength / type.ArrayType.BYTES_PER_ELEMENT;
                // If the ArrowType is Float16 but the input type isn't a Uint16Array,
                // let the Float16Builder handle casting the input values to Uint16s.
                if (!convertTo16Bit(ArrowType, input.constructor)) {
                    return vector_1.Vector.new(data_1.Data.Float(type, 0, length, 0, null, input));
                }
            }
        }
        if (ArrowType) {
            // If the DataType inferred from the Vector constructor is different than
            // the DataType inferred from the input TypedArray, or if input isn't a
            // TypedArray, use the Builders to construct the result Vector
            return index_1.vectorFromValuesWithType(() => new ArrowType(), input);
        }
        if ((input instanceof DataView) || (input instanceof ArrayBuffer)) {
            throw new TypeError(`Cannot infer float type from instance of ${input.constructor.name}`);
        }
        throw new TypeError('Unrecognized FloatVector input');
    }
}
exports.FloatVector = FloatVector;
/** @ignore */
class Float16Vector extends FloatVector {
    // Since JS doesn't have half floats, `toArray()` returns a zero-copy slice
    // of the underlying Uint16Array data. This behavior ensures we don't incur
    // extra compute or copies if you're calling `toArray()` in order to create
    // a buffer for something like WebGL. Buf if you're using JS and want typed
    // arrays of 4-to-8-byte precision, these methods will enumerate the values
    // and clamp to the desired byte lengths.
    toFloat32Array() { return new Float32Array(this); }
    toFloat64Array() { return new Float64Array(this); }
}
exports.Float16Vector = Float16Vector;
/** @ignore */
class Float32Vector extends FloatVector {
}
exports.Float32Vector = Float32Vector;
/** @ignore */
class Float64Vector extends FloatVector {
}
exports.Float64Vector = Float64Vector;
const convertTo16Bit = (typeCtor, dataCtor) => {
    return (typeCtor === type_1.Float16) && (dataCtor !== Uint16Array);
};
/** @ignore */
const arrayTypeToDataType = (ctor) => {
    switch (ctor) {
        case Uint16Array: return type_1.Float16;
        case Float32Array: return type_1.Float32;
        case Float64Array: return type_1.Float64;
        default: return null;
    }
};
/** @ignore */
const vectorTypeToDataType = (ctor) => {
    switch (ctor) {
        case Float16Vector: return type_1.Float16;
        case Float32Vector: return type_1.Float32;
        case Float64Vector: return type_1.Float64;
        default: return null;
    }
};



},{"../data":"node_modules/apache-arrow/data.js","../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","./index":"node_modules/apache-arrow/vector/index.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/interval.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class IntervalVector extends base_1.BaseVector {
}
exports.IntervalVector = IntervalVector;
/** @ignore */
class IntervalDayTimeVector extends IntervalVector {
}
exports.IntervalDayTimeVector = IntervalDayTimeVector;
/** @ignore */
class IntervalYearMonthVector extends IntervalVector {
}
exports.IntervalYearMonthVector = IntervalYearMonthVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/int.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const vector_1 = require("../vector");
const base_1 = require("./base");
const index_1 = require("./index");
const compat_1 = require("../util/compat");
const buffer_1 = require("../util/buffer");
const type_1 = require("../type");
/** @ignore */
class IntVector extends base_1.BaseVector {
    /** @nocollapse */
    static from(...args) {
        let [input, is64bit = false] = args;
        let ArrowType = vectorTypeToDataType(this, is64bit);
        if ((input instanceof ArrayBuffer) || ArrayBuffer.isView(input)) {
            let InputType = arrayTypeToDataType(input.constructor, is64bit) || ArrowType;
            // Special case, infer the Arrow DataType from the input if calling the base
            // IntVector.from with a TypedArray, e.g. `IntVector.from(new Int32Array())`
            if (ArrowType === null) {
                ArrowType = InputType;
            }
            // If the DataType inferred from the Vector constructor matches the
            // DataType inferred from the input arguments, return zero-copy view
            if (ArrowType && ArrowType === InputType) {
                let type = new ArrowType();
                let length = input.byteLength / type.ArrayType.BYTES_PER_ELEMENT;
                // If the ArrowType is 64bit but the input type is 32bit pairs, update the logical length
                if (convert32To64Bit(ArrowType, input.constructor)) {
                    length *= 0.5;
                }
                return vector_1.Vector.new(data_1.Data.Int(type, 0, length, 0, null, input));
            }
        }
        if (ArrowType) {
            // If the DataType inferred from the Vector constructor is different than
            // the DataType inferred from the input TypedArray, or if input isn't a
            // TypedArray, use the Builders to construct the result Vector
            return index_1.vectorFromValuesWithType(() => new ArrowType(), input);
        }
        if ((input instanceof DataView) || (input instanceof ArrayBuffer)) {
            throw new TypeError(`Cannot infer integer type from instance of ${input.constructor.name}`);
        }
        throw new TypeError('Unrecognized IntVector input');
    }
}
exports.IntVector = IntVector;
/** @ignore */
class Int8Vector extends IntVector {
}
exports.Int8Vector = Int8Vector;
/** @ignore */
class Int16Vector extends IntVector {
}
exports.Int16Vector = Int16Vector;
/** @ignore */
class Int32Vector extends IntVector {
}
exports.Int32Vector = Int32Vector;
/** @ignore */
class Int64Vector extends IntVector {
    toBigInt64Array() {
        return buffer_1.toBigInt64Array(this.values);
    }
    get values64() {
        return this._values64 || (this._values64 = this.toBigInt64Array());
    }
}
exports.Int64Vector = Int64Vector;
/** @ignore */
class Uint8Vector extends IntVector {
}
exports.Uint8Vector = Uint8Vector;
/** @ignore */
class Uint16Vector extends IntVector {
}
exports.Uint16Vector = Uint16Vector;
/** @ignore */
class Uint32Vector extends IntVector {
}
exports.Uint32Vector = Uint32Vector;
/** @ignore */
class Uint64Vector extends IntVector {
    toBigUint64Array() {
        return buffer_1.toBigUint64Array(this.values);
    }
    get values64() {
        return this._values64 || (this._values64 = this.toBigUint64Array());
    }
}
exports.Uint64Vector = Uint64Vector;
const convert32To64Bit = (typeCtor, dataCtor) => {
    return (typeCtor === type_1.Int64 || typeCtor === type_1.Uint64) &&
        (dataCtor === Int32Array || dataCtor === Uint32Array);
};
/** @ignore */
const arrayTypeToDataType = (ctor, is64bit) => {
    switch (ctor) {
        case Int8Array: return type_1.Int8;
        case Int16Array: return type_1.Int16;
        case Int32Array: return is64bit ? type_1.Int64 : type_1.Int32;
        case compat_1.BigInt64Array: return type_1.Int64;
        case Uint8Array: return type_1.Uint8;
        case Uint16Array: return type_1.Uint16;
        case Uint32Array: return is64bit ? type_1.Uint64 : type_1.Uint32;
        case compat_1.BigUint64Array: return type_1.Uint64;
        default: return null;
    }
};
/** @ignore */
const vectorTypeToDataType = (ctor, is64bit) => {
    switch (ctor) {
        case Int8Vector: return type_1.Int8;
        case Int16Vector: return type_1.Int16;
        case Int32Vector: return is64bit ? type_1.Int64 : type_1.Int32;
        case Int64Vector: return type_1.Int64;
        case Uint8Vector: return type_1.Uint8;
        case Uint16Vector: return type_1.Uint16;
        case Uint32Vector: return is64bit ? type_1.Uint64 : type_1.Uint32;
        case Uint64Vector: return type_1.Uint64;
        default: return null;
    }
};



},{"../data":"node_modules/apache-arrow/data.js","../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","./index":"node_modules/apache-arrow/vector/index.js","../util/compat":"node_modules/apache-arrow/util/compat.js","../util/buffer":"node_modules/apache-arrow/util/buffer.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/list.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class ListVector extends base_1.BaseVector {
}
exports.ListVector = ListVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/map.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const row_1 = require("./row");
const vector_1 = require("../vector");
const base_1 = require("./base");
const type_1 = require("../type");
/** @ignore */
class MapVector extends base_1.BaseVector {
    asList() {
        const child = this.type.children[0];
        return vector_1.Vector.new(this.data.clone(new type_1.List(child)));
    }
    bind(index) {
        const child = this.getChildAt(0);
        const { [index]: begin, [index + 1]: end } = this.valueOffsets;
        return new row_1.MapRow(child.slice(begin, end));
    }
}
exports.MapVector = MapVector;



},{"./row":"node_modules/apache-arrow/vector/row.js","../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/vector/null.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class NullVector extends base_1.BaseVector {
}
exports.NullVector = NullVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/struct.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const row_1 = require("./row");
const base_1 = require("./base");
/** @ignore */ const kRowIndex = Symbol.for('rowIndex');
/** @ignore */
class StructVector extends base_1.BaseVector {
    bind(index) {
        const proto = this._row || (this._row = new row_1.StructRow(this));
        const bound = Object.create(proto);
        bound[kRowIndex] = index;
        return bound;
    }
}
exports.StructVector = StructVector;



},{"./row":"node_modules/apache-arrow/vector/row.js","./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/timestamp.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class TimestampVector extends base_1.BaseVector {
}
exports.TimestampVector = TimestampVector;
/** @ignore */
class TimestampSecondVector extends TimestampVector {
}
exports.TimestampSecondVector = TimestampSecondVector;
/** @ignore */
class TimestampMillisecondVector extends TimestampVector {
}
exports.TimestampMillisecondVector = TimestampMillisecondVector;
/** @ignore */
class TimestampMicrosecondVector extends TimestampVector {
}
exports.TimestampMicrosecondVector = TimestampMicrosecondVector;
/** @ignore */
class TimestampNanosecondVector extends TimestampVector {
}
exports.TimestampNanosecondVector = TimestampNanosecondVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/time.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class TimeVector extends base_1.BaseVector {
}
exports.TimeVector = TimeVector;
/** @ignore */
class TimeSecondVector extends TimeVector {
}
exports.TimeSecondVector = TimeSecondVector;
/** @ignore */
class TimeMillisecondVector extends TimeVector {
}
exports.TimeMillisecondVector = TimeMillisecondVector;
/** @ignore */
class TimeMicrosecondVector extends TimeVector {
}
exports.TimeMicrosecondVector = TimeMicrosecondVector;
/** @ignore */
class TimeNanosecondVector extends TimeVector {
}
exports.TimeNanosecondVector = TimeNanosecondVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/union.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** @ignore */
class UnionVector extends base_1.BaseVector {
    get typeIdToChildIndex() { return this.data.type.typeIdToChildIndex; }
}
exports.UnionVector = UnionVector;
/** @ignore */
class DenseUnionVector extends UnionVector {
    get valueOffsets() { return this.data.valueOffsets; }
}
exports.DenseUnionVector = DenseUnionVector;
/** @ignore */
class SparseUnionVector extends UnionVector {
}
exports.SparseUnionVector = SparseUnionVector;



},{"./base":"node_modules/apache-arrow/vector/base.js"}],"node_modules/apache-arrow/vector/utf8.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const base_1 = require("./base");
const type_1 = require("../type");
const index_1 = require("./index");
/** @ignore */
class Utf8Vector extends base_1.BaseVector {
    /** @nocollapse */
    static from(input) {
        return index_1.vectorFromValuesWithType(() => new type_1.Utf8(), input);
    }
    asBinary() {
        return vector_1.Vector.new(this.data.clone(new type_1.Binary()));
    }
}
exports.Utf8Vector = Utf8Vector;



},{"../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","../type":"node_modules/apache-arrow/type.js","./index":"node_modules/apache-arrow/vector/index.js"}],"node_modules/apache-arrow/util/fn.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */
function partial0(visit) {
    return function () { return visit(this); };
}
exports.partial0 = partial0;
/** @ignore */
function partial1(visit) {
    return function (a) { return visit(this, a); };
}
exports.partial1 = partial1;
/** @ignore */
function partial2(visit) {
    return function (a, b) { return visit(this, a, b); };
}
exports.partial2 = partial2;



},{}],"node_modules/apache-arrow/visitor/get.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const bn_1 = require("../util/bn");
const visitor_1 = require("../visitor");
const utf8_1 = require("../util/utf8");
const math_1 = require("../util/math");
const enum_1 = require("../enum");
/** @ignore */
class GetVisitor extends visitor_1.Visitor {
}
exports.GetVisitor = GetVisitor;
/** @ignore */ const epochDaysToMs = (data, index) => 86400000 * data[index];
/** @ignore */ const epochMillisecondsLongToMs = (data, index) => 4294967296 * (data[index + 1]) + (data[index] >>> 0);
/** @ignore */ const epochMicrosecondsLongToMs = (data, index) => 4294967296 * (data[index + 1] / 1000) + ((data[index] >>> 0) / 1000);
/** @ignore */ const epochNanosecondsLongToMs = (data, index) => 4294967296 * (data[index + 1] / 1000000) + ((data[index] >>> 0) / 1000000);
/** @ignore */ const epochMillisecondsToDate = (epochMs) => new Date(epochMs);
/** @ignore */ const epochDaysToDate = (data, index) => epochMillisecondsToDate(epochDaysToMs(data, index));
/** @ignore */ const epochMillisecondsLongToDate = (data, index) => epochMillisecondsToDate(epochMillisecondsLongToMs(data, index));
/** @ignore */
const getNull = (_vector, _index) => null;
/** @ignore */
const getVariableWidthBytes = (values, valueOffsets, index) => {
    const { [index]: x, [index + 1]: y } = valueOffsets;
    return x != null && y != null ? values.subarray(x, y) : null;
};
/** @ignore */
const getBool = ({ offset, values }, index) => {
    const idx = offset + index;
    const byte = values[idx >> 3];
    return (byte & 1 << (idx % 8)) !== 0;
};
/** @ignore */
const getDateDay = ({ values }, index) => epochDaysToDate(values, index);
/** @ignore */
const getDateMillisecond = ({ values }, index) => epochMillisecondsLongToDate(values, index * 2);
/** @ignore */
const getNumeric = ({ stride, values }, index) => values[stride * index];
/** @ignore */
const getFloat16 = ({ stride, values }, index) => math_1.uint16ToFloat64(values[stride * index]);
/** @ignore */
const getBigInts = ({ stride, values, type }, index) => bn_1.BN.new(values.subarray(stride * index, stride * (index + 1)), type.isSigned);
/** @ignore */
const getFixedSizeBinary = ({ stride, values }, index) => values.subarray(stride * index, stride * (index + 1));
/** @ignore */
const getBinary = ({ values, valueOffsets }, index) => getVariableWidthBytes(values, valueOffsets, index);
/** @ignore */
const getUtf8 = ({ values, valueOffsets }, index) => {
    const bytes = getVariableWidthBytes(values, valueOffsets, index);
    return bytes !== null ? utf8_1.decodeUtf8(bytes) : null;
};
/* istanbul ignore next */
/** @ignore */
const getInt = (vector, index) => (vector.type.bitWidth < 64
    ? getNumeric(vector, index)
    : getBigInts(vector, index));
/* istanbul ignore next */
/** @ignore */
const getFloat = (vector, index) => (vector.type.precision !== enum_1.Precision.HALF
    ? getNumeric(vector, index)
    : getFloat16(vector, index));
/* istanbul ignore next */
/** @ignore */
const getDate = (vector, index) => (vector.type.unit === enum_1.DateUnit.DAY
    ? getDateDay(vector, index)
    : getDateMillisecond(vector, index));
/** @ignore */
const getTimestampSecond = ({ values }, index) => 1000 * epochMillisecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampMillisecond = ({ values }, index) => epochMillisecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampMicrosecond = ({ values }, index) => epochMicrosecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampNanosecond = ({ values }, index) => epochNanosecondsLongToMs(values, index * 2);
/* istanbul ignore next */
/** @ignore */
const getTimestamp = (vector, index) => {
    switch (vector.type.unit) {
        case enum_1.TimeUnit.SECOND: return getTimestampSecond(vector, index);
        case enum_1.TimeUnit.MILLISECOND: return getTimestampMillisecond(vector, index);
        case enum_1.TimeUnit.MICROSECOND: return getTimestampMicrosecond(vector, index);
        case enum_1.TimeUnit.NANOSECOND: return getTimestampNanosecond(vector, index);
    }
};
/** @ignore */
const getTimeSecond = ({ values, stride }, index) => values[stride * index];
/** @ignore */
const getTimeMillisecond = ({ values, stride }, index) => values[stride * index];
/** @ignore */
const getTimeMicrosecond = ({ values }, index) => bn_1.BN.signed(values.subarray(2 * index, 2 * (index + 1)));
/** @ignore */
const getTimeNanosecond = ({ values }, index) => bn_1.BN.signed(values.subarray(2 * index, 2 * (index + 1)));
/* istanbul ignore next */
/** @ignore */
const getTime = (vector, index) => {
    switch (vector.type.unit) {
        case enum_1.TimeUnit.SECOND: return getTimeSecond(vector, index);
        case enum_1.TimeUnit.MILLISECOND: return getTimeMillisecond(vector, index);
        case enum_1.TimeUnit.MICROSECOND: return getTimeMicrosecond(vector, index);
        case enum_1.TimeUnit.NANOSECOND: return getTimeNanosecond(vector, index);
    }
};
/** @ignore */
const getDecimal = ({ values }, index) => bn_1.BN.decimal(values.subarray(4 * index, 4 * (index + 1)));
/** @ignore */
const getList = (vector, index) => {
    const child = vector.getChildAt(0), { valueOffsets, stride } = vector;
    return child.slice(valueOffsets[index * stride], valueOffsets[(index * stride) + 1]);
};
/** @ignore */
const getMap = (vector, index) => {
    return vector.bind(index);
};
/** @ignore */
const getStruct = (vector, index) => {
    return vector.bind(index);
};
/* istanbul ignore next */
/** @ignore */
const getUnion = (vector, index) => {
    return vector.type.mode === enum_1.UnionMode.Dense ?
        getDenseUnion(vector, index) :
        getSparseUnion(vector, index);
};
/** @ignore */
const getDenseUnion = (vector, index) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    return child ? child.get(vector.valueOffsets[index]) : null;
};
/** @ignore */
const getSparseUnion = (vector, index) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    return child ? child.get(index) : null;
};
/** @ignore */
const getDictionary = (vector, index) => {
    return vector.getValue(vector.getKey(index));
};
/* istanbul ignore next */
/** @ignore */
const getInterval = (vector, index) => (vector.type.unit === enum_1.IntervalUnit.DAY_TIME)
    ? getIntervalDayTime(vector, index)
    : getIntervalYearMonth(vector, index);
/** @ignore */
const getIntervalDayTime = ({ values }, index) => values.subarray(2 * index, 2 * (index + 1));
/** @ignore */
const getIntervalYearMonth = ({ values }, index) => {
    const interval = values[index];
    const int32s = new Int32Array(2);
    int32s[0] = interval / 12 | 0; /* years */
    int32s[1] = interval % 12 | 0; /* months */
    return int32s;
};
/** @ignore */
const getFixedSizeList = (vector, index) => {
    const child = vector.getChildAt(0), { stride } = vector;
    return child.slice(index * stride, (index + 1) * stride);
};
GetVisitor.prototype.visitNull = getNull;
GetVisitor.prototype.visitBool = getBool;
GetVisitor.prototype.visitInt = getInt;
GetVisitor.prototype.visitInt8 = getNumeric;
GetVisitor.prototype.visitInt16 = getNumeric;
GetVisitor.prototype.visitInt32 = getNumeric;
GetVisitor.prototype.visitInt64 = getBigInts;
GetVisitor.prototype.visitUint8 = getNumeric;
GetVisitor.prototype.visitUint16 = getNumeric;
GetVisitor.prototype.visitUint32 = getNumeric;
GetVisitor.prototype.visitUint64 = getBigInts;
GetVisitor.prototype.visitFloat = getFloat;
GetVisitor.prototype.visitFloat16 = getFloat16;
GetVisitor.prototype.visitFloat32 = getNumeric;
GetVisitor.prototype.visitFloat64 = getNumeric;
GetVisitor.prototype.visitUtf8 = getUtf8;
GetVisitor.prototype.visitBinary = getBinary;
GetVisitor.prototype.visitFixedSizeBinary = getFixedSizeBinary;
GetVisitor.prototype.visitDate = getDate;
GetVisitor.prototype.visitDateDay = getDateDay;
GetVisitor.prototype.visitDateMillisecond = getDateMillisecond;
GetVisitor.prototype.visitTimestamp = getTimestamp;
GetVisitor.prototype.visitTimestampSecond = getTimestampSecond;
GetVisitor.prototype.visitTimestampMillisecond = getTimestampMillisecond;
GetVisitor.prototype.visitTimestampMicrosecond = getTimestampMicrosecond;
GetVisitor.prototype.visitTimestampNanosecond = getTimestampNanosecond;
GetVisitor.prototype.visitTime = getTime;
GetVisitor.prototype.visitTimeSecond = getTimeSecond;
GetVisitor.prototype.visitTimeMillisecond = getTimeMillisecond;
GetVisitor.prototype.visitTimeMicrosecond = getTimeMicrosecond;
GetVisitor.prototype.visitTimeNanosecond = getTimeNanosecond;
GetVisitor.prototype.visitDecimal = getDecimal;
GetVisitor.prototype.visitList = getList;
GetVisitor.prototype.visitStruct = getStruct;
GetVisitor.prototype.visitUnion = getUnion;
GetVisitor.prototype.visitDenseUnion = getDenseUnion;
GetVisitor.prototype.visitSparseUnion = getSparseUnion;
GetVisitor.prototype.visitDictionary = getDictionary;
GetVisitor.prototype.visitInterval = getInterval;
GetVisitor.prototype.visitIntervalDayTime = getIntervalDayTime;
GetVisitor.prototype.visitIntervalYearMonth = getIntervalYearMonth;
GetVisitor.prototype.visitFixedSizeList = getFixedSizeList;
GetVisitor.prototype.visitMap = getMap;
/** @ignore */
exports.instance = new GetVisitor();



},{"../util/bn":"node_modules/apache-arrow/util/bn.js","../visitor":"node_modules/apache-arrow/visitor.js","../util/utf8":"node_modules/apache-arrow/util/utf8.js","../util/math":"node_modules/apache-arrow/util/math.js","../enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/visitor/indexof.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const bit_1 = require("../util/bit");
const vector_1 = require("../util/vector");
/** @ignore */
class IndexOfVisitor extends visitor_1.Visitor {
}
exports.IndexOfVisitor = IndexOfVisitor;
/** @ignore */
function nullIndexOf(vector, searchElement) {
    // if you're looking for nulls and the vector isn't empty, we've got 'em!
    return searchElement === null && vector.length > 0 ? 0 : -1;
}
/** @ignore */
function indexOfNull(vector, fromIndex) {
    const { nullBitmap } = vector;
    if (!nullBitmap || vector.nullCount <= 0) {
        return -1;
    }
    let i = 0;
    for (const isValid of bit_1.iterateBits(nullBitmap, vector.data.offset + (fromIndex || 0), vector.length, nullBitmap, bit_1.getBool)) {
        if (!isValid) {
            return i;
        }
        ++i;
    }
    return -1;
}
/** @ignore */
function indexOfValue(vector, searchElement, fromIndex) {
    if (searchElement === undefined) {
        return -1;
    }
    if (searchElement === null) {
        return indexOfNull(vector, fromIndex);
    }
    const compare = vector_1.createElementComparator(searchElement);
    for (let i = (fromIndex || 0) - 1, n = vector.length; ++i < n;) {
        if (compare(vector.get(i))) {
            return i;
        }
    }
    return -1;
}
/** @ignore */
function indexOfUnion(vector, searchElement, fromIndex) {
    // Unions are special -- they do have a nullBitmap, but so can their children.
    // If the searchElement is null, we don't know whether it came from the Union's
    // bitmap or one of its childrens'. So we don't interrogate the Union's bitmap,
    // since that will report the wrong index if a child has a null before the Union.
    const compare = vector_1.createElementComparator(searchElement);
    for (let i = (fromIndex || 0) - 1, n = vector.length; ++i < n;) {
        if (compare(vector.get(i))) {
            return i;
        }
    }
    return -1;
}
IndexOfVisitor.prototype.visitNull = nullIndexOf;
IndexOfVisitor.prototype.visitBool = indexOfValue;
IndexOfVisitor.prototype.visitInt = indexOfValue;
IndexOfVisitor.prototype.visitInt8 = indexOfValue;
IndexOfVisitor.prototype.visitInt16 = indexOfValue;
IndexOfVisitor.prototype.visitInt32 = indexOfValue;
IndexOfVisitor.prototype.visitInt64 = indexOfValue;
IndexOfVisitor.prototype.visitUint8 = indexOfValue;
IndexOfVisitor.prototype.visitUint16 = indexOfValue;
IndexOfVisitor.prototype.visitUint32 = indexOfValue;
IndexOfVisitor.prototype.visitUint64 = indexOfValue;
IndexOfVisitor.prototype.visitFloat = indexOfValue;
IndexOfVisitor.prototype.visitFloat16 = indexOfValue;
IndexOfVisitor.prototype.visitFloat32 = indexOfValue;
IndexOfVisitor.prototype.visitFloat64 = indexOfValue;
IndexOfVisitor.prototype.visitUtf8 = indexOfValue;
IndexOfVisitor.prototype.visitBinary = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeBinary = indexOfValue;
IndexOfVisitor.prototype.visitDate = indexOfValue;
IndexOfVisitor.prototype.visitDateDay = indexOfValue;
IndexOfVisitor.prototype.visitDateMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestamp = indexOfValue;
IndexOfVisitor.prototype.visitTimestampSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitTime = indexOfValue;
IndexOfVisitor.prototype.visitTimeSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitDecimal = indexOfValue;
IndexOfVisitor.prototype.visitList = indexOfValue;
IndexOfVisitor.prototype.visitStruct = indexOfValue;
IndexOfVisitor.prototype.visitUnion = indexOfValue;
IndexOfVisitor.prototype.visitDenseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitSparseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitDictionary = indexOfValue;
IndexOfVisitor.prototype.visitInterval = indexOfValue;
IndexOfVisitor.prototype.visitIntervalDayTime = indexOfValue;
IndexOfVisitor.prototype.visitIntervalYearMonth = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeList = indexOfValue;
IndexOfVisitor.prototype.visitMap = indexOfValue;
/** @ignore */
exports.instance = new IndexOfVisitor();



},{"../visitor":"node_modules/apache-arrow/visitor.js","../util/bit":"node_modules/apache-arrow/util/bit.js","../util/vector":"node_modules/apache-arrow/util/vector.js"}],"node_modules/apache-arrow/visitor/iterator.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const visitor_1 = require("../visitor");
const bit_1 = require("../util/bit");
const get_1 = require("./get");
/** @ignore */
class IteratorVisitor extends visitor_1.Visitor {
}
exports.IteratorVisitor = IteratorVisitor;
/** @ignore */
function nullableIterator(vector) {
    const getFn = get_1.instance.getVisitFn(vector);
    return bit_1.iterateBits(vector.nullBitmap, vector.offset, vector.length, vector, (vec, idx, nullByte, nullBit) => ((nullByte & 1 << nullBit) !== 0) ? getFn(vec, idx) : null);
}
/** @ignore */
function vectorIterator(vector) {
    // If nullable, iterate manually
    if (vector.nullCount > 0) {
        return nullableIterator(vector);
    }
    const { type, typeId, length } = vector;
    // Fast case, defer to native iterators if possible
    if (vector.stride === 1 && ((typeId === enum_1.Type.Timestamp) ||
        (typeId === enum_1.Type.Int && type.bitWidth !== 64) ||
        (typeId === enum_1.Type.Time && type.bitWidth !== 64) ||
        (typeId === enum_1.Type.Float && type.precision > 0 /* Precision.HALF */))) {
        return vector.values.subarray(0, length)[Symbol.iterator]();
    }
    // Otherwise, iterate manually
    return (function* (getFn) {
        for (let index = -1; ++index < length;) {
            yield getFn(vector, index);
        }
    })(get_1.instance.getVisitFn(vector));
}
IteratorVisitor.prototype.visitNull = vectorIterator;
IteratorVisitor.prototype.visitBool = vectorIterator;
IteratorVisitor.prototype.visitInt = vectorIterator;
IteratorVisitor.prototype.visitInt8 = vectorIterator;
IteratorVisitor.prototype.visitInt16 = vectorIterator;
IteratorVisitor.prototype.visitInt32 = vectorIterator;
IteratorVisitor.prototype.visitInt64 = vectorIterator;
IteratorVisitor.prototype.visitUint8 = vectorIterator;
IteratorVisitor.prototype.visitUint16 = vectorIterator;
IteratorVisitor.prototype.visitUint32 = vectorIterator;
IteratorVisitor.prototype.visitUint64 = vectorIterator;
IteratorVisitor.prototype.visitFloat = vectorIterator;
IteratorVisitor.prototype.visitFloat16 = vectorIterator;
IteratorVisitor.prototype.visitFloat32 = vectorIterator;
IteratorVisitor.prototype.visitFloat64 = vectorIterator;
IteratorVisitor.prototype.visitUtf8 = vectorIterator;
IteratorVisitor.prototype.visitBinary = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeBinary = vectorIterator;
IteratorVisitor.prototype.visitDate = vectorIterator;
IteratorVisitor.prototype.visitDateDay = vectorIterator;
IteratorVisitor.prototype.visitDateMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestamp = vectorIterator;
IteratorVisitor.prototype.visitTimestampSecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampNanosecond = vectorIterator;
IteratorVisitor.prototype.visitTime = vectorIterator;
IteratorVisitor.prototype.visitTimeSecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimeNanosecond = vectorIterator;
IteratorVisitor.prototype.visitDecimal = vectorIterator;
IteratorVisitor.prototype.visitList = vectorIterator;
IteratorVisitor.prototype.visitStruct = vectorIterator;
IteratorVisitor.prototype.visitUnion = vectorIterator;
IteratorVisitor.prototype.visitDenseUnion = vectorIterator;
IteratorVisitor.prototype.visitSparseUnion = vectorIterator;
IteratorVisitor.prototype.visitDictionary = vectorIterator;
IteratorVisitor.prototype.visitInterval = vectorIterator;
IteratorVisitor.prototype.visitIntervalDayTime = vectorIterator;
IteratorVisitor.prototype.visitIntervalYearMonth = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeList = vectorIterator;
IteratorVisitor.prototype.visitMap = vectorIterator;
/** @ignore */
exports.instance = new IteratorVisitor();



},{"../enum":"node_modules/apache-arrow/enum.js","../visitor":"node_modules/apache-arrow/visitor.js","../util/bit":"node_modules/apache-arrow/util/bit.js","./get":"node_modules/apache-arrow/visitor/get.js"}],"node_modules/apache-arrow/visitor/toarray.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const visitor_1 = require("../visitor");
const iterator_1 = require("./iterator");
/** @ignore */
class ToArrayVisitor extends visitor_1.Visitor {
}
exports.ToArrayVisitor = ToArrayVisitor;
/** @ignore */
function arrayOfVector(vector) {
    const { type, length, stride } = vector;
    // Fast case, return subarray if possible
    switch (type.typeId) {
        case enum_1.Type.Int:
        case enum_1.Type.Float:
        case enum_1.Type.Decimal:
        case enum_1.Type.Time:
        case enum_1.Type.Timestamp:
            return vector.values.subarray(0, length * stride);
    }
    // Otherwise if not primitive, slow copy
    return [...iterator_1.instance.visit(vector)];
}
ToArrayVisitor.prototype.visitNull = arrayOfVector;
ToArrayVisitor.prototype.visitBool = arrayOfVector;
ToArrayVisitor.prototype.visitInt = arrayOfVector;
ToArrayVisitor.prototype.visitInt8 = arrayOfVector;
ToArrayVisitor.prototype.visitInt16 = arrayOfVector;
ToArrayVisitor.prototype.visitInt32 = arrayOfVector;
ToArrayVisitor.prototype.visitInt64 = arrayOfVector;
ToArrayVisitor.prototype.visitUint8 = arrayOfVector;
ToArrayVisitor.prototype.visitUint16 = arrayOfVector;
ToArrayVisitor.prototype.visitUint32 = arrayOfVector;
ToArrayVisitor.prototype.visitUint64 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat = arrayOfVector;
ToArrayVisitor.prototype.visitFloat16 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat32 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat64 = arrayOfVector;
ToArrayVisitor.prototype.visitUtf8 = arrayOfVector;
ToArrayVisitor.prototype.visitBinary = arrayOfVector;
ToArrayVisitor.prototype.visitFixedSizeBinary = arrayOfVector;
ToArrayVisitor.prototype.visitDate = arrayOfVector;
ToArrayVisitor.prototype.visitDateDay = arrayOfVector;
ToArrayVisitor.prototype.visitDateMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestamp = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampSecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampMicrosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampNanosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTime = arrayOfVector;
ToArrayVisitor.prototype.visitTimeSecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeMicrosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeNanosecond = arrayOfVector;
ToArrayVisitor.prototype.visitDecimal = arrayOfVector;
ToArrayVisitor.prototype.visitList = arrayOfVector;
ToArrayVisitor.prototype.visitStruct = arrayOfVector;
ToArrayVisitor.prototype.visitUnion = arrayOfVector;
ToArrayVisitor.prototype.visitDenseUnion = arrayOfVector;
ToArrayVisitor.prototype.visitSparseUnion = arrayOfVector;
ToArrayVisitor.prototype.visitDictionary = arrayOfVector;
ToArrayVisitor.prototype.visitInterval = arrayOfVector;
ToArrayVisitor.prototype.visitIntervalDayTime = arrayOfVector;
ToArrayVisitor.prototype.visitIntervalYearMonth = arrayOfVector;
ToArrayVisitor.prototype.visitFixedSizeList = arrayOfVector;
ToArrayVisitor.prototype.visitMap = arrayOfVector;
/** @ignore */
exports.instance = new ToArrayVisitor();



},{"../enum":"node_modules/apache-arrow/enum.js","../visitor":"node_modules/apache-arrow/visitor.js","./iterator":"node_modules/apache-arrow/visitor/iterator.js"}],"node_modules/apache-arrow/visitor/bytewidth.js":[function(require,module,exports) {
"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const enum_1 = require("../enum");
/** @ignore */ const sum = (x, y) => x + y;
/** @ignore */ const variableWidthColumnErrorMessage = (type) => `Cannot compute the byte width of variable-width column ${type}`;
/** @ignore */
class ByteWidthVisitor extends visitor_1.Visitor {
    visitNull(____) { return 0; }
    visitInt(type) { return type.bitWidth / 8; }
    visitFloat(type) { return type.ArrayType.BYTES_PER_ELEMENT; }
    visitBinary(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitUtf8(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitBool(____) { return 1 / 8; }
    visitDecimal(____) { return 16; }
    visitDate(type) { return (type.unit + 1) * 4; }
    visitTime(type) { return type.bitWidth / 8; }
    visitTimestamp(type) { return type.unit === enum_1.TimeUnit.SECOND ? 4 : 8; }
    visitInterval(type) { return (type.unit + 1) * 4; }
    visitList(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitStruct(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitUnion(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitFixedSizeBinary(type) { return type.byteWidth; }
    visitFixedSizeList(type) { return type.listSize * this.visitFields(type.children).reduce(sum, 0); }
    visitMap(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitDictionary(type) { return this.visit(type.indices); }
    visitFields(fields) { return (fields || []).map((field) => this.visit(field.type)); }
    visitSchema(schema) { return this.visitFields(schema.fields).reduce(sum, 0); }
}
exports.ByteWidthVisitor = ByteWidthVisitor;
/** @ignore */
exports.instance = new ByteWidthVisitor();



},{"../visitor":"node_modules/apache-arrow/visitor.js","../enum":"node_modules/apache-arrow/enum.js"}],"node_modules/apache-arrow/visitor/vectorctor.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("../visitor");
const binary_1 = require("../vector/binary");
const bool_1 = require("../vector/bool");
const date_1 = require("../vector/date");
const decimal_1 = require("../vector/decimal");
const dictionary_1 = require("../vector/dictionary");
const fixedsizebinary_1 = require("../vector/fixedsizebinary");
const fixedsizelist_1 = require("../vector/fixedsizelist");
const float_1 = require("../vector/float");
const interval_1 = require("../vector/interval");
const int_1 = require("../vector/int");
const list_1 = require("../vector/list");
const map_1 = require("../vector/map");
const null_1 = require("../vector/null");
const struct_1 = require("../vector/struct");
const timestamp_1 = require("../vector/timestamp");
const time_1 = require("../vector/time");
const union_1 = require("../vector/union");
const utf8_1 = require("../vector/utf8");
/** @ignore */
class GetVectorConstructor extends visitor_1.Visitor {
    visitNull() { return null_1.NullVector; }
    visitBool() { return bool_1.BoolVector; }
    visitInt() { return int_1.IntVector; }
    visitInt8() { return int_1.Int8Vector; }
    visitInt16() { return int_1.Int16Vector; }
    visitInt32() { return int_1.Int32Vector; }
    visitInt64() { return int_1.Int64Vector; }
    visitUint8() { return int_1.Uint8Vector; }
    visitUint16() { return int_1.Uint16Vector; }
    visitUint32() { return int_1.Uint32Vector; }
    visitUint64() { return int_1.Uint64Vector; }
    visitFloat() { return float_1.FloatVector; }
    visitFloat16() { return float_1.Float16Vector; }
    visitFloat32() { return float_1.Float32Vector; }
    visitFloat64() { return float_1.Float64Vector; }
    visitUtf8() { return utf8_1.Utf8Vector; }
    visitBinary() { return binary_1.BinaryVector; }
    visitFixedSizeBinary() { return fixedsizebinary_1.FixedSizeBinaryVector; }
    visitDate() { return date_1.DateVector; }
    visitDateDay() { return date_1.DateDayVector; }
    visitDateMillisecond() { return date_1.DateMillisecondVector; }
    visitTimestamp() { return timestamp_1.TimestampVector; }
    visitTimestampSecond() { return timestamp_1.TimestampSecondVector; }
    visitTimestampMillisecond() { return timestamp_1.TimestampMillisecondVector; }
    visitTimestampMicrosecond() { return timestamp_1.TimestampMicrosecondVector; }
    visitTimestampNanosecond() { return timestamp_1.TimestampNanosecondVector; }
    visitTime() { return time_1.TimeVector; }
    visitTimeSecond() { return time_1.TimeSecondVector; }
    visitTimeMillisecond() { return time_1.TimeMillisecondVector; }
    visitTimeMicrosecond() { return time_1.TimeMicrosecondVector; }
    visitTimeNanosecond() { return time_1.TimeNanosecondVector; }
    visitDecimal() { return decimal_1.DecimalVector; }
    visitList() { return list_1.ListVector; }
    visitStruct() { return struct_1.StructVector; }
    visitUnion() { return union_1.UnionVector; }
    visitDenseUnion() { return union_1.DenseUnionVector; }
    visitSparseUnion() { return union_1.SparseUnionVector; }
    visitDictionary() { return dictionary_1.DictionaryVector; }
    visitInterval() { return interval_1.IntervalVector; }
    visitIntervalDayTime() { return interval_1.IntervalDayTimeVector; }
    visitIntervalYearMonth() { return interval_1.IntervalYearMonthVector; }
    visitFixedSizeList() { return fixedsizelist_1.FixedSizeListVector; }
    visitMap() { return map_1.MapVector; }
}
exports.GetVectorConstructor = GetVectorConstructor;
/** @ignore */
exports.instance = new GetVectorConstructor();



},{"../visitor":"node_modules/apache-arrow/visitor.js","../vector/binary":"node_modules/apache-arrow/vector/binary.js","../vector/bool":"node_modules/apache-arrow/vector/bool.js","../vector/date":"node_modules/apache-arrow/vector/date.js","../vector/decimal":"node_modules/apache-arrow/vector/decimal.js","../vector/dictionary":"node_modules/apache-arrow/vector/dictionary.js","../vector/fixedsizebinary":"node_modules/apache-arrow/vector/fixedsizebinary.js","../vector/fixedsizelist":"node_modules/apache-arrow/vector/fixedsizelist.js","../vector/float":"node_modules/apache-arrow/vector/float.js","../vector/interval":"node_modules/apache-arrow/vector/interval.js","../vector/int":"node_modules/apache-arrow/vector/int.js","../vector/list":"node_modules/apache-arrow/vector/list.js","../vector/map":"node_modules/apache-arrow/vector/map.js","../vector/null":"node_modules/apache-arrow/vector/null.js","../vector/struct":"node_modules/apache-arrow/vector/struct.js","../vector/timestamp":"node_modules/apache-arrow/vector/timestamp.js","../vector/time":"node_modules/apache-arrow/vector/time.js","../vector/union":"node_modules/apache-arrow/vector/union.js","../vector/utf8":"node_modules/apache-arrow/vector/utf8.js"}],"node_modules/apache-arrow/vector/index.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
exports.Vector = vector_1.Vector;
var base_1 = require("./base");
exports.BaseVector = base_1.BaseVector;
var binary_1 = require("./binary");
exports.BinaryVector = binary_1.BinaryVector;
var bool_1 = require("./bool");
exports.BoolVector = bool_1.BoolVector;
var chunked_1 = require("./chunked");
exports.Chunked = chunked_1.Chunked;
var date_1 = require("./date");
exports.DateVector = date_1.DateVector;
exports.DateDayVector = date_1.DateDayVector;
exports.DateMillisecondVector = date_1.DateMillisecondVector;
var decimal_1 = require("./decimal");
exports.DecimalVector = decimal_1.DecimalVector;
var dictionary_1 = require("./dictionary");
exports.DictionaryVector = dictionary_1.DictionaryVector;
var fixedsizebinary_1 = require("./fixedsizebinary");
exports.FixedSizeBinaryVector = fixedsizebinary_1.FixedSizeBinaryVector;
var fixedsizelist_1 = require("./fixedsizelist");
exports.FixedSizeListVector = fixedsizelist_1.FixedSizeListVector;
var float_1 = require("./float");
exports.FloatVector = float_1.FloatVector;
exports.Float16Vector = float_1.Float16Vector;
exports.Float32Vector = float_1.Float32Vector;
exports.Float64Vector = float_1.Float64Vector;
var interval_1 = require("./interval");
exports.IntervalVector = interval_1.IntervalVector;
exports.IntervalDayTimeVector = interval_1.IntervalDayTimeVector;
exports.IntervalYearMonthVector = interval_1.IntervalYearMonthVector;
var int_1 = require("./int");
exports.IntVector = int_1.IntVector;
exports.Int8Vector = int_1.Int8Vector;
exports.Int16Vector = int_1.Int16Vector;
exports.Int32Vector = int_1.Int32Vector;
exports.Int64Vector = int_1.Int64Vector;
exports.Uint8Vector = int_1.Uint8Vector;
exports.Uint16Vector = int_1.Uint16Vector;
exports.Uint32Vector = int_1.Uint32Vector;
exports.Uint64Vector = int_1.Uint64Vector;
var list_1 = require("./list");
exports.ListVector = list_1.ListVector;
var map_1 = require("./map");
exports.MapVector = map_1.MapVector;
var null_1 = require("./null");
exports.NullVector = null_1.NullVector;
var struct_1 = require("./struct");
exports.StructVector = struct_1.StructVector;
var timestamp_1 = require("./timestamp");
exports.TimestampVector = timestamp_1.TimestampVector;
exports.TimestampSecondVector = timestamp_1.TimestampSecondVector;
exports.TimestampMillisecondVector = timestamp_1.TimestampMillisecondVector;
exports.TimestampMicrosecondVector = timestamp_1.TimestampMicrosecondVector;
exports.TimestampNanosecondVector = timestamp_1.TimestampNanosecondVector;
var time_1 = require("./time");
exports.TimeVector = time_1.TimeVector;
exports.TimeSecondVector = time_1.TimeSecondVector;
exports.TimeMillisecondVector = time_1.TimeMillisecondVector;
exports.TimeMicrosecondVector = time_1.TimeMicrosecondVector;
exports.TimeNanosecondVector = time_1.TimeNanosecondVector;
var union_1 = require("./union");
exports.UnionVector = union_1.UnionVector;
exports.DenseUnionVector = union_1.DenseUnionVector;
exports.SparseUnionVector = union_1.SparseUnionVector;
var utf8_1 = require("./utf8");
exports.Utf8Vector = utf8_1.Utf8Vector;
var row_1 = require("./row");
exports.MapRow = row_1.MapRow;
exports.StructRow = row_1.StructRow;
const fn = require("../util/fn");
const enum_1 = require("../enum");
const vector_2 = require("../vector");
const chunked_2 = require("./chunked");
const base_2 = require("./base");
const bit_1 = require("../util/bit");
const compat_1 = require("../util/compat");
const builder_1 = require("../builder");
const get_1 = require("../visitor/get");
const set_1 = require("../visitor/set");
const indexof_1 = require("../visitor/indexof");
const toarray_1 = require("../visitor/toarray");
const iterator_1 = require("../visitor/iterator");
const bytewidth_1 = require("../visitor/bytewidth");
const vectorctor_1 = require("../visitor/vectorctor");
/** @nocollapse */
vector_2.Vector.new = newVector;
/** @nocollapse */
vector_2.Vector.from = vectorFrom;
/** @ignore */
function newVector(data, ...args) {
    return new (vectorctor_1.instance.getVisitFn(data)())(data, ...args);
}
/** @ignore */
function vectorFromValuesWithType(newDataType, input) {
    if (compat_1.isIterable(input)) {
        return vector_2.Vector.from({ 'nullValues': [null, undefined], type: newDataType(), 'values': input });
    }
    else if (compat_1.isAsyncIterable(input)) {
        return vector_2.Vector.from({ 'nullValues': [null, undefined], type: newDataType(), 'values': input });
    }
    const { 'values': values = [], 'type': type = newDataType(), 'nullValues': nullValues = [null, undefined], } = { ...input };
    return compat_1.isIterable(values)
        ? vector_2.Vector.from({ nullValues, ...input, type })
        : vector_2.Vector.from({ nullValues, ...input, type });
}
exports.vectorFromValuesWithType = vectorFromValuesWithType;
function vectorFrom(input) {
    const { 'values': values = [], ...options } = { 'nullValues': [null, undefined], ...input };
    if (compat_1.isIterable(values)) {
        const chunks = [...builder_1.Builder.throughIterable(options)(values)];
        return chunks.length === 1 ? chunks[0] : chunked_2.Chunked.concat(chunks);
    }
    return (async (chunks) => {
        const transform = builder_1.Builder.throughAsyncIterable(options);
        for await (const chunk of transform(values)) {
            chunks.push(chunk);
        }
        return chunks.length === 1 ? chunks[0] : chunked_2.Chunked.concat(chunks);
    })([]);
}
//
// We provide the following method implementations for code navigability purposes only.
// They're overridden at runtime below with the specific Visitor implementation for each type,
// short-circuiting the usual Visitor traversal and reducing intermediate lookups and calls.
// This comment is here to remind you to not set breakpoints in these function bodies, or to inform
// you why the breakpoints you have already set are not being triggered. Have a great day!
//
base_2.BaseVector.prototype.get = function baseVectorGet(index) {
    return get_1.instance.visit(this, index);
};
base_2.BaseVector.prototype.set = function baseVectorSet(index, value) {
    return set_1.instance.visit(this, index, value);
};
base_2.BaseVector.prototype.indexOf = function baseVectorIndexOf(value, fromIndex) {
    return indexof_1.instance.visit(this, value, fromIndex);
};
base_2.BaseVector.prototype.toArray = function baseVectorToArray() {
    return toarray_1.instance.visit(this);
};
base_2.BaseVector.prototype.getByteWidth = function baseVectorGetByteWidth() {
    return bytewidth_1.instance.visit(this.type);
};
base_2.BaseVector.prototype[Symbol.iterator] = function baseVectorSymbolIterator() {
    return iterator_1.instance.visit(this);
};
base_2.BaseVector.prototype._bindDataAccessors = bindBaseVectorDataAccessors;
// Perf: bind and assign the operator Visitor methods to each of the Vector subclasses for each Type
Object.keys(enum_1.Type)
    .map((T) => enum_1.Type[T])
    .filter((T) => typeof T === 'number')
    .filter((typeId) => typeId !== enum_1.Type.NONE)
    .forEach((typeId) => {
    const VectorCtor = vectorctor_1.instance.visit(typeId);
    VectorCtor.prototype['get'] = fn.partial1(get_1.instance.getVisitFn(typeId));
    VectorCtor.prototype['set'] = fn.partial2(set_1.instance.getVisitFn(typeId));
    VectorCtor.prototype['indexOf'] = fn.partial2(indexof_1.instance.getVisitFn(typeId));
    VectorCtor.prototype['toArray'] = fn.partial0(toarray_1.instance.getVisitFn(typeId));
    VectorCtor.prototype['getByteWidth'] = partialType0(bytewidth_1.instance.getVisitFn(typeId));
    VectorCtor.prototype[Symbol.iterator] = fn.partial0(iterator_1.instance.getVisitFn(typeId));
});
/** @ignore */
function partialType0(visit) {
    return function () { return visit(this.type); };
}
/** @ignore */
function wrapNullableGet(fn) {
    return function (i) { return this.isValid(i) ? fn.call(this, i) : null; };
}
/** @ignore */
function wrapNullableSet(fn) {
    return function (i, a) {
        if (bit_1.setBool(this.nullBitmap, this.offset + i, !(a === null || a === undefined))) {
            fn.call(this, i, a);
        }
    };
}
/** @ignore */
function bindBaseVectorDataAccessors() {
    const nullBitmap = this.nullBitmap;
    if (nullBitmap && nullBitmap.byteLength > 0) {
        this.get = wrapNullableGet(this.get);
        this.set = wrapNullableSet(this.set);
    }
}



},{"../vector":"node_modules/apache-arrow/vector.js","./base":"node_modules/apache-arrow/vector/base.js","./binary":"node_modules/apache-arrow/vector/binary.js","./bool":"node_modules/apache-arrow/vector/bool.js","./chunked":"node_modules/apache-arrow/vector/chunked.js","./date":"node_modules/apache-arrow/vector/date.js","./decimal":"node_modules/apache-arrow/vector/decimal.js","./dictionary":"node_modules/apache-arrow/vector/dictionary.js","./fixedsizebinary":"node_modules/apache-arrow/vector/fixedsizebinary.js","./fixedsizelist":"node_modules/apache-arrow/vector/fixedsizelist.js","./float":"node_modules/apache-arrow/vector/float.js","./interval":"node_modules/apache-arrow/vector/interval.js","./int":"node_modules/apache-arrow/vector/int.js","./list":"node_modules/apache-arrow/vector/list.js","./map":"node_modules/apache-arrow/vector/map.js","./null":"node_modules/apache-arrow/vector/null.js","./struct":"node_modules/apache-arrow/vector/struct.js","./timestamp":"node_modules/apache-arrow/vector/timestamp.js","./time":"node_modules/apache-arrow/vector/time.js","./union":"node_modules/apache-arrow/vector/union.js","./utf8":"node_modules/apache-arrow/vector/utf8.js","./row":"node_modules/apache-arrow/vector/row.js","../util/fn":"node_modules/apache-arrow/util/fn.js","../enum":"node_modules/apache-arrow/enum.js","../util/bit":"node_modules/apache-arrow/util/bit.js","../util/compat":"node_modules/apache-arrow/util/compat.js","../builder":"node_modules/apache-arrow/builder.js","../visitor/get":"node_modules/apache-arrow/visitor/get.js","../visitor/set":"node_modules/apache-arrow/visitor/set.js","../visitor/indexof":"node_modules/apache-arrow/visitor/indexof.js","../visitor/toarray":"node_modules/apache-arrow/visitor/toarray.js","../visitor/iterator":"node_modules/apache-arrow/visitor/iterator.js","../visitor/bytewidth":"node_modules/apache-arrow/visitor/bytewidth.js","../visitor/vectorctor":"node_modules/apache-arrow/visitor/vectorctor.js"}],"node_modules/apache-arrow/table.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const schema_1 = require("./schema");
const recordbatch_1 = require("./recordbatch");
const reader_1 = require("./ipc/reader");
const type_1 = require("./type");
const args_1 = require("./util/args");
const compat_1 = require("./util/compat");
const writer_1 = require("./ipc/writer");
const recordbatch_2 = require("./util/recordbatch");
const index_1 = require("./vector/index");
class Table extends index_1.Chunked {
    constructor(...args) {
        let schema = null;
        if (args[0] instanceof schema_1.Schema) {
            schema = args.shift();
        }
        let chunks = args_1.selectArgs(recordbatch_1.RecordBatch, args);
        if (!schema && !(schema = chunks[0] && chunks[0].schema)) {
            throw new TypeError('Table must be initialized with a Schema or at least one RecordBatch');
        }
        chunks[0] || (chunks[0] = new recordbatch_1._InternalEmptyPlaceholderRecordBatch(schema));
        super(new type_1.Struct(schema.fields), chunks);
        this._schema = schema;
        this._chunks = chunks;
    }
    /** @nocollapse */
    static empty(schema = new schema_1.Schema([])) { return new Table(schema, []); }
    /** @nocollapse */
    static from(input) {
        if (!input) {
            return Table.empty();
        }
        if (typeof input === 'object') {
            let table = compat_1.isIterable(input['values']) ? tableFromIterable(input)
                : compat_1.isAsyncIterable(input['values']) ? tableFromAsyncIterable(input)
                    : null;
            if (table !== null) {
                return table;
            }
        }
        let reader = reader_1.RecordBatchReader.from(input);
        if (compat_1.isPromise(reader)) {
            return (async () => await Table.from(await reader))();
        }
        if (reader.isSync() && (reader = reader.open())) {
            return !reader.schema ? Table.empty() : new Table(reader.schema, [...reader]);
        }
        return (async (opening) => {
            const reader = await opening;
            const schema = reader.schema;
            const batches = [];
            if (schema) {
                for await (let batch of reader) {
                    batches.push(batch);
                }
                return new Table(schema, batches);
            }
            return Table.empty();
        })(reader.open());
    }
    /** @nocollapse */
    static async fromAsync(source) {
        return await Table.from(source);
    }
    /** @nocollapse */
    static fromStruct(vector) {
        return Table.new(vector.data.childData, vector.type.children);
    }
    /** @nocollapse */
    static new(...cols) {
        return new Table(...recordbatch_2.distributeColumnsIntoRecordBatches(args_1.selectColumnArgs(cols)));
    }
    get schema() { return this._schema; }
    get length() { return this._length; }
    get chunks() { return this._chunks; }
    get numCols() { return this._numChildren; }
    clone(chunks = this._chunks) {
        return new Table(this._schema, chunks);
    }
    getColumn(name) {
        return this.getColumnAt(this.getColumnIndex(name));
    }
    getColumnAt(index) {
        return this.getChildAt(index);
    }
    getColumnIndex(name) {
        return this._schema.fields.findIndex((f) => f.name === name);
    }
    getChildAt(index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        let field, child;
        const fields = this._schema.fields;
        const columns = this._children || (this._children = []);
        if (child = columns[index]) {
            return child;
        }
        if (field = fields[index]) {
            const chunks = this._chunks
                .map((chunk) => chunk.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new column_1.Column(field, chunks));
            }
        }
        return null;
    }
    // @ts-ignore
    serialize(encoding = 'binary', stream = true) {
        const Writer = !stream
            ? writer_1.RecordBatchFileWriter
            : writer_1.RecordBatchStreamWriter;
        return Writer.writeAll(this).toUint8Array(true);
    }
    count() {
        return this._length;
    }
    select(...columnNames) {
        const nameToIndex = this._schema.fields.reduce((m, f, i) => m.set(f.name, i), new Map());
        return this.selectAt(...columnNames.map((columnName) => nameToIndex.get(columnName)).filter((x) => x > -1));
    }
    selectAt(...columnIndices) {
        const schema = this._schema.selectAt(...columnIndices);
        return new Table(schema, this._chunks.map(({ length, data: { childData } }) => {
            return new recordbatch_1.RecordBatch(schema, length, columnIndices.map((i) => childData[i]).filter(Boolean));
        }));
    }
    assign(other) {
        const fields = this._schema.fields;
        const [indices, oldToNew] = other.schema.fields.reduce((memo, f2, newIdx) => {
            const [indices, oldToNew] = memo;
            const i = fields.findIndex((f) => f.name === f2.name);
            ~i ? (oldToNew[i] = newIdx) : indices.push(newIdx);
            return memo;
        }, [[], []]);
        const schema = this._schema.assign(other.schema);
        const columns = [
            ...fields.map((_f, i, _fs, j = oldToNew[i]) => (j === undefined ? this.getColumnAt(i) : other.getColumnAt(j))),
            ...indices.map((i) => other.getColumnAt(i))
        ].filter(Boolean);
        return new Table(...recordbatch_2.distributeVectorsIntoRecordBatches(schema, columns));
    }
}
exports.Table = Table;
function tableFromIterable(input) {
    const { type } = input;
    if (type instanceof type_1.Struct) {
        return Table.fromStruct(index_1.StructVector.from(input));
    }
    return null;
}
function tableFromAsyncIterable(input) {
    const { type } = input;
    if (type instanceof type_1.Struct) {
        return index_1.StructVector.from(input).then((vector) => Table.fromStruct(vector));
    }
    return null;
}



},{"./column":"node_modules/apache-arrow/column.js","./schema":"node_modules/apache-arrow/schema.js","./recordbatch":"node_modules/apache-arrow/recordbatch.js","./ipc/reader":"node_modules/apache-arrow/ipc/reader.js","./type":"node_modules/apache-arrow/type.js","./util/args":"node_modules/apache-arrow/util/args.js","./util/compat":"node_modules/apache-arrow/util/compat.js","./ipc/writer":"node_modules/apache-arrow/ipc/writer.js","./util/recordbatch":"node_modules/apache-arrow/util/recordbatch.js","./vector/index":"node_modules/apache-arrow/vector/index.js"}],"node_modules/apache-arrow/recordbatch.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const table_1 = require("./table");
const vector_1 = require("./vector");
const visitor_1 = require("./visitor");
const schema_1 = require("./schema");
const compat_1 = require("./util/compat");
const chunked_1 = require("./vector/chunked");
const args_1 = require("./util/args");
const type_1 = require("./type");
const recordbatch_1 = require("./util/recordbatch");
const index_1 = require("./vector/index");
class RecordBatch extends index_1.StructVector {
    constructor(...args) {
        let data;
        let schema = args[0];
        let children;
        if (args[1] instanceof data_1.Data) {
            [, data, children] = args;
        }
        else {
            const fields = schema.fields;
            const [, length, childData] = args;
            data = data_1.Data.Struct(new type_1.Struct(fields), 0, length, 0, null, childData);
        }
        super(data, children);
        this._schema = schema;
    }
    /** @nocollapse */
    static from(options) {
        if (compat_1.isIterable(options['values'])) {
            return table_1.Table.from(options);
        }
        return table_1.Table.from(options);
    }
    /** @nocollapse */
    static new(...args) {
        const [fs, xs] = args_1.selectFieldArgs(args);
        const vs = xs.filter((x) => x instanceof vector_1.Vector);
        return new RecordBatch(...recordbatch_1.ensureSameLengthData(new schema_1.Schema(fs), vs.map((x) => x.data)));
    }
    clone(data, children = this._children) {
        return new RecordBatch(this._schema, data, children);
    }
    concat(...others) {
        const schema = this._schema, chunks = chunked_1.Chunked.flatten(this, ...others);
        return new table_1.Table(schema, chunks.map(({ data }) => new RecordBatch(schema, data)));
    }
    get schema() { return this._schema; }
    get numCols() { return this._schema.fields.length; }
    get dictionaries() {
        return this._dictionaries || (this._dictionaries = DictionaryCollector.collect(this));
    }
    select(...columnNames) {
        const nameToIndex = this._schema.fields.reduce((m, f, i) => m.set(f.name, i), new Map());
        return this.selectAt(...columnNames.map((columnName) => nameToIndex.get(columnName)).filter((x) => x > -1));
    }
    selectAt(...columnIndices) {
        const schema = this._schema.selectAt(...columnIndices);
        const childData = columnIndices.map((i) => this.data.childData[i]).filter(Boolean);
        return new RecordBatch(schema, this.length, childData);
    }
}
exports.RecordBatch = RecordBatch;
/**
 * An internal class used by the `RecordBatchReader` and `RecordBatchWriter`
 * implementations to differentiate between a stream with valid zero-length
 * RecordBatches, and a stream with a Schema message, but no RecordBatches.
 * @see https://github.com/apache/arrow/pull/4373
 * @ignore
 * @private
 */
/* tslint:disable:class-name */
class _InternalEmptyPlaceholderRecordBatch extends RecordBatch {
    constructor(schema) {
        super(schema, 0, schema.fields.map((f) => data_1.Data.new(f.type, 0, 0, 0)));
    }
}
exports._InternalEmptyPlaceholderRecordBatch = _InternalEmptyPlaceholderRecordBatch;
/** @ignore */
class DictionaryCollector extends visitor_1.Visitor {
    constructor() {
        super(...arguments);
        this.dictionaries = new Map();
    }
    static collect(batch) {
        return new DictionaryCollector().visit(batch.data, new type_1.Struct(batch.schema.fields)).dictionaries;
    }
    visit(data, type) {
        if (type_1.DataType.isDictionary(type)) {
            return this.visitDictionary(data, type);
        }
        else {
            data.childData.forEach((child, i) => this.visit(child, type.children[i].type));
        }
        return this;
    }
    visitDictionary(data, type) {
        const dictionary = data.dictionary;
        if (dictionary && dictionary.length > 0) {
            this.dictionaries.set(type.id, dictionary);
        }
        return this;
    }
}



},{"./data":"node_modules/apache-arrow/data.js","./table":"node_modules/apache-arrow/table.js","./vector":"node_modules/apache-arrow/vector.js","./visitor":"node_modules/apache-arrow/visitor.js","./schema":"node_modules/apache-arrow/schema.js","./util/compat":"node_modules/apache-arrow/util/compat.js","./vector/chunked":"node_modules/apache-arrow/vector/chunked.js","./util/args":"node_modules/apache-arrow/util/args.js","./type":"node_modules/apache-arrow/type.js","./util/recordbatch":"node_modules/apache-arrow/util/recordbatch.js","./vector/index":"node_modules/apache-arrow/vector/index.js"}],"node_modules/apache-arrow/ipc/reader.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const enum_1 = require("../enum");
const file_1 = require("./metadata/file");
const adapters_1 = require("../io/adapters");
const stream_1 = require("../io/stream");
const file_2 = require("../io/file");
const vectorloader_1 = require("../visitor/vectorloader");
const recordbatch_1 = require("../recordbatch");
const interfaces_1 = require("../io/interfaces");
const message_1 = require("./message");
const compat_1 = require("../util/compat");
class RecordBatchReader extends interfaces_1.ReadableInterop {
    constructor(impl) {
        super();
        this._impl = impl;
    }
    get closed() { return this._impl.closed; }
    get schema() { return this._impl.schema; }
    get autoDestroy() { return this._impl.autoDestroy; }
    get dictionaries() { return this._impl.dictionaries; }
    get numDictionaries() { return this._impl.numDictionaries; }
    get numRecordBatches() { return this._impl.numRecordBatches; }
    get footer() { return this._impl.isFile() ? this._impl.footer : null; }
    isSync() { return this._impl.isSync(); }
    isAsync() { return this._impl.isAsync(); }
    isFile() { return this._impl.isFile(); }
    isStream() { return this._impl.isStream(); }
    next() {
        return this._impl.next();
    }
    throw(value) {
        return this._impl.throw(value);
    }
    return(value) {
        return this._impl.return(value);
    }
    cancel() {
        return this._impl.cancel();
    }
    reset(schema) {
        this._impl.reset(schema);
        this._DOMStream = undefined;
        this._nodeStream = undefined;
        return this;
    }
    open(options) {
        const opening = this._impl.open(options);
        return compat_1.isPromise(opening) ? opening.then(() => this) : this;
    }
    readRecordBatch(index) {
        return this._impl.isFile() ? this._impl.readRecordBatch(index) : null;
    }
    [Symbol.iterator]() {
        return this._impl[Symbol.iterator]();
    }
    [Symbol.asyncIterator]() {
        return this._impl[Symbol.asyncIterator]();
    }
    toDOMStream() {
        return adapters_1.default.toDOMStream((this.isSync()
            ? { [Symbol.iterator]: () => this }
            : { [Symbol.asyncIterator]: () => this }));
    }
    toNodeStream() {
        return adapters_1.default.toNodeStream((this.isSync()
            ? { [Symbol.iterator]: () => this }
            : { [Symbol.asyncIterator]: () => this }), { objectMode: true });
    }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    static throughDOM(
    // @ts-ignore
    writableStrategy, 
    // @ts-ignore
    readableStrategy) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    /** @nocollapse */
    static from(source) {
        if (source instanceof RecordBatchReader) {
            return source;
        }
        else if (compat_1.isArrowJSON(source)) {
            return fromArrowJSON(source);
        }
        else if (compat_1.isFileHandle(source)) {
            return fromFileHandle(source);
        }
        else if (compat_1.isPromise(source)) {
            return (async () => await RecordBatchReader.from(await source))();
        }
        else if (compat_1.isFetchResponse(source) || compat_1.isReadableDOMStream(source) || compat_1.isReadableNodeStream(source) || compat_1.isAsyncIterable(source)) {
            return fromAsyncByteStream(new stream_1.AsyncByteStream(source));
        }
        return fromByteStream(new stream_1.ByteStream(source));
    }
    /** @nocollapse */
    static readAll(source) {
        if (source instanceof RecordBatchReader) {
            return source.isSync() ? readAllSync(source) : readAllAsync(source);
        }
        else if (compat_1.isArrowJSON(source) || ArrayBuffer.isView(source) || compat_1.isIterable(source) || compat_1.isIteratorResult(source)) {
            return readAllSync(source);
        }
        return readAllAsync(source);
    }
}
exports.RecordBatchReader = RecordBatchReader;
//
// Since TS is a structural type system, we define the following subclass stubs
// so that concrete types exist to associate with with the interfaces below.
//
// The implementation for each RecordBatchReader is hidden away in the set of
// `RecordBatchReaderImpl` classes in the second half of this file. This allows
// us to export a single RecordBatchReader class, and swap out the impl based
// on the io primitives or underlying arrow (JSON, file, or stream) at runtime.
//
// Async/await makes our job a bit harder, since it forces everything to be
// either fully sync or fully async. This is why the logic for the reader impls
// has been duplicated into both sync and async variants. Since the RBR
// delegates to its impl, an RBR with an AsyncRecordBatchFileReaderImpl for
// example will return async/await-friendly Promises, but one with a (sync)
// RecordBatchStreamReaderImpl will always return values. Nothing should be
// different about their logic, aside from the async handling. This is also why
// this code looks highly structured, as it should be nearly identical and easy
// to follow.
//
/** @ignore */
class RecordBatchStreamReader extends RecordBatchReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
    [Symbol.iterator]() { return this._impl[Symbol.iterator](); }
    async *[Symbol.asyncIterator]() { yield* this[Symbol.iterator](); }
}
exports.RecordBatchStreamReader = RecordBatchStreamReader;
/** @ignore */
class AsyncRecordBatchStreamReader extends RecordBatchReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
    [Symbol.iterator]() { throw new Error(`AsyncRecordBatchStreamReader is not Iterable`); }
    [Symbol.asyncIterator]() { return this._impl[Symbol.asyncIterator](); }
}
exports.AsyncRecordBatchStreamReader = AsyncRecordBatchStreamReader;
/** @ignore */
class RecordBatchFileReader extends RecordBatchStreamReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
}
exports.RecordBatchFileReader = RecordBatchFileReader;
/** @ignore */
class AsyncRecordBatchFileReader extends AsyncRecordBatchStreamReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
}
exports.AsyncRecordBatchFileReader = AsyncRecordBatchFileReader;
/** @ignore */
class RecordBatchReaderImpl {
    constructor(dictionaries = new Map()) {
        this.closed = false;
        this.autoDestroy = true;
        this._dictionaryIndex = 0;
        this._recordBatchIndex = 0;
        this.dictionaries = dictionaries;
    }
    get numDictionaries() { return this._dictionaryIndex; }
    get numRecordBatches() { return this._recordBatchIndex; }
    isSync() { return false; }
    isAsync() { return false; }
    isFile() { return false; }
    isStream() { return false; }
    reset(schema) {
        this._dictionaryIndex = 0;
        this._recordBatchIndex = 0;
        this.schema = schema;
        this.dictionaries = new Map();
        return this;
    }
    _loadRecordBatch(header, body) {
        return new recordbatch_1.RecordBatch(this.schema, header.length, this._loadVectors(header, body, this.schema.fields));
    }
    _loadDictionaryBatch(header, body) {
        const { id, isDelta, data } = header;
        const { dictionaries, schema } = this;
        const dictionary = dictionaries.get(id);
        if (isDelta || !dictionary) {
            const type = schema.dictionaries.get(id);
            return (dictionary && isDelta ? dictionary.concat(vector_1.Vector.new(this._loadVectors(data, body, [type])[0])) :
                vector_1.Vector.new(this._loadVectors(data, body, [type])[0]));
        }
        return dictionary;
    }
    _loadVectors(header, body, types) {
        return new vectorloader_1.VectorLoader(body, header.nodes, header.buffers, this.dictionaries).visitMany(types);
    }
}
/** @ignore */
class RecordBatchStreamReaderImpl extends RecordBatchReaderImpl {
    constructor(source, dictionaries) {
        super(dictionaries);
        this._reader = !compat_1.isArrowJSON(source)
            ? new message_1.MessageReader(this._handle = source)
            : new message_1.JSONMessageReader(this._handle = source);
    }
    isSync() { return true; }
    isStream() { return true; }
    [Symbol.iterator]() {
        return this;
    }
    cancel() {
        if (!this.closed && (this.closed = true)) {
            this.reset()._reader.return();
            this._reader = null;
            this.dictionaries = null;
        }
    }
    open(options) {
        if (!this.closed) {
            this.autoDestroy = shouldAutoDestroy(this, options);
            if (!(this.schema || (this.schema = this._reader.readSchema()))) {
                this.cancel();
            }
        }
        return this;
    }
    throw(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return this.reset()._reader.throw(value);
        }
        return interfaces_1.ITERATOR_DONE;
    }
    return(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return this.reset()._reader.return(value);
        }
        return interfaces_1.ITERATOR_DONE;
    }
    next() {
        if (this.closed) {
            return interfaces_1.ITERATOR_DONE;
        }
        let message, { _reader: reader } = this;
        while (message = this._readNextMessageAndValidate()) {
            if (message.isSchema()) {
                this.reset(message.header());
            }
            else if (message.isRecordBatch()) {
                this._recordBatchIndex++;
                const header = message.header();
                const buffer = reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return { done: false, value: recordBatch };
            }
            else if (message.isDictionaryBatch()) {
                this._dictionaryIndex++;
                const header = message.header();
                const buffer = reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
        if (this.schema && this._recordBatchIndex === 0) {
            this._recordBatchIndex++;
            return { done: false, value: new recordbatch_1._InternalEmptyPlaceholderRecordBatch(this.schema) };
        }
        return this.return();
    }
    _readNextMessageAndValidate(type) {
        return this._reader.readMessage(type);
    }
}
/** @ignore */
class AsyncRecordBatchStreamReaderImpl extends RecordBatchReaderImpl {
    constructor(source, dictionaries) {
        super(dictionaries);
        this._reader = new message_1.AsyncMessageReader(this._handle = source);
    }
    isAsync() { return true; }
    isStream() { return true; }
    [Symbol.asyncIterator]() {
        return this;
    }
    async cancel() {
        if (!this.closed && (this.closed = true)) {
            await this.reset()._reader.return();
            this._reader = null;
            this.dictionaries = null;
        }
    }
    async open(options) {
        if (!this.closed) {
            this.autoDestroy = shouldAutoDestroy(this, options);
            if (!(this.schema || (this.schema = (await this._reader.readSchema())))) {
                await this.cancel();
            }
        }
        return this;
    }
    async throw(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return await this.reset()._reader.throw(value);
        }
        return interfaces_1.ITERATOR_DONE;
    }
    async return(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return await this.reset()._reader.return(value);
        }
        return interfaces_1.ITERATOR_DONE;
    }
    async next() {
        if (this.closed) {
            return interfaces_1.ITERATOR_DONE;
        }
        let message, { _reader: reader } = this;
        while (message = await this._readNextMessageAndValidate()) {
            if (message.isSchema()) {
                await this.reset(message.header());
            }
            else if (message.isRecordBatch()) {
                this._recordBatchIndex++;
                const header = message.header();
                const buffer = await reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return { done: false, value: recordBatch };
            }
            else if (message.isDictionaryBatch()) {
                this._dictionaryIndex++;
                const header = message.header();
                const buffer = await reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
        if (this.schema && this._recordBatchIndex === 0) {
            this._recordBatchIndex++;
            return { done: false, value: new recordbatch_1._InternalEmptyPlaceholderRecordBatch(this.schema) };
        }
        return await this.return();
    }
    async _readNextMessageAndValidate(type) {
        return await this._reader.readMessage(type);
    }
}
/** @ignore */
class RecordBatchFileReaderImpl extends RecordBatchStreamReaderImpl {
    constructor(source, dictionaries) {
        super(source instanceof file_2.RandomAccessFile ? source : new file_2.RandomAccessFile(source), dictionaries);
    }
    get footer() { return this._footer; }
    get numDictionaries() { return this._footer ? this._footer.numDictionaries : 0; }
    get numRecordBatches() { return this._footer ? this._footer.numRecordBatches : 0; }
    isSync() { return true; }
    isFile() { return true; }
    open(options) {
        if (!this.closed && !this._footer) {
            this.schema = (this._footer = this._readFooter()).schema;
            for (const block of this._footer.dictionaryBatches()) {
                block && this._readDictionaryBatch(this._dictionaryIndex++);
            }
        }
        return super.open(options);
    }
    readRecordBatch(index) {
        if (this.closed) {
            return null;
        }
        if (!this._footer) {
            this.open();
        }
        const block = this._footer && this._footer.getRecordBatch(index);
        if (block && this._handle.seek(block.offset)) {
            const message = this._reader.readMessage(enum_1.MessageHeader.RecordBatch);
            if (message && message.isRecordBatch()) {
                const header = message.header();
                const buffer = this._reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return recordBatch;
            }
        }
        return null;
    }
    _readDictionaryBatch(index) {
        const block = this._footer && this._footer.getDictionaryBatch(index);
        if (block && this._handle.seek(block.offset)) {
            const message = this._reader.readMessage(enum_1.MessageHeader.DictionaryBatch);
            if (message && message.isDictionaryBatch()) {
                const header = message.header();
                const buffer = this._reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
    }
    _readFooter() {
        const { _handle } = this;
        const offset = _handle.size - message_1.magicAndPadding;
        const length = _handle.readInt32(offset);
        const buffer = _handle.readAt(offset - length, length);
        return file_1.Footer.decode(buffer);
    }
    _readNextMessageAndValidate(type) {
        if (!this._footer) {
            this.open();
        }
        if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
            const block = this._footer && this._footer.getRecordBatch(this._recordBatchIndex);
            if (block && this._handle.seek(block.offset)) {
                return this._reader.readMessage(type);
            }
        }
        return null;
    }
}
/** @ignore */
class AsyncRecordBatchFileReaderImpl extends AsyncRecordBatchStreamReaderImpl {
    constructor(source, ...rest) {
        const byteLength = typeof rest[0] !== 'number' ? rest.shift() : undefined;
        const dictionaries = rest[0] instanceof Map ? rest.shift() : undefined;
        super(source instanceof file_2.AsyncRandomAccessFile ? source : new file_2.AsyncRandomAccessFile(source, byteLength), dictionaries);
    }
    get footer() { return this._footer; }
    get numDictionaries() { return this._footer ? this._footer.numDictionaries : 0; }
    get numRecordBatches() { return this._footer ? this._footer.numRecordBatches : 0; }
    isFile() { return true; }
    isAsync() { return true; }
    async open(options) {
        if (!this.closed && !this._footer) {
            this.schema = (this._footer = await this._readFooter()).schema;
            for (const block of this._footer.dictionaryBatches()) {
                block && await this._readDictionaryBatch(this._dictionaryIndex++);
            }
        }
        return await super.open(options);
    }
    async readRecordBatch(index) {
        if (this.closed) {
            return null;
        }
        if (!this._footer) {
            await this.open();
        }
        const block = this._footer && this._footer.getRecordBatch(index);
        if (block && (await this._handle.seek(block.offset))) {
            const message = await this._reader.readMessage(enum_1.MessageHeader.RecordBatch);
            if (message && message.isRecordBatch()) {
                const header = message.header();
                const buffer = await this._reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return recordBatch;
            }
        }
        return null;
    }
    async _readDictionaryBatch(index) {
        const block = this._footer && this._footer.getDictionaryBatch(index);
        if (block && (await this._handle.seek(block.offset))) {
            const message = await this._reader.readMessage(enum_1.MessageHeader.DictionaryBatch);
            if (message && message.isDictionaryBatch()) {
                const header = message.header();
                const buffer = await this._reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
    }
    async _readFooter() {
        const { _handle } = this;
        _handle._pending && await _handle._pending;
        const offset = _handle.size - message_1.magicAndPadding;
        const length = await _handle.readInt32(offset);
        const buffer = await _handle.readAt(offset - length, length);
        return file_1.Footer.decode(buffer);
    }
    async _readNextMessageAndValidate(type) {
        if (!this._footer) {
            await this.open();
        }
        if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
            const block = this._footer.getRecordBatch(this._recordBatchIndex);
            if (block && await this._handle.seek(block.offset)) {
                return await this._reader.readMessage(type);
            }
        }
        return null;
    }
}
/** @ignore */
class RecordBatchJSONReaderImpl extends RecordBatchStreamReaderImpl {
    constructor(source, dictionaries) {
        super(source, dictionaries);
    }
    _loadVectors(header, body, types) {
        return new vectorloader_1.JSONVectorLoader(body, header.nodes, header.buffers, this.dictionaries).visitMany(types);
    }
}
//
// Define some helper functions and static implementations down here. There's
// a bit of branching in the static methods that can lead to the same routines
// being executed, so we've broken those out here for readability.
//
/** @ignore */
function shouldAutoDestroy(self, options) {
    return options && (typeof options['autoDestroy'] === 'boolean') ? options['autoDestroy'] : self['autoDestroy'];
}
/** @ignore */
function* readAllSync(source) {
    const reader = RecordBatchReader.from(source);
    try {
        if (!reader.open({ autoDestroy: false }).closed) {
            do {
                yield reader;
            } while (!(reader.reset().open()).closed);
        }
    }
    finally {
        reader.cancel();
    }
}
/** @ignore */
async function* readAllAsync(source) {
    const reader = await RecordBatchReader.from(source);
    try {
        if (!(await reader.open({ autoDestroy: false })).closed) {
            do {
                yield reader;
            } while (!(await reader.reset().open()).closed);
        }
    }
    finally {
        await reader.cancel();
    }
}
/** @ignore */
function fromArrowJSON(source) {
    return new RecordBatchStreamReader(new RecordBatchJSONReaderImpl(source));
}
/** @ignore */
function fromByteStream(source) {
    const bytes = source.peek((message_1.magicLength + 7) & ~7);
    return bytes && bytes.byteLength >= 4 ? !message_1.checkForMagicArrowString(bytes)
        ? new RecordBatchStreamReader(new RecordBatchStreamReaderImpl(source))
        : new RecordBatchFileReader(new RecordBatchFileReaderImpl(source.read()))
        : new RecordBatchStreamReader(new RecordBatchStreamReaderImpl(function* () { }()));
}
/** @ignore */
async function fromAsyncByteStream(source) {
    const bytes = await source.peek((message_1.magicLength + 7) & ~7);
    return bytes && bytes.byteLength >= 4 ? !message_1.checkForMagicArrowString(bytes)
        ? new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(source))
        : new RecordBatchFileReader(new RecordBatchFileReaderImpl(await source.read()))
        : new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(async function* () { }()));
}
/** @ignore */
async function fromFileHandle(source) {
    const { size } = await source.stat();
    const file = new file_2.AsyncRandomAccessFile(source, size);
    if (size >= message_1.magicX2AndPadding) {
        if (message_1.checkForMagicArrowString(await file.readAt(0, (message_1.magicLength + 7) & ~7))) {
            return new AsyncRecordBatchFileReader(new AsyncRecordBatchFileReaderImpl(file));
        }
    }
    return new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(file));
}



},{"../vector":"node_modules/apache-arrow/vector.js","../enum":"node_modules/apache-arrow/enum.js","./metadata/file":"node_modules/apache-arrow/ipc/metadata/file.js","../io/adapters":"node_modules/apache-arrow/io/adapters.js","../io/stream":"node_modules/apache-arrow/io/stream.js","../io/file":"node_modules/apache-arrow/io/file.js","../visitor/vectorloader":"node_modules/apache-arrow/visitor/vectorloader.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js","../io/interfaces":"node_modules/apache-arrow/io/interfaces.js","./message":"node_modules/apache-arrow/ipc/message.js","../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/io/whatwg/iterable.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../../util/buffer");
const compat_1 = require("../../util/compat");
/** @ignore */
function toDOMStream(source, options) {
    if (compat_1.isAsyncIterable(source)) {
        return asyncIterableAsReadableDOMStream(source, options);
    }
    if (compat_1.isIterable(source)) {
        return iterableAsReadableDOMStream(source, options);
    }
    /* istanbul ignore next */
    throw new Error(`toDOMStream() must be called with an Iterable or AsyncIterable`);
}
exports.toDOMStream = toDOMStream;
/** @ignore */
function iterableAsReadableDOMStream(source, options) {
    let it = null;
    const bm = (options && options.type === 'bytes') || false;
    const hwm = options && options.highWaterMark || (2 ** 24);
    return new ReadableStream({
        ...options,
        start(controller) { next(controller, it || (it = source[Symbol.iterator]())); },
        pull(controller) { it ? (next(controller, it)) : controller.close(); },
        cancel() { (it && (it.return && it.return()) || true) && (it = null); }
    }, { highWaterMark: bm ? hwm : undefined, ...options });
    function next(controller, it) {
        let buf;
        let r = null;
        let size = controller.desiredSize || null;
        while (!(r = it.next(bm ? size : null)).done) {
            if (ArrayBuffer.isView(r.value) && (buf = buffer_1.toUint8Array(r.value))) {
                size != null && bm && (size = size - buf.byteLength + 1);
                r.value = buf;
            }
            controller.enqueue(r.value);
            if (size != null && --size <= 0) {
                return;
            }
        }
        controller.close();
    }
}
/** @ignore */
function asyncIterableAsReadableDOMStream(source, options) {
    let it = null;
    const bm = (options && options.type === 'bytes') || false;
    const hwm = options && options.highWaterMark || (2 ** 24);
    return new ReadableStream({
        ...options,
        async start(controller) { await next(controller, it || (it = source[Symbol.asyncIterator]())); },
        async pull(controller) { it ? (await next(controller, it)) : controller.close(); },
        async cancel() { (it && (it.return && await it.return()) || true) && (it = null); },
    }, { highWaterMark: bm ? hwm : undefined, ...options });
    async function next(controller, it) {
        let buf;
        let r = null;
        let size = controller.desiredSize || null;
        while (!(r = await it.next(bm ? size : null)).done) {
            if (ArrayBuffer.isView(r.value) && (buf = buffer_1.toUint8Array(r.value))) {
                size != null && bm && (size = size - buf.byteLength + 1);
                r.value = buf;
            }
            controller.enqueue(r.value);
            if (size != null && --size <= 0) {
                return;
            }
        }
        controller.close();
    }
}



},{"../../util/buffer":"node_modules/apache-arrow/util/buffer.js","../../util/compat":"node_modules/apache-arrow/util/compat.js"}],"node_modules/apache-arrow/io/whatwg/builder.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../builder/index");
/** @ignore */
function builderThroughDOMStream(options) {
    return new BuilderTransform(options);
}
exports.builderThroughDOMStream = builderThroughDOMStream;
/** @ignore */
class BuilderTransform {
    constructor(options) {
        // Access properties by string indexers to defeat closure compiler
        this._numChunks = 0;
        this._finished = false;
        this._bufferedSize = 0;
        const { ['readableStrategy']: readableStrategy, ['writableStrategy']: writableStrategy, ['queueingStrategy']: queueingStrategy = 'count', ...builderOptions } = options;
        this._controller = null;
        this._builder = index_1.Builder.new(builderOptions);
        this._getSize = queueingStrategy !== 'bytes' ? chunkLength : chunkByteLength;
        const { ['highWaterMark']: readableHighWaterMark = queueingStrategy === 'bytes' ? 2 ** 14 : 1000 } = { ...readableStrategy };
        const { ['highWaterMark']: writableHighWaterMark = queueingStrategy === 'bytes' ? 2 ** 14 : 1000 } = { ...writableStrategy };
        this['readable'] = new ReadableStream({
            ['cancel']: () => { this._builder.clear(); },
            ['pull']: (c) => { this._maybeFlush(this._builder, this._controller = c); },
            ['start']: (c) => { this._maybeFlush(this._builder, this._controller = c); },
        }, {
            'highWaterMark': readableHighWaterMark,
            'size': queueingStrategy !== 'bytes' ? chunkLength : chunkByteLength,
        });
        this['writable'] = new WritableStream({
            ['abort']: () => { this._builder.clear(); },
            ['write']: () => { this._maybeFlush(this._builder, this._controller); },
            ['close']: () => { this._maybeFlush(this._builder.finish(), this._controller); },
        }, {
            'highWaterMark': writableHighWaterMark,
            'size': (value) => this._writeValueAndReturnChunkSize(value),
        });
    }
    _writeValueAndReturnChunkSize(value) {
        const bufferedSize = this._bufferedSize;
        this._bufferedSize = this._getSize(this._builder.append(value));
        return this._bufferedSize - bufferedSize;
    }
    _maybeFlush(builder, controller) {
        if (controller === null) {
            return;
        }
        if (this._bufferedSize >= controller.desiredSize) {
            ++this._numChunks && this._enqueue(controller, builder.toVector());
        }
        if (builder.finished) {
            if (builder.length > 0 || this._numChunks === 0) {
                ++this._numChunks && this._enqueue(controller, builder.toVector());
            }
            if (!this._finished && (this._finished = true)) {
                this._enqueue(controller, null);
            }
        }
    }
    _enqueue(controller, chunk) {
        this._bufferedSize = 0;
        this._controller = null;
        chunk === null ? controller.close() : controller.enqueue(chunk);
    }
}
exports.BuilderTransform = BuilderTransform;
/** @ignore */ const chunkLength = (chunk) => chunk.length;
/** @ignore */ const chunkByteLength = (chunk) => chunk.byteLength;



},{"../../builder/index":"node_modules/apache-arrow/builder/index.js"}],"node_modules/apache-arrow/io/whatwg/reader.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../../io/stream");
const reader_1 = require("../../ipc/reader");
/** @ignore */
function recordBatchReaderThroughDOMStream(writableStrategy, readableStrategy) {
    const queue = new stream_1.AsyncByteQueue();
    let reader = null;
    const readable = new ReadableStream({
        async cancel() { await queue.close(); },
        async start(controller) { await next(controller, reader || (reader = await open())); },
        async pull(controller) { reader ? await next(controller, reader) : controller.close(); }
    });
    return { writable: new WritableStream(queue, { 'highWaterMark': 2 ** 14, ...writableStrategy }), readable };
    async function open() {
        return await (await reader_1.RecordBatchReader.from(queue)).open(readableStrategy);
    }
    async function next(controller, reader) {
        let size = controller.desiredSize;
        let r = null;
        while (!(r = await reader.next()).done) {
            controller.enqueue(r.value);
            if (size != null && --size <= 0) {
                return;
            }
        }
        controller.close();
    }
}
exports.recordBatchReaderThroughDOMStream = recordBatchReaderThroughDOMStream;



},{"../../io/stream":"node_modules/apache-arrow/io/stream.js","../../ipc/reader":"node_modules/apache-arrow/ipc/reader.js"}],"node_modules/apache-arrow/io/whatwg/writer.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../../io/stream");
/** @ignore */
function recordBatchWriterThroughDOMStream(writableStrategy, readableStrategy) {
    const writer = new this(writableStrategy);
    const reader = new stream_1.AsyncByteStream(writer);
    const readable = new ReadableStream({
        type: 'bytes',
        async cancel() { await reader.cancel(); },
        async pull(controller) { await next(controller); },
        async start(controller) { await next(controller); },
    }, { 'highWaterMark': 2 ** 14, ...readableStrategy });
    return { writable: new WritableStream(writer, writableStrategy), readable };
    async function next(controller) {
        let buf = null;
        let size = controller.desiredSize;
        while (buf = await reader.read(size || null)) {
            controller.enqueue(buf);
            if (size != null && (size -= buf.byteLength) <= 0) {
                return;
            }
        }
        controller.close();
    }
}
exports.recordBatchWriterThroughDOMStream = recordBatchWriterThroughDOMStream;



},{"../../io/stream":"node_modules/apache-arrow/io/stream.js"}],"node_modules/apache-arrow/compute/predicate.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = require("../vector/dictionary");
/** @ignore */
class Value {
    eq(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new Equals(this, other);
    }
    le(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new LTeq(this, other);
    }
    ge(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new GTeq(this, other);
    }
    lt(other) {
        return new Not(this.ge(other));
    }
    gt(other) {
        return new Not(this.le(other));
    }
    ne(other) {
        return new Not(this.eq(other));
    }
}
exports.Value = Value;
/** @ignore */
class Literal extends Value {
    constructor(v) {
        super();
        this.v = v;
    }
}
exports.Literal = Literal;
/** @ignore */
class Col extends Value {
    constructor(name) {
        super();
        this.name = name;
    }
    bind(batch) {
        if (!this.colidx) {
            // Assume column index doesn't change between calls to bind
            //this.colidx = cols.findIndex(v => v.name.indexOf(this.name) != -1);
            this.colidx = -1;
            const fields = batch.schema.fields;
            for (let idx = -1; ++idx < fields.length;) {
                if (fields[idx].name === this.name) {
                    this.colidx = idx;
                    break;
                }
            }
            if (this.colidx < 0) {
                throw new Error(`Failed to bind Col "${this.name}"`);
            }
        }
        const vec = this.vector = batch.getChildAt(this.colidx);
        return (idx) => vec.get(idx);
    }
}
exports.Col = Col;
/** @ignore */
class Predicate {
    and(...expr) { return new And(this, ...expr); }
    or(...expr) { return new Or(this, ...expr); }
    not() { return new Not(this); }
}
exports.Predicate = Predicate;
/** @ignore */
class ComparisonPredicate extends Predicate {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    bind(batch) {
        if (this.left instanceof Literal) {
            if (this.right instanceof Literal) {
                return this._bindLitLit(batch, this.left, this.right);
            }
            else { // right is a Col
                return this._bindLitCol(batch, this.left, this.right);
            }
        }
        else { // left is a Col
            if (this.right instanceof Literal) {
                return this._bindColLit(batch, this.left, this.right);
            }
            else { // right is a Col
                return this._bindColCol(batch, this.left, this.right);
            }
        }
    }
}
exports.ComparisonPredicate = ComparisonPredicate;
/** @ignore */
class CombinationPredicate extends Predicate {
    constructor(...children) {
        super();
        this.children = children;
    }
}
exports.CombinationPredicate = CombinationPredicate;
// add children to prototype so it doesn't get mangled in es2015/umd
CombinationPredicate.prototype.children = Object.freeze([]); // freeze for safety
/** @ignore */
class And extends CombinationPredicate {
    constructor(...children) {
        // Flatten any Ands
        children = children.reduce((accum, p) => {
            return accum.concat(p instanceof And ? p.children : p);
        }, []);
        super(...children);
    }
    bind(batch) {
        const bound = this.children.map((p) => p.bind(batch));
        return (idx, batch) => bound.every((p) => p(idx, batch));
    }
}
exports.And = And;
/** @ignore */
class Or extends CombinationPredicate {
    constructor(...children) {
        // Flatten any Ors
        children = children.reduce((accum, p) => {
            return accum.concat(p instanceof Or ? p.children : p);
        }, []);
        super(...children);
    }
    bind(batch) {
        const bound = this.children.map((p) => p.bind(batch));
        return (idx, batch) => bound.some((p) => p(idx, batch));
    }
}
exports.Or = Or;
/** @ignore */
class Equals extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v == right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, batch) => left_func(idx, batch) == right_func(idx, batch);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        if (col.vector instanceof dictionary_1.DictionaryVector) {
            let key;
            const vector = col.vector;
            if (vector.dictionary !== this.lastDictionary) {
                key = vector.reverseLookup(lit.v);
                this.lastDictionary = vector.dictionary;
                this.lastKey = key;
            }
            else {
                key = this.lastKey;
            }
            if (key === -1) {
                // the value doesn't exist in the dictionary - always return
                // false
                // TODO: special-case of PredicateFunc that encapsulates this
                // "always false" behavior. That way filtering operations don't
                // have to bother checking
                return () => false;
            }
            else {
                return (idx) => {
                    return vector.getKey(idx) === key;
                };
            }
        }
        else {
            return (idx, cols) => col_func(idx, cols) == lit.v;
        }
    }
    _bindLitCol(batch, lit, col) {
        // Equals is commutative
        return this._bindColLit(batch, col, lit);
    }
}
exports.Equals = Equals;
/** @ignore */
class LTeq extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v <= right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, cols) => left_func(idx, cols) <= right_func(idx, cols);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        return (idx, cols) => col_func(idx, cols) <= lit.v;
    }
    _bindLitCol(batch, lit, col) {
        const col_func = col.bind(batch);
        return (idx, cols) => lit.v <= col_func(idx, cols);
    }
}
exports.LTeq = LTeq;
/** @ignore */
class GTeq extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v >= right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, cols) => left_func(idx, cols) >= right_func(idx, cols);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        return (idx, cols) => col_func(idx, cols) >= lit.v;
    }
    _bindLitCol(batch, lit, col) {
        const col_func = col.bind(batch);
        return (idx, cols) => lit.v >= col_func(idx, cols);
    }
}
exports.GTeq = GTeq;
/** @ignore */
class Not extends Predicate {
    constructor(child) {
        super();
        this.child = child;
    }
    bind(batch) {
        const func = this.child.bind(batch);
        return (idx, batch) => !func(idx, batch);
    }
}
exports.Not = Not;
/** @ignore */
class CustomPredicate extends Predicate {
    constructor(next, bind_) {
        super();
        this.next = next;
        this.bind_ = bind_;
    }
    bind(batch) {
        this.bind_(batch);
        return this.next;
    }
}
exports.CustomPredicate = CustomPredicate;
function lit(v) { return new Literal(v); }
exports.lit = lit;
function col(n) { return new Col(n); }
exports.col = col;
function and(...p) { return new And(...p); }
exports.and = and;
function or(...p) { return new Or(...p); }
exports.or = or;
function custom(next, bind) {
    return new CustomPredicate(next, bind);
}
exports.custom = custom;



},{"../vector/dictionary":"node_modules/apache-arrow/vector/dictionary.js"}],"node_modules/apache-arrow/compute/dataframe.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const int_1 = require("../vector/int");
const schema_1 = require("../schema");
const predicate_1 = require("./predicate");
const recordbatch_1 = require("../recordbatch");
const type_1 = require("../type");
table_1.Table.prototype.countBy = function (name) { return new DataFrame(this.chunks).countBy(name); };
table_1.Table.prototype.scan = function (next, bind) { return new DataFrame(this.chunks).scan(next, bind); };
table_1.Table.prototype.scanReverse = function (next, bind) { return new DataFrame(this.chunks).scanReverse(next, bind); };
table_1.Table.prototype.filter = function (predicate) { return new DataFrame(this.chunks).filter(predicate); };
class DataFrame extends table_1.Table {
    filter(predicate) {
        return new FilteredDataFrame(this.chunks, predicate);
    }
    scan(next, bind) {
        const batches = this.chunks, numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            if (bind) {
                bind(batch);
            }
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                next(index, batch);
            }
        }
    }
    scanReverse(next, bind) {
        const batches = this.chunks, numBatches = batches.length;
        for (let batchIndex = numBatches; --batchIndex >= 0;) {
            // load batches
            const batch = batches[batchIndex];
            if (bind) {
                bind(batch);
            }
            // yield all indices
            for (let index = batch.length; --index >= 0;) {
                next(index, batch);
            }
        }
    }
    countBy(name) {
        const batches = this.chunks, numBatches = batches.length;
        const count_by = typeof name === 'string' ? new predicate_1.Col(name) : name;
        // Assume that all dictionary batches are deltas, which means that the
        // last record batch has the most complete dictionary
        count_by.bind(batches[numBatches - 1]);
        const vector = count_by.vector;
        if (!type_1.DataType.isDictionary(vector.type)) {
            throw new Error('countBy currently only supports dictionary-encoded columns');
        }
        const countByteLength = Math.ceil(Math.log(vector.length) / Math.log(256));
        const CountsArrayType = countByteLength == 4 ? Uint32Array :
            countByteLength >= 2 ? Uint16Array : Uint8Array;
        const counts = new CountsArrayType(vector.dictionary.length);
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            // rebind the countBy Col
            count_by.bind(batch);
            const keys = count_by.vector.indices;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                let key = keys.get(index);
                if (key !== null) {
                    counts[key]++;
                }
            }
        }
        return new CountByResult(vector.dictionary, int_1.IntVector.from(counts));
    }
}
exports.DataFrame = DataFrame;
/** @ignore */
class CountByResult extends table_1.Table {
    constructor(values, counts) {
        const schema = new schema_1.Schema([
            new schema_1.Field('values', values.type),
            new schema_1.Field('counts', counts.type)
        ]);
        super(new recordbatch_1.RecordBatch(schema, counts.length, [values, counts]));
    }
    toJSON() {
        const values = this.getColumnAt(0);
        const counts = this.getColumnAt(1);
        const result = {};
        for (let i = -1; ++i < this.length;) {
            result[values.get(i)] = counts.get(i);
        }
        return result;
    }
}
exports.CountByResult = CountByResult;
/** @ignore */
class FilteredDataFrame extends DataFrame {
    constructor(batches, predicate) {
        super(batches);
        this._predicate = predicate;
    }
    scan(next, bind) {
        // inlined version of this:
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) next(idx, columns);
        // });
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            let isBound = false;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                if (predicate(index, batch)) {
                    // bind batches lazily - if predicate doesn't match anything
                    // in the batch we don't need to call bind on the batch
                    if (bind && !isBound) {
                        bind(batch);
                        isBound = true;
                    }
                    next(index, batch);
                }
            }
        }
    }
    scanReverse(next, bind) {
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = numBatches; --batchIndex >= 0;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            let isBound = false;
            // yield all indices
            for (let index = batch.length; --index >= 0;) {
                if (predicate(index, batch)) {
                    // bind batches lazily - if predicate doesn't match anything
                    // in the batch we don't need to call bind on the batch
                    if (bind && !isBound) {
                        bind(batch);
                        isBound = true;
                    }
                    next(index, batch);
                }
            }
        }
    }
    count() {
        // inlined version of this:
        // let sum = 0;
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) ++sum;
        // });
        // return sum;
        let sum = 0;
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                if (predicate(index, batch)) {
                    ++sum;
                }
            }
        }
        return sum;
    }
    *[Symbol.iterator]() {
        // inlined version of this:
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) next(idx, columns);
        // });
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            // TODO: bind batches lazily
            // If predicate doesn't match anything in the batch we don't need
            // to bind the callback
            const predicate = this._predicate.bind(batch);
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                if (predicate(index, batch)) {
                    yield batch.get(index);
                }
            }
        }
    }
    filter(predicate) {
        return new FilteredDataFrame(this._chunks, this._predicate.and(predicate));
    }
    countBy(name) {
        const batches = this._chunks, numBatches = batches.length;
        const count_by = typeof name === 'string' ? new predicate_1.Col(name) : name;
        // Assume that all dictionary batches are deltas, which means that the
        // last record batch has the most complete dictionary
        count_by.bind(batches[numBatches - 1]);
        const vector = count_by.vector;
        if (!type_1.DataType.isDictionary(vector.type)) {
            throw new Error('countBy currently only supports dictionary-encoded columns');
        }
        const countByteLength = Math.ceil(Math.log(vector.length) / Math.log(256));
        const CountsArrayType = countByteLength == 4 ? Uint32Array :
            countByteLength >= 2 ? Uint16Array : Uint8Array;
        const counts = new CountsArrayType(vector.dictionary.length);
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            // rebind the countBy Col
            count_by.bind(batch);
            const keys = count_by.vector.indices;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                let key = keys.get(index);
                if (key !== null && predicate(index, batch)) {
                    counts[key]++;
                }
            }
        }
        return new CountByResult(vector.dictionary, int_1.IntVector.from(counts));
    }
}
exports.FilteredDataFrame = FilteredDataFrame;



},{"../table":"node_modules/apache-arrow/table.js","../vector/int":"node_modules/apache-arrow/vector/int.js","../schema":"node_modules/apache-arrow/schema.js","./predicate":"node_modules/apache-arrow/compute/predicate.js","../recordbatch":"node_modules/apache-arrow/recordbatch.js","../type":"node_modules/apache-arrow/type.js"}],"node_modules/apache-arrow/Arrow.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
exports.ArrowType = enum_1.ArrowType;
exports.DateUnit = enum_1.DateUnit;
exports.IntervalUnit = enum_1.IntervalUnit;
exports.MessageHeader = enum_1.MessageHeader;
exports.MetadataVersion = enum_1.MetadataVersion;
exports.Precision = enum_1.Precision;
exports.TimeUnit = enum_1.TimeUnit;
exports.Type = enum_1.Type;
exports.UnionMode = enum_1.UnionMode;
exports.BufferType = enum_1.BufferType;
var data_1 = require("./data");
exports.Data = data_1.Data;
var type_1 = require("./type");
exports.DataType = type_1.DataType;
exports.Null = type_1.Null;
exports.Bool = type_1.Bool;
exports.Int = type_1.Int;
exports.Int8 = type_1.Int8;
exports.Int16 = type_1.Int16;
exports.Int32 = type_1.Int32;
exports.Int64 = type_1.Int64;
exports.Uint8 = type_1.Uint8;
exports.Uint16 = type_1.Uint16;
exports.Uint32 = type_1.Uint32;
exports.Uint64 = type_1.Uint64;
exports.Float = type_1.Float;
exports.Float16 = type_1.Float16;
exports.Float32 = type_1.Float32;
exports.Float64 = type_1.Float64;
exports.Utf8 = type_1.Utf8;
exports.Binary = type_1.Binary;
exports.FixedSizeBinary = type_1.FixedSizeBinary;
exports.Date_ = type_1.Date_;
exports.DateDay = type_1.DateDay;
exports.DateMillisecond = type_1.DateMillisecond;
exports.Timestamp = type_1.Timestamp;
exports.TimestampSecond = type_1.TimestampSecond;
exports.TimestampMillisecond = type_1.TimestampMillisecond;
exports.TimestampMicrosecond = type_1.TimestampMicrosecond;
exports.TimestampNanosecond = type_1.TimestampNanosecond;
exports.Time = type_1.Time;
exports.TimeSecond = type_1.TimeSecond;
exports.TimeMillisecond = type_1.TimeMillisecond;
exports.TimeMicrosecond = type_1.TimeMicrosecond;
exports.TimeNanosecond = type_1.TimeNanosecond;
exports.Decimal = type_1.Decimal;
exports.List = type_1.List;
exports.Struct = type_1.Struct;
exports.Union = type_1.Union;
exports.DenseUnion = type_1.DenseUnion;
exports.SparseUnion = type_1.SparseUnion;
exports.Dictionary = type_1.Dictionary;
exports.Interval = type_1.Interval;
exports.IntervalDayTime = type_1.IntervalDayTime;
exports.IntervalYearMonth = type_1.IntervalYearMonth;
exports.FixedSizeList = type_1.FixedSizeList;
exports.Map_ = type_1.Map_;
var table_1 = require("./table");
exports.Table = table_1.Table;
var column_1 = require("./column");
exports.Column = column_1.Column;
var visitor_1 = require("./visitor");
exports.Visitor = visitor_1.Visitor;
var schema_1 = require("./schema");
exports.Schema = schema_1.Schema;
exports.Field = schema_1.Field;
var index_1 = require("./vector/index");
exports.Vector = index_1.Vector;
exports.BaseVector = index_1.BaseVector;
exports.BinaryVector = index_1.BinaryVector;
exports.BoolVector = index_1.BoolVector;
exports.Chunked = index_1.Chunked;
exports.DateVector = index_1.DateVector;
exports.DateDayVector = index_1.DateDayVector;
exports.DateMillisecondVector = index_1.DateMillisecondVector;
exports.DecimalVector = index_1.DecimalVector;
exports.DictionaryVector = index_1.DictionaryVector;
exports.FixedSizeBinaryVector = index_1.FixedSizeBinaryVector;
exports.FixedSizeListVector = index_1.FixedSizeListVector;
exports.FloatVector = index_1.FloatVector;
exports.Float16Vector = index_1.Float16Vector;
exports.Float32Vector = index_1.Float32Vector;
exports.Float64Vector = index_1.Float64Vector;
exports.IntervalVector = index_1.IntervalVector;
exports.IntervalDayTimeVector = index_1.IntervalDayTimeVector;
exports.IntervalYearMonthVector = index_1.IntervalYearMonthVector;
exports.IntVector = index_1.IntVector;
exports.Int8Vector = index_1.Int8Vector;
exports.Int16Vector = index_1.Int16Vector;
exports.Int32Vector = index_1.Int32Vector;
exports.Int64Vector = index_1.Int64Vector;
exports.Uint8Vector = index_1.Uint8Vector;
exports.Uint16Vector = index_1.Uint16Vector;
exports.Uint32Vector = index_1.Uint32Vector;
exports.Uint64Vector = index_1.Uint64Vector;
exports.ListVector = index_1.ListVector;
exports.MapVector = index_1.MapVector;
exports.NullVector = index_1.NullVector;
exports.StructVector = index_1.StructVector;
exports.TimestampVector = index_1.TimestampVector;
exports.TimestampSecondVector = index_1.TimestampSecondVector;
exports.TimestampMillisecondVector = index_1.TimestampMillisecondVector;
exports.TimestampMicrosecondVector = index_1.TimestampMicrosecondVector;
exports.TimestampNanosecondVector = index_1.TimestampNanosecondVector;
exports.TimeVector = index_1.TimeVector;
exports.TimeSecondVector = index_1.TimeSecondVector;
exports.TimeMillisecondVector = index_1.TimeMillisecondVector;
exports.TimeMicrosecondVector = index_1.TimeMicrosecondVector;
exports.TimeNanosecondVector = index_1.TimeNanosecondVector;
exports.UnionVector = index_1.UnionVector;
exports.DenseUnionVector = index_1.DenseUnionVector;
exports.SparseUnionVector = index_1.SparseUnionVector;
exports.Utf8Vector = index_1.Utf8Vector;
var index_2 = require("./builder/index");
exports.Builder = index_2.Builder;
exports.BinaryBuilder = index_2.BinaryBuilder;
exports.BoolBuilder = index_2.BoolBuilder;
exports.DateBuilder = index_2.DateBuilder;
exports.DateDayBuilder = index_2.DateDayBuilder;
exports.DateMillisecondBuilder = index_2.DateMillisecondBuilder;
exports.DecimalBuilder = index_2.DecimalBuilder;
exports.DictionaryBuilder = index_2.DictionaryBuilder;
exports.FixedSizeBinaryBuilder = index_2.FixedSizeBinaryBuilder;
exports.FixedSizeListBuilder = index_2.FixedSizeListBuilder;
exports.FloatBuilder = index_2.FloatBuilder;
exports.Float16Builder = index_2.Float16Builder;
exports.Float32Builder = index_2.Float32Builder;
exports.Float64Builder = index_2.Float64Builder;
exports.IntervalBuilder = index_2.IntervalBuilder;
exports.IntervalDayTimeBuilder = index_2.IntervalDayTimeBuilder;
exports.IntervalYearMonthBuilder = index_2.IntervalYearMonthBuilder;
exports.IntBuilder = index_2.IntBuilder;
exports.Int8Builder = index_2.Int8Builder;
exports.Int16Builder = index_2.Int16Builder;
exports.Int32Builder = index_2.Int32Builder;
exports.Int64Builder = index_2.Int64Builder;
exports.Uint8Builder = index_2.Uint8Builder;
exports.Uint16Builder = index_2.Uint16Builder;
exports.Uint32Builder = index_2.Uint32Builder;
exports.Uint64Builder = index_2.Uint64Builder;
exports.ListBuilder = index_2.ListBuilder;
exports.MapBuilder = index_2.MapBuilder;
exports.NullBuilder = index_2.NullBuilder;
exports.StructBuilder = index_2.StructBuilder;
exports.TimestampBuilder = index_2.TimestampBuilder;
exports.TimestampSecondBuilder = index_2.TimestampSecondBuilder;
exports.TimestampMillisecondBuilder = index_2.TimestampMillisecondBuilder;
exports.TimestampMicrosecondBuilder = index_2.TimestampMicrosecondBuilder;
exports.TimestampNanosecondBuilder = index_2.TimestampNanosecondBuilder;
exports.TimeBuilder = index_2.TimeBuilder;
exports.TimeSecondBuilder = index_2.TimeSecondBuilder;
exports.TimeMillisecondBuilder = index_2.TimeMillisecondBuilder;
exports.TimeMicrosecondBuilder = index_2.TimeMicrosecondBuilder;
exports.TimeNanosecondBuilder = index_2.TimeNanosecondBuilder;
exports.UnionBuilder = index_2.UnionBuilder;
exports.DenseUnionBuilder = index_2.DenseUnionBuilder;
exports.SparseUnionBuilder = index_2.SparseUnionBuilder;
exports.Utf8Builder = index_2.Utf8Builder;
var stream_1 = require("./io/stream");
exports.ByteStream = stream_1.ByteStream;
exports.AsyncByteStream = stream_1.AsyncByteStream;
exports.AsyncByteQueue = stream_1.AsyncByteQueue;
var reader_1 = require("./ipc/reader");
exports.RecordBatchReader = reader_1.RecordBatchReader;
exports.RecordBatchFileReader = reader_1.RecordBatchFileReader;
exports.RecordBatchStreamReader = reader_1.RecordBatchStreamReader;
exports.AsyncRecordBatchFileReader = reader_1.AsyncRecordBatchFileReader;
exports.AsyncRecordBatchStreamReader = reader_1.AsyncRecordBatchStreamReader;
var writer_1 = require("./ipc/writer");
exports.RecordBatchWriter = writer_1.RecordBatchWriter;
exports.RecordBatchFileWriter = writer_1.RecordBatchFileWriter;
exports.RecordBatchStreamWriter = writer_1.RecordBatchStreamWriter;
exports.RecordBatchJSONWriter = writer_1.RecordBatchJSONWriter;
var message_1 = require("./ipc/message");
exports.MessageReader = message_1.MessageReader;
exports.AsyncMessageReader = message_1.AsyncMessageReader;
exports.JSONMessageReader = message_1.JSONMessageReader;
var message_2 = require("./ipc/metadata/message");
exports.Message = message_2.Message;
var recordbatch_1 = require("./recordbatch");
exports.RecordBatch = recordbatch_1.RecordBatch;
var dataframe_1 = require("./compute/dataframe");
exports.DataFrame = dataframe_1.DataFrame;
exports.FilteredDataFrame = dataframe_1.FilteredDataFrame;
exports.CountByResult = dataframe_1.CountByResult;
const util_bn_ = require("./util/bn");
const util_int_ = require("./util/int");
const util_bit_ = require("./util/bit");
const util_math_ = require("./util/math");
const util_buffer_ = require("./util/buffer");
const util_vector_ = require("./util/vector");
const predicate = require("./compute/predicate");
exports.predicate = predicate;
/** @ignore */
exports.util = {
    ...util_bn_,
    ...util_int_,
    ...util_bit_,
    ...util_math_,
    ...util_buffer_,
    ...util_vector_
};



},{"./enum":"node_modules/apache-arrow/enum.js","./data":"node_modules/apache-arrow/data.js","./type":"node_modules/apache-arrow/type.js","./table":"node_modules/apache-arrow/table.js","./column":"node_modules/apache-arrow/column.js","./visitor":"node_modules/apache-arrow/visitor.js","./schema":"node_modules/apache-arrow/schema.js","./vector/index":"node_modules/apache-arrow/vector/index.js","./builder/index":"node_modules/apache-arrow/builder/index.js","./io/stream":"node_modules/apache-arrow/io/stream.js","./ipc/reader":"node_modules/apache-arrow/ipc/reader.js","./ipc/writer":"node_modules/apache-arrow/ipc/writer.js","./ipc/message":"node_modules/apache-arrow/ipc/message.js","./ipc/metadata/message":"node_modules/apache-arrow/ipc/metadata/message.js","./recordbatch":"node_modules/apache-arrow/recordbatch.js","./compute/dataframe":"node_modules/apache-arrow/compute/dataframe.js","./util/bn":"node_modules/apache-arrow/util/bn.js","./util/int":"node_modules/apache-arrow/util/int.js","./util/bit":"node_modules/apache-arrow/util/bit.js","./util/math":"node_modules/apache-arrow/util/math.js","./util/buffer":"node_modules/apache-arrow/util/buffer.js","./util/vector":"node_modules/apache-arrow/util/vector.js","./compute/predicate":"node_modules/apache-arrow/compute/predicate.js"}],"node_modules/apache-arrow/Arrow.dom.js":[function(require,module,exports) {
"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./io/adapters");
const index_1 = require("./builder/index");
const reader_1 = require("./ipc/reader");
const writer_1 = require("./ipc/writer");
const iterable_1 = require("./io/whatwg/iterable");
const builder_1 = require("./io/whatwg/builder");
const reader_2 = require("./io/whatwg/reader");
const writer_2 = require("./io/whatwg/writer");
adapters_1.default.toDOMStream = iterable_1.toDOMStream;
index_1.Builder['throughDOM'] = builder_1.builderThroughDOMStream;
reader_1.RecordBatchReader['throughDOM'] = reader_2.recordBatchReaderThroughDOMStream;
writer_1.RecordBatchWriter['throughDOM'] = writer_2.recordBatchWriterThroughDOMStream;
var Arrow_1 = require("./Arrow");
exports.ArrowType = Arrow_1.ArrowType;
exports.DateUnit = Arrow_1.DateUnit;
exports.IntervalUnit = Arrow_1.IntervalUnit;
exports.MessageHeader = Arrow_1.MessageHeader;
exports.MetadataVersion = Arrow_1.MetadataVersion;
exports.Precision = Arrow_1.Precision;
exports.TimeUnit = Arrow_1.TimeUnit;
exports.Type = Arrow_1.Type;
exports.UnionMode = Arrow_1.UnionMode;
exports.BufferType = Arrow_1.BufferType;
exports.Data = Arrow_1.Data;
exports.DataType = Arrow_1.DataType;
exports.Null = Arrow_1.Null;
exports.Bool = Arrow_1.Bool;
exports.Int = Arrow_1.Int;
exports.Int8 = Arrow_1.Int8;
exports.Int16 = Arrow_1.Int16;
exports.Int32 = Arrow_1.Int32;
exports.Int64 = Arrow_1.Int64;
exports.Uint8 = Arrow_1.Uint8;
exports.Uint16 = Arrow_1.Uint16;
exports.Uint32 = Arrow_1.Uint32;
exports.Uint64 = Arrow_1.Uint64;
exports.Float = Arrow_1.Float;
exports.Float16 = Arrow_1.Float16;
exports.Float32 = Arrow_1.Float32;
exports.Float64 = Arrow_1.Float64;
exports.Utf8 = Arrow_1.Utf8;
exports.Binary = Arrow_1.Binary;
exports.FixedSizeBinary = Arrow_1.FixedSizeBinary;
exports.Date_ = Arrow_1.Date_;
exports.DateDay = Arrow_1.DateDay;
exports.DateMillisecond = Arrow_1.DateMillisecond;
exports.Timestamp = Arrow_1.Timestamp;
exports.TimestampSecond = Arrow_1.TimestampSecond;
exports.TimestampMillisecond = Arrow_1.TimestampMillisecond;
exports.TimestampMicrosecond = Arrow_1.TimestampMicrosecond;
exports.TimestampNanosecond = Arrow_1.TimestampNanosecond;
exports.Time = Arrow_1.Time;
exports.TimeSecond = Arrow_1.TimeSecond;
exports.TimeMillisecond = Arrow_1.TimeMillisecond;
exports.TimeMicrosecond = Arrow_1.TimeMicrosecond;
exports.TimeNanosecond = Arrow_1.TimeNanosecond;
exports.Decimal = Arrow_1.Decimal;
exports.List = Arrow_1.List;
exports.Struct = Arrow_1.Struct;
exports.Union = Arrow_1.Union;
exports.DenseUnion = Arrow_1.DenseUnion;
exports.SparseUnion = Arrow_1.SparseUnion;
exports.Dictionary = Arrow_1.Dictionary;
exports.Interval = Arrow_1.Interval;
exports.IntervalDayTime = Arrow_1.IntervalDayTime;
exports.IntervalYearMonth = Arrow_1.IntervalYearMonth;
exports.FixedSizeList = Arrow_1.FixedSizeList;
exports.Map_ = Arrow_1.Map_;
exports.Table = Arrow_1.Table;
exports.Column = Arrow_1.Column;
exports.Schema = Arrow_1.Schema;
exports.Field = Arrow_1.Field;
exports.Visitor = Arrow_1.Visitor;
exports.Vector = Arrow_1.Vector;
exports.BaseVector = Arrow_1.BaseVector;
exports.BinaryVector = Arrow_1.BinaryVector;
exports.BoolVector = Arrow_1.BoolVector;
exports.Chunked = Arrow_1.Chunked;
exports.DateVector = Arrow_1.DateVector;
exports.DateDayVector = Arrow_1.DateDayVector;
exports.DateMillisecondVector = Arrow_1.DateMillisecondVector;
exports.DecimalVector = Arrow_1.DecimalVector;
exports.DictionaryVector = Arrow_1.DictionaryVector;
exports.FixedSizeBinaryVector = Arrow_1.FixedSizeBinaryVector;
exports.FixedSizeListVector = Arrow_1.FixedSizeListVector;
exports.FloatVector = Arrow_1.FloatVector;
exports.Float16Vector = Arrow_1.Float16Vector;
exports.Float32Vector = Arrow_1.Float32Vector;
exports.Float64Vector = Arrow_1.Float64Vector;
exports.IntervalVector = Arrow_1.IntervalVector;
exports.IntervalDayTimeVector = Arrow_1.IntervalDayTimeVector;
exports.IntervalYearMonthVector = Arrow_1.IntervalYearMonthVector;
exports.IntVector = Arrow_1.IntVector;
exports.Int8Vector = Arrow_1.Int8Vector;
exports.Int16Vector = Arrow_1.Int16Vector;
exports.Int32Vector = Arrow_1.Int32Vector;
exports.Int64Vector = Arrow_1.Int64Vector;
exports.Uint8Vector = Arrow_1.Uint8Vector;
exports.Uint16Vector = Arrow_1.Uint16Vector;
exports.Uint32Vector = Arrow_1.Uint32Vector;
exports.Uint64Vector = Arrow_1.Uint64Vector;
exports.ListVector = Arrow_1.ListVector;
exports.MapVector = Arrow_1.MapVector;
exports.NullVector = Arrow_1.NullVector;
exports.StructVector = Arrow_1.StructVector;
exports.TimestampVector = Arrow_1.TimestampVector;
exports.TimestampSecondVector = Arrow_1.TimestampSecondVector;
exports.TimestampMillisecondVector = Arrow_1.TimestampMillisecondVector;
exports.TimestampMicrosecondVector = Arrow_1.TimestampMicrosecondVector;
exports.TimestampNanosecondVector = Arrow_1.TimestampNanosecondVector;
exports.TimeVector = Arrow_1.TimeVector;
exports.TimeSecondVector = Arrow_1.TimeSecondVector;
exports.TimeMillisecondVector = Arrow_1.TimeMillisecondVector;
exports.TimeMicrosecondVector = Arrow_1.TimeMicrosecondVector;
exports.TimeNanosecondVector = Arrow_1.TimeNanosecondVector;
exports.UnionVector = Arrow_1.UnionVector;
exports.DenseUnionVector = Arrow_1.DenseUnionVector;
exports.SparseUnionVector = Arrow_1.SparseUnionVector;
exports.Utf8Vector = Arrow_1.Utf8Vector;
exports.ByteStream = Arrow_1.ByteStream;
exports.AsyncByteStream = Arrow_1.AsyncByteStream;
exports.AsyncByteQueue = Arrow_1.AsyncByteQueue;
exports.RecordBatchReader = Arrow_1.RecordBatchReader;
exports.RecordBatchFileReader = Arrow_1.RecordBatchFileReader;
exports.RecordBatchStreamReader = Arrow_1.RecordBatchStreamReader;
exports.AsyncRecordBatchFileReader = Arrow_1.AsyncRecordBatchFileReader;
exports.AsyncRecordBatchStreamReader = Arrow_1.AsyncRecordBatchStreamReader;
exports.RecordBatchWriter = Arrow_1.RecordBatchWriter;
exports.RecordBatchFileWriter = Arrow_1.RecordBatchFileWriter;
exports.RecordBatchStreamWriter = Arrow_1.RecordBatchStreamWriter;
exports.RecordBatchJSONWriter = Arrow_1.RecordBatchJSONWriter;
exports.MessageReader = Arrow_1.MessageReader;
exports.AsyncMessageReader = Arrow_1.AsyncMessageReader;
exports.JSONMessageReader = Arrow_1.JSONMessageReader;
exports.Message = Arrow_1.Message;
exports.RecordBatch = Arrow_1.RecordBatch;
exports.DataFrame = Arrow_1.DataFrame;
exports.FilteredDataFrame = Arrow_1.FilteredDataFrame;
exports.CountByResult = Arrow_1.CountByResult;
exports.predicate = Arrow_1.predicate;
exports.util = Arrow_1.util;
exports.Builder = Arrow_1.Builder;
exports.BinaryBuilder = Arrow_1.BinaryBuilder;
exports.BoolBuilder = Arrow_1.BoolBuilder;
exports.DateBuilder = Arrow_1.DateBuilder;
exports.DateDayBuilder = Arrow_1.DateDayBuilder;
exports.DateMillisecondBuilder = Arrow_1.DateMillisecondBuilder;
exports.DecimalBuilder = Arrow_1.DecimalBuilder;
exports.DictionaryBuilder = Arrow_1.DictionaryBuilder;
exports.FixedSizeBinaryBuilder = Arrow_1.FixedSizeBinaryBuilder;
exports.FixedSizeListBuilder = Arrow_1.FixedSizeListBuilder;
exports.FloatBuilder = Arrow_1.FloatBuilder;
exports.Float16Builder = Arrow_1.Float16Builder;
exports.Float32Builder = Arrow_1.Float32Builder;
exports.Float64Builder = Arrow_1.Float64Builder;
exports.IntervalBuilder = Arrow_1.IntervalBuilder;
exports.IntervalDayTimeBuilder = Arrow_1.IntervalDayTimeBuilder;
exports.IntervalYearMonthBuilder = Arrow_1.IntervalYearMonthBuilder;
exports.IntBuilder = Arrow_1.IntBuilder;
exports.Int8Builder = Arrow_1.Int8Builder;
exports.Int16Builder = Arrow_1.Int16Builder;
exports.Int32Builder = Arrow_1.Int32Builder;
exports.Int64Builder = Arrow_1.Int64Builder;
exports.Uint8Builder = Arrow_1.Uint8Builder;
exports.Uint16Builder = Arrow_1.Uint16Builder;
exports.Uint32Builder = Arrow_1.Uint32Builder;
exports.Uint64Builder = Arrow_1.Uint64Builder;
exports.ListBuilder = Arrow_1.ListBuilder;
exports.MapBuilder = Arrow_1.MapBuilder;
exports.NullBuilder = Arrow_1.NullBuilder;
exports.StructBuilder = Arrow_1.StructBuilder;
exports.TimestampBuilder = Arrow_1.TimestampBuilder;
exports.TimestampSecondBuilder = Arrow_1.TimestampSecondBuilder;
exports.TimestampMillisecondBuilder = Arrow_1.TimestampMillisecondBuilder;
exports.TimestampMicrosecondBuilder = Arrow_1.TimestampMicrosecondBuilder;
exports.TimestampNanosecondBuilder = Arrow_1.TimestampNanosecondBuilder;
exports.TimeBuilder = Arrow_1.TimeBuilder;
exports.TimeSecondBuilder = Arrow_1.TimeSecondBuilder;
exports.TimeMillisecondBuilder = Arrow_1.TimeMillisecondBuilder;
exports.TimeMicrosecondBuilder = Arrow_1.TimeMicrosecondBuilder;
exports.TimeNanosecondBuilder = Arrow_1.TimeNanosecondBuilder;
exports.UnionBuilder = Arrow_1.UnionBuilder;
exports.DenseUnionBuilder = Arrow_1.DenseUnionBuilder;
exports.SparseUnionBuilder = Arrow_1.SparseUnionBuilder;
exports.Utf8Builder = Arrow_1.Utf8Builder;



},{"./io/adapters":"node_modules/apache-arrow/io/adapters.js","./builder/index":"node_modules/apache-arrow/builder/index.js","./ipc/reader":"node_modules/apache-arrow/ipc/reader.js","./ipc/writer":"node_modules/apache-arrow/ipc/writer.js","./io/whatwg/iterable":"node_modules/apache-arrow/io/whatwg/iterable.js","./io/whatwg/builder":"node_modules/apache-arrow/io/whatwg/builder.js","./io/whatwg/reader":"node_modules/apache-arrow/io/whatwg/reader.js","./io/whatwg/writer":"node_modules/apache-arrow/io/whatwg/writer.js","./Arrow":"node_modules/apache-arrow/Arrow.js"}],"dist/index.js":[function(require,module,exports) {
"use strict";

var _apacheArrow = require("apache-arrow");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function renderHeader(ds, thead, columns) {
  var tr = document.createElement('tr');
  thead.appendChild(tr); // Row number

  var th = document.createElement('th');
  tr.appendChild(th);

  for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
    var col = columns_1[_i];
    var th_1 = document.createElement('th');
    th_1.innerText = col;
    tr.appendChild(th_1);
  }
}

function renderBody(ds, tbody, columns) {
  for (var i = 0; i < ds.length; i++) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr); // Row number

    var td = document.createElement('td');
    td.innerText = i.toString();
    tr.appendChild(td);
    var row = ds.get(i);

    for (var j = 0; j < columns.length; j++) {
      renderCell(row.getValue(j), tr);
    }
  }
}

function renderCell(data, tr) {
  var td = document.createElement('td');
  td.innerText = JSON.stringify(data);
  tr.appendChild(td);
}

function renderTable(ds) {
  var thead = document.querySelector('thead');
  var tbody = document.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';
  var columnNames = ds.schema.fields.map(function (f) {
    return f.name;
  });
  renderHeader(ds, thead, columnNames);
  renderBody(ds, tbody, columnNames);
}

function cleanTable() {
  console.log('cleanTable');
  var thead = document.querySelector('thead');
  var tbody = document.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';
}

function showArrow(url) {
  return __awaiter(this, void 0, void 0, function () {
    var table;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (url == null) {
            return [2
            /*return*/
            ];
          }

          return [4
          /*yield*/
          , _apacheArrow.Table.from(fetch(url))];

        case 1:
          table = _a.sent();
          console.log(table);
          window['table'] = table;
          console.log(table.schema);
          renderTable(table);
          console.log('length: ', table.length);
          return [2
          /*return*/
          ];
      }
    });
  });
}

function main() {
  var _this = this;

  var button = document.querySelector('button');
  var input = document.querySelector('input');

  var downloadAndShow = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var url;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            button.innerText = "loading ...";
            cleanTable();
            url = input.value;
            return [4
            /*yield*/
            , showArrow(url)];

          case 1:
            _a.sent();

            button.innerText = "SHOW";
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  button.onclick = downloadAndShow;

  input.onkeydown = function (ev) {
    if (ev.key == 'Enter') {
      downloadAndShow();
    }
  };
}

main();
},{"apache-arrow":"node_modules/apache-arrow/Arrow.dom.js"}]},{},["dist/index.js"], null)
//# sourceMappingURL=/dist.de44d8ea.js.map