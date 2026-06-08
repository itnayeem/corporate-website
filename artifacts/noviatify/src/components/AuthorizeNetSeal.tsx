import { useCallback } from "react";

// (c) 2005, 2026. Authorize.Net is a registered trademark of CyberSource Corporation.
// The official anetseal/seal.js relies on document.write, which blanks the page in a
// React SPA. This component reproduces exactly what that script outputs — the verified
// merchant badge linking to Authorize.Net's verification popup — in a SPA-safe way.

const ANS_CUSTOMER_ID = "c6eb9029-e052-452b-99ad-8a537b038581";
const ANS_VERIFY_URL = "https://verify.authorize.net/anetseal/";
const ANS_SEAL_IMAGE = "https://verify.authorize.net/anetseal/images/secure90x72.gif";

function buildVerifyUrl(): string {
  let params = `?pid=${encodeURI(ANS_CUSTOMER_ID)}`;
  if (typeof window !== "undefined" && window.location?.href) {
    const currentUrl = `${window.location.protocol}//${window.location.hostname}`;
    params += `&rurl=${encodeURI(currentUrl)}`;
  }
  return ANS_VERIFY_URL + params;
}

export default function AuthorizeNetSeal({ className = "" }: { className?: string }) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const popup = window.open(
      buildVerifyUrl(),
      "AuthorizeNetVerification",
      "noopener,noreferrer,width=600,height=430,dependent=yes,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,directories=no,location=yes",
    );
    if (popup) popup.opener = null;
  }, []);

  return (
    <div className={`AuthorizeNetSeal shrink-0 ${className}`} style={{ width: 90 }}>
      <a
        href={buildVerifyUrl()}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        title="Authorize.Net Merchant - Click to Verify"
      >
        <img
          src={ANS_SEAL_IMAGE}
          width={90}
          height={72}
          style={{ border: 0, margin: 0 }}
          alt="Authorize.Net Merchant - Click to Verify"
        />
      </a>
    </div>
  );
}
