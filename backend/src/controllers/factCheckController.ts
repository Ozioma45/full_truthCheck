import { Request, Response } from "express";
import { fetchFactCheckData } from "../services/factCheckService";

export const getFactCheck = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const data = await fetchFactCheckData(query);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({
      error: "Error fetching fact-check data",
      details: err.message,
    });
  }
};
