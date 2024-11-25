import { parseXML, xmlToJson } from "./utils/xml.js";

export async function search(parameters) {
  const usedParams = {
    search_query: "",
    start: 0,
    max_results: 10,
    sortBy: "relevance",
    sortOrder: "ascending",
    ...parameters,
  };

  const urlQuery = new URLSearchParams(usedParams);
  const url = "https://export.arxiv.org/api/query?" + urlQuery.toString();
  const response = await fetch(url);
  const data = await response.text();
  if (!response.ok) {
    throw new Error(`http_error=${response.status}, body=${data}`);
  }
  const xmlDoc = parseXML(data);
  const json = xmlToJson(xmlDoc);

  return json;
}

export default {
  search,
};
