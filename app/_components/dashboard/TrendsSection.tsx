import getTrendsData from "@/app/data/url/getTrendsData";
import { TrendsChart } from "./TrendsChart";

export default async function TrendsSection() {
  const data = await getTrendsData();

  return <TrendsChart data={data} />;
}
