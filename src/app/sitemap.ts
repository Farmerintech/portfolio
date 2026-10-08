import type { MetadataRoute } from "next"; import { site } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/resume"].map((p) => ({ url: site.url + p, lastModified: new Date() })); }
