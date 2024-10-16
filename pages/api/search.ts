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
  data?: DocumentationData[];
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
      const filteredArray = Object.entries(searchData).reduce((acc, [path, section]) => {
        const { title, data } = section;
        const dataValues = Object.values(data).join(" ").toLowerCase();

        if (title.toLowerCase().includes(lowerCaseKeyword) || dataValues.includes(lowerCaseKeyword)) {
          acc.push({
            [path]: section,
          });
        }
        return acc;
      }, [] as Array<{ [key: string]: Section }>);

      return res.status(200).json({ data: filteredArray });
    }

    // If no keyword is provided, return all data in the requested format.
    const allDataArray = Object.entries(searchData).map(([path, section]) => ({
      [path]: section,
    }));

    res.status(200).json({ data: allDataArray });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
