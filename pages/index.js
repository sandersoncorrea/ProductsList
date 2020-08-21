import Head from "next/head";
import { useState } from "react";
import getMakeup from "../services/MakeUpApi";

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [aviso, setAviso] = useState("");

  async function search() {
    setAviso("");
    const makeups = await getMakeup(
      document.getElementById("searchInput").value
    );
    console.log(makeups.length == 0);
    if (makeups.length <= 0) setAviso("Nenhuma make foi encontrada :(");
    setMakes(makeups);
    return makeups;
  }

  return (
    <div className="container">
      <Head>
        <title>Minhas Makes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Encontre aqui suas makes</h1>

        <p className="description">
          Este site utiliza a API pública da{" "}
          <a href="https://makeup-api.herokuapp.com/">MakeUp</a>
        </p>

        <div>
          <input
            className="searchInput"
            id="searchInput"
            placeholder="Digite o tipo do produto..."
          />
          <input
            className="searchButton"
            type="button"
            value="Pesquisar"
            onClick={() => search()}
          />
        </div>

        <p>{aviso}</p>
        <div className="grid">
          {makes &&
            Array.isArray(makes) &&
            makes.map((make) => {
              return (
                <a key={make.id} href={make.product_link}>
                  <div className="card">
                    <p>{make.category}</p>
                    <img src={make.image_link} />
                    <h3>{make.name.substring(0, 20)}</h3>
                    <span>R$ {make.price}</span>
                  </div>
                </a>
              );
            })}
        </div>
      </main>

      <footer>Powered by Sanderson Corrêa</footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #db7093;
          text-decoration: none;
        }

        .searchInput {
          border: 1px solid #db7093;
          color: #db7093;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
        }

        .searchButton {
          border: 1px solid #db7093;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          background-color: #db7093;
          cursor: pointer;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #db7093;
          border-color: #db7093;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          color: #fff;
          margin: 0;
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
          font-size: 0.75rem;
          line-height: 1.5;
          background-color: #db7093;
          text-align: center;
        }

        .card span {
          color: #778899;
          margin: 0;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          line-height: 1.5;
          background-color: #fff;
        }

        .card img {
          margin: 1.5rem 0;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
