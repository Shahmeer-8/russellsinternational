import Legal from "@/pages/Legal";
import { PRIVACY_POLICY } from "@/pages/legalContent";

const PrivacyPolicy = () => (
  <Legal
    page="privacy"
    fallback={{
      eyebrow: PRIVACY_POLICY.eyebrow,
      title: PRIVACY_POLICY.title,
      intro: PRIVACY_POLICY.intro,
      body: PRIVACY_POLICY.body,
    }}
  />
);

export default PrivacyPolicy;
