import React from "react";
import Header from "./Header";

export default function About() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{marginLeft: "10%", marginRight: "10%"}}>
        <div style={{marginTop: "3%", marginBottom: "3%"}}>
          <h2>About the website</h2>
          <p>
            Planning to work and live in the US? Wondering whether this company
            will sponsor your H-1B visa? If that’s you, you have come to the
            right place!
          </p>
          <p>
            Stay in the US helps you easily search for companies based on your
            preferences and interests. From there, you can learn how much those
            companies have sponsored H1-B visas over the years. In other words,
            Stay in the US helps you find the most international worker-friendly
            company for YOU!
          </p>
        </div>
        <div style={{marginTop: "3%", marginBottom: "3%"}}>
          <h2>About the project</h2>
          <p>
            This project aims to help international workers who wish to work in
            the US easily access information regarding US-based companies’ H1-B
            sponsorship. The source of the data is the annual Labor Condition
            Application (LCA) Disclosure Data released by the US Department of
            Labor of which the 2016, 2017, 2018, 2020, and 2021 data were used.
          </p>
          <p>This project is distributed under the MIT License:</p>
          <p>Copyright (c) 2022 Minh Nguyen, Kareem Alsayed, Soomin Kim</p>
          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </div>
    </div>
  );
}
