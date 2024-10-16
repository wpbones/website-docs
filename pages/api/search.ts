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

type Data = Array<{ path: string; title: string; data: { [key: string]: string } }> | { error: string };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = "wpbones.com"; //req.headers.host;
  const locale = "en-US";

  const url = `${protocol}://${host}/_next/static/chunks/nextra-data-${locale}.json`;

  try {
    const index = await fetch(url);
    const searchData: DocumentationData = await index.json();

    const { keyword } = req.query;

    const transformToArray = (data: DocumentationData) => {
      return Object.entries(data).map(([path, section]) => ({
        path,
        title: section.title,
        data: section.data,
      }));
    };

    if (keyword && typeof keyword === "string") {
      const lowerCaseKeyword = keyword.toLowerCase();
      const filteredArray = transformToArray(searchData).filter(({ title, data }) => {
        const dataValues = Object.values(data).join(" ").toLowerCase();
        return title.toLowerCase().includes(lowerCaseKeyword) || dataValues.includes(lowerCaseKeyword);
      });

      return res.status(200).json(filteredArray);
    }

    // If no keyword is provided, return all data in the requested format.
    const allDataArray = transformToArray(searchData);

    res.status(200).json(allDataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
