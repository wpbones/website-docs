import { NextApiRequest, NextApiResponse } from "next";

interface DocumentationData {
  [section: string]: Section;
}

interface Section {
  title: string;
  data: {
    [key: string]: string;
  };
}

type Data = {
  data?: DocumentationData;
  error?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = "wpbones.com"; //req.headers.host;
  const locale = "en-US";

  const url = `${protocol}://${host}/_next/static/chunks/nextra-data-${locale}.json`;

  try {
    const index = await fetch(url);
    const searchData: DocumentationData = await index.json();

    const { keyword } = req.query;
    if (keyword && typeof keyword === "string") {
      const lowerCaseKeyword = keyword.toLowerCase();
      const filteredData: DocumentationData = {};

      for (const [path, section] of Object.entries(searchData)) {
        const { title, data } = section;
        const dataValues = Object.values(data).join(" ").toLowerCase();

        if (title.toLowerCase().includes(lowerCaseKeyword) || dataValues.includes(lowerCaseKeyword)) {
          filteredData[path] = section;
        }
      }

      return res.status(200).json({ data: filteredData });
    }

    res.status(200).json({ data: searchData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
