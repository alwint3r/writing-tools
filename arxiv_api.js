import { parseXML, xmlToJson } from "./utils/xml.js";

export async function search(query, fields = "all") {
  const search_query = `${fields}:${query}`;
  const urlQuery = new URLSearchParams({
    search_query,
    start: 0,
    max_results: 10,
  });
  const url = "https://export.arxiv.org/api/query?" + urlQuery.toString();
  const response = await fetch(url);
  const data = await response.text();
  const xmlDoc = parseXML(data);
  const json = xmlToJson(xmlDoc);

  return json;
}

export default {
  search,
};
