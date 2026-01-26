import getConversionTrendsData from "@/app/data/converter/getConversionTrendsData";
import { ConversionTrendsChart } from "./ConversionTrendsChart";

export default async function ConversionTrendsSection() {
  const data = await getConversionTrendsData();

  return <ConversionTrendsChart data={data} />;
}
