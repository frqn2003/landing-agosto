export function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_term: params.get("utm_term") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    idconversion: params.get("idconversion") ?? "",
    campaignid: params.get("campaignid") ?? "",
    gclid: params.get("gclid") ?? "",
    referer: document.referrer ?? params.get("referer") ?? "",
  };
}

export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
