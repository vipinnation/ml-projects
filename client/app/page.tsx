import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
          <form className="flex-1">
            <Input
              placeholder="Search projects..."
              className="bg-white dark:bg-gray-950 outline-none"
            />
          </form>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          <ModelCard
            title="Car Price Predictor"
            content={
              "Developed an ML model to predict car prices using features like make, model, year, mileage, and condition, enhancing pricing accuracy for buyers and sellers."
            }
          />
        </div>
      </main>
    </div>
  );
}

type Props = {
  title: string | React.ReactNode;
  titleDescription?: string | React.ReactNode;
  content: string | React.ReactNode;
};
const ModelCard: React.FC<Props> = ({ title, titleDescription, content }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="grid gap-1">
          <CardTitle>
            <Link href="/car-price">{title}</Link>
          </CardTitle>
          <CardDescription>
            {titleDescription ? titleDescription : null}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">{content}</CardContent>
    </Card>
  );
};
