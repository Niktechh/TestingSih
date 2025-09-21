import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink = "/dashboard" // 
}: PlaceholderPageProps) {
  const { t } = useI18n() as any;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-20 lg:pb-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Wrench className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{t("placeholder.keep_prompting")}</p>
          
          <Link href={backLink}>
            <Button className="w-full gap-2 gradient-green text-white font-semibold tap-target">
              <ArrowLeft className="h-4 w-4" />
              {t("back_to_dashboard")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
