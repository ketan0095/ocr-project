import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import Layout from "../layout/Layout.js";
import Navbar from "../layout/Header/Navbar.js";

export default function Home() {
  const [loader, setloader] = useState(false);
  const [imgdata, setimgdata] = useState(null);
  const [ocrdata, setocrdata] = useState(null);
  const [filesdata, setfilesdata] = useState(null);

  async function layerupload() {
    try {
      setloader(true);
      setimgdata([]);
      const data = event.target.files;

      console.log("data.length :", data);

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const form_data = new FormData();
          form_data.append("files", data[i]);

          await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_PYTHON_URL}/ocr/generate-result`,
            data: form_data, // you are sending body instead
            headers: {
              "X-Key": `${process.env.NEXT_PUBLIC_X_KEY}`,
              "Content-Type": "multipart/form-data",
              test: 101,
            },
          }).then((res) => {
            console.log(res.status);
            if (res.data.status == 200) {
              const file_data = res.data.files_processed;
              const img_data = res.data.image_data;
              const ocr_data = res.data.ocr_data;

              console.log("ocr_data :", ocr_data);

              const temparray_file_data = [];
              const temparray_img_data = [];
              const temparray_ocr_data = [];

              for (let i = 0; i < file_data.length; i++) {
                temparray_file_data.push(file_data[i]);
                temparray_img_data.push(img_data[i]);
                temparray_ocr_data.push(ocr_data[i]);
              }

              setfilesdata(temparray_file_data);
              setimgdata(temparray_img_data);
              setocrdata(temparray_ocr_data);
              setloader(false);
            } else {
              alert(`Server response : ${res.msg}`);
              setloader(false);
            }
          });
        }
      } else {
        setloader(false);
      }
    } catch (err) {
      setloader(false);
      alert(err);
    }
  }

  return (
    <div
      className={styles.container}
      style={{
        background: "url('/background.jpg') no-repeat center center/cover",
      }}
    >
      <Head>
        <title>OCR</title>
        <meta name="description" content="Generated by create next app" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Data Extraction" classOpt="bg-black">
        <Navbar navDark />
        <div>
          <main className={styles.main}>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 mx-auto">
                <div className="row p-4 gy-4 border border-light">
                  <div
                    // className="mx-auto col-lg-12 col-sm-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5 className={styles.global_font_color}>
                      Drop your file here, or browse
                    </h5>
                    <br></br>
                  </div>

                  <div
                    // className="col-lg-12 col-sm-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h6 className={styles.global_font_color}>
                      supports PDF and images. Free service for documents up to
                      200 pages or 50 Mb and 3 tasks per hour.
                    </h6>
                  </div>

                  <div
                    // className="col-lg-12 col-sm-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="col-lg-4 col-sm-4"></div>
                    <div className="col-lg-4 col-sm-4">
                      <input
                        class="form-control"
                        type="file"
                        id="myFile"
                        // accept="image/*,application/pdf,.HEIC"
                        accept="image/*,application/.HEIC"
                        onChange={layerupload}
                      />{" "}
                    </div>
                    <div className="col-lg-4 col-sm-4"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>

            <br></br>
            {loader ? (
              <Oval
                type="Puff"
                color="white"
                height={50}
                width={50}
                timeout={3}
              />
            ) : (
              ""
            )}
            {loader ? (
              <h5 className={styles.global_font_color}>
                Fetching data from AI ..
              </h5>
            ) : (
              ""
            )}

            {imgdata?.map((item, index) => {
              return (
                <div
                  class="card mb-3"
                  key={item[0]}
                  style={{ maxWidth: "1200px", marginBottom: "1rem" }}
                >
                  <div class="row g-0">
                    <div class="col-md-6">
                      <img
                        src={`data:image/jpeg;base64,${imgdata[index]}`}
                        class="img-fluid rounded-start"
                        alt="..."
                        id="invoice_image"
                      />
                    </div>

                    <div class="col-md-4">
                      <h5 class="card-title" style={{ marginTop: "15px" }}>
                        OCR Output for {filesdata[index]}
                      </h5>
                      <textarea
                        style={{
                          height: "90%",
                          width: "100%",
                          overflow: "auto",
                          padding: "1rem",
                        }}
                        disabled={true}
                      >
                        {ocrdata[index]}
                      </textarea>
                    </div>
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      </Layout>
      {/* <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer> */}
    </div>
  );
}
