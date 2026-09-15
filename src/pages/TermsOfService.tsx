import Legal from "@/pages/Legal";
import { TERMS_OF_SERVICE } from "@/pages/legalContent";

const TermsOfService = () => (
  <Legal
    page="terms"
    fallback={{
      eyebrow: TERMS_OF_SERVICE.eyebrow,
      title: TERMS_OF_SERVICE.title,
      intro: TERMS_OF_SERVICE.intro,
      body: TERMS_OF_SERVICE.body,
    }}
  />
);

export default TermsOfService;
