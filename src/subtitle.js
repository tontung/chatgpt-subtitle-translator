//@ts-check
import fs from 'fs'
import srtParser2 from "srt-parser-2"

export const parser = new srtParser2.default();

/**
 * @param {fs.PathOrFileDescriptor} file
 * @returns {string[]}
 */
export function srtFileToNumberLabledLines(file)
{
    const fileText = fs.readFileSync(file, "utf-8").toString()
    const output = srtToNumberLabledLines(fileText)
    return output
}

/**
 * @param {string} srt
 */
export function srtToNumberLabledLines(srt)
{
    const srtArray = parser.fromSrt(srt);
    // const output = srtArray.map(x => `${x.id}. ${x.text.replace("\n", " ")}`)
    const output = srtArray.map(x => `${x.id}. ${x.text.replace("\n", " ")}`)
    return output
}

/**
 * @param {string} str
 */
export function splitStringByNumberLabel(str)
{
    const regex = /^(\d+\.)?\s*(.*)/;
    const matches = str.match(regex);
    const number = matches[1] ? parseInt(matches[1]) : undefined;
    const text = matches[2].trim();
    return { number, text };
}
