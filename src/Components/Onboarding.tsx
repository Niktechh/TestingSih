"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone,
  TrendingUp,
  Target,
  Leaf,
  Languages,
  Phone
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },

  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" }, 
];

const tutorialSlides = [
  {
    icon: TrendingUp,
    titleKey: "tutorial.0.title",
    descKey: "tutorial.0.desc",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Target,
    titleKey: "tutorial.1.title",
    descKey: "tutorial.1.desc",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Leaf,
    titleKey: "tutorial.2.title",
    descKey: "tutorial.2.desc",
    color: "from-green-600 to-green-700"
  }
];

type OnboardingStep = "language" | "tutorial" | "login";

export default function Onboarding() {
  const router = useRouter(); 
  const { t, setLanguage, language } = useI18n() as any;
  const [step, setStep] = useState<OnboardingStep>("language");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [tutorialSlide, setTutorialSlide] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Keep local selection in sync with global language (including after hydration)
  useEffect(() => {
    if (typeof language === "string") {
      setSelectedLanguage(language);
    }
  }, [language]);

  const handleLanguageNext = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage as any);
      setStep("tutorial");
    }
  };

  const handleTutorialNext = () => {
    if (tutorialSlide < tutorialSlides.length - 1) {
      setTutorialSlide(tutorialSlide + 1);
    } else {
      setStep("login");
    }
  };

  const handleTutorialPrev = () => {
    if (tutorialSlide > 0) {
      setTutorialSlide(tutorialSlide - 1);
    } else {
      setStep("language");
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); // Navigate in Next.js
    }, 1500);
  };

  const renderLanguageSelection = () => (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center mb-6">
        <Languages className="h-8 w-8 text-white" />
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
        {t("lang.choose")}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {t("lang.select_helper")}
      </p>

      <div className="w-full max-w-sm mb-8">
        <Select
          value={selectedLanguage}
          onValueChange={(val) => {
            setSelectedLanguage(val);
            setLanguage(val as any); // apply immediately
          }}
        >
          <SelectTrigger className="h-12 text-left">
            <SelectValue placeholder={t("lang.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{lang.native}</span>
                  <span className="text-sm text-muted-foreground">({lang.name})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleLanguageNext}
        disabled={!selectedLanguage}
        className="w-full max-w-sm h-12 gradient-green text-white font-semibold tap-target"
      >
        {t("continue")}
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  const renderTutorial = () => {
    const slide = tutorialSlides[tutorialSlide] as any;
    const Icon = slide.icon;

    return (
      <div className="flex flex-col items-center text-center">
        <div className={`w-20 h-20 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center mb-6`}>
          <Icon className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
          {t(slide.titleKey)}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
          {t(slide.descKey)}
        </p>

        <div className="flex gap-2 mb-8">
          {tutorialSlides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === tutorialSlide ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <Button
            variant="outline"
            onClick={handleTutorialPrev}
            className="flex-1 h-12 tap-target"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("back")}
          </Button>
          <Button
            onClick={handleTutorialNext}
            className="flex-1 h-12 gradient-green text-white font-semibold tap-target"
          >
            {tutorialSlide === tutorialSlides.length - 1 ? t("get_started") : t("next")}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderLogin = () => (
    <div className="flex flex-col items-center text-center">
        <img src={"./farmer.png"} alt="farmer logo" className="logo h-70 w-100 mb-4 object-cover"/>
      <div className="w-16 h-16 bg-gradient-to-br from-[#6e7b68] to-[#778d6d] rounded-full flex items-center justify-center mb-6">
        
        <Smartphone className="h-8 w-8 text-[#faa45a]" />
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
        {isOtpSent ? t("login.verify_otp") : t("login.enter_phone")}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {isOtpSent 
          ? `${t("login.helper_sent")} +91 ${phoneNumber}`
          : t("login.helper_wait")
        }
      </p>

      <div className="w-full max-w-sm space-y-4 mb-8">
        {!isOtpSent ? (
          <div className="space-y-4">
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-lg bg-muted">
                <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">+91</span>
              </div>
              <Input
                type="tel"
                placeholder={t("login.placeholder_phone")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="rounded-l-none h-12"
              />
            </div>
            <Button
              onClick={handleSendOtp}
              disabled={phoneNumber.length < 10 || isLoading}
              className="w-full h-12 gradient-green text-white font-semibold tap-target"
            >
              {isLoading ? t("sending") : t("login.send_otp")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder={t("login.placeholder_otp")}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="h-12 text-center text-lg tracking-widest"
              maxLength={6}
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length < 6 || isLoading}
              className="w-full h-12 gradient-green text-white font-semibold tap-target"
            >
              {isLoading ? t("verifying") : t("verify_continue")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOtpSent(false)}
              className="w-full h-10 text-sm"
            >
              {t("change_phone")}
            </Button>
          </div>
        )}
      </div>

      {!isOtpSent && (
        <Button
          variant="ghost"
          onClick={() => setStep("tutorial")}
          className="text-sm text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("back_to_tutorial")}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">{t("app.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("app.subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === "language" && renderLanguageSelection()}
          {step === "tutorial" && renderTutorial()}
          {step === "login" && renderLogin()}
        </div>

        {step === "tutorial" && (
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              onClick={() => setStep("login")}
              className="text-sm text-muted-foreground"
            >
              {t("skip_tutorial")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
