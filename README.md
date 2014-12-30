##libSIT

`libSIT` is a collection of - at least for me - usefull javascript functions.

##Why another one?

I started this because i had a growing number of utility functions and wanted them to be at one place - `libsit.js`.

I did not want to include huge libraries like jQuery and others and sometimes they did not have what i was looking for.

##Setup

Add `libsit.js` to your html.

##Usage
-----

To use this library you need to download the `libSIT.js` file and place it into your web folder.
Then include it into your html page.

Here is a small striped down html example that shows how to include and use the library:

      <html>
        <head>
          <script type="text/javascript" src="../js/libsit.js"></script>
        </head>

        <body>
          <script>
          document.write("19670319 Bytes are " + SIT.fn.humanReadableBytes(19670319, 1) + ".<br>");
          </script>
        </body>
      </html>

For more examples refer to the examples folder.


##License
The MIT License (MIT)

Copyright (c) 2014 Andreas Schaefer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
