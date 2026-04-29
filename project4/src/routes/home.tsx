import raw from "./test.txt";
// import fs from "fs"

// const test: string = require("./test.txt");


const url: string = "./test.txt";
// fs.readFile(url);

export default function Home() {
    return (
        <>
            {/* <p>{test}</p> */}
            <p> the website home page </p>
            {/* {fs.readFileSync(url, 'utf-8')}; */}
            {/* {fetch(raw).then()} */}
        </>
    )
}