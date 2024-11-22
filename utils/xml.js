export function parseXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");

  // Check for parsing errors
  if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("Error parsing XML");
  }

  return xmlDoc;
}

export function xmlToJson(xml) {
  const obj = {};

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text
    const nodeValue = xml.nodeValue.trim();
    if (nodeValue !== "") {
      return nodeValue; // Return the trimmed value directly
    }
    return undefined; // Skip empty text nodes
  }

  // do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xmlToJson(xml.childNodes.item(i));
      const nodeName = xml.childNodes.item(i).nodeName;
      if (typeof item !== "undefined") { // Ensure the item is not undefined
        if (typeof (obj[nodeName]) === "undefined") {
          obj[nodeName] = item;
        } else {
          if (typeof (obj[nodeName].push) === "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(item);
        }
      }
    }
  }

  // Remove empty objects
  for (const key in obj) {
    if (typeof (obj[key]) === "object" && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  }

  return obj;
}
