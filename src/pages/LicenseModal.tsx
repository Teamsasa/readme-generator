import React from "react";

interface LicenseModalProps {
  onClose: () => void;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ onClose }) => {
  return (
    <div className="modal py-6">
      <div className="modal-content">
        <span className="close text-4xl cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <h1 className="pt-3">software product license</h1>
        <p>
          MIT License
          <br />
          <br />
          Copyright (c) 2020 Casper
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the &rdquo;Software&rdquo;),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all
          <br />
          copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED &rdquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN THE
          <br />
          SOFTWARE.
          <br />
          <br />
          Copyright (c) 2020 ryo-ma
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          <br />
          a copy of this software and associated documentation files (the
          <br />
          &rdquo;Software&rdquo;), to deal in the Software without restriction, including
          <br />
          without limitation the rights to use, copy, modify, merge, publish,
          <br />
          distribute, sublicense, and/or sell copies of the Software, and to
          <br />
          permit persons to whom the Software is furnished to do so, subject to
          <br />
          the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          <br />
          included in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED &rdquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND,
          <br />
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          <br />
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          <br />
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          <br />
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          <br />
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          <br />
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </div>
  );
};

export default LicenseModal;
